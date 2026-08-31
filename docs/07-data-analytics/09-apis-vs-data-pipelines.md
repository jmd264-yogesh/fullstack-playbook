# APIs vs Data Pipelines

**Level:** 🟡 Intermediate - assumes basic technical/business context

## Simple explanation

Both APIs and data pipelines move data between systems - but for different needs. An **API** answers a specific question on demand, right now, for the current state of one thing. A **data pipeline** moves data in bulk, usually on a schedule, often to combine and reshape it for analysis later.

## Real-world analogy

An API is like calling a colleague to ask "what's the balance on account #4471 right now?" - quick, specific, current. A data pipeline is like receiving a nightly export of every transaction across every account, which someone will later load, combine, and analyze in bulk. You wouldn't call your colleague a thousand times to reconstruct that export, and you wouldn't wait for tonight's export to answer one urgent question right now.

## The comparison

| | API | Data Pipeline |
|---|---|---|
| **Typical use** | "Give me the current state of X" | "Give me all of X, so I can analyze/combine it" |
| **Timing** | Real-time or near-real-time, on demand | Scheduled or event-triggered, batch or streaming |
| **Volume per request** | Small, specific | Large, comprehensive |
| **Consumer** | Another application or automation needing to act now | Analytics, reporting, ML, or another data store |
| **Failure impact** | Immediate - the requesting process is blocked | Delayed - data is stale until the next successful run |

## Why the distinction matters

Using an API to pull bulk historical data (calling it thousands of times in a loop) is slow, fragile, and often against the API provider's rate limits - that's a pipeline problem wearing an API's clothes. Conversely, standing up a full pipeline to answer a single, occasional "what's the current value of X" question is unnecessary infrastructure for a problem an API call already solves.

This same distinction is what separates [API-based Automation](/automation-integration/api-based-automation) (act now, on current state) from the ingestion side of a data platform (accumulate, then analyze) - see [ETL / ELT](/data-analytics/etl-elt).

## When to use which

| Signal | Use an API | Use a Pipeline |
|---|---|---|
| Need is for current state of a specific item | ✅ | |
| Need is for the full historical dataset | | ✅ |
| Frequency is occasional, driven by a specific event | ✅ | |
| Frequency is regular, bulk, and feeds downstream analysis | | ✅ |
| The consuming system needs to react immediately | ✅ | |
| The consuming system can tolerate data being hours/a day old | | ✅ |

## Common mistakes

::: warning Common mistakes
- Building a data pipeline for a need that's really just "call this API when we need the answer."
- Hammering an API in a loop to reconstruct what should have been a proper bulk export or pipeline.
- No monitoring on either path - an API integration silently failing looks the same as a pipeline silently failing: nobody notices until the downstream data is visibly wrong.
:::

## Where this leads

- [ETL / ELT](/data-analytics/etl-elt)
- [Application vs Integration](/business-foundations/application-vs-integration)
- [API Standards](/architecture/api-standards)
