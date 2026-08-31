# What is Data?

**Level:** 🟢 Beginner - readable with no technical background

## Simple explanation

Data is the record left behind by something that happened - a customer placed an order, a sensor took a reading, a support agent closed a ticket. It's a byproduct of business activity, not a thing companies set out to create for its own sake. It only becomes valuable when someone uses it to run a process, make a decision, or understand a pattern.

## Real-world analogy

Data is like the paper trail in a filing cabinet. A single receipt is useful for one thing (proving a purchase happened). A drawer full of receipts, organized and totaled, is useful for something else entirely (understanding spending trends). The receipt didn't change - what you can *do* with it changed once there was enough of it, organized well enough.

## Why it matters

Every byte of data carries both value and cost:

| Value | Cost |
|---|---|
| Enables a process to run (an order needs an order record) | Storage, backup, and infrastructure cost |
| Enables understanding trends over time | Requires quality control - bad data misleads |
| Can be reused across teams and products | Requires governance - who can see it, and why |
| Powers automation, reporting, and AI/ML | Creates compliance/security obligations (PII, retention rules) |

Treating "more data" as automatically good ignores the second column. A business problem that only needs a handful of records used correctly is better solved than one drowning in unmanaged data used poorly.

## Two very different jobs data does

Almost every confusion in this section traces back to conflating these two:

1. **Running a process** - data as the current, working state a system needs right now (an account balance, an order status).
2. **Understanding a pattern** - data as history, aggregated and analyzed to answer a broader question (how did revenue trend this quarter?).

These are different enough in their requirements that they usually need different kinds of storage and different tools - see [Operational vs Analytical Data](/data-analytics/operational-vs-analytical-data) for the full breakdown.

## Common mistakes

::: warning Common mistakes
- Treating data collection as free - every dataset kept "just in case" has an ongoing storage, security, and governance cost.
- Assuming more historical data automatically means better decisions, without checking data quality first (see [Data Quality](/data-analytics/data-quality)).
- Building infrastructure to hold data before establishing who will actually use it and for what.
:::

## Where this leads

- [Operational vs Analytical Data](/data-analytics/operational-vs-analytical-data)
- [Data in Applications](/data-analytics/data-in-applications)
- [Application vs Data Platform](/business-foundations/application-vs-data-platform)
