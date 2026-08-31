# Request & Response Anatomy

A complete API interaction consists of a **Request** sent by the client and a **Response** returned by the server.

## Components of an API Interaction

| Component | Description |
|---|---|
| **Endpoint** | A specific URL that represents a resource or action (e.g., `/users/123`). |
| **HTTP Method** | The action to perform: `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`. |
| **Request Headers** | Metadata sent with the request - auth tokens, content type, etc. |
| **Request Body** | Data sent from the client to the server, usually in JSON format. |
| **Response** | The data returned by the server after processing the request. |
| **Status Code** | A number indicating the result: `200 OK`, `404 Not Found`, `500 Error`. |
| **API Documentation** | Describes endpoints, formats, and parameters so developers can use the API. |

## Common Request Headers

Headers carry **metadata** alongside your request - the server needs this information before it even looks at your request body.

| Header | Purpose |
|---|---|
| `Content-Type` | Tells the server the format of the request body - usually `application/json`. |
| `Authorization` | Carries the caller's identity - usually `Bearer <token>` (JWT). |
| `Accept` | Tells the server what response format the client wants back. |
| `Idempotency-Key` | Optional - lets a retried `POST` be recognized as the same request to avoid duplicates. |

## Full Request & Response Example

Putting everything together - here's a real `POST` request to create an order:

### Request using `curl`
```bash
curl -X POST https://api.example.com/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{"items": [{"productId": "prod_456", "quantity": 2}]}'
```

### Successful Response (`201 Created`)
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

### Failed Response - Missing Token (`401 Unauthorized`)
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Missing or invalid token"
  }
}
```
