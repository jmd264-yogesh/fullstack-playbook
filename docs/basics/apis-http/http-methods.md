# HTTP Methods & Verbs

Every API request uses an **HTTP method** to tell the server *what action* to perform. These are sometimes called **HTTP verbs** — they describe the intention of the request.

---

## Complete List of HTTP Methods

| Method | Description | Example |
|---|---|---|
| `GET` | Requests a representation of a resource. Should **only retrieve data** — no side effects. | `GET /orders/123` — fetch order 123 |
| `HEAD` | Same as `GET` but returns **only headers**, no response body. Used to check if a resource exists. | `HEAD /orders/123` |
| `POST` | Submits data to the server, often **creating a new resource** or triggering an action. | `POST /orders` — create a new order |
| `PUT` | **Replaces** the entire target resource with the provided content. | `PUT /orders/123` — replace order 123 completely |
| `PATCH` | Applies **partial modifications** to a resource — only update the fields you send. | `PATCH /orders/123` — update specific fields |
| `DELETE` | **Deletes** the specified resource. | `DELETE /orders/123` — remove order 123 |
| `OPTIONS` | Describes the **communication options** available for a resource (used in CORS preflight). | `OPTIONS /orders` |
| `CONNECT` | Establishes a **tunnel** to the server identified by the target resource (used for HTTPS proxies). | — |
| `TRACE` | Performs a **loop-back test** — returns the request as received by the server (used for debugging). | — |

---

## Safe, Idempotent & Cacheable Properties

Understanding these three properties helps you design and debug APIs:

- **Safe**: Does the method change server state? Safe methods only *read* data and have no side effects.
- **Idempotent**: Can you call it multiple times and always get the same result? (e.g., deleting something twice still results in it being deleted.)
- **Cacheable**: Can the response be stored and reused?

| Method | Safe | Idempotent | Cacheable |
|---|---|---|---|
| `GET` | ✅ Yes | ✅ Yes | ✅ Yes |
| `HEAD` | ✅ Yes | ✅ Yes | ✅ Yes |
| `OPTIONS` | ✅ Yes | ✅ Yes | ❌ No |
| `TRACE` | ✅ Yes | ✅ Yes | ❌ No |
| `PUT` | ❌ No | ✅ Yes | ❌ No |
| `DELETE` | ❌ No | ✅ Yes | ❌ No |
| `POST` | ❌ No | ❌ No | ⚠️ Conditional* |
| `PATCH` | ❌ No | ❌ No | ⚠️ Conditional* |
| `CONNECT` | ❌ No | ❌ No | ❌ No |

> \* `POST` and `PATCH` are cacheable only when responses explicitly include freshness information and a matching `Content-Location` header.
