# Testing Strategy

> Testing is the safety net that lets teams move fast without breaking things. Unit tests catch regressions; E2E tests verify critical user journeys.

---

## The Testing Pyramid

```
         /\
        /E2E\         ← Few, focused, critical-path only
       /------\
      /  Integ  \     ← API + component integration
     /------------\
    /  Unit Tests  \  ← Many, fast, isolated
   /________________\
```

- **Unit tests** are fast, isolated, and numerous. They catch regressions in business logic, utilities, and component behaviour.
- **Integration tests** verify that components and APIs work together (database calls, API endpoints).
- **E2E tests** are slow but verify complete user workflows through a real browser. Use sparingly — only for critical paths.

---

## Testing Stack

| Layer | Framework |
|---|---|
| Unit (Frontend) | Jest + React Testing Library |
| Unit (Backend — Node.js) | Jest + Supertest |
| Unit (Backend — Python) | PyTest |
| E2E | Playwright + BDD (Gherkin) |

---

## Coverage Target

Establish a **minimum 80% line coverage** threshold and enforce it in CI. Coverage below this threshold fails the build.

> Coverage is a floor, not a ceiling. 80% coverage of trivial code is less valuable than 60% coverage of complex business logic. Write meaningful tests — do not chase the number with trivial assertions.

---

## Unit & Integration Tests

- Mock external dependencies (databases, third-party APIs) in unit tests — never call real services.
- Set up global test configuration: mock environment variables, mock `fetch`/HTTP clients.
- Add test scripts to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2"
  }
}
```

---

## End-to-End Tests

- Use **Playwright** (cross-browser) as the standard. 
- Structure the `e2e/` directory clearly (see [E2E Testing](/coding-standards/testing/e2e-testing)).
- Implement **shared authentication state** so tests don't re-login before every scenario (Playwright's `storageState`).
- Write at least one critical-path test before launch (e.g., login → core action → success state).
- Run E2E in CI against a **staging environment**, not mocked backends.
- Use **parallel test shards** in CI to keep the E2E suite runtime under 10 minutes.
- **Block production deployments** if critical E2E tests fail. E2E validation must happen before production rollout.

> E2E tests that call mocked backends are integration tests in disguise. Real E2E tests require a real server.

---

## Detailed Standards

- [Unit Testing](/coding-standards/testing/unit-testing) — Setup, writing tests, patterns, best practices
- [Integration Testing](/coding-standards/testing/integration-testing) — API tests, DB integration, NestJS Supertest, Laravel Pest
- [E2E Testing](/coding-standards/testing/e2e-testing) — Playwright + BDD setup, Gherkin, step definitions
