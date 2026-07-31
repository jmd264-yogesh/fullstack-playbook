# Git & Branching Strategy

Our branching model is designed to minimize merge conflicts and accelerate the delivery pipeline.

## 1. Branching Model: Trunk-Based Development
We strictly follow **Trunk-Based Development**.
- Developers branch off `main`, create short-lived feature branches, and merge back into `main` frequently (at least once a day).
- Long-lived `develop`, `dev`, or `release/*` branches are heavily discouraged as they lead to integration hell.
- **Dev, Staging, and Production are not branches** — they are deployment environments that the same `main` build gets promoted through automatically. See [CI/CD Pipeline: Deployment Stages](/coding-standards/ci-cd#deployment-stages) for the exact promotion flow.

## 2. Branch Naming Conventions
Branches must follow this format: `<type>/<ticket-id>-<short-desc>`
- `feat/JIRA-123-add-login-form`
- `fix/JIRA-456-patch-null-pointer`
- `chore/JIRA-789-update-deps`

## 3. Semantic Commits
All commits must follow the Conventional Commits specification. This allows us to auto-generate changelogs and trigger semantic versioning bumps.
- `feat: add user authentication`
- `fix: resolve race condition in payment service`
- `docs: update API schema`

## 4. Merge Strategy: Squash & Merge
- We enforce **Squash and Merge** for all Pull Requests into `main`. 
- This keeps the `main` git history perfectly linear, clean, and easily readable for rollbacks.
