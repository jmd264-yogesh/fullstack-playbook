# Security Playbook

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
