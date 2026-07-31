# Technology Radar & Stack Selection

The CoE maintains a strict **Technology Radar** to prevent technology sprawl, which fractures engineering expertise and complicates security patching.

## Technology Radar Rings

Technologies are classified into four rings. Teams must select technologies from the **Adopt** ring for all new production projects.

### 1. Adopt (Golden Paths)
Technologies proven at scale within the enterprise. Fully supported by the Platform and DevOps teams.
- **Frontend**: React, Next.js, Tailwind CSS, Zustand, React Query.
- **Backend**: Node.js (NestJS), PHP (Laravel), GraphQL (as an API layer alongside REST — see [API Standards](/architecture/api-standards) and [GraphQL Standards](/coding-standards/backend/graphql)).
- **Database**: PostgreSQL, MySQL, MongoDB, Redis.
- **Infrastructure**: Docker, Kubernetes, Terraform, AWS/Azure.

### 2. Trial
Technologies currently being tested in low-risk production systems.
- **Examples**: Apollo Federation, Go (Golang).
- **Usage**: Requires ARB approval to use. Support from DevOps may be limited.

### 3. Assess
Emerging technologies being explored in hackathons or proof-of-concepts (PoCs).
- **Examples**: Rust, Bun (Runtime), HTMX.
- **Usage**: Strictly prohibited for production systems.

### 4. Hold / Deprecated
Technologies that are being phased out.
- **Examples**: AngularJS (v1), PHP 7.x, Redux (for simple state), jQuery.
- **Usage**: Absolutely no new projects may use these. Existing projects must prioritize migration paths.

## Tech Stack Justification
When starting a project, the Tech Lead must document the chosen stack in an **Architecture Decision Record (ADR)**. 
For example, justifying PostgreSQL over MongoDB: *"The domain requires strict ACID compliance and complex multi-table transactions, which are better served by a relational model."*
