# Integration Testing

Integration tests verify that different layers of your application work correctly together — real database queries, real HTTP endpoints, and real service interactions. They sit between unit tests (fast, isolated, mocked) and E2E tests (full browser, slow).

---

## When to Write Integration Tests

Write integration tests for:

- **API endpoints** — test the full HTTP request → controller → service → database → response flow
- **Database interactions** — verify queries, migrations, and ORM relationships work correctly
- **Authentication flows** — login, token refresh, protected route enforcement
- **Business-critical logic** — workflows that involve multiple services or database tables

**Do not** write integration tests for:
- Pure utility functions → use unit tests
- UI interactions → use E2E tests
- Isolated service logic that can be unit tested with mocks

---

## Integration vs Unit vs E2E

| Aspect | Unit | Integration | E2E |
|---|---|---|---|
| Speed | Very fast (ms) | Moderate (seconds) | Slow (minutes) |
| Scope | Single function/component | API + DB layer | Full browser flow |
| External deps | All mocked | Real DB, real HTTP | Real app + real server |
| Where to run | Every commit | Every PR | Before production deploy |
| Coverage target | 80% line coverage | Critical paths only | Critical user journeys only |

---

## NestJS Integration Testing (Supertest)

NestJS integration tests use `@nestjs/testing` to bootstrap a full NestJS application in memory and `supertest` to fire HTTP requests against it.

### Setup

```bash
npm install --save-dev supertest @types/supertest
```

### Test Structure

```ts
// test/users.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { PrismaService } from '../src/database/prisma.service'

describe('Users API (integration)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    await app.init()

    prisma = moduleFixture.get(PrismaService)
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    // Clean the test database before each test
    await prisma.user.deleteMany()
  })

  describe('POST /users', () => {
    it('should create a user and return 201', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@example.com',
          firstName: 'Jane',
          lastName: 'Doe',
        })
        .expect(201)

      expect(response.body).toMatchObject({
        email: 'test@example.com',
        firstName: 'Jane',
      })
      expect(response.body.id).toBeDefined()

      // Verify it was actually persisted to the database
      const dbUser = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      })
      expect(dbUser).not.toBeNull()
    })

    it('should return 422 when email is missing', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({ firstName: 'Jane', lastName: 'Doe' })
        .expect(422)
    })

    it('should return 409 when email already exists', async () => {
      await prisma.user.create({ data: { email: 'test@example.com', firstName: 'Existing', lastName: 'User' } })

      await request(app.getHttpServer())
        .post('/users')
        .send({ email: 'test@example.com', firstName: 'Jane', lastName: 'Doe' })
        .expect(409)
    })
  })

  describe('GET /users/:id', () => {
    it('should return 404 for a non-existent user', async () => {
      await request(app.getHttpServer())
        .get('/users/non-existent-id')
        .expect(404)
    })

    it('should return the user when found', async () => {
      const user = await prisma.user.create({
        data: { email: 'found@example.com', firstName: 'Jane', lastName: 'Doe' },
      })

      const response = await request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .expect(200)

      expect(response.body.email).toBe('found@example.com')
    })
  })
})
```

### Test Database Configuration

Use a **dedicated test database** — never run integration tests against your development or production database.

```dotenv
# .env.test
DATABASE_URL=postgresql://user:password@localhost:5432/mydb_test
```

```json
// package.json
{
  "scripts": {
    "test:integration": "dotenv -e .env.test -- jest --config jest.integration.config.ts",
    "test:integration:ci": "dotenv -e .env.test -- jest --config jest.integration.config.ts --ci"
  }
}
```

```ts
// jest.integration.config.ts
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.e2e-spec.ts'],
  globalSetup: './test/setup.ts',
  globalTeardown: './test/teardown.ts',
  testTimeout: 30_000,
}

export default config
```

---

## Laravel Integration Testing (Pest PHP)

Laravel's `RefreshDatabase` trait wraps each test in a transaction that is rolled back afterward, making integration tests completely isolated without resetting the entire database.

### Setup

```bash
composer require pestphp/pest pestphp/pest-plugin-laravel --dev
```

```php
// tests/Pest.php
uses(Tests\TestCase::class, Illuminate\Foundation\Testing\RefreshDatabase::class)->in('Feature');
```

### Writing HTTP Integration Tests

```php
// tests/Feature/UserRegistrationTest.php
use App\Models\User;

test('users can register with valid data', function () {
    $response = $this->postJson('/api/v1/users', [
        'first_name' => 'Jane',
        'last_name'  => 'Doe',
        'email'      => 'jane@example.com',
        'password'   => 'SecurePassword123!',
    ]);

    $response
        ->assertStatus(201)
        ->assertJsonStructure(['id', 'email', 'first_name', 'last_name'])
        ->assertJsonPath('email', 'jane@example.com');

    // Verify the user was actually saved to the database
    $this->assertDatabaseHas('users', ['email' => 'jane@example.com']);
});

test('registration fails with an already-taken email', function () {
    User::factory()->create(['email' => 'existing@example.com']);

    $this->postJson('/api/v1/users', [
        'email'    => 'existing@example.com',
        'password' => 'SecurePassword123!',
    ])
    ->assertStatus(422)
    ->assertJsonValidationErrors(['email']);
});

test('protected routes require authentication', function () {
    $this->getJson('/api/v1/users')->assertUnauthorized();
});

test('authenticated users can view their own profile', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->getJson("/api/v1/users/{$user->id}")
        ->assertOk()
        ->assertJsonPath('id', $user->id);
});
```

### Testing Authorization

```php
test('users cannot view other users profiles', function () {
    $owner  = User::factory()->create();
    $viewer = User::factory()->create();

    $this->actingAs($viewer)
        ->getJson("/api/v1/users/{$owner->id}")
        ->assertForbidden();
});

test('admins can view any user profile', function () {
    $admin  = User::factory()->admin()->create();
    $target = User::factory()->create();

    $this->actingAs($admin)
        ->getJson("/api/v1/users/{$target->id}")
        ->assertOk();
});
```

---

## What to Assert in Integration Tests

Every integration test should verify:

1. **The HTTP status code** — `201`, `200`, `422`, `404`, `403`, `401`
2. **The response body shape** — key fields are present and correctly typed
3. **The database state** — if a write operation, confirm the data was actually persisted

```ts
// ✅ Complete integration test assertion
expect(response.status).toBe(201)
expect(response.body.id).toMatch(/^[0-9a-f-]{36}$/)  // UUID format
expect(response.body.email).toBe('test@example.com')

const dbRecord = await prisma.user.findUnique({ where: { id: response.body.id } })
expect(dbRecord).not.toBeNull()
expect(dbRecord?.email).toBe('test@example.com')
```

---

## CI Configuration

Integration tests run in CI after unit tests and before E2E tests:

```yaml
# .github/workflows/ci.yml
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  integration:
    runs-on: ubuntu-latest
    needs: unit
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: password
          POSTGRES_DB: mydb_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
    steps:
      - run: npm run test:integration:ci
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/mydb_test
```
