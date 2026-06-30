# Testing Gates

Automated functional and performance testing gates ensure that code behaves exactly as expected under real-world conditions.

## 1. Functional Testing Gates
- **Unit & Integration Tests**: Pipeline executes `npm run test` or `phpunit`. 
  - **Gate**: **100% Pass Rate**. A single failing test halts the deployment pipeline.
- **End-to-End (E2E) Tests**: Executed against the ephemeral Staging environment post-deployment.
  - **Gate**: **100% Pass Rate** for Critical User Journeys (CUJs) defined in Cypress/Playwright.

## 2. Performance & Resilience Gates
Performance regressions must be caught before Production.
- **Tooling**: k6, JMeter.
- **Gate Conditions (Load Test)**:
  - **Latency**: The p95 response time for core APIs must not exceed **250ms** under baseline load.
  - **Error Rate**: HTTP 5xx errors must remain at **0%** during the load test.
  - **Throughput**: System must successfully handle the defined Requests Per Second (RPS) benchmark without crashing or autoscaling failing.

## 3. Accessibility (a11y) Gates
For all front-end applications, accessibility is a compliance requirement.
- **Tooling**: Axe-core CI integration.
- **Gate**: Zero **Critical** accessibility violations (e.g., missing ARIA labels, invalid contrast ratios).
