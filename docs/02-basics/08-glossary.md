# Glossary

Every acronym and shorthand term used elsewhere in this playbook, defined once, in one place. If you hit an unfamiliar term on any other page, check here first.

## Business & Solution Vocabulary

These terms are used precisely and consistently throughout this playbook, starting in [Business & Solution Foundations](/business-foundations/overview). Using them loosely - calling a database a "data platform," or a script an "AI" - makes it harder to choose the right solution, so this playbook avoids that on purpose.

| Term | Meaning |
|---|---|
| **Business Problem** | A gap between what's happening today and what someone needs, described in people/time/money/risk terms - never in terms of a technology. See [What is a Business Problem?](/business-foundations/what-is-a-business-problem) |
| **Process** | The actual sequence of steps people follow to get work done today, including the undocumented exceptions. See [Understanding Business Processes](/business-foundations/understanding-business-processes) |
| **Requirement** | A concrete, testable statement of what a solution must do, derived from the business problem - not the first solution someone proposed. See [Requirement Intake](/delivery-lifecycle/requirement-intake) |
| **Outcome** | The measurable business result a solution is supposed to produce (time saved, errors reduced, revenue enabled) - distinct from "the feature was deployed." See [Measuring Business Value](/business-foundations/measuring-business-value) |
| **Solution** | Whatever combination of process change, automation, application, integration, or data platform actually solves the problem - a solution is chosen, not defaulted to. See [Choosing the Right Solution](/business-foundations/choosing-the-right-solution) |
| **Application** | A system people directly interact with - has a user interface, and users make decisions through it. See [Application vs Automation](/business-foundations/application-vs-automation) |
| **Automation** | A process that runs itself according to fixed rules, without a user interface, ideally with a person only handling exceptions. See [What is Automation?](/automation-integration/what-is-automation) |
| **Integration** | Connecting systems that already exist so they share data or trigger each other, without building a new place for users to work. See [Application vs Integration](/business-foundations/application-vs-integration) |
| **Data** | A byproduct of business activity that has both value (it can answer questions) and cost (storage, governance, quality upkeep). See [What is Data?](/data-analytics/what-is-data) |
| **Data Platform** | Infrastructure for ingesting, modeling, governing, and serving data across multiple sources and consumers - justified by scale and cross-domain analytical need, not just "we have data." See [Application vs Data Platform](/business-foundations/application-vs-data-platform) |
| **Architecture** | The structural decisions (how components are split, how they communicate, who owns what data) that determine a system's trade-offs in cost, scalability, and reliability. See [Architecture Standards](/architecture/standards) |
| **Delivery** | The end-to-end path from an understood problem to a working, operated solution - not just "writing the code." See [Delivery Lifecycle](/delivery-lifecycle/overview) |
| **Production** | The live environment real users and real business outcomes depend on - a solution isn't "done" at deployment, it's done when production reliably creates value. See [Production & Reliability](/production-reliability/overview) |
| **Reliability** | Whether a system behaves correctly and consistently over time - distinct from availability (a system can be "up" but still unreliable). See [Reliability](/production-reliability/reliability) |
| **Business Value** | The quantified improvement a solution created - time saved, errors removed, capacity freed, revenue or cost impact. See [Measuring Business Value](/business-foundations/measuring-business-value) |

A few terms worth using carefully because they're commonly stretched beyond their real meaning:

| Avoid saying... | When you actually mean... |
|---|---|
| "Platform" | An application - reserve "platform" for something built to serve multiple products/teams as a reusable capability. See [Application vs Platform](/architecture/application-vs-platform) |
| "Data platform" | A database - reserve "data platform" for the multi-source, high-volume, multi-consumer case. See [When NOT to Build a Data Platform](/data-analytics/when-not-to-build-a-data-platform) |
| "AI" | Automation or a rules engine - reserve "AI/ML" for genuinely probabilistic problems a deterministic rule can't solve as well. See [Choosing the Right Solution](/business-foundations/choosing-the-right-solution) |
| "Microservice" | A backend service - reserve "microservice" for an independently deployable service with its own data, chosen for a specific scaling/ownership reason. See [Monolith vs Microservices](/architecture/monolith-vs-microservices) |

## Technical Acronyms

| Term | Meaning |
|---|---|
| **ACID** | Atomicity, Consistency, Isolation, Durability - transactional database guarantees |
| **ADR** | Architecture Decision Record - a short document capturing a significant technical decision and its reasoning. See [Architecture Decision Records](/architecture/architecture-decision-records) |
| **ARB** | Architecture Review Board - the group that approves major architectural changes |
| **Blast Radius** | How much of the system (which services, users, or data) is affected when something fails or is changed - a small blast radius means a failure stays contained |
| **CAB** | Change Advisory Board - the group that approves high-risk production changes |
| **CI/CD** | Continuous Integration / Continuous Delivery (or Deployment) - automated build, test, and release pipeline |
| **Correlation ID** | A unique ID attached to a request when it enters the system and passed along to every service it touches, so all the logs for one user action can be traced together. See [Logging Standards](/operations/logging-standards) |
| **CVE** | Common Vulnerabilities and Exposures - a catalogued, known security flaw |
| **DORA metrics** | Four key delivery metrics from the DevOps Research and Assessment group: Deployment Frequency, Lead Time for Changes, MTTR, Change Failure Rate |
| **DoR / DoD** | Definition of Ready / Definition of Done - the entry and exit criteria for a piece of work |
| **DX** | Developer Experience - how frictionless it is for engineers to do their job |
| **E2E** | End-to-End (testing) - tests that simulate a full real user journey |
| **Feature Flag** | A toggle in code that turns a feature on/off without deploying - lets you deploy code to production disabled, then enable it separately for specific users (see [Environment Strategy](/engineering/environments)) |
| **Governance** | The rules and approval processes that decide who can make which decisions, and how those decisions are tracked - see [Governance](/governance/overview) |
| **GraphQL** | An alternative to REST where the client specifies exactly which fields it wants in one request, instead of the server dictating a fixed response shape per endpoint - see [GraphQL Standards](/coding-standards/backend/graphql) |
| **Hypercare** | The heightened-monitoring period immediately after a release where the team watches closely and responds fast to anything unexpected, before returning to normal operating cadence - see [Monitoring & Hypercare](/delivery-lifecycle/monitoring-phase) |
| **IaC** | Infrastructure as Code - defining servers/environments in version-controlled config (e.g. Terraform) instead of manual setup |
| **Incident Management** | The process for detecting, responding to, and resolving a production incident, plus the follow-up (postmortem) that prevents it recurring - see [Incident Management](/operations/incident-management) |
| **JWT** | JSON Web Token - a common format for authentication tokens |
| **Message Broker** (Kafka, RabbitMQ) | A system that lets services communicate by publishing/subscribing to events instead of calling each other directly - see [Architecture Standards](/architecture/standards) |
| **Monorepo** | One Git repository containing multiple apps/packages (e.g. frontend + backend) that share code and release together, managed with tools like Turborepo or Nx - as opposed to a **polyrepo**, one repository per app |
| **MTTR** | Mean Time to Recovery - average time to restore service after an incident |
| **Observability** | The ability to understand what's happening inside a system from its external outputs (logs, metrics, traces) without having to add new code to investigate - see [Observability](/operations/observability) |
| **ORM** | Object-Relational Mapper - a library that lets you query a database using code instead of raw SQL |
| **Quality Gates** | Automated or manual checkpoints a change must pass before moving to the next stage (e.g. test coverage threshold, security scan, code review) - see [Quality Gates](/quality-gates/overview) |
| **RACI** | Responsible, Accountable, Consulted, Informed - a matrix defining who does what on a task |
| **SAST** | Static Application Security Testing - scans source code for security issues |
| **SCA** | Software Composition Analysis - scans dependencies for known CVEs |
| **SEV-1/2/3** | Incident severity levels - SEV-1 is the most critical (e.g. total outage) |
| **SLA** | Service Level Agreement - a committed target (e.g. response time) |
| **SLI** | Service Level Indicator - the actual measured value (e.g. % of successful requests) |
| **SLO** | Service Level Objective - the target for an SLI (e.g. 99.9% success rate) |
| **SOC2** | A compliance framework/audit standard for how organizations handle customer data security |
| **SDLC** | Software Development Lifecycle - the end-to-end process of building software |
| **Structured Logging** | Writing logs as machine-parsable fields (e.g. JSON: `{"userId": 123, "action": "checkout"}`) instead of free-text sentences, so logs can be filtered and searched reliably - see [Logging Standards](/operations/logging-standards) |

Missing a term? Add it here when you write new playbook content that introduces an acronym - don't assume the reader already knows it.
