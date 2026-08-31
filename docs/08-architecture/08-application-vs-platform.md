# Application vs Platform

**Level:** 🔴 Advanced - architecture/technical-decision depth

## Simple explanation

An **application** solves a specific problem for a specific set of users. A **platform** provides a reusable capability that many different applications or teams build on top of. Platforms are more valuable when genuinely reused - and considerably more expensive to build and maintain than a single application, because they must serve needs that don't exist yet.

## The trade-off

| | Application | Platform |
|---|---|---|
| Serves | One known problem, one set of users | Multiple current and future consumers |
| Requirements | Known upfront | Must anticipate needs you don't fully know yet |
| Cost to build | Proportional to the problem | Higher - includes abstraction, extensibility, documentation, and support for consumers you don't control |
| Risk if wrong | Rework one application | Rework a foundation everything else depends on |
| Payoff | Immediate, for its users | Compounding, but only if reuse actually happens |

## The cost of premature platforming

Building a platform before you have at least two real, concrete consumers means designing abstractions against guesses instead of evidence. The most common failure mode is a platform that is flexible in the wrong ways (nobody needed that configuration option) and rigid in the ways that matter (the second real consumer's actual need doesn't fit).

A useful discipline: **build the application first. Extract the platform once a second genuine consumer needs the same capability**, using the real usage from both to shape the abstraction.

## When to build a platform

- Two or more concrete, current consumers need the same capability, not a hypothetical future one.
- The capability is stable enough that its interface won't need to change weekly as the first consumer evolves.
- There's a team (or clear ownership) able to support the platform as a product in its own right - versioning, documentation, backward compatibility.

## When NOT to build a platform

::: warning When NOT to build a platform
- There is exactly one consumer today, and "future reuse" is speculative.
- The underlying domain is still being discovered - you don't yet know what the right abstraction is.
- No one is accountable for maintaining and supporting it as other teams start depending on it - an unowned "platform" becomes the least reliable, worst-documented dependency in the system.
:::

## Worked example

**Problem:** Team A builds a notification feature (email + SMS) for their application. Team B, building a different application, needs the same thing.

- ❌ **Premature platform:** Team A builds a general-purpose "notification platform" upfront, before Team B exists, guessing at what other teams might need.
- ✅ **Right sequence:** Team A ships their notification feature for their own application. When Team B's need becomes concrete, the two real use cases are used to extract a shared notification service with an interface shaped by actual, not imagined, requirements.

## Common mistakes

- Confusing "platform" with "well-architected application" - a single application with clean internal boundaries is not automatically a platform, and doesn't need to be marketed as one.
- Under-resourcing platform teams, then being surprised when the platform becomes a bottleneck for every consumer.
- Skipping governance: a platform with no clear ownership, support model, or versioning policy accumulates inconsistent, breaking changes.

## Where this leads

- [Build vs Buy](/architecture/build-vs-buy)
- [Architecture Trade-offs](/architecture/architecture-trade-offs)
- [Application vs Data Platform](/business-foundations/application-vs-data-platform) - the data-specific version of "don't platform before it's earned"
