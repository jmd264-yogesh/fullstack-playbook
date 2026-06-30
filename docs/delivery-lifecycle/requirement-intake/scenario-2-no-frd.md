# Scenario 2: No FRD – Discovery & Elicitation

When no formal Functional Requirements Document (FRD) exists, the project begins with a structured **requirements discovery and elicitation phase**. The objective is to understand the client's business goals, identify user needs, and define the project scope before development begins.

## 1. Discovery Workshop

The Project Manager (PM) and Business Analyst (BA) facilitate discovery sessions with stakeholders to gather requirements and understand business processes.

### Activities

* Conduct stakeholder interviews.
* Review existing business processes and workflows.
* Identify business objectives, pain points, and success criteria.
* Facilitate brainstorming and requirement gathering sessions.
* Create user journey maps and process flow diagrams.
* Conduct collaborative workshops with business and technical teams.

### Objectives

* Understand who the users are.
* Define business goals and expected outcomes.
* Identify functional and non-functional requirements.
* Establish project scope and priorities.

### Deliverables

* Discovery workshop notes
* Stakeholder requirement register
* Business process documentation
* User journey maps
* Initial project scope document

---

## 2. User Stories & Wireframes

Once requirements have been gathered, the team translates them into user-focused requirements and visual representations.

### User Story Creation

Requirements are documented as user stories following the format:

> As a [User Role], I can [Action] so that [Business Benefit].

### Example

**User Story**

> As a Project Manager, I can view project progress dashboards so that I can monitor project status in real time.

### Acceptance Criteria

Each user story should include clear acceptance criteria.

**Example**

* Given a valid login
* When the Project Manager accesses the dashboard
* Then project status metrics are displayed correctly
* And data is refreshed every 15 minutes

### UX Activities

The UX Designer creates:

* Low-fidelity wireframes
* Screen mockups
* User flow diagrams
* Click-through prototypes

### Purpose

Wireframes and prototypes help:

* Validate requirements with stakeholders
* Visualize the user experience
* Identify gaps early in the process
* Reduce development rework

### Deliverables

* User story backlog
* Acceptance criteria
* Wireframes and mockups
* User flow diagrams
* UX recommendations

---

## 3. Backlog Grooming & Estimation

After the initial requirements have been documented, the team conducts backlog refinement sessions.

### Activities

* Review and clarify user stories.
* Split large stories into smaller deliverable units.
* Identify dependencies and technical constraints.
* Prioritize stories based on business value.
* Estimate development effort using story points or effort hours.
* Validate completeness with stakeholders.

### Team Responsibilities

#### Business Analyst / Product Owner

* Clarify requirements.
* Prioritize backlog items.
* Secure stakeholder approval.

#### Development Team

* Assess technical feasibility.
* Identify risks and dependencies.
* Provide effort estimates.

#### QA Team

* Review acceptance criteria.
* Identify test scenarios and edge cases.

### Deliverables

* Prioritized product backlog
* Story point estimates
* Sprint-ready user stories
* Stakeholder-approved scope

---

## 4. Tools & Deliverables

The discovery phase typically produces a collection of project artifacts that serve as the foundation for development.

### Core Deliverables

#### Requirements Documentation

* Project scope document
* User story backlog
* Business requirements documentation

#### Design Documentation

* Wireframes
* Mockups
* User flows
* Prototype demonstrations

#### Planning Documentation

* Project roadmap
* Sprint plan
* Release plan

#### Traceability Documentation

* Requirements traceability matrix (if required)
* Requirement approval records

### Common Tools

#### Requirement Management

* Jira
* Confluence
* Azure DevOps
* Trello

#### Design & Prototyping

* Figma
* Balsamiq
* Adobe XD

---

## 5. Acceptance Criteria & QA Planning

Acceptance criteria define the conditions that must be satisfied before a feature is considered complete.

### Benefits

* Provides a clear definition of success.
* Reduces misunderstandings between teams.
* Supports accurate testing.
* Ensures stakeholder expectations are met.

### QA Activities

QA engineers begin planning during discovery by:

* Reviewing user stories.
* Creating high-level test scenarios.
* Identifying positive and negative test cases.
* Documenting edge cases and exception handling.

### Example Test Scenario

**Requirement**

Generate a project status report.

**Test Scenarios**

* Verify all user roles appear in the report.
* Verify data is sorted correctly.
* Verify report filters function as expected.
* Verify export functionality works successfully.

---

## 6. Risks & Mitigation

### Risk: Incomplete Requirements

Without a formal FRD, important functionality may be overlooked during discovery.

#### Mitigation

* Conduct cross-functional workshops involving:

  * Business stakeholders
  * Business Analysts
  * Developers
  * UX Designers
  * QA Engineers
* Use process maps and user journey diagrams.
* Validate requirements frequently with stakeholders.

---

### Risk: Conflicting Stakeholder Expectations

Different stakeholders may have differing interpretations of project goals.

#### Mitigation

* Establish a single source of truth for requirements.
* Conduct regular review and approval sessions.
* Document decisions and assumptions.
* Obtain stakeholder sign-off on major requirements.

---

### Risk: Scope Evolution During Development

As stakeholders see prototypes and early deliverables, new requirements may emerge.

#### Mitigation

* Maintain an active backlog refinement process.
* Prioritize changes through formal review.
* Assess impact before adding new requirements.
* Communicate scope changes clearly to all stakeholders.

---

## 7. Timeline & Planning

Discovery-driven projects generally require more upfront planning compared to projects that begin with a completed FRD.

### Typical Timeline

| Phase                         | Duration               |
| ----------------------------- | ---------------------- |
| Discovery Workshops           | 1–2 Weeks              |
| Requirement Documentation     | 1 Week                 |
| Wireframing & Prototyping     | 1–2 Weeks              |
| Backlog Grooming & Estimation | 1 Week                 |
| Sprint Planning               | 2–3 Days               |
| Development Phase             | Based on Project Scope |

### Planning Considerations

* Stakeholder availability for workshops and reviews.
* Feedback and approval cycles.
* Design validation sessions.
* Technical feasibility assessments.
* Resource allocation and sprint planning.

### Deliverables

* Project roadmap
* Sprint plan
* Milestone schedule
* Resource allocation plan

---

## Summary

When no FRD is available, the project begins with a structured discovery and elicitation process. Through workshops, stakeholder interviews, user story creation, wireframing, backlog refinement, and iterative validation, the team establishes a clear understanding of business needs and project scope. The outcome is a prioritized backlog, validated requirements, design artifacts, and a development-ready plan that minimizes ambiguity and reduces project risk.
