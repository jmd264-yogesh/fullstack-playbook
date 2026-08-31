# When NOT to Build a Data Platform

**Level:** 🔴 Advanced - architecture/technical-decision depth

## The counter-checklist

::: warning When NOT to build a data platform
Hold off on a data platform when most of these are true:

- Only **one or two source systems** are involved.
- The need is **operational** (run a process) rather than analytical (understand a trend) - see [Operational vs Analytical Data](/data-analytics/operational-vs-analytical-data).
- There's a **single, well-understood consumer** of the data, not multiple teams needing different shapes of it.
- The data volume comfortably fits, and performs fine, in the application's own database.
- There's no genuine historical/trend analysis requirement - just current state.
- No cross-domain governance complexity - standard access control is sufficient.
:::

If most of these hold, the right answer is almost always smaller: an application, an automation, an integration, or a database with a lightweight report. See [Application vs Data Platform](/business-foundations/application-vs-data-platform) for the full reasoning and the finance/Excel reconciliation example that anchors this playbook's guidance - a 4-hours-a-day manual reconciliation problem that looks data-heavy but is solved by validation + an approval step + an API update, not a platform.

## Two more counter-examples

**"We should build a dashboard for this."**
A small operations team wants to see how many support tickets were closed each day. There's one source system (the ticketing tool), it already has basic built-in reporting, and only one team needs the view. Building a data platform to answer this is significant overhead for a question the ticketing tool can already answer, or that a lightweight scheduled export into a simple chart could answer in an afternoon.

**"Let's centralize before we know what we need."**
A newly formed team, anticipating future growth, wants to build a central data platform "so we're ready" before any specific cross-team analytical question exists yet. Without a real multi-source, multi-consumer problem to solve, this becomes speculative infrastructure - expensive to build and maintain, and frequently redesigned once real requirements finally show up. It's better to solve the first real analytical need well, and generalize from there, than to build the platform first and hope the need arrives in the shape you guessed.

## Why this mistake happens

- Data platforms are more technically interesting to build than a small application or a validation script, which can bias the decision toward the more exciting option.
- "We have data" is mistaken for "we need infrastructure for our data," when most data is already being served adequately by the systems that produced it.
- Momentum - once ingestion work starts, it's easier to keep adding sources than to stop and ask whether the platform is solving a real, current need.

## Where this leads

- [When to Build a Data Platform](/data-analytics/when-to-build-a-data-platform) - the other half of this decision
- [Application vs Data Platform](/business-foundations/application-vs-data-platform)
- [Choosing the Right Solution](/business-foundations/choosing-the-right-solution)
