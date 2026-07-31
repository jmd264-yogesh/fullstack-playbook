# PostgreSQL Best Practices & Standards

PostgreSQL is our primary relational database. Proper schema design, indexing, and connection management are critical to preventing catastrophic performance degradation at scale.

## What to Implement (The "Dos")

### 1. Connection Pooling (PgBouncer / RDS Proxy)
- **Best Practice**: You must put a connection pooler between your application servers (e.g., Node.js / PHP) and the PostgreSQL database.
- **Why?**: PostgreSQL creates a heavy OS process for every single connection. If you scale your Node.js app to 50 instances, and each has a pool of 20 connections, you hit 1000 connections, crashing the DB with out-of-memory errors. PgBouncer multiplexes thousands of virtual connections into a small handful of actual DB connections.

### 2. JSONB for Semi-Structured Data
- **Best Practice**: Use `JSONB` (never `JSON`) for data that doesn't fit neatly into rows/columns (e.g., user settings, dynamic form payloads, webhook data).
- **Why?**: `JSONB` is stored in a decomposed binary format, allowing you to index keys and query inside the JSON extremely fast.
- **Limit**: Do not use `JSONB` as an excuse to avoid normalization. If you find yourself frequently updating nested keys inside a `JSONB` column, it should probably be its own relational table.

### 3. Partial and Expression Indexes
- **Best Practice**: Create indexes only on the data you query.
- **Example**: If you frequently query for active users, instead of indexing the whole `users` table, create a partial index:
  `CREATE INDEX idx_active_users ON users (email) WHERE status = 'active';`
- **Why?**: It saves massive amounts of disk space and memory.

### 4. Sequential UUIDs (v7)
- **Best Practice**: If using UUIDs as primary keys, use sequential UUIDs (UUID v7) rather than entirely random UUIDs (UUID v4).
- **Why?**: B-Tree indexes (the default in Postgres) perform terribly with random data because every insert causes page splits and fragmentation. Sequential UUIDs sort chronologically, ensuring inserts happen at the end of the B-Tree index smoothly.

## What NOT to Implement (The "Don'ts")

### 1. The EAV Anti-Pattern
- **Anti-Pattern**: Entity-Attribute-Value (EAV). Creating tables like `entity_id`, `attribute_name`, `attribute_value` to represent dynamic schemas.
- **Why?**: Querying EAV tables requires massive, convoluted `JOIN` statements that absolutely destroy query planner performance.
- **Solution**: Use `JSONB` instead.

### 2. Long-Running Transactions
- **Anti-Pattern**: Opening a database transaction, making an external API call (e.g., charging a credit card), and then committing the transaction.
- **Why?**: If the API takes 5 seconds to respond, you are holding a database lock and a connection open for 5 seconds. This will instantly exhaust your connection pool under load.
- **Solution**: Do all external I/O *before* or *after* the database transaction. Transactions should only wrap local database queries and execute in milliseconds.

### 3. Over-Indexing
- **Anti-Pattern**: Adding an index to every single column just in case.
- **Why?**: Every index slows down `INSERT`, `UPDATE`, and `DELETE` operations because the database has to write the data to the table and then update every single index tree.

## Security & Maintenance

### Principle of Least Privilege
- The application's database user must only hold `SELECT`, `INSERT`, `UPDATE`, `DELETE` on application tables — never `DROP`, `CREATE`, `TRUNCATE`, or `GRANT`.
- Run migrations with a separate **migration role** that holds DDL privileges; the application connects with a different, more restricted role at runtime.
- **Example**:
  ```sql
  CREATE ROLE app_runtime LOGIN PASSWORD '...';
  GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_runtime;
  REVOKE CREATE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM app_runtime;
  ```

### Row-Level Security (RLS) for Multi-Tenant Data
- For multi-tenant tables, enable Postgres's native Row-Level Security instead of relying solely on `WHERE tenant_id = ...` in application code — it's a second, database-enforced layer that still protects data even if a query forgets the filter.
  ```sql
  ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
  CREATE POLICY tenant_isolation ON orders
    USING (tenant_id = current_setting('app.current_tenant')::uuid);
  ```

### Injection Prevention
- Never build a query with string concatenation, including in raw `$queryRawUnsafe` calls. Always use parameterized queries or the ORM's tagged-template raw query helper (see the `$queryRaw` example above) — Postgres treats parameters strictly as data, not executable SQL.

### Soft Deletes & Unique Constraints
- **Warning**: If you use a `deleted_at` column (soft deletes), traditional `UNIQUE` constraints will break (e.g., a user deletes their account and tries to sign up again with the same email, but the DB blocks it).
- **Solution**: Use a partial unique index: `CREATE UNIQUE INDEX unique_active_email ON users (email) WHERE deleted_at IS NULL;`.

### Performance Tracking
- Always enable the `pg_stat_statements` extension in production. It tracks planning and execution statistics for all SQL statements, allowing DBAs to instantly identify the slowest and most frequent queries consuming CPU.

---

## Prisma ORM with PostgreSQL

Prisma is the recommended ORM for all Node.js (NestJS / Express) projects using PostgreSQL.

### Setup

```bash
npm install prisma @prisma/client
npx prisma init --datasource-provider postgresql
```

```dotenv
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public&connection_limit=10"
```

### Schema Definition

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String     @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email     String     @unique @db.VarChar(255)
  firstName String     @map("first_name")
  lastName  String     @map("last_name")
  status    UserStatus @default(ACTIVE)
  metadata  Json?                          // Maps to JSONB in PostgreSQL
  createdAt DateTime   @default(now()) @map("created_at")
  updatedAt DateTime   @updatedAt @map("updated_at")
  deletedAt DateTime?  @map("deleted_at")

  orders Order[]

  @@index([status])
  @@index([email], where: "deleted_at IS NULL")  // Partial index for soft deletes
  @@map("users")
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}
```

> Use `@db.Uuid` with `gen_random_uuid()` for UUID v4, or install `pgcrypto` for UUID v7 (sequential). Sequential UUIDs are strongly preferred for performance — see the Sequential UUIDs section above.

### Common Query Patterns

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Paginated list with filtering
const users = await prisma.user.findMany({
  where: {
    status: 'ACTIVE',
    deletedAt: null,
  },
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { createdAt: 'desc' },
  select: {
    id: true,
    email: true,
    firstName: true,
    orders: { select: { id: true, total: true } },
  },
})

// Atomic transaction — keep it short, no external I/O inside
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { ... } })
  await tx.auditLog.create({ data: { userId: user.id, action: 'USER_CREATED' } })
  return user
})

// Raw query with parameterized values (safe — no string concatenation)
const rows = await prisma.$queryRaw`
  SELECT id, email FROM users
  WHERE status = ${status}
  AND created_at > ${startDate}
  LIMIT ${limit}
`
```

### Migrations

```bash
# Create and apply a new migration
npx prisma migrate dev --name add_user_status_column

# Deploy pending migrations (CI / production)
npx prisma migrate deploy

# Reset and re-seed (development only — destructive)
npx prisma migrate reset
```

### NestJS Integration

```ts
// src/database/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
```

Register `PrismaService` as a provider in a shared `DatabaseModule` and export it for injection across feature modules.

---

## JSONB Queries

```sql
-- Store and query semi-structured data
ALTER TABLE users ADD COLUMN metadata JSONB DEFAULT '{}';

-- Query a specific key inside JSONB
SELECT id, email
FROM users
WHERE metadata->>'subscription_tier' = 'pro';

-- Existence of a key
SELECT id FROM users WHERE metadata ? 'onboarding_completed';

-- JSONB containment — find all users with a specific tag
SELECT id FROM users WHERE metadata @> '{"tags": ["beta-tester"]}';

-- Index a JSONB key for fast lookup
CREATE INDEX idx_users_subscription ON users ((metadata->>'subscription_tier'));

-- GIN index for full JSONB path lookups
CREATE INDEX idx_users_metadata_gin ON users USING GIN (metadata);
```

---

## EXPLAIN ANALYZE — Finding Slow Queries

Always run `EXPLAIN (ANALYZE, BUFFERS)` before deploying a query that touches large tables. Look for `Seq Scan` — it means a missing index.

```sql
-- Run explain analyze
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.id, u.email, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.status = 'ACTIVE'
GROUP BY u.id;

-- Output to look for:
-- Seq Scan on users     → BAD: full table scan, needs index
-- Index Scan on users   → GOOD: uses idx_users_status
-- Buffers: hit=128      → Data came from cache
-- Buffers: read=4096    → Data read from disk (expensive)
```

```sql
-- Identify the slowest queries in production
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

---

## Full-Text Search

Use PostgreSQL's built-in full-text search for fast document search without needing Elasticsearch for moderate data sizes.

```sql
-- Add a tsvector column (stored, auto-updated)
ALTER TABLE products ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))
  ) STORED;

-- Create a GIN index on it
CREATE INDEX idx_products_fts ON products USING GIN (search_vector);

-- Search
SELECT id, name
FROM products
WHERE search_vector @@ plainto_tsquery('english', 'wireless keyboard')
ORDER BY ts_rank(search_vector, plainto_tsquery('english', 'wireless keyboard')) DESC
LIMIT 20;
```

```ts
// With Prisma raw query
const results = await prisma.$queryRaw`
  SELECT id, name,
    ts_rank(search_vector, query) AS rank
  FROM products,
    plainto_tsquery('english', ${searchTerm}) AS query
  WHERE search_vector @@ query
  ORDER BY rank DESC
  LIMIT 20
`
```

---

## Window Functions

Use window functions for running totals, ranking, and row numbering — without a subquery.

```sql
-- Rank users by order count within their region
SELECT
  id,
  email,
  region,
  order_count,
  RANK() OVER (PARTITION BY region ORDER BY order_count DESC) AS region_rank
FROM user_stats;

-- Running total of daily revenue
SELECT
  date,
  daily_revenue,
  SUM(daily_revenue) OVER (ORDER BY date) AS cumulative_revenue
FROM daily_sales;

-- Get the most recent order per user (deduplication pattern)
SELECT DISTINCT ON (user_id) user_id, id AS order_id, created_at
FROM orders
ORDER BY user_id, created_at DESC;
```
