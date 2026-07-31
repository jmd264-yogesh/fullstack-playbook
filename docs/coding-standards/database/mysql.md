# MySQL Best Practices & Standards

MySQL is the standard database for rapid SaaS products and Laravel-backed applications. While simpler than PostgreSQL for basic workloads, it requires the same level of discipline around schema design, indexing, and connection management.

---

## What to Implement (The "Dos")

### 1. Use InnoDB Storage Engine
- **Best Practice**: Always use the **InnoDB** storage engine (the default since MySQL 5.5).
- **Why?**: InnoDB supports ACID-compliant transactions, foreign key constraints, and row-level locking. The legacy **MyISAM** engine does not support transactions - never use it for application data.

### 2. Explicit Character Set - utf8mb4
- **Best Practice**: Set the database, tables, and columns to `utf8mb4` with `utf8mb4_unicode_ci` collation.
- **Why?**: MySQL's `utf8` is a 3-byte encoding that cannot store 4-byte Unicode characters (e.g., emojis, many CJK characters). `utf8mb4` is the true UTF-8 encoding.

```sql
CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```dotenv
# Laravel .env
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci
```

### 3. Composite Index Design
- **Best Practice**: Design indexes to match your most frequent query patterns (equality filters first, then range filters).
- **Why?**: MySQL's query optimizer uses the leftmost prefix of a composite index. An index on `(status, created_at)` supports queries filtering on `status` alone or `status + created_at`, but NOT on `created_at` alone.

```sql
-- Supports: WHERE status = 'active' AND created_at > '2024-01-01'
-- Supports: WHERE status = 'active'
-- Does NOT support: WHERE created_at > '2024-01-01' alone
CREATE INDEX idx_orders_status_created ON orders (status, created_at);
```

### 4. Use `EXPLAIN` Before Deploying Queries
- **Best Practice**: Run `EXPLAIN` on any query that touches more than 10,000 rows before merging.
- **Why?**: Catches full table scans and missing indexes at development time rather than in production.

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 42 AND status = 'pending';
```

Look for `type = ALL` (full scan) - this must be resolved with an appropriate index.

### 5. Soft Deletes with Partial-Equivalent Indexes
- **Best Practice**: If using soft deletes (`deleted_at` column), filter out deleted records in your default scopes.

```sql
-- Create a compound index including the soft-delete column for common queries
CREATE INDEX idx_users_active ON users (email, deleted_at);
```

---

## What NOT to Implement (The "Don'ts")

### 1. SELECT *
- **Anti-Pattern**: Using `SELECT *` in production queries.
- **Why?**: It fetches columns you don't need, increases memory usage, and breaks if columns are reordered or removed. Always select only the columns you need.

### 2. Implicit Type Conversions
- **Anti-Pattern**: Comparing a string column to an integer (or vice versa) in a `WHERE` clause.
- **Why?**: MySQL silently converts the type, which prevents the query from using indexes and causes a full table scan.
  ```sql
  -- Bad: user_id is VARCHAR, but compared to INT - index not used
  SELECT * FROM sessions WHERE user_id = 123;

  -- Good: match the column type
  SELECT * FROM sessions WHERE user_id = '123';
  ```

### 3. Functions on Indexed Columns in WHERE Clauses
- **Anti-Pattern**: Wrapping an indexed column in a function inside a `WHERE` clause.
- **Why?**: The database cannot use the index because it must evaluate the function for every row.
  ```sql
  -- Bad: index on created_at cannot be used
  WHERE YEAR(created_at) = 2024

  -- Good: range query uses the index
  WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31'
  ```

---

## Security

### 1. Parameterized Queries - Never String Concatenation

```php
// Bad - SQL Injection vulnerability
$users = DB::select("SELECT * FROM users WHERE email = '$email'");

// Good - Parameterized query
$users = DB::select('SELECT * FROM users WHERE email = ?', [$email]);
// Or with Eloquent
$user = User::where('email', $email)->first();
```

### 2. Principle of Least Privilege
- The application database user must only have `SELECT`, `INSERT`, `UPDATE`, `DELETE` permissions on the application database - never `DROP`, `CREATE`, or `GRANT`.
- Run migrations with a separate **migration user** that has DDL permissions.

---

## Prisma ORM with MySQL

Prisma works with MySQL using the same schema syntax as PostgreSQL, with minor differences.

### Setup

```bash
npm install prisma @prisma/client
npx prisma init --datasource-provider mysql
```

```dotenv
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
```

### Schema

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique @db.VarChar(255)
  firstName String   @map("first_name") @db.VarChar(100)
  lastName  String   @map("last_name") @db.VarChar(100)
  status    String   @default("active") @db.VarChar(20)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  orders Order[]

  @@index([status, createdAt])  // Composite index
  @@map("users")
}
```

>[!Note]
 **MySQL vs PostgreSQL in Prisma**: MySQL does not support native `uuid()` in `@default()`. Use `@default(autoincrement())` for integer PKs, or generate UUIDs in your application layer (`@default(uuid())` with Prisma's `uuid()` function is supported from Prisma 5+).

### Common Queries

```ts
// Filtered list with pagination
const users = await prisma.user.findMany({
  where: {
    status: 'active',
    deletedAt: null,
  },
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { createdAt: 'desc' },
})

// Raw query when ORM falls short
const result = await prisma.$queryRaw`
  SELECT u.id, COUNT(o.id) as order_count
  FROM users u
  LEFT JOIN orders o ON o.user_id = u.id
  WHERE u.status = 'active'
  GROUP BY u.id
`
```

### Migrations with Prisma

```bash
# Create and apply a migration
npx prisma migrate dev --name add_user_status

# Apply pending migrations in CI/production
npx prisma migrate deploy

# Inspect the current DB state
npx prisma studio
```

---

## Eloquent ORM with MySQL (Laravel)

Eloquent is the default and only ORM for Laravel projects. Full standards are in [PHP Laravel](/coding-standards/backend/laravel).

### Schema & Migration Example

```php
// database/migrations/2024_01_01_create_users_table.php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('first_name', 100);
    $table->string('last_name', 100);
    $table->string('email', 255)->unique();
    $table->string('status', 20)->default('active')->index();
    $table->timestamps();
    $table->softDeletes();

    $table->index(['status', 'created_at']);  // Composite index
});
```

### Eloquent Key Patterns

```php
// Define relationships
class User extends Model
{
    use SoftDeletes;

    protected $fillable = ['first_name', 'last_name', 'email', 'status'];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }
}

// Eager load to prevent N+1
$users = User::active()
    ->with('orders')
    ->latest()
    ->paginate(20);
```

### Chunking Large Datasets

```php
// Never load 1 million rows into memory at once
User::chunk(500, function (Collection $users) {
    foreach ($users as $user) {
        // Process each batch of 500
    }
});

// Or use lazy collections
User::lazy()->each(function (User $user) {
    // Memory-efficient, cursor-based
});
```

---

## Transactions

Always wrap multi-step writes in a transaction. If any step fails, the whole unit rolls back.

```sql
-- Raw SQL transaction
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
INSERT INTO transfer_log (from_id, to_id, amount) VALUES (1, 2, 500);

COMMIT;
-- If any statement fails: ROLLBACK;
```

```ts
// Prisma transaction in NestJS
const result = await prisma.$transaction(async (tx) => {
  await tx.account.update({ where: { id: fromId }, data: { balance: { decrement: amount } } })
  await tx.account.update({ where: { id: toId }, data: { balance: { increment: amount } } })
  const log = await tx.transferLog.create({ data: { fromId, toId, amount } })
  return log
})
```

```php
// Laravel Eloquent transaction
DB::transaction(function () use ($fromId, $toId, $amount) {
    Account::where('id', $fromId)->decrement('balance', $amount);
    Account::where('id', $toId)->increment('balance', $amount);
    TransferLog::create(['from_id' => $fromId, 'to_id' => $toId, 'amount' => $amount]);
});
```

---

## Full-Text Search

MySQL's built-in full-text search works well for moderate datasets before reaching for Elasticsearch.

```sql
-- Add FULLTEXT index (InnoDB, MySQL 5.6+)
ALTER TABLE products ADD FULLTEXT INDEX ft_name_desc (name, description);

-- Natural language search (relevance ranked)
SELECT id, name,
  MATCH(name, description) AGAINST ('wireless keyboard' IN NATURAL LANGUAGE MODE) AS score
FROM products
WHERE MATCH(name, description) AGAINST ('wireless keyboard' IN NATURAL LANGUAGE MODE)
ORDER BY score DESC
LIMIT 20;

-- Boolean mode - supports + - * operators
SELECT id, name FROM products
WHERE MATCH(name, description) AGAINST ('+wireless -bluetooth keyboard*' IN BOOLEAN MODE);
```

```php
// Laravel Eloquent with full-text
$products = Product::whereRaw(
    'MATCH(name, description) AGAINST (? IN NATURAL LANGUAGE MODE)',
    [$searchTerm]
)->orderByRaw(
    'MATCH(name, description) AGAINST (? IN NATURAL LANGUAGE MODE) DESC',
    [$searchTerm]
)->limit(20)->get();
```

---

## EXPLAIN Output - Reading Results

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 42 AND status = 'pending';

-- +----+-------------+--------+-------+-------------------+-------------------+
-- | id | select_type | table  | type  | possible_keys     | key               |
-- +----+-------------+--------+-------+-------------------+-------------------+
-- |  1 | SIMPLE      | orders | ref   | idx_user_status   | idx_user_status   |
-- +----+-------------+--------+-------+-------------------+-------------------+
-- | rows | Extra                  |
-- +------+------------------------+
-- |    3 | Using index condition  |   ← GOOD: index used, 3 rows examined
```

Key things to check:
- `type = ALL` → full table scan - **must** add an index
- `type = ref` or `range` → index is being used - good
- `rows` → estimated row count scanned - lower is better
- `Extra: Using filesort` → costly in-memory sort - consider adding the sort column to the index

---

## Performance Tracking

- Enable **MySQL slow query log** in production (`long_query_time = 1` second).
- Use **`performance_schema`** to identify the most resource-intensive queries.
- Run **`ANALYZE TABLE`** periodically on large tables to keep statistics current.
