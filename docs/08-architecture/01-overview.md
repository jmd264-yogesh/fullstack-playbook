# Architecture & Engineering Practices

This section covers the cross-cutting structural decisions that sit above any single feature or codebase - how services are split, how they talk to each other, when to build versus buy, and how those decisions get recorded so they survive team turnover.

## What this section covers

| Page | What it answers |
|---|---|
| [Architecture Standards](/architecture/standards) | Monorepo vs polyrepo guidance, event-driven patterns, and the microservice checklist |
| [API Standards](/architecture/api-standards) | REST conventions, error schema, pagination, and idempotency rules |
| [Build vs Buy](/architecture/build-vs-buy) | The decision framework for building custom vs adopting a vendor solution |
| [Monolith vs Modular Monolith vs Microservices](/architecture/monolith-vs-microservices) | When each architecture style fits, and the cost of getting it wrong |
| [Synchronous vs Asynchronous](/architecture/sync-vs-async) | Choosing between request/response and event-driven communication |
| [API vs Events](/architecture/api-vs-events) | When to expose an API versus emit a domain event |
| [Application vs Platform](/architecture/application-vs-platform) | The distinction between building a product and building infrastructure for others to build on |
| [Micro-Frontends](/architecture/micro-frontends) | When splitting the frontend itself is justified |
| [Architecture Trade-offs](/architecture/architecture-trade-offs) | How we weigh competing architectural concerns |
| [Architecture Decision Records](/architecture/architecture-decision-records) | How and when architectural decisions get documented |
| [Data Architecture](/architecture/data-architecture) | Structural patterns for how data flows and is owned across services |
| [Security Architecture](/architecture/security-architecture) | Structural security concerns above the level of a single service |
| [Git & Branching Strategy](/engineering/git-branching) | The branching model used across projects |
| [Environment Strategy](/engineering/environments) | How environments are structured and promoted |
| [Developer Experience (DX)](/engineering/developer-experience) | What we optimize for to keep engineers productive |

## Where this leads

These practices apply across every project regardless of stack. For the concrete, stack-specific rules that implement them day to day, see [Development & Coding Standards](/coding-standards/overview).
