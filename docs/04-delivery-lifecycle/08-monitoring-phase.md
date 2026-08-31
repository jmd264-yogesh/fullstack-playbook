# Monitoring & Hypercare

Software delivery does not end at deployment. The Monitoring & Hypercare phase focuses on ensuring the system operates reliably in production, proactively detecting anomalies, and responding efficiently to incidents. 

"Hypercare" refers to the elevated state of monitoring and rapid-response readiness immediately following a major release (typically lasting 1 to 2 weeks).

## Entry Criteria
- Code has been successfully deployed to Production.
- Production smoke tests have passed.
- Traffic is actively being routed to the new system/feature.



## What is Monitoring in Full Stack (FS) Applications?

In a Full Stack application, monitoring is the continuous practice of observing, collecting, and analyzing operational data across all components of the application. Unlike single-tier systems, FS monitoring must bridge client-side behaviors, server-side code, backend services, databases, and host infrastructure to form a coherent picture of system health.

### What it Involves
* **Frontend Observability**: Tracking client-side runtime errors, uncaught exceptions, page load performance (Core Web Vitals), resource delivery issues, and user-perceived latencies across different devices and browsers.
* **Backend & API Telemetry**: Tracking API call rates, transaction success rates, response latencies, server CPU/memory, database connection pools, queue states, and execution metrics of background processors.
* **Log Aggregation & Correlation**: Consolidating logs from the user's browser, load balancers, container runtime environments, database engines, and third-party systems into a central registry where requests can be traced end-to-end via correlation IDs.
* **Proactive Alerting**: Establishing triggers based on Service Level Objectives (SLOs) to page engineers when anomalies occur, rather than relying on user reports.
* **Infrastructure Cost & Resource Tracking**: Continually auditing resource utilization to adjust compute resources and database sizing to align with demand.



## The Purpose of Monitoring vs. Infrastructure Cost

The primary goal of monitoring is to achieve high availability, preserve customer trust, and reduce the Mean Time to Resolution (MTTR) when issues arise. However, telemetry data generates significant storage, ingestion, and network egress costs. Monitoring must be managed as an investment with budget boundaries:

* **Ingestion Limits & Sampling**: In high-traffic systems, capturing every transaction or tracking every successful API call is cost-prohibitive. We implement sampling strategies (e.g., only tracing 5% of successful backend requests or 10% of frontend user transactions) while capturing 100% of errors.
* **Log Level Governance**: Production log levels must default to `INFO` or `WARN` in normal environments. Verbose `DEBUG` or `TRACE` logs should only be activated for temporary, scoped troubleshooting to prevent massive, unexpected cloud bills.
* **Retention and Archiving Policies**: Store hot, searchable log data for a short window (e.g., 14 to 30 days) and apply automatic lifecycle rules to migrate older logs to cheaper cold storage (e.g., Azure Blob Storage Cool tier) or delete them entirely if they are not needed for compliance.


## Primary Observability & Tooling Stack

For our Full Stack applications, we standardize on three primary platforms for centralized logging, infrastructure tracking, performance analysis, and exception management:

### 1. Azure Logs (Azure Monitor & Log Analytics)
Azure Logs is our default platform for cloud-native infrastructure, host, and application console logging.
* **Scope**: Aggregates infrastructure metrics (CPU/Memory utilization, database connections), container logs from Kubernetes, App Service console output, and network diagnostics.
* **KQL Queries**: Uses Kusto Query Language (KQL) to scan millions of lines of logs quickly, allowing developers to query, analyze, and build dashboards.
* **Cost Control**: Development and Staging resource groups must enforce a strict daily ingestion limit (e.g., 5GB/day) and auto-retention rules of 30 days to limit costs.

### 2. Sentry
Sentry is our primary tool for real-time application crash reporting, exception tracking, and performance tracing.
* **Scope**: Catches uncaught frontend JavaScript exceptions, React/Next.js component crashes, and backend runtime exceptions (Node.js, Python, PHP Laravel).
* **Developer Experience**: Maps minified frontend stack traces back to original source code using sourcemaps, records user actions (breadcrumbs) leading up to an error, and associates errors with specific release versions.
* **Cost Control**: Standard configurations must use custom sampling rates in production (e.g., 100% exception tracking but only 10% performance tracing transactions) to stay within budget thresholds.

### 3. Datadog
Datadog is our unified APM (Application Performance Monitoring), distributed tracing, and infrastructure visualization platform.
* **Scope**: Provides deep visibility into end-to-end request journeys (distributed tracing) across microservices, database performance analysis, and frontend Real User Monitoring (RUM).
* **Core Feature**: Correlates frontend user sessions with backend traces to isolate performance bottlenecks and database locks.
* **Cost Control**: Datadog APM can incur substantial charges. Teams must implement ingestion filtering (e.g., dropping successful trace spans and only retaining errors/slow calls) and configure S3/Azure Blob Log archives instead of high-retention hot indexes.

*Additional authorized tools: Prometheus/Grafana, ELK Stack, OpenTelemetry.*
