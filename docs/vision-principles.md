# Vision & Principles

The Full Stack Center of Excellence operates on a core set of principles. These are not just guidelines; they are the fundamental decision filters we use when deciding what to build, how to build it, and how to operate it.

## The Foundational Philosophy

Before any of the engineering principles below apply, this playbook asks every team to start from the same place:

> **Think in problems, not technologies.**
> **Understand the complete delivery flow, not just your technical component.**
> **Choose the simplest solution that creates the required business outcome.**
> **Software is not finished when it is deployed. It is finished when it reliably creates measurable value for its users and the business.**

An application, an automation, an integration, a database, a data platform, or an AI/ML model are all just tools - none of them is the goal. A business problem does not automatically mean "build an application," and having data does not automatically mean "build a data platform." The right solution is the one that matches the problem, not the one the team is most comfortable building.

This is not a side concern to the engineering principles below - it comes first. Read [Business & Solution Foundations](/business-foundations/overview) for the full framework, starting with [What is a Business Problem?](/business-foundations/what-is-a-business-problem) and [Choosing the Right Solution](/business-foundations/choosing-the-right-solution).

Once the right kind of solution has been chosen, the following principles govern how we design, build, and operate it.

## 1. Ship Small, Ship Often
We favor small, incremental updates over massive, big-bang releases. 
- **Why?** Smaller diffs are easier to review, drastically reduce the risk of catastrophic failure, and allow for much faster [MTTR](/basics/glossary) (Mean Time to Recovery) if a rollback is necessary.
- **Rule**: PRs should typically remain below 400 lines of code where practical. Larger changes should be justified and reviewed in logical units.
- **In practice**: A 1,200-line "add reporting module" PR sits in review for a week because no one can hold the whole thing in their head. Split into "add DB schema" → "add API endpoints" → "add UI" and each one gets reviewed same-day.

## 2. Automation First
Repetitive, error-prone, or frequently executed activities should be evaluated for automation.
- **Why?** Manual processes (deployments, QA testing, infrastructure provisioning) introduce human error and slow down delivery velocity.
- **Rule**: No code reaches production without passing automated CI/CD Quality Gates.
- **In practice**: A developer manually runs the same 6-step deployment checklist every release, occasionally missing step 4 (cache invalidation) and causing a stale-data bug. Scripting those 6 steps into the CI/CD pipeline removes the chance of a missed step.

## 3. Everything Observable
You cannot fix what you cannot see.
- **Why?** When a production incident occurs, engineers need immediate insight into the [blast radius](/basics/glossary) (how much of the system is affected).
- **Rule**: Every microservice must emit [structured logs](/basics/glossary), every request must have a tracing [Correlation ID](/basics/glossary), and core business functions must trigger alerts when they deviate from baseline [SLIs](/basics/glossary) (Service Level Indicators).
- **In practice - how these fit together**: A checkout API starts returning errors. Because every request carries a Correlation ID, the on-call engineer greps one request's ID across every service it touched instead of guessing which service failed. Because logs are structured (JSON fields, not free text), that search takes seconds. Because the checkout success-rate SLI has an alert on it, the team was already paged before a customer complained - turning what could've been a multi-hour, multi-team investigation into a 10-minute fix.
- **See also**: [Observability](/operations/observability), [Logging Standards](/operations/logging-standards), [Incident Management](/operations/incident-management).

## 4. Security by Default (Shift Left)
Security is not a gate at the end of the SDLC (Software Development Lifecycle); it is baked into the developer's daily workflow.
- **Why?** Finding a critical [CVE](/basics/glossary) (Common Vulnerabilities and Exposures) in production is vastly more expensive than blocking it in a pre-commit hook.
- **Rule**: All repositories must use [SAST](/basics/glossary)/[SCA](/basics/glossary) scanning. Hardcoded secrets will instantly fail the build.
- **In practice**: A dependency with a known critical CVE gets flagged by SCA scanning in CI before the PR can merge, instead of being discovered by a pentest (or an attacker) six months later in production.

## 5. Documentation Lives with Code
Outdated documentation in external wikis is dangerous.
- **Why?** If the documentation is not coupled to the codebase, it will drift from reality.
- **Rule**: [Architecture Decision Records](/architecture/architecture-decision-records) (ADRs) and service [Runbooks](/engineering/documentation) must be checked into the Git repository alongside the code they describe.
- **In practice**: A team decides to use a message queue instead of direct API calls between two services. The ADR captures the alternatives considered and why the queue won - six months later, a new engineer questioning "why is this so complicated?" finds the answer in the repo instead of reopening a settled debate.

## 6. No Manual Production Changes
Production is immutable.
- **Why?** SSHing into a production server or running manual SQL updates on a live database destroys the audit trail and leads to configuration drift.
- **Rule**: All infrastructure changes must be done via Terraform ([IaC](/basics/glossary), Infrastructure as Code). All database schema changes must be done via automated migrations.
- **In practice**: A "quick fix" manual SQL update on prod to unblock a customer is never reflected in the migration files - the next deploy's migration runs against a schema that no longer matches what the team thinks is there, and breaks.

## 7. Customer Value First
Technology decisions should optimize for business outcomes rather than technical elegance.
- **Why?** An elegant, well-tested system that doesn't move a business or operational metric hasn't paid for the effort put into it. See [Measuring Business Value](/business-foundations/measuring-business-value) for how we define and track that.
- **Rule**: Every significant engineering effort should be traceable to a measurable business or operational benefit.
- **In practice**: A proposed rewrite to a "cleaner" architecture gets shelved in favor of a smaller change, because the rewrite couldn't be tied to a concrete outcome (faster onboarding, fewer support tickets, lower infra cost) beyond "it would be nicer to work in."
