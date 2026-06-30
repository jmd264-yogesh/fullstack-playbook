# FS Project Kickoff Checklist

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
