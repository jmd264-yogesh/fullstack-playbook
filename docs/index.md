---
layout: home
hero:
  name: "Full Stack Delivery Playbook"
  text: "Engineering Governance & Standards"
  tagline: "One source of truth for how we design, build, secure, ship, and operate software — from your first commit to production hypercare."
  image:
    src: /hero-logo.png
    alt: Playbook Logo
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: New here? Start with Basics
      link: /basics/overview
    - theme: alt
      text: View Coding Standards
      link: /coding-standards/overview
features:
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
    details: Every security control in one reference — secure coding, auth, secrets, CI/CD gates, and production hardening.
    link: /security/testing/overview
    linkText: Review guardrails
  - icon: ✅
    title: Quality Gates & Governance
    details: Fail-fast quality gates, ARB/CAB approval workflows, RACI matrices, and SOC2 compliance automation.
    link: /quality-gates/overview
    linkText: See the gates
  - icon: 📊
    title: KPIs & Metrics
    details: DORA metrics — Deployment Frequency, Lead Time, MTTR, and Change Failure Rate — tracked objectively.
    link: /kpis/engineering-metrics
    linkText: View metrics
---

<div class="custom-stats-section">
  <h2 class="custom-stats-title">Built for High-Velocity Engineering Teams</h2>
  <p class="custom-stats-desc">
    This playbook is not just documentation; it is the absolute source of truth for how we build software at scale. By standardizing our tech stack, automating our quality gates, and embracing AI-driven workflows, we eliminate boilerplate decisions and empower engineers to focus purely on delivering massive business value.
  </p>

  <div class="custom-stats-grid">
    <div class="custom-stat-card">
      <div class="custom-stat-value" style="color: #19105b;">100%</div>
      <div class="custom-stat-label">Compliance</div>
    </div>
    <div class="custom-stat-card">
      <div class="custom-stat-value" style="color: #ff6196;">Zero</div>
      <div class="custom-stat-label">Critical CVEs</div>
    </div>
    <div class="custom-stat-card">
      <div class="custom-stat-value" style="color: #19105b;">Day 1</div>
      <div class="custom-stat-label">Developer Onboarding</div>
    </div>
  </div>
</div>

<div class="role-router-section">
  <h2 class="custom-stats-title">Not sure where to start?</h2>
  <p class="custom-stats-desc">Find your role below — each one links straight to the part of the playbook built for you.</p>

  <div class="role-router-grid">
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
  <p class="custom-stats-desc">The sidebar follows this same order — roughly the sequence you'd hit these concerns on a real project.</p>

```mermaid
flowchart LR
    A[Basics] --> B[Delivery Lifecycle]
    B --> C[Coding Standards]
    C --> D[Architecture & Engineering]
    D --> E[Deployment & Operations]
    E --> F[Quality Gates, Governance & KPIs]
```

  <p class="custom-stats-desc">If you only read one page beyond this one, read <a href="/vision-principles">Vision &amp; Principles</a> — it explains the "why" behind every rule in this playbook.</p>
</div>

<style>
/* Override inline text colors for Dark Mode so the deep navy pops or inverts properly */
.dark .custom-stat-card:nth-child(odd) .custom-stat-value {
  color: #8ba1ff !important;
}
</style>
