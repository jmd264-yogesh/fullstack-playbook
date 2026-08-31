# Project Start Checklist

> Complete this checklist before writing any feature code. Each item links to the relevant standard. A project is not ready to develop on until all items in the **Foundation** and **Code Quality** sections are checked off.

## 1. Foundation

### Repository & Runtime

- Repository created with a `main` branch and branch protection rules
- `.nvmrc` or `.tool-versions` file committed with the agreed Node version
- Package manager agreed (npm / pnpm / yarn) and locked - no mixing
- `package.json` has `engines` field set to the required Node version

### TypeScript

- `tsconfig.json` has `"strict": true` - no exceptions ([TypeScript Standards](/coding-standards/typescript/overview))
- Path aliases configured: `@/` → `src/`, `@@/` → project root
- Module resolution set to `bundler`
- Incremental compilation enabled

### Folder Structure

- Feature-based structure in place (`context.<feature>/` pattern) ([Folder Structure](/coding-standards/frontend/folder-structure))
- `src/common/` created for shared components, hooks, utilities
- `src/app/` contains only Next.js route files (`page.tsx`, `layout.tsx`)
- `e2e/` folder created at project root with subdirectories: `features/`, `steps/`, `common/`, `support/`

## 2. Code Quality Tooling

### ESLint ([Standards](/coding-standards/code-quality/eslint))

- ESLint installed with TypeScript, React Hooks, Accessibility, and import-sort plugins
- `eslint-config-prettier` added as **last** entry in config
- All violations configured as errors (not warnings)
- Editor extension installed and Format-on-Save enabled
- `eslint --max-warnings 0` passes on the empty project

### Prettier ([Standards](/coding-standards/code-quality/prettier))

- Prettier installed with `prettier-plugin-tailwindcss`
- `.prettierrc` configured: no semicolons, single quotes, 100 char width, 4-space indent, trailing commas
- Editor Prettier extension installed with Format-on-Save enabled

### Git Hooks ([Standards](/coding-standards/code-quality/git-hooks))

- Husky installed and initialised (`npx husky init`)
- `lint-staged` configured: format + lint for JS/TS, format-only for others
- `commitlint` installed with `@commitlint/config-conventional`
- `.husky/pre-commit` runs `lint-staged`
- `.husky/commit-msg` runs `commitlint`
- Test a commit - verify hook runs and blocks a bad commit message

## 3. Project Setup

### Environment Variables

- `.env.example` created with all required keys and placeholder values
- `.env` added to `.gitignore`
- CI secret store configured (GitHub Actions Secrets / Azure Key Vault)

### Authentication & Authorisation

- Auth strategy decided (JWT / Sessions / OAuth2)
- Auth implemented as middleware/guards - not inline in route handlers
- Authentication and authorisation layers separated
- Passwords hashed with `bcrypt` or `argon2` (never plain text)
- Token expiry configured; refresh token rotation implemented for long-lived sessions

### Input Validation

- Zod (Node.js) or Pydantic (Python) installed for server-side validation
- All external inputs validated server-side (request bodies, query params, path params)

### API Client

- Single shared HTTP client created with `baseURL` configured
- Auth token attachment interceptor added (injects `Authorization` header)
- 401 interceptor added (redirects to login on token expiry)
- TanStack Query installed and `QueryClientProvider` wrapped at the app root

### Database

- ORM/query builder installed and configured (Prisma / Drizzle / etc.)
- Connection pooling configured - no per-request connections
- Migration tool set up; initial migration committed
- No manual DB edits - all schema changes go through migration scripts

## 4. Testing Setup

### Unit Testing ([Standards](/security/testing/unit-testing))

- Jest, ts-jest, React Testing Library, and jest-dom installed
- `jest.config.ts` created with: jsdom environment, path alias mapping, Playwright `.spec` exclusion
- `jest.setup.js` created with: jest-dom import, `window.matchMedia` mock, env var mocks
- 80% coverage threshold set in Jest config
- `yarn test` script runs and passes on empty test suite

### E2E Testing ([Standards](/security/testing/e2e-testing))

- Playwright and `playwright-bdd` installed
- Browser binaries installed (`npx playwright install`)
- `playwright.config.ts` created with: BDD config, base URL, screenshot/trace on failure, 2 retries in CI
- At least one skeleton feature file created in `e2e/features/`
- `yarn e2e` script runs and passes

## 5. CI/CD Pipeline ([Standards](/coding-standards/ci-cd))

- CI pipeline file created (`.github/workflows/ci.yml` or equivalent)
- Pipeline runs on every PR and push to `main`
- Lint step: `eslint --max-warnings 0`
- Type-check step: `tsc --noEmit`
- Unit test step with coverage gate
- Build step
- Dependency audit step (fails on HIGH/CRITICAL)
- Node modules and build cache configured
- Branch protection on `main` requires pipeline to pass before merge

## 6. Documentation

- `README.md` created with: project overview, tech stack, local setup steps, how to run tests, environment links
- `CONTRIBUTING.md` created with: branch naming conventions, PR process, review checklist
- `.env.example` committed (as noted above)
- `docs/adr/` folder created for Architecture Decision Records
- First ADR written documenting the tech stack decision

## Sign-off

Once all items above are checked, the project is ready for feature development. Communicate to the team that the foundation is in place and link to this checklist in the PR description of the setup PR.
