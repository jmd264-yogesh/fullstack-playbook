# Data & Analytics

**Level:** 🟡 Intermediate - assumes basic technical/business context

This section is the deep-dive companion to [Application vs Data Platform](/business-foundations/application-vs-data-platform), which established the core rule this entire section builds on:

::: tip Core idea
Data platforms are powerful solutions, but they are not the default solution for every business problem. Choose the solution based on the problem, not the team's preferred technology.
:::

If you haven't read that page yet, start there - it walks through the finance/Excel reconciliation example that shows why "we have data" doesn't automatically mean "we need a data platform." This section exists for the cases where a data platform (or something data-heavy) genuinely *is* the right call, and explains how to build that well - plus the vocabulary and distinctions (operational vs analytical, warehouse vs lake, governance) that make the "when" decision easier to reason about.

This section is **not** anti-data-platform. It is pro-*appropriate-solution*: data platforms earn their complexity when multiple sources, high volume, historical analysis, many consumers, or governance requirements are genuinely in play. Read [When to Build a Data Platform](/data-analytics/when-to-build-a-data-platform) and [When NOT to Build a Data Platform](/data-analytics/when-not-to-build-a-data-platform) together - they're two sides of the same decision.

## What this section covers

| Page | What it answers |
|---|---|
| [What is Data?](/data-analytics/what-is-data) | Data as a byproduct of business activity - its value and its cost |
| [Operational vs Analytical Data](/data-analytics/operational-vs-analytical-data) | The distinction that underlies almost every decision in this section |
| [Data in Applications](/data-analytics/data-in-applications) | Why most applications' own database is already "enough data" |
| [Database vs Warehouse vs Lake/Lakehouse](/data-analytics/database-vs-warehouse-vs-lake) | The technical shapes data infrastructure can take, and when each fits |
| [ETL / ELT](/data-analytics/etl-elt) | How data actually moves and transforms between systems |
| [Data Quality](/data-analytics/data-quality) | Why quality matters more than volume |
| [Data Governance](/data-analytics/data-governance) | Lineage, access control, and ownership at scale |
| [APIs vs Data Pipelines](/data-analytics/apis-vs-data-pipelines) | Two different ways to move data, for two different needs |
| [When to Build a Data Platform](/data-analytics/when-to-build-a-data-platform) | The signals that genuinely justify one |
| [When NOT to Build a Data Platform](/data-analytics/when-not-to-build-a-data-platform) | The signals that mean you don't need one yet |

## Who this is for

Written primarily for data engineers, data analysts, architects, and anyone advising on whether a data-heavy solution is the right call - but the first three pages are deliberately non-technical, because the "should we even build this" decision belongs to everyone in the room, not just the data team.

## Where this leads

For purely technical, engine-level database content (SQL vs NoSQL, indexing, ORMs, migrations), see [Databases](/basics/databases/overview) in Basics and [Database Standards](/coding-standards/database/overview) in Coding Standards - this section deliberately does not repeat that material. For the decision that comes before any of this, see [Choosing the Right Solution](/business-foundations/choosing-the-right-solution).
