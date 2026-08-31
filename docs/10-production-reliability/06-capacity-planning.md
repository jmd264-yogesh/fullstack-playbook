# Capacity Planning

**Level:** 🔴 Advanced - architecture/technical-decision depth

## Simple explanation

Capacity planning is knowing, in advance, how close a system is to its real limits - so that scaling decisions are made deliberately, before an outage forces them.

## Why it matters

Without capacity planning, the first sign of an approaching limit is often an incident: a database running out of connections, a queue backing up, a disk filling. Capacity planning turns that into a scheduled, low-drama piece of work instead of a 3am page.

## What to forecast

- **Current utilization**: CPU, memory, disk, database connections, queue depth - what's the current headroom against the actual ceiling?
- **Growth trend**: is load growing linearly, seasonally, or from a specific known event (a marketing campaign, a new large customer, a seasonal spike)?
- **Time to limit**: at the current growth rate, how long until a given resource hits a capacity that requires action?

## What to monitor before you need to scale

| Signal | Why it matters |
|---|---|
| Database connection pool usage | A common, often-overlooked hard ceiling long before CPU is the bottleneck |
| Queue/consumer lag | Growing lag means producers are outpacing consumers - an early warning before user-facing failures |
| Disk usage growth rate | Silent until it's a hard outage; needs a projected time-to-full, not just a current percentage |
| p95/p99 latency trend over time | Rising tail latency under stable load is often the earliest sign of an approaching capacity wall |
| Error rate under peak load | A spike in errors at known peak times (start of business day, month-end) is a capacity signal, not just a bug |

See [Observability](/operations/observability) for how these signals should be instrumented and alerted on in the first place.

## A practical cadence

- Review capacity trends on a regular cadence (monthly for most systems, more often for fast-growing ones), not only reactively after an incident.
- Tie capacity reviews to known business events - a marketing launch, a seasonal peak, a large new client going live - rather than treating growth as always-linear.
- Set a headroom threshold (e.g. "act when a resource exceeds 70% sustained utilization") so action happens before the limit, not at it.

## Common mistakes

::: warning Common mistakes
- Only discovering a capacity limit when it's already causing an outage.
- Scaling the component that's easiest to scale (adding app servers) instead of the one that's actually constrained (a database connection pool or a single-threaded queue consumer).
- Planning capacity based on average load instead of peak load - the peak, not the average, is what causes outages.
- Treating capacity planning as a one-time exercise rather than an ongoing practice tied to [Cost Management](/production-reliability/cost-management), since over-provisioned headroom has a real, ongoing cost too.
:::

## Where this leads

- [Scalability](/production-reliability/scalability)
- [Cost Management](/production-reliability/cost-management)
- [Observability](/operations/observability)
