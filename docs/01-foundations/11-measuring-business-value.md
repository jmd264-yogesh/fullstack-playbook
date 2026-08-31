# Measuring Business Value

**Level:** 🟡 Intermediate - assumes basic familiarity with how software/business processes work

## Simple explanation

Software is not finished when it is deployed. It is finished when it reliably creates measurable value for its users and the business. If you can't state what improved, and by how much, the work isn't actually done - it's just shipped.

## Why it matters

Delivery teams naturally track whether something was *built* and *deployed*. Far fewer track whether it *worked* - whether the business problem it targeted actually got smaller. Without that measurement, teams can't tell the difference between a genuine success and an expensive, well-engineered non-event.

## Questions every significant solution should be able to answer

- What problem did we solve?
- How much time was saved?
- How much manual effort was removed?
- How many errors were reduced?
- How much faster is the process now?
- What capacity was created (what can people now do instead)?
- What revenue or cost impact exists?
- What customer experience improved, and how do we know?

## A worked example (illustrative numbers, not real company metrics)

```text
Before:
5 employees × 2 hours/day on manual reconciliation = 10 hours/day

After:
Automation removes 80% of the manual effort

Outcome:
~8 hours/day saved
≈ 40 hours/week
≈ 2,000 hours/year
```

That last number is the one worth putting in front of a client or leadership - not "we shipped an automation," but "we returned roughly one full-time role's worth of capacity per year, and cut reconciliation errors by [X]%." Always label illustrative numbers clearly as examples, and use real, measured numbers once a solution is live.

## Baseline before you build

You cannot measure improvement without a starting point. Before building, capture:

- Current time spent per occurrence, and how often it occurs.
- Current error/defect rate, if known.
- Current cost (labor, penalties, lost revenue, customer complaints).

This baseline belongs in [Requirement Intake](/delivery-lifecycle/requirement-intake), not as an afterthought during a post-launch retro.

## After launch

Revisit the same measurements on a fixed cadence (e.g. 30/60/90 days after go-live) and compare against baseline. This connects directly to [Monitoring & Hypercare](/delivery-lifecycle/monitoring-phase) and to the engineering-level [KPIs & Metrics](/kpis/engineering-metrics) - those measure delivery health; this measures whether the delivered thing actually helped.

## Common mistakes

::: warning Common mistakes
- Declaring success at "deployed to production" rather than "measured business outcome achieved."
- Measuring only vanity metrics (logins, page views) instead of the outcome the problem was defined around.
- Never re-measuring after go-live, so a regression or a feature nobody uses goes unnoticed for months.
- Comparing to an assumed baseline instead of a measured one.
:::

## Where this leads

- [Requirement Intake](/delivery-lifecycle/requirement-intake) - where the baseline should first be captured
- [Monitoring & Hypercare](/delivery-lifecycle/monitoring-phase) - ongoing operational measurement
- [Governance & Delivery Excellence](/kpis/delivery-performance) - engineering-level metrics that complement business value measurement
