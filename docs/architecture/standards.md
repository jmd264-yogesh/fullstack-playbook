# Architecture Standards

Defining clear boundaries is critical for scalable engineering. We use these architectural standards to ensure consistency across the enterprise.

## 1. Monorepo vs Polyrepo Guidance
- **Default to Monorepo (Turborepo/Nx)**: For a full-stack application (e.g., Next.js frontend + NestJS backend) that share the same domain logic and release cycle, a monorepo is mandatory. It allows for sharing DTOs (TypeScript types) seamlessly across the stack.
- **When to use Polyrepo**: When building isolated, generic microservices that are consumed by multiple, entirely separate products with different lifecycles.

## 2. Event-Driven Patterns
For decoupled, highly scalable systems, we favor asynchronous event-driven architectures.
- **Message Broker**: Kafka or RabbitMQ.
- **Pattern**: Choreography over Orchestration. Services should emit domain events (e.g., `OrderPlaced`) rather than directly calling other services via synchronous HTTP/REST, which creates tight coupling and cascading failures.
- **Idempotency**: All event consumers MUST be idempotent to handle potential at-least-once delivery duplicates.

## 3. Microservice Checklist
Before creating a new microservice, the Architect must ensure it meets these criteria:
- [ ] Does it own its own database? (Microservices must never share a database).
- [ ] Can it be deployed independently without requiring another service to be deployed simultaneously?
- [ ] Does it have a dedicated Health Check endpoint (`/health`)?
- [ ] Is it stateless?
