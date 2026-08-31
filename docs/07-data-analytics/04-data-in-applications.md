# Data in Applications

**Level:** 🟢 Beginner - readable with no technical background

## Simple explanation

Every application with a database already has "data." For a large share of business problems, that database - plus maybe a report or a dashboard built directly against it - is already the right amount of data infrastructure. You don't need a separate data platform just because data exists; you need one when the *use* of that data outgrows what the application's own database can reasonably serve.

## Why it matters

It's easy to see a healthy, well-used application database and think "we should build a platform around this data" simply because there's now a meaningful amount of it. But volume alone isn't the signal - see [When to Build a Data Platform](/data-analytics/when-to-build-a-data-platform) for the actual signals (multiple sources, historical need, many consumers, governance). A single application with a single, well-modeled database, serving its own users and maybe one internal report, does not need anything more.

## A simple decision check

| Question | If yes... |
|---|---|
| Does only this application need this data? | The application's own database is probably enough |
| Is the reporting need answerable with a query or a built-in dashboard? | You don't need a warehouse yet |
| Is there only one source of truth for this data? | No integration or pipeline is required |
| Would a data platform mostly just re-host what the app already has? | Don't build it yet |

If most of these are "yes," stop here - see [Application vs Data Platform](/business-foundations/application-vs-data-platform) for the fuller version of this reasoning.

## When the application's database starts to strain

Signals that it's time to look beyond the application's own database (not necessarily straight to a full platform - sometimes a read replica or a simple export is enough):

- Analytical queries are visibly slowing down the live application (see [Operational vs Analytical Data](/data-analytics/operational-vs-analytical-data)).
- More than one other system or team now wants regular access to this data.
- Someone needs to combine this data with data from a different system to answer a question.
- The historical view needed exceeds what the operational database retains or can query efficiently.

## Common mistakes

::: warning Common mistakes
- Building a full data platform around a single application's data "to be ready for the future" before any of the above signals actually appear.
- Never revisiting the decision - an application that was fine on its own database for years can genuinely outgrow it once the business around it changes.
- Confusing "our application has a lot of data" with "our application's data needs a platform" - the first is a storage fact, the second is a usage pattern.
:::

## Where this leads

- [Operational vs Analytical Data](/data-analytics/operational-vs-analytical-data)
- [When to Build a Data Platform](/data-analytics/when-to-build-a-data-platform)
- [Databases](/basics/databases/overview) - the technical reference for how application databases work
