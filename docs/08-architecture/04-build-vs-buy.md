# Build vs Buy

**Level:** 🔴 Advanced - architecture/technical-decision depth

Not every capability should be custom-built. Before writing a line of code, ask whether the capability is a genuine differentiator for the business or a commodity problem someone else has already solved well.

## The decision

| Ask | Leans toward Buy | Leans toward Build |
|---|---|---|
| Is this capability a competitive differentiator? | No | Yes |
| Do mature, well-supported products already solve this? | Yes | No |
| Does it need deep integration with proprietary business logic? | No | Yes |
| Is time-to-value more important than long-term customization? | Yes | No |
| Would ongoing vendor cost exceed the cost of owning it long-term? | No | Yes |
| Do we have (or want) the operational capacity to run and patch it forever? | No | Yes |

Commodity problems - authentication, payments, email delivery, search, error tracking, CI/CD infrastructure - are almost always **buy**. Anything that encodes the specific business logic that makes this product valuable is almost always **build**.

## Worked example

**Problem:** The product needs user authentication with SSO, MFA, and social login.

- ❌ **Building it:** Months of security-sensitive work, ongoing maintenance burden, and it's not what differentiates the product.
- ✅ **Buying it:** An identity provider (e.g. Auth0, Okta, or a cloud provider's managed identity service) is purpose-built, audited, and continuously improved by a team whose whole job is exactly this problem.

**Contrast:** The product's core pricing engine, which encodes negotiated, business-specific rules - this is a **build**, because no vendor sells "our exact pricing logic," and it's the thing that makes the product worth using.

## When to buy

- The problem is a solved, well-understood commodity (auth, payments, observability tooling, email).
- Time-to-market matters more than deep customization.
- The team's differentiated value lies elsewhere.

## When to build

- The capability is core to what makes the product valuable or defensible.
- Available products don't fit the actual constraints (compliance, scale, integration depth) closely enough to be worth the workaround cost.
- The long-term cost of vendor lock-in or per-seat/per-usage pricing outweighs the build cost at the organization's scale.

## Common mistakes

::: warning Common mistakes
- Building commodity infrastructure because it's a more interesting engineering problem than the actual product work.
- Buying a platform for a core differentiator because it demoed well, then spending years fighting its limitations.
- Ignoring the ongoing operational cost of "build" - a build decision is a permanent staffing commitment, not a one-time cost.
- Treating "buy" as risk-free - vendor lock-in, pricing changes, and outages become someone else's problem only up to a point.
:::

## Where this leads

- [Architecture Trade-offs](/architecture/architecture-trade-offs) - the general framework this decision is one instance of
- [Choosing the Right Solution](/business-foundations/choosing-the-right-solution) - the business-level version of this same question
- [Application vs Platform](/architecture/application-vs-platform)
