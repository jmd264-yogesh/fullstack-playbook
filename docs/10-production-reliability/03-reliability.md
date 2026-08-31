# Reliability

**Level:** 🟡 Intermediate - assumes basic technical/business context

## Simple explanation

Reliability is whether the system does the *correct* thing, consistently, every time it's used - not just whether it's reachable. [Availability](/production-reliability/availability) asks "is it up?"; reliability asks "when it's up, does it work correctly?" A system can be 100% available and still be unreliable - responding instantly with the wrong answer, silently dropping data, or intermittently failing one request in a hundred.

## Real-world analogy

A vending machine that's always switched on (available) but sometimes takes your money and gives you the wrong snack, or nothing at all, is unavailable in the way that actually matters to the person using it.

## MTBF and MTTR

Two standard measures describe reliability over time:

- **MTBF (Mean Time Between Failures)**: on average, how long does the system run correctly before something goes wrong?
- **MTTR (Mean Time To Recovery)**: once something goes wrong, how long until it's fixed?

Both matter, and they're not interchangeable - a system that fails often but recovers in seconds can be more reliable in practice than one that rarely fails but takes hours to recover from when it does. MTTR is covered in operational depth in [Incident Management](/operations/incident-management) - this page is about designing for reliability before an incident happens, not responding to one.

## What causes unreliability

- **Untested edge cases** that only occur in production traffic patterns.
- **Silent failures** - a background job that fails without alerting anyone, or an API that returns a stale cached response without indicating staleness.
- **Data loss or corruption** from unhandled partial failures (a multi-step operation that completes step 1 and 2 but fails silently at step 3).
- **Flaky dependencies** - a downstream service or network call that intermittently fails, and the calling code doesn't retry or handle it.

## Designing for reliability

- **Idempotency**: operations that can be safely retried without unintended side effects (a duplicate charge, a duplicate email) - see the [API Standards](/architecture/api-standards) idempotency key requirement.
- **Explicit error handling**: failures should be caught, logged, and either recovered from or surfaced - never swallowed silently.
- **Testing for failure, not just success**: [Integration Testing](/security/testing/integration-testing) and [E2E Testing](/security/testing/e2e-testing) should include what happens when a dependency is slow, down, or returns bad data.
- **Observability**: you cannot know a system is unreliable if failures aren't visible - see [Observability](/operations/observability) and [Logging Standards](/operations/logging-standards).

## When reliability work is worth prioritizing

- The system's failures cause data loss, financial impact, or safety issues - reliability work here isn't optional polish, it's a requirement.
- Failures are frequent enough that they erode user trust even if each one is individually minor.

## When to be pragmatic

- A rarely-used internal tool with low-stakes failures doesn't need the same reliability investment as a payment path - match the investment to the actual cost of failure, per [Architecture Trade-offs](/architecture/architecture-trade-offs).

## Common mistakes

::: warning Common mistakes
- Treating "it hasn't failed yet" as evidence of reliability, rather than evidence that it hasn't been tested against the right conditions yet.
- Fixing the symptom of an unreliable dependency (adding a retry) without addressing why it fails in the first place.
- No monitoring on background/asynchronous work, so failures there are invisible until someone notices missing data downstream.
:::

## Where this leads

- [Availability](/production-reliability/availability)
- [SLI / SLO / SLA](/production-reliability/sli-slo-sla)
- [Incident Management](/operations/incident-management)
