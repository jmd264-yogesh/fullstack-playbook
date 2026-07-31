import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: "Full Stack Delivery Playbook",
  description: "Engineering Governance & Delivery Standards",
  themeConfig: {
    siteTitle: "FS Delivery Playbook",
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Basics', link: '/basics/overview' },
      { text: 'Delivery Lifecycle', link: '/delivery-lifecycle/overview' },
      { text: 'Coding Standards', link: '/coding-standards/overview' },
      { text: 'Deployment & Operations', link: '/operations/overview' },
      { text: 'Security Guardrails', link: '/security/security-guardrails' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'What is this playbook?', link: '/getting-started' },
          { text: 'Vision & Principles', link: '/vision-principles' }
        ]
      },
      {
        text: 'Basics',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/basics/overview' },
          { text: 'Full-Stack Architecture 101', link: '/basics/full-stack-architecture' },
          { text: 'Git & Version Control', link: '/basics/git-version-control' },
          { text: 'APIs & HTTP', link: '/basics/apis-http' },
          { text: 'Databases 101', link: '/basics/databases' },
          { text: 'Containers & Docker', link: '/basics/docker' },
          { text: 'CI/CD 101', link: '/basics/ci-cd' },
          { text: 'Environments & Cloud Basics', link: '/basics/environments-cloud' },
          { text: 'Testing 101', link: '/basics/testing' },
          { text: 'Security 101', link: '/basics/security' },
          { text: 'Glossary', link: '/basics/glossary' }
        ]
      },
      {
        text: 'Project Onboarding',
        items: [
          { text: 'Create Project', link: '/project-onboarding/create-project' },
          { text: 'Tech Stack Selection', link: '/project-onboarding/tech-stack-selection' },
          { text: 'Templates', link: '/project-onboarding/templates' }
        ]
      },
      {
        text: 'Delivery Lifecycle',
        items: [
          { text: 'Overview', link: '/delivery-lifecycle/overview' },
          {
            text: 'Requirement Intake',
            collapsed: false,
            items: [
              { text: 'Overview', link: '/delivery-lifecycle/requirement-intake' },
              { text: 'Scenario 1: Client Provides FRD', link: '/delivery-lifecycle/requirement-intake/scenario-1-client-provides-frd' },
              { text: 'Scenario 2: No FRD (Discovery)', link: '/delivery-lifecycle/requirement-intake/scenario-2-no-frd' },
              { text: 'Scenario 3: UI Mockup Provided', link: '/delivery-lifecycle/requirement-intake/scenario-3-ui-mockup' },
              { text: 'Variations & Edge Cases', link: '/delivery-lifecycle/requirement-intake/variations-edge-cases' }
            ]
          },
          { text: 'Solution Design', link: '/delivery-lifecycle/design-phase' },
          { text: 'Agile Board Standards', link: '/delivery-lifecycle/agile-board-standards' },
          { text: 'Development', link: '/delivery-lifecycle/development-phase' },
          { text: 'Testing', link: '/delivery-lifecycle/testing-phase' },
          { text: 'Monitoring & Hypercare', link: '/delivery-lifecycle/monitoring-phase' },
          { text: 'Release tags', link: '/delivery-lifecycle/releases' }
        ]
      },
      {
        text: 'Coding Standards',
        items: [
          { text: 'Overview', link: '/coding-standards/overview' },
          { text: 'Project Setup Guide', link: '/coding-standards/project-setup' },
          {
            text: 'Code Quality',
            collapsed: false,
            items: [
              { text: 'ESLint', link: '/coding-standards/code-quality/eslint' },
              { text: 'Prettier', link: '/coding-standards/code-quality/prettier' },
              { text: 'Git Hooks & Commits', link: '/coding-standards/code-quality/git-hooks' },
            ]
          },
          { text: 'TypeScript Strict Rules', link: '/coding-standards/typescript/overview' },
          {
            text: 'Frontend',
            collapsed: false,
            items: [
              { text: 'Folder Structure', link: '/coding-standards/frontend/folder-structure' },
              { text: 'Naming Conventions', link: '/coding-standards/frontend/naming-conventions' },
              { text: 'Code Organization', link: '/coding-standards/frontend/code-organization' },
              { text: 'Reusability', link: '/coding-standards/frontend/reusability' },
              { text: 'React', link: '/coding-standards/frontend/react' },
              { text: 'Next.js', link: '/coding-standards/frontend/nextjs' },
              { text: 'Shadcn UI', link: '/coding-standards/frontend/shadcn' }
            ]
          },
          {
            text: 'Backend',
            collapsed: true,
            items: [
              { text: 'Folder Structure', link: '/coding-standards/backend/folder-structure' },
              { text: 'Naming Conventions', link: '/coding-standards/backend/naming-conventions' },
              { text: 'NestJS', link: '/coding-standards/backend/nestjs' },
              { text: 'GraphQL', link: '/coding-standards/backend/graphql' },
              { text: 'PHP Laravel', link: '/coding-standards/backend/laravel' }
            ]
          },
          {
            text: 'Databases',
            collapsed: true,
            items: [
              { text: 'Overview & ORM Guide', link: '/coding-standards/database/overview' },
              { text: 'PostgreSQL', link: '/coding-standards/database/postgres' },
              { text: 'MySQL', link: '/coding-standards/database/mysql' },
              { text: 'MongoDB', link: '/coding-standards/database/mongodb' }
            ]
          },
          {
            text: 'Testing',
            collapsed: false,
            items: [
              { text: 'Testing Strategy', link: '/coding-standards/testing/overview' },
              { text: 'Unit Testing', link: '/coding-standards/testing/unit-testing' },
              { text: 'Integration Testing', link: '/coding-standards/testing/integration-testing' },
              { text: 'E2E Testing', link: '/coding-standards/testing/e2e-testing' },
            ]
          },
          {
            text: 'Performance',
            collapsed: true,
            items: [
              { text: 'Performance Standards', link: '/coding-standards/performance/overview' },
            ]
          },
          {
            text: 'Accessibility',
            collapsed: true,
            items: [
              { text: 'Accessibility Standards', link: '/coding-standards/accessibility/overview' },
            ]
          },
        ]
      },
      {
        text: 'Architecture & Engineering Practices',
        items: [
          { text: 'Architecture Standards', link: '/architecture/standards' },
          { text: 'API Standards', link: '/architecture/api-standards' },
          { text: 'Git & Branching Strategy', link: '/engineering/git-branching' },
          { text: 'Environment Strategy', link: '/engineering/environments' },
          { text: 'Developer Experience (DX)', link: '/engineering/developer-experience' }
        ]
      },
      {
        text: 'Deployment & Operations',
        items: [
          { text: 'Overview', link: '/operations/overview' },
          { text: 'Docker', link: '/coding-standards/infrastructure/docker' },
          { text: 'CI/CD Pipeline', link: '/coding-standards/ci-cd' },
          { text: 'Release Management', link: '/operations/release-management' },
          { text: 'Observability', link: '/operations/observability' },
          { text: 'Logging Standards', link: '/operations/logging-standards' },
          { text: 'Incident Management', link: '/operations/incident-management' },
          { text: 'Disaster Recovery & Backups', link: '/operations/disaster-recovery' },
          { text: 'DevSecOps Standards', link: '/coding-standards/devsecops-standards' },
        ]
      },
      {
        text: 'Security Guardrails',
        items: [
          { text: 'Playbook Coverage', link: '/security/security-guardrails' },
          { text: 'General Security Checklist', link: '/security/security-checklist' }
        ]
      },
      {
        text: 'Documentation',
        items: [
          { text: 'Documentation Standards', link: '/engineering/documentation' },
          { text: 'Project Documents', link: '/coding-standards/documentation/project-documents' },
          { text: 'Technical Document', link: '/coding-standards/documentation/technical-document' },
          { text: 'Handover Document', link: '/coding-standards/documentation/handover-document' },
          { text: 'AI-Assisted Development', link: '/coding-standards/ai-assisted-development' },
        ]
      },
      {
        text: 'Quality Gates',
        items: [
          { text: 'Overview', link: '/quality-gates/overview' },
          { text: 'Code Quality', link: '/quality-gates/code-quality' },
          { text: 'Testing Gates', link: '/quality-gates/testing-gates' }
        ]
      },
      {
        text: 'Governance',
        items: [
          { text: 'Overview', link: '/governance/overview' },
          { text: 'Roles & Responsibilities', link: '/governance/roles-and-responsibilities' },
          { text: 'Approvals', link: '/governance/approvals' },
          { text: 'Compliance Model', link: '/governance/compliance-model' }
        ]
      },
      {
        text: 'KPIs',
        items: [
          { text: 'Engineering Metrics', link: '/kpis/engineering-metrics' },
          { text: 'Delivery Performance', link: '/kpis/delivery-performance' },
          { text: 'Quality Metrics', link: '/kpis/quality-metrics' }
        ]
      },
      {
        text: 'Checklists',
        items: [
          { text: 'Project Kickoff Checklist', link: '/templates/project-kickoff' },
          { text: 'Project Start Checklist', link: '/coding-standards/checklists/project-start' },
          { text: 'Project Completion Checklist', link: '/coding-standards/checklists/project-completion' },
          { text: 'JQAA Review Checklist', link: '/coding-standards/checklists/jqaa-review' },
          { text: 'Production Readiness Checklist', link: '/templates/production-readiness' },
          { text: 'Release Checklist', link: '/coding-standards/checklists/release-checklist' },
        ]
      },
    ],

    search: {
      provider: 'local'
    }
  }
}))
