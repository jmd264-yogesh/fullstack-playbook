# Folder Structure & Architecture

A well-organised folder structure is critical for developer productivity, team scalability, and long-term maintainability. This architecture follows a **feature-based (bounded context)** design combined with a shared common layer.

## Code Organization & Structure

Code organization should reflect **domain ownership** rather than technical classifications. Grouping files by what they do for the user-rather than whether they are a hook, a utility, or a component-minimizes context switching and keeps dependencies isolated.

## Frontend Folder Structures

Explore the recommended folder structures for popular frontend frameworks.

<FrameworkTabs />

## Folder Responsibilities

Understanding where code belongs keeps the codebase clean and prevents circular dependencies[cite: 1].

| Directory / File | Scope | Primary Responsibility |
| :--- | :--- | :--- |
| **`src/app/` or `src/routes/`** | Infrastructure | Routes, layouts, error boundary setups, and parameter parsing[cite: 1]. No raw business logic[cite: 1]. |
| **`src/common/`** | Global Shared | Agnostic UI components, core HTTP clients, shared global stores, and utility functions[cite: 1]. |
| **`src/context.<feature>/`** | Bounded Feature | Self-contained domain modules containing all logic, hooks, data fetching, and feature-specific UI[cite: 1]. |
| **`_domain/`** | Feature Internal | Types, Zod validation schemas, domain interfaces, and enums[cite: 1]. |
| **`_components/`** | Feature Internal | Components that are used exclusively within the parent feature domain[cite: 1]. |
| **`data/`** | Data Access | API queries, mutation hooks (e.g., TanStack Query), and server action handlers[cite: 1]. |

> [!Note]
> Prefixing folders with an underscore (`_components/`, `_domain/`, `_hooks/`, `_utils/`) signals that these modules are **internal to the feature**[cite: 1]. They should not be imported directly by other feature domains[cite: 1].

## Component Architecture & Reusability

To keep components maintainable, follow a **2-Tier Component Hierarchy**:

1. **Base UI Primitives (`common/components/ui`)**
   - Headless, pure, and decoupled from business logic[cite: 1].
   - Highly reusable UI foundations (e.g., Radix UI, Tailwind primitives)[cite: 1].
   - Configured through explicit, type-safe props.

2. **Feature Components (`context.<feature>/_components`)**
   - Encapsulate business logic, data fetching, and state management[cite: 1].
   - Composed using Base UI Primitives.
   - Tailored to specific domain requirements[cite: 1].

> [!Important]
> **Do not prematurely optimize for reusability.** Keep components private inside `context.<feature>/_components/`[cite: 1]. Elevate a component to `common/components/` **only** when it is needed by two or more independent feature domains.

## Practical Examples

### 1. Base UI Primitive Component

Base UI components are completely stateless regarding business logic and rely on standard props for behavior and styling.

```tsx
// src/common/components/ui/Button.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/common/util/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white hover:bg-slate-800',
        outline: 'border border-slate-200 bg-transparent hover:bg-slate-100',
        danger: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <span className="loader mr-2" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';