# Availability

**Level:** 🟡 Intermediate - assumes basic technical/business context

## Simple explanation

Availability is whether the system is up and responding when someone tries to use it. It's usually expressed as a percentage of time over a period - "99.9% available" means the system was reachable and functioning 99.9% of the time in that window.

## Why it matters

A system that's unavailable can't create the business value it exists for, no matter how well it was built. Availability is the most visible reliability property to users and clients - it's the difference between "it's slow" (still working) and "it's down" (not working at all).

## What availability actually costs in downtime

| Availability | Downtime per year | Downtime per month |
|---|---|---|
| 99% | ~3.65 days | ~7.3 hours |
| 99.9% | ~8.76 hours | ~43.2 minutes |
| 99.95% | ~4.38 hours | ~21.6 minutes |
| 99.99% | ~52.6 minutes | ~4.3 minutes |

Each additional "nine" costs meaningfully more in engineering effort and infrastructure - see [Cost Management](/production-reliability/cost-management). Most internal tools don't need 99.99%; some customer-facing payment paths might.

## How availability is achieved

- **Redundancy**: no single instance, server, or availability zone is a single point of failure - traffic can be served by another instance if one fails.
- **Failover**: when a component fails, traffic is automatically redirected to a healthy one, ideally without the user noticing.
- **Health checks**: the system can detect its own unhealthy instances and remove them from rotation before they cause user-facing failures - see the [Microservice Checklist](/architecture/standards)'s health check requirement.
- **Graceful degradation**: a non-critical dependency failing (e.g. a recommendations service) shouldn't take down the critical path (e.g. checkout).

## When high availability matters most

- Customer-facing systems where downtime directly costs revenue or trust.
- Systems other critical processes depend on (an auth service being down takes everything downstream with it).

## When to not over-invest

- Internal tools used during business hours only, where a short outage is an inconvenience, not a crisis.
- Early-stage products where engineering effort is better spent validating the product than building redundancy for load that doesn't exist yet.

## Common mistakes

::: warning Common mistakes
- Chasing "five nines" for a system where the business impact of downtime doesn't justify the cost - see [SLI / SLO / SLA](/production-reliability/sli-slo-sla) for tying the target to actual impact.
- Confusing availability with reliability - a system can be "up" and still returning wrong answers or losing data. See [Reliability](/production-reliability/reliability).
- Building redundancy for the application tier while leaving a single database instance as an unaddressed single point of failure.
:::

## Where this leads

- [Reliability](/production-reliability/reliability)
- [SLI / SLO / SLA](/production-reliability/sli-slo-sla)
- [Disaster Recovery & Backups](/operations/disaster-recovery)
