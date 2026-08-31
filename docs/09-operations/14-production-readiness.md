# Production Readiness

> "It works on my machine" and "it's ready for production" are separated by a long list of quiet, boring questions. This page is that list - the stuff that never shows up in a demo but decides whether 3am is peaceful.

Chapter 7 of the [deployment journey](/operations/deployment-journey). Your code is built, scanned, containerized, and you've chosen how to [roll it out](/operations/deployment-strategies). Before it serves a single real user, walk this page. Production isn't a bigger version of your laptop - it has real traffic, real data, real failure, and real consequences, and readiness means having answered for each.

> **How this relates to the [Production Readiness Checklist](/templates/production-readiness):** that page is the short, first-launch-only checklist a Tech Lead signs off on. This page is the fuller reasoning behind it - read it once to understand *why* each item on that checklist exists, then use the checklist itself as the go/no-go gate.

The themes below map to the checklist at the bottom. Read the reasoning once; use the checklist every time you go live.

## Health & lifecycle

Your orchestrator needs to know whether your app is alive and whether it's ready - and they're not the same question.

- **Liveness probe** - "is the process wedged?" If it fails, the platform *restarts* the container. Point it at something cheap that proves the app loop is running.
- **Readiness probe** - "can it serve traffic *right now*?" If it fails, the platform stops sending requests but doesn't restart. Use this for "still connecting to the database" or "warming a cache" - states where the app is alive but not yet useful.
- **Graceful shutdown** - when the platform says "stop," finish in-flight requests, close DB connections, then exit. An app that dies mid-request drops user traffic on every single deploy. Handle the termination signal (`SIGTERM`) and drain.
- **Zero-downtime** - combine readiness probes with a [rolling or blue-green](/operations/deployment-strategies) rollout so a new version only receives traffic once it reports ready, and the old one only retires after the new one is up.

```ts
// Graceful shutdown - stop taking new work, finish what's in flight
process.on('SIGTERM', async () => {
  server.close()              // stop accepting new connections
  await db.close()            // release resources
  process.exit(0)
})
```

## Config & secrets

The same image runs in dev, staging, and prod - what changes is the configuration injected at runtime.

- **Environment parity.** Staging should look like production: same topology, same config shape, comparable data volume. Bugs love the gaps between environments. Each environment gets its own isolated database and config - nothing shared across staging and prod.
- **Config via environment, not code.** No environment-specific values baked into the build. The image is a constant; the environment is the variable.
- **Secrets injected at runtime, never baked in.** Pull them from a vault (Azure Key Vault, AWS Secrets Manager, HashiCorp Vault) at startup. No secret ever lands in the image, the repo, or a committed `.env`. This is enforced upstream by [secret scanning](/operations/security-scanning#secret-scanning); production is where the discipline pays off.

## Data

Data is the part of production you can't roll back, so it demands the most care.

- **Migration strategy at deploy time.** Run migrations as an explicit, ordered step in the deploy - not implicitly on app boot (three replicas booting at once must not all try to migrate). Make them **forward-only and backward-compatible** using the expand-then-contract pattern, so a code rollback never lands on a schema that's already moved past it. See the [database caveat](/operations/deployment-strategies#the-database-caveat).
- **Backups - automated and verified.** Automated backups on a schedule that matches how much data you can afford to lose.
- **Restore drills.** A backup you've never restored is a guess. Periodically restore into a scratch environment and confirm the data is actually usable. Teams discover broken backups during the outage, which is the worst possible time.
- **Know your RPO and RTO.** **RPO** (Recovery Point Objective) = how much data you can afford to lose, which sets backup frequency. **RTO** (Recovery Time Objective) = how long you can afford to be down, which sets how fast your restore path must be. Pick numbers deliberately; don't discover them during a disaster. See [Disaster Recovery & Backups](/operations/disaster-recovery) for the full framework.

## Scale & resilience

Production traffic is spiky, and dependencies fail. Assume both.

- **Horizontal scaling.** Run multiple instances behind a load balancer, and make the app **stateless** so any instance can serve any request (sessions in a shared store, not in memory). Autoscale on real signals - CPU, memory, request rate.
- **Resource limits.** Set CPU/memory requests and limits so one hungry container can't starve its neighbors, and so the scheduler can place work sensibly.
- **Timeouts and retries.** Every outbound call (DB, cache, third-party API) needs a timeout - a call with no timeout can hang forever and take a thread with it. Add bounded retries with backoff for transient failures, and a **circuit breaker** so a struggling dependency doesn't cascade into your app.
- **Rate limiting.** Protect the app from abuse and accidental traffic storms. Global and per-endpoint limits (especially on auth endpoints) are covered as policy in [DevSecOps Standards](/coding-standards/devsecops-standards#api-gateway-api-rate-limiting).

## Observability

You can't operate what you can't see. If the deploy strategy is [canary](/operations/deployment-strategies#canary-deployment), observability is what tells you the canary is sick - but you need it regardless.

- **The three pillars:** **logs** (what happened), **metrics** (how much / how fast - error rate, latency, throughput, saturation), and **traces** (where time went across services). Emit structured logs, not free-text - see [Logging Standards](/operations/logging-standards).
- **Dashboards** for the golden signals - traffic, errors, latency, saturation - so a glance tells you whether the system is healthy. See [Observability](/operations/observability).
- **Alerting that means something.** Alert on user-facing symptoms (error rate up, latency up), not on every twitch. An alert that fires constantly gets ignored, and an ignored alert is worse than none.
- **On-call.** Someone owns production out of hours, with a runbook for the likely failures. Once you're live, [Monitoring & Hypercare](/delivery-lifecycle/monitoring-phase) is where this ongoing operation is defined, and [Incident Management](/operations/incident-management) covers what happens when something breaks.

## Edge

The boundary between the internet and your app has its own checklist.

- **TLS everywhere.** HTTPS only, valid certificates, auto-renewal so nothing expires at midnight. No plaintext, ever.
- **DNS.** Correct records, sane TTLs (lower them *before* a planned cutover so changes propagate fast), and a health-checked failover if you have one.
- **WAF & CDN.** A Web Application Firewall filters malicious traffic before it reaches you; a CDN absorbs load and speeds up static delivery. Both are policy in [DevSecOps Standards](/coding-standards/devsecops-standards#waf-ddos-mitigation) - production is where you confirm they're actually in front of your app.

## Production Readiness Checklist

This is the reasoning behind every line of the [Production Readiness Checklist](/templates/production-readiness) - copy that page into your release ticket and check it off before every go-live.

**Health & lifecycle**
- Liveness and readiness probes configured and tested
- Graceful shutdown handles `SIGTERM` and drains in-flight requests
- Rollout is zero-downtime (probes + rolling/blue-green)

**Config & secrets**
- Staging mirrors production (topology, config shape, data volume)
- All config comes from the environment; nothing env-specific in the image
- Secrets injected at runtime from a vault - none in image, repo, or committed `.env`

**Data**
- Migrations run as an explicit deploy step, forward-only and backward-compatible
- Automated backups scheduled to meet the RPO
- A restore has actually been tested, not just assumed
- RPO and RTO are defined numbers, not guesses

**Scale & resilience**
- Runs as multiple stateless instances behind a load balancer
- Autoscaling configured on real signals
- CPU/memory requests and limits set
- Timeouts on every outbound call; retries + circuit breaker for transient failures
- Rate limiting in place (global + auth endpoints)

**Observability**
- Structured logs, metrics, and traces are flowing
- Golden-signal dashboards exist
- Alerts fire on user-facing symptoms and reach an on-call owner
- Runbook exists for the likely failure modes

**Edge**
- HTTPS enforced with auto-renewing certificates
- DNS records correct; TTLs lowered ahead of a planned cutover
- WAF and CDN confirmed in front of the app

**Rollback**
- Previous known-good image tag is recorded and one command away
- Rollback path has been tested (see [Deployment Strategies](/operations/deployment-strategies#rollback-is-a-first-class-citizen))

If every box is ticked, you're not hoping it'll be fine in production - you've *engineered* for it to be. That's the whole job.
