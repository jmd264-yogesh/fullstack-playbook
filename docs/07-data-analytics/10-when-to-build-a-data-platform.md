# When to Build a Data Platform

**Level:** 🔴 Advanced - architecture/technical-decision depth

## The signal checklist

A data platform earns its complexity when **several** of these are genuinely true - not just one:

- **Multiple source systems** need to be combined to answer a question no single system can answer alone.
- **Large data volumes** make ad-hoc queries against operational databases impractical or risky.
- **Historical/analytical requirements** - trends over years, not just current state.
- **Multiple consumers** - several teams or products need the same underlying data, differently shaped.
- **Enterprise reporting** that spans domains (e.g. sales + support + finance together).
- **Data science / ML workloads** that need broad, versioned, queryable historical data.
- **Data governance requirements** - lineage, access control, and quality rules across many datasets.
- **Complex ingestion and transformation** - many formats, cadences, and schemas that need a consistent, repeatable pipeline.

One or two of these being true is often still solvable without a full platform - see [Data in Applications](/data-analytics/data-in-applications). It's when most of them stack up together that the complexity of a platform starts paying for itself.

## A worked example that genuinely justifies one

**Business problem:** Leadership wants a single view of revenue and customer churn, but the data lives across five different systems: a CRM, a billing platform, a support ticketing tool, a product usage analytics tool, and a marketing platform. Each team can answer questions about their own system, but nobody can answer "which customers are at risk of churning, and why" without manually exporting and cross-referencing spreadsheets from all five - a process that currently takes two analysts most of a week, every month.

**Checking the signals:**

- Multiple sources? Yes - five systems.
- Historical/analytical? Yes - churn risk requires trend analysis over months.
- Multiple consumers? Yes - leadership, customer success, and marketing all want different views of the same underlying answer.
- Governance needs? Yes - this combines customer and billing data, which has real access-control and compliance implications.

**Conclusion:** this is a legitimate data platform problem. The design would involve ingesting from all five sources (see [ETL / ELT](/data-analytics/etl-elt)), landing them in a warehouse or lakehouse (see [Database vs Warehouse vs Lake/Lakehouse](/data-analytics/database-vs-warehouse-vs-lake)), applying data quality and governance controls (see [Data Quality](/data-analytics/data-quality) and [Data Governance](/data-analytics/data-governance)), and serving the result through BI dashboards and possibly a churn model.

## What "building it well" still requires

Even when a platform is justified, scope discipline still matters:

::: tip Even when justified, scope discipline still matters
- Start with the sources and questions that matter most, not every dataset the company has ever produced.
- Establish data quality and governance practices from day one - retrofitting them onto an already-large platform is far more expensive.
- Treat the platform as a product with real consumers, not an ingestion exercise for its own sake.
:::

## Where this leads

- [When NOT to Build a Data Platform](/data-analytics/when-not-to-build-a-data-platform) - the other half of this decision
- [Database vs Warehouse vs Lake/Lakehouse](/data-analytics/database-vs-warehouse-vs-lake)
- [Data Governance](/data-analytics/data-governance)
