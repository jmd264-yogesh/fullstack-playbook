# Approval Workflows (ARB & CAB)

To manage risk, major systemic changes require formal review boards. We strive to keep these lightweight and asynchronous where possible.

## 1. Architecture Review Board (ARB)

The ARB ensures that new systems align with enterprise architecture, security policies, and cost models.

- **When is ARB required?**
  - Creating a brand new microservice or application.
  - Introducing a technology that is not on the "Adopt" ring of the [Technology Radar](/project-onboarding/tech-stack-selection) — e.g. Apollo Federation or Go, both currently in "Trial."
  - Making a fundamental shift in architecture (e.g., moving from Monolith to Microservices, or adopting event-driven/choreography patterns for the first time).
- **The Process**:
  1. The Architect submits a High-Level Design (HLD) document.
  2. The ARB (consisting of Principal Architects and InfoSec) reviews asynchronously.
  3. A 30-minute sync is held to discuss trade-offs, security implications, and approve/reject.

## 2. Change Advisory Board (CAB)

The CAB manages the risk of deploying changes into the Production environment.

- **Standard Changes (Automated)**:
  - Low-risk, repeatable changes (e.g., standard sprint feature releases, UI updates).
  - Pre-approved by CAB. Deployment is automated via CI/CD once Quality Gates pass. No meeting required.
- **Normal Changes**:
  - Moderate-risk changes (e.g., large database schema migrations, infrastructure changes).
  - Requires async review and approval by the Release Manager and Tech Lead.
- **Major Changes**:
  - High-risk changes (e.g., major system cutover, core framework upgrades).
  - Requires attendance at the weekly CAB meeting for formal risk assessment, downtime approval, and rollback plan review.
