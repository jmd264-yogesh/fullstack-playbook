# Backend Folder Structure

A well-organised backend project structure ensures developer productivity, clear separation of concerns, and long-term maintainability. Standards differ between our two primary backend frameworks.

---

<BackendFrameworkTabs />

## Private Folders & Conventions

Both frameworks follow this convention for internal-only code:

| Prefix | Meaning |
|---|---|
| `__tests__/` | Co-located test files |
| `_` prefix (NestJS) | Internal utility not exported publicly |
| `Abstract` prefix | Abstract base classes |
| `I` prefix | Interfaces (NestJS/TypeScript) |
