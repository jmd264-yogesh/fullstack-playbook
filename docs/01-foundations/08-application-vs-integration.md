# Application vs Integration

**Level:** 🟡 Intermediate - assumes basic familiarity with how software/business processes work

## Simple explanation

An **application** is a new system you build. An **integration** connects systems that already exist so they can share data or trigger each other, without building a new place for users to work.

## Real-world analogy

If two departments each keep their own address book and constantly re-type the same contact into both, you have two choices: build them a shared new contact book (an application), or set up a system where updating one automatically updates the other (an integration). Usually the second is cheaper and less disruptive, because nobody has to change how they work.

## The decision

| Ask | Leans toward Application | Leans toward Integration |
|---|---|---|
| Does the capability not exist anywhere yet? | Yes | No |
| Do the existing systems already do the job, just not together? | No | Yes |
| Do users need a brand-new place to work? | Yes | No |
| Is the real problem "these two systems don't talk to each other"? | No | Yes |

## Types of integration

- **API integration** - one system calls another's API directly, typically for real-time, request/response needs (e.g. checking inventory before confirming an order).
- **Event-driven integration** - a system publishes an event ("OrderPlaced") and other systems react independently, useful when multiple consumers need to know about the same thing without tight coupling.
- **Scheduled/batch integration** - data is synced on a schedule (nightly, hourly) rather than instantly, appropriate when real-time isn't required and simplicity matters more.

See [API vs Events](/architecture/standards) for the deeper architectural trade-off between these two integration styles.

## Worked example

**Problem:** The CRM and the billing system both hold customer addresses, and they drift out of sync, causing invoices to go to old addresses.

- ❌ **Overkill:** Build a new "customer master" application and migrate both systems to use it.
- ✅ **Right fit:** An event-driven integration - when the CRM address changes, it emits an event; the billing system subscribes and updates its own record. No new application, no new database of record, no change to how either team works day-to-day.

## When to use integration

- The systems that need to talk already exist and are otherwise doing their job well.
- The goal is consistency and reduced manual re-entry, not new functionality.
- You want to avoid creating a new source of truth when one should not exist.

## When NOT to use integration

::: warning When NOT to use integration
- The "systems" involved are actually spreadsheets or manual processes with no real API - integration needs something to integrate *with*. In that case, see [From Manual to Digital](/business-foundations/manual-to-digital) first.
- The two systems have fundamentally incompatible data models, and forcing an integration would just move the mess rather than resolve it.
- You'd need so many point-to-point integrations that a shared platform or a proper data layer becomes the simpler long-term answer - see [Application vs Data Platform](/business-foundations/application-vs-data-platform).
:::

## Common mistakes

- Building tightly-coupled, synchronous integrations for things that don't need to be instant, creating fragile dependency chains.
- No retry or idempotency handling, so a network blip causes silent data loss or duplication.
- Treating an integration as a one-time script rather than a monitored, owned piece of production infrastructure.

## Where this leads

- [Application vs Automation](/business-foundations/application-vs-automation)
- [Application vs Data Platform](/business-foundations/application-vs-data-platform)
- [Architecture Standards](/architecture/standards) - technical patterns for building integrations well
