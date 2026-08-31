# What is a Business Problem?

**Level:** 🟢 Beginner - readable with no technical background

## Simple explanation

A business problem is a gap between what is happening today and what someone actually needs to happen - described in terms of people, time, money, risk, or quality, **not** in terms of technology.

"We need a dashboard" is not a business problem. "The finance team doesn't know which invoices are overdue until a customer complains" is.

## Why it matters

Every wasted engineering effort in this playbook's experience traces back to the same root cause: someone skipped past the problem and jumped straight to a solution. When the solution is decided before the problem is understood, you get systems that are technically correct and practically useless - because they were never built against the real constraint.

## Real-world analogy

A patient tells a doctor "I need painkillers." A good doctor doesn't just prescribe them - they ask what hurts, since without a diagnosis, the eventual painkillers could easily mask a much larger problem. The requested solution ("painkillers", "a dashboard", "an app") is a *symptom report*, not a *diagnosis*.

## How to recognize a real business problem

A well-described business problem answers all of these:

| Question | Example answer |
|---|---|
| **Who** is affected? | The 3-person AP team in Finance |
| **What** are they doing today? | Manually comparing two Excel exports every morning |
| **What is the pain?** | Takes 4 hours/day, errors slip through, delays vendor payments |
| **What triggers it?** | A new batch of invoices lands in the shared mailbox each night |
| **What does "solved" look like?** | Exceptions are flagged automatically; the team only handles exceptions |
| **What is the cost of not solving it?** | ~20 hours/week of skilled labor, plus occasional late-payment penalties |

If you can't answer these, you don't have a business problem yet - you have a request, or a hunch, or someone's favorite technology looking for a use case.

## A worked example

**Request as stated:** "Build us a reporting dashboard for vendor payments."

**Problem underneath, once you ask:** The finance team spends 4 hours a day manually comparing two Excel exports, cross-checking amounts, and emailing corrections to another team. A dashboard wouldn't remove any of that manual work - it would just visualize the output of a broken process.

**Actual business problem:** "Reconciling vendor invoices against purchase orders is a fully manual, error-prone, 4-hour daily task with no audit trail."

This distinction changes everything downstream - architecture, technology, even whether you need a "system" at all. See [From Manual to Digital](/business-foundations/manual-to-digital) and [Choosing the Right Solution](/business-foundations/choosing-the-right-solution) for what happens next with a problem like this.

## When this step is skipped

- Teams build the requested feature and it goes unused, because it didn't touch the actual pain.
- Solutions get re-built 6 months later because "it didn't really solve anything."
- Scope grows endlessly because nobody agreed on what "done" means in business terms.
- Data teams build platforms for problems that needed a form and an approval step.

## Common mistakes

::: warning Common mistakes
- Accepting the first proposed solution as the requirement.
- Describing the problem in terms of a missing feature ("we need X screen") instead of a missing outcome.
- Skipping the people who actually do the work today, and only talking to their manager.
- Assuming urgency means the diagnosis step can be skipped - usually it's the opposite.
:::

## When to go deeper

Once the problem is understood, the next step is mapping how the work happens today - see [Understanding Business Processes](/business-foundations/understanding-business-processes) - before jumping to solution options.
