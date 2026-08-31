# Deployment Strategies

> There's a world of difference between "the new version is running" and "the new version replaced the old one for everybody at once." How you make that swap decides whether a bad deploy is a shrug or an outage.

Chapter 6 of the [deployment journey](/operations/deployment-journey). Your image is built, scanned, and sitting in the registry (see [Docker](/coding-standards/infrastructure/docker)). Now you have to get it in front of users. *How* you do that swap is a deliberate choice, and it comes straight back to the section's second ground rule: **every deploy must be reversible.**

## The three strategies

| Strategy | How it works | Blast radius if it's bad | Cost / complexity | Reach for it when… |
|---|---|---|---|---|
| **Rolling** | Replace old instances with new ones a few at a time | Medium - a slice of users hit the bad version during rollout | Low - most orchestrators do it by default | It's your sensible default for stateless apps |
| **Blue-Green** | Stand up a full new environment, switch all traffic at once | Low - switch back instantly if it's bad | High - you run two full environments briefly | You need instant, clean rollback and can afford double capacity |
| **Canary** | Send a small % of traffic to the new version, watch, then ramp up | Very low - only the canary % is exposed | High - needs traffic splitting + good metrics | The change is risky and you have solid monitoring |

### Rolling deployment

The default for most orchestrators. New instances come up and old ones retire in batches, so there's never a moment with zero capacity. Simple and cheap - but during the rollout, old and new versions serve traffic *simultaneously*, which means both versions must be compatible with the same database and API contracts at once.

```yaml
# Kubernetes example - rolling is the default strategy
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # at most 1 extra pod above desired count
      maxUnavailable: 0    # never drop below desired count → zero downtime
```

### Blue-Green deployment

You keep two identical environments: **blue** (live) and **green** (idle). Deploy the new version to green, smoke-test it while it takes zero real traffic, then flip the router so all traffic goes to green. Blue is now your instant rollback - if green misbehaves, flip back.

```
        ┌─────────┐
traffic │ Router  │
────────┤         ├──► [ BLUE  v1.4.1 ]  ← currently live
        └────┬────┘
             ╎  (flip after green passes smoke tests)
             └─────► [ GREEN v1.4.2 ]  ← new version, warming up
```

The tradeoff is cost: for a while you're paying for two full production environments. The payoff is the cleanest rollback there is - a router flip, not a redeploy.

### Canary deployment

The most cautious option. Route a small slice of traffic (say 5%) to the new version, watch your metrics - error rate, latency, business KPIs - and only ramp to 100% if it stays healthy. If the canary looks sick, you pull it with only that 5% ever affected.

```
traffic ──► 95% ──► [ v1.4.1  stable ]
        └─► 5%  ──► [ v1.4.2  canary ]  ← watch error rate & latency, then ramp 5→25→50→100%
```

Canary only works if you can *see* whether the canary is healthy - it's a strategy that depends entirely on good [observability](/operations/production-readiness#observability). Without metrics, you're just shipping to 5% of users and hoping.

## Rollback is a first-class citizen

Notice that every strategy above was described partly by *how you undo it*. That's not an accident. Plan the rollback before you deploy, not during the incident.

- **Roll back = redeploy the previous image tag.** This is why [Docker](/coding-standards/infrastructure/docker#naming-versioning) insists on pinning real versions (`my-app:1.4.1`) and never deploying `latest`. If every deploy is an immutable, versioned image, rollback is just "point production at the last known-good tag" - a fast, boring operation.
- **Keep the last known-good tag obvious.** Your pipeline should record which version is live and which one preceded it, so rollback doesn't require archaeology under pressure.
- **Practice it.** A rollback path you've never tested is a hope, not a plan. Roll back in staging occasionally so the muscle memory (and the tooling) is real.

### The database caveat

Code rolls back cleanly. **Databases do not.** If v1.4.2 dropped a column and you roll the code back to v1.4.1, v1.4.1 may expect a column that no longer exists - so your rollback breaks too.

The rule that keeps you safe: **make migrations forward-only and backward-compatible.**

- **Expand, then contract.** Add the new column/table first and deploy code that works with *both* shapes. Only remove the old column in a *later* release, once the new code is proven and you'd never roll back past it.
- **Never destructively migrate in the same deploy that depends on the change.** Additive changes (new nullable column, new table) are safe to roll back past. Destructive ones (drop, rename, non-null constraint) are not - sequence them apart.

More on migration strategy at deploy time in [Production Readiness](/operations/production-readiness#data).

## Decouple deploying from releasing: feature flags

The deploy strategies above control *which version runs*. Feature flags control *which features are on* - and separating those two ideas is a superpower.

With a flag, you can deploy code to production with a new feature switched **off**, then turn it on for internal users, then 10% of customers, then everyone - all without another deploy. And if it goes wrong, you flip the flag off in seconds. No rollback, no redeploy.

```ts
// The deploy shipped this code, but the flag decides if anyone sees it.
if (featureFlags.isEnabled('new-checkout', user)) {
  return <NewCheckout />
}
return <LegacyCheckout />
```

This is often the *safest* rollback of all - for a feature-level problem, killing a flag beats redeploying an image. Deploy frequently and boringly; release deliberately.

## Choosing, in one line

Start with **rolling** - it's the sensible default. Move to **blue-green** when you need instant, guaranteed rollback. Reach for **canary** when a change is risky *and* your monitoring is good enough to tell you the canary is sick. And put the genuinely uncertain changes behind a **feature flag** regardless of strategy.
