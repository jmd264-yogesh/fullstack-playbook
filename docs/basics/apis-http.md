# APIs & HTTP Basics

An **API** (Application Programming Interface) is the contract that lets the frontend ask the backend for something, or tell it to do something. Most of our APIs are **REST** APIs communicating over **HTTP**.

## HTTP methods — the "verb" of a request

| Method | Meaning | Example |
|---|---|---|
| `GET` | Read data, no side effects | `GET /orders/123` — fetch order 123 |
| `POST` | Create something new | `POST /orders` — create a new order |
| `PUT` / `PATCH` | Update an existing thing (full vs partial) | `PATCH /orders/123` — update order 123 |
| `DELETE` | Remove something | `DELETE /orders/123` |

## Status codes — the "verdict" of a response

| Range | Meaning | Common example |
|---|---|---|
| `2xx` | Success | `200 OK`, `201 Created` |
| `3xx` | Redirect | `301 Moved Permanently` |
| `4xx` | The client made a mistake | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |
| `5xx` | The server made a mistake | `500 Internal Server Error` |

## A request, end to end

```mermaid
sequenceDiagram
    participant C as Client (Frontend)
    participant S as Server (API)
    C->>S: POST /orders {items: [...]}, Authorization: Bearer <token>
    S->>S: Validate token (who is this?)
    S->>S: Validate payload (is this data allowed?)
    S->>S: Run business logic, save to DB
    S-->>C: 201 Created { "success": true, "data": {...} }
```

## A full example, request and response

Calling this with `curl`:
```bash
curl -X POST https://api.example.com/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{"items": [{"productId": "prod_456", "quantity": 2}]}'
```

produces a response like:
```json
{
  "success": true,
  "data": {
    "id": "order_789",
    "status": "pending",
    "items": [{ "productId": "prod_456", "quantity": 2 }],
    "total": 39.98
  }
}
```

And if the token were missing, the response would be a `401` with this org's standard error shape (see [Architecture: API Standards](/architecture/api-standards)):
```json
{
  "success": false,
  "error": { "code": "UNAUTHORIZED", "message": "Missing or invalid token" }
}
```

## Common request headers

| Header | Purpose |
|---|---|
| `Content-Type` | Tells the server what format the request body is in — almost always `application/json` here |
| `Authorization` | Carries the caller's identity, usually `Bearer <token>` |
| `Accept` | Tells the server what format the client wants back |
| `Idempotency-Key` | Optional, on `POST`s that create things — lets a retried request be recognized as "the same one," so it isn't processed twice |

## REST resource conventions, illustrated

A single resource (`orders`) typically exposes a consistent set of endpoints:

| Method + Path | What it does |
|---|---|
| `GET /orders` | List orders |
| `GET /orders/123` | Get one order |
| `POST /orders` | Create an order |
| `PATCH /orders/123` | Update part of an order |
| `DELETE /orders/123` | Delete an order |

This consistency is what lets any engineer guess the URL for a new resource correctly without checking documentation.

## Authentication in one paragraph

Most requests carry a **token** (commonly a JWT) in the `Authorization` header proving who the caller is. The server checks that token on every request — it doesn't "remember" you from the last request. If the token is missing or invalid, the server responds `401 Unauthorized`; if the token is valid but the user isn't allowed to do that action, it responds `403 Forbidden`.

## Where this leads next

- [Architecture: API Standards](/architecture/api-standards) — this org's exact conventions (URL structure, versioning, error schema)
- [Backend: NestJS](/coding-standards/backend/nestjs) / [GraphQL](/coding-standards/backend/graphql) — how APIs are actually implemented here
- [Security 101](/basics/security) — how authentication/authorization risks are mitigated
