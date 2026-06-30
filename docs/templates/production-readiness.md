# Production Readiness Checklist

Before any service goes live to customers for the first time, this checklist must be completed by the Tech Lead.

## Reliability
- [ ] Load testing completed (p95 latency within budget).
- [ ] Autoscaling policies configured and tested.
- [ ] Database backups configured and restoration tested.

## Security
- [ ] Pen-test / DAST scan completed with 0 high vulnerabilities.
- [ ] WAF (Web Application Firewall) blocking rules enabled.
- [ ] Rate limiting applied to all public endpoints.

## Observability
- [ ] PagerDuty alerts configured for SEV-1 scenarios.
- [ ] Dashboards created for SLIs (Error rate, Latency, Traffic).
- [ ] Runbook written and linked in the repository.
