# Developer Experience (DX)

A frictionless Developer Experience (DX) pays off massively in velocity and retention. Our goal: **A new engineer must be able to push their first commit to production on Day 1.**

## 1. The "One-Command" Local Setup
Local environments must not require 15 manual steps to configure.
- Every repository must have a `make setup` or `npm run init` script that:
  1. Installs dependencies.
  2. Copies `.env.example` to `.env`.
  3. Spins up required databases via Docker Compose.
  4. Runs the database migrations and seeds dummy data.

## 2. Preconfigured Tooling
Developers should not waste time debating code styles.
- **Linting & Formatting**: ESLint and Prettier configs must be centralized and automatically enforced upon file save.
- **IDE Settings**: Repositories must include `.vscode/settings.json` and `extensions.json` to automatically configure the editor for anyone joining the project.

## 3. Local Debugging
- Include pre-configured `.vscode/launch.json` so engineers can attach a debugger to Node.js/PHP processes instantly with a single click (F5), rather than relying entirely on `console.log`.
