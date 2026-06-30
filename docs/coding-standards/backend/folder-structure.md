# Backend Folder Structure

A well-organised backend project structure ensures developer productivity, clear separation of concerns, and long-term maintainability. Standards differ between our two primary backend frameworks.

---

## NestJS Folder Structure

NestJS uses a **module-based architecture**. Every feature is a self-contained module with its own controller, service, DTOs, and entities.

```text
project-root/
├── src/
│   ├── main.ts                         # Application bootstrap
│   ├── app.module.ts                   # Root application module
│   ├── app.controller.ts               # Root health/status controller
│   │
│   ├── modules/                        # Feature modules (bounded contexts)
│   │   └── [feature]/
│   │       ├── [feature].module.ts     # Module registration
│   │       ├── [feature].controller.ts # HTTP routing only
│   │       ├── [feature].service.ts    # Business logic
│   │       ├── dto/                    # Data Transfer Objects (request/response shapes)
│   │       │   ├── create-[feature].dto.ts
│   │       │   └── update-[feature].dto.ts
│   │       ├── entities/               # Database entity / ORM model
│   │       │   └── [feature].entity.ts
│   │       └── __tests__/
│   │           ├── [feature].controller.spec.ts
│   │           └── [feature].service.spec.ts
│   │
│   ├── common/                         # Shared cross-cutting concerns
│   │   ├── decorators/                 # Custom decorators (e.g., @CurrentUser)
│   │   ├── filters/                    # Exception filters (global error handler)
│   │   ├── guards/                     # Auth guards (JWT, roles)
│   │   ├── interceptors/               # Logging, serialization
│   │   ├── pipes/                      # Validation and transformation pipes
│   │   ├── middleware/                 # HTTP middleware
│   │   └── types/                      # Shared TypeScript types/interfaces
│   │
│   ├── config/                         # Configuration modules
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   └── auth.config.ts
│   │
│   └── database/                       # Database layer (if using TypeORM or Prisma separately)
│       ├── migrations/
│       └── seeds/
│
├── test/                               # E2E / integration tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── prisma/                             # Prisma schema and migrations (if using Prisma)
│   ├── schema.prisma
│   └── migrations/
│
├── .env.example
├── nest-cli.json
├── tsconfig.json
└── package.json
```

### Key NestJS Principles

**One module per feature domain.** Each module is fully self-contained.

```text
modules/
├── users/
├── orders/
├── payments/
└── notifications/
```

**Controller → Service → Repository** is the strict dependency chain. Controllers call services; services call repositories or the ORM directly. No business logic in controllers.

**Common modules are shared, not duplicated.** Guards, filters, decorators, and interceptors belong in `common/` and are registered globally in `main.ts` or `app.module.ts`.

---

## Laravel Folder Structure

Laravel follows the **MVC pattern** with additional layers for clean architecture. The standard `app/` directory is extended with `Actions/` and `Services/` for business logic separation.

```text
project-root/
├── app/
│   ├── Actions/                        # Single-responsibility business logic classes
│   │   └── CreateUserAction.php
│   │
│   ├── Http/
│   │   ├── Controllers/                # HTTP-only: receive request, return response
│   │   │   └── UserController.php
│   │   ├── Requests/                   # Form Request validation and authorization
│   │   │   ├── StoreUserRequest.php
│   │   │   └── UpdateUserRequest.php
│   │   ├── Resources/                  # API Resource transformers (JSON output)
│   │   │   └── UserResource.php
│   │   └── Middleware/                 # Route-level middleware
│   │       └── EnsureProfileComplete.php
│   │
│   ├── Models/                         # Eloquent models
│   │   └── User.php
│   │
│   ├── Services/                       # Complex orchestration services (multi-action flows)
│   │   └── PaymentService.php
│   │
│   ├── Jobs/                           # Queued background jobs
│   │   └── SendWelcomeEmailJob.php
│   │
│   ├── Events/                         # Domain events
│   │   └── UserRegistered.php
│   │
│   ├── Listeners/                      # Event listeners
│   │   └── SendWelcomeEmail.php
│   │
│   ├── Policies/                       # Model authorization policies
│   │   └── PostPolicy.php
│   │
│   └── Exceptions/                     # Custom exception handlers
│       └── Handler.php
│
├── database/
│   ├── migrations/                     # Database schema migrations
│   ├── seeders/                        # Test/dev data seeders
│   └── factories/                      # Model factories for testing
│
├── routes/
│   ├── api.php                         # Stateless API routes
│   └── web.php                         # Web/session routes
│
├── tests/
│   ├── Feature/                        # HTTP / integration tests (Pest PHP)
│   │   └── UserRegistrationTest.php
│   └── Unit/                           # Pure unit tests
│       └── CreateUserActionTest.php
│
├── config/
├── resources/
├── storage/
├── .env.example
└── composer.json
```

### Key Laravel Principles

**Action classes, not fat controllers.** If business logic exceeds ~5 lines, move it to a dedicated `Action` class. Controllers should only:
1. Receive the request via a `FormRequest`
2. Call an `Action` or `Service`
3. Return a response via an API `Resource`

**Policies for authorization.** Never check `$user->role === 'admin'` inline. Create a Policy and call `$this->authorize('update', $post)` in the controller.

**FormRequests always.** Never use `$request->validate()` inside a controller method. Always use dedicated `FormRequest` classes — they make authorization and validation reusable and testable.

---

## Private Folders & Conventions

Both frameworks follow this convention for internal-only code:

| Prefix | Meaning |
|---|---|
| `__tests__/` | Co-located test files |
| `_` prefix (NestJS) | Internal utility not exported publicly |
| `Abstract` prefix | Abstract base classes |
| `I` prefix | Interfaces (NestJS/TypeScript) |
