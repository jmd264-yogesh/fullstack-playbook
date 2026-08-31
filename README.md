# Full Stack Delivery Playbook

The definitive engineering governance and standards reference for shipping secure, scalable, and maintainable software.

## Overview

This playbook is the single source of truth for how we build software at scale. It covers the full delivery lifecycle, strict coding standards, DevSecOps practices, quality gates, DORA metrics, and enterprise governance - empowering teams to eliminate boilerplate decisions and focus on delivering business value.

Built with [VitePress](https://vitepress.dev/) and deployed via [Vercel](https://vercel.com/).

## Contents

| Section | Description |
|---|---|
| [Getting Started](docs/getting-started.md) | What this playbook is, who it's for, and how to navigate it |
| [Business & Solution Foundations](docs/business-foundations/overview.md) | Think in problems, not technologies - how a business problem becomes the right solution, before any technology is named |
| [Basics](docs/basics/overview.md) | Beginner-friendly primers on full-stack architecture, Git, APIs, databases, Docker, CI/CD, environments, testing, security, and a glossary |
| [Delivery Lifecycle](docs/delivery-lifecycle/overview.md) | Standardized SDLC phases from Requirement Intake to Production Hypercare |
| [Project Onboarding](docs/project-onboarding/create-project.md) | Tech stack selection, project setup, and templates |
| [Coding Standards](docs/coding-standards/overview.md) | Architectural guidelines for React, Next.js, NestJS, Laravel, TypeScript, and databases |
| [Automation & Integration](docs/automation-integration/overview.md) | When to automate vs. build an application, workflow/scheduled/event-driven automation, human-in-the-loop patterns, and ROI |
| [Data & Analytics](docs/data-analytics/overview.md) | Operational vs. analytical data, warehouse/lake/lakehouse, governance, and - critically - when a data platform is and isn't the right call |
| [Architecture](docs/architecture/standards.md) | Monorepo/polyrepo guidance, event-driven patterns, API standards, build vs buy, monolith vs microservices, and architecture trade-offs |
| [Engineering Practices](docs/engineering/git-branching.md) | Branching strategy, environment strategy, and developer experience standards |
| [Deployment & Operations](docs/operations/overview.md) | Docker, CI/CD pipelines, release management, observability, and incident management |
| [Production & Reliability](docs/production-reliability/overview.md) | Availability, reliability, performance, scalability, capacity planning, SLI/SLO/SLA, and cost management |
| [Security Guardrails](docs/security/security-guardrails.md) | Playbook-wide security coverage and a general security checklist |
| [Quality Gates](docs/quality-gates/overview.md) | Code quality, testing gates, security gates, and release checklists |
| [KPIs & Metrics](docs/kpis/delivery-performance.md) | DORA metrics: Deployment Frequency, Lead Time, MTTR, and Change Failure Rate |
| [Governance](docs/governance/overview.md) | ARB/CAB approval workflows, RACI matrices, and SOC2 compliance automation |
| [Real-World Case Studies](docs/case-studies/overview.md) | Eight end-to-end examples - manual process to automation/application, system integration, data platform (and when one was rejected), and a genuinely justified AI/ML use case |
| [Role-Based Learning Paths](docs/role-paths/overview.md) | A curated reading order for clients, freshers, engineers, leads, architects, QA, DevOps, data roles, and delivery managers |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start local dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

The dev server runs at `http://localhost:5173`.

## Key Standards at a Glance

- **Test Coverage:** Minimum 80% enforced via quality gates
- **Security:** Zero critical CVEs - automated SAST/SCA on every PR
- **Compliance:** 100% SOC2-aligned delivery process
- **AI-Assisted Engineering:** Antigravity and Claude Code integrated into the workflow
- **Onboarding:** Day 1 developer productivity via standardized project scaffolding

## Tech Stack

- **Docs Framework:** VitePress 1.x + Vue 3
- **Deployment:** Vercel
- **Frontend Standards:** React, Next.js, shadcn/ui
- **Backend Standards:** NestJS, Laravel, GraphQL
- **Database Standards:** PostgreSQL, MongoDB

## Contributing

All changes should follow the delivery lifecycle and coding standards documented in this playbook. Open a PR against `main` with a clear description of what you are adding or updating.
