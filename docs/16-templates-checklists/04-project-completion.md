# Project Completion Checklist

> Run through this checklist before marking a project or major feature as complete. Every section must be fully checked before requesting final review or sign-off.

## 1. Code Quality

### TypeScript

- `strict: true` is still enabled in `tsconfig.json` - has not been softened
- Zero `// @ts-ignore` or `// @ts-expect-error` without an explanatory comment
- No `any` types - all values use `unknown` narrowed via Zod or type guards
- All path alias imports use `@/` or `@@/` - no deep relative imports (`../../..`)

### ESLint & Formatting

- `eslint --max-warnings 0` passes with zero errors
- No `console.log` in committed code (only `warn`/`error` permitted)
- No unused imports or unused variables
- Prettier formatting applied to all files

### Code Structure

- No file exceeds 250 lines of code
- Each file exports exactly one primary component, class, or function
- No barrel file (`index.ts` re-exports) introduced
- All feature code is in the correct `context.<feature>/` folder
- All shared code promoted to `src/common/` and not duplicated across contexts
- Private folder prefixes (`_domain/`, `_utils/`) respected - not imported across context boundaries

## 2. Naming Conventions

- React component files are PascalCase (`.tsx`)
- Hook files start with `use` prefix
- TypeScript types use `type` keyword with `T` prefix
- Constants use UPPER_SNAKE_CASE
- Boolean variables are prefixed with `is`, `has`, or `should`
- Domain model files follow dot-separated pattern (`model.types.<name>.ts`)
- E2E feature files are kebab-case (`.feature`)

## 3. Architecture

### State Management

- Server state managed by React Query - not `useEffect` + `useState`
- Navigation/filter state encoded in URL query params where appropriate
- Zustand store used only for client state that cannot live in React Query or URL
- React Context not added unless extreme prop-drilling is unavoidable

### Data Fetching

- All API calls go through the shared HTTP client (no raw `fetch` in components)
- TanStack Query used for all server state - no `useEffect` data fetching
- All API responses validated with Zod schemas before use
- Form validation uses React Hook Form + Zod resolver (no manual form state)

### Styling

- All styles use Tailwind CSS - no inline `style` attributes
- No hardcoded colour values - all colours from the Tailwind theme
- Tailwind classes ordered correctly (Prettier plugin applied)

## 4. Testing

### Unit Tests

- All new business logic (utilities, hooks, service functions) has unit tests
- All new React components have component tests
- Coverage gate passes (`≥ 80%` line coverage)
- Tests use `getByRole` / `getByLabelText` / `getByText` - not `getById` or `querySelector`
- Tests use `userEvent` not `fireEvent`
- No snapshot tests for complex components
- No `console.log` in test files

### E2E Tests

- Critical user journeys are covered by Playwright BDD tests
- Feature files written in business language (not technical terms)
- Scenarios are independent - no test relies on state from a previous test
- Authentication shared via storage state - no repeated login
- E2E tests pass against the staging environment (not mocked backend)

## 5. Security

- All external inputs validated server-side (request bodies, query params)
- No secrets or API keys in source code or committed `.env` files
- Auth is implemented as middleware/guards - not duplicated in route handlers
- Passwords hashed (bcrypt/argon2) - never plain text
- Security headers configured (Helmet.js or equivalent)
- CORS restricted to known origins - no wildcard `*` in production
- Rate limiting on auth endpoints
- Dependency audit passes (`npm audit --audit-level=high`)
- SonarQube quality gate passes (no unresolved security hotspots)

## 6. CI/CD Pipeline

- All PR checks pass (lint, type check, tests, build, security audit)
- No hard-coded secrets in CI configuration files
- Deployment environment variables sourced from CI secret store
- E2E tests run in CI against staging before production deploy
- Pipeline passes end-to-end without manual intervention

## 7. Documentation

- `README.md` is up to date: correct setup steps, environment links, test instructions
- Architecture Decision Records (ADRs) written for all significant technical decisions made during the project
- `CONTRIBUTING.md` reflects any project-specific branch or PR conventions
- API documentation generated (Swagger/OpenAPI) and accessible in non-production environments
- Changelog or release notes updated

## 8. Optional - Before Public Release

> If this is the service's first production launch, most of the infra/reliability side of "public release" is covered by the [Production Readiness Checklist](/templates/production-readiness) instead - the items below are the feature/code-level counterparts specific to this checklist.

- Structured logging implemented on backend (JSON format)
- Global error handler returns consistent error shapes - no stack traces to client in production
- Frontend error tracking set up (Sentry or equivalent)
- Backend observability configured (OpenTelemetry → Datadog / Azure Monitor)
- Health check endpoint implemented (`GET /health`)
- Caching strategy defined and documented (CDN, Redis invalidation rules)
- If multi-language support is needed: i18n set up from the start, all strings externalised

## Sign-off

The project is ready for final review and sign-off when all applicable sections above are checked. Include a link to this completed checklist in the delivery PR or release notes.

For JQAA review, hand over the [JQAA Review Checklist](/coding-standards/checklists/jqaa-review) alongside the completed project.
