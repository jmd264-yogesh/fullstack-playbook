# Data Governance

**Level:** 🟡 Intermediate - assumes basic technical/business context

## Simple explanation

Data governance is the set of rules and responsibilities that answer: who owns this data, who can access it, where did it come from, and can we trust it? At small scale, governance can live in a few people's heads. Past a certain scale - multiple sources, multiple teams, sensitive data - it has to be made explicit, or the data becomes unreliable and unsafe to use.

## Real-world analogy

A small shop's owner personally knows every supplier, every price change, and every customer complaint - no formal system needed. A large supermarket chain can't run that way: it needs a supplier registry, a pricing policy, and a formal complaints process, not because anyone is less capable, but because the informal approach doesn't scale past a certain size. Data governance is that formal system for data.

## The core pillars

| Pillar | Plain-language question it answers |
|---|---|
| **Ownership** | Who is accountable for this dataset being accurate and available? |
| **Lineage** | Where did this data come from, and what transformations happened to it along the way? |
| **Access control** | Who is allowed to see or use this data, and why? |
| **Cataloging** | How does someone discover that this data exists at all? |
| **Quality rules** | What does "valid" mean for this data, and who enforces it? |
| **Retention & compliance** | How long do we keep this, and what regulations (GDPR, HIPAA, SOC2) apply? |

## Why it matters at scale

Without governance, a data platform with many sources and consumers tends to degrade into: nobody knowing which dataset is the "real" one, duplicate and conflicting definitions of the same metric across teams, and security incidents from data that should have been restricted but wasn't. Governance is what keeps a data platform trustworthy as it grows - it's a structural requirement of scale, not bureaucracy for its own sake.

## When governance is (and isn't) the priority

- **A single application with one database and one team using it** - standard access control is enough; formal governance processes would be overhead without benefit.
- **A data platform serving multiple teams, especially with sensitive data (financial, health, personal)** - governance is not optional; it's part of what makes the platform safe to build in the first place. See [When to Build a Data Platform](/data-analytics/when-to-build-a-data-platform).

## Common mistakes

::: warning Common mistakes
- Adding governance tooling before there's more than one real consumer of the data - solving a problem that doesn't exist yet.
- Treating governance as a one-time compliance checkbox instead of an ongoing practice tied to how data actually gets used.
- No clear ownership - when a dataset breaks or looks wrong, nobody is responsible for fixing it, so it stays broken.
- Access control so restrictive that legitimate use is blocked, pushing people toward unofficial shadow copies of the data - which defeats the purpose entirely.
:::

## Where this leads

- [Data Quality](/data-analytics/data-quality)
- [When to Build a Data Platform](/data-analytics/when-to-build-a-data-platform)
- [Security Guardrails](/security/security-guardrails) - the security-specific access control and compliance standards that apply across the playbook
