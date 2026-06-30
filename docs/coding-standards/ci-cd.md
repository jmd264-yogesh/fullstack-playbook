# CI/CD Pipeline Standards

> Every code change is automatically validated, tested, and deployed through consistent stages. Manual tests and deployments should be avoided as much as possible.

---

## Pull Request Checks

All of the following must pass before a PR can be merged:

| Check | Command | Purpose |
|---|---|---|
| Lint | `eslint --max-warnings 0` | Zero ESLint errors or warnings |
| Type check | `tsc --noEmit` | No TypeScript compile errors |
| Unit tests | `jest --ci --coverage` | All tests green + 80% coverage gate |
| Build | `next build` | Application builds without errors |

---

## Security Checks

Security checks run on every PR and on the main branch:

### Dependency Vulnerability Scan

```bash
npm audit --audit-level=high
# or
yarn audit --level high
```

- Fail the build on **HIGH** or **CRITICAL** severity vulnerabilities.
- Do not suppress audit failures with `--no-audit`. Investigate and resolve them.

> Security checks on every PR prevent vulnerabilities from being merged silently. They cost seconds; fixing them post-production costs weeks.

### Static Analysis — SonarQube

- Run SonarQube on every PR and on the main branch.
- Quality Gate must pass before merge.
- Key metrics: code coverage, duplications, code smells, security hotspots.

---

## Deployment Stages

| Branch / Trigger | Environment | Deploy Type |
|---|---|---|
| Push to `dev` | Development | Auto-deploy |
| PR merge to `main` | Production | Auto-deploy with release tag |

---

## Environment Configuration

- Secrets are injected from the CI secret store (GitHub Actions Secrets, Azure Key Vault).
- No `.env` files with real values are ever committed.
- Each environment has its own isolated database and configuration.
- Environment-specific variables are scoped per deployment target — no sharing between staging and production.

---

## Pipeline Caching

Cache dependencies between pipeline runs to keep builds fast:

```yaml
# GitHub Actions example
- name: Cache node_modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

- name: Cache Next.js build
  uses: actions/cache@v3
  with:
    path: .next/cache
    key: ${{ runner.os }}-nextjs-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
```

---

## Example GitHub Actions Workflow

```yaml
name: CI

on:
  pull_request:
    branches: [main, dev]
  push:
    branches: [main, dev]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npx eslint . --max-warnings 0

      - name: Type check
        run: npx tsc --noEmit

      - name: Unit tests
        run: npx jest --ci --coverage

      - name: Build
        run: npm run build

      - name: Security audit
        run: npm audit --audit-level=high

  sonarqube:
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: SonarSource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

---

## E2E in CI

- Run E2E tests against a **staging environment**, not a mocked backend.
- Use parallel shards to keep runtime under 10 minutes.
- Block production deployment if critical E2E tests fail.

```yaml
  e2e:
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - name: Run E2E tests
        run: npx playwright test
        env:
          WEB_DOMAIN: ${{ secrets.STAGING_URL }}
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```
