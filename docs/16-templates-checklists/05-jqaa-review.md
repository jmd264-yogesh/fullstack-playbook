# JQAA Review Checklist

> This checklist is for the JQAA (Junior Quality Assurance & Audit) team to systematically review a project against the Full Stack coding standards. Each item links to the relevant standard for context.

**Instructions:** For each item, mark as ✅ Pass, ❌ Fail (with a note), or ⚠️ Partial. A project requires all critical items (marked 🔴) to pass before sign-off.

## Section 1 - Project Foundation

### TypeScript Configuration ([Standard](/coding-standards/typescript/overview))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 1.1 | `strict: true` is enabled in `tsconfig.json` | 🔴 Critical | | |
| 1.2 | No `"strict"` flags are individually disabled | 🔴 Critical | | |
| 1.3 | Path aliases `@/` and `@@/` are configured and used | 🟡 Major | | |
| 1.4 | Module resolution is set to `bundler` | 🟡 Major | | |
| 1.5 | No `// @ts-ignore` without an explanatory comment | 🔴 Critical | | |
| 1.6 | No `any` types in the codebase | 🔴 Critical | | |

### Folder Structure ([Standard](/coding-standards/frontend/folder-structure))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 1.7 | Code is organised in feature contexts (`context.<name>/`) | 🟡 Major | | |
| 1.8 | `src/app/` contains only Next.js route files | 🟡 Major | | |
| 1.9 | Shared code is in `src/common/` and not duplicated across contexts | 🟡 Major | | |
| 1.10 | Private folders use underscore prefix (`_domain/`, `_utils/`) | 🟢 Minor | | |
| 1.11 | No barrel files (`index.ts` re-exports) | 🟡 Major | | |
| 1.12 | No file exceeds 250 lines of code | 🟡 Major | | |

## Section 2 - Code Quality

### ESLint ([Standard](/coding-standards/code-quality/eslint))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 2.1 | `eslint --max-warnings 0` passes | 🔴 Critical | | |
| 2.2 | No `console.log` in committed code | 🟡 Major | | |
| 2.3 | No unused imports | 🟡 Major | | |
| 2.4 | No unused variables (unless prefixed with `_`) | 🟡 Major | | |
| 2.5 | Prettier compatibility layer is the last ESLint config entry | 🟡 Major | | |

### Prettier ([Standard](/coding-standards/code-quality/prettier))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 2.6 | All files are Prettier-formatted (no CI formatting failures) | 🔴 Critical | | |
| 2.7 | Tailwind classes are correctly ordered (Prettier plugin applied) | 🟢 Minor | | |

### Git Hooks ([Standard](/coding-standards/code-quality/git-hooks))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 2.8 | Husky is installed and hooks are configured | 🟡 Major | | |
| 2.9 | `lint-staged` is configured for pre-commit checks | 🟡 Major | | |
| 2.10 | `commitlint` is configured with Conventional Commits | 🟡 Major | | |
| 2.11 | All commit messages in the branch follow Conventional Commits format | 🟡 Major | | |
| 2.12 | No WIP commits or vague messages (`fix: bug`, `chore: changes`) | 🟢 Minor | | |

## Section 3 - Naming Conventions ([Standard](/coding-standards/frontend/naming-conventions))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 3.1 | React component files are PascalCase (`.tsx`) | 🟡 Major | | |
| 3.2 | Hook files start with `use` prefix | 🟡 Major | | |
| 3.3 | TypeScript types use `type` keyword with `T` prefix | 🟢 Minor | | |
| 3.4 | Constants use UPPER_SNAKE_CASE | 🟢 Minor | | |
| 3.5 | Boolean variables prefixed with `is`, `has`, or `should` | 🟢 Minor | | |
| 3.6 | Domain model files follow dot-separated pattern | 🟢 Minor | | |
| 3.7 | Context folders use `context.<name>` pattern | 🟡 Major | | |

## Section 4 - Architecture & Component Design ([Standard](/coding-standards/frontend/code-organization))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 4.1 | Each component has a single responsibility | 🟡 Major | | |
| 4.2 | No God Components (components doing too much) | 🟡 Major | | |
| 4.3 | Named exports used (not default exports) | 🟢 Minor | | |
| 4.4 | Server state managed by React Query (no `useEffect` + `useState` for fetching) | 🔴 Critical | | |
| 4.5 | No raw `fetch` or Axios calls in components - all through shared API client | 🔴 Critical | | |
| 4.6 | All API responses validated with Zod before use | 🔴 Critical | | |
| 4.7 | Forms use React Hook Form + Zod resolver (no manual form state) | 🟡 Major | | |
| 4.8 | No inline `style` attributes - all Tailwind CSS | 🟡 Major | | |
| 4.9 | No hardcoded colour values outside Tailwind theme | 🟡 Major | | |
| 4.10 | State management follows the correct hierarchy (React Query → URL → Local → Zustand) | 🟡 Major | | |
| 4.11 | No premature abstraction - patterns extracted only when appearing in 3+ places | 🟢 Minor | | |

## Section 5 - Frontend Framework Standards

### Next.js ([Standard](/coding-standards/frontend/nextjs))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 5.1 | React Server Components used by default - `use client` pushed to leaf nodes | 🟡 Major | | |
| 5.2 | Server Actions used for mutations (not client-side API calls from server components) | 🟡 Major | | |
| 5.3 | `next/image` used for all images (no raw `<img>` tags) | 🟡 Major | | |
| 5.4 | `next/link` used for all internal navigation (no `<a>` tags) | 🟡 Major | | |
| 5.5 | Data caching and revalidation configured appropriately | 🟢 Minor | | |
| 5.6 | Suspense boundaries used for progressive loading | 🟢 Minor | | |

### React ([Standard](/coding-standards/frontend/react))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 5.7 | Composition used over prop drilling | 🟡 Major | | |
| 5.8 | Custom hooks used to encapsulate side effects | 🟡 Major | | |
| 5.9 | Error boundaries implemented for graceful degradation | 🟡 Major | | |
| 5.10 | No `useEffect` waterfalls for data fetching | 🔴 Critical | | |
| 5.11 | No premature memoisation (`useMemo`/`useCallback` without profiling evidence) | 🟢 Minor | | |

## Section 6 - Backend Standards

### NestJS ([Standard](/coding-standards/backend/nestjs)) - if applicable

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 6.1 | DTOs used for all request validation | 🔴 Critical | | |
| 6.2 | Dependency injection used - no manual `new` instantiation | 🟡 Major | | |
| 6.3 | Global exception filter configured | 🟡 Major | | |
| 6.4 | No logic in controllers (thin controllers, business logic in services) | 🟡 Major | | |
| 6.5 | No circular dependencies | 🟡 Major | | |
| 6.6 | Rate limiting (throttling) configured | 🟡 Major | | |

### GraphQL ([Standard](/coding-standards/backend/graphql)) - if applicable

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 6.7 | DataLoader used for all N+1-risk queries | 🔴 Critical | | |
| 6.8 | Query complexity and depth limits configured | 🟡 Major | | |
| 6.9 | Internal errors not leaked to clients | 🔴 Critical | | |

## Section 7 - Database Standards

### PostgreSQL ([Standard](/coding-standards/database/postgres)) - if applicable

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 7.1 | Connection pooling configured (PgBouncer or RDS Proxy) | 🔴 Critical | | |
| 7.2 | All schema changes via migration scripts (no manual edits) | 🔴 Critical | | |
| 7.3 | Appropriate indexes on frequently queried columns | 🟡 Major | | |
| 7.4 | No unbounded queries without pagination | 🟡 Major | | |
| 7.5 | No EAV (Entity-Attribute-Value) anti-pattern | 🟡 Major | | |
| 7.6 | No long-running transactions | 🟡 Major | | |

### MongoDB ([Standard](/coding-standards/database/mongodb)) - if applicable

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 7.7 | ESR indexing rule followed (Equality, Sort, Range) | 🟡 Major | | |
| 7.8 | No unbounded arrays in documents | 🟡 Major | | |
| 7.9 | Schema validation in place via Mongoose | 🟡 Major | | |
| 7.10 | No excessive `$lookup` operations (use pre-aggregation instead) | 🟡 Major | | |

## Section 8 - Testing ([Standard](/security/testing/overview))

### Unit Tests

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 8.1 | Unit test coverage ≥ 80% (line coverage) | 🔴 Critical | | |
| 8.2 | All new utilities and hooks have unit tests | 🔴 Critical | | |
| 8.3 | All new React components have component tests | 🟡 Major | | |
| 8.4 | Tests use role/label/text queries - not `getById` or `querySelector` | 🟡 Major | | |
| 8.5 | `userEvent` used (not `fireEvent`) | 🟢 Minor | | |
| 8.6 | No snapshot tests for complex components | 🟡 Major | | |
| 8.7 | Mocks at the boundary (API/external services), not internal modules | 🟡 Major | | |

### E2E Tests

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 8.8 | Critical user journeys covered by Playwright BDD tests | 🔴 Critical | | |
| 8.9 | Feature files written in business language (Gherkin) | 🟡 Major | | |
| 8.10 | Scenarios are independent (no shared state between tests) | 🟡 Major | | |
| 8.11 | Authentication handled via shared storage state | 🟡 Major | | |
| 8.12 | E2E tests run against staging (not mocked backend) | 🔴 Critical | | |
| 8.13 | No explicit `sleep()` or `waitForTimeout()` calls | 🟡 Major | | |

## Section 9 - Security ([Standard](/coding-standards/devsecops-standards))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 9.1 | All external inputs validated server-side | 🔴 Critical | | |
| 9.2 | No secrets or API keys in source code | 🔴 Critical | | |
| 9.3 | No `.env` files with real values committed | 🔴 Critical | | |
| 9.4 | Passwords hashed with bcrypt or argon2 | 🔴 Critical | | |
| 9.5 | Auth implemented as middleware/guards (not inline) | 🔴 Critical | | |
| 9.6 | CORS restricted to known origins (no wildcard `*`) | 🔴 Critical | | |
| 9.7 | Security headers configured (Helmet.js or equivalent) | 🟡 Major | | |
| 9.8 | Rate limiting on auth endpoints | 🟡 Major | | |
| 9.9 | `npm audit --audit-level=high` passes | 🔴 Critical | | |
| 9.10 | SonarQube quality gate passes | 🔴 Critical | | |

## Section 10 - CI/CD Pipeline ([Standard](/coding-standards/ci-cd))

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 10.1 | CI runs on every PR (lint, type check, tests, build) | 🔴 Critical | | |
| 10.2 | Branch protection on `main` - pipeline must pass before merge | 🔴 Critical | | |
| 10.3 | Security dependency scan in pipeline | 🔴 Critical | | |
| 10.4 | SonarQube runs in pipeline | 🟡 Major | | |
| 10.5 | E2E tests block production deployment on failure | 🔴 Critical | | |
| 10.6 | No real secrets in CI configuration files | 🔴 Critical | | |
| 10.7 | Node modules and build cache configured | 🟢 Minor | | |

## Section 11 - Documentation

| # | Review Item | Severity | Result | Notes |
|---|---|---|---|---|
| 11.1 | `README.md` includes: overview, tech stack, setup steps, test instructions, environment links | 🟡 Major | | |
| 11.2 | `CONTRIBUTING.md` includes: branch naming, PR process, review checklist | 🟡 Major | | |
| 11.3 | `.env.example` committed with all required keys | 🟡 Major | | |
| 11.4 | ADRs written for significant architectural decisions | 🟢 Minor | | |
| 11.5 | API documentation available in non-production environments | 🟢 Minor | | |

## Review Summary

| Section | Critical Items | Pass | Fail | Partial |
|---|---|---|---|---|
| 1. Foundation | 3 | | | |
| 2. Code Quality | 2 | | | |
| 3. Naming | 0 | | | |
| 4. Architecture | 3 | | | |
| 5. Framework | 1 | | | |
| 6. Backend | 2 | | | |
| 7. Database | 2 | | | |
| 8. Testing | 4 | | | |
| 9. Security | 7 | | | |
| 10. CI/CD | 5 | | | |
| 11. Documentation | 0 | | | |

### Overall Verdict

- **Pass** - All critical items pass. Minor/major items addressed or risk-accepted with justification.
- **Conditional Pass** - Critical items pass. Non-critical items have a remediation plan agreed.
- **Fail** - One or more critical items fail. Project must remediate before sign-off.

### Reviewer

| | |
|---|---|
| Reviewed by | |
| Review date | |
| Project / Feature | |
| Repository | |
| Branch / PR | |
| Notes | |
