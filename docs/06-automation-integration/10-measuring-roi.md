# Measuring Automation ROI

**Level:** 🟡 Intermediate - assumes basic familiarity with how software/business processes work

## Simple explanation

An automation isn't valuable because it's clever - it's valuable because it measurably reduces time, cost, or errors compared to what happened before. This page applies [Measuring Business Value](/business-foundations/measuring-business-value) specifically to automation and integration work, where the before/after comparison is often the clearest of any solution type.

## What to measure

| Metric | Before automation | After automation |
|---|---|---|
| Time spent per occurrence | Manual hours per run | Time spent only on exceptions/oversight |
| Frequency-adjusted total time | Hours/day or hours/week | Same, recalculated |
| Error rate | Defects or mismatches per batch | Defects or mismatches per batch |
| Turnaround time | How long the full process takes end-to-end | How long it takes now |
| Capacity created | N/A | What the freed-up time is now spent on |

## A worked example (illustrative numbers, not real company metrics)

```text
Before automation:
2 analysts × 2 hours/day on invoice reconciliation = 4 hours/day
Error rate: ~3% of records required rework after the fact

After automation:
Automated validation + human-in-the-loop review of ~15% flagged exceptions
Analyst time: ~30 minutes/day reviewing flagged cases
Error rate: <0.5%, since machine comparison doesn't mistype numbers

Outcome:
~3.5 hours/day saved ≈ 17.5 hours/week ≈ 900 hours/year
Error rework effort reduced by roughly 6x
```

As with all illustrative numbers in this playbook, label them clearly as examples and replace them with real, measured figures once the automation is live.

## Costs to weigh against the savings

ROI is a comparison, not just a savings number - automation isn't free to build or run:

- **Build cost** - engineering time to design, build, and test.
- **Ongoing maintenance** - someone has to keep it working as source systems change (a favorite API field gets renamed, a file format shifts).
- **Monitoring and on-call burden** - see [Automation Failure Handling](/automation-integration/failure-handling); this is real, ongoing operational cost, not a one-time expense.
- **Infrastructure cost** - compute, storage, message broker, or workflow tool licensing if applicable.

A automation that saves 2 hours/week but requires 5 hours/month of maintenance and on-call attention may still be worth it - but that's a real trade-off to state explicitly, not assume away.

## Baseline first, always

Just as with [Measuring Business Value](/business-foundations/measuring-business-value), capture the "before" numbers - time spent, error rate, frequency - before building anything. Without a real baseline, any "we saved X hours" claim after the fact is a guess, not a measurement.

## Common mistakes

::: warning Common mistakes
- Reporting only the time saved and never mentioning the ongoing maintenance cost, giving a falsely rosy picture of ROI.
- Measuring "hours saved" without confirming the freed-up time was actually redirected to something valuable, rather than simply absorbed with no visible change.
- Skipping error-rate measurement entirely, when reduced errors are often a bigger source of value than time saved.
- Never re-measuring after the automation has been live for a few months, missing both regressions and unexpected extra value.
:::

## Where this leads

- [Measuring Business Value](/business-foundations/measuring-business-value) - the general framework this page specializes
- [Monitoring & Hypercare](/delivery-lifecycle/monitoring-phase) - where post-launch measurement happens operationally
- [KPIs & Metrics](/kpis/engineering-metrics) - engineering-level delivery metrics that complement this business-outcome view
