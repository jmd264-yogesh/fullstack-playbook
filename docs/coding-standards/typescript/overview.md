# Strict TypeScript Standards

TypeScript is the foundation of our full-stack codebase. To leverage its full power, we enforce strict type safety at compile time.

## 1. Prohibition of Unsafe Types
To ensure complete type safety, the following types are **strictly prohibited** in our codebase:
- ❌ `any`: Completely disables type checking. Never use it.
- ❌ `unknown`: While safer than `any`, it forces type assertions. Define the actual type instead.
- ❌ `never`: Avoid complex generic gymnastics that result in `never`. Write simpler code.

*If an external API returns dynamic data, you must write a Zod/Joi schema to validate and infer the type at runtime.*

## 2. Separation of Types and Implementation
Types and logic must not be mixed in the same file if the types are shared.
- **Rule**: All Interfaces, Types, and Enums must be defined in dedicated `.types.ts` or `.interface.ts` files.
- **Exception**: A type used *only once* inside a single component can be defined at the top of that component's file.

**Example `user.types.ts`:**
```typescript
export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}
```

## 3. Type Assertion (Casting)
- ❌ Avoid using the `as` keyword (e.g., `const user = data as User`). This circumvents the compiler.
- ✅ Use Type Guards and Type Predicates instead to narrow types safely.

## 4. Compiler Config (`tsconfig.json`)
All projects must run with `"strict": true`, `"noImplicitAny": true`, and `"strictNullChecks": true`.
