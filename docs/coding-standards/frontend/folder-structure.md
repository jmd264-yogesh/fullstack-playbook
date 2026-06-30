# Folder Structure & Architecture

A well-organised folder structure is critical for developer productivity and long-term maintainability. The recommended architecture follows a **feature-based (bounded context)** pattern combined with a shared common layer.

---

## Top-Level Structure

```text
project-root/
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, routes only)
│   ├── common/                 # Shared components, hooks, utils, types
│   │   ├── components/
│   │   │   └── ui/             # Base UI primitives (Button, Input, Select)
│   │   ├── hooks/
│   │   ├── util/
│   │   ├── store/              # Global state (Zustand)
│   │   ├── data/               # Shared API fetching
│   │   ├── types/
│   │   ├── schemas/            # Shared Zod schemas
│   │   ├── _domain/            # Domain models & enums
│   │   └── constants.ts
│   ├── context.<feature>/      # Feature-based bounded contexts
│   │   ├── components/
│   │   ├── _domain/
│   │   │   ├── model.types.<name>.ts
│   │   │   ├── model.schemas.<name>.ts
│   │   │   └── model.enums.<name>.ts
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── _utils/
│   │   └── __tests__/
│   └── ...
├── e2e/                        # End-to-End tests (Playwright + BDD)
│   ├── features/               # Gherkin .feature files
│   ├── steps/                  # Step definitions
│   ├── common/                 # Page objects & utilities
│   └── support/                # Test data, mocks, helpers
├── public/                     # Static assets
├── docs/                       # Project documentation
├── __mocks__/                  # Global test mocks
└── scripts/                    # Build & utility scripts
```

---

## Key Architectural Principles

### Feature-Based Organisation

Group code by feature domain (`context.<name>`) rather than by technical role. Each context folder is self-contained with its own components, hooks, utilities, domain models, and tests.

**Do this:**
```text
src/context.customer/
  components/
  _domain/
  hooks/
  data/
  __tests__/
```

**Not this:**
```text
src/components/
src/hooks/
src/services/
src/types/
```

### Shared Common Layer

Reusable components, hooks, and utilities that span multiple features live in `src/common/`. Base UI primitives (Input, Button, Select, Dialog) go in `common/components/ui/` and are built on Radix UI headless components.

### App Router for Routing Only

The `src/app/` directory should only contain Next.js route files:
- `page.tsx`
- `layout.tsx`
- `loading.tsx`
- `error.tsx`

All UI logic and components come from `context.*` or `common` folders. The app directory is the entry point, not the feature implementation.

### Private Folders

Prefix internal/private folders with an underscore to indicate they should not be imported from outside their context:
- `_domain/` — type definitions, schemas, enums
- `_hooks/` — context-internal hooks
- `_utils/` — context-internal utilities
- `_components/` — context-internal components

### Domain Layer

Each context has a `_domain/` folder containing:

| File | Purpose |
|---|---|
| `model.types.<name>.ts` | TypeScript type definitions |
| `model.schemas.<name>.ts` | Zod validation schemas |
| `model.enums.<name>.ts` | Enums for the domain |

---

## Barrel Files

> **Avoid barrel files (`index.ts` re-exports).** Import directly from the source file.

Barrel files slow down builds and create circular dependency issues. They also obscure where a module actually lives, making refactoring harder.

```ts
// ❌ Avoid
import { CustomerForm } from '@/context.customer'

// ✅ Correct
import { CustomerForm } from '@/context.customer/components/CustomerForm'
```
