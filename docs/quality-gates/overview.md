# Quality Gates Overview

Quality Gates are the automated, non-negotiable checkpoints in our CI/CD pipelines. They act as the objective judges of code quality, security, and performance. 

By enforcing standards via automation rather than manual review, we eliminate subjectivity, reduce cognitive load on reviewers, and guarantee a consistent baseline of quality across the entire enterprise.

## The Principle of "Fail Fast"
Quality gates are designed to fail as early in the SDLC as possible.
- **IDE Level**: Linting and formatting run locally via Husky pre-commit hooks.
- **PR Level**: Unit tests and SAST scans run when a Pull Request is opened.
- **Integration Level**: E2E tests and DAST scans run when code is merged.
- **Release Level**: Performance and smoke tests run before promoting to Production.

If a gate fails, the pipeline halts immediately. Code cannot bypass a failed gate without documented, temporary exception approval from the Engineering Director.
