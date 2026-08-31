# From Manual to Digital

**Level:** 🟢 Beginner - readable with no technical background

## Simple explanation

There is a spectrum of options between "keep doing it by hand" and "build a full platform." Most business problems are solved somewhere in the middle, and the goal is to pick the point on that spectrum that matches the actual problem - not to default to either end.

## The spectrum

```mermaid
flowchart LR
    A[Do Nothing / Accept] --> B[Process Improvement]
    B --> C[SOP / Documentation]
    C --> D[Spreadsheet]
    D --> E[Script / Automation]
    E --> F[Workflow Tool]
    F --> G[Small Application]
    G --> H[API Integration]
    H --> I[Full Application]
    I --> J[Data Platform]
```

| Option | Best when... |
|---|---|
| **Do nothing / accept** | The cost of the problem is smaller than the cost of fixing it |
| **Process improvement** | The steps themselves are wrong or redundant, independent of any tooling |
| **SOP / documentation** | The process is fine, but inconsistent because people don't know the rules |
| **Spreadsheet** | Low volume, one or two users, no need for history or concurrent access |
| **Script / automation** | A repetitive, rule-based task with no need for a user interface |
| **Workflow tool** | Multiple steps, approvals, and handoffs, but no need for custom logic |
| **Small application** | People need to interact with data directly - enter, view, approve |
| **API integration** | Two or more existing systems need to exchange data reliably |
| **Full application** | Multiple user types, complex logic, or a customer-facing product |
| **Data platform** | Multiple sources, high volume, historical analysis, or many consumers |

## Why it matters

Jumping straight to the far right of this spectrum ("we need a platform") for a problem that sits in the middle ("we need a script and a small approval step") wastes months of effort and creates something nobody wants to maintain. Jumping to the far left ("just write it down") for a problem that's genuinely repetitive and error-prone leaves real, recoverable cost on the table.

## Worked example

**Problem:** A team manually re-keys data from one system into another twice a week, and occasionally makes typos that cause downstream errors.

- ❌ **Overkill:** Build a full application with a database and custom UI.
- ❌ **Underkill:** Write a "please double check your typing" SOP.
- ✅ **Right fit:** A small script that reads from the source system's API and writes to the destination system's API, with a validation step and an error log. No new application, no new database - just an integration script wired into a scheduler.

## Common mistakes

::: warning Common mistakes
- Treating "digital" as inherently better than "manual" - a well-run manual process for a rare, low-volume task can be the correct answer.
- Choosing the solution based on what the team is comfortable building, rather than what the problem needs.
- Skipping straight past cheaper options because a bigger solution is more interesting to build.
:::

## Where this leads

This spectrum is the raw material for [Choosing the Right Solution](/business-foundations/choosing-the-right-solution), which turns it into a repeatable decision framework. For the specific comparisons that come up most often, see [Application vs Automation](/business-foundations/application-vs-automation), [Application vs Integration](/business-foundations/application-vs-integration), and [Application vs Data Platform](/business-foundations/application-vs-data-platform).
