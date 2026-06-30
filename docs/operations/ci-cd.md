# CI/CD Standards

Our deployment pipelines are the backbone of the delivery lifecycle.

## 1. Pipeline Stages
A standard enterprise pipeline flows automatically:
1. `Lint & Format`
2. `Unit Tests`
3. `SAST & SCA Security Scan`
4. `Build Docker Image`
5. `Push to Registry`
6. `Deploy to Staging`
7. `E2E Smoke Tests`
8. `Promote to Production`

## 2. Build Optimization & Caching
- **Docker Caching**: Utilize multi-stage Docker builds and layer caching. Always copy `package.json` and run `npm install` BEFORE copying the rest of the source code.
- **Dependency Caching**: Cache `node_modules` and `.npm` folders across pipeline runs to cut build times in half.

## 3. Deployment Automation
- We enforce **Zero Downtime Deployments**.
- **Rolling Updates**: Kubernetes progressively replaces pods so the service is never unavailable.
- **Blue/Green & Canary**: For high-risk releases, deploy to a dark "Green" environment, run smoke tests, and then shift 10% of traffic (Canary) before going 100%.
