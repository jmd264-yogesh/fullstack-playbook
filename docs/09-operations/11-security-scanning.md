# Quality & Security Scanning

> Four scanners, four blind spots covered. No single tool sees everything - which is exactly why we run more than one.

Chapter 4 of the [deployment journey](/operations/deployment-journey). This is the single source of truth for the *how* of scanning: which tools we run, when in the pipeline they run, and how to read what they tell you. The *policy* behind them - what's non-negotiable and why - lives in [DevSecOps Standards](/coding-standards/devsecops-standards). When you need to fix a failure locally before it ever reaches the pipeline, [Preparing for CI Checks](/operations/preparing-for-ci) is the practical guide.

## The four scans at a glance

Each scan looks at your application from a different angle. Read this table first - the rest of the page is just detail on each row:

| Scan | Looks at | Sees your app… | When it runs | Example tools | A failure means |
|---|---|---|---|---|---|
| **SAST** | Source code | …from the inside, at rest | Every PR | SonarQube, Checkmarx | Risky code pattern (SQLi, XSS, hardcoded secret) |
| **DAST** | Running app | …from the outside, in motion | After deploy to staging | OWASP ZAP, Burp | An attacker could exploit the live app |
| **SCA** | Dependencies | …the code you *didn't* write | Every PR + daily | Snyk, Dependabot, `npm audit` | A library you use has a known CVE |
| **Secret scanning** | Commits & history | …what you accidentally committed | Pre-commit + CI | GitLeaks, TruffleHog | A key or token leaked into the repo |

> **The mental model:** SAST reads the blueprint of the house looking for design flaws. DAST walks up to the finished house and tries the doors and windows. SCA checks whether any of the materials were recalled. Secret scanning makes sure you didn't leave a key under the mat.

## SAST - Static Application Security Testing

SAST reads your source code without running it, looking for patterns that tend to be vulnerabilities: unsanitized input reaching a query, unsafe HTML rendering, hardcoded credentials.

- **When:** every Pull Request, and on `main`.
- **Tools:** SonarQube (also doubles as our quality gate) or Checkmarx.
- **Policy:** any **Critical** or **High** finding blocks the PR.
- **Security hotspots** are SAST's "this *might* be dangerous - a human should decide" category. Each one must be reviewed and marked **Safe** or **Fixed** by a Security Champion before the gate turns green. Don't bulk-dismiss them; that defeats the purpose.

Because SonarQube plays double duty (quality + security), the practical guide to passing its gate - coverage, smells, hotspots - is on [Preparing for CI Checks](/operations/preparing-for-ci#preparing-for-the-sonarqube-quality-gate).

## DAST - Dynamic Application Security Testing

This is the scan the playbook has always *named* but never explained. DAST is the counterpart to SAST: instead of reading your code, it attacks a **running instance** of your app the way a real attacker would - sending malicious inputs, probing endpoints, testing headers and auth - and reports what actually broke.

Why you need it even with SAST: SAST can't see anything that only exists at runtime. A misconfigured security header, a missing auth check on a live route, a reflected XSS that depends on how the server renders a response - those are invisible on paper and obvious to a scanner poking the live site.

### Where it runs in the pipeline

DAST needs a *running* app, so it runs **after the app is deployed to staging**, not on the PR:

```
merge ──► build image ──► deploy to STAGING ──► DAST scan ──► (pass) ──► promote to prod
                                                     │
                                                  (fail) ──► block promotion
```

Never point a DAST scanner at production - an active scan sends real attack traffic and can trip rate limits, alerts, or worse. Always scan a production-*like* staging environment.

### Baseline vs. full scan

OWASP ZAP (our default) has two modes, and they serve different needs:

| Mode | What it does | How long | Use it for |
|---|---|---|---|
| **Baseline** | Passive scan - spiders the app, checks headers/config, no attacks | Minutes | Every deploy to staging; fast feedback |
| **Full (active)** | Actively attacks discovered endpoints | Much longer | Nightly / pre-release; deeper coverage |

Run the **baseline** scan on every staging deploy (it's fast enough to gate on) and schedule the **full** active scan nightly or before a release.

### Example: ZAP baseline in GitHub Actions

```yaml
  dast:
    runs-on: ubuntu-latest
    needs: deploy-staging          # only runs once staging is live
    steps:
      - uses: actions/checkout@v4
      - name: OWASP ZAP Baseline Scan
        uses: zaproxy/action-baseline@v0.12.0
        with:
          target: ${{ secrets.STAGING_URL }}
          fail_action: true         # fail the build on new High findings
```

### Triaging DAST findings

DAST is prone to false positives, so triage matters:

1. **Confirm it's real.** Reproduce the finding manually against staging. Scanners flag "possible" issues; not all are exploitable.
2. **Fix by severity.** High/Critical block promotion - fix before you ship. Medium/Low get ticketed and prioritized.
3. **Suppress with a reason, never silently.** A confirmed false positive goes in a documented ZAP ignore rule with a comment explaining why - so the next person understands the decision.

## SCA - Software Composition Analysis

Most of your app's code is code you didn't write - it's your dependencies. SCA scans those third-party packages against databases of known vulnerabilities (CVEs).

- **When:** every PR/build, plus a daily scheduled scan (new CVEs are published constantly - a package that was clean yesterday can be flagged today).
- **Tools:** Snyk, Dependabot, or `npm audit` / `composer audit`.
- **Policy:** the build fails on any **High** or **Critical** CVE. Don't suppress it with `--no-audit`.
- **Fixing:** upgrade the offending package, or if it's a transitive dependency, bump the parent or add a documented override. See the [audit troubleshooting notes](/operations/preparing-for-ci#it-went-red-and-it-wasnt-even-my-code).
- **Patch SLAs** for CVEs live in [DevSecOps Standards](/coding-standards/devsecops-standards#patch-management-slas-vulnerability-disclosure) - Critical within 48 hours, High within 14 days.

## Secret Scanning

The cheapest vulnerability to prevent is a leaked credential - and the most common. Secret scanning watches for API keys, tokens, connection strings, and high-entropy strings before they ever land in the repo.

- **When:** at the **pre-commit** hook (blocks the leak before it happens) *and* in CI (catches anything that slipped through, including in history).
- **Tools:** GitLeaks or TruffleHog.
- **Policy:** a detected secret blocks the push. And critically - **rotate it anyway.** Once a secret has touched Git history, assume it's compromised; deleting the commit is not enough. Rotate the key, then clean the history.

```yaml
  secret-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0            # scan full history, not just the latest commit
      - uses: gitleaks/gitleaks-action@v2
```

## How these fit the pipeline

Putting it together, here's where each scan sits relative to the stages in the [pipeline](/coding-standards/ci-cd):

```
pre-commit   ─►  secret scanning
     │
pull request ─►  SAST + SCA + secret scanning (again, on CI)
     │
build image  ─►  container/image scan (Trivy) - see Docker & DevSecOps
     │
staging      ─►  DAST (ZAP baseline)
     │
nightly      ─►  DAST full scan + SCA re-scan for new CVEs
```

Every one of these is automated and gated - nothing here relies on someone *remembering* to run a scan. That's the whole point.
