# Development & Coding Standards

This section defines the common standards and best practices to be followed across all full-stack projects - whether starting fresh or onboarding to an existing project. The goal is consistent, maintainable, secure, and high-quality code regardless of which team or project you are on.

## Who This Is For

| Audience | Where to Start |
|---|---|
| **Creating a brand new repository** | [Project Creation & Golden Paths](/project-onboarding/create-project) → [Project Setup Guide](/coding-standards/project-setup) → [Project Start Checklist](/coding-standards/checklists/project-start) |
| **Developers joining an existing project** | [Project Setup Guide](/coding-standards/project-setup) → read the relevant stack pages (Frontend / Backend / Database) |
| **Developers completing a feature** | [Project Completion Checklist](/coding-standards/checklists/project-completion) |
| **JQAA reviewers** | [JQAA Review Checklist](/coding-standards/checklists/jqaa-review) |

## Project-dependent technology overview

> [!Note] 
> The technology stack is **project-dependent**. Unlike the rest of this document, there is no single fixed stack mandated for every team - the right choice depends on the project's requirements, scale, and constraints.

Each project should document its selected frontend, backend, data, testing, delivery, and security tooling in its README and Architecture Decision Records (ADRs). Start with the [tech-stack selection guide](/project-onboarding/tech-stack-selection), then document the decision, constraints, owner, and review date before implementation.

<Callout type="important">
There is no default stack for every project. Reuse approved patterns where they fit, but select technology against product requirements, team capability, security, budget, and operational constraints.
</Callout>

Capture the selected stack in an ADR that links to its framework, data, test, security, and delivery guidance. The handbook’s framework pages provide the implementation standards once that decision has been made.

> [!Important] 
Tech stack selection is a formal design activity, not an ad-hoc decision. Every stack choice must be documented as an ADR (Architecture Decision Record) before setup begins. See the [Solution Design Phase](/delivery-lifecycle/design-phase) in the Delivery Lifecycle for the full selection guide, architecture comparisons (Enterprise Web, Rapid SaaS, Content-Rich), and justification templates.

## Standards at a Glance

### File & Component Rules

- **Max 250 lines per file.** Anything larger must be split into composed modules.
- **Single Responsibility.** Each file exports exactly one primary component, class, or function.
- **Colocation.** Group files by feature domain, not by technical role.

### Naming Conventions

| Item | Convention | Example |
|---|---|---|
| React Components (files) | PascalCase | `CustomerForm.tsx` |
| Hooks | camelCase with `use` prefix | `useAlertGroups.ts` |
| Utilities & Functions | camelCase | `formatCurrency.ts` |
| TypeScript Types | `type` with `T` prefix | `TCustomerFormData` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Domain Models | Dot-separated | `model.types.customer.ts` |
| Non-component Folders | kebab-case | `hooks/`, `_domain/` |
| Context Folders | Dot-separated kebab | `context.quote-builder` |

### Code Quality Enforcement

Every commit is automatically gated by:

1. **Prettier** - formats staged files before the commit is recorded
2. **ESLint** - lints and auto-fixes where possible; blocks commit on remaining errors
3. **commitlint** - validates commit message against Conventional Commits format
4. **CI Pipeline** - type-check, unit tests, build, and security scan on every PR

### Quality Gates - Every PR Must Pass

- ESLint (`--max-warnings 0`)
- TypeScript type check (`tsc --noEmit`)
- Unit tests (all green, 80%+ coverage)
- Build verification
- Dependency vulnerability scan (no HIGH/CRITICAL)
- SonarQube static analysis
- Peer review approval

> [!Note] 
For the exact SonarQube thresholds (branch coverage, duplication, cognitive complexity) and PR review rules, see [Quality Gates: Code Quality](/quality-gates/code-quality) - that page is the canonical source for these numbers, so it's the one to update if a threshold ever changes.

## Standards Index

### Project & Architecture
- [Project Setup Guide](/coding-standards/project-setup) - Frontend, backend, database, auth, env, TypeScript, API client
- [Solution Design](/delivery-lifecycle/design-phase) - Tech stack selection, architecture decisions (Delivery Lifecycle)

### Code Quality
- [ESLint](/coding-standards/code-quality/eslint) - Rules, enforcement, and rationale
- [Prettier](/coding-standards/code-quality/prettier) - Formatting standards
- [Git Hooks & Commits](/coding-standards/code-quality/git-hooks) - Husky, lint-staged, commitlint

### TypeScript
- [TypeScript Strict Rules](/coding-standards/typescript/overview) - Strict mode, path aliases, compiler config

### Frontend
- [Folder Structure](/coding-standards/frontend/folder-structure) - React, Next.js, Vite, and Angular layouts
- [Naming Conventions](/coding-standards/frontend/naming-conventions) - Files, folders, TypeScript
- [Code Organization](/coding-standards/frontend/code-organization) - Component design, state management
- [Reusability Guidelines](/coding-standards/frontend/reusability) - Shared primitives, hooks, forms
- [React](/coding-standards/frontend/react) - Composition, hooks, error boundaries
- [State Management](/coding-standards/frontend/react) - Local state, Context, Zustand, Redux, Jotai, and React Query
- [Next.js](/coding-standards/frontend/nextjs) - Server components, caching, routing
- [shadcn/ui](/coding-standards/frontend/shadcn) - Component library usage

### Backend
- [Folder Structure](/coding-standards/backend/folder-structure) - NestJS and Laravel project layout
- [Next.js Backend](/coding-standards/frontend/nextjs) - Route handlers, validation, auth, database, caching, and deployment
- [Naming Conventions](/coding-standards/backend/naming-conventions) - Files, classes, methods, database
- [NestJS](/coding-standards/backend/nestjs) - CQRS, DI, guards, interceptors
- [GraphQL](/coding-standards/backend/graphql) - DataLoader, pagination, complexity
- [PHP Laravel](/coding-standards/backend/laravel) - Form requests, actions, resources

### Databases
- [Database Overview](/coding-standards/database/overview) - Choosing the right database, ORM selection, migrations
- [PostgreSQL](/coding-standards/database/postgres) - Indexing, pooling, migrations, Prisma ORM
- [MySQL](/coding-standards/database/mysql) - Setup, Prisma ORM, Eloquent queries
- [MongoDB](/coding-standards/database/mongodb) - Schema design, indexing, aggregation, Mongoose

### Testing
- [Testing Strategy](/security/testing/overview) - Coverage targets, test pyramid
- [Unit Testing](/security/testing/unit-testing) - Jest, RTL, setup, patterns
- [Integration Testing](/security/testing/integration-testing) - API tests, DB integration, Supertest, Pest
- [E2E Testing](/security/testing/e2e-testing) - Playwright, BDD, Gherkin

### Performance
- [Performance Standards](/coding-standards/performance/overview) - Code optimization, page loading, latency, scalability

### Deployment
- [Deployment Journey](/operations/deployment-journey) - the full journey from merged PR to production
- [Docker](/coding-standards/infrastructure/docker) - Dockerfile standards, multi-stage builds, container security
- [CI/CD Pipeline](/coding-standards/ci-cd) - PR checks, security scans, deployment stages
- [Security Scanning](/operations/security-scanning) - SAST, DAST, SCA, secret scanning
- [DevSecOps Standards](/coding-standards/devsecops-standards) - Shift-left security policy
### Documentation
- [Project Documents](/coding-standards/documentation/project-documents) - README, ADRs, CONTRIBUTING, .env.example
- [Technical Document](/coding-standards/documentation/technical-document) - Architecture docs, API contracts
- [Handover Document](/coding-standards/documentation/handover-document) - Project handover standards
- [AI-Assisted Development](/coding-standards/ai-assisted-development) - Approved tools, safe usage, governance
### Checklists
- [Project Start Checklist](/coding-standards/checklists/project-start) - For developers beginning a new project
- [Project Completion Checklist](/coding-standards/checklists/project-completion) - For developers before sign-off
- [JQAA Review Checklist](/coding-standards/checklists/jqaa-review) - For quality assurance review
