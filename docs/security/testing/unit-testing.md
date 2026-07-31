# Unit Testing

---

## 1.2.1 Testing Stack

| Tool | Purpose |
|---|---|
| **Jest** | Test runner and assertion library |
| **React Testing Library (RTL)** | Component testing focused on user behaviour |
| **ts-jest** | TypeScript preprocessor for Jest |
| **Zod** | Schema validation to verify API response shapes |
| **@testing-library/user-event** | Realistic user interaction simulation |

---

## 1.2.2 Installation

```bash
yarn add --dev jest @types/jest ts-jest
yarn add --dev @testing-library/react @testing-library/jest-dom
yarn add --dev @testing-library/user-event
yarn add --dev jest-environment-jsdom
```

---

## 1.2.3 Configuration

### `jest.config.ts`

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
    testEnvironment: 'jsdom',
    setupFilesAfterFramework: ['./jest.setup.js'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/.next/',
        '\\.spec\\.ts$',   // Exclude Playwright .spec files
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@@/(.*)$': '<rootDir>/$1',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(react-dnd|uuid|ramda)/)',
    ],
    coverageThreshold: {
        global: {
            lines: 80,
        },
    },
}

export default createJestConfig(config)
```

### `jest.setup.js`

```javascript
import '@testing-library/jest-dom'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

// Mock environment variables
process.env.NEXT_PUBLIC_API_DOMAIN = 'http://localhost:3000'
```

---

## 1.2.4 Folder Structure

Tests are co-located with the source code they test:

```text
src/context.finance/
├── components/
│   └── summary/
│       ├── CommissionCard.tsx
│       └── TransactionRow.tsx
├── __tests__/
│   ├── CommissionCard.test.tsx     # Component test
│   └── TransactionRow.test.tsx
├── hooks/
│   ├── usePartnerFinance.ts
│   └── usePartnerFinance.test.ts   # Co-located hook test
└── ...
```

| Pattern | When to Use |
|---|---|
| `Component.test.tsx` next to `Component.tsx` | Simple, tightly coupled tests |
| `__tests__/` folder | Groups of related tests needing shared fixtures |
| Root `__mocks__/` | Global mocks used across many tests (React Query, `next/navigation`) |

---

## 1.2.5 Writing Tests

### Pure Function Test

```typescript
import { formatCurrency } from './currency'

describe('formatCurrency', () => {
    it('should format positive amounts with two decimal places', () => {
        expect(formatCurrency(1234.5)).toBe('£1,234.50')
    })

    it('should handle zero', () => {
        expect(formatCurrency(0)).toBe('£0.00')
    })

    it('should format negative amounts with parentheses', () => {
        expect(formatCurrency(-500)).toBe('(£500.00)')
    })

    it('should handle undefined gracefully', () => {
        expect(formatCurrency(undefined)).toBe('-')
    })
})
```

### Component Test with React Testing Library

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CustomerSearchForm } from './CustomerSearchForm'

jest.mock('@/common/hooks/useData/useData', () => ({
    useData: () => ({
        data: [{ id: 1, name: 'Acme Corp' }],
        isLoading: false,
    }),
}))

describe('CustomerSearchForm', () => {
    it('should render the search input', () => {
        render(<CustomerSearchForm />)

        expect(screen.getByRole('textbox', {
            name: /search customers/i,
        })).toBeInTheDocument()
    })

    it('should display results when user types a query', async () => {
        const user = userEvent.setup()
        render(<CustomerSearchForm />)

        await user.type(
            screen.getByRole('textbox', { name: /search customers/i }),
            'Acme'
        )

        expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    })

    it('should call onSelect when a result is clicked', async () => {
        const onSelect = jest.fn()
        const user = userEvent.setup()
        render(<CustomerSearchForm onSelect={onSelect} />)

        await user.click(screen.getByText('Acme Corp'))

        expect(onSelect).toHaveBeenCalledWith({ id: 1, name: 'Acme Corp' })
    })
})
```

### Hook Test

```typescript
import { renderHook, act } from '@testing-library/react'
import { useToggle } from './useToggle'

describe('useToggle', () => {
    it('should start with initial value', () => {
        const { result } = renderHook(() => useToggle(false))
        expect(result.current.isOpen).toBe(false)
    })

    it('should toggle the value', () => {
        const { result } = renderHook(() => useToggle(false))

        act(() => { result.current.toggle() })
        expect(result.current.isOpen).toBe(true)

        act(() => { result.current.toggle() })
        expect(result.current.isOpen).toBe(false)
    })
})
```

---

## 1.2.6 Query Priority (React Testing Library)

Always prefer queries that mirror how users interact with the app:

| Priority | Query | When to Use |
|---|---|---|
| 1st | `getByRole` | Best choice. Queries by accessible role (button, textbox, heading). Encourages accessible markup. |
| 2nd | `getByLabelText` | Great for form fields. Mirrors how users find inputs. |
| 3rd | `getByText` | Find elements by visible text content. |
| 4th | `getByPlaceholderText` | Acceptable fallback for inputs without labels. |
| Last resort | `getByTestId` | Avoid in component tests. Acceptable in E2E for reliable selectors. |

> **Never** use `getById` or `document.querySelector` in tests. These test implementation details, not user behaviour. If the component's internal DOM structure changes, your tests should not break.

---

## 1.2.7 Best Practices

- **Test behaviour, not implementation.** Assert what the user sees, not internal state.
- **One assertion focus per test.** Each test should verify one specific behaviour.
- **Use descriptive test names:** `"should display error when email is invalid"`.
- **Mock at the boundary.** Mock API calls and external dependencies - not internal modules.
- **Avoid snapshot tests** for complex components. They produce brittle tests that break on every style change.
- **Use `userEvent` instead of `fireEvent`** for more realistic user interactions (typing, clicking).
- **If your test requires complex setup**, consider whether the component is too complex.

---

## 1.2.8 Running Tests

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# With coverage report
yarn test:coverage

# Run specific test file
yarn test -- CustomerForm.test.tsx

# Run tests matching a pattern
yarn test -- --testPathPattern="context.finance"
```
