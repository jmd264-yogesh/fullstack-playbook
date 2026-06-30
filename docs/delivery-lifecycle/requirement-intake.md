# Requirement Intake

The Requirement Intake phase is critical for establishing a shared understanding between Product Management, Design, and Engineering. It ensures that development teams have a clear, prioritized, and well-understood backlog before committing to development work.

## Entry Criteria
- Business justification and ROI established by Product Leadership.
- High-level Epics created in the project tracking system (e.g., Jira, Azure DevOps).
- Initial UX/UI concepts or wireframes available (if applicable).

## Core Activities

### 1. Requirements Gathering & PRD
The **Product Requirements Document (PRD)** serves as the single source of truth for the feature. It must include:
- **Objective & Value Proposition**: What problem are we solving?
- **Target Audience/Personas**: Who is this for?
- **User Journeys**: High-level flow of the user experience.
- **Out of Scope**: Explicitly stating what will *not* be built to prevent scope creep.
- **Success Metrics**: How will we measure adoption and success (e.g., conversion rate, reduced latency)?

### 2. Gathering Non-Functional Requirements (NFRs)
Engineering must define NFRs alongside functional requirements. These include:
- **Performance**: Expected throughput, maximum latency (e.g., "API must respond in < 200ms").
- **Scalability**: Expected concurrent users.
- **Security & Compliance**: Data residency, PII handling, GDPR/SOC2 compliance.
- **Accessibility**: Minimum WCAG 2.1 AA compliance required.





## Requirement Intake Scenarios

Depending on the format and completeness of requirements provided at the start of the project, follow one of the three primary delivery intake scenarios or adapt to specific edge cases:

### Primary Scenarios

* **[Scenario 1: Client Provides FRD](./requirement-intake/scenario-1-client-provides-frd.md)**
  Used when a comprehensive Functional Requirements Document or specification is provided. The focus is on validation, breakdown, estimation, and change control.
  
* **[Scenario 2: No FRD (Discovery & Elicitation)](./requirement-intake/scenario-2-no-frd.md)**
  Used when requirements need to be gathered from scratch through workshops, stakeholder interviews, user story mapping, and prototyping.
  
* **[Scenario 3: UI Mockup Provided](./requirement-intake/scenario-3-ui-mockup.md)**
  Used when visual designs/mockups are the primary source of requirements. Focuses on asset extraction, component mapping, and defining implied business logic.

---

### Variations & Edge Cases

* **[Additional Variations & Edge Cases](./requirement-intake/variations-edge-cases.md)**
  Guidelines for hybrid or specialized intake scenarios, including:
  * Partial FRD Available
  * Evolving/Agile Requirements
  * API-Only / Backend Services
  * Legacy System Integration
  * Proof of Concept (POC) / MVP
  * Third-Party Vendor Dependencies
