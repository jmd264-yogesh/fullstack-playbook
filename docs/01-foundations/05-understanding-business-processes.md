# Understanding Business Processes

**Level:** 🟢 Beginner - readable with no technical background

## Simple explanation

A business process is the actual sequence of steps people follow today to get work done - not the sequence someone assumes happens, and not the sequence a system diagram implies. Before you can improve or digitize anything, you have to map what really happens, including the messy, undocumented parts.

## Why it matters

Solutions built against an *assumed* process routinely miss the exceptions, workarounds, and manual judgment calls that make up most of the real effort. The 20% of a process that's "the weird edge case someone handles by emailing Dave" is usually where all the time and risk actually live.

## Real-world analogy

An efficiency consultant who redesigns a factory floor without first watching how workers actually move through it will "optimize" the parts that were never the bottleneck, and leave the real bottleneck untouched.

## How to map a process

1. **Trigger** - what starts this process? (a new file arrives, a form is submitted, a date passes)
2. **Steps** - what does each person actually do, in order, including checks and handoffs?
3. **Decision points** - where do humans use judgment, and on what basis?
4. **Exceptions** - what happens when something doesn't fit the normal case?
5. **Systems touched** - which spreadsheets, emails, and applications are involved?
6. **Outputs** - what does "done" produce, and who consumes it?
7. **Time and frequency** - how long does it take, and how often does it happen?

## Worked example

**Assumed process (from a manager):** "Invoices come in, finance checks them against the PO, and pays them."

**Actual process (from watching the team):**
1. Invoices land in a shared inbox overnight.
2. An analyst downloads each PDF and manually types values into an Excel sheet.
3. The sheet is compared line-by-line against a PO export from another system.
4. Mismatches over $500 are escalated by email to a manager for approval.
5. Approved invoices are manually re-typed into the payment system.
6. Everything else gets a same-day approval with no audit trail.

Only after this mapping does it become clear the real problems are manual re-typing (error-prone) and the missing audit trail (a compliance risk) - not "checking invoices" itself, which the team already does well.

## Common mistakes

::: warning Common mistakes
- Interviewing only managers, who often don't know the actual day-to-day workarounds.
- Documenting the "happy path" only, and discovering the exceptions after go-live.
- Assuming the current process is already the right one, rather than asking why each step exists.
- Mapping the process once and never revisiting it as the business changes.
:::

## When to go deeper

Once you understand the real process, decide how much of it should change and how - see [From Manual to Digital](/business-foundations/manual-to-digital).
