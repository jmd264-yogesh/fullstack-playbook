# Git Hooks & Commit Automation

> Git hooks run automatically on every commit. Developers cannot accidentally commit broken, unformatted, or poorly described code - the hook prevents the commit until issues are resolved. Commit messages follow a convention that enables automated changelogs and a readable project history.

---

## How the Automation Works

When a developer runs `git commit`, a pre-commit hook intercepts the action before the commit is recorded. It runs linting and formatting checks against **only the staged files** - not the entire codebase. This keeps the hook fast regardless of project size.

The flow on every commit:

1. Staged files are formatted by Prettier.
2. Formatted files are linted and auto-fixed by ESLint where possible.
3. Any remaining ESLint errors that cannot be auto-fixed **block the commit**.
4. The commit message is validated against the Conventional Commits format.
5. If all checks pass, the commit is recorded.

This flow is not a separate, competing set of rules from `eslint.md` and `prettier.md` - it's the same Prettier config and the same ESLint config, just invoked automatically and scoped to a smaller set of files. Husky is the mechanism that installs and triggers the git hooks; lint-staged is the mechanism that scopes Prettier and ESLint to only the staged files. Neither tool has opinions about formatting or lint rules of its own - they call out to the exact same `.prettierrc` and `eslint.config.mjs` described in the other two documents.

---

## How Husky and lint-staged Fit Together

It helps to think of these as two separate, stacked responsibilities:

- **Husky** manages the git hooks themselves - it's what makes `.husky/pre-commit` actually run when someone types `git commit`. Without Husky, the hook file could exist and do nothing, because git wouldn't know to invoke it.
- **lint-staged** manages *scope* - once the pre-commit hook fires, lint-staged figures out which files are staged and runs the right command against each one, based on its extension.

So the actual call chain on every commit looks like:

```
git commit
  → Husky triggers .husky/pre-commit
    → npx lint-staged
      → for staged .ts/.tsx/.js/.jsx files: prettier --write, then eslint --fix
      → for staged .css/.json/.md/config files: prettier --write only
  → Husky triggers .husky/commit-msg
    → commitlint validates the message
  → commit recorded (or blocked)
```

Prettier always runs before ESLint in this chain, never the other way around. Prettier rewrites whitespace and structure; ESLint's rules assume Prettier has already had its pass, thanks to the `eslint-config-prettier` layer described in `eslint.md`. Running ESLint first would mean it's linting against code that's about to change shape again - reversing the order would produce spurious lint errors.

---

## What lint-staged Covers

lint-staged scopes checks to only the files in the current commit. The principle: you are responsible for the code you change.

| File Type | Action |
|---|---|
| `.ts`, `.tsx`, `.js`, `.jsx` | Format (Prettier) + Lint & auto-fix (ESLint) |
| `.css`, `.json`, `.md`, config files | Format (Prettier) only |

> [!Note]
 If the pre-commit hook is not running, the most common causes are Husky not being initialised after installation, or the hook file not being executable.

---

## Commit Message Convention

All commit messages must follow the **Conventional Commits** specification. This is not stylistic preference - it enables automated changelog generation, version bump determination, and readable project history.

### Format

```
<type>: <description in present tense>
```

The description should complete the sentence "this commit will..." - so `add user search filter`, not `added` or `adding`.

### Allowed Types

| Type | Use When |
|---|---|
| `feat` | A new feature or capability visible to users or API consumers |
| `fix` | A bug is corrected - something broken now works as intended |
| `refactor` | Code restructured or cleaned up with no change to external behaviour |
| `test` | Tests added, updated, or fixed - no production code changes |
| `docs` | Documentation only: README, inline comments, ADRs |
| `chore` | Maintenance: dependency updates, build config, tooling |
| `style` | Formatting-only changes (rarely needed - Prettier handles this) |
| `perf` | Performance improvement with no behaviour change |

### Good Commit Message Examples

```
feat: add customer search filter to quotes list
fix: resolve token expiry edge case on session refresh
refactor: simplify commission calculation to remove branching
test: add unit tests for currency formatter edge cases
docs: update API integration guide with authentication examples
chore: upgrade all dependencies to latest patch versions
```

### Bad Commit Message Examples

```
fix: bug               ← too vague - what bug, in what context?
chore: changes         ← no information
updated stuff          ← missing type prefix
WIP                    ← work-in-progress should not be merged
```

> [!Note]
Vague commit messages like `fix: bug` or `chore: updates` should be flagged in code review even if commitlint accepts them technically. A good commit message is part of documentation - it tells the next developer *why* a change was made, not just *that* it was made.

---

## Setup

```bash
npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional
npx husky init
```

### `.husky/pre-commit`

```sh
npx lint-staged
```

### `.husky/commit-msg`

```sh
npx --no -- commitlint --edit $1
```

### `lint-staged.config.js`

```js
export default {
  '*.{ts,tsx,js,jsx}': ['prettier --write', 'eslint --fix --max-warnings 0'],
  '*.{css,json,md,yml,yaml}': ['prettier --write'],
}
```

> Note the order inside the array for `.ts,.tsx,.js,.jsx`: Prettier runs first, ESLint second - matching the same reasoning covered above.

### `commitlint.config.js`

```js
export default {
  extends: ['@commitlint/config-conventional'],
}
```

---

## Enforcement Points

| Stage | When It Runs | Effect |
|---|---|---|
| **Pre-commit hook** | On every `git commit` | Blocks commit on lint errors or bad message format |
| **CI pipeline** | On every pull request | Validates commit history for the branch |

This is the local half of the same enforcement chain described in `eslint.md` and `prettier.md` - the pre-commit hook is the last line of defence before code leaves a developer's machine; CI is the final gate before it merges.
