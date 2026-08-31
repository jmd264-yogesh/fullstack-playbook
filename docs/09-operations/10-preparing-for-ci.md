# Preparing for CI Checks

> The best pipeline run is the one that passes on the first try. Every red build is a context switch, a notification, and ten minutes you don't get back. This page is how to make green the default.

Chapter 2 of the [deployment journey](/operations/deployment-journey). The [CI/CD pipeline](/coding-standards/ci-cd) is going to run a fixed set of gates on your code the moment you push. None of them are secret - you can run every single one on your own machine in the same order, *before* you push, and fix problems while the context is still fresh in your head.

Think of this page as a dress rehearsal. If it passes locally, the pipeline is just a formality.

## The pre-push checklist

Run these in the same order the pipeline does. Each one is fast, and each one catches a different kind of problem:

| Step | What it proves | Example command (JS/TS) |
|---|---|---|
| 1. **Lint** | Style and common-mistake rules pass | `npm run lint` |
| 2. **Type check** | No type errors | `npm run type-check` |
| 3. **Tests + coverage** | Logic works, coverage ≥ 80% | `npm test -- --coverage` |
| 4. **Build** | The app actually compiles for production | `npm run build` |
| 5. **Dependency audit** | No high/critical CVEs in dependencies | `npm audit --audit-level=high` |

> The commands above are the JS/TS example. The *steps* are universal - a Laravel project runs Pint, PHPStan, Pest, and `composer audit`; a Python project runs Ruff, mypy, pytest, and `pip-audit`. Same five questions, different words.

The quickest way to make this a habit is a single script. Add one to your project so nobody has to remember the order:

```jsonc
// package.json
{
  "scripts": {
    "verify": "npm run lint && npm run type-check && npm test -- --coverage && npm run build && npm audit --audit-level=high"
  }
}
```

Now `npm run verify` is your one-command rehearsal.

## Let the machine remind you: a pre-push hook

Even a good habit gets skipped when you're in a hurry. Wire the checks into a Git pre-push hook so they run automatically - see [Git Hooks & Commits](/coding-standards/code-quality/git-hooks) for the full setup. The idea:

```bash
# .husky/pre-push
npm run verify
```

Keep the *heavy* checks (full test suite, build) on **pre-push**, not pre-commit - you want commits to stay fast. Pre-commit should only carry the instant stuff (lint-staged formatting). If a hook is ever genuinely in your way, `git push --no-verify` exists - but treat that as a fire escape, not a door you use daily.

## Preparing for the SonarQube Quality Gate

SonarQube is usually the gate that surprises people, because it measures things `npm test` doesn't. You can - and should - run it locally before you push, so a failed Quality Gate never blocks your PR.

Run a local scan against your team's SonarQube server:

```bash
# Example - SonarScanner CLI
sonar-scanner \
  -Dsonar.projectKey=my-app \
  -Dsonar.sources=src \
  -Dsonar.host.url=$SONAR_HOST_URL \
  -Dsonar.token=$SONAR_TOKEN \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
```

Then open the project in SonarQube and read the **Quality Gate** panel. It passes or fails on a handful of conditions. Here's what each failure usually means and how to fix it:

| Quality Gate condition | What it's telling you | How to fix it |
|---|---|---|
| **Coverage < 80% on new code** | Your new lines aren't tested | Add tests for the code you just wrote - Sonar measures *new* code, so you don't have to fix the whole repo |
| **Duplicated lines** | You copy-pasted a block | Extract the shared logic into a function or component |
| **Code smells** | Maintainability issues (complex functions, dead code, `any`) | Refactor the flagged spots; most are quick |
| **Security hotspots** | Code that *might* be risky and needs a human decision | Review each one and mark it Safe or Fixed - a Security Champion confirms it (see [DevSecOps](/coding-standards/devsecops-standards)) |
| **Bugs / vulnerabilities** | Sonar's SAST found a real defect | Fix it - these should never be waved through |

> Sonar grades your **new code**, not the whole history. That's deliberate: you're only ever responsible for leaving the codebase a little cleaner than you found it. Chasing legacy debt to pass a gate is not the goal.

## "It went red and it wasn't even my code"

Some failures aren't your logic - they're the environment. Knowing the usual suspects saves a lot of confusion:

- **New files tanked the coverage number.** You added three files and only tested two. Coverage is a ratio; untested new code drags it down fast. Fix: test the new files.
- **A flaky test failed.** It passed locally, failed in CI, passes on re-run. That's a real bug in the *test*, not proof the pipeline is broken - quarantine and fix it, don't just hit "re-run" forever.
- **The audit failed on a transitive dependency.** A package you don't directly use pulled in a vulnerable one. Fix: `npm audit fix`, bump the parent package, or add a documented override. Never silence it with `--no-audit`.
- **Cache miss made it slow, not failed.** A cold dependency cache makes the run longer but shouldn't make it red. If a green-locally build fails only in CI, suspect an uncommitted file or an env-var difference before you blame the runner.

## The bottom line

If `npm run verify` is green and your local Sonar scan passes its Quality Gate, you've already run everything the pipeline will run. Push with confidence - [the pipeline](/coding-standards/ci-cd) is just going to confirm what you already know.
