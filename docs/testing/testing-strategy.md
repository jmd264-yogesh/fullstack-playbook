# Layered Testing Strategy

Automated testing is the only way to achieve continuous deployment confidently. We follow the Testing Pyramid.

## 1. Unit Tests (The Base)
- **Scope**: Testing individual functions, classes, or components in isolation. Mock all external dependencies.
- **Coverage Target**: Minimum 80% line coverage.
- **Tools**: Jest, Vitest, PHPUnit.

## 2. Integration Tests (The Middle)
- **Scope**: Testing how components interact, specifically focusing on database queries and cache interactions. Real databases (via Testcontainers or in-memory) must be used.
- **Rule**: If your API endpoint hits the DB, it needs an integration test.

## 3. End-to-End (E2E) Tests (The Peak)
- **Scope**: Testing Critical User Journeys (CUJs) from the browser to the database and back.
- **Tools**: Cypress, Playwright.
- **Rule**: E2E tests are brittle and slow. Only write E2E tests for the most critical paths (e.g., User Checkout, Registration).

## 4. Contract Testing
In a microservices architecture, Contract Testing ensures services don't break each other's expectations.
- **Tools**: Pact.
- **Rule**: Before deploying a Consumer service, it must verify that the Provider service's API matches the agreed-upon contract.

## 5. Flaky Test Handling
- A flaky test (fails randomly 1 out of 10 times) destroys pipeline trust.
- **Rule**: If a test is flagged as flaky, it must be quarantined (skipped) immediately until an engineer fixes the race condition or async timing issue.
