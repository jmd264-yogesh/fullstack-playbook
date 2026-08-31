# What is Automation?

**Level:** 🟡 Intermediate - assumes basic familiarity with how software/business processes work

## Simple explanation

Automation is code (or a configured tool) that performs a task on its own, triggered by a schedule or an event, without a person driving it step by step. It is distinct from a script someone runs manually, and distinct from an application someone logs into - automation runs whether or not anyone is watching.

## Real-world analogy

A sprinkler system on a timer is automation: it waters the garden at 6am whether you're awake or not, following the same rule every day. A person walking outside with a hose is manual work. A control panel where a gardener presses "water now" and picks a duration is an application. All three can achieve the same outcome; only the sprinkler is automation.

## The three things that make something "automation," not just "a script"

1. **It runs unattended.** A schedule or an event starts it - not a person clicking "run."
2. **It's part of production.** It's monitored, owned by a team, and expected to keep working, not a one-off utility someone wrote for themselves.
3. **It has a defined failure path.** Something happens when it fails - a retry, an alert, an escalation - rather than nothing happening until someone notices data is missing.

A script that only ever runs when an engineer remembers to run it manually is not automation yet - it's a manual process with an extra tool. See [Automation Failure Handling](/automation-integration/failure-handling) for what turns a script into production-grade automation.

## When automation is the right call

- The task is repetitive and the rules are stable and well understood.
- Volume, frequency, or the cost of human error makes manual execution expensive.
- The trigger is naturally a schedule or an event, not a person's judgment call.

## When automation is NOT the right call

::: warning When automation is NOT the right call
- The rules are still being figured out - automating an unstable process just locks in whatever is wrong with it today, and makes it harder to see the problem clearly. Fix the process first (see [Understanding Business Processes](/business-foundations/understanding-business-processes)).
- The task happens rarely enough that building and maintaining the automation costs more than doing it by hand ever would.
- A genuine judgment call is required every time - that calls for an application with a human decision point, not automation. See [Application vs Automation](/business-foundations/application-vs-automation).
:::

## Common mistakes

- Calling a manually-triggered script "automation" and skipping monitoring and ownership as a result.
- Automating a process nobody has mapped end-to-end, missing the exceptions that make up the hard part of the job.
- Treating automation as "set and forget" - every automation needs an owner, just like an application does.

## Where this leads

- [Identifying Automation Opportunities](/automation-integration/identifying-opportunities)
- [Scheduled Jobs](/automation-integration/scheduled-jobs) and [Event-driven Automation](/automation-integration/event-driven-automation) - the two ways automation gets triggered
- [Human-in-the-loop Automation](/automation-integration/human-in-the-loop) - for when full automation isn't appropriate but manual work still is
