# Operational vs Analytical Data

**Level:** 🟡 Intermediate - assumes basic technical/business context

## Simple explanation

**Operational data** is what a system needs *right now* to do its job - the current state of things. **Analytical data** is what you need to *understand a pattern over time* - history, aggregated and compared. Most data mistakes in this playbook's experience come from mixing the two, or building infrastructure for one when the problem actually calls for the other.

## Real-world analogy

Operational data is the number on a fuel gauge - you need it to be accurate right now, and you need it fast. Analytical data is a logbook of fuel consumption over the last two years - you don't need it instantly, but you need lots of it, and you need it to be consistent enough to spot trends.

## A concrete example: one order, two uses of its data

| | Operational use | Analytical use |
|---|---|---|
| **Question being answered** | "What is the status of order #48213 right now?" | "How have order volumes trended over the last two years?" |
| **Data needed** | This one order's current state | Every order, aggregated over time |
| **Freshness required** | Must be current, to the second | Yesterday's data is usually fine |
| **Typical store** | The application's own database (OLTP) | A data warehouse or lake |
| **Who asks** | The application itself, and the customer | Analysts, leadership, data scientists |
| **Failure mode if wrong** | Customer sees the wrong order status - immediate, visible | A quarterly report is slightly off - usually recoverable |

## Why the distinction matters

Operational databases are optimized for fast, precise reads and writes of small amounts of current data - think "look up order #48213," not "sum every order ever placed." Running heavy analytical queries against that same database competes for the same resources the live application needs, and can slow down or even break the process you're trying to protect. This is one of the strongest legitimate signals that a separate analytical store (warehouse/lake) is justified - see [Database vs Warehouse vs Lake/Lakehouse](/data-analytics/database-vs-warehouse-vs-lake).

The reverse mistake also happens: building an entire analytical pipeline to answer a question that a single query against the operational database could already answer today. If there's one source, low volume, and no historical requirement, you don't need a warehouse - see [When NOT to Build a Data Platform](/data-analytics/when-not-to-build-a-data-platform).

## When to use which

| Signal | Use operational data directly | Move to analytical infrastructure |
|---|---|---|
| Question is about current state | ✅ | |
| Question spans months/years of history | | ✅ |
| One source system | ✅ | |
| Multiple source systems need combining | | ✅ |
| Query load is light and occasional | ✅ | |
| Query load is heavy, recurring, or shared across teams | | ✅ |

## Common mistakes

::: warning Common mistakes
- Running large analytical reports directly against a live production database, degrading application performance.
- Assuming analytical infrastructure is needed the moment "someone wants a report" - a well-indexed query or a lightweight built-in report often suffices, see [Data in Applications](/data-analytics/data-in-applications).
- Storing only aggregated analytical data and later needing the operational detail that was discarded.
:::

## Where this leads

- [Data in Applications](/data-analytics/data-in-applications)
- [Database vs Warehouse vs Lake/Lakehouse](/data-analytics/database-vs-warehouse-vs-lake)
- [When to Build a Data Platform](/data-analytics/when-to-build-a-data-platform)
