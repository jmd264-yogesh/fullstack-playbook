# Reusability & Scalability Guidelines

## Shared UI Primitives

Shared UI primitives (Button, Input, Dialog, Select) go in `common/components/ui/` and are built on **Radix UI** headless components. These provide full accessibility out of the box with zero styling opinion.

- Style them with Tailwind CSS + CVA (class-variance-authority) for variant management.
- Never import a UI primitive from the `shadcn/ui` source directly - copy it into your `common/components/ui/` and own it.
- Never mix UI libraries (e.g., Material UI + Radix). Choose one headless primitive layer and own it.

## Custom Hooks

- Custom hooks used by more than one context must be promoted to `common/hooks/`.
- A hook that stays within a single context belongs in that context's `hooks/` folder.
- Hooks that wrap external APIs (e.g., `useLocalStorage`, `useDebounce`, `useMediaQuery`) belong in `common/hooks/util/`.

## Data Fetching Patterns

Data fetching is centralised through `useData` and `useDataMutation` hooks backed by React Query. Components never call `fetch` or Axios directly.

```ts
// ✅ Centralised data fetching
const { data: customers, isLoading } = useData<TCustomer[]>('/customers')
const { mutate: createCustomer } = useDataMutation<TCustomer>('/customers', 'POST')

// ❌ Direct fetch in component
useEffect(() => {
    fetch('/customers').then(...)
}, [])
```

## Zod Schemas - Single Definition, Dual Purpose

Zod schemas serve two purposes simultaneously:
1. **API response validation** - parse and validate what the server returns
2. **Form validation** - pass to React Hook Form via the Zod resolver

Define the schema once, derive the TypeScript type from it:

```ts
// model.schemas.customer.ts
import { z } from 'zod'

export const TCustomerSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
    status: z.enum(['active', 'inactive']),
})

export type TCustomer = z.infer<typeof TCustomerSchema>
```

```tsx
// In a form component
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TCustomerSchema, type TCustomer } from './_domain/model.schemas.customer'

const form = useForm<TCustomer>({
    resolver: zodResolver(TCustomerSchema),
})
```

## Forms - React Hook Form + Zod

Use **React Hook Form** with Zod resolvers for all forms. Never manage form state manually with `useState`.

- Pass the Zod schema to the form and derive types with `z.infer<typeof schema>`.
- Validate on submit and on change for inline error feedback.
- Use the `Controller` component for controlled inputs that don't natively support `ref`.

### The Rule of Three
> [!Important]
> **Avoid premature abstraction.** Wait until a pattern appears in **3+ places** before extracting it.

A component or function that exists in only one or two places should stay where it is. Extract it when the third use appears - that is when the abstraction is validated by real usage, not hypothetical future needs.

## Next.js Streaming and Suspense

Use **Next.js Streaming with Suspense boundaries** to progressively load page sections. This improves perceived performance by rendering fast-loading parts immediately while slower data-dependent sections stream in.

```tsx
import { Suspense } from 'react'

export default function CustomerPage() {
    return (
        <main>
            <CustomerHeader />
            <Suspense fallback={<Skeleton />}>
                <CustomerDataTable />
            </Suspense>
        </main>
    )
}
```
