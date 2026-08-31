---
title: Security Guardrails
description: What the FS Delivery Playbook already covers regarding secure coding, authentication, CI/CD, and production security.
---

# Security Guardrails

This section consolidates every security control already defined across the FS Delivery Playbook (coding standards, CI/CD, checklists, governance) into one reference, and flags any control that's referenced elsewhere but doesn't have real content behind it yet.

| Core Sections | Security Topics | OWASP Controls | Playbook Edition |
| :---: | :---: | :---: | :---: |
| **1** | **11** | **10** | **2026** |

::: info Status Indicator Badges
- <Badge type="tip" text="Covered" /> = documented and enforced in the playbook
- <Badge type="danger" text="Gap" /> = referenced but no real content exists yet
:::

## 2.1 Secure Coding Practices <Badge type="tip" text="Covered" />

**Source:** [`docs/coding-standards/devsecops-standards.md`](/coding-standards/devsecops-standards)

- **Input validation & output encoding:** all input validated against strict schemas (Joi / Zod / Class-Validator); context-aware output encoding to prevent XSS; never bypass framework escaping (e.g. avoid `dangerouslySetInnerHTML`).
- **Injection prevention:** parameterized queries / ORMs only (Prisma, Eloquent) - raw SQL string concatenation is explicitly banned.
- **Broken authentication prevention:** Argon2/bcrypt password hashing, rate-limiting, mandatory MFA on admin panels.
- **XSS defense:** sanitize input, rely on React `{}` / Blade `{{}}` auto-escaping, strict Content-Security-Policy.

## 2.2 Authentication, Authorization & RBAC <Badge type="tip" text="Covered" />

- Auth delegated to enterprise Identity Providers (Azure AD, Okta, Auth0) via OAuth2/OIDC - **no custom password-hashing implementations.**
- RBAC/ABAC enforced server-side, verified at controller/route level *before* business logic executes - never trust client-side role hiding.
- JWTs: short-lived, no PII in payload (JWT is base64-encoded, not encrypted).
- **Layered authorization model:** API Gateway (rate-limit / IP allowlist) $\rightarrow$ Authentication Guard $\rightarrow$ Authorization Guard/Policy $\rightarrow$ Controller.
- Reference implementations documented: NestJS `RolesGuard` + `@Roles()` decorator; Laravel Gates & Policies; Kong API Gateway ACLs.
- **Common RBAC anti-patterns called out explicitly:**

| Anti-pattern | Risk | Correct Approach / Context |
| :--- | :--- | :--- |
| UI-only hiding of controls/buttons | API still reachable directly - bypasses "hidden" restriction | Enforce roles in backend guards on every endpoint |
| Inline checks, e.g. `if ($user->role == 'admin')` | Scattered, unauditable, easy to miss on new endpoints | Use Policies/Gates (Laravel) or Guards/Decorators (NestJS) |
| Role-based data-shape leaking | Same endpoint silently returns different fields per role - hard to test | Use role-aware API Resources / DTOs to control output |
| Storing roles only in JWT | Stale-role risk - a demoted user keeps old privileges until token expiry | Verify roles from the database on each request for sensitive operations |

## 2.3 Secrets Management <Badge type="tip" text="Covered" />

- No credentials, API keys, or JWT secrets ever committed to source control.
- **If a secret is committed, it must be revoked and rotated immediately** - rewriting Git history alone is explicitly called out as insufficient.
- Enterprise vaults required for runtime secret injection: HashiCorp Vault, AWS Secrets Manager, Azure Key Vault.
- CI secrets from GitHub Actions Secrets / Azure Key Vault only - never real values in `.env` files committed to the repo.

## 2.4 CI/CD Security Gates (Shift-Left) <Badge type="tip" text="Covered" />

**Sources:** [`docs/coding-standards/devsecops-standards.md`](/coding-standards/devsecops-standards), [`ci-cd.md`](/coding-standards/ci-cd)

| Gate | Tooling | Enforcement |
| :--- | :--- | :--- |
| **SAST** | SonarQube / Checkmarx | Every PR; blocks on Critical/High vulns (SQLi, hardcoded secrets); Security Hotspots need manual Security-Champion review |
| **SCA** (dependency scanning) | Snyk / Dependabot / `npm audit` | Daily + every build; build fails on High/Critical CVEs in third-party packages |
| **Secret scanning** | TruffleHog / GitLeaks | Pre-commit hooks + CI; blocks pushes with high-entropy strings / known token patterns |

> [!NOTE]
> Dependency audits must not be suppressed with `--no-audit`. Example GitHub Actions pipeline includes an explicit `npm audit --audit-level=high` step and Sonar token usage.

## 2.5 Infrastructure & Container Security <Badge type="tip" text="Covered" />

- Immutable infrastructure via Terraform; manual cloud-console changes ("ClickOps") prohibited.
- Docker hardening: containers run as non-root (`USER node` / `USER app`), minimal Alpine/Distroless base images.
- Image scanning (Trivy / AWS ECR Scanner) - 0 Critical OS vulnerabilities required before deploy.
- Secrets never baked into images (no `ENV API_KEY=...`) - injected at runtime only.

## 2.6 Production Security & Rate Limiting <Badge type="tip" text="Covered" />

- WAF (Cloudflare / AWS WAF) with OWASP Top 10 managed rulesets; DDoS protection via AWS Shield; load balancers/EC2 never directly exposed.
- API Gateway throttling (e.g. 500 req/sec/IP); stricter auth-endpoint throttling (max 5 failed attempts/min with backoff/CAPTCHA) to mitigate credential stuffing and brute force.
- Patch SLAs: Critical CVEs patched within **48 hours**, High CVEs within **14 days**; `security.txt` published for researcher disclosure.
- Production access via Just-In-Time credentials through an Identity Broker (e.g. Teleport) - no standing SSH/DB access.
- Immutable audit logging on every mutation of critical entities (who / what / when).

## 2.7 Database Security <Badge type="tip" text="Covered" />

- **MySQL:** parameterized queries only (explicit bad example of string-concatenated queries flagged as SQL-injection risk); Principle of Least Privilege - app DB user gets only SELECT/INSERT/UPDATE/DELETE, never DROP/CREATE/GRANT; a separate migration user holds DDL rights.
- **Postgres:** Least-privilege database roles, Row-Level Security for multi-tenant tables, and parameterized/raw-tagged-template queries only - see [PostgreSQL: Security & Maintenance](/coding-standards/database/postgres#security-maintenance).

## 2.8 Framework-Specific Controls <Badge type="tip" text="Covered" />

| Stack | Controls Documented |
| :--- | :--- |
| **NestJS** | JWT + Passport auth flow, `bcrypt.compare` login, `helmet()` security headers, explicit CORS allowlist, `ThrottlerModule` (100 req/min default, 5 req/min on `/login`), ownership checks in service methods (flags IDOR-style "read any order by guessing the ID" as vulnerable) |
| **Laravel** | Sanctum token auth, Policies for authorization (`$this->authorize()`), `RateLimiter::for('login', ...)` limited by email+IP with 429 response |
| **GraphQL** | `GqlAuthGuard` wrapping `AuthGuard('jwt')`; production error-formatting plugin strips stack traces; query-complexity limits to prevent nested-query DoS; introspection/playground disabled in production |
| **Next.js** | Edge middleware auth-cookie checks/redirects; env vars split by exposure (`NEXT_PUBLIC_` prefix rule); Stripe webhook signature verification example |
| **Docker** | Non-root user, no secrets in image layers, vulnerability scan in pipeline |

## 2.9 Checklists Coverage Map <Badge type="tip" text="Covered" />

| Checklist | Security Items |
| :--- | :--- |
| **Project Start** | Auth strategy decided; auth as middleware/guards (not inline); passwords hashed bcrypt/argon2; token expiry + refresh rotation; CI secret store configured |
| **Project Completion (Section 5 & 6)** | Server-side input validation; no secrets in source/`.env`; auth as guards not duplicated; hashed passwords; Helmet headers; CORS restricted (no wildcard in prod); rate limiting on auth; `npm audit` passes; Sonar gate passes; no hardcoded CI secrets |
| **JQAA Review (Section 9 & 10)** | 10 scored security items (mostly **Critical** severity) - input validation, no secrets, no committed `.env`, hashed passwords, guard-based auth, CORS, Helmet (**Major**), rate limiting (**Major**), dependency audit, Sonar gate; plus CI/CD security scan item |
| **Release Checklist** | Secrets via Vault/Secrets Manager; WAF rules and rate limits confirmed on API Gateway before release |

## 2.10 Governance & Compliance <Badge type="tip" text="Covered" />

**Source:** [`docs/governance/*`](/governance/overview)

- Subject to external audits: SOC2, ISO 27001, GDPR.
- **SOC2 CC6.1 (Access Control):** only authorized personnel can deploy or access production DBs; deployment triggers restricted via Okta/Azure AD groups; prod DB access vaulted and logged via bastion hosts.
- **SOC2 CC7.1 (Vulnerability Management):** Snyk/SonarQube CI logs serve as audit evidence that code with critical CVEs is blocked from deployment.
- Monthly Compliance Scorecard factors in open security vulnerabilities and SLA breaches - teams scoring below 90% must halt feature work for remediation.
- Architecture Review Board (ARB) includes InfoSec reviewers; sign-off explicitly covers security implications of new systems.
- Dedicated **DevSecOps Engineer** role defined: owns CI/CD pipelines, IaC provisioning, and security scanning configuration.

## 2.11 Remaining Gaps <Badge type="tip" text="Covered" />

Logging field/format standards, disaster-recovery/backup policy, and accessibility standards - previously flagged as missing here - are now documented at [Logging Standards](/operations/logging-standards), [Disaster Recovery & Backups](/operations/disaster-recovery), and [Accessibility Standards](/coding-standards/accessibility/overview) respectively. No further known content gaps at this time.
