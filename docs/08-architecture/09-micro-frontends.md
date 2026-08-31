# Micro-Frontends

**Level:** 🔴 Advanced - architecture/technical-decision depth

## Simple explanation

A micro-frontend architecture splits a single web application's UI into independently built and deployed pieces - owned by different teams - that are composed together at runtime or build time into one experience for the user.

## Why teams reach for it

Micro-frontends solve a real, specific problem: **when multiple independent teams need to ship UI changes to the same product without coordinating a shared frontend codebase and release.** At genuine scale - many teams, many product surfaces, a frontend monolith that's become a release bottleneck - that coordination cost is real and worth solving.

## When NOT to use micro-frontends

::: warning When NOT to use micro-frontends
Don't introduce micro-frontends without a genuine organizational or architectural reason. Specifically avoid them when:

- **One team owns the whole frontend.** There is no coordination problem to solve - you'd be paying the integration and tooling cost for a benefit that doesn't exist yet.
- **The product doesn't have genuinely independent sub-experiences.** If every "module" still needs to look, behave, and release in lockstep with the rest of the product, splitting it doesn't reduce coordination - it just moves the coordination into a build/runtime composition layer instead.
- **The team hasn't hit an actual bottleneck yet.** A frontend monolith with clear internal module boundaries (the frontend equivalent of a [modular monolith](/architecture/monolith-vs-microservices)) solves most of the pain people reach for micro-frontends to fix - shared UI kit, clear ownership of folders, independent feature teams - without runtime composition complexity.
- **Consistency (design system, performance, accessibility) matters more than team independence.** Micro-frontends make it easy for different pieces to drift in framework version, bundle size, and UX consistency unless significant shared tooling investment goes in up front.
- **The team lacks the tooling maturity to manage shared dependencies, versioning, and runtime composition.** Module federation, shared design systems, and cross-team contract testing are real engineering investments - without them, users experience the seams (inconsistent loading states, duplicated dependencies, jarring visual differences).
:::

## The decision, in one table

| Signal | Modular Frontend (single app) | Micro-Frontends |
|---|---|---|
| Number of independent teams shipping UI | 1 | Multiple, genuinely independent |
| Release cadence | Shared, coordinated | Needs to differ per team/module |
| Product surfaces | One cohesive product | Genuinely separable sub-products or domains |
| Design/UX consistency requirement | High, shared by default | Requires deliberate shared tooling investment |
| Current pain | None yet, or solvable by better internal module boundaries | An actual, demonstrated release bottleneck from shared ownership |

## Common mistakes

- Adopting micro-frontends because the backend is already microservices - frontend and backend boundaries don't have to (and usually shouldn't) mirror each other one-to-one.
- Splitting along technical seams (a "header micro-frontend," a "footer micro-frontend") rather than genuine product/team boundaries - this multiplies integration complexity for no autonomy benefit.
- Skipping investment in a shared design system, leading to a visibly inconsistent product.
- Treating this as a frontend equivalent of [microservices](/architecture/monolith-vs-microservices) without the same discipline - the same "can you name the specific coordination problem this solves?" question applies here just as much.

## Where this leads

- [Monolith vs Microservices](/architecture/monolith-vs-microservices) - the same discipline, applied to the backend
- [Application vs Platform](/architecture/application-vs-platform) - a related question about premature reusability investment
- [Architecture Trade-offs](/architecture/architecture-trade-offs) - the general framework for weighing decisions like this one
