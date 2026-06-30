# Naming Conventions

Consistent naming makes navigating the codebase intuitive and reduces the cognitive overhead of reading unfamiliar code.

---

## File Naming

| Item | Convention | Examples |
|---|---|---|
| React Components | PascalCase | `CustomerForm.tsx`, `AlertRow.tsx`, `CommissionCard.tsx` |
| Hooks | camelCase with `use` prefix | `useAlertGroups.ts`, `useSearchParams.ts` |
| Utilities & Functions | camelCase | `currency.ts`, `ageValidation.ts`, `auth.ts` |
| Constants files | camelCase | `constants.ts`, `constants.env.ts` |
| Domain Models | Dot-separated | `model.types.dashboard.ts`, `model.schemas.customer.ts` |
| Test Files | Same name + `.test` suffix | `CustomerForm.test.tsx`, `currency.test.ts` |
| E2E Feature Files | kebab-case | `quote-document.feature`, `customer-search.feature` |
| E2E Step Files | kebab-case + `.step` suffix | `customer-search.step.ts` |

---

## Folder Naming

| Item | Convention | Examples |
|---|---|---|
| Component Folders | PascalCase | `BusinessDetails/`, `CommissionCard/` |
| Non-Component Folders | kebab-case | `hooks/`, `data/`, `__tests__/` |
| Private Folders | Underscore prefix | `_domain/`, `_utils/`, `_components/` |
| Context Folders | Dot-separated kebab | `context.dashboard`, `context.quote-builder` |

---

## TypeScript Naming

### Types — Always Use `type`, Prefix with `T`

```ts
// ✅ Correct
type TCustomerFormData = { ... }
type TApiResponse<T> = { data: T; status: number }

// ❌ Avoid interfaces — use type aliases
interface CustomerFormData { ... }
```

### Enums — PascalCase

```ts
enum ChannelType { Direct, Partner, Online }
enum OrderStatus { Pending, Processing, Complete, Cancelled }
```

### Constants — UPPER_SNAKE_CASE

```ts
const MAX_RETRY_COUNT = 3
const API_TIMEOUT = 30_000
```

### Functions & Variables — camelCase

```ts
const customerName = 'Acme Corp'
const isLoading = false
function formatCurrency(amount: number): string { ... }
```

### Booleans — Prefix with `is`, `has`, or `should`

```ts
const isVisible = true
const hasAccess = false
const shouldRedirect = true
```

---

## Never Use `any`

```ts
// ❌ Never
const data: any = fetchData()

// ✅ Use unknown and narrow with Zod or type guards
const data: unknown = fetchData()
const parsed = TCustomerSchema.parse(data)
```

Type information that is genuinely unknown should use `unknown`, then be narrowed to a specific type via Zod schemas or type guards before use.
