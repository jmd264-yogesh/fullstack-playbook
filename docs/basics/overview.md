# Basics

This section explains the foundational concepts referenced throughout the rest of the playbook — written for engineers who are capable programmers but looking to master full-stack delivery standards, cloud environments, and organizational architecture patterns.

Every other section in this playbook builds upon this material. If a core architectural term or workflow concept feels unfamiliar elsewhere, you will find its baseline explanation here.

---

## Modules in this Section

Each page is designed for quick reading with key concepts, structured tables, visual models, and direct links to advanced guidelines.

| Module | What It Covers |
|---|---|
| 📐 **[Full-Stack Architecture](/basics/full-stack-architecture)** | Client, server, and data tier interactions, HTTP request flows, and modern application state. |
| 🔀 **[Git & Version Control](/basics/git-version-control/overview)** | Version control fundamentals, three-area model, branching models, and resolving merge conflicts. |
| 🌐 **[APIs & HTTP](/basics/apis-http/overview)** | Anatomy of HTTP requests/responses, REST vs GraphQL/gRPC, status codes, and API testing tools. |
| 🗄️ **[Databases](/basics/databases/overview)** | SQL vs NoSQL decision matrix, relational schemas, ORM usage, and database migration strategies. |
| ⚙️ **[Environments](/basics/environments)** | Dev, Staging, and Production environment promotion, environment variables, and `.env.example` templates. |
| ☁️ **[Cloud Computing](/basics/cloud/overview)** | On-premises vs cloud, cloud architecture, IaaS/PaaS/SaaS/FaaS, Shared Responsibility Model, and top cloud providers. |
| 📖 **[Glossary](/basics/glossary)** | Comprehensive index of technical terms, acronyms, and delivery jargon used across this playbook. |

---

## How Full-Stack Concepts Fit Together

Engineering delivery follows a structured pipeline across these foundational areas:

1. **Client & Server Interaction**: The user interface (Frontend UI) triggers HTTP requests to the backend server (Backend API), which processes business logic and queries persistent data (Database).
2. **Version & Code Control**: Code changes are managed through Git, tracked in local and remote repositories, and merged through peer-reviewed Pull Requests.
3. **Automated Pipeline**: Merged code is validated through automated CI/CD pipelines, packaged into container images (Docker), and deployed safely across isolated environments.
4. **Environment Promotion**: Application builds progress through Development (testing), Staging (pre-production verification), and Production (live user traffic).

---

## Next Steps

Read through the modules above in sequence, then proceed to the **[Delivery Lifecycle](/delivery-lifecycle/overview)** section to learn how these concepts operate within real-world project workflows.
