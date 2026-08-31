# Cost Management

**Level:** 🟡 Intermediate - assumes basic technical/business context

## Simple explanation

Cost is an architecture concern, not just a finance concern. Every reliability, scalability, and performance decision has a cost attached, and the right level of investment in each is the level that matches actual business need - not the maximum available.

## Cost vs reliability trade-off

More reliability almost always costs more: redundant infrastructure across multiple availability zones, higher-tier managed services, more aggressive autoscaling headroom, more engineering time spent on resilience instead of features. This is a legitimate trade-off, not a failure to optimize - see [Availability](/production-reliability/availability)'s downtime-by-nines table for how sharply cost tends to rise with each additional "nine."

The right question isn't "how do we make this as reliable as possible" - it's "what level of reliability does this specific system's business impact justify, and what does that cost?" This mirrors the [Architecture Trade-offs](/architecture/architecture-trade-offs) framework, with cost as one of the explicit dimensions.

## Right-sizing

- **Compute**: provisioned capacity should track actual measured load (see [Capacity Planning](/production-reliability/capacity-planning)), not a guess made once at launch and never revisited.
- **Storage**: data that's rarely accessed belongs in cheaper, slower storage tiers; hot, frequently-accessed data justifies faster, pricier storage.
- **Managed services vs self-hosted**: a managed service often costs more per unit but removes operational burden - see [Build vs Buy](/architecture/build-vs-buy) for that trade-off in general.

## Common sources of unnecessary cost

- Over-provisioned infrastructure sized for a peak load that never materialized, and never revisited.
- Redundancy applied uniformly across a system, including to non-critical components that don't need it.
- Idle or forgotten environments (old preview deployments, unused databases) left running.
- Data retained indefinitely with no lifecycle policy, when older data has no ongoing business or compliance need.

## Cost as a signal, not just an expense

A sudden or steadily climbing cloud bill is often the first visible sign of a real underlying problem - a runaway query, a misconfigured autoscaler, a memory leak causing constant restarts. Cost monitoring, alongside [Observability](/operations/observability), is a legitimate early-warning signal, not purely a finance concern.

## When to invest more, not less

- The cost of an outage or slow degradation (lost revenue, breached SLA, reputational damage) clearly exceeds the cost of the infrastructure that would have prevented it.
- Growth is measured and real (see [Capacity Planning](/production-reliability/capacity-planning)), and under-provisioning now creates a bigger, more expensive fire later.

## Common mistakes

::: warning Common mistakes
- Treating cost optimization purely as a finance/ops exercise disconnected from architecture decisions that actually drive it.
- Cutting cost by removing redundancy or monitoring on a system whose actual failure cost was never assessed.
- Optimizing cost once and never revisiting it as load, usage patterns, and cloud pricing all change over time.
:::

## Where this leads

- [Capacity Planning](/production-reliability/capacity-planning)
- [Architecture Trade-offs](/architecture/architecture-trade-offs)
- [Build vs Buy](/architecture/build-vs-buy)
