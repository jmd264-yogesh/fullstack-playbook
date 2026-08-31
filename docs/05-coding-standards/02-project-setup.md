# Project Setup Guide

> Use this guide when starting any new full-stack project, or when onboarding to an existing one. Follow each section in order. Use the [Project Start Checklist](/coding-standards/checklists/project-start) alongside this guide to track completion.

## 0. Tech Stack Selection

Before writing any code, the right technology choices must be made. Tech stack selection is a formal design activity - not an ad-hoc decision.

> [!Important]
> **See the [Solution Design Phase](/delivery-lifecycle/design-phase)** for the full tech stack selection guide, architecture comparisons (Enterprise Web, Rapid SaaS, Content-Rich), and justification templates.

Key decisions to make and document (as ADRs) before setup:

| Decision | Options | Guidance |
|---|---|---|
| Frontend framework | Next.js, React, Vue, Svelte | See [Solution Design](/delivery-lifecycle/design-phase) |
| Backend framework | NestJS, Laravel, Express, FastAPI | See [Solution Design](/delivery-lifecycle/design-phase) |
| Database | PostgreSQL, MySQL, MongoDB | See [Database Overview](/coding-standards/database/overview) |
| ORM | Prisma, Eloquent, Mongoose, Drizzle | See [Database Overview](/coding-standards/database/overview) |
| Auth strategy | JWT, Sessions, OAuth2/SSO | See Section 3 below |

## 1. Frontend

Setting up the frontend correctly on day one saves significant rework later. This section covers framework choice, tooling installation, styling, and state management.

### 1.1 Framework & Language

- Choose a framework: **React / Vue / Svelte / Solid** - use TypeScript from day one.
- Choose a meta-framework if needed: **Next.js / Nuxt / SvelteKit / Remix**, or set up a router manually (React Router, Vue Router).

> [!Note] 
TypeScript from day one is strongly recommended even for small projects. Retrofitting types onto a JavaScript codebase later is far more expensive than starting with `strict: true`.

### 1.2 Styling

- Choose a styling approach: **Tailwind CSS / CSS Modules / styled-components** - agree as a team and do not mix.
- Add a Prettier plugin for Tailwind class ordering (`prettier-plugin-tailwindcss`).

### 1.3 Installation Commands

Pick **one** package manager for the whole project and do not mix lockfiles. Below are equivalent setup commands for a typical Next.js + TypeScript + Tailwind project across the four major package managers.

**npm**
```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm install
```

**pnpm**
```bash
pnpm create next-app my-app --typescript --tailwind --eslint
cd my-app
pnpm install
```

**yarn**
```bash
yarn create next-app my-app --typescript --tailwind --eslint
cd my-app
yarn install
```

**bun**
```bash
bun create next-app my-app --typescript --tailwind --eslint
cd my-app
bun install
```

> [!Important] 
Whichever package manager you choose, lock it in via the `packageManager` field in `package.json` and commit only that manager's lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, or `bun.lockb`). Mixed lockfiles are a common source of "works on my machine" bugs.

### 1.4 Prettier

#### What is Prettier?

Prettier is an **opinionated code formatter**. It parses your code and reprints it from scratch using a consistent set of rules for spacing, line breaks, quote style, trailing commas, and more. It does not analyze your code for bugs or bad patterns - it only controls how the code *looks*.

#### Why does Prettier exist?

Before automated formatters, teams spent significant time in code review debating spacing, tabs vs. spaces, single vs. double quotes, and line-wrapping style. These debates have no correct answer - they are matters of preference - yet they consumed real review time and created noisy diffs. Prettier removes the debate entirely by enforcing one consistent style automatically, every time a file is saved or committed.

#### Prettier vs. ESLint - what's the difference?

This is one of the most common points of confusion for developers new to the stack:

| | **Prettier** | **ESLint** |
|---|---|---|
| **Purpose** | Formatting (how code looks) | Code quality & correctness (how code behaves) |
| **Examples of what it catches** | Indentation, quote style, line length, trailing commas | Unused variables, missing dependencies in `useEffect`, unreachable code, accessibility issues |
| **Opinionated?** | Yes - very few configurable options by design | Highly configurable via rules |
| **Can it introduce bugs if misconfigured?** | No - it only changes formatting | Yes - overly strict or misconfigured rules can block valid code |

> **Note:** Prettier and ESLint are complementary, not competing tools. In this stack, `eslint-config-prettier` is used to **disable** any ESLint formatting rules that would conflict with Prettier, so each tool only does its own job - ESLint checks quality, Prettier checks style.

#### Why teams use it

- **Eliminates style debates in code review.** Reviewers focus on logic, not formatting.
- **Consistent diffs.** Git diffs only show meaningful changes, not incidental reformatting.
- **Zero-config consistency across editors.** Every developer's saved file looks identical regardless of their editor settings.
- **Enforced automatically.** Combined with Git hooks, nobody can commit inconsistently formatted code, so the standard is never "forgotten."

### 1.5 State Management

#### What is state management?

**State** is any data that changes over time and affects what the UI renders - form input, a toggled menu, fetched API data, the logged-in user, and so on. **State management** is the strategy for where that data lives, how it's updated, and which parts of the app can read or change it.

Choosing the right state management approach for the right *kind* of state is one of the most impactful frontend architecture decisions on a project. Using a heavy global store for state that only one component needs - or, conversely, drilling props ten levels deep for state that should be global - are both common sources of unnecessary complexity.

> **Important:** Set up state management **only if needed**. Do not add a global store speculatively "in case we need it later" - most state can and should stay local.

#### Local State

- **What it is:** State owned and used by a single component (or passed a short distance to direct children), managed with `useState` / `useReducer`.
- **Use for:** Form field values, toggles, modals, hover/focus states, anything not needed outside a small component tree.
- **Pros:** Simplest possible option, no dependencies, easy to reason about.
- **Cons:** Becomes unwieldy if you need to share it widely ("prop drilling").

#### Context API

- **What it is:** React's built-in mechanism for passing data through the component tree without manually threading props at every level.
- **Use for:** Low-frequency-update, app-wide values like theme, locale, or the current authenticated user.
- **Pros:** Built into React, no extra dependency.
- **Cons:** Not optimized for high-frequency updates - every consumer re-renders on change, which can cause performance issues if used for frequently-changing state.

#### Zustand

- **What it is:** A minimal, unopinionated global state library with a small API surface and no boilerplate.
- **Use for:** Small-to-medium global client state (UI state, feature flags, cross-component state) where Redux would be overkill.
- **Pros:** Very little boilerplate, no context provider wrapping required, good performance (components only re-render on the slice of state they read).
- **Cons:** Less structure than Redux, which can be a downside on very large teams without conventions in place.

#### Redux (Redux Toolkit)

- **What it is:** A predictable state container with a strict unidirectional data flow (actions → reducers → store), used via **Redux Toolkit (RTK)** in modern projects.
- **Use for:** Large, complex applications with intricate state interactions, where predictability, time-travel debugging, and strict conventions matter more than setup speed.
- **Pros:** Mature ecosystem, excellent DevTools, enforced structure scales well across large teams.
- **Cons:** More boilerplate than Zustand or Jotai, steeper learning curve.

#### Jotai

- **What it is:** An atomic state management library - state is broken into small, independent "atoms" that components subscribe to individually.
- **Use for:** Fine-grained reactive state where many small, independent pieces of state need to update without triggering unrelated re-renders.
- **Pros:** Excellent render performance due to atomic subscriptions, scales naturally as state needs grow piece-by-piece.
- **Cons:** A different mental model from single-store solutions, which can take adjustment for teams used to Redux/Zustand.

#### React Query (TanStack Query)

- **What it is:** Not a client state library - it's a **server state** library. It manages data fetched from APIs: caching, background refetching, deduplication, loading/error states, and invalidation.
- **Use for:** Any data that originates from the server (API responses). This should almost never be duplicated into Zustand/Redux/Context.
- **Pros:** Eliminates hand-written loading/error/cache boilerplate, keeps server data fresh automatically, works well alongside any client state library.
- **Cons:** Not a replacement for client state - it solves a different problem.

> **Note:** A very common mistake is putting server data (API responses) into a client state library like Redux or Zustand. Server state has different concerns - staleness, caching, refetching - that client state libraries aren't designed for. Use **React Query for server state** and a client library only for genuine client-side state.

#### Decision Tree

Use this as a quick guide when deciding what to reach for:

```
Is this data fetched from an API / server?
├── Yes → Use React Query (TanStack Query)
└── No, it's client-side UI/app state
    │
    Is it only used by one component or its direct children?
    ├── Yes → Local State (useState / useReducer)
    └── No, it needs to be shared more widely
        │
        Does it change infrequently (theme, locale, current user)?
        ├── Yes → Context API
        └── No, it changes often and/or the app is large
            │
            Do you need many small, independently-updating pieces of state?
            ├── Yes → Jotai (atomic model)
            └── No
                │
                Is the app large/complex with strict team conventions needed?
                ├── Yes → Redux Toolkit
                └── No → Zustand (simplest global option)
```

## 2. Backend

- Choose a framework: **NestJS / Express / Fastify / Django / FastAPI / Laravel**.
- Enable strict typing from the start (TypeScript `strict: true`, Python type hints, PHP strict_types).
- Follow the backend [Folder Structure](/coding-standards/backend/folder-structure) and [Naming Conventions](/coding-standards/backend/naming-conventions) standards.

## 3. Database

Database setup should be done before writing any feature code. See the [Database Overview](/coding-standards/database/overview) for full guidance on selecting the right database and ORM.

### Choose a Database

| Database | Best For | ORM / Query Layer |
|---|---|---|
| **PostgreSQL** | Relational data, ACID compliance, complex queries | Prisma, TypeORM, Drizzle |
| **MySQL** | Rapid SaaS products, Laravel monoliths | Eloquent (Laravel), Prisma |
| **MongoDB** | Flexible / semi-structured documents, event data | Mongoose |

### Setup Steps

1. **Choose your ORM** - see [Database Overview](/coding-standards/database/overview) for the ORM comparison.
2. **Configure connection pooling** - never open a new DB connection per request. Use PgBouncer/RDS Proxy for PostgreSQL, or configure Prisma's connection pool.
3. **Set up migrations from day one** - schema changes go through migration scripts, never manual edits.
   ```bash
   # Prisma
   npx prisma migrate dev --name init
   # Laravel
   php artisan migrate
   ```
4. **Seed test data** - create seed scripts for local development.
5. **Never commit connection strings** - use `.env` and inject secrets via CI.

### Environment Variables for Database

```dotenv
# PostgreSQL / MySQL
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
# MongoDB
MONGODB_URI=mongodb://localhost:27017/mydb
```

## 4. Authentication & Authorisation

- Decide on a strategy: **JWT (stateless)**, **Sessions (stateful)**, or **OAuth2 / SSO** (third-party).
- Implement auth as middleware or guards - not repeated logic inside route handlers.
- Separate **authentication** (who are you?) from **authorisation** (what can you do?).
- Never store passwords in plain text. Use `bcrypt` or `argon2`.
- Tokens must expire. Implement refresh token rotation for long-lived sessions.

## 5. Input Validation

All external input - API request bodies, query params, path params - must be validated server-side.

| Language | Recommended Library |
|---|---|
| TypeScript / Node.js | Zod |
| PHP / Laravel | Form Requests |
| Python | Pydantic |

> **Important:** Client-side validation improves UX. Server-side validation is non-negotiable security. You need both.

## 6. Environment Variables

- Create a `.env.example` file listing every key with placeholder values. Commit this to version control.
- Never commit `.env` files with real secrets.
- Use a CI secrets store (GitHub Actions Secrets, Azure Key Vault) for production values.
- Each environment (dev, staging, production) must have its own isolated config.

## 7. Package Manager & Engine Lock

- Agree on one package manager: **npm**, **pnpm**, **yarn**, or **bun**. Do not mix.
- Lock the Node version in `package.json` (`engines` field).
- Use a `.nvmrc` or `.tool-versions` file so all developers use the same runtime version.

## 8. TypeScript Configuration

- Enable `strict: true` in `tsconfig.json` - no exceptions.
- Configure path aliases to avoid deep relative imports:
  - `@/` → `src/` (application code)
  - `@@/` → project root (config, e2e fixtures)
- Set module resolution to `bundler` mode to match how your bundler resolves imports.
- Enable incremental compilation.

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES6",
    "moduleResolution": "bundler",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"],
      "@@/*": ["./*"]
    }
  }
}
```

## 9. Code Quality Tooling

Set up all three layers before writing any feature code. See the dedicated pages for full configuration.

### ESLint
See [ESLint Standards](/coding-standards/code-quality/eslint) for the full rule set.

```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install --save-dev eslint-plugin-react-hooks eslint-plugin-jsx-a11y
npm install --save-dev eslint-plugin-simple-import-sort eslint-config-prettier
```

### Prettier
See [Prettier Standards](/coding-standards/code-quality/prettier) for the full config, and Section 1.4 above for what Prettier is and why it's used.

```bash
npm install --save-dev prettier prettier-plugin-tailwindcss
```

### Git Hooks
See [Git Hooks](/coding-standards/code-quality/git-hooks) for full setup.

```bash
npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional
npx husky init
```

## 10. API Client

- Create a single, shared HTTP client (Axios instance or `fetch` wrapper) with a configured `baseURL`.
- Add interceptors to handle:
  - **Auth token attachment** - inject the `Authorization` header on every outgoing request.
  - **401 handling** - redirect to login when a token expires.
- Use **TanStack Query** (React) for server state management. Avoids writing repetitive loading/error/cache boilerplate. See Section 1.5 above for how this fits alongside client state libraries.

## 11. Documentation

Set up documentation scaffolding at project start, not as an afterthought.

| Doc | Purpose |
|---|---|
| `README.md` | Project overview, setup steps, how to run tests, environment links |
| `docs/adr/` | Architecture Decision Records for significant technical decisions |
| `CONTRIBUTING.md` | Branch naming, PR process, code review checklist |
| `.env.example` | All required environment variables with placeholder values |

See [Project Documents](/coding-standards/documentation/project-documents) for what each document must contain.

## 12. CI/CD Pipeline

Set up the pipeline before the first PR is merged. See [CI/CD Pipeline Standards](/coding-standards/ci-cd) for full configuration.

Minimum pipeline on day one:
1. ESLint (`--max-warnings 0`)
2. TypeScript type check (`tsc --noEmit`)
3. Unit tests with coverage gate
4. Build verification
5. Dependency vulnerability scan

Add security scanning (SonarQube) before the first staging deployment.
