# API Standards

API consistency is the bedrock of our microservice architecture. All REST and GraphQL APIs must adhere to these enterprise standards.

## 1. REST Conventions
- **Nouns, not Verbs**: Use `/users`, not `/getUsers`.
- **Pluralization**: Always use plural nouns for collections (`/users/123`, not `/user/123`).
- **Versioning**: APIs must be versioned at the URL level (`/api/v1/users`) or via Accept Headers. Never break a v1 API; release a v2 and deprecate v1.

## 2. Standardized Error Schema
Clients must be able to parse errors predictably. All APIs must return the exact same error structure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The provided email is invalid.",
    "details": {
      "field": "email",
      "issue": "must be a valid email address"
    }
  },
  "timestamp": "2026-05-20T10:00:00Z",
  "correlationId": "req-12345-abcde"
}
```

## 3. Pagination & Filtering
- Never return unbounded arrays.
- **Cursor-based Pagination**: Preferred for infinite scrolling and high-performance tables.
- **Offset/Limit Pagination**: Acceptable for standard administrative dashboards (`?limit=50&offset=100`).

## 4. Idempotency & Retries
- **Idempotency Keys**: All non-idempotent operations (POST, PUT, DELETE) that involve financial transactions or state mutations must require an `Idempotency-Key` header.
- **Retries**: Clients must implement exponential backoff with jitter when retrying failed requests (5xx errors).

## 5. GraphQL Standards
- **N+1 Prevention**: You MUST use `DataLoader` to batch and cache database queries within resolvers.
- **Depth Limiting**: Implement strict query depth limiting (max depth of 5) to prevent malicious nested queries from executing Denial of Service (DoS) attacks on the database.
