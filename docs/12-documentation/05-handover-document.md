# Handover Document

> A Handover Document is produced at the end of a project engagement or when ownership transfers from one team to another. Its purpose is to eliminate all institutional knowledge gaps - a new team member must be able to operate, debug, and extend the system using only this document and the codebase.

## When It Is Required

- Project go-live / closure
- Team or vendor transition
- A key engineer leaving the project
- Transferring a system to a client or operations team

## Required Sections

### 1. Project Summary

- What the system does and who its users are
- Current status: live, in maintenance, being decommissioned
- Links: repository, production URL, staging URL, project management board

### 2. Architecture Summary

- High-level diagram of the system (frontend, backend, database, third-party integrations)
- Brief description of each component and its role
- Link to the most recent ADRs for rationale behind key decisions

### 3. Environments

| Environment | URL | Purpose |
|---|---|---|
| Production | `https://app.example.com` | Live user traffic |
| Staging | `https://staging.example.com` | Pre-release validation |
| Development | `http://localhost:3000` | Local development |

For each environment, document: where it is hosted, how it is accessed, and who has access.

### 4. Access & Credentials

Do not include credentials in this document. Instead, document:

- Where credentials are stored (e.g., "All secrets are in Azure Key Vault under `project-name-prod`")
- Who has admin access and how to request it
- Which accounts and services require access (cloud provider, CI/CD, monitoring, third-party APIs)
- How to rotate credentials

### 5. Deployment Process

Step-by-step instructions to deploy the application, including:

- How deployments are triggered (manual, automated on merge, scheduled)
- The deployment pipeline: what each stage does and how long it takes
- How to roll back a failed deployment
- Any manual steps required before or after a deployment (migrations, cache clear, feature flag toggle)

### 6. Day-to-Day Operations

**Scheduled jobs & cron tasks:**

| Job | Schedule | What it does | What to do if it fails |
|---|---|---|---|
| Invoice generation | Daily 02:00 UTC | Creates invoices for billable usage | Re-run manually via `npm run jobs:invoices` |

**Monitoring & alerting:**

- Link to dashboards (error rate, latency, infrastructure health)
- Which alerts are configured and what they mean
- On-call escalation path and contact list

**Common operational tasks:**

- How to run a database migration in production
- How to enable or disable a feature flag
- How to clear a cache or queue backlog

### 7. Known Issues & Technical Debt

Be honest. Document what is broken, fragile, or known to be suboptimal.

| Issue | Severity | Impact | Workaround |
|---|---|---|---|
| PDF generation times out for reports >50 pages | Medium | Affects ~5% of exports | User retries; usually succeeds on second attempt |

Document any areas of the codebase that are known to be risky to change, and why.

### 8. Third-Party Integrations

| Service | Purpose | Account owner | Documentation |
|---|---|---|---|
| Stripe | Payment processing | finance@example.com | [Stripe docs link] |
| SendGrid | Transactional email | dev@example.com | [SendGrid docs link] |

For each: what it does, what happens if it goes down, and how to raise a support ticket with the vendor.

### 9. Pending Work

List all in-flight or planned work that is not complete at the time of handover:

| Item | Status | Priority | Notes |
|---|---|---|---|
| Migrate to Postgres 16 | Not started | Medium | Blocked on cloud provider upgrade window |

### 10. Contact List

| Role | Name | Contact |
|---|---|---|
| Technical Lead | Name | email / Slack |
| Product Owner | Name | email / Slack |
| DevOps / Cloud | Name | email / Slack |
| Vendor Support | Name | email / ticket portal |

## Rules

- The Handover Document must be reviewed by both the outgoing and incoming team before sign-off.
- It must be stored in the repository at `docs/handover.md` and linked from the `README.md`.
- It is a living document - update it throughout the project, not only at the end. A document written entirely in the final week is unreliable.
- All links (dashboards, repos, portals) must be verified as working before handover sign-off.
