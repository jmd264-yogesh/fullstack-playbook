import os
import textwrap

base_dir = os.path.join(os.path.dirname(__file__), 'docs')

new_content = {
    '': {
        'vision-principles.md': """# Vision & Principles

The Full Stack Center of Excellence operates on a core set of engineering principles. These are not just guidelines; they are the fundamental decision filters we use when designing, building, and operating software.

## 1. Ship Small, Ship Often
We favor small, incremental updates over massive, big-bang releases. 
- **Why?** Smaller diffs are easier to review, drastically reduce the risk of catastrophic failure, and allow for much faster MTTR (Mean Time to Recovery) if a rollback is necessary.
- **Rule**: A Pull Request should ideally not exceed 400 lines of code.

## 2. Automation First
If a human has to repeat a task more than twice, it must be automated.
- **Why?** Manual processes (deployments, QA testing, infrastructure provisioning) introduce human error and slow down delivery velocity.
- **Rule**: No code reaches production without passing automated CI/CD Quality Gates.

## 3. Everything Observable
You cannot fix what you cannot see.
- **Why?** When a production incident occurs, engineers need immediate insight into the blast radius.
- **Rule**: Every microservice must emit structured logs, every request must have a tracing Correlation ID, and core business functions must trigger alerts when they deviate from baseline SLIs.

## 4. Security by Default (Shift Left)
Security is not a gate at the end of the SDLC; it is baked into the developer's daily workflow.
- **Why?** Finding a critical CVE in production is vastly more expensive than blocking it in a pre-commit hook.
- **Rule**: All repositories must use SAST/SCA scanning. Hardcoded secrets will instantly fail the build.

## 5. Documentation Lives with Code
Outdated documentation in external wikis is dangerous.
- **Why?** If the documentation is not coupled to the codebase, it will drift from reality.
- **Rule**: Architecture Decision Records (ADRs) and service Runbooks must be checked into the Git repository alongside the code they describe.

## 6. No Manual Production Changes
Production is immutable.
- **Why?** SSHing into a production server or running manual SQL updates on a live database destroys the audit trail and leads to configuration drift.
- **Rule**: All infrastructure changes must be done via Terraform (IaC). All database schema changes must be done via automated migrations.
"""
    },
    'architecture': {
        'standards.md': """# Architecture Standards

Defining clear boundaries is critical for scalable engineering. We use these architectural standards to ensure consistency across the enterprise.

## 1. Monorepo vs Polyrepo Guidance
- **Default to Monorepo (Turborepo/Nx)**: For a full-stack application (e.g., Next.js frontend + NestJS backend) that share the same domain logic and release cycle, a monorepo is mandatory. It allows for sharing DTOs (TypeScript types) seamlessly across the stack.
- **When to use Polyrepo**: When building isolated, generic microservices that are consumed by multiple, entirely separate products with different lifecycles.

## 2. Event-Driven Patterns
For decoupled, highly scalable systems, we favor asynchronous event-driven architectures.
- **Message Broker**: Kafka or RabbitMQ.
- **Pattern**: Choreography over Orchestration. Services should emit domain events (e.g., `OrderPlaced`) rather than directly calling other services via synchronous HTTP/REST, which creates tight coupling and cascading failures.
- **Idempotency**: All event consumers MUST be idempotent to handle potential at-least-once delivery duplicates.

## 3. Microservice Checklist
Before creating a new microservice, the Architect must ensure it meets these criteria:
- [ ] Does it own its own database? (Microservices must never share a database).
- [ ] Can it be deployed independently without requiring another service to be deployed simultaneously?
- [ ] Does it have a dedicated Health Check endpoint (`/health`)?
- [ ] Is it stateless?
""",
        'api-standards.md': """# API Standards

API consistency is the bedrock of our microservice architecture. All REST and GraphQL APIs must adhere to these enterprise standards.

## 1. REST Conventions
- **Nouns, not Verbs**: Use `/users`, not `/getUsers`.
- **Pluralization**: Always use plural nouns for collections (`/users/123`, not `/user/123`).
- **Versioning**: APIs must be versioned at the URL level (`/api/v1/users`) or via Accept Headers. Never break a v1 API; release a v2 and deprecate v1.

## 2. Standardized Error Schema
Clients must be able to parse errors predictably. All APIs must return the exact same error structure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The provided email is invalid.",
    "details": {
      "field": "email",
      "issue": "must be a valid email address"
    }
  },
  "timestamp": "2026-05-20T10:00:00Z",
  "correlationId": "req-12345-abcde"
}
```

## 3. Pagination & Filtering
- Never return unbounded arrays.
- **Cursor-based Pagination**: Preferred for infinite scrolling and high-performance tables.
- **Offset/Limit Pagination**: Acceptable for standard administrative dashboards (`?limit=50&offset=100`).

## 4. Idempotency & Retries
- **Idempotency Keys**: All non-idempotent operations (POST, PUT, DELETE) that involve financial transactions or state mutations must require an `Idempotency-Key` header.
- **Retries**: Clients must implement exponential backoff with jitter when retrying failed requests (5xx errors).

## 5. GraphQL Standards
- **N+1 Prevention**: You MUST use `DataLoader` to batch and cache database queries within resolvers.
- **Depth Limiting**: Implement strict query depth limiting (max depth of 5) to prevent malicious nested queries from executing Denial of Service (DoS) attacks on the database.
"""
    },
    'engineering': {
        'git-branching.md': """# Git & Branching Strategy

Our branching model is designed to minimize merge conflicts and accelerate the delivery pipeline.

## 1. Branching Model: Trunk-Based Development
We strictly follow **Trunk-Based Development**.
- Developers branch off `main`, create short-lived feature branches, and merge back into `main` frequently (at least once a day).
- Long-lived `develop` or `release/*` branches are heavily discouraged as they lead to integration hell.

## 2. Branch Naming Conventions
Branches must follow this format: `<type>/<ticket-id>-<short-desc>`
- `feat/JIRA-123-add-login-form`
- `fix/JIRA-456-patch-null-pointer`
- `chore/JIRA-789-update-deps`

## 3. Semantic Commits
All commits must follow the Conventional Commits specification. This allows us to auto-generate changelogs and trigger semantic versioning bumps.
- `feat: add user authentication`
- `fix: resolve race condition in payment service`
- `docs: update API schema`

## 4. Merge Strategy: Squash & Merge
- We enforce **Squash and Merge** for all Pull Requests into `main`. 
- This keeps the `main` git history perfectly linear, clean, and easily readable for rollbacks.
""",
        'environments.md': """# Environment Strategy

Properly segregated environments prevent experimental code from impacting production systems and secure customer data.

## 1. The Environment Pipeline
Code promotes sequentially through the following environments:
1. **Local**: Developer's machine (Docker Compose).
2. **Preview (Ephemeral)**: Spun up automatically per Pull Request. Used for UX review.
3. **Dev**: Continuous Integration target. The bleeding edge of `main`.
4. **Staging**: Exact replica of Production. Used for E2E, Load Testing, and UAT. Data is sanitized.
5. **Production**: Live customer traffic. Highly restricted access.

## 2. Secrets Management
- **Rule**: NEVER commit `.env` files or hardcode secrets in the repository.
- **Local**: Use `.env.local` (ignored by git) or a local Vault instance.
- **Deployed Environments**: Secrets must be injected at runtime via AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault.

## 3. Feature Flags
To decouple *Deployment* from *Release*, we utilize Feature Flags (e.g., LaunchDarkly, Unleash).
- Deploying code to production should be a non-event. The feature remains disabled via a flag until the business is ready to toggle it on for specific user segments.
- **Cleanup**: Flags must be removed from the codebase within one sprint of being fully rolled out to 100% of users.
""",
        'developer-experience.md': """# Developer Experience (DX)

A frictionless Developer Experience (DX) pays off massively in velocity and retention. Our goal: **A new engineer must be able to push their first commit to production on Day 1.**

## 1. The "One-Command" Local Setup
Local environments must not require 15 manual steps to configure.
- Every repository must have a `make setup` or `npm run init` script that:
  1. Installs dependencies.
  2. Copies `.env.example` to `.env`.
  3. Spins up required databases via Docker Compose.
  4. Runs the database migrations and seeds dummy data.

## 2. Preconfigured Tooling
Developers should not waste time debating code styles.
- **Linting & Formatting**: ESLint and Prettier configs must be centralized and automatically enforced upon file save.
- **IDE Settings**: Repositories must include `.vscode/settings.json` and `extensions.json` to automatically configure the editor for anyone joining the project.

## 3. Local Debugging
- Include pre-configured `.vscode/launch.json` so engineers can attach a debugger to Node.js/PHP processes instantly with a single click (F5), rather than relying entirely on `console.log`.
""",
        'documentation.md': """# Documentation Standards

"If a human has to repeat it twice, document it."

## 1. Architecture Decision Records (ADRs)
We use ADRs to capture why architectural decisions were made.
- **Where**: Stored in `docs/adr/` within the repository.
- **Format**: 
  - Context (The problem)
  - Options Considered
  - Decision (What we chose and why)
  - Consequences (Trade-offs)

## 2. API Documentation
- APIs must be self-documenting.
- REST APIs must expose a Swagger/OpenAPI UI (e.g., via `@nestjs/swagger` in NestJS or L5-Swagger in Laravel).
- GraphQL APIs must expose the GraphiQL playground in non-production environments with rich schema descriptions.

## 3. Runbooks
Every microservice must have a `RUNBOOK.md` that explains to the On-Call engineer:
1. What this service does.
2. What alerts are associated with it.
3. How to view its logs.
4. Step-by-step instructions for known failure mitigation.
"""
    },
    'testing': {
        'testing-strategy.md': """# Layered Testing Strategy

Automated testing is the only way to achieve continuous deployment confidently. We follow the Testing Pyramid.

## 1. Unit Tests (The Base)
- **Scope**: Testing individual functions, classes, or components in isolation. Mock all external dependencies.
- **Coverage Target**: Minimum 80% line coverage.
- **Tools**: Jest, Vitest, PHPUnit.

## 2. Integration Tests (The Middle)
- **Scope**: Testing how components interact, specifically focusing on database queries and cache interactions. Real databases (via Testcontainers or in-memory) must be used.
- **Rule**: If your API endpoint hits the DB, it needs an integration test.

## 3. End-to-End (E2E) Tests (The Peak)
- **Scope**: Testing Critical User Journeys (CUJs) from the browser to the database and back.
- **Tools**: Cypress, Playwright.
- **Rule**: E2E tests are brittle and slow. Only write E2E tests for the most critical paths (e.g., User Checkout, Registration).

## 4. Contract Testing
In a microservices architecture, Contract Testing ensures services don't break each other's expectations.
- **Tools**: Pact.
- **Rule**: Before deploying a Consumer service, it must verify that the Provider service's API matches the agreed-upon contract.

## 5. Flaky Test Handling
- A flaky test (fails randomly 1 out of 10 times) destroys pipeline trust.
- **Rule**: If a test is flagged as flaky, it must be quarantined (skipped) immediately until an engineer fixes the race condition or async timing issue.
"""
    },
    'security-performance': {
        'security-playbook.md': """# Security Playbook

Security is paramount. The following standards are strictly enforced across the enterprise.

## 1. OWASP Top 10 Checklist
All applications must actively mitigate the OWASP Top 10.
- **Injection**: Use parameterized queries/ORMs (Prisma, Eloquent). Never concatenate raw SQL strings.
- **Broken Authentication**: Enforce strong password hashing (Argon2, bcrypt), implement rate-limiting, and mandate MFA for admin panels.
- **XSS**: Sanitize user input and rely on modern framework escaping (React `{}` and Blade `{{}}`). Implement strict Content Security Policies (CSP).

## 2. Secrets Handling
- No credentials, API keys, or JWT secrets in source code.
- If a secret is accidentally committed, the key MUST be revoked and rotated immediately. You cannot just rewrite the Git history.

## 3. Role-Based Access Control (RBAC)
- **Principle of Least Privilege**: Users and services should only have the absolute minimum permissions required to perform their task.
- Enforce authorization checks at the service layer, not just the UI layer.

## 4. Production Access & Audit Logging
- Direct SSH or DB access to production requires temporary, just-in-time (JIT) credentials via an Identity Broker (e.g., Teleport).
- Every mutation (Create, Update, Delete) on critical business entities must trigger an immutable audit log recording `who`, `what`, and `when`.
""",
        'performance.md': """# Performance Standards

Performance is a feature. Slow systems lead to churn and high infrastructure costs.

## 1. Frontend Performance Budgets
- **Core Web Vitals**:
  - **LCP (Largest Contentful Paint)**: < 2.5 seconds.
  - **FID (First Input Delay)**: < 100 milliseconds.
  - **CLS (Cumulative Layout Shift)**: < 0.1.
- **Bundle Size**: Initial JS bundle must not exceed 200KB (gzipped). Use code splitting heavily.

## 2. API Response Targets
- **p95 Latency**: 95% of API requests must complete in under **250ms**.
- **Heavy Queries**: Any query taking longer than 1 second must be offloaded to an asynchronous background queue (Kafka/Redis) and return a `202 Accepted` to the client.

## 3. Caching Strategy
- **Client-Side**: Utilize `ETag` and `Cache-Control` headers for static assets.
- **CDN**: All static assets (images, CSS, JS) must be served via a CDN (Cloudflare/CloudFront).
- **Application**: Frequently accessed, rarely mutating data (e.g., product catalogs, feature flags) must be cached in Redis to protect the primary database.
"""
    },
    'operations': {
        'ci-cd.md': """# CI/CD Standards

Our deployment pipelines are the backbone of the delivery lifecycle.

## 1. Pipeline Stages
A standard enterprise pipeline flows automatically:
1. `Lint & Format`
2. `Unit Tests`
3. `SAST & SCA Security Scan`
4. `Build Docker Image`
5. `Push to Registry`
6. `Deploy to Staging`
7. `E2E Smoke Tests`
8. `Promote to Production`

## 2. Build Optimization & Caching
- **Docker Caching**: Utilize multi-stage Docker builds and layer caching. Always copy `package.json` and run `npm install` BEFORE copying the rest of the source code.
- **Dependency Caching**: Cache `node_modules` and `.npm` folders across pipeline runs to cut build times in half.

## 3. Deployment Automation
- We enforce **Zero Downtime Deployments**.
- **Rolling Updates**: Kubernetes progressively replaces pods so the service is never unavailable.
- **Blue/Green & Canary**: For high-risk releases, deploy to a dark "Green" environment, run smoke tests, and then shift 10% of traffic (Canary) before going 100%.
""",
        'release-management.md': """# Release Management

## 1. Semantic Versioning
All releases must follow `MAJOR.MINOR.PATCH` (e.g., `v1.4.2`).
- **MAJOR**: Breaking API changes.
- **MINOR**: Backward-compatible new features.
- **PATCH**: Backward-compatible bug fixes.

## 2. Changelog Standards
Changelogs are generated automatically via Semantic Release based on Semantic Commits. 
- Release notes are automatically posted to the #engineering Slack/Teams channel upon successful production deployment.

## 3. Rollback Policy
- **Rule**: If a deployment triggers a P1/P2 incident (error spikes, latency spikes), the pipeline MUST allow for a 1-click rollback to the previous known good version.
- Because of this, database migrations must ALWAYS be backward-compatible with the previous version of the code.
""",
        'observability.md': """# Observability & Monitoring

## 1. The Three Pillars
- **Logs**: Structured JSON logs. Avoid multi-line string logs.
- **Metrics**: Time-series data tracking RPS (Requests Per Second), Error Rates, and Latency.
- **Traces**: Distributed tracing (e.g., OpenTelemetry, Jaeger) is mandatory for microservices to track a request's journey across network boundaries.

## 2. Service Level Objectives (SLOs)
- **SLI (Indicator)**: E.g., The percentage of HTTP 200 responses in the last 5 minutes.
- **SLO (Objective)**: E.g., 99.9% of requests must succeed.
- **Error Budgets**: If a team burns through their error budget (drops below 99.9%), feature development is halted, and the team must exclusively work on reliability.

## 3. Correlation IDs
- Every incoming HTTP request at the API Gateway receives a unique `x-correlation-id` header. This ID must be injected into all logs and passed downstream to all other microservices to allow for exact tracing of a failed request.
""",
        'incident-management.md': """# Reliability & Incident Management

## 1. Incident Severity Matrix
- **SEV-1 (Critical)**: Total system outage or severe data breach. (SLA: 15 mins).
- **SEV-2 (High)**: Core functionality broken for many users. (SLA: 30 mins).
- **SEV-3 (Medium)**: Non-core feature broken, workaround exists. (SLA: Next working day).

## 2. The On-Call Process
- Handled via PagerDuty/Opsgenie.
- Alerts must be actionable. "CPU is at 80%" is not an alert; autoscaling handles that. "Payment Success Rate dropped below 95%" is an alert.

## 3. Blameless Postmortems
After every SEV-1 or SEV-2 incident, a postmortem document is required.
- **Rule**: Postmortems are strictly **blameless**. We do not ask "Who broke it?", we ask "Why did the system allow a human to break it?"
- Must result in actionable Jira tickets (e.g., adding a new E2E test, tweaking an alert threshold) to prevent recurrence.
"""
    },
    'templates': {
        'project-kickoff.md': """# FS Project Kickoff Checklist

> Interactive Checklist: When starting a new Full-Stack project, clone this template and check off the boxes as you complete the onboarding phases.

## 1. Discovery & Design
- [ ] Architecture Decision Record (ADR) created and approved by ARB.
- [ ] Database schema drafted and reviewed.
- [ ] UI/UX wireframes approved by Product Owner.

## 2. Repository Setup
- [ ] Repository initialized via IDP / Golden Path template.
- [ ] `README.md` populated with local setup instructions.
- [ ] `.nvmrc` or Dockerfile defines exact runtime versions.
- [ ] `docker-compose.yml` configured for local DB/Redis.

## 3. CI/CD & Quality Gates
- [ ] Pipeline connected to `main` branch.
- [ ] Branch protection rules applied (Requires 2 PR reviews).
- [ ] SonarQube integrated (Quality Profile applied).
- [ ] Snyk/Dependabot activated for vulnerability scanning.

## 4. Engineering Standards
- [ ] Linter (ESLint/PHP_CodeSniffer) and Prettier configured in pre-commit hooks.
- [ ] TypeScript strict mode enabled (`"strict": true`).
- [ ] Standardized Error Schema implemented in API responses.

## 5. Security & Infra
- [ ] Secrets injected via Vault/Secrets Manager (No `.env` committed).
- [ ] Identity Provider (SSO/JWT) integrated.
- [ ] Terraform IaC scripts written for Dev/Staging environments.

## 6. Observability
- [ ] Datadog / Prometheus monitoring agent attached.
- [ ] Structured JSON logging configured.
- [ ] `x-correlation-id` implemented in middleware.
""",
        'production-readiness.md': """# Production Readiness Checklist

Before any service goes live to customers for the first time, this checklist must be completed by the Tech Lead.

## Reliability
- [ ] Load testing completed (p95 latency within budget).
- [ ] Autoscaling policies configured and tested.
- [ ] Database backups configured and restoration tested.

## Security
- [ ] Pen-test / DAST scan completed with 0 high vulnerabilities.
- [ ] WAF (Web Application Firewall) blocking rules enabled.
- [ ] Rate limiting applied to all public endpoints.

## Observability
- [ ] PagerDuty alerts configured for SEV-1 scenarios.
- [ ] Dashboards created for SLIs (Error rate, Latency, Traffic).
- [ ] Runbook written and linked in the repository.
"""
    }
}

for section, files in new_content.items():
    section_dir = os.path.join(base_dir, section)
    if section_dir != base_dir:
        os.makedirs(section_dir, exist_ok=True)
    for filename, text in files.items():
        with open(os.path.join(section_dir, filename), 'w', encoding='utf-8') as f:
            f.write(text)

print("Generated massive expansion of playbook documentation!")
