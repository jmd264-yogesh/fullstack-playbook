# Database Standards Overview

Choosing the right database and ORM is one of the most consequential architectural decisions on any project. A poor choice leads to performance bottlenecks that are expensive to fix in production.

---

## Choosing the Right Database

| Database | Use When | Avoid When |
|---|---|---|
| **PostgreSQL** | Relational data, complex queries, ACID compliance, financial data, reporting | Schema needs to change very frequently |
| **MySQL** | Standard web apps, rapid SaaS, Laravel-backed products, simple relational data | Complex analytical queries, GIS, JSON-heavy workloads |
| **MongoDB** | Flexible/semi-structured documents, event logs, dynamic catalogs, rapid prototyping | Frequently joining multiple collections, financial transactions needing ACID |

> When in doubt, **choose PostgreSQL**. It handles relational and semi-structured (JSONB) data, and is the safest default for enterprise applications.

See [Solution Design Phase](/delivery-lifecycle/design-phase) for the full architectural decision framework.

---

## ORM & Query Layer Selection

| Stack | ORM / Query Layer | When to Use |
|---|---|---|
| **Node.js (NestJS / Express)** | **Prisma** | New projects — type-safe, migration-first, excellent DX |
| **Node.js (NestJS / Express)** | **TypeORM** | Existing projects using TypeORM decorators |
| **Node.js (NestJS / Express)** | **Drizzle** | Lightweight, SQL-first ORM preference |
| **PHP (Laravel)** | **Eloquent** | All Laravel projects — built-in, battle-tested ActiveRecord ORM |
| **MongoDB + Node.js** | **Mongoose** | Schema validation, middleware hooks, population |

---

## Core Principles — All Databases

### 1. Migrations First

Schema changes **must** go through migration files — never apply manual changes to a shared database.

```bash
# Prisma
npx prisma migrate dev --name add_user_status_column

# Laravel
php artisan make:migration add_status_to_users_table
php artisan migrate
```

Every migration must be:
- **Reversible** — include a `down` method (Laravel) or maintain backward compatibility (Prisma)
- **Tested** — run migrations in CI against a real test database
- **Reviewed** — migrations are part of the PR diff, reviewed like code

### 2. Connection Pooling is Mandatory

Never open a raw database connection per HTTP request.

| Stack | Solution |
|---|---|
| NestJS + Prisma | Configure `connection_limit` in `DATABASE_URL`: `?connection_limit=10` |
| NestJS + TypeORM | Set `extra: { max: 10 }` in data source options |
| Laravel | Configure `pool` settings in `config/database.php`; use PgBouncer for PostgreSQL |
| All (PostgreSQL on K8s) | Deploy **PgBouncer** as a sidecar or standalone service |

### 3. Never Commit Connection Strings

Database credentials must be injected via environment variables:

```dotenv
# .env.example
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
MONGODB_URI=mongodb://localhost:27017/mydb
```

### 4. Use Soft Deletes Consistently

If your domain requires soft deletes (preserving deleted records), implement them uniformly:

```ts
// Prisma
model User {
  deletedAt DateTime? @map("deleted_at")
}
```

```php
// Laravel Eloquent
use SoftDeletes;
```

Never mix hard deletes and soft deletes for the same entity.

### 5. Seed Data for Development

Always provide a seed script so developers can run the app locally without manual data entry:

```bash
# Prisma
npx prisma db seed

# Laravel
php artisan db:seed
```

---

## Prisma ORM (Node.js)

Prisma is the recommended ORM for all new Node.js (NestJS / Express) projects.

### Setup

```bash
npm install prisma @prisma/client
npx prisma init
```

### Schema Definition

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"   // or "mysql" | "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  firstName String   @map("first_name")
  lastName  String   @map("last_name")
  status    UserStatus @default(ACTIVE)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  orders Order[]

  @@map("users")
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}
```

### Common Query Patterns

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Find with relations
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: { orders: true },
})

// Paginated list
const users = await prisma.user.findMany({
  where: { deletedAt: null },
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { createdAt: 'desc' },
})

// Transaction
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { ... } })
  await tx.auditLog.create({ data: { userId: user.id, action: 'CREATE' } })
  return user
})
```

### Prisma in NestJS

```ts
// prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }
}
```

---

## Eloquent ORM (Laravel / PHP)

Eloquent is the built-in ORM for all Laravel projects. See the [PHP Laravel standards](/coding-standards/backend/laravel) for detailed patterns.

### Key Patterns

```php
// Always eager-load to prevent N+1
$users = User::with('orders', 'address')->where('status', 'active')->get();

// Scopes for reusable query logic
$activeUsers = User::active()->recent()->paginate(20);

// API Resources for transformation
return UserResource::collection($users);
```

---

## Detailed Standards

- [PostgreSQL](/coding-standards/database/postgres) — Indexing, pooling, Prisma setup
- [MySQL](/coding-standards/database/mysql) — Setup, Prisma, Eloquent
- [MongoDB](/coding-standards/database/mongodb) — Schema design, indexing, Mongoose
