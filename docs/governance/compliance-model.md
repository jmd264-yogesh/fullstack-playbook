# Compliance & Audit Model

As an enterprise, we are subject to external audits (e.g., SOC2, ISO 27001, GDPR). Our engineering practices must inherently satisfy these compliance requirements without causing manual overhead during audit season.

## Automated Compliance Evidence

Auditors require proof that our governance processes are followed. We automate this evidence collection:

1. **Change Management (SOC2 CC8.1)**:
   - *Requirement*: All code changes to production must be reviewed and tested.
   - *Evidence*: Branch protection rules in GitHub ensure no code is merged without a PR approval. The CI pipeline logs prove automated tests passed.
2. **Access Control (SOC2 CC6.1)**:
   - *Requirement*: Only authorized personnel can deploy code or access production databases.
   - *Evidence*: Deployment triggers are restricted via Identity Provider (Okta/Azure AD) groups. Production DB access is vaulted and logged via Bastion hosts.
3. **Vulnerability Management (SOC2 CC7.1)**:
   - *Requirement*: System vulnerabilities must be identified and patched.
   - *Evidence*: Snyk/SonarQube CI logs prove that code containing critical CVEs is blocked from deployment.

## The Monthly Compliance Scorecard
The CoE dashboard aggregates repository data and issues a monthly compliance score (0-100%) to every engineering squad based on:
- Test coverage metrics.
- Open security vulnerabilities (and SLA breaches).
- Presence of stale/unmerged PRs.
- Infrastructure drift (Terraform state vs actual cloud state).

**Enforcement**: Teams falling below a 90% compliance score must dedicate the next sprint exclusively to technical debt and compliance remediation. Feature work is halted.
