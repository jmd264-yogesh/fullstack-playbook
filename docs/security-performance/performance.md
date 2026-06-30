# Performance Standards

Performance is a feature. Slow systems lead to churn and high infrastructure costs.

## 1. Frontend Performance Budgets
- **Core Web Vitals**:
  - **LCP (Largest Contentful Paint)**: < 2.5 seconds.
  - **FID (First Input Delay)**: < 100 milliseconds.
  - **CLS (Cumulative Layout Shift)**: < 0.1.
- **Bundle Size**: Initial JS bundle must not exceed 200KB (gzipped). Use code splitting heavily.

## 2. API Response Targets
- **p95 Latency**: 95% of API requests must complete in under **250ms**.
- **Heavy Queries**: Any query taking longer than 1 second must be offloaded to an asynchronous background queue (Kafka/Redis) and return a `202 Accepted` to the client.

## 3. Caching Strategy
- **Client-Side**: Utilize `ETag` and `Cache-Control` headers for static assets.
- **CDN**: All static assets (images, CSS, JS) must be served via a CDN (Cloudflare/CloudFront).
- **Application**: Frequently accessed, rarely mutating data (e.g., product catalogs, feature flags) must be cached in Redis to protect the primary database.
