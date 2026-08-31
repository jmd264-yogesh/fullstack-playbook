# Release Management

## 1. Semantic Versioning
All releases must follow `MAJOR.MINOR.PATCH` (e.g., `v1.4.2`).
- **MAJOR**: Breaking API changes.
- **MINOR**: Backward-compatible new features.
- **PATCH**: Backward-compatible bug fixes.

## 2. Changelog Standards
Changelogs are generated automatically via Semantic Release based on Semantic Commits. 
- Release notes are automatically posted to the #engineering Slack/Teams channel upon successful production deployment.

## 3. Rollback Policy
- **Rule**: If a deployment triggers a P1/P2 incident (error spikes, latency spikes), the pipeline MUST allow for a 1-click rollback to the previous known good version.
- Because of this, database migrations must ALWAYS be backward-compatible with the previous version of the code.
