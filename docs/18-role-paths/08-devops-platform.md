# Role Path: DevOps / Platform Engineer

**Level:** 🟡 Intermediate - assumes basic technical/business context

## Why you need this playbook

You keep everyone else's work running. This path is weighted toward deployment, operations, and incident response - the parts of the playbook that matter most once code leaves a developer's machine - plus enough business context to know what "acceptable downtime" actually means for a given system.

## Reading list

1. [How Software Works in Real Life](/business-foundations/how-software-works-in-real-life) - the request lifecycle you're responsible for keeping healthy at the infrastructure layer (routing, auth, logging, metrics).
2. [Measuring Business Value](/business-foundations/measuring-business-value) - why "it's up" isn't the same as "it's working," and how business impact should shape your alerting priorities.
3. [Deployment & Operations Overview](/operations/overview) - the section this path is centered on.
4. [Docker](/coding-standards/infrastructure/docker) - containerization standards used here.
5. [CI/CD Pipeline](/coding-standards/ci-cd) - how code moves from commit to production.
6. [Release Management](/operations/release-management) - release process and rollback expectations.
7. [Observability](/operations/observability) - logging, metrics, and tracing standards.
8. [Logging Standards](/operations/logging-standards) - structured logging conventions.
9. [Incident Management](/operations/incident-management) - your playbook for when things break.
10. [Disaster Recovery & Backups](/operations/disaster-recovery) - recovery expectations and testing cadence.
11. [DevSecOps Standards](/coding-standards/devsecops-standards) - security expectations baked into your pipeline.
12. [Automation & Integration Overview](/automation-integration/overview) - automation failure handling and monitoring patterns that apply directly to platform work.

## You'll know you're ready when you can answer

::: info Ready check
- For each major system you support, what's the actual business cost of an hour of downtime - and does your alerting reflect that?
- What's the rollback procedure if a deployment fails, and how quickly can it execute?
- Where are the correlation IDs and traces you'd pull first during an incident, and what do they tell you?
- When was disaster recovery last actually tested, not just documented?
:::
