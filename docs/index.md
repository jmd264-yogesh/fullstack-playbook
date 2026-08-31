---
layout: home
hero:
  name: "Full Stack Delivery Playbook"
  text: "One Way to Build. Every Team, Every Project."
  tagline: "From the first conversation about a business problem to the alert that wakes someone up in production - the standards, decision frameworks, and real project examples our engineers actually use, so no two teams reinvent the same decisions."
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: See a Real Case Study
      link: /case-studies/overview
    - theme: alt
      text: Browse Coding Standards
      link: /coding-standards/overview
features:
  - icon: 🎯
    title: Business & Solution Foundations
    details: Think in problems, not technologies. How to choose an application, automation, integration, or data platform based on the actual problem.
    link: /business-foundations/overview
    linkText: Start here
  - icon: 🧭
    title: Basics
    details: Zero-assumed-background primers on full-stack architecture, Git, APIs, databases, Docker, CI/CD, testing, and security.
    link: /basics/overview
    linkText: Start learning
  - icon: 🚀
    title: Delivery Lifecycle
    details: Standardized SDLC phases, from Requirement Intake to Production Hypercare.
    link: /delivery-lifecycle/overview
    linkText: Explore the lifecycle
  - icon: 💻
    title: Development & Coding Standards
    details: Deep architectural guidelines for React, Next.js, NestJS, Laravel, TypeScript, and databases.
    link: /coding-standards/overview
    linkText: View standards
  - icon: 🏗️
    title: Architecture & Engineering
    details: Monorepo vs polyrepo, event-driven patterns, API standards, branching, and environment strategy.
    link: /architecture/standards
    linkText: See architecture standards
  - icon: 📦
    title: Deployment & Operations
    details: Docker, CI/CD, release management, observability, logging, disaster recovery, and incident response.
    link: /operations/overview
    linkText: See the full pipeline
  - icon: 🛡️
    title: Testing & Security Guardrails
    details: Every security control in one reference - secure coding, auth, secrets, CI/CD gates, and production hardening.
    link: /security/testing/overview
    linkText: Review guardrails
  - icon: ✅
    title: Quality Gates & Governance
    details: Fail-fast quality gates, ARB/CAB approval workflows, RACI matrices, and SOC2 compliance automation.
    link: /quality-gates/overview
    linkText: See the gates
  - icon: 📊
    title: KPIs & Metrics
    details: DORA metrics - Deployment Frequency, Lead Time, MTTR, and Change Failure Rate - tracked objectively.
    link: /kpis/engineering-metrics
    linkText: View metrics
---

<div class="custom-stats-section">
  <h2 class="custom-stats-title">Built for High-Velocity Engineering Teams</h2>
  <p class="custom-stats-desc">
    This isn't a wiki nobody reads - it's the operating manual for how we actually build software. Every stack choice, quality gate, and security control here is the default we expect engineers to reach for, so time goes into solving the client's problem instead of re-litigating tooling decisions on every new project.
  </p>

  <div class="custom-stats-grid">
    <div class="custom-stat-card">
      <div class="custom-stat-value" style="color: #19105b;">18</div>
      <div class="custom-stat-label">Practice Areas</div>
    </div>
    <div class="custom-stat-card">
      <div class="custom-stat-value" style="color: #ff6196;">100%</div>
      <div class="custom-stat-label">PRs Gated on Review + CI</div>
    </div>
    <div class="custom-stat-card">
      <div class="custom-stat-value" style="color: #19105b;">Zero</div>
      <div class="custom-stat-label">Tolerance for Critical CVEs</div>
    </div>
    <div class="custom-stat-card">
      <div class="custom-stat-value" style="color: #ff6196;">Day 1</div>
      <div class="custom-stat-label">Time to Productive Onboarding</div>
    </div>
  </div>
</div>

<div class="role-router-section">
  <h2 class="custom-stats-title">Not sure where to start?</h2>
  <p class="custom-stats-desc">Find your role below - each one links straight to the part of the playbook built for you.</p>

  <div class="role-router-grid">
    <a class="role-card" href="/business-foundations/overview">
      <div class="role-card-icon">🎯</div>
      <div class="role-card-title">Client / Business Stakeholder / BA / PM</div>
      <div class="role-card-desc">Start with Business & Solution Foundations to understand how problems become solutions, and how to judge whether one fits.</div>
      <div class="role-card-link">Start with Foundations →</div>
    </a>
    <a class="role-card" href="/basics/overview">
      <div class="role-card-icon">🌱</div>
      <div class="role-card-title">Fresher / New Engineer</div>
      <div class="role-card-desc">Start with Basics, then Delivery Lifecycle to see how a feature actually ships.</div>
      <div class="role-card-link">Start with Basics →</div>
    </a>
    <a class="role-card" href="/coding-standards/overview">
      <div class="role-card-icon">💼</div>
      <div class="role-card-title">Experienced Engineer, New Org</div>
      <div class="role-card-desc">Jump to Coding Standards for your stack, then the Delivery Lifecycle.</div>
      <div class="role-card-link">View Coding Standards →</div>
    </a>
    <a class="role-card" href="/architecture/standards">
      <div class="role-card-icon">🏛️</div>
      <div class="role-card-title">Tech Lead / Architect</div>
      <div class="role-card-desc">Architecture Standards, Governance, and Quality Gates are built for you.</div>
      <div class="role-card-link">See Architecture →</div>
    </a>
    <a class="role-card" href="/delivery-lifecycle/overview">
      <div class="role-card-icon">📋</div>
      <div class="role-card-title">Delivery Manager / PM</div>
      <div class="role-card-desc">Delivery Lifecycle, KPIs & Metrics, and Governance track how work moves and is measured.</div>
      <div class="role-card-link">See the Lifecycle →</div>
    </a>
    <a class="role-card" href="/operations/incident-management">
      <div class="role-card-icon">🚨</div>
      <div class="role-card-title">On-Call / Operating a Live Service</div>
      <div class="role-card-desc">Deployment & Operations covers Observability and Incident Management directly.</div>
      <div class="role-card-link">See Operations →</div>
    </a>
  </div>
</div>

<div class="path-section">
  <h2 class="custom-stats-title">Your path through the playbook</h2>
  <p class="custom-stats-desc">The sidebar follows this same order - roughly the sequence you'd hit these concerns on a real project, from "should we even build this" through to "how do we know it's working."</p>

```mermaid
flowchart LR
    Z[["Business & Solution<br/>Foundations"]] --> A[["Basics"]]
    A --> B[["Delivery<br/>Lifecycle"]]
    B --> C[["Coding<br/>Standards"]]
    C --> D[["Architecture &<br/>Engineering"]]
    D --> E[["Deployment &<br/>Operations"]]
    E --> F[["Quality Gates,<br/>Governance & KPIs"]]

    style Z fill:#19105b,color:#fff,stroke:none
    style A fill:#4a2e8f,color:#fff,stroke:none
    style B fill:#7a3fb5,color:#fff,stroke:none
    style C fill:#b13ea0,color:#fff,stroke:none
    style D fill:#e13a8c,color:#fff,stroke:none
    style E fill:#ff4785,color:#fff,stroke:none
    style F fill:#ff6196,color:#fff,stroke:none
```

  <div class="path-link-row">
    <a class="path-link" href="/business-foundations/overview">1. Foundations</a>
    <a class="path-link" href="/basics/overview">2. Basics</a>
    <a class="path-link" href="/delivery-lifecycle/overview">3. Delivery Lifecycle</a>
    <a class="path-link" href="/coding-standards/overview">4. Coding Standards</a>
    <a class="path-link" href="/architecture/standards">5. Architecture</a>
    <a class="path-link" href="/operations/overview">6. Deployment &amp; Ops</a>
    <a class="path-link" href="/quality-gates/overview">7. Gates &amp; Governance</a>
  </div>

  <p class="custom-stats-desc">If you only read one page beyond this one, read <a href="/vision-principles">Vision &amp; Principles</a> - it explains the "why" behind every rule in this playbook.</p>
</div>

<div class="final-cta-section">
  <h2 class="final-cta-title">Ready to build it the right way?</h2>
  <p class="custom-stats-desc">Every decision in this playbook exists so your team doesn't have to make it from scratch. Start with the page written for you.</p>
  <div class="final-cta-actions">
    <a class="final-cta-button primary" href="/getting-started">Get Started →</a>
    <a class="final-cta-button" href="/vision-principles">Read the Principles</a>
  </div>
</div>

<style>
/* Override inline text colors for Dark Mode so the deep navy pops or inverts properly */
.dark .custom-stat-card:nth-child(odd) .custom-stat-value {
  color: #8ba1ff !important;
}
</style>
