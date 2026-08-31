# ESLint Standards

> ESLint automatically catches bugs, dead code, and style violations before they reach code review. Reviewers spend time on logic and architecture - not on unused variables or missing imports.

## What ESLint Does

ESLint statically analyses source code and flags issues a human reviewer might miss: unused imports, unsafe TypeScript patterns, accessibility violations, and formatting inconsistencies. It runs without executing the code, so problems are caught at development time, not in production.

In this project, **all violations are treated as errors, not warnings**. A single unresolved ESLint error fails the build. Warnings accumulate and get ignored - errors demand resolution.

## Rule Standards

### Formatting Consistency

All formatting must conform to the project's Prettier configuration. ESLint is configured to treat any Prettier deviation as a hard error. Formatting is not personal preference - it is enforced by tooling.

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
- `console.warn` - non-critical issues that should be surfaced
- `console.error` - errors for monitoring and log aggregation
- `console.group` / `console.groupEnd` - structured diagnostic output (remove before merging)

> `console.log` during local development is fine. The pre-commit hook blocks it before it reaches the repository. A `console.log` in a PR is a signal the developer did not run the linter. Do not approve until it is removed.

### Unused Expressions

Expressions that are evaluated but whose result is neither used nor assigned are flagged as errors. These typically indicate a logic mistake - a function called but its return value discarded.

**Allowed exceptions:**
- Short-circuit: `condition && doSomething()`
- Ternary used for side effects when intent is clear

### Empty Object Types

The rule flagging empty object types (`{}`) is disabled. Empty object types appear legitimately in generic type constraints and base interface declarations.

## Rule Hierarchy

Think of the ESLint config as a stack of layers, applied in order, where each later layer can refine or override what came before it. Order matters because the last layer to touch a rule wins - that's why the Prettier layer has to sit at the very bottom of the stack.

**Layer 1 - Base JavaScript rules.** The foundation. Catches fundamental correctness issues that have nothing to do with any framework: variables used before they're declared, unreachable code, duplicate object keys. These rules apply to any JavaScript, anywhere.

**Layer 2 - Framework-specific rules.** Adds awareness of the tools this project actually uses: JSX correctness, React hook dependency arrays, Next.js performance patterns. A plain-JavaScript linter has no opinion on whether a `useEffect` dependency array is missing a value - this layer teaches it to care.

**Layer 3 - TypeScript-specific rules.** Adds type-awareness on top of the previous two layers: implicit `any`, unsafe member access, missing return types. This layer needs the TypeScript parser to already be in place, which is why it comes after the base rules.

**Layer 4 - Prettier compatibility layer.** Always last. Its only job is to *disable* any ESLint formatting rule from the earlier layers that would conflict with Prettier's output. It adds no rules of its own - it's a rules-eraser, not a rules-adder.

> [!note] 
**The order matters:** if the Prettier layer moved anywhere earlier in the array, a later layer could re-enable a formatting rule it was supposed to turn off. The result isn't a clean error - it's a flaky, environment-specific lint failure that looks like a bug in someone's editor. If someone reorders the `extends` array and moves Prettier away from the last position, flag it immediately.

## How Linting Flows Through the Project

Linting isn't a single checkpoint - it's a pipeline with five stages, each catching what the previous stage missed.

```
Editor  →  ESLint  →  TypeScript  →  Git Hooks  →  CI/CD
(write)   (analyse)   (type-check)   (gate)        (gate)
```

1. **Editor.** On every file save, the ESLint editor extension analyses the file in real time. This is the fastest, cheapest place to catch a mistake - before it's even saved to disk in a meaningful way.
2. **ESLint (CLI).** Running `eslint .` or `eslint --fix` applies the full layered rule set described above against the codebase, or a subset of it, outside the editor's live-feedback loop. This is what CI and the pre-commit hook actually invoke.
3. **TypeScript.** ESLint's TypeScript layer flags *lint*-level type issues (implicit `any`, unsafe access), but it does not replace the TypeScript compiler. `tsc --noEmit` still runs to catch full type errors ESLint doesn't attempt to reason about, such as incompatible function signatures across files.
4. **Git Hooks.** The pre-commit hook runs ESLint (via lint-staged) against only the staged files, auto-fixing what it can and blocking the commit on anything it can't. See `git-hooks.md` for the full flow.
5. **CI/CD.** The final, non-negotiable gate. CI lints the entire project, not just the diff, so it also catches pre-existing issues a narrow pre-commit run wouldn't touch. A failure here blocks the merge.

Each stage exists because the one before it can be skipped, bypassed, or simply not run - a developer can commit with `--no-verify`, but they can't merge a PR that fails CI.

### Practical Example

Say a developer writes:

```tsx
import { useState, useEffect } from 'react'

function ProfileCard({ userId }) {
  const [name, setName] = useState()

  useEffect(() => {
    fetchName(userId).then(setName)
  }, [])

  console.log(name)

  return <div>{name}</div>
}
```

Walking it through the pipeline:

- **Editor:** immediately underlines `useEffect`'s dependency array (missing `userId`) and the `console.log`.
- **ESLint (CLI):** `no-console` fires as a hard error; `react-hooks/exhaustive-deps` warns about the missing dependency.
- **TypeScript:** flags `userId` as implicitly `any` since no prop types were declared.
- **Git Hooks:** pre-commit runs `eslint --fix`, which can't auto-fix the console statement or the missing prop type - commit is blocked.
- **CI/CD:** never even reached, because the commit didn't happen. If it *had* been forced through with `--no-verify`, CI would catch it here instead.

## Enforcement Points

ESLint runs at three stages - all three must remain active:

| Stage | When It Runs | Effect |
|---|---|---|
| **Editor** | On every file save | Immediate feedback while writing |
| **Pre-commit hook** | On every `git commit` | Blocks commit if errors exist |
| **CI pipeline** | On every pull request | Blocks merge if errors exist |

Disabling any layer creates a gap where non-compliant code can reach the repository. The editor catches early; the hook is the last local defence; CI is the final gate.

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
