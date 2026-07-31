# Glossary

Every acronym and shorthand term used elsewhere in this playbook, defined once, in one place. If you hit an unfamiliar term on any other page, check here first.

| Term | Meaning |
|---|---|
| **ACID** | Atomicity, Consistency, Isolation, Durability — transactional database guarantees |
| **ADR** | Architecture Decision Record — a short document capturing a significant technical decision and its reasoning |
| **ARB** | Architecture Review Board — the group that approves major architectural changes |
| **CAB** | Change Advisory Board — the group that approves high-risk production changes |
| **CI/CD** | Continuous Integration / Continuous Delivery (or Deployment) — automated build, test, and release pipeline |
| **CVE** | Common Vulnerabilities and Exposures — a catalogued, known security flaw |
| **DORA metrics** | Four key delivery metrics from the DevOps Research and Assessment group: Deployment Frequency, Lead Time for Changes, MTTR, Change Failure Rate |
| **DoR / DoD** | Definition of Ready / Definition of Done — the entry and exit criteria for a piece of work |
| **DX** | Developer Experience — how frictionless it is for engineers to do their job |
| **E2E** | End-to-End (testing) — tests that simulate a full real user journey |
| **Feature Flag** | A toggle in code that turns a feature on/off without deploying — lets you deploy code to production disabled, then enable it separately for specific users (see [Environment Strategy](/engineering/environments)) |
| **GraphQL** | An alternative to REST where the client specifies exactly which fields it wants in one request, instead of the server dictating a fixed response shape per endpoint — see [GraphQL Standards](/coding-standards/backend/graphql) |
| **IaC** | Infrastructure as Code — defining servers/environments in version-controlled config (e.g. Terraform) instead of manual setup |
| **JWT** | JSON Web Token — a common format for authentication tokens |
| **Message Broker** (Kafka, RabbitMQ) | A system that lets services communicate by publishing/subscribing to events instead of calling each other directly — see [Architecture Standards](/architecture/standards) |
| **Monorepo** | One Git repository containing multiple apps/packages (e.g. frontend + backend) that share code and release together, managed with tools like Turborepo or Nx — as opposed to a **polyrepo**, one repository per app |
| **MTTR** | Mean Time to Recovery — average time to restore service after an incident |
| **ORM** | Object-Relational Mapper — a library that lets you query a database using code instead of raw SQL |
| **RACI** | Responsible, Accountable, Consulted, Informed — a matrix defining who does what on a task |
| **SAST** | Static Application Security Testing — scans source code for security issues |
| **SCA** | Software Composition Analysis — scans dependencies for known CVEs |
| **SEV-1/2/3** | Incident severity levels — SEV-1 is the most critical (e.g. total outage) |
| **SLA** | Service Level Agreement — a committed target (e.g. response time) |
| **SLI** | Service Level Indicator — the actual measured value (e.g. % of successful requests) |
| **SLO** | Service Level Objective — the target for an SLI (e.g. 99.9% success rate) |
| **SOC2** | A compliance framework/audit standard for how organizations handle customer data security |
| **SDLC** | Software Development Lifecycle — the end-to-end process of building software |

Missing a term? Add it here when you write new playbook content that introduces an acronym — don't assume the reader already knows it.
