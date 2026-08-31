# Production & Reliability

**Level:** 🟡 Intermediate - assumes basic technical/business context

::: tip Core idea
Production readiness is not a checkbox completed once at launch - it's an ongoing discipline that keeps a system trustworthy for as long as it stays live.
:::

The [Production Readiness Checklist](/templates/production-readiness) captures the concrete, one-time gate a service passes through before its first launch. This section covers the *ongoing* concepts behind that checklist - the properties a system must keep earning, release after release.

## What this section covers

| Page | What it answers |
|---|---|
| [Availability](/production-reliability/availability) | Is the system up when someone needs it? |
| [Reliability](/production-reliability/reliability) | Does the system behave correctly every time it's up? |
| [Performance](/production-reliability/performance) | Is the system fast enough for what it's actually being used for? |
| [Scalability](/production-reliability/scalability) | Can the system handle more load without falling over - and does it need to yet? |
| [Capacity Planning](/production-reliability/capacity-planning) | Do we know how close to our limits we are, before we hit them? |
| [SLI / SLO / SLA](/production-reliability/sli-slo-sla) | How do we define and measure "good enough," in numbers everyone agrees on? |
| [Cost Management](/production-reliability/cost-management) | What does keeping this reliable actually cost, and is that cost justified? |

## Why this is its own section

Reliability, performance, and scalability are frequently treated as things you "add later" once the product proves itself. In practice, decisions made at design time - a database choice, a synchronous dependency chain, an unmonitored background job - determine most of a system's eventual reliability ceiling. This section exists so those properties are considered as first-class design concerns, not urgent afterthoughts discovered during an incident.

## How this connects to the rest of the playbook

- [Architecture Trade-offs](/architecture/architecture-trade-offs) explicitly includes reliability, scalability, and operational burden as dimensions to weigh at design time.
- [Observability](/operations/observability), [Incident Management](/operations/incident-management), and [Disaster Recovery & Backups](/operations/disaster-recovery) are the operational practices that keep these properties intact in production.
- [Measuring Business Value](/business-foundations/measuring-business-value) reminds you that reliability isn't an engineering vanity metric - it's directly tied to whether the business outcome the system exists for actually keeps happening.

## Where to start

If you're designing a new system, read [SLI / SLO / SLA](/production-reliability/sli-slo-sla) first - defining what "good enough" means in measurable terms shapes every other decision in this section. If you're already operating a live system, start with [Capacity Planning](/production-reliability/capacity-planning) to understand how close you are to your actual limits.
