# Architecture Trade-offs

**Level:** 🔴 Advanced - architecture/technical-decision depth

Every architectural decision is a trade-off, not a search for a perfect answer. [Choosing the Right Solution](/business-foundations/choosing-the-right-solution) applies this discipline at the business/solution level; this page applies the same discipline one level down, to technical architecture decisions already committed to a general solution direction (application, automation, integration, or data platform).

## The dimensions

Evaluate every non-trivial architecture decision - monolith vs microservices, sync vs async, build vs buy, SQL vs NoSQL, a new platform vs another application - against the same set of dimensions:

| Dimension | Question to ask |
|---|---|
| **Complexity** | How much harder does this make the system to understand, build, and change? |
| **Cost** | What does this cost to build, run, and license, today and at 10x scale? |
| **Time to value** | How long until this delivers the outcome it's meant to deliver? |
| **Maintainability** | Can the team that exists (not a hypothetical future team) keep this healthy? |
| **Scalability** | Does this need to handle 10x load, and does the option actually support that, or does it just look like it does? |
| **Reliability** | What fails, how visibly, and how does the system recover? |
| **Security** | What new attack surface, trust boundary, or credential does this introduce? |
| **User experience** | Does this decision serve the people using the system, or only the people building it? |
| **Operational burden** | Who is on call for this, and what does 3am look like when it breaks? |

No option wins on every dimension - that's what makes it a trade-off, not a checklist with one right answer.

## A worked example

**Decision:** Should this service use a relational database or a NoSQL document store?

| Dimension | Relational (Postgres) | Document store (MongoDB) |
|---|---|---|
| Complexity | Lower for relational data with joins | Lower for deeply nested, schema-flexible documents |
| Cost | Predictable, well-understood tooling | Comparable, but scaling patterns differ |
| Time to value | Fast if the domain is naturally relational | Fast if the domain is naturally document-shaped |
| Maintainability | Strong tooling, migrations, mature ORM ecosystem | Strong for the right shape, awkward if relationships emerge later |
| Scalability | Vertical first, read replicas, then sharding | Horizontal scaling is a first-class design goal |
| Reliability | Strong consistency guarantees by default | Consistency model varies by configuration - must be understood, not assumed |
| Security | Mature row-level security and access control patterns | Improving, but historically less mature |
| Operational burden | Team likely already knows how to run and tune it | May require new operational expertise |

Neither is "correct" in the abstract - the decision depends on whether the actual data is relational, how consistency requirements play out, and what the team already knows how to operate. See [Databases](/basics/databases/overview) and [SQL vs NoSQL Decision Guide](/basics/databases/sql-vs-nosql) for the deeper technical comparison.

## How to use this framework

1. Name the decision explicitly - don't let it happen implicitly through the first idea someone had.
2. Score each option against the dimensions above - a simple High/Medium/Low table is often enough.
3. State which dimensions matter most **for this specific problem** - a customer-facing checkout flow weighs reliability and UX heavily; an internal nightly batch job weighs cost and maintainability more than latency.
4. Write the decision down - see [Architecture Decision Records](/architecture/architecture-decision-records).

## Common mistakes

::: warning Common mistakes
- Optimizing for scalability the system will never need, at the cost of complexity it will pay for every day (see [Scalability](/production-reliability/scalability)).
- Treating "what's popular" or "what's modern" as a dimension - it isn't one, though it's often mistaken for "maintainability" or "hiring ease," which are legitimate but should be named explicitly.
- Making the trade-off implicitly, then being unable to explain the decision six months later when it's questioned.
:::

## Where this leads

- [Architecture Decision Records](/architecture/architecture-decision-records) - how to record the outcome of this analysis
- [Build vs Buy](/architecture/build-vs-buy), [Monolith vs Microservices](/architecture/monolith-vs-microservices), [Sync vs Async](/architecture/sync-vs-async) - specific instances of this framework
