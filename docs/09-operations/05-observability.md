# Observability & Monitoring

## 1. The Three Pillars
- **Logs**: Structured JSON logs. Avoid multi-line string logs.
- **Metrics**: Time-series data tracking RPS (Requests Per Second), Error Rates, and Latency.
- **Traces**: Distributed tracing (e.g., OpenTelemetry, Jaeger) is mandatory for microservices to track a request's journey across network boundaries.

## 2. Service Level Objectives (SLOs)
- **SLI (Indicator)**: E.g., The percentage of HTTP 200 responses in the last 5 minutes.
- **SLO (Objective)**: E.g., 99.9% of requests must succeed.
- **Error Budgets**: If a team burns through their error budget (drops below 99.9%), feature development is halted, and the team must exclusively work on reliability.

## 3. Correlation IDs
- Every incoming HTTP request at the API Gateway receives a unique `x-correlation-id` header. This ID must be injected into all logs and passed downstream to all other microservices to allow for exact tracing of a failed request.
