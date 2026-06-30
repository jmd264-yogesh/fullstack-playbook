# Backend Naming Conventions

Consistent naming in backend code makes the codebase navigable and self-documenting. Standards differ slightly between NestJS (TypeScript) and Laravel (PHP), but the underlying principles are the same.

---

## NestJS (TypeScript) Naming

### Files

| Item | Convention | Examples |
|---|---|---|
| Module | `[feature].module.ts` | `users.module.ts`, `orders.module.ts` |
| Controller | `[feature].controller.ts` | `users.controller.ts` |
| Service | `[feature].service.ts` | `users.service.ts` |
| DTO | `[action]-[feature].dto.ts` | `create-user.dto.ts`, `update-order.dto.ts` |
| Entity | `[feature].entity.ts` | `user.entity.ts`, `order.entity.ts` |
| Guard | `[name].guard.ts` | `jwt-auth.guard.ts`, `roles.guard.ts` |
| Decorator | `[name].decorator.ts` | `current-user.decorator.ts` |
| Filter | `[name].filter.ts` | `http-exception.filter.ts` |
| Interceptor | `[name].interceptor.ts` | `logging.interceptor.ts` |
| Test file | `[feature].[type].spec.ts` | `users.service.spec.ts`, `users.controller.spec.ts` |

### Classes & Interfaces

| Item | Convention | Examples |
|---|---|---|
| Module class | PascalCase + `Module` | `UsersModule`, `OrdersModule` |
| Controller class | PascalCase + `Controller` | `UsersController` |
| Service class | PascalCase + `Service` | `UsersService` |
| DTO class | PascalCase + `Dto` | `CreateUserDto`, `UpdateOrderDto` |
| Entity class | PascalCase (noun) | `User`, `Order`, `Payment` |
| Guard class | PascalCase + `Guard` | `JwtAuthGuard`, `RolesGuard` |
| Interface | `I` prefix + PascalCase | `IUserRepository`, `IEmailService` |

### Methods & Properties

```ts
// ✅ Service methods — verb + noun, camelCase
async findById(id: string): Promise<User> {}
async createUser(dto: CreateUserDto): Promise<User> {}
async deleteUser(id: string): Promise<void> {}

// ✅ Controller routes — HTTP verb-aligned, camelCase
@Get(':id')
async getUser(@Param('id') id: string) {}

@Post()
async createUser(@Body() dto: CreateUserDto) {}

// ✅ Constants — UPPER_SNAKE_CASE
const MAX_LOGIN_ATTEMPTS = 5
const DEFAULT_PAGE_SIZE = 20

// ✅ Enums — PascalCase enum name, PascalCase members
enum UserStatus { Active = 'ACTIVE', Inactive = 'INACTIVE', Suspended = 'SUSPENDED' }
```

### Database Columns (Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  firstName String              // camelCase in Prisma schema
  lastName  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")               // snake_case table name in the DB
}
```

- **Prisma schema fields**: camelCase (`firstName`, `createdAt`)
- **Database columns**: snake_case (`first_name`, `created_at`) — use `@map` or `@@map`
- **Table names**: plural snake_case (`users`, `orders`, `payment_methods`)

---

## Laravel (PHP) Naming

### Files & Classes

| Item | Convention | Examples |
|---|---|---|
| Model | PascalCase singular | `User.php`, `Order.php` |
| Controller | PascalCase + `Controller` | `UserController.php` |
| Form Request | PascalCase + verb + `Request` | `StoreUserRequest.php`, `UpdateOrderRequest.php` |
| API Resource | PascalCase + `Resource` | `UserResource.php`, `OrderResource.php` |
| Action | PascalCase + `Action` | `CreateUserAction.php`, `ProcessPaymentAction.php` |
| Service | PascalCase + `Service` | `PaymentService.php` |
| Job | PascalCase + `Job` | `SendWelcomeEmailJob.php` |
| Policy | PascalCase + `Policy` | `PostPolicy.php`, `OrderPolicy.php` |
| Event | PascalCase (noun/noun phrase) | `UserRegistered.php`, `OrderPlaced.php` |
| Migration | snake_case with timestamp prefix | `2024_01_01_000000_create_users_table.php` |

### Methods

```php
// ✅ Model scopes — camelCase, prefixed with `scope`
public function scopeActive(Builder $query): Builder {}
public function scopeByStatus(Builder $query, string $status): Builder {}

// ✅ Action classes — single public method named `execute` or `handle`
class CreateUserAction
{
    public function execute(StoreUserRequest $request): User {}
}

// ✅ Controller methods — RESTful resource naming
public function index()   {}   // GET /users
public function store()   {}   // POST /users
public function show()    {}   // GET /users/{id}
public function update()  {}   // PUT /users/{id}
public function destroy() {}   // DELETE /users/{id}
```

### Database Conventions

| Item | Convention | Examples |
|---|---|---|
| Table names | plural snake_case | `users`, `orders`, `payment_methods` |
| Column names | snake_case | `first_name`, `created_at`, `deleted_at` |
| Primary keys | `id` (auto-incrementing) or UUID | `id` |
| Foreign keys | `[singular_table]_id` | `user_id`, `order_id` |
| Pivot tables | alphabetical, singular, snake_case | `role_user`, `order_product` |
| Boolean columns | `is_` or `has_` prefix | `is_active`, `has_verified_email` |
| Timestamp columns | `_at` suffix | `created_at`, `deleted_at`, `verified_at` |

```php
// ✅ Eloquent model — property naming
class User extends Model
{
    protected $table = 'users';           // Explicit table name (optional if it follows convention)
    protected $primaryKey = 'id';

    // Accessors/Mutators — camelCase via get/set prefix
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
```

---

## Route Naming

### REST API Conventions (Both Frameworks)

| Method | Path | Action | Name |
|---|---|---|---|
| GET | `/users` | List all | `users.index` |
| POST | `/users` | Create | `users.store` |
| GET | `/users/{id}` | Get one | `users.show` |
| PUT/PATCH | `/users/{id}` | Update | `users.update` |
| DELETE | `/users/{id}` | Delete | `users.destroy` |

- **Use plural nouns** for resource endpoints: `/users`, `/orders`, `/products`
- **Use kebab-case** for multi-word paths: `/payment-methods`, `/order-items`
- **Avoid verbs** in REST endpoints: prefer `/users/activate` → `/users/{id}/status` (PATCH)
- **Version the API**: `/api/v1/users`

---

## Error Response Naming

Always return RFC 7807 Problem Detail format:

```json
{
  "type": "https://errors.example.com/validation-error",
  "title": "Validation Failed",
  "status": 422,
  "detail": "The provided email is already in use.",
  "instance": "/api/v1/users"
}
```
