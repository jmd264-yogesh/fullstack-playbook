# React Best Practices & Standards

<Callout type="note">
Use this guide as a practical reference: component patterns first, then the Hook decision matrix and state-management guidance below.
</Callout>

React is our primary UI library. This guide covers setup, core patterns, state management, forms, and the enterprise-level decisions developers must follow on every project.

---

## Overview

React builds user interfaces from composable components. Prefer local state and composition; introduce shared state only when the UI has a demonstrated cross-feature need.

## Hook decision matrix

| Need | Hook | Do not use it for |
|---|---|---|
| Independent UI value | `useState` | Complex related transitions |
| Named local transitions | `useReducer` | One simple field |
| External system sync | `useEffect` | Derived render data |
| DOM or mutable non-UI value | `useRef` | Data that should rerender |
| Stable tree-wide value | `useContext` | High-frequency global state |
| Measured expensive work | `useMemo` / `useCallback` | Premature optimisation |

### Built-in Hook reference

| Hook | Purpose / when to use | Common mistake and performance note |
|---|---|---|
| `useState` | Own a local, independent UI value. | Never mutate objects; use functional updates from previous state. |
| `useEffect` | Connect to timers, subscriptions, browser APIs, or other external systems. | Clean up and keep dependencies correct; do not use it for computed values. |
| `useContext` | Share theme, locale, or stable user information. | Split fast-changing context values to limit rerenders. |
| `useReducer` | Model related transitions as explicit actions. | Keep reducers pure; use `useState` for simple cases. |
| `useRef` | Focus a DOM node or retain non-rendering mutable data. | `ref.current` changes do not update the screen. |
| `useMemo` / `useCallback` | Cache expensive work or callback identity after profiling. | Both add overhead; do not apply by default. |

<details><summary>Common Hook mistakes</summary>

- Calling hooks conditionally or from a non-React function.
- Using an effect to copy props into state or own server data.
- Disabling `exhaustive-deps` instead of redesigning dependencies.
- Memoizing every value before measuring a rendering problem.
</details>

## Quick Start

```bash
# New project - use Next.js (preferred) or Vite
npx create-next-app@latest my-app --typescript --tailwind --eslint --app
# or Vite (SPA only)
npm create vite@latest my-app -- --template react-ts

# Essential dependencies
npm install @tanstack/react-query axios zod react-hook-form
npm install zustand
npm install --save-dev @testing-library/react @testing-library/user-event jest
```

---

## Component Patterns

### Single Responsibility

Every component does one thing. If a component is hard to name, it is doing too much. The 250-line rule is a hard cap - split anything larger.

```tsx
// ❌ God component - manages data, renders layout, handles forms
export function Dashboard() {
  const [users, setUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 300 lines of mixed logic and JSX...
}

// ✅ Composed - each part does one job
export function Dashboard() {
  return (
    <DashboardLayout>
      <UserList />
      <InviteModal />
    </DashboardLayout>
  )
}
```

### Composition over Prop Drilling

Pass components as `children` rather than drilling data 3+ levels deep.

```tsx
// ❌ Prop drilling - Card doesn't need to know about user data
<Card userId={user.id} userName={user.name} userAvatar={user.avatar} />

// ✅ Composition - Card is a generic container
<Card>
  <UserAvatar src={user.avatar} />
  <span>{user.name}</span>
</Card>
```

### Early Returns for Guards

```tsx
// ✅ Guard at the top - main logic stays unindented
export function OrderCard({ order }: { order: TOrder | null }) {
  if (!order) return null
  if (order.status === 'cancelled') return <CancelledBadge />

  return (
    <div className="rounded border p-4">
      <h3>{order.reference}</h3>
      <OrderTotal amount={order.total} />
    </div>
  )
}
```

### Named Exports Always

```tsx
// ✅ Named export - reliable IDE navigation and refactoring
export function CustomerForm() { ... }

// ❌ Default export - causes naming drift across imports
export default function CustomerForm() { ... }
```

---

## TypeScript Patterns

### Use `type`, Never `interface`

```ts
// ✅ Consistent - type aliases for everything
type TUser = {
  id: string
  email: string
  role: 'admin' | 'user' | 'viewer'
}

type TApiResponse<T> = {
  data: T
  meta: { page: number; total: number }
}

// ❌ Avoid interfaces in this codebase
interface User { ... }
```

### Prop Types

```tsx
type TCustomerCardProps = {
  customer: TCustomer
  onSelect: (id: string) => void
  isSelected?: boolean        // Optional props - always give a default
  className?: string
}

export function CustomerCard({
  customer,
  onSelect,
  isSelected = false,
  className,
}: TCustomerCardProps) { ... }
```

### Type Narrowing with Zod

```ts
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'viewer']),
})

type TUser = z.infer<typeof UserSchema>  // Type derived from schema - single source of truth

// Validate API response at the boundary
const parsed = UserSchema.safeParse(apiResponse)
if (!parsed.success) {
  console.error(parsed.error.format())
  return
}
const user = parsed.data  // TypeScript knows this is TUser
```

---

## Hooks

### Rules of Hooks

- Call hooks only at the **top level** of a component or custom hook - never inside loops, conditions, or nested functions.
- Custom hook names must start with `use`.

### Custom Hooks - Move Logic Out of Components

Every `useEffect`, `useQuery`, or complex logic block belongs in a custom hook, not a component.

```ts
// hooks/useCustomers.ts
export function useCustomers(filters: TCustomerFilters) {
  return useQuery({
    queryKey: customerKeys.list(filters),
    queryFn: () => api.customers.list(filters),
    staleTime: 5 * 60 * 1000,
  })
}

// CustomerList.tsx - component is now pure presentation
export function CustomerList({ filters }: { filters: TCustomerFilters }) {
  const { data, isLoading, isError } = useCustomers(filters)

  if (isLoading) return <Skeleton />
  if (isError) return <ErrorState />

  return <ul>{data?.map(c => <CustomerRow key={c.id} customer={c} />)}</ul>
}
```

### useEffect - Use Sparingly

`useEffect` is for **synchronizing with external systems** (WebSockets, browser APIs, third-party libraries). It is NOT for:

| Misuse | Correct Approach |
|---|---|
| Fetching data on mount | Use React Query or Server Components |
| Deriving state from props | Compute inline during render |
| Syncing state with state | Derive during render or lift state up |
| Responding to events | Use event handlers directly |

```tsx
// ❌ useEffect for derived state - causes double render
const [fullName, setFullName] = useState('')
useEffect(() => {
  setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])

// ✅ Derive inline - no effect needed
const fullName = `${firstName} ${lastName}`
```

```tsx
// ✅ Legitimate useEffect - syncing with an external system
useEffect(() => {
  const socket = io(WS_URL)
  socket.on('order:update', (order) => setLatestOrder(order))
  return () => socket.disconnect()    // Cleanup is mandatory
}, [])
```

### useMemo / useCallback - Sparingly

Only memoize when you have a measured performance problem:

| When to use | Example |
|---|---|
| Expensive computation | Sorting/filtering 10k+ records |
| Stable reference for `React.memo` child | `useCallback` on a handler passed as prop |
| `useEffect` dependency that would re-run constantly | Memoized object/array dependency |

```tsx
// ✅ Justified - expensive sort with many records
const sortedOrders = useMemo(
  () => [...orders].sort((a, b) => b.total - a.total),
  [orders]
)

// ❌ Unjustified - simple string computation has no performance benefit
const label = useMemo(() => `Hello ${name}`, [name])
```

---

## State Management

Follow this priority order - choose the lowest number that solves the problem:

| Priority | Type | Tool | When |
|---|---|---|---|
| 1 | **Server state** | TanStack Query | API data, mutations, caching |
| 2 | **URL state** | Next.js router / `useSearchParams` | Filters, pagination, tabs - shareable via URL |
| 3 | **Local state** | `useState` | UI toggles, form input, modal open/close |
| 4 | **Global client state** | Zustand | Cross-component client state not in the server or URL |
| 5 | **Context** | React Context | Theme, locale, auth - near the root only |

### TanStack Query - Server State

```ts
// query-keys.ts - centralized key factory
export const customerKeys = {
  all: ['customers'] as const,
  list: (filters: TCustomerFilters) => [...customerKeys.all, 'list', filters] as const,
  detail: (id: string) => [...customerKeys.all, 'detail', id] as const,
}

// hooks/useCustomer.ts
export function useCustomer(id: string) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => api.customers.getById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,              // Only run when id is defined
  })
}

// hooks/useUpdateCustomer.ts
export function useUpdateCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TUpdateCustomerDto) => api.customers.update(data),
    onSuccess: (updated) => {
      // Update the detail cache directly
      queryClient.setQueryData(customerKeys.detail(updated.id), updated)
      // Invalidate the list so it refetches
      queryClient.invalidateQueries({ queryKey: customerKeys.all })
    },
  })
}
```

### Zustand - Global Client State

```ts
// store/useUIStore.ts
import { create } from 'zustand'

type TUIStore = {
  sidebarOpen: boolean
  toggleSidebar: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const useUIStore = create<TUIStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
}))

// Usage
const { sidebarOpen, toggleSidebar } = useUIStore()
```

---

## Forms

Use **React Hook Form** with **Zod** for all forms. Never manage form state manually with `useState`.

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const CreateOrderSchema = z.object({
  customerId: z.string().uuid('Select a customer'),
  amount:     z.number().positive('Amount must be greater than 0'),
  notes:      z.string().max(500).optional(),
})

type TCreateOrderForm = z.infer<typeof CreateOrderSchema>

export function CreateOrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCreateOrderForm>({
    resolver: zodResolver(CreateOrderSchema),
  })

  const createOrder = useCreateOrder()

  const onSubmit = async (data: TCreateOrderForm) => {
    await createOrder.mutateAsync(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="amount">Amount</label>
        <input id="amount" type="number" {...register('amount', { valueAsNumber: true })} />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Order'}
      </button>
    </form>
  )
}
```

---

## Error Handling

### Error Boundaries

Wrap each major feature in an Error Boundary so a crash in one widget does not unmount the whole page.

```tsx
// common/components/ErrorBoundary.tsx
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert" className="rounded border border-red-200 p-4">
      <p className="font-medium">Something went wrong</p>
      <pre className="text-sm text-red-600">{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

// Usage - wrap individual features
<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => queryClient.clear()}>
  <OrderDashboard />
</ErrorBoundary>
```

### Loading & Error States - Always Handle Both

```tsx
export function CustomerList() {
  const { data, isLoading, isError, error } = useCustomers()

  if (isLoading) return <CustomerListSkeleton />   // Always show a skeleton
  if (isError)   return <ErrorState message={error.message} />

  if (!data?.length) return <EmptyState message="No customers found" />

  return <ul>{data.map(c => <CustomerRow key={c.id} customer={c} />)}</ul>
}
```

---

## useReducer - Complex Local State

Use `useReducer` when a component has multiple related state variables that update together, or when the next state depends on the previous one in non-trivial ways.

```tsx
type TCartState = {
  items: TCartItem[]
  discount: number
  isCheckingOut: boolean
}

type TCartAction =
  | { type: 'ADD_ITEM'; item: TCartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'APPLY_DISCOUNT'; code: string }
  | { type: 'SET_CHECKING_OUT'; value: boolean }

function cartReducer(state: TCartState, action: TCartAction): TCartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.item] }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'APPLY_DISCOUNT':
      return { ...state, discount: action.code === 'SAVE10' ? 10 : 0 }
    case 'SET_CHECKING_OUT':
      return { ...state, isCheckingOut: action.value }
    default:
      return state
  }
}

export function Cart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], discount: 0, isCheckingOut: false })

  return (
    <div>
      {state.items.map(item => (
        <CartItem key={item.id} item={item} onRemove={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })} />
      ))}
      <button onClick={() => dispatch({ type: 'SET_CHECKING_OUT', value: true })}>
        Checkout
      </button>
    </div>
  )
}
```

---

## useRef - DOM Access & Mutable Values

`useRef` has two uses: accessing a DOM element directly, and storing a mutable value that does not trigger a re-render.

```tsx
// DOM access - auto-focus an input on mount
export function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return <input ref={inputRef} placeholder="Search..." />
}

// Mutable ref - track the previous value without causing a re-render
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// Mutable ref - store a timer ID without triggering renders
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timerRef.current)
  }, [value, delay])

  return debounced
}
```

---

## Code Splitting - React.lazy + Suspense

Defer loading heavy components until they are needed. Keeps the initial bundle small.

```tsx
import { lazy, Suspense } from 'react'

// Lazy-loaded - bundle is split here; loaded only when rendered
const HeavyReportChart = lazy(() => import('@/context.reports/components/ReportChart'))
const PDFViewer = lazy(() => import('@/common/components/PDFViewer'))

export function ReportPage() {
  const [showChart, setShowChart] = useState(false)

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Load Chart</button>

      {showChart && (
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <HeavyReportChart />
        </Suspense>
      )}
    </div>
  )
}
```

---

## URL State - useSearchParams

Filters, tabs, pagination, and search queries belong in the URL - not in `useState`. The URL is shareable, bookmarkable, and survives a page refresh.

```tsx
'use client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export function CustomerFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const status = searchParams.get('status') ?? 'all'
  const page   = Number(searchParams.get('page') ?? '1')

  const setFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    params.set('page', '1')            // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`)
  }, [searchParams, router, pathname])

  return (
    <div className="flex gap-2">
      {['all', 'active', 'inactive'].map(s => (
        <button
          key={s}
          onClick={() => setFilter('status', s)}
          className={cn('px-3 py-1 rounded', status === s && 'bg-primary text-white')}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
```

---

## Accessibility

- Use semantic HTML: `<button>` not `<div onClick>`, `<nav>` not `<div className="nav">`.
- All interactive elements must be keyboard accessible (focusable, Enter/Space triggerable).
- All images need `alt` text. Decorative images use `alt=""`.
- Use `aria-label` for icon-only buttons: `<button aria-label="Close dialog">`.
- Color must not be the only means of conveying information.

```tsx
// ✅ Semantic HTML, keyboard accessible, ARIA labeled
export function StatusBadge({ status }: { status: 'active' | 'inactive' }) {
  return (
    // Use <span> with role for non-interactive status - not a <div>
    <span
      role="status"
      aria-label={`Account is ${status}`}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        status === 'active'   && 'bg-green-100 text-green-800',
        status === 'inactive' && 'bg-gray-100 text-gray-600',
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

// ✅ Icon-only button - screen reader gets meaningful label
export function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close dialog"
      className="rounded p-1 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
    >
      <X className="h-4 w-4" aria-hidden="true" />   {/* Icon hidden from SR */}
    </button>
  )
}

// ✅ Live region - announces dynamic changes to screen readers
export function SearchResultsAnnouncer({ count }: { count: number }) {
  return (
    <p aria-live="polite" aria-atomic="true" className="sr-only">
      {count === 0 ? 'No results found' : `${count} results found`}
    </p>
  )
}

// ✅ Form field with correct labeling
export function EmailField() {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">Email address</label>
      <input
        id={id}
        type="email"
        autoComplete="email"
        aria-required="true"
        aria-describedby={`${id}-hint`}
        className="mt-1 w-full rounded border px-3 py-2"
      />
      <p id={`${id}-hint`} className="mt-1 text-xs text-muted-foreground">
        We will never share your email.
      </p>
    </div>
  )
}
```

---

## Quick Reference Checklist

- [ ] Component is under 250 lines
- [ ] Named export used
- [ ] TypeScript types defined with `type`, prefixed with `T`
- [ ] Props typed with a `TProps` type
- [ ] No `any` types - use `unknown` + Zod where needed
- [ ] Server state managed via React Query (not `useState` + `useEffect`)
- [ ] Forms use React Hook Form + Zod resolver
- [ ] `useEffect` has a cleanup function if it sets up a subscription
- [ ] Loading and error states handled in every data-fetching component
- [ ] Error Boundary wrapping each major feature section
- [ ] No barrel file imports (`import from '@/context.foo'` - import directly)
