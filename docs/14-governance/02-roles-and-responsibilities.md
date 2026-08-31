# Roles, Responsibilities & RACI

Clear accountability is critical. We utilize a **RACI Matrix** (Responsible, Accountable, Consulted, Informed) to define ownership across the SDLC.

## Key Engineering Roles

- **Product Owner (PO)**: Owns the business value. Prioritizes the backlog, defines Acceptance Criteria, and signs off on UAT.
- **Tech Lead (TL)**: Owns the technical execution of a specific squad. Mentors developers, conducts code reviews, and drives the Low-Level Design (LLD).
- **Software Architect**: Owns the high-level system design. Defines the technology stack, APIs, and cross-domain integration patterns.
- **DevSecOps Engineer**: Owns the CI/CD pipelines, infrastructure provisioning (IaC), and security scanning configurations.
- **QA Automation Engineer**: Owns the test automation framework (Integration/E2E).

## SDLC RACI Matrix

| SDLC Phase | Product Owner | Tech Lead | Architect | Developer | DevSecOps | QA |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Requirement Intake** | **A/R** | C | I | I | I | I |
| **Solution Design** | C | **R** | **A** | I | C | I |
| **Development** | I | **A** | I | **R** | I | C |
| **Testing (Automated)**| I | **A** | I | **R** | C | **R** |
| **UAT Sign-off** | **A/R** | I | I | I | I | C |
| **Release to Prod** | I | C | I | I | **A/R** | I |

*R = Responsible (Does the work), A = Accountable (Owns the outcome), C = Consulted (Provides input), I = Informed (Kept in the loop).*
