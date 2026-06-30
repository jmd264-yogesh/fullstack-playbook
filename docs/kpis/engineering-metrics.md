# Engineering Metrics (DORA)

We measure engineering speed and stability using the industry-standard **DORA (DevOps Research and Assessment) Metrics**. These metrics are automatically extracted from our CI/CD pipelines and version control systems.

## 1. Deployment Frequency
*How often does the team successfully release to production?*
- **Elite Target**: Multiple times per day (On-Demand).
- **How we measure it**: The number of successful deployment pipeline triggers to the `production` environment per week.
- **Why it matters**: Frequent deployments force teams to work in smaller, less risky batches, reducing integration hell.

## 2. Lead Time for Changes
*How long does it take for a commit to reach production?*
- **Elite Target**: Less than 1 day.
- **How we measure it**: The time delta between a developer's first commit on a branch and the moment that branch is successfully deployed to production.
- **Why it matters**: Indicates the efficiency of our code review process, automated testing speed, and deployment pipeline health.

## 3. Mean Time to Recovery (MTTR)
*How quickly can we restore service during an outage?*
- **Elite Target**: Less than 1 hour.
- **How we measure it**: The time delta between a P1/P2 Incident creation in PagerDuty and its resolution.
- **Why it matters**: Reflects the effectiveness of our observability (alerts), rollback capabilities, and incident response processes.

## 4. Change Failure Rate
*What percentage of deployments cause a failure in production?*
- **Elite Target**: 0% - 15%.
- **How we measure it**: (Number of deployments resulting in a P1/P2 incident or requiring an immediate rollback) / (Total number of deployments).
- **Why it matters**: A high failure rate indicates that our Testing Gates or QA processes are fundamentally flawed.
