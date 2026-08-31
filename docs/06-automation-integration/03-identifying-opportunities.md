# Identifying Automation Opportunities

**Level:** 🟡 Intermediate - assumes basic familiarity with how software/business processes work

## Why this matters

Not every repetitive task is a good automation candidate, and not every rare task is a bad one. Picking the wrong candidate wastes effort building something nobody needed, or worse, locks in a broken process at machine speed. This page is a filter to apply before committing to build anything.

## Good candidates

| Signal | Why it matters |
|---|---|
| **High frequency** | The task happens often enough that the automation pays for itself quickly |
| **Stable, documented rules** | The logic doesn't change week to week, so the automation stays correct |
| **High error rate today** | Manual repetition is where typos and missed steps creep in |
| **Clear inputs and outputs** | The task has a well-defined start and end, not open-ended judgment |
| **Bottleneck for people** | The task blocks people from higher-value work while they do it |
| **Auditable** | There's value in a consistent, logged record of exactly what happened each time |

## Poor candidates

| Signal | Why it's a poor fit |
|---|---|
| **Rules are still evolving** | You'll be re-building the automation constantly, or worse, leaving it stale |
| **Requires case-by-case judgment** | Forcing rigid rules onto a judgment-heavy task produces bad outcomes users route around |
| **Happens rarely** | The build/maintenance cost may exceed the manual effort saved over years |
| **Exceptions are the majority of cases** | If "the normal case" barely exists, there's little routine work left to automate |
| **No one owns it today** | If the manual process has no clear owner, the automation won't have one either, and will silently drift |

## A quick scoring exercise

For a candidate task, score 1 (low) to 5 (high) on each:

- **Frequency** - how often does this happen?
- **Rule stability** - how confident are you the logic won't change soon?
- **Cost of manual execution** - time, error rate, or risk today?
- **Clarity of exceptions** - can you enumerate the edge cases, or are there endless new ones?

A strong candidate scores high on all four. A task that scores low on rule stability or clarity of exceptions should go back to [Understanding Business Processes](/business-foundations/understanding-business-processes) before anyone writes automation code - you'd be automating a process you don't fully understand yet.

## Worked example

**Candidate:** Nightly reconciliation of vendor invoices against purchase orders (the running example from [Application vs Automation](/business-foundations/application-vs-automation)).

- Frequency: daily - high.
- Rule stability: matching logic (amount, PO number, vendor ID) is well established - high.
- Cost of manual execution: 4 hours/day, with occasional errors - high.
- Clarity of exceptions: mismatches over a threshold need human review, which is a known, boundable exception path - high.

This scores well across the board - a strong automation candidate, with a human-in-the-loop step for the exception path (see [Human-in-the-loop Automation](/automation-integration/human-in-the-loop)).

**Non-candidate, for contrast:** Deciding which enterprise clients get early access to a new product feature. The criteria change with every executive review, and each decision weighs unstated relationship context - this needs a person and a light approval workflow, not automation.

## Common mistakes

::: warning Common mistakes
- Choosing a candidate because it's technically interesting to automate, not because it scores well here.
- Skipping the scoring exercise for anything "obviously" repetitive, and discovering the rules were less stable than assumed.
- Automating a task in isolation without asking whether the surrounding process should be simplified first - see [From Manual to Digital](/business-foundations/manual-to-digital).
:::

## Where this leads

- [Workflow Automation](/automation-integration/workflow-automation) and [API-based Automation](/automation-integration/api-based-automation) - the two most common shapes a good candidate takes
- [Measuring Automation ROI](/automation-integration/measuring-roi) - quantifying the payoff before and after
