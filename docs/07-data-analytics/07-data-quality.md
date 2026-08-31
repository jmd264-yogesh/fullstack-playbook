# Data Quality

**Level:** 🟡 Intermediate - assumes basic technical/business context

## Simple explanation

Data quality is whether the data is accurate, complete, consistent, and current enough to be trusted for the decision it's being used for. More data with poor quality is worse than less data you can actually trust - bad data doesn't just fail to help, it actively misleads.

## Why it matters more than volume

A common instinct is to treat "how much data do we have" as the headline metric. In practice, a small, clean, well-understood dataset produces more reliable decisions than a massive dataset full of duplicates, missing values, and inconsistent formats. Every downstream use - reporting, automation, ML - inherits whatever quality problems exist upstream. This is often summarized as "garbage in, garbage out."

## Common data quality problems

| Problem | Example | Typical cause |
|---|---|---|
| **Missing values** | Customer records with no email | Optional fields, failed integrations |
| **Duplicates** | The same customer appears three times | No unique identifier enforced, merged systems |
| **Inconsistent formats** | Dates as `DD/MM/YYYY` in one system, `MM-DD-YYYY` in another | Multiple source systems, no shared standard |
| **Stale data** | A "current" report reflecting last month's state | Failed or delayed pipeline runs |
| **Referential mismatches** | An order pointing to a customer ID that no longer exists | Deletes in one system not reflected in another |
| **Silent schema drift** | A source system adds/renames a field and downstream pipelines break quietly | No contract or validation between systems |

## How to catch problems early

- **Validate at the boundary** - check data as it enters a pipeline, not after it's already been used in a report.
- **Define expectations explicitly** - what fields are required, what ranges are valid, what formats are expected - and fail loudly when they're violated.
- **Monitor trends, not just totals** - a sudden drop in record counts or a spike in nulls is often the first sign something upstream broke.
- **Reconcile against a known source of truth periodically**, especially after any integration or migration.

## Why this connects back to solution selection

Poor data quality is sometimes mistaken for a data platform problem ("we need better tooling to understand our data") when the real fix is upstream - fixing the process or system that produces bad data in the first place. See [Understanding Business Processes](/business-foundations/understanding-business-processes) and [Application vs Automation](/business-foundations/application-vs-automation): sometimes the highest-value fix is process discipline at the source, not more downstream tooling to compensate for it.

## Common mistakes

::: warning Common mistakes
- Building analytics or ML on top of data nobody has validated, producing confident-looking but wrong conclusions.
- Treating data quality as a one-time cleanup project instead of an ongoing, monitored discipline.
- No ownership - when a data quality issue is found, there's no clear person or team responsible for the source system that produced it.
:::

## Where this leads

- [ETL / ELT](/data-analytics/etl-elt)
- [Data Governance](/data-analytics/data-governance)
- [Understanding Business Processes](/business-foundations/understanding-business-processes)
