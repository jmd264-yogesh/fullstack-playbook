# Prettier Standards

> Prettier eliminates all formatting debates from code reviews. Every developer's editor formats code identically on save. Diffs show only meaningful code changes, not whitespace noise.

## What is Prettier?

Prettier is an opinionated code formatter. "Opinionated" is the key word - it doesn't offer a menu of style choices to configure and debate. It parses code into an abstract syntax tree and reprints that tree in one consistent style, discarding almost all of the original formatting in the process. Feed it the same code from two different developers with wildly different habits, and it produces byte-for-byte identical output.

This is different from a linter like ESLint, which flags problems for a human (or `--fix`) to resolve. Prettier doesn't flag anything - it just rewrites the file.

## Why Formatting Matters

Left unmanaged, formatting becomes a recurring source of friction:

- **Code review time gets wasted on whitespace.** A reviewer commenting "put a space here" or "this should wrap" is time not spent on logic, architecture, or correctness - the things a human reviewer is actually good at catching.
- **Diffs get noisy.** A one-line logic change can turn into a 40-line diff if someone's editor reformats the whole file on save with different settings than the team uses. Meaningful changes get buried in noise.
- **Personal preference becomes a debate with no winner.** Tabs vs. spaces, single vs. double quotes, semicolons or not - none of these has a technically correct answer, so left undecided they get re-litigated in every PR.

Prettier removes the decision entirely. Nobody configures their own style; the tool decides, once, for the whole team, and every file looks the same regardless of who wrote it.

## Formatting Standards

### Semicolons - Omitted

Semicolons are omitted. Modern JavaScript's automatic semicolon insertion (ASI) handles termination correctly in all cases covered by this codebase.

### Trailing Commas - Required

Trailing commas are added after the last item in multi-line objects, arrays, and function parameter lists. When a new item is added, only one line changes in the git diff rather than two. This makes diffs cleaner and code review easier.

### Quote Style - Single Quotes

Single quotes are used for all strings. Double quotes are reserved for JSX attributes, where they are standard. Prettier enforces this automatically.

### Line Length - 100 Characters

Lines are wrapped at 100 characters. Long enough to accommodate TypeScript generics and JSX without excessive wrapping; short enough to be readable on a split screen.

### Indentation - 4 Spaces

Four-space indentation creates clear visual hierarchy in deeply nested JSX and TypeScript generics. Two-space indentation can compress structure to the point of being difficult to scan.

### Line Endings - Auto

Line endings are set to `auto` - Prettier respects the OS convention. This prevents Windows developers from introducing CRLF endings into a LF codebase.

## Tailwind CSS Support

### `prettier-plugin-tailwindcss`

This project uses the official `prettier-plugin-tailwindcss` plugin. It doesn't change how JavaScript or TypeScript is formatted - its one job is to reorder the class strings inside `className` (and similar) attributes into a consistent, canonical order every time a file is saved or formatted.

> [!Important]
 the Tailwind plugin must be listed last in the `plugins` array if other Prettier plugins are present. Plugin order affects how transforms are applied, and class sorting should happen after any other formatting transform has already run.

### Tailwind CSS Class Ordering

Left alone, developers write Tailwind classes in whatever order occurs to them, which makes similar components look inconsistent and makes visual conflicts (e.g., two conflicting `padding` utilities) harder to spot. The plugin sorts classes by category, following Tailwind's own recommended convention:

```
layout → spacing → typography → colour → state
```

For example, this:

```jsx
<div className="text-white p-4 hover:bg-blue-700 flex bg-blue-500 rounded-lg">
```

is automatically rewritten to:

```jsx
<div className="flex rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-700">
```

Layout (`flex`) and shape (`rounded-lg`) come first, then colour, then spacing, then typography, with interactive/state variants (`hover:`) pushed to the end.

> [!Important] 
if a PR shows Tailwind classes in an `inconsistent order`, that's a signal Format on Save isn't running - correct it before merge rather than manually reordering classes by hand.

## Project Config (`.prettierrc`)

```json
{
  "semi": false,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 4,
  "endOfLine": "auto",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Installation

```bash
npm install --save-dev prettier prettier-plugin-tailwindcss
```

## VS Code Setup

### 1. Install the Extension

Install **Prettier - Code formatter** (`esbenp.prettier-vscode`) from the VS Code Marketplace. This is the extension that reads `.prettierrc` and applies it inside the editor.

### 2. Set Prettier as the Default Formatter

In VS Code settings (`settings.json`), set Prettier as the default formatter for the languages this project uses:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

> [!Important]
 Without an explicit `editor.defaultFormatter`, VS Code may fall back to a built-in formatter (or another extension) that doesn't match this project's `.prettierrc`. Setting it per-language, not just globally, avoids silent inconsistencies when multiple formatting extensions are installed.

### 3. Recommended Workspace Settings

Commit a `.vscode/settings.json` to the repo so every contributor gets the same setup automatically on clone - no manual per-developer configuration required:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## Format on Save Configuration

### `editor.formatOnSave`

> [!Important]
 `editor.formatOnSave` must be `true`. This is the setting that actually runs Prettier every time a file is saved - without it, `.prettierrc` exists but nothing applies it automatically, and formatting only happens when the pre-commit hook catches it.

```json
{
  "editor.formatOnSave": true
}
```

### Recommended: A Workspace Extensions Recommendation

Add `.vscode/extensions.json` so VS Code prompts new contributors to install the Prettier extension on first open of the repo:

```json
{
  "recommendations": ["esbenp.prettier-vscode"]
}
```

> [!Note] 
If your editor is **not formatting** on save, fix that before writing any code - it will save you from blocked commits. The pre-commit hook runs Prettier too, but relying on it as your only formatting pass means every commit does avoidable extra work, and any file the hook can't auto-fix will block you at commit time instead of at save time.

## Enforcement Points

| Stage | When It Runs | Effect |
|---|---|---|
| **Editor** | On every file save | Code is formatted immediately as you write |
| **Pre-commit hook** | On every `git commit` | Formats staged files before committing |
| **CI pipeline** | On every pull request | Fails if unformatted files are detected |

> [!Note]
 You do not need to think about any formatting rules while coding. Install the Prettier editor extension and enable **Format on Save**. If your editor is not formatting on save, fix that before writing any code - it will save you from blocked commits.
