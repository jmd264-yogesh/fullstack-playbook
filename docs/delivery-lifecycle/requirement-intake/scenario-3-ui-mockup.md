# Scenario 3: UI Mockup Provided

> **Intake Scenarios:** [← Back to Requirement Intake Overview](../requirement-intake.md) | [Scenario 1: Client Provides FRD](./scenario-1-client-provides-frd.md) | [Scenario 2: No FRD](./scenario-2-no-frd.md) | [Variations & Edge Cases](./variations-edge-cases.md)

When the client provides UI mockups or visual designs with little or no Functional Requirements Document (FRD), the project follows a **UI-driven implementation approach**. In this scenario, the mockups serve as the primary source of requirements, and the team collaborates to translate the designs into functional and responsive application components.

## Review & Asset Extraction

The UX and development teams review the mockups to understand the intended user experience, navigation, layout, and functionality.

### Activities

* Review all screens, user flows, and interactions.
* Organize and validate design files.
* Define responsive breakpoints (Mobile, Tablet, Desktop).
* Verify accessibility requirements, including:

  * Color contrast
  * Typography readability
  * Keyboard accessibility
* Extract and organize design assets such as:

  * Icons
  * Images
  * Logos
  * Illustrations
* Review existing style guides or component libraries to promote consistency and accelerate development.

### Deliverables

* Approved design mockups
* Organized design assets
* Accessibility review findings
* Responsive design guidelines

---

## Component Mapping & Responsive Behaviour

The development team maps visual elements from the mockups to reusable front-end components and defines responsive behaviour across supported devices.

### Activities

* Identify reusable UI components such as:

  * Buttons
  * Cards
  * Forms
  * Navigation menus
  * Tables
  * Modals
* Define component properties and interactions.
* Establish responsive layout rules for each breakpoint.
* Document interactive states including:

  * Hover
  * Focus
  * Active
  * Disabled
  * Error

### Example

| Design Element  | Implementation Component |
| --------------- | ------------------------ |
| Product Card    | Reusable Card Component  |
| Primary Button  | Shared Button Component  |
| Navigation Menu | Navigation Component     |
| Product Grid    | Responsive Grid Layout   |

### Acceptance Criteria

* UI aligns with approved designs at defined breakpoints.
* Responsive layouts function correctly across devices.
* Typography, spacing, and styling are consistent with the design specifications.
* Interactive states behave as expected.

---

## Functional Requirement Identification

Since mockups often focus on visual design rather than business logic, the team must identify and document any implied functionality.

### Activities

* Analyse UI elements for expected behaviour.
* Document business rules and user interactions.
* Create lightweight user stories where required.
* Clarify assumptions and gaps with stakeholders.

### Example User Story

**As a shopper,** I want to view the items in my cart so that I can review my selections before checkout.

### Example Acceptance Criteria

* Clicking the cart icon displays selected items.
* Product quantities are displayed correctly.
* Cart totals are calculated accurately.
* Appropriate empty-state messaging is shown when the cart contains no items.

---

## Deliverables

The primary outputs of this phase include:

* Implementation specification detailing:

  * Layout structure
  * Grid systems
  * Styling standards
  * Component behaviour
  * Responsive rules
* Design asset repository
* Project-specific style guide or design system
* User stories and acceptance criteria for implied functionality

---

## Development & Quality Assurance

### Front-End Development

Developers implement the UI using the approved mockups and implementation specifications.

### Key Focus Areas

* Responsive design implementation
* Accessibility compliance
* Reusable component development
* Integration with backend services and APIs

### Quality Assurance Activities

#### Functional Testing

Validate all user interactions and workflows.

#### Responsive Testing

Verify layouts across mobile, tablet, and desktop devices.

#### Visual Regression Testing

Ensure visual consistency throughout the development lifecycle.

#### Design QA

Compare the implemented application against the approved mockups to validate:

* Colours
* Typography
* Spacing
* Alignment
* Component behaviour
* Responsive layouts

### Definition of Done

A feature is considered complete when:

* UI matches approved designs.
* Responsive behaviour is validated.
* Accessibility requirements are met.
* Functional and visual testing are passed.
* Code review is completed.
* Stakeholder acceptance is obtained.

---

## Risks & Mitigation

### Risk: Missing Functional Requirements

Mockups may not include:

* Business rules
* Validation logic
* Error handling
* Loading states
* Empty states

#### Mitigation

Create a discovery document to identify implied functionality and confirm requirements with stakeholders before development begins.

---

### Risk: Overemphasis on Pixel-Perfect Design

Strict pixel-perfect implementation can create unnecessary effort and may not be practical across all devices and screen sizes.

#### Mitigation

* Define clear responsive breakpoints.
* Focus on consistency and usability.
* Validate designs at agreed screen resolutions rather than every possible viewport size.

---

### Risk: Lack of a Design System

Without a design system, projects may experience inconsistent UI implementation and duplicated development effort.

#### Mitigation

* Establish a project-specific design system.
* Create reusable components early in the project.
* Leverage existing UI frameworks where appropriate.

---

## Change Control

Once the design specifications have been reviewed and approved, any significant design or functionality changes should follow a formal change management process.

### Activities

* Log change requests.
* Assess impact on scope, timeline, and effort.
* Obtain stakeholder approval.
* Update implementation specifications and design assets as required.

### Benefits

* Prevents scope creep.
* Reduces rework.
* Maintains project transparency.
* Protects project timelines and budgets.

---

## Summary

When UI mockups are provided without detailed functional requirements, the design becomes the primary reference for implementation. The team must extract functional requirements, define responsive and accessibility standards, create implementation specifications, and establish clear acceptance criteria. Through structured reviews, component mapping, and controlled change management, the team can successfully transform approved designs into a scalable, maintainable, and user-friendly solution.

---

## Related Scenarios

| Scenario | When to Use |
|---|---|
| [📋 Scenario 1: Client Provides FRD](./scenario-1-client-provides-frd.md) | Full requirements document exists |
| [🔍 Scenario 2: No FRD](./scenario-2-no-frd.md) | No formal requirements — needs discovery |
| 🎨 **You are here** — Scenario 3: UI Mockup | Visual designs are the primary reference |
| [⚡ Variations & Edge Cases](./variations-edge-cases.md) | Partial FRD, POC, API-only, legacy |

> **Next Phase:** [Solution Design →](../design-phase.md)
