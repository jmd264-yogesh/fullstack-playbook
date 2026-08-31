import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: "Full Stack Delivery Playbook",
  description: "Engineering Governance & Delivery Standards",
  rewrites: {
      '01-foundations/01-overview.md': 'business-foundations/overview.md',
      '01-foundations/02-what-is-a-business-problem.md': 'business-foundations/what-is-a-business-problem.md',
      '01-foundations/03-what-is-full-stack.md': 'business-foundations/what-is-full-stack.md',
      '01-foundations/04-how-software-works-in-real-life.md': 'business-foundations/how-software-works-in-real-life.md',
      '01-foundations/05-understanding-business-processes.md': 'business-foundations/understanding-business-processes.md',
      '01-foundations/06-manual-to-digital.md': 'business-foundations/manual-to-digital.md',
      '01-foundations/07-application-vs-automation.md': 'business-foundations/application-vs-automation.md',
      '01-foundations/08-application-vs-integration.md': 'business-foundations/application-vs-integration.md',
      '01-foundations/09-application-vs-data-platform.md': 'business-foundations/application-vs-data-platform.md',
      '01-foundations/10-choosing-the-right-solution.md': 'business-foundations/choosing-the-right-solution.md',
      '01-foundations/11-measuring-business-value.md': 'business-foundations/measuring-business-value.md',
      '02-basics/01-overview.md': 'basics/overview.md',
      '02-basics/02-full-stack-architecture.md': 'basics/full-stack-architecture.md',
      '02-basics/03-git-version-control/01-overview.md': 'basics/git-version-control/overview.md',
      '02-basics/03-git-version-control/02-vcs-types.md': 'basics/git-version-control/vcs-types.md',
      '02-basics/03-git-version-control/03-git-vs-github.md': 'basics/git-version-control/git-vs-github.md',
      '02-basics/03-git-version-control/04-core-concepts-three-areas.md': 'basics/git-version-control/core-concepts-three-areas.md',
      '02-basics/03-git-version-control/05-branching-workflow.md': 'basics/git-version-control/branching-workflow.md',
      '02-basics/03-git-version-control/06-merge-conflicts.md': 'basics/git-version-control/merge-conflicts.md',
      '02-basics/04-apis-http/01-overview.md': 'basics/apis-http/overview.md',
      '02-basics/04-apis-http/02-request-response-anatomy.md': 'basics/apis-http/request-response-anatomy.md',
      '02-basics/04-apis-http/03-http-methods.md': 'basics/apis-http/http-methods.md',
      '02-basics/04-apis-http/04-http-status-codes.md': 'basics/apis-http/http-status-codes.md',
      '02-basics/04-apis-http/05-architectures-types.md': 'basics/apis-http/architectures-types.md',
      '02-basics/04-apis-http/06-advanced-concepts.md': 'basics/apis-http/advanced-concepts.md',
      '02-basics/04-apis-http/07-integration-tools.md': 'basics/apis-http/integration-tools.md',
      '02-basics/05-databases/01-overview.md': 'basics/databases/overview.md',
      '02-basics/05-databases/02-database-types.md': 'basics/databases/database-types.md',
      '02-basics/05-databases/03-sql-vs-nosql.md': 'basics/databases/sql-vs-nosql.md',
      '02-basics/05-databases/04-database-architecture-trends.md': 'basics/databases/database-architecture-trends.md',
      '02-basics/05-databases/05-querying-migrations-orms.md': 'basics/databases/querying-migrations-orms.md',
      '02-basics/06-environments.md': 'basics/environments.md',
      '02-basics/07-cloud/01-overview.md': 'basics/cloud/overview.md',
      '02-basics/07-cloud/02-architecture-characteristics.md': 'basics/cloud/architecture-characteristics.md',
      '02-basics/07-cloud/03-service-deployment-models.md': 'basics/cloud/service-deployment-models.md',
      '02-basics/07-cloud/04-security-shared-responsibility.md': 'basics/cloud/security-shared-responsibility.md',
      '02-basics/07-cloud/05-providers.md': 'basics/cloud/providers.md',
      '02-basics/08-glossary.md': 'basics/glossary.md',
      '03-onboarding/01-overview.md': 'project-onboarding/overview.md',
      '03-onboarding/02-create-project.md': 'project-onboarding/create-project.md',
      '03-onboarding/03-tech-stack-selection.md': 'project-onboarding/tech-stack-selection.md',
      '03-onboarding/04-templates.md': 'project-onboarding/templates.md',
      '04-delivery-lifecycle/01-overview.md': 'delivery-lifecycle/overview.md',
      '04-delivery-lifecycle/02-requirement-intake/01-overview.md': 'delivery-lifecycle/requirement-intake.md',
      '04-delivery-lifecycle/02-requirement-intake/02-scenario-1-client-provides-frd.md': 'delivery-lifecycle/requirement-intake/scenario-1-client-provides-frd.md',
      '04-delivery-lifecycle/02-requirement-intake/03-scenario-2-no-frd.md': 'delivery-lifecycle/requirement-intake/scenario-2-no-frd.md',
      '04-delivery-lifecycle/02-requirement-intake/04-scenario-3-ui-mockup.md': 'delivery-lifecycle/requirement-intake/scenario-3-ui-mockup.md',
      '04-delivery-lifecycle/02-requirement-intake/05-variations-edge-cases.md': 'delivery-lifecycle/requirement-intake/variations-edge-cases.md',
      '04-delivery-lifecycle/03-design-phase.md': 'delivery-lifecycle/design-phase.md',
      '04-delivery-lifecycle/04-agile-board-standards.md': 'delivery-lifecycle/agile-board-standards.md',
      '04-delivery-lifecycle/05-development-phase.md': 'delivery-lifecycle/development-phase.md',
      '04-delivery-lifecycle/06-testing-phase.md': 'delivery-lifecycle/testing-phase.md',
      '04-delivery-lifecycle/07-releases.md': 'delivery-lifecycle/releases.md',
      '04-delivery-lifecycle/08-monitoring-phase.md': 'delivery-lifecycle/monitoring-phase.md',
      '05-coding-standards/01-overview.md': 'coding-standards/overview.md',
      '05-coding-standards/02-project-setup.md': 'coding-standards/project-setup.md',
      '05-coding-standards/03-code-quality/01-eslint.md': 'coding-standards/code-quality/eslint.md',
      '05-coding-standards/03-code-quality/02-prettier.md': 'coding-standards/code-quality/prettier.md',
      '05-coding-standards/03-code-quality/03-git-hooks.md': 'coding-standards/code-quality/git-hooks.md',
      '05-coding-standards/04-typescript/01-overview.md': 'coding-standards/typescript/overview.md',
      '05-coding-standards/05-frontend/01-folder-structure.md': 'coding-standards/frontend/folder-structure.md',
      '05-coding-standards/05-frontend/02-naming-conventions.md': 'coding-standards/frontend/naming-conventions.md',
      '05-coding-standards/05-frontend/03-code-organization.md': 'coding-standards/frontend/code-organization.md',
      '05-coding-standards/05-frontend/04-reusability.md': 'coding-standards/frontend/reusability.md',
      '05-coding-standards/05-frontend/05-react.md': 'coding-standards/frontend/react.md',
      '05-coding-standards/05-frontend/06-nextjs.md': 'coding-standards/frontend/nextjs.md',
      '05-coding-standards/05-frontend/07-shadcn.md': 'coding-standards/frontend/shadcn.md',
      '05-coding-standards/06-backend/01-folder-structure.md': 'coding-standards/backend/folder-structure.md',
      '05-coding-standards/06-backend/02-naming-conventions.md': 'coding-standards/backend/naming-conventions.md',
      '05-coding-standards/06-backend/03-nestjs.md': 'coding-standards/backend/nestjs.md',
      '05-coding-standards/06-backend/04-graphql.md': 'coding-standards/backend/graphql.md',
      '05-coding-standards/06-backend/05-laravel.md': 'coding-standards/backend/laravel.md',
      '05-coding-standards/07-database/01-overview.md': 'coding-standards/database/overview.md',
      '05-coding-standards/07-database/02-engines/01-postgres.md': 'coding-standards/database/postgres.md',
      '05-coding-standards/07-database/02-engines/02-mysql.md': 'coding-standards/database/mysql.md',
      '05-coding-standards/07-database/02-engines/03-mongodb.md': 'coding-standards/database/mongodb.md',
      '05-coding-standards/07-database/03-orm/01-prisma.md': 'coding-standards/database/prisma.md',
      '05-coding-standards/07-database/03-orm/02-drizzle.md': 'coding-standards/database/drizzle.md',
      '05-coding-standards/08-performance/01-overview.md': 'coding-standards/performance/overview.md',
      '05-coding-standards/09-accessibility/01-overview.md': 'coding-standards/accessibility/overview.md',
      '06-automation-integration/01-overview.md': 'automation-integration/overview.md',
      '06-automation-integration/02-what-is-automation.md': 'automation-integration/what-is-automation.md',
      '06-automation-integration/03-identifying-opportunities.md': 'automation-integration/identifying-opportunities.md',
      '06-automation-integration/04-workflow-automation.md': 'automation-integration/workflow-automation.md',
      '06-automation-integration/05-api-based-automation.md': 'automation-integration/api-based-automation.md',
      '06-automation-integration/06-scheduled-jobs.md': 'automation-integration/scheduled-jobs.md',
      '06-automation-integration/07-event-driven-automation.md': 'automation-integration/event-driven-automation.md',
      '06-automation-integration/08-human-in-the-loop.md': 'automation-integration/human-in-the-loop.md',
      '06-automation-integration/09-failure-handling.md': 'automation-integration/failure-handling.md',
      '06-automation-integration/10-measuring-roi.md': 'automation-integration/measuring-roi.md',
      '07-data-analytics/01-overview.md': 'data-analytics/overview.md',
      '07-data-analytics/02-what-is-data.md': 'data-analytics/what-is-data.md',
      '07-data-analytics/03-operational-vs-analytical-data.md': 'data-analytics/operational-vs-analytical-data.md',
      '07-data-analytics/04-data-in-applications.md': 'data-analytics/data-in-applications.md',
      '07-data-analytics/05-database-vs-warehouse-vs-lake.md': 'data-analytics/database-vs-warehouse-vs-lake.md',
      '07-data-analytics/06-etl-elt.md': 'data-analytics/etl-elt.md',
      '07-data-analytics/07-data-quality.md': 'data-analytics/data-quality.md',
      '07-data-analytics/08-data-governance.md': 'data-analytics/data-governance.md',
      '07-data-analytics/09-apis-vs-data-pipelines.md': 'data-analytics/apis-vs-data-pipelines.md',
      '07-data-analytics/10-when-to-build-a-data-platform.md': 'data-analytics/when-to-build-a-data-platform.md',
      '07-data-analytics/11-when-not-to-build-a-data-platform.md': 'data-analytics/when-not-to-build-a-data-platform.md',
      '08-architecture/01-overview.md': 'architecture/overview.md',
      '08-architecture/02-standards.md': 'architecture/standards.md',
      '08-architecture/03-api-standards.md': 'architecture/api-standards.md',
      '08-architecture/04-build-vs-buy.md': 'architecture/build-vs-buy.md',
      '08-architecture/05-monolith-vs-microservices.md': 'architecture/monolith-vs-microservices.md',
      '08-architecture/06-sync-vs-async.md': 'architecture/sync-vs-async.md',
      '08-architecture/07-api-vs-events.md': 'architecture/api-vs-events.md',
      '08-architecture/08-application-vs-platform.md': 'architecture/application-vs-platform.md',
      '08-architecture/09-micro-frontends.md': 'architecture/micro-frontends.md',
      '08-architecture/10-architecture-trade-offs.md': 'architecture/architecture-trade-offs.md',
      '08-architecture/11-architecture-decision-records.md': 'architecture/architecture-decision-records.md',
      '08-architecture/12-data-architecture.md': 'architecture/data-architecture.md',
      '08-architecture/13-security-architecture.md': 'architecture/security-architecture.md',
      '08-architecture/14-git-branching.md': 'engineering/git-branching.md',
      '08-architecture/15-environments.md': 'engineering/environments.md',
      '08-architecture/16-developer-experience.md': 'engineering/developer-experience.md',
      '09-operations/01-overview.md': 'operations/overview.md',
      '09-operations/02-docker.md': 'coding-standards/infrastructure/docker.md',
      '09-operations/03-ci-cd.md': 'coding-standards/ci-cd.md',
      '09-operations/04-release-management.md': 'operations/release-management.md',
      '09-operations/05-observability.md': 'operations/observability.md',
      '09-operations/06-logging-standards.md': 'operations/logging-standards.md',
      '09-operations/07-incident-management.md': 'operations/incident-management.md',
      '09-operations/08-disaster-recovery.md': 'operations/disaster-recovery.md',
      '09-operations/09-devsecops-standards.md': 'coding-standards/devsecops-standards.md',
      '09-operations/10-preparing-for-ci.md': 'operations/preparing-for-ci.md',
      '09-operations/11-security-scanning.md': 'operations/security-scanning.md',
      '09-operations/12-deployment-strategies.md': 'operations/deployment-strategies.md',
      '09-operations/13-deployment-journey.md': 'operations/deployment-journey.md',
      '09-operations/14-production-readiness.md': 'operations/production-readiness.md',
      '10-production-reliability/01-overview.md': 'production-reliability/overview.md',
      '10-production-reliability/02-availability.md': 'production-reliability/availability.md',
      '10-production-reliability/03-reliability.md': 'production-reliability/reliability.md',
      '10-production-reliability/04-performance.md': 'production-reliability/performance.md',
      '10-production-reliability/05-scalability.md': 'production-reliability/scalability.md',
      '10-production-reliability/06-capacity-planning.md': 'production-reliability/capacity-planning.md',
      '10-production-reliability/07-sli-slo-sla.md': 'production-reliability/sli-slo-sla.md',
      '10-production-reliability/08-cost-management.md': 'production-reliability/cost-management.md',
      '10-production-reliability/09-production-readiness.md': 'templates/production-readiness.md',
      '11-security-testing/01-testing/01-overview.md': 'security/testing/overview.md',
      '11-security-testing/01-testing/02-unit-testing.md': 'security/testing/unit-testing.md',
      '11-security-testing/01-testing/03-integration-testing.md': 'security/testing/integration-testing.md',
      '11-security-testing/01-testing/04-e2e-testing.md': 'security/testing/e2e-testing.md',
      '11-security-testing/02-security-guardrails.md': 'security/security-guardrails.md',
      '11-security-testing/03-security-checklist.md': 'security/security-checklist.md',
      '12-documentation/01-overview.md': 'documentation/overview.md',
      '12-documentation/02-documentation-standards.md': 'engineering/documentation.md',
      '12-documentation/03-project-documents.md': 'coding-standards/documentation/project-documents.md',
      '12-documentation/04-technical-document.md': 'coding-standards/documentation/technical-document.md',
      '12-documentation/05-handover-document.md': 'coding-standards/documentation/handover-document.md',
      '12-documentation/06-ai-assisted-development.md': 'coding-standards/ai-assisted-development.md',
      '13-quality-gates/01-overview.md': 'quality-gates/overview.md',
      '13-quality-gates/02-code-quality.md': 'quality-gates/code-quality.md',
      '13-quality-gates/03-testing-gates.md': 'quality-gates/testing-gates.md',
      '14-governance/01-overview.md': 'governance/overview.md',
      '14-governance/02-roles-and-responsibilities.md': 'governance/roles-and-responsibilities.md',
      '14-governance/03-approvals.md': 'governance/approvals.md',
      '14-governance/04-compliance-model.md': 'governance/compliance-model.md',
      '15-kpis/01-overview.md': 'kpis/overview.md',
      '15-kpis/02-engineering-metrics.md': 'kpis/engineering-metrics.md',
      '15-kpis/03-delivery-performance.md': 'kpis/delivery-performance.md',
      '15-kpis/04-quality-metrics.md': 'kpis/quality-metrics.md',
      '16-templates-checklists/01-overview.md': 'templates-checklists/overview.md',
      '16-templates-checklists/02-project-kickoff.md': 'templates/project-kickoff.md',
      '16-templates-checklists/03-project-start.md': 'coding-standards/checklists/project-start.md',
      '16-templates-checklists/04-project-completion.md': 'coding-standards/checklists/project-completion.md',
      '16-templates-checklists/05-jqaa-review.md': 'coding-standards/checklists/jqaa-review.md',
      '16-templates-checklists/06-release-checklist.md': 'coding-standards/checklists/release-checklist.md',
      '17-case-studies/01-overview.md': 'case-studies/overview.md',
      '17-case-studies/02-manual-process-to-application.md': 'case-studies/manual-process-to-application.md',
      '17-case-studies/03-multiple-systems-to-integration.md': 'case-studies/multiple-systems-to-integration.md',
      '17-case-studies/04-ai-ml-and-data-science.md': 'case-studies/ai-ml-and-data-science.md',
      '18-role-paths/01-overview.md': 'role-paths/overview.md',
      '18-role-paths/02-client-non-technical.md': 'role-paths/client-non-technical.md',
      '18-role-paths/03-fresher.md': 'role-paths/fresher.md',
      '18-role-paths/04-software-engineer.md': 'role-paths/software-engineer.md',
      '18-role-paths/05-senior-engineer-lead.md': 'role-paths/senior-engineer-lead.md',
      '18-role-paths/06-architect.md': 'role-paths/architect.md',
      '18-role-paths/07-qa.md': 'role-paths/qa.md',
      '18-role-paths/08-devops-platform.md': 'role-paths/devops-platform.md',
      '18-role-paths/09-data-roles.md': 'role-paths/data-roles.md',
      '18-role-paths/10-product-delivery-manager.md': 'role-paths/product-delivery-manager.md',
  },
  themeConfig: {
    siteTitle: "FS Delivery Playbook",
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      {
        text: 'Playbook',
        items: [
          {
            text: 'Foundations',
            items: [
              { text: 'Business & Solution Foundations', link: '/business-foundations/overview' },
              { text: 'Basics', link: '/basics/overview' },
              { text: 'Project Onboarding', link: '/project-onboarding/overview' }
            ]
          },
          {
            text: 'Build',
            items: [
              { text: 'Delivery Lifecycle', link: '/delivery-lifecycle/overview' },
              { text: 'Development & Coding Standards', link: '/coding-standards/overview' },
              { text: 'Automation & Integration', link: '/automation-integration/overview' },
              { text: 'Data & Analytics', link: '/data-analytics/overview' },
              { text: 'Architecture & Engineering Practices', link: '/architecture/overview' }
            ]
          },
          {
            text: 'Operate',
            items: [
              { text: 'Deployment & Operations', link: '/operations/overview' },
              { text: 'Production & Reliability', link: '/production-reliability/overview' },
              { text: 'Testing & Security Guardrails', link: '/security/testing/overview' },
              { text: 'Documentation', link: '/documentation/overview' }
            ]
          },
          {
            text: 'Govern & Measure',
            items: [
              { text: 'Quality Gates', link: '/quality-gates/overview' },
              { text: 'Governance', link: '/governance/overview' },
              { text: 'KPIs & Business Value', link: '/kpis/overview' },
              { text: 'Checklists & Templates', link: '/templates-checklists/overview' }
            ]
          }
        ]
      },
      { text: 'Case Studies', link: '/case-studies/overview' },
      { text: 'Role-Based Paths', link: '/role-paths/overview' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: true,
        items: [
          { text: 'What is this playbook?', link: '/getting-started' },
          { text: 'Vision & Principles', link: '/vision-principles' }
        ]
      },
      {
        text: 'Foundations',
        collapsed: true,
        items: [
      {
        text: 'Business & Solution Foundations',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/business-foundations/overview' },
          { text: 'What is a Business Problem?', link: '/business-foundations/what-is-a-business-problem' },
          { text: 'What is Full Stack?', link: '/business-foundations/what-is-full-stack' },
          { text: 'How Software Works in Real Life', link: '/business-foundations/how-software-works-in-real-life' },
          { text: 'Understanding Business Processes', link: '/business-foundations/understanding-business-processes' },
          { text: 'From Manual to Digital', link: '/business-foundations/manual-to-digital' },
          { text: 'Application vs Automation', link: '/business-foundations/application-vs-automation' },
          { text: 'Application vs Integration', link: '/business-foundations/application-vs-integration' },
          { text: 'Application vs Data Platform', link: '/business-foundations/application-vs-data-platform' },
          { text: 'Choosing the Right Solution', link: '/business-foundations/choosing-the-right-solution' },
          { text: 'Measuring Business Value', link: '/business-foundations/measuring-business-value' }
        ]
      },
      {
        text: 'Basics',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/basics/overview' },
          { text: 'Full-Stack Architecture', link: '/basics/full-stack-architecture' },
          {
            text: 'Git & Version Control',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/basics/git-version-control/overview' },
              { text: 'Types of VCS (Local, Centralized, DVCS)', link: '/basics/git-version-control/vcs-types' },
              { text: 'Git vs GitHub', link: '/basics/git-version-control/git-vs-github' },
              { text: 'Git Core & The 3 Areas', link: '/basics/git-version-control/core-concepts-three-areas' },
              { text: 'Branching & Team Workflow', link: '/basics/git-version-control/branching-workflow' },
              { text: 'Handling Merge Conflicts', link: '/basics/git-version-control/merge-conflicts' }
            ]
          },
          {
            text: 'APIs & HTTP',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/basics/apis-http/overview' },
              { text: 'Request & Response Anatomy', link: '/basics/apis-http/request-response-anatomy' },
              { text: 'HTTP Methods', link: '/basics/apis-http/http-methods' },
              { text: 'HTTP Status Codes', link: '/basics/apis-http/http-status-codes' },
              { text: 'API Architectures & Types', link: '/basics/apis-http/architectures-types' },
              { text: 'Advanced HTTP Concepts', link: '/basics/apis-http/advanced-concepts' },
              { text: 'Integration & Testing Tools', link: '/basics/apis-http/integration-tools' }
            ]
          },
          {
            text: 'Databases',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/basics/databases/overview' },
              { text: 'Database Types & Structures', link: '/basics/databases/database-types' },
              { text: 'SQL vs NoSQL Decision Guide', link: '/basics/databases/sql-vs-nosql' },
              { text: 'Modern Trends & Architecture', link: '/basics/databases/database-architecture-trends' },
              { text: 'Querying, ORMs & Migrations', link: '/basics/databases/querying-migrations-orms' }
            ]
          },
          { text: 'Environments', link: '/basics/environments' },
          {
            text: 'Cloud Computing',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/basics/cloud/overview' },
              { text: 'Architecture & Characteristics', link: '/basics/cloud/architecture-characteristics' },
              { text: 'Service & Deployment Models', link: '/basics/cloud/service-deployment-models' },
              { text: 'Security & Shared Responsibility', link: '/basics/cloud/security-shared-responsibility' },
              { text: 'Cloud Providers', link: '/basics/cloud/providers' }
            ]
          },
          { text: 'Glossary', link: '/basics/glossary' }
        ]
      },
      {
        text: 'Project Onboarding',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/project-onboarding/overview' },
          { text: 'Create Project', link: '/project-onboarding/create-project' },
          { text: 'Tech Stack Selection', link: '/project-onboarding/tech-stack-selection' },
          { text: 'Templates', link: '/project-onboarding/templates' }
        ]
      },
        ]
      },
      {
        text: 'Build',
        collapsed: true,
        items: [
      {
        text: 'Delivery Lifecycle',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/delivery-lifecycle/overview' },
          {
            text: 'Requirement Intake',
            collapsed: true,
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
          { text: 'Release Automation', link: '/delivery-lifecycle/releases' },
          { text: 'Monitoring & Hypercare', link: '/delivery-lifecycle/monitoring-phase' }
        ]
      },
      {
        text: 'Development & Coding Standards',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/coding-standards/overview' },
          { text: 'Project Setup Guide', link: '/coding-standards/project-setup' },
          {
            text: 'Code Quality',
            collapsed: true,
            items: [
              { text: 'ESLint', link: '/coding-standards/code-quality/eslint' },
              { text: 'Prettier', link: '/coding-standards/code-quality/prettier' },
              { text: 'Git Hooks & Commits', link: '/coding-standards/code-quality/git-hooks' },
            ]
          },
          { text: 'TypeScript Strict Rules', link: '/coding-standards/typescript/overview' },
          {
            text: 'Frontend',
            collapsed: true,
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
              { text: 'Overview & General Principles', link: '/coding-standards/database/overview' },
              {
                text: 'Database Engines',
                collapsed: true,
                items: [
                  { text: 'PostgreSQL', link: '/coding-standards/database/postgres' },
                  { text: 'MySQL', link: '/coding-standards/database/mysql' },
                  { text: 'MongoDB', link: '/coding-standards/database/mongodb' }
                ]
              },
              {
                text: 'ORM & Query Layers',
                collapsed: true,
                items: [
                  { text: 'Prisma', link: '/coding-standards/database/prisma' },
                  { text: 'Drizzle', link: '/coding-standards/database/drizzle' }
                ]
              }
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
        text: 'Automation & Integration',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/automation-integration/overview' },
          { text: 'What is Automation?', link: '/automation-integration/what-is-automation' },
          { text: 'Identifying Automation Opportunities', link: '/automation-integration/identifying-opportunities' },
          { text: 'Workflow Automation', link: '/automation-integration/workflow-automation' },
          { text: 'API-based Automation', link: '/automation-integration/api-based-automation' },
          { text: 'Scheduled Jobs', link: '/automation-integration/scheduled-jobs' },
          { text: 'Event-driven Automation', link: '/automation-integration/event-driven-automation' },
          { text: 'Human-in-the-loop Automation', link: '/automation-integration/human-in-the-loop' },
          { text: 'Automation Failure Handling', link: '/automation-integration/failure-handling' },
          { text: 'Measuring Automation ROI', link: '/automation-integration/measuring-roi' }
        ]
      },
      {
        text: 'Data & Analytics',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/data-analytics/overview' },
          { text: 'What is Data?', link: '/data-analytics/what-is-data' },
          { text: 'Operational vs Analytical Data', link: '/data-analytics/operational-vs-analytical-data' },
          { text: 'Data in Applications', link: '/data-analytics/data-in-applications' },
          { text: 'Database vs Warehouse vs Lake/Lakehouse', link: '/data-analytics/database-vs-warehouse-vs-lake' },
          { text: 'ETL / ELT', link: '/data-analytics/etl-elt' },
          { text: 'Data Quality', link: '/data-analytics/data-quality' },
          { text: 'Data Governance', link: '/data-analytics/data-governance' },
          { text: 'APIs vs Data Pipelines', link: '/data-analytics/apis-vs-data-pipelines' },
          { text: 'When to Build a Data Platform', link: '/data-analytics/when-to-build-a-data-platform' },
          { text: 'When NOT to Build a Data Platform', link: '/data-analytics/when-not-to-build-a-data-platform' }
        ]
      },
      {
        text: 'Architecture & Engineering Practices',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/architecture/overview' },
          { text: 'Architecture Standards', link: '/architecture/standards' },
          { text: 'API Standards', link: '/architecture/api-standards' },
          { text: 'Build vs Buy', link: '/architecture/build-vs-buy' },
          { text: 'Monolith vs Modular Monolith vs Microservices', link: '/architecture/monolith-vs-microservices' },
          { text: 'Synchronous vs Asynchronous', link: '/architecture/sync-vs-async' },
          { text: 'API vs Events', link: '/architecture/api-vs-events' },
          { text: 'Application vs Platform', link: '/architecture/application-vs-platform' },
          { text: 'Micro-Frontends', link: '/architecture/micro-frontends' },
          { text: 'Architecture Trade-offs', link: '/architecture/architecture-trade-offs' },
          { text: 'Architecture Decision Records', link: '/architecture/architecture-decision-records' },
          { text: 'Data Architecture', link: '/architecture/data-architecture' },
          { text: 'Security Architecture', link: '/architecture/security-architecture' },
          { text: 'Git & Branching Strategy', link: '/engineering/git-branching' },
          { text: 'Environment Strategy', link: '/engineering/environments' },
          { text: 'Developer Experience (DX)', link: '/engineering/developer-experience' }
        ]
      },
        ]
      },
      {
        text: 'Operate',
        collapsed: true,
        items: [
      {
        text: 'Deployment & Operations',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/operations/overview' },
          {
            text: 'Deployment Journey',
            collapsed: true,
            items: [
              { text: 'Journey Overview', link: '/operations/deployment-journey' },
              { text: 'Preparing for CI Checks', link: '/operations/preparing-for-ci' },
              { text: 'CI/CD Pipeline', link: '/coding-standards/ci-cd' },
              { text: 'Quality & Security Scanning', link: '/operations/security-scanning' },
              { text: 'Docker & Containerization', link: '/coding-standards/infrastructure/docker' },
              { text: 'Deployment Strategies', link: '/operations/deployment-strategies' },
              { text: 'Production Readiness', link: '/operations/production-readiness' },
              { text: 'DevSecOps Standards', link: '/coding-standards/devsecops-standards' },
            ]
          },
          { text: 'Release Management', link: '/operations/release-management' },
          { text: 'Observability', link: '/operations/observability' },
          { text: 'Logging Standards', link: '/operations/logging-standards' },
          { text: 'Incident Management', link: '/operations/incident-management' },
          { text: 'Disaster Recovery & Backups', link: '/operations/disaster-recovery' },
        ]
      },
      {
        text: 'Production & Reliability',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/production-reliability/overview' },
          { text: 'Availability', link: '/production-reliability/availability' },
          { text: 'Reliability', link: '/production-reliability/reliability' },
          { text: 'Performance', link: '/production-reliability/performance' },
          { text: 'Scalability', link: '/production-reliability/scalability' },
          { text: 'Capacity Planning', link: '/production-reliability/capacity-planning' },
          { text: 'SLI / SLO / SLA', link: '/production-reliability/sli-slo-sla' },
          { text: 'Cost Management', link: '/production-reliability/cost-management' },
          { text: 'Production Readiness', link: '/templates/production-readiness' }
        ]
      },
      {
        text: 'Testing & Security Guardrails',
        collapsed: true,
        items: [
          {
            text: 'Testing',
            collapsed: true,
            items: [
              { text: 'Testing Strategy', link: '/security/testing/overview' },
              { text: 'Unit Testing', link: '/security/testing/unit-testing' },
              { text: 'Integration Testing', link: '/security/testing/integration-testing' },
              { text: 'E2E Testing', link: '/security/testing/e2e-testing' },
            ]
          },
          { text: 'Security Guardrails', link: '/security/security-guardrails' },
          { text: 'General Security Checklist', link: '/security/security-checklist' }
        ]
      },
      {
        text: 'Documentation',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/documentation/overview' },
          { text: 'Documentation Standards', link: '/engineering/documentation' },
          { text: 'Project Documents', link: '/coding-standards/documentation/project-documents' },
          { text: 'Technical Document', link: '/coding-standards/documentation/technical-document' },
          { text: 'Handover Document', link: '/coding-standards/documentation/handover-document' },
          { text: 'AI-Assisted Development', link: '/coding-standards/ai-assisted-development' },
        ]
      },
        ]
      },
      {
        text: 'Govern & Measure',
        collapsed: true,
        items: [
      {
        text: 'Quality Gates',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/quality-gates/overview' },
          { text: 'Code Quality', link: '/quality-gates/code-quality' },
          { text: 'Testing Gates', link: '/quality-gates/testing-gates' }
        ]
      },
      {
        text: 'Governance',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/governance/overview' },
          { text: 'Roles & Responsibilities', link: '/governance/roles-and-responsibilities' },
          { text: 'Approvals', link: '/governance/approvals' },
          { text: 'Compliance Model', link: '/governance/compliance-model' }
        ]
      },
      {
        text: 'KPIs & Business Value',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/kpis/overview' },
          { text: 'Engineering Metrics', link: '/kpis/engineering-metrics' },
          { text: 'Delivery Performance', link: '/kpis/delivery-performance' },
          { text: 'Quality Metrics', link: '/kpis/quality-metrics' }
        ]
      },
      {
        text: 'Checklists & Templates',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/templates-checklists/overview' },
          { text: 'Project Kickoff Checklist', link: '/templates/project-kickoff' },
          { text: 'Project Start Checklist', link: '/coding-standards/checklists/project-start' },
          { text: 'Project Completion Checklist', link: '/coding-standards/checklists/project-completion' },
          { text: 'JQAA Review Checklist', link: '/coding-standards/checklists/jqaa-review' },
          { text: 'Production Readiness Checklist', link: '/templates/production-readiness' },
          { text: 'Release Checklist', link: '/coding-standards/checklists/release-checklist' },
        ]
      },
        ]
      },
      {
        text: 'Real-World Case Studies',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/case-studies/overview' },
          { text: '1. Manual Process → Application', link: '/case-studies/manual-process-to-application' },
          { text: '2. Multiple Systems → Integration', link: '/case-studies/multiple-systems-to-integration' },
          { text: '3. AI/ML & Data Science', link: '/case-studies/ai-ml-and-data-science' }
        ]
      },
      {
        text: 'Role-Based Learning Paths',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/role-paths/overview' },
          { text: 'Client / Non-Technical', link: '/role-paths/client-non-technical' },
          { text: 'Fresher', link: '/role-paths/fresher' },
          { text: 'Software Engineer', link: '/role-paths/software-engineer' },
          { text: 'Senior Engineer / Lead', link: '/role-paths/senior-engineer-lead' },
          { text: 'Architect', link: '/role-paths/architect' },
          { text: 'QA', link: '/role-paths/qa' },
          { text: 'DevOps / Platform', link: '/role-paths/devops-platform' },
          { text: 'Data Roles', link: '/role-paths/data-roles' },
          { text: 'Product / Delivery Manager', link: '/role-paths/product-delivery-manager' }
        ]
      },
    ],

    search: {
      provider: 'local'
    }
  }
}))
