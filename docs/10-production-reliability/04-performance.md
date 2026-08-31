# Performance

**Level:** 🟡 Intermediate - assumes basic technical/business context

## Simple explanation

Performance is how fast and how efficiently a system responds to a given amount of work. The two core measures are **latency** (how long one request takes) and **throughput** (how many requests the system can handle in a given time).

## Latency vs throughput

| | Latency | Throughput |
|---|---|---|
| What it measures | Time for one request to complete | Number of requests handled per unit time |
| User-facing impact | "How long did I wait?" | "Can everyone use this at once?" |
| Improved by | Faster code paths, caching, fewer round trips | More capacity, parallelism, queuing, horizontal scaling |

Optimizing one doesn't automatically improve the other - a system can have low latency for a single request but low throughput under concurrent load (e.g. a single-threaded process with a fast happy path but no concurrency), or high throughput with individually slow requests (a batch system processing millions of records where no single record needs to be fast).

## "Fast enough for the problem" beats "fast in the abstract"

The right performance target depends entirely on what the system is for:

- A checkout button needs to feel instant - users abandon carts over seconds of delay.
- A nightly reconciliation batch job can reasonably take 20 minutes if it finishes well before anyone needs the result.
- An internal admin report run twice a month doesn't need sub-second response times.

Chasing performance the problem doesn't need is [premature optimization](/production-reliability/scalability) - effort spent there isn't available for the parts that actually matter to users or the business. Establish the actual requirement first (see [SLI / SLO / SLA](/production-reliability/sli-slo-sla)), then optimize toward it - not indefinitely past it.

## Where performance problems usually come from

- Unnecessary round trips (calling a database or API more times than needed for one logical operation - the classic N+1 query problem).
- Missing indexes or full table scans on large datasets.
- Synchronous work that could be deferred or parallelized.
- Fetching more data than is actually needed for the response.

## Engineering-level standards

This page is the conceptual layer above the concrete, stack-specific performance rules. For the engineering standards - caching strategy, bundle size budgets, query optimization patterns, and more - see [Performance Standards](/coding-standards/performance/overview).

## Common mistakes

::: warning Common mistakes
- Optimizing code paths that aren't actually the bottleneck, based on intuition rather than measurement - always profile before optimizing.
- Treating every millisecond as equally valuable, regardless of whether users or the business actually notice it.
- Ignoring throughput while optimizing latency, and discovering the system falls over under real concurrent load despite every individual request being fast in isolation.
:::

## Where this leads

- [Scalability](/production-reliability/scalability)
- [SLI / SLO / SLA](/production-reliability/sli-slo-sla)
- [Performance Standards](/coding-standards/performance/overview)
