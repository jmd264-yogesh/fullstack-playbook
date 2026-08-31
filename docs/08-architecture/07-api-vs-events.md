# API vs Events

**Level:** 🔴 Advanced - architecture/technical-decision depth

Architecture Standards already establishes that [event-driven patterns](/architecture/standards) are preferred for decoupled, highly scalable systems using choreography over orchestration. This page is the trade-off analysis behind that rule - when a direct API call is the correct, simpler choice, and when publishing an event earns its added complexity. See [Sync vs Async](/architecture/sync-vs-async) for the underlying distinction this builds on.

## The decision

| Ask | Leans toward API call | Leans toward Event |
|---|---|---|
| Does the caller need the result to proceed? | Yes | No |
| Is there exactly one consumer of this interaction? | Yes | No - multiple consumers |
| Does the caller need to know if it failed, right now? | Yes | No - can be retried/handled asynchronously |
| Is low latency for this specific call critical? | Yes | Not critical |
| Would new consumers need to be added over time without changing the producer? | No | Yes |

## When a direct API call is the right choice

- A single, well-known consumer needs a single, well-known answer (e.g. "check inventory before confirming an order").
- The interaction is simple enough that adding a message broker, event schema, and consumer group would be pure overhead.
- Debuggability matters: a synchronous call failure is immediate and traceable; a lost or delayed event is not.

## When an event is worth the complexity

- Multiple independent services need to react to the same occurrence (e.g. `OrderPlaced` triggers billing, fulfillment, and analytics - three unrelated consumers that shouldn't have to be called explicitly by the order service).
- The producer shouldn't need to know or care who consumes the event, now or in the future.
- The work can tolerate eventual consistency and doesn't block the original request.

## When NOT to use event-driven architecture

::: warning When NOT to use event-driven architecture
- **When there's exactly one consumer.** An event with one subscriber is just a more complicated, harder-to-debug API call. Use the API call.
- **When the caller needs an immediate answer.** Events are fire-and-forget by nature; forcing a "wait for the event to be processed and callback" pattern to fake synchronous behavior is worse than just calling the API directly.
- **When the team doesn't yet have the operational tooling to run it well.** Event-driven systems require a message broker (Kafka, RabbitMQ), monitoring for consumer lag, dead-letter queue handling, and idempotent consumers as a baseline, not an afterthought - see [Failure Handling](/architecture/architecture-trade-offs) considerations and [Observability](/operations/observability). Adopting events before this exists trades one class of bug (tight coupling) for a worse one (silent, hard-to-trace data loss).
- **When it makes debugging a straightforward business flow needlessly hard.** Tracing a single order across five loosely-coupled event consumers, each with their own retry and failure behavior, is significantly harder than following one linear call chain. Don't pay that cost unless the decoupling benefit is real.
:::

## Worked example

**Problem:** When a customer's address changes in the CRM, three other systems need to know: billing, shipping, and the loyalty program.

- ❌ **API-only:** The CRM would need to know about, and directly call, three other systems every time this happens - and again for every future system that cares. Tight coupling, and the CRM's release now blocks on every consumer's availability.
- ✅ **Event-driven:** The CRM publishes an `AddressChanged` event once. Billing, shipping, and loyalty each subscribe independently. A fourth consumer can be added later without ever touching the CRM.

**Contrast:** If only billing ever needed this information, a direct API call (or a scheduled sync) would have been simpler, more debuggable, and enough.

## Where this leads

- [Sync vs Async](/architecture/sync-vs-async)
- [Monolith vs Microservices](/architecture/monolith-vs-microservices)
- [Application vs Integration](/business-foundations/application-vs-integration) - the business-level version of this same choice
