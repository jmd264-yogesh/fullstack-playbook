# Full Stack Delivery Playbook

The definitive engineering governance and standards reference for shipping secure, scalable, and maintainable software.

## Overview

This playbook is the single source of truth for how we build software at scale. It covers the full delivery lifecycle, strict coding standards, DevSecOps practices, quality gates, DORA metrics, and enterprise governance — empowering teams to eliminate boilerplate decisions and focus on delivering business value.

Built with [VitePress](https://vitepress.dev/) and deployed via [Vercel](https://vercel.com/).

## Contents

| Section | Description |
|---|---|
| [Delivery Lifecycle](docs/delivery-lifecycle/overview.md) | Standardized SDLC phases from Requirement Intake to Production Hypercare |
| [Coding Standards](docs/coding-standards/overview.md) | Architectural guidelines for React, Next.js, NestJS, Laravel, TypeScript, and databases |
| [DevSecOps Standards](docs/coding-standards/devsecops-standards.md) | CI/CD pipelines, SAST/SCA scanning, and zero critical CVE enforcement |
| [Quality Gates](docs/quality-gates/overview.md) | Code quality, testing gates, security gates, and release checklists |
| [KPIs & Metrics](docs/kpis/delivery-performance.md) | DORA metrics: Deployment Frequency, Lead Time, MTTR, and Change Failure Rate |
| [Governance](docs/governance/overview.md) | ARB/CAB approval workflows, RACI matrices, and SOC2 compliance automation |
| [Project Onboarding](docs/project-onboarding/create-project.md) | Tech stack selection, project setup, and templates |

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
- **Security:** Zero critical CVEs — automated SAST/SCA on every PR
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
