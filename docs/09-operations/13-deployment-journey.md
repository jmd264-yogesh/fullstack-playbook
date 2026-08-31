# Deployment Journey

> You just merged a PR. What happens between here and "it's live, and it's safe"? This page is that road, start to finish.

Deployment is the last mile - the part of engineering where good code either reaches users reliably or falls over in front of them. It's also the part teams most often treat as an afterthought. This page treats it as a first-class discipline: a repeatable journey with a clear map, so that shipping to production is boring, predictable, and reversible.

The guidance here is **stack-neutral**. The principles hold whether you deploy a Next.js app, a NestJS API, or a Laravel monolith. Where a concrete example helps, we label it by stack (GitHub Actions, JS/TS, NestJS, Laravel) - but nothing here is mandatory for one particular toolchain.

> **How this fits the rest of the section:** [Deployment & Operations Overview](/operations/overview) covers the whole commit-to-incident-response lifecycle, including release management, observability, logging, and disaster recovery. This page zooms into one part of that - the specific chapters between "PR merged" and "production readiness" - and gives it a reading order.

## Two rules that hold the whole journey together

Everything on the pages below comes back to these:

1. **Automate everything you can.** A human running a manual step is a human who will eventually forget it, do it at 2am, or do it differently than last time. If a check or a deploy can be scripted, it should be - and then it runs the same way every time.
2. **Every deploy must be reversible.** You will ship a bad change one day. The question is never *if* but *how fast can we undo it*. Rollback is not a fallback plan; it's a design requirement.

## The journey, stage by stage

| # | Stage | The question it answers | Page |
|---|---|---|---|
| 1 | **Overview** | What's the whole road? | You're here |
| 2 | **Preparing for CI Checks** | How do I make the pipeline pass on the first try? | [Preparing for CI Checks](/operations/preparing-for-ci) |
| 3 | **CI/CD Pipeline** | What does the pipeline do automatically once I push? | [CI/CD Pipeline](/coding-standards/ci-cd) |
| 4 | **Quality & Security Scanning** | How do we catch bugs and vulnerabilities before users do? | [Security Scanning](/operations/security-scanning) |
| 5 | **Docker & Containerization** | How do we package the app so it runs identically everywhere? | [Docker](/coding-standards/infrastructure/docker) |
| 6 | **Deployment Strategies** | How do we roll it out - and roll it back - without downtime? | [Deployment Strategies](/operations/deployment-strategies) |
| 7 | **Production Readiness** | Is it actually ready to serve real traffic? | [Production Readiness](/operations/production-readiness) |
| 8 | **DevSecOps Standards** | What security policy runs through all of the above? | [DevSecOps Standards](/coding-standards/devsecops-standards) |

## How the stages fit together

```
  You                     CI/CD                        Registry            Production
  ───                     ─────                        ────────            ──────────
  write code
      │
  run checks locally ──►  (2) Preparing for CI
      │
  git push ───────────►   (3) Pipeline runs the gates
                              │
                              ├─► (4) Scanning: SAST · SCA · secrets
                              │
                              ├─► build image ──► (5) Docker ──► push ──► [ image:1.4.2 ]
                              │                                                 │
                              └─► deploy to staging                             │
                                      │                                         ▼
                                  (4) DAST against staging          (6) Strategy: rolling /
                                      │                                  blue-green / canary
                                      ▼                                         │
                                  promote ──────────────────────────────────►  ▼
                                                                        (7) Production Readiness:
                                                                            health, rollback,
                                                                            observability

  (8) DevSecOps security policy wraps every box above.
```

## Where this connects to the rest of the playbook

- The [Delivery Lifecycle](/delivery-lifecycle/overview) describes *when* in a project these stages happen; this page describes *how* to do them well.
- Once you're live, [Monitoring & Hypercare](/delivery-lifecycle/monitoring-phase) takes over from Production Readiness.
- Cutting a versioned release is covered in [Release Automation](/delivery-lifecycle/releases).

New to this journey? Read it top to bottom once - it's written as a story. Coming back for a specific answer? Jump straight to the stage in the table above.
