# Monolith vs Microservices

**Level:** 🔴 Advanced - architecture/technical-decision depth

Microservices are a legitimate architecture for a specific set of problems. They are not a default, and they are not a sign of engineering maturity by themselves. This page extends the [Monorepo vs Polyrepo](/architecture/standards) and [Microservice Checklist](/architecture/standards) guidance already in Architecture Standards.

## The three real options

```mermaid
flowchart LR
    A["Monolith\n(single deployable)"] --> B["Modular Monolith\n(single deployable,\nclear internal boundaries)"]
    B --> C["Microservices\n(independently deployable services)"]
```

| Option | What it is | Best when |
|---|---|---|
| **Monolith** | One codebase, one deployable, shared database | Small team, early-stage product, low domain complexity |
| **Modular monolith** | One deployable, but internally structured into clear, decoupled modules with enforced boundaries | Most teams, most of the time - the usual right answer |
| **Microservices** | Independently deployable services, each owning its own data | Multiple teams with genuinely independent release cadences, or components with wildly different scaling needs |

A modular monolith gets most of the benefit people actually want from microservices - clear boundaries, testable modules, the option to extract a service later - without the distributed-systems tax.

## When microservices are the right call

- **Independent scaling needs**: one component has a load profile radically different from the rest (e.g. a video transcoding service vs. the rest of a CRUD app).
- **Independent team ownership**: multiple teams need to ship on their own schedule without coordinating a shared release.
- **Genuinely different reliability/deployment cadences**: one component changes daily, another almost never, and coupling their deploys creates unnecessary risk.
- **Regulatory or data-isolation boundaries** that require a hard separation of ownership and access.

## When NOT to use microservices

::: warning When NOT to use microservices
Don't adopt microservices because they are "modern," because a blog post recommended them, or because a past project used them. Specifically avoid microservices when:

- **A single small team owns the whole system.** Splitting it adds coordination overhead with no corresponding benefit - the same people now debug across network boundaries instead of function calls.
- **The domain boundaries aren't understood yet.** Splitting a system before you know where the real seams are locks in the wrong boundaries and is far more expensive to undo than refactoring a monolith's internal modules.
- **The team lacks the operational maturity to run a distributed system.** Microservices multiply your operational surface: service discovery, distributed tracing, retries, circuit breakers, versioned contracts, and eventual consistency all become required, not optional. If [Observability](/operations/observability) and [Incident Management](/operations/incident-management) aren't already solid for one service, they will not get easier for ten.
- **You're introducing Kubernetes to run three small services.** Kubernetes is a powerful answer to a specific set of orchestration problems (large numbers of services, complex scaling/scheduling needs, multi-team platform ownership). For a handful of services, the operational complexity of running and securing a cluster often costs more than the services themselves. A simpler deployment target (a managed container service, or even the monolith you already have) is usually the right call until that complexity is actually earned.
- **The real motivation is "resume-driven development."** If nobody can articulate the specific scaling, ownership, or reliability problem microservices solve here, that's a sign the architecture is being chosen before the problem.
:::

## Extended checklist

Before splitting a component into its own service, in addition to the [existing microservice checklist](/architecture/standards):

- Can you name the specific scaling, ownership, or reliability problem this split solves?
- Does the team have (or is building) the observability and on-call maturity to operate another independently-failing component?
- Have you tried a module boundary inside the monolith first, and hit a real limit (not a hypothetical one)?
- Is the data boundary genuinely separable, or will this create a distributed transaction problem you don't have today?

## Common mistakes

- Splitting along technical layers (a "frontend service," a "database service") instead of business capabilities - this creates chatty, tightly-coupled services that are worse than a monolith.
- Underestimating the cost of distributed debugging, versioned contracts between services, and data consistency across service boundaries.
- Treating microservices as a testing or deployment shortcut - in practice they require more testing discipline ([Integration Testing](/security/testing/integration-testing), [E2E Testing](/security/testing/e2e-testing)), not less.

## Where this leads

- [Sync vs Async](/architecture/sync-vs-async)
- [API vs Events](/architecture/api-vs-events)
- [Architecture Trade-offs](/architecture/architecture-trade-offs)
