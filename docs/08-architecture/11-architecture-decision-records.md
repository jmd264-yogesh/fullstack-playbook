# Architecture Decision Records (ADRs)

**Level:** 🔴 Advanced - architecture/technical-decision depth

## What an ADR is

An Architecture Decision Record is a short, permanent document capturing one significant architectural decision: what was decided, why, what alternatives were considered, and what trade-offs were accepted. It is not a design document or a spec - it's a record of a choice, written so that someone reading it in two years understands why the system looks the way it does.

## Why it matters

Without ADRs, the reasoning behind a decision lives only in the memory of whoever was in the room - and leaves when they do. The next team to touch the system either repeats the same debate from scratch, or worse, "fixes" a decision that was actually correct for constraints that are no longer visible. This connects directly to the [Vision & Principles](/vision-principles) rule that documentation lives with the code it describes, not in a wiki that drifts out of sync.

## When to write one

Write an ADR for any decision that:

- Would be expensive to reverse (a database choice, a core architecture pattern, a build-vs-buy call on foundational infrastructure).
- Involved real trade-offs and alternatives that were seriously considered and rejected - see [Architecture Trade-offs](/architecture/architecture-trade-offs).
- Someone joining the project later would reasonably ask "why did we do it this way?"

Don't write one for routine, easily reversible implementation choices - that's what code review and the codebase itself are for.

## Template

```markdown
# ADR-00X: <short, decision-focused title>

## Status
Proposed | Accepted | Superseded by ADR-00Y

## Context
What problem or constraint forced this decision? What was true at the time
(team size, scale, deadline, existing systems) that a future reader needs
to know?

## Decision
What was decided, stated plainly in one or two sentences.

## Alternatives Considered
- **Option A** - what it was, why it was rejected.
- **Option B** - what it was, why it was rejected.

## Consequences
What does this make easier? What does it make harder? What did we
knowingly accept as a trade-off (see Architecture Trade-offs)?
```

## Where ADRs should live

ADRs are checked into the repository they concern, typically under `/docs/adr/` or `/architecture/decisions/`, numbered sequentially (`0001-use-postgres-for-primary-store.md`). They should never live only in an external wiki or a meeting recording - if it isn't in the repo, it will drift out of sync with the code it explains.

## Worked example

**ADR-0004: Use synchronous API calls instead of an event bus for order-to-inventory checks**

- **Context**: The order service needs to check inventory before confirming a purchase. Only one consumer (the order service) needs this information, and it's needed immediately, before the response can be returned to the customer.
- **Decision**: Call the inventory service's API directly and synchronously.
- **Alternatives considered**: An event-driven approach (`InventoryCheckRequested` → `InventoryCheckCompleted`) was considered and rejected - see [API vs Events](/architecture/api-vs-events) - because there's a single consumer, the caller needs an immediate answer to proceed, and the added complexity of a message broker for this one interaction wasn't justified.
- **Consequences**: Simpler to build, test, and debug. Creates a runtime dependency - if the inventory service is down, order confirmation fails immediately and visibly, which is the correct behavior here (better than confirming an order that can't be fulfilled).

## Common mistakes

::: warning Common mistakes
- Writing ADRs after the fact, reconstructed to justify a decision rather than to document the reasoning that actually happened.
- Treating ADRs as permanent - a later ADR should explicitly supersede an earlier one rather than editing history, so the trail of reasoning stays intact.
- Skipping the "alternatives considered" section - the point of an ADR is often more in what was rejected, and why, than in what was chosen.
:::

## Where this leads

- [Architecture Trade-offs](/architecture/architecture-trade-offs)
- [Vision & Principles](/vision-principles)
