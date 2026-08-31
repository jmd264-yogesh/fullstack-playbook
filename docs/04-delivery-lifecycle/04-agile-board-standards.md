# Agile Board Standards (Jira / Azure DevOps)

A well-maintained Agile board is the *single source of truth* for the engineering team's current status, velocity, and delivery predictability. Regardless of the tool used (Jira, Azure DevOps, etc.), all full-stack engineering teams must adhere to the following taxonomy, workflow, and hygiene standards.

## 1. Project Knowledge Base (Wiki Standards)

Before tickets are created, the Agile board workspace must be directly coupled with a living Wiki space. This document repository serves as the engineering team's unified source of truth and is jointly maintained by the **Project Manager** and **Tech Lead**.

### Mandatory Wiki Core Architecture
* **Architecture & Tech Stack Blueprint:** Comprehensive architecture diagrams, data flow representations, data schemas, and explicit system framework dependency versions.
* **Developer Onboarding Run-book:** Clear, step-by-step local machine configuration setups, mandatory environment variables configuration grids, and secure engineering repository access links.
* **API & Integration Ledger:** Complete descriptions of internal API microservices, exposed endpoints, payload examples, and external third-party API integration secrets mapping schemas.
* **Team Roster & Roles Matrix:** A transparent operational matrix detailing active team members, specialized core competencies, designated primary/secondary on-call roles, and escalation contact paths.
* **Decision Log (ADR):** A historical log of Architectural Decision Records tracking major technological choices, structural shifts, and framework paths taken throughout the lifecycle of the project.

## 2. Work Item Taxonomy & Hierarchy

To provide consistent reporting and ensure absolute traceability from high-level enterprise goals down to individual code commits, work items must follow a strict structural hierarchy.

### The Agile Hierarchy
![Agile Hierarchy](/agile-board-standards/agile_hierarchy.png)

## 3. Ticket Anatomy & Definition of Ready (DoR)

No work item can be pulled into an active sprint unless it meets the **Definition of Ready (DoR)**. A ticket is considered "Ready" only when it is fully fleshed out, eliminating ambiguity before development begins.

### Required Board Fields
Every ticket must have the following metadata populated prior to sprint commitment:
* **Story Points:** A relative measure of complexity, risk, and effort assigned strictly to *User Stories*.
* **Original Hours:** The baseline time estimation assigned strictly to technical *Tasks/Sub-Tasks* before work begins.
* **Estimated Hours (Remaining):** The active field updated daily by developers to reflect the actual time left to complete a task.
* **Reviewed By:** The designated peer engineer or tech lead responsible for reviewing the code and validating the solution.
* **Reviewer Efforts:** Dedicated hours allocated specifically for code review and testing phases, tracked independently from development hours.

### Recomended Board Fields
* **Start and End Dates:** The explicit timestamps marking when active development commences and when the ticket fully satisfies the Definition of Done.
* **Priority:** A standard classification scale (e.g., Highest/P1 to Lowest/P4) used to determine the execution order of tickets.

### Description & Evidence Standards
* **Detailed Descriptions:** Stories must follow the standard template: *Action:* and *Outputs:*. It must include explicit **Acceptance Criteria (AC)** written in a clear, testable format.
* **Bug Requirements:** Every bug ticket must explicitly contain:
    1.  *Steps to Reproduce* (numbered list).
    2.  *Expected Behavior* vs. *Actual Behavior*.
    3.  *Environment details* (as specified above).
* **Daily Progress Updates:** To maintain asynchronous transparency, developers must add a brief comment at the end of each working day detailing:
    * What was accomplished today.
    * What is planned for tomorrow.
    * Any micro-blockers encountered.
* **Evidence Attachments & Links:** Any UI/UX modification, feature completion, or bug resolution *must* include visual evidence (waveforms, screenshots, or screen recordings) attached directly to the ticket. Additionally, developers must include any relevant **links** (e.g., Figma design mockups, external documentation, log URLs, or related tickets) to provide complete context.
* **Pull Request (PR) Mapping:** The Pull Request URL must be explicitly linked within the ticket's development section or comments to maintain traceability.
![Technical Task Reference Blueprint](/agile-board-standards/Devops_Task_Ticket.png)

## 4. Workflow States & Transition Governance

Tickets must move linearly across the board. Skipping states or ignoring column constraints distorts team velocity metrics.

### Standard Board Columns
1.  **Backlog:** The repository for all unprioritized, unrefined future work.
2.  **To Do (Ready):** Refined, estimated tickets that have met the DoR and are committed to the active sprint.
3.  **Doing (In Progress):** Work that an engineer is actively developing.
4.  **Hold / Blocked:** Work halted due to external dependencies, missing information, or technical hurdles. *Every block requires an immediate explanatory comment tag.*
5.  **In Review:** Code is complete, and an open Pull Request is awaiting peer code review, architectural sign-off, or initial QA verification.
6.  **Done:** The ticket has passed all quality gates and fully satisfies the *Definition of Done (DoD)*.

### Workflow Governance Rules
* **Work-In-Progress (WIP) Limits:** To prevent multi-tasking bottlenecks, a strict WIP limit is enforced on the **Doing** and **In Review** columns. *Rule:* **achievable no.of active items per engineer** across these columns combined.
* **No Backward Movement & Blocker Protocol:** Tickets must generally maintain forward momentum to preserve burndown chart accuracy. Instead of dragging tickets backward (e.g., from "In Review" back to "Doing"), adhere to the following protocol for exceptions and blockers:
    * **Technical Blockers & QA Failures:** If a story fails QA, or if it is identified that an unforeseen prerequisite task must be completed first, create a sub-task or defect ticket to address the missing work. Move the parent ticket to **Hold / Blocked** while the sub-task is completed.
    * **Missing Client Dependencies:** If active work stalls because required details, assets, or data from the client have not been provided, move the ticket to **Hold / Blocked** immediately.
    * **Scope Shifts:** If the scope of the ticket fundamentally changes due to shifting client requirements, move the ticket to **Hold / Blocked** or return it entirely to the **Backlog** for complete re-evaluation and re-estimation. 
    * > ⚠️ **Mandatory Commenting Rule:** In all three of the scenarios above, the exact reason for the block or movement *must* be explicitly detailed in the ticket's comments immediately upon changing the status.

## 5. Tag Labeling Conventions

Standardized tags enable automated reporting engines to extract key metrics (such as DORA and Sprint Predictability) without manual overhead.

### Categorization Labels
* **Environment Tags:** `env:prod`, `env:staging`, `env:dev` (Critical for isolating bug origins).
* **Component Tags:** `frontend`, `backend`, `database`, `infra` (Allows specialized engineers to filter the board instantly).
* **Severity Scales (Bugs):** `sev1` (Critical Outage/Blocker) down to `sev4` (Cosmetic Flaw).

### Governance & Metric Labels
* **Technical Debt (`tech-debt`):** Used to isolate architecture refactoring, dependency updates, or code cleanup. *Standard:* Engineering teams must allocate **~20% of overall sprint capacity** to resolving items bearing this tag.
* **Unplanned Work (`unplanned`):** Applied to any ticket injected into the active sprint *after* the Sprint Planning session has concluded. This tag is critical for measuring sprint predictability and scope creep.

## 6. Capacity Planning & Estimation Standards

Estimation bridges the gap between technical complexity and business predictability. Two distinct units of measurement are used:

### Complexity Estimation (Story Points)
* **The Fibonacci Sequence:** User Stories are estimated using relative sizing points (`1, 2, 3, 5, 8, 13`). Story points represent **Complexity + Risk + Effort**, *not hours*.
* **The 8-Point Breakdown Rule:** Any User Story estimated at an **8 or higher** represents too much inherent risk. It **must** be broken down into two or more smaller, isolated user stories before it can be introduced to a sprint.

### Effort Estimation (Hours)
* **Granular Task Breakdown:** Technical Sub-Tasks are estimated strictly in **Hours**. 
* **Time Boxing Rule:** Sub-tasks should ideally range between `2 to 6 hours`. No individual sub-task should exceed `8 hours` (one business day). If a task is larger, break it down further (e.g., instead of "Build API backend - 16 hours", split into database migration, controller logic, and integration testing sub-tasks).

## 7. Sprint Ceremonies & Operational Run-Books

To maintain absolute board hygiene, ceremonies must follow a strict execution protocol rather than turning into casual status update meetings.

### Backlog Refinement (Mid-Sprint Ritual)
* **Timing:** Occurs once mid-sprint for 1 hour.
* **Primary Objective:** Prepare the backlog so that the top items are fully compliant with the Definition of Ready (DoR) for the upcoming 1-2 sprints.
* **The Run-Book:**
    1.  Tech Lead (TL) introduces the highest priority items from the product backlog.
    2.  The Engineering Team reviews the description, validates the Acceptance Criteria, and uses Planning Poker to assign **Story Points**.
    3.  If a ticket lacks clarity or fails the 8-Point Rule, it is sent back for clarification and *cannot* be marked as "Ready."

### Sprint Planning (Day 1 Run-Book)
* **Timing:** Last day of the current sprint or first day of the new sprint timebox (typically a 2-week cadence).
* **Primary Objective:** Establish the Sprint Goal and commit to a realistic scope of work based on real team capacity.
* **The Run-Book:**
    1.  **Establish the Sprint Goal:** The TL presents the core business objective of the sprint. The team aligns on a singular, clear *Sprint Goal statement*.
    2.  **Pull the Backlog:** Pull "Ready" stories from the top of the refined backlog into the sprint until the estimated workload aligns with the team's historical velocity.
    3.  **Task Breakdown & Hour Allocation:** Developers collaboratively break down the selected User Stories into technical Sub-Tasks, assigning **Original Hours** and designating peer reviewers.
    4.  **Official Commitment:** The team confirms commitment to the Sprint Goal, and the Scrum Master officially clicks "Start Sprint" on the board.

### Daily Stand-up (The Right-to-Left Run-Book)
* **Timing:** Daily, timeboxed to 15 to 30 minutes.
* **Primary Objective:** Synchronize team efforts, clear engineering blocks, and optimize the day's flow. It is **not** an individual status report to the manager.
* **The Run-Book (Walking the Board Right-to-Left):**
    Instead of going person-by-person, the facilitator shares the screen and steps through active tickets starting from the column closest to completion:
    1.  **Review the "In Review" Column:** *What do we need to do to get this code merged today? Who can pick up this open PR right now?*
    2.  **Review the "Hold / Blocked" Column:** *What is stopping this ticket? Who owns the escalation to unblock it?*
    3.  **Review the "Doing" Column:** *Are there any hidden complexities? Are we on track to meet our remaining hours estimate? Is anyone hitting a WIP limit constraint?*
    4.  **Update Remaining Hours:** Developers must ensure their "Estimated Hours (Remaining)" fields are updated *before* the stand-up begins to keep the sprint burndown chart perfectly accurate.

### Sprint Retrospective (End-of-Sprint Ritual)
* **Timing:** Last day of the sprint.
* **Primary Objective:** Evaluate team processes and implement continuous continuous improvement metrics.
* **The Run-Book:**
    1.  The team accesses a dedicated **Retro Board** structured into key operational columns such as: *What Went Well?*, *What Didn't Go Well?*, and *Action Items*, etc.
    2.  **Asynchronous Brainstorming (5-10 mins):** Team members silently add cards to the respective columns.
    3.  **Grouping & Dot Voting:** Similar cards are grouped together, and the team votes on the most critical topics to discuss.
    4.  **Action Item Formulation:** For every major issue discussed, a concrete, actionable item must be designed. *Rule:* Every Action Item must be written as a formal ticket, assigned to a specific owner, and injected directly into the next sprint's backlog to guarantee accountability.

## 8. The Definition of Done (DoD) Checklist

A User Story can never be dragged into the **Done** column based on an engineer's verbal confirmation. It must strictly fulfill the following binary checklist:

### Automated & Pipeline Validation
- Code is successfully branched, reviewed, and merged into the primary integration/`main` branch.
- Automated Continuous Integration (CI) pipelines have executed successfully.
- Automated code linting and formatting rules pass with zero critical errors.
- Unit Test suite runs successfully, achieving a minimum coverage threshold of **>80%**.
- Security scanners (Static Application Security Testing / SAST) report zero high-severity vulnerabilities.

### Functional & Documentation Sign-off
- The feature is completely deployed into the isolated Staging/Integration environment.
- Automated end-to-end (E2E) integration or regression tests have passed.
- Quality Assurance (QA) engineers have manually verified the Acceptance Criteria and issued a formal sign-off.
- Feature toggles/flags are appropriately configured and verified for the target environment.
- Project documentation (including Wiki structural updates, Swagger API definitions, or technical README files) has been updated to reflect the new state.
