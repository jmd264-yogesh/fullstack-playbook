# ESLint Standards

> ESLint automatically catches bugs, dead code, and style violations before they reach code review. Reviewers spend time on logic and architecture — not on unused variables or missing imports.

---

## What ESLint Does

ESLint statically analyses source code and flags issues a human reviewer might miss: unused imports, unsafe TypeScript patterns, accessibility violations, and formatting inconsistencies. It runs without executing the code, so problems are caught at development time, not in production.

In this project, **all violations are treated as errors, not warnings**. A single unresolved ESLint error fails the build. Warnings accumulate and get ignored — errors demand resolution.

---

## Rule Standards

### Formatting Consistency

All formatting must conform to the project's Prettier configuration. ESLint is configured to treat any Prettier deviation as a hard error. Formatting is not personal preference — it is enforced by tooling.

The practical outcome: formatting is never a topic in code review. If it looks wrong, the developer's editor is not configured correctly.

### Unused Imports

Unused imports must be removed, not commented out. An import that serves no purpose adds noise, slows the reader, and can mislead future developers.

Commenting out unused imports as "might need this later" is not acceptable. If it is needed later, it can be re-added. Version control exists for this reason.

### Unused Variables

Variables declared but never used are flagged as errors. This prevents dead code accumulation.

**Exception:** Prefix with an underscore (`_id`, `_unused`) to signal the value is deliberately ignored. This pattern is common in callback signatures.

### Console Statements

`console.log` must not appear in committed code. It pollutes browser consoles and may leak sensitive runtime information.

**Permitted console methods:**
- `console.warn` — non-critical issues that should be surfaced
- `console.error` — errors for monitoring and log aggregation
- `console.group` / `console.groupEnd` — structured diagnostic output (remove before merging)

> `console.log` during local development is fine. The pre-commit hook blocks it before it reaches the repository. A `console.log` in a PR is a signal the developer did not run the linter. Do not approve until it is removed.

### Unused Expressions

Expressions that are evaluated but whose result is neither used nor assigned are flagged as errors. These typically indicate a logic mistake — a function called but its return value discarded.

**Allowed exceptions:**
- Short-circuit: `condition && doSomething()`
- Ternary used for side effects when intent is clear

### Empty Object Types

The rule flagging empty object types (`{}`) is disabled. Empty object types appear legitimately in generic type constraints and base interface declarations.

---

## Rule Hierarchy

The ESLint configuration is built in layers. **Order matters.**

1. **Base JavaScript rules** — fundamental issues: variables used before declaration, unreachable code, duplicate object keys.
2. **Framework-specific rules** — JSX correctness, React hook dependency arrays, Next.js performance patterns.
3. **TypeScript-specific rules** — implicit `any`, unsafe member access, missing return types.
4. **Prettier compatibility layer** — **must always be last.** Disables every ESLint formatting rule that conflicts with Prettier output.

> If someone moves the Prettier entry away from the last position in the `extends` array, it will introduce formatting conflicts that manifest as flaky or environment-specific lint failures. Flag this immediately.

---

## Enforcement Points

ESLint runs at three stages — all three must remain active:

| Stage | When It Runs | Effect |
|---|---|---|
| **Editor** | On every file save | Immediate feedback while writing |
| **Pre-commit hook** | On every `git commit` | Blocks commit if errors exist |
| **CI pipeline** | On every pull request | Blocks merge if errors exist |

Disabling any layer creates a gap where non-compliant code can reach the repository. The editor catches early; the hook is the last local defence; CI is the final gate.

---

## Installation

```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install --save-dev eslint-plugin-react-hooks eslint-plugin-jsx-a11y
npm install --save-dev eslint-plugin-simple-import-sort
npm install --save-dev eslint-plugin-unused-imports
npm install --save-dev eslint-config-prettier
```

## Example Config (`eslint.config.mjs`)

```js
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['error', { allow: ['warn', 'error', 'group', 'groupEnd'] }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  prettier, // Must be last
]
```
