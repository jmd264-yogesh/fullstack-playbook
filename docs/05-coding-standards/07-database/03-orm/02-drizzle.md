# Drizzle Best Practices & Standards

Drizzle is a lightweight, type-safe, SQL-first ORM. It is preferred for projects requiring maximum execution speed, minimal bundle sizes, and direct access to raw SQL features without losing type safety.

## What to Implement (The "Dos")

### 1. TypeScript Schema as Source of Truth
- **Best Practice**: Declare your schema structure directly in TypeScript files. This keeps database schemas close to application logic and allows automatic type inference.
- **Example**:
  ```ts
  import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
  
  export const users = pgTable('users', {
    id: varchar('id').primaryKey(),
    email: varchar('email').notNull().unique(),
  });
  ```

### 2. Prepared Statements for Performance
- **Best Practice**: Use prepared statements on high-throughput or latency-sensitive queries to cache query compilation and planning times.
- **Example**:
  ```ts
  const db = drizzle(pool);
  const userById = db.select().from(users).where(eq(users.id, placeholder('id'))).prepare('user_by_id');
  
  const result = await userById.execute({ id: userId });
  ```

### 3. Explicit Column Selection
- **Best Practice**: Only select the columns you need rather than querying the entire row, saving bandwidth and serialization overhead.
- **Example**:
  ```ts
  const list = await db.select({ id: users.id, email: users.email }).from(users);
  ```

### 4. Schema-First Migrations
- **Best Practice**: Use `drizzle-kit` to automatically generate SQL migration files from your TypeScript schemas and run them as part of your deployment.
- **Example**:
  ```bash
  npx drizzle-kit generate
  npx drizzle-kit migrate
  ```

## What NOT to Implement (The "Don'ts")

### 1. Bypassing Type Inference
- **Anti-Pattern**: Using `any` type overrides on query responses.
- **Solution**: Let Drizzle infer types natively, or use helper types like `InferSelectModel<typeof users>` to preserve type safety.

### 2. Nesting Heavy Subqueries
- **Anti-Pattern**: Writing overly complex nested SQL statements directly in your app.
- **Solution**: Use Drizzle's Relational Queries API (`db.query.users.findMany(...)`) for cleaner syntax, or move extreme logic into database Views.

### 3. Neglecting Indexing on FK Fields
- **Anti-Pattern**: Declaring relational tables without indexing the foreign keys.
- **Solution**: Always add an index to reference columns used in SQL `JOIN` constraints.

## Setup & Installation

Install the required packages and the driver for your database (using PostgreSQL as an example):

```bash
npm install drizzle-orm pg
npm install -D drizzle-kit @types/pg
```

Create a `drizzle.config.ts` configuration file:

```ts
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## Schema Definition

Define your tables, constraints, and relationships in a schema file:

```ts
// src/db/schema.ts
import { pgTable, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const userStatusEnum = pgEnum('user_status', ['ACTIVE', 'INACTIVE', 'SUSPENDED']);

export const users = pgTable('users', {
  id: varchar('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  status: userStatusEnum('status').default('ACTIVE').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
});

export const orders = pgTable('orders', {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id).notNull(),
  total: varchar('total').notNull(),
});

// Configure relationships
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));
```

## Common Query Patterns

### Query with Relations
Using Drizzle's Relational Query API:
```ts
const user = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.id, userId),
  with: {
    orders: true,
  },
});
```

### Paginated List (Offset-based)
```ts
import { and, isNull } from 'drizzle-orm';

const userList = await db.select()
  .from(users)
  .where(and(isNull(users.deletedAt)))
  .limit(pageSize)
  .offset((page - 1) * pageSize)
  .orderBy(desc(users.createdAt));
```

### Transactions
Ensure all operations are executed on the transaction context (`tx`):
```ts
const result = await db.transaction(async (tx) => {
  const [newUser] = await tx.insert(users).values({ id, email, firstName, lastName }).returning();
  await tx.insert(auditLogs).values({ userId: newUser.id, action: 'CREATE' });
  return newUser;
});
```

## Migrations

Generate migration files based on schema files:
```bash
npx drizzle-kit generate
```

Run migrations in production/CI environments:
```bash
npx drizzle-kit migrate
```
