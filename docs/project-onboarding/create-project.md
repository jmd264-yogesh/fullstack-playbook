# Project Creation & Golden Paths

To eliminate "Day 1" friction and ensure immediate compliance with enterprise standards, we utilize an **Internal Developer Portal (IDP)** (e.g., Backstage) for all project bootstrapping.

## The "Golden Path" Concept
A Golden Path is an opinionated, highly automated workflow that sets up a repository, CI/CD pipelines, and cloud infrastructure instantly. It represents the CoE's recommended way of building software.

## Step-by-Step Onboarding

### 1. Requesting the Component via the IDP
1. Log in to the Developer Portal.
2. Click **Create Component**.
3. Select the appropriate Golden Path Template:
   - *NestJS Microservice Template*
   - *Next.js Frontend Template*
   - *Laravel Monolith Template*
4. Fill in the required metadata: Component Name, Domain Owner, Jira Project Key, and PagerDuty Service ID.

### 2. Automated Provisioning
Once submitted, the IDP automates the following within minutes:
- Creates a new GitHub/Azure DevOps repository.
- Applies the standard `.github/workflows` for CI/CD.
- Configures Branch Protection rules (Requires PR, 2 reviewers, linear history).
- Connects the repository to SonarQube and Snyk.
- Scaffolds the baseline boilerplate code (Linting rules, Jest setup, Dockerfile).

### 3. Infrastructure as Code (IaC)
- The IDP generates a base Terraform workspace for your project.
- To deploy to Dev/Staging, developers push infrastructure changes to the `infra/` directory, which triggers automated provisioning in AWS/Azure.

## Deviating from the Golden Path
Golden Paths are highly recommended but not strictly mandatory. If a team wishes to use a technology outside the Golden Path (e.g., Rust or Go), they must:
1. Submit an Architecture Review Board (ARB) request.
2. Justify the business value of the deviation.
3. Take full ownership of creating their own CI/CD pipelines, security scanning integrations, and observability dashboards.
