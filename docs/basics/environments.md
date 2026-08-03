# Environments

An **environment** is an independent copy of your application (frontend, backend, and database). Each environment runs separately, so changes made in one environment do not affect the others.

> 💡 **Why multiple environments exist**: Having multiple environments lets developers test changes safely without affecting real users or production data.

---

## Real-World Analogy: The Restaurant Kitchens

Think of environments like different kitchens in a restaurant business:

- **Local**: Your practice kitchen at home where you experiment with recipes.
- **Preview**: A temporary pop-up kitchen for a single dish review.
- **Dev**: The team's shared test kitchen where all cooks combine their dishes.
- **Staging**: A full rehearsal kitchen that matches the actual restaurant setup.
- **Production**: The main restaurant kitchen serving real paying customers.

---

## The 5 Environments Flow

Code moves progressively from left to right as confidence in the changes grows:

```mermaid
flowchart LR
    Local["💻 Local\n(Developer laptop)"] --> Preview["🔍 Preview\n(Automated PR test)"]
    Preview --> Dev["🧪 Dev\n(Shared team server)"]
    Dev --> Staging["🎭 Staging\n(Production rehearsal)"]
    Staging --> Prod["🚀 Production\n(Live users)"]

    style Local fill:#f0ecff,color:#19105b,stroke:#ff6196,stroke-width:2px
    style Preview fill:#f0ecff,color:#19105b,stroke:#ff6196,stroke-width:2px
    style Dev fill:#f0ecff,color:#19105b,stroke:#ff6196,stroke-width:2px
    style Staging fill:#ff6196,color:#fff,stroke:#ff4785,stroke-width:2px
    style Prod fill:#19105b,color:#fff,stroke:#0d0a33,stroke-width:2px
```

### Environment Comparison

| Environment | Used By | Purpose | Typical Data |
|---|---|---|---|
| **Local** | Developer | Run and test the application on your own computer (via Docker Compose) | Fake / sample seed data |
| **Preview** | Reviewers / QA | Temporary environment spun up automatically per Pull Request for testing | Sample test data |
| **Dev** | Engineering Team | Shared integration testing after code is merged to the main branch | Synthetic data (*fake sample data for testing*) |
| **Staging** | QA / Product Managers | Final validation and rehearsal — matches production setup as closely as possible | Anonymized / production-like data |
| **Production** | End Users | Live application accessed by real customers | Real, sensitive production data |

> 📌 **What is Preview?**: **Preview** is a temporary, disposable environment created automatically for each Pull Request. It allows reviewers to test the live changes in a browser before code is merged into the main branch.
>
> 📌 **What is Synthetic Data?**: **Synthetic (or seed) data** refers to fake, sample data generated specifically for development and testing without exposing real user records.

---

## Environment Variables & Configuration

Some values, such as database passwords or API URLs, are different in each environment. Instead of writing these values directly in the code (hardcoding), we store them as **environment variables**. 

This allows the **exact same Docker image** to run in every environment with different runtime configurations.

```mermaid
flowchart TB
    Image["📦 Same Docker Image"]
    Image --> Local["Local Container\n+ .env.local"]
    Image --> Dev["Dev Container\n+ .env.dev"]
    Image --> Staging["Staging Container\n+ .env.staging"]
    Image --> Prod["Prod Container\n+ Secrets from Vault / AWS"]

    style Image fill:#ff6196,color:#fff,stroke:#ff4785,stroke-width:2px
```

### Example `.env` Configuration Files

```bash
# .env.dev
DATABASE_URL=postgres://dev-db.internal:5432/app
LOG_LEVEL=debug
PAYMENT_GATEWAY_URL=https://sandbox.payments.example.com

# .env.production
DATABASE_URL=postgres://prod-db.internal:5432/app
LOG_LEVEL=info
PAYMENT_GATEWAY_URL=https://api.payments.example.com
```

### The `.env.example` Template File

Since `.env` files contain sensitive environment-specific values, they are added to `.gitignore` and **never committed** to Git repositories.

To inform developers which variables the application requires, projects include a **`.env.example`** template file:

- **Committed to Source Control**: Acts as a public blueprint listing all required environment variable keys with dummy/placeholder values.
- **Local Setup Workflow**: Developers copy `.env.example` to create their local `.env.local` file and fill in their local values.

```bash
# .env.example (Safe template committed to Git)
DATABASE_URL=postgres://user:password@localhost:5432/dbname
LOG_LEVEL=debug
PAYMENT_GATEWAY_URL=https://sandbox.payments.example.com
API_SECRET_KEY=your_api_key_here
```

### Common Environment Variables

| Variable (Example) | Purpose |
|---|---|
| `DATABASE_URL` | Connection string the backend uses to connect to its database |
| `API_BASE_URL` | URL where the frontend sends API requests |
| `LOG_LEVEL` | Logging verbosity (`debug` in Dev, `info` or `warn` in Production) |
| `NODE_ENV` | Controls framework behavior (e.g., enabling development error pages vs production optimization) |

> 🔒 **Note on Secrets**: Sensitive credentials such as database passwords, API keys, and JWT secrets are passed via environment variables, but in remote environments (Dev, Staging, Prod), they are stored securely in secret management systems (such as HashiCorp Vault or AWS Secrets Manager) rather than written into local `.env` files.

---

## Where This Leads Next

- [Cloud Basics](/basics/cloud/overview) — how applications and environments are hosted in the cloud
- [Deployment & Operations Overview](/operations/overview) — how code moves automatically between environments
- [Environment Strategy](/engineering/environments) — concrete standards for configuring environments in this organization
