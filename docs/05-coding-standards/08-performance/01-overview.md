# Performance Standards

Performance is a feature. Slow applications lose users, increase infrastructure costs, and degrade developer confidence. These standards define how to build and measure performance across page loading, API latency, and scalability.

## Code Optimization

### General Rules

- **Measure before optimizing.** Never optimize code based on intuition alone - profile first, fix what the data shows.
- **The 80/20 rule.** 20% of code paths generate 80% of the performance cost. Find the hotspots.
- **Avoid premature optimization.** Write clear, correct code first. Optimize only when you have evidence of a problem.

### Avoid Expensive Operations in Render Loops

```ts
// ❌ Recalculates on every render
function OrderList({ orders }) {
  const total = orders.reduce((sum, o) => sum + o.amount, 0)  // Runs on every render
  return <div>{total}</div>
}

// ✅ Memoized - only recalculates when orders changes
function OrderList({ orders }) {
  const total = useMemo(
    () => orders.reduce((sum, o) => sum + o.amount, 0),
    [orders]
  )
  return <div>{total}</div>
}
```

### Avoid N+1 Queries

The N+1 problem is the single most common cause of backend performance degradation.

```ts
// ❌ NestJS - 1 query for users + N queries for orders (N+1)
const users = await prisma.user.findMany()
for (const user of users) {
  user.orders = await prisma.order.findMany({ where: { userId: user.id } })
}

// ✅ Single query with include
const users = await prisma.user.findMany({
  include: { orders: true },
})
```

```php
// ❌ Laravel - N+1 with lazy loading
$users = User::all();
foreach ($users as $user) {
  echo $user->orders->count();  // Query per user
}

// ✅ Eager loading - 2 queries total
$users = User::with('orders')->get();
```

### Database Query Optimization

- Always select only the columns you need - avoid `SELECT *`.
- Add indexes for columns used in `WHERE`, `ORDER BY`, and `JOIN` clauses.
- Use `EXPLAIN ANALYZE` (PostgreSQL) or `EXPLAIN` (MySQL) to profile slow queries.
- Batch bulk inserts instead of inserting row-by-row.

```ts
// ❌ Row-by-row insert - N round trips to the database
for (const item of items) {
  await prisma.orderItem.create({ data: item })
}

// ✅ Bulk insert - 1 round trip
await prisma.orderItem.createMany({ data: items })
```

## Page Loading

### Core Web Vitals Targets

| Metric | Target | Description |
|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | Time until the largest visible element renders |
| **FID** (First Input Delay) / **INP** | ≤ 100ms | Time until the page responds to the first user interaction |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | Measure of visual instability (elements jumping around) |
| **TTFB** (Time to First Byte) | ≤ 800ms | Time until the browser receives the first byte from the server |

### Next.js Page Loading Optimizations

#### Server Components First

Use React Server Components (RSC) for data-fetching pages. They render on the server and send zero JavaScript to the client.

```tsx
// ✅ Server Component - no client-side JS, data fetched at build/request time
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id)  // Server-side fetch
  return <ProductDetails product={product} />
}
```

#### Code Splitting & Dynamic Imports

```tsx
import dynamic from 'next/dynamic'

// ✅ Load heavy components only when needed
const HeavyChart = dynamic(() => import('@/common/components/HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false,  // Client-only component
})
```

#### Image Optimization

```tsx
import Image from 'next/image'

// ✅ next/image handles WebP conversion, lazy loading, and responsive sizes
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority  // Use for above-the-fold images
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

#### Font Optimization

```tsx
// ✅ next/font eliminates layout shift and network requests
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
```

#### Bundle Size Management

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

Rules:
- Keep the initial page JavaScript bundle under **200KB** (compressed).
- Avoid importing entire libraries when you need one function: `import { debounce } from 'lodash'` → `import debounce from 'lodash/debounce'`.
- Use tree-shakeable libraries.

## API Latency

### Latency Targets

| Endpoint Type | P50 Target | P95 Target | P99 Target |
|---|---|---|---|
| Simple read (single DB query) | < 50ms | < 150ms | < 300ms |
| Complex read (joins/aggregations) | < 100ms | < 300ms | < 500ms |
| Write operations | < 100ms | < 300ms | < 500ms |
| File uploads | Async - return a job ID immediately |

### Caching Strategy

#### HTTP Response Caching (Next.js)

```ts
// Cache a server fetch for 60 seconds (revalidate via stale-while-revalidate)
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 },
})

// Cache indefinitely, invalidate manually via tags
const data = await fetch('https://api.example.com/products', {
  next: { tags: ['products'] },
})

// Invalidate the cache from a Server Action
import { revalidateTag } from 'next/cache'
revalidateTag('products')
```

#### Redis Caching (Backend)

Cache expensive database query results for frequently-read, rarely-changed data.

```ts
// NestJS with Redis (ioredis)
async function getProductCatalog(): Promise<Product[]> {
  const cacheKey = 'product:catalog'
  const cached = await redis.get(cacheKey)

  if (cached) return JSON.parse(cached)

  const products = await prisma.product.findMany({ where: { active: true } })
  await redis.setex(cacheKey, 300, JSON.stringify(products))  // Cache for 5 minutes
  return products
}
```

Cache invalidation rule: **invalidate on write, not on read**. When a product is updated, delete the `product:catalog` key immediately.

#### TanStack Query Client Caching (Frontend)

```ts
// Configure stale time - data is considered fresh for 5 minutes
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,   // 5 minutes
      gcTime: 10 * 60 * 1000,     // Keep in cache for 10 minutes
      retry: 1,
    },
  },
})
```

### Async Processing for Long Operations

Never block an HTTP response for operations that take more than ~200ms.

```ts
// ❌ Blocking - client waits for the entire PDF to generate
@Post('invoices')
async generateInvoice(@Body() dto: CreateInvoiceDto) {
  const pdf = await this.pdfService.generate(dto)  // 3 seconds
  return { pdfUrl: pdf.url }
}

// ✅ Async - return a job ID immediately
@Post('invoices')
async generateInvoice(@Body() dto: CreateInvoiceDto) {
  const job = await this.queue.add('generate-invoice', dto)
  return { jobId: job.id, status: 'processing' }
}

@Get('invoices/:jobId/status')
async getJobStatus(@Param('jobId') jobId: string) {
  return this.queue.getJob(jobId)
}
```

## Scalability

### Horizontal Scaling Readiness

Applications must be designed to run as **stateless** processes. Any state shared between requests must live in an external system (database, Redis), not in application memory.

| Anti-Pattern | Problem | Solution |
|---|---|---|
| Storing session data in memory | Breaks when running multiple instances | Use Redis or database-backed sessions |
| In-memory caches (`Map`, `{}` at module level) | Each pod has its own cache - stale data | Use Redis for shared caching |
| Local file storage | Files only exist on one pod | Use S3 / Azure Blob / GCS |
| WebSocket state in memory | Socket connections are not shared | Use Redis pub/sub adapter for Socket.IO/NestJS |

### Database Scalability

#### Read Replicas

For read-heavy workloads, route read queries to a **read replica** and write queries to the primary:

```ts
// Prisma - configure read replica
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")       // Primary - writes
  directUrl = env("DATABASE_URL_READ")  // Read replica - reads
}
```

#### Connection Pool Sizing

```
Max connections = (CPU cores × 2) + effective spindle count

For a 4-core server: ~10 connections per application instance
For 10 app instances:  100 connections → use PgBouncer in front of PostgreSQL
```

#### Pagination - Never Use Offset on Large Tables

```ts
// ❌ Offset pagination - scans all previous rows, degrades at scale
const users = await prisma.user.findMany({ skip: 100000, take: 20 })

// ✅ Cursor pagination - uses index, O(1) regardless of position
const users = await prisma.user.findMany({
  take: 20,
  cursor: { id: lastSeenId },
  skip: 1,
  orderBy: { id: 'asc' },
})
```

### Load Testing

Before any major launch or traffic increase, run a load test to identify the breaking point.

**Recommended tool**: [k6](https://k6.io/)

```js
// k6 load test script
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp to 100 users
    { duration: '5m', target: 100 },   // Hold at 100 users
    { duration: '2m', target: 200 },   // Ramp to 200 users
    { duration: '2m', target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],    // Error rate under 1%
  },
}

export default function () {
  const res = http.get('https://staging.example.com/api/v1/products')
  check(res, { 'status is 200': (r) => r.status === 200 })
  sleep(1)
}
```

Target thresholds for load testing:
- P95 response time < 500ms under expected peak load
- Error rate < 1% under peak load
- Application remains stable at 2× expected peak (for headroom)

### Monitoring & Observability

Performance issues you cannot see are issues you cannot fix.

| Signal | What to Monitor | Tool |
|---|---|---|
| API latency | P50, P95, P99 per endpoint | Datadog, New Relic, Grafana |
| Error rate | 4xx and 5xx per endpoint | Sentry, Datadog |
| Database | Slow queries, connection pool saturation | `pg_stat_statements`, Datadog |
| Frontend | Core Web Vitals per page | Google Search Console, Vercel Analytics |
| Infrastructure | CPU, memory, disk per pod/instance | Datadog, CloudWatch |

Set up alerting thresholds - do not wait for users to report slowness.
