# Prettier Standards

> Prettier eliminates all formatting debates from code reviews. Every developer's editor formats code identically on save. Diffs show only meaningful code changes, not whitespace noise.

---

## What Prettier Does

Prettier is an opinionated code formatter. It takes code and reprints it in a consistent style regardless of how it was originally written. There is no per-developer configuration — everyone formats the same way, every time.

The goal is to remove formatting as a cognitive load. Developers should not be thinking about where to put a line break or whether a trailing comma belongs. Prettier decides, consistently, for the whole team.

---

## Formatting Standards

### Semicolons — Omitted

Semicolons are omitted. Modern JavaScript's automatic semicolon insertion (ASI) handles termination correctly in all cases covered by this codebase.

### Trailing Commas — Required

Trailing commas are added after the last item in multi-line objects, arrays, and function parameter lists. When a new item is added, only one line changes in the git diff rather than two. This makes diffs cleaner and code review easier.

### Quote Style — Single Quotes

Single quotes are used for all strings. Double quotes are reserved for JSX attributes, where they are standard. Prettier enforces this automatically.

### Line Length — 100 Characters

Lines are wrapped at 100 characters. Long enough to accommodate TypeScript generics and JSX without excessive wrapping; short enough to be readable on a split screen.

### Indentation — 4 Spaces

Four-space indentation creates clear visual hierarchy in deeply nested JSX and TypeScript generics. Two-space indentation can compress structure to the point of being difficult to scan.

### Tailwind CSS Class Ordering

When Tailwind CSS is used, class names are automatically sorted by the Prettier Tailwind plugin following the official ordering convention: layout → spacing → typography → colour → state.

> If a PR shows Tailwind classes in an inconsistent order, correct it before merge.

### Line Endings — Auto

Line endings are set to `auto` — Prettier respects the OS convention. This prevents Windows developers from introducing CRLF endings into a LF codebase.

---

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

---

## Installation

```bash
npm install --save-dev prettier prettier-plugin-tailwindcss
```

---

## Enforcement Points

| Stage | When It Runs | Effect |
|---|---|---|
| **Editor** | On every file save | Code is formatted immediately as you write |
| **Pre-commit hook** | On every `git commit` | Formats staged files before committing |
| **CI pipeline** | On every pull request | Fails if unformatted files are detected |

> You do not need to think about any formatting rules while coding. Install the Prettier editor extension and enable **Format on Save**. If your editor is not formatting on save, fix that before writing any code — it will save you from blocked commits.
