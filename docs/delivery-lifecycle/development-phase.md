# Development Phase

The Development Phase is where architectural designs and product requirements are transformed into working software. Our engineering culture emphasizes craftsmanship, clean code, automated testing, and collaborative peer review.

This document outlines our **developer ways of working**- how we plan, write, commit, and review code on a daily basis. For specific language rules, project setup guides, and coding configurations, see the **[Coding Standards](/coding-standards/overview)** section.



## Developer Ways of Working

Our daily development lifecycle follows a disciplined workflow to ensure code quality, team alignment, and rapid delivery:

### 1. Task Acquisition & Planning
- **Daily Standup**: Align with the team on today's goals, accomplishments, and blockers.
- **Jira / ADO Tracking**: Always move the tracking card to `In Progress` before starting any development.
- **Scope Alignment**: Ensure the task's user story, design wireframe (if applicable), and acceptance criteria are fully understood.

### 2. Branching & Naming Conventions
We adhere strictly to structured branching models to prevent integration issues:
- **Trunk-Based Development**: Developers merge small, frequent updates into the integration branch daily, using feature flags to hide incomplete features.
- **Branch Naming**: Branches must follow the format below:

```
type/JIRA-ID-description
```

**Examples:**
```
feat/AUTH-101-add-sso-login
fix/PAY-202-checkout-crash
chore/INFRA-55-upgrade-node-version
```

### 3. Local Development & Feedback Loop
- **Code Quality Tools**: Configure your IDE with ESLint and Prettier to catch syntax and formatting issues as you write code.
- **Local Testing**: Run unit and integration tests locally to verify your changes before staging.
- **Git Hooks**: Pre-commit and pre-push hooks run automated checks to ensure no formatting or basic testing rules are bypassed.

### 4. Committing Code
Commit messages must act as a clean, historical ledger:
- **Conventional Commits**: Commit messages must follow the Conventional Commits standard format:

```
<type>(<scope>): <subject>
```

**Real Examples:**
```
feat(auth): integrate OAuth2 with Okta
fix(checkout): resolve null pointer on empty cart
chore(deps): upgrade axios to v1.6.0
refactor(api): extract user validation to service layer
docs(readme): update local setup instructions
```

> **Valid types:** `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `perf`, `ci`, `build`, `revert`

### 5. Collaborative Code Reviews (Pull Requests)
Code review is our primary mechanism for knowledge sharing and quality control:
- **Create a PR**: Link the corresponding JIRA/ADO ticket in the PR description and list any test details.
- **Keep PRs Small**: PR size should ideally be under 400 lines of code to facilitate high-quality reviews.
- **Peer Review**: A minimum of 2 peer approvals (including 1 Tech Lead or Domain Expert) is required. Focus feedback on architecture, logic, security, and edge cases.
- **Addressing Feedback**: Developers must address all reviewer comments, resolving discussions collaboratively.



## Detailed Coding Standards & Configurations

For specific configuration rules, folder structures, guidelines, and tool stacks, refer to the Coding Standards:

 **[Go to Coding Standards & Setup Guidelines](/coding-standards/overview)**

### Technical Standards Covered:
* **[Project Setup Guide](/coding-standards/project-setup)**: Creating new projects and environment variable configurations.
* **Code Quality**: Detailed guides for **[ESLint](/coding-standards/code-quality/eslint)**, **[Prettier](/coding-standards/code-quality/prettier)**, and **[Git Hooks & Commits](/coding-standards/code-quality/git-hooks)**.
* **Frontend Tech Stack**: Detailed conventions for **[React](/coding-standards/frontend/react)**, **[Next.js](/coding-standards/frontend/nextjs)**, **[Shadcn UI](/coding-standards/frontend/shadcn)**, and general **[Frontend Folders & Conventions](/coding-standards/frontend/folder-structure)**.
* **Backend Tech Stack**: Standards for **[NestJS](/coding-standards/backend/nestjs)**, **[GraphQL](/coding-standards/backend/graphql)**, and **[PHP Laravel](/coding-standards/backend/laravel)**.
* **Database Practices**: Standards for **[PostgreSQL](/coding-standards/database/postgres)** and **[MongoDB](/coding-standards/database/mongodb)**.
* **Infrastructure**: Standard **[Docker Setup & Compose Files](/coding-standards/infrastructure/docker)** and **[CI/CD Pipelines](/coding-standards/ci-cd)**.
* **AI-Assisted Coding**: Standards and policies on using **[AI-Assisted Development Tools](/coding-standards/ai-assisted-development)**.
