# HTTP Status Codes Reference

After the server processes your request, it sends back a **status code** to tell you what happened. Responses are grouped into five classes:

| Range | Class | Meaning |
|---|---|---|
| `1xx` | Informational | Request received, process is continuing |
| `2xx` | Success | Request was successfully received and processed |
| `3xx` | Redirection | Further action needed to complete the request |
| `4xx` | Client Error | The request has an error - problem is on **your** side |
| `5xx` | Server Error | The server failed to process a valid request - problem is on **their** side |

> 💡 Simple rule: **4xx = your mistake**, **5xx = their mistake**.

## 1xx - Informational Responses

| Code | Name | Description |
|---|---|---|
| `100` | Continue | Client should continue the request; server has received the initial part. |
| `101` | Switching Protocols | Server is switching to the protocol requested by the client (e.g., WebSocket). |
| `102` | Processing | Server has received the request but no status is available yet (WebDAV). |
| `103` | Early Hints | Allows the browser to start preloading resources while the server prepares a response. |

## 2xx - Successful Responses

| Code | Name | Description |
|---|---|---|
| `200` | OK | Request succeeded. Used for `GET`, `PUT`, `POST`, `TRACE`. |
| `201` | Created | Request succeeded and a new resource was created. Typically used after `POST` or `PUT`. |
| `202` | Accepted | Request received but not yet processed (e.g., queued for background processing). |
| `203` | Non-Authoritative Information | Returned metadata is from a third-party or cached copy, not the origin server. |
| `204` | No Content | Request succeeded but there is no response body (e.g., after a `DELETE`). |
| `205` | Reset Content | Tells the client to reset the document or form that sent the request. |
| `206` | Partial Content | Server is returning only part of the resource (used for range requests / file downloads). |
| `207` | Multi-Status | Conveys multiple status codes in one response (WebDAV). |
| `208` | Already Reported | Members of a DAV collection already enumerated; avoids repetition (WebDAV). |
| `226` | IM Used | Server fulfilled a `GET` with one or more instance manipulations applied. |

## 3xx - Redirection Messages

| Code | Name | Description |
|---|---|---|
| `300` | Multiple Choices | Multiple possible responses - user or agent should choose one. |
| `301` | Moved Permanently | Resource has permanently moved to a new URL (given in response). |
| `302` | Found | Resource temporarily at a different URI; client should continue using the original URL. |
| `303` | See Other | Server directs the client to fetch the resource from another URI using `GET`. |
| `304` | Not Modified | Resource has not changed since last request - client can use its cached version. |
| `307` | Temporary Redirect | Same as `302` but the client **must** use the same HTTP method (no switching to `GET`). |
| `308` | Permanent Redirect | Same as `301` but the client **must** use the same HTTP method for the new URL. |

## 4xx - Client Error Responses

| Code | Name | Description |
|---|---|---|
| `400` | Bad Request | Server cannot process the request due to malformed syntax or invalid data. |
| `401` | Unauthorized | Client must authenticate itself - identity is unknown. Missing or invalid token. |
| `402` | Payment Required | Reserved for future use; rarely used in practice. |
| `403` | Forbidden | Client is authenticated but does **not** have permission to access the resource. |
| `404` | Not Found | The server cannot find the requested resource or endpoint. |
| `405` | Method Not Allowed | The HTTP method used is not allowed on this endpoint (e.g., `DELETE` not supported). |
| `406` | Not Acceptable | Server cannot produce a response matching the client's `Accept` headers. |
| `408` | Request Timeout | Server timed out waiting for the client's request to complete. |
| `409` | Conflict | Request conflicts with the current state of the server (e.g., duplicate entry). |
| `410` | Gone | Resource has been permanently deleted with no forwarding address. |
| `411` | Length Required | Server requires a `Content-Length` header, which is missing from the request. |
| `413` | Content Too Large | Request body exceeds the size limit defined by the server. |
| `414` | URI Too Long | The request URI is longer than the server is willing to process. |
| `415` | Unsupported Media Type | Request body format is not supported (e.g., sending XML when JSON is expected). |
| `422` | Unprocessable Content | Request is well-formed but contains semantic errors (e.g., validation failure). |
| `429` | Too Many Requests | Client has sent too many requests in a given time window - **rate limiting**. |
| `451` | Unavailable For Legal Reasons | Resource cannot be provided due to legal restrictions (e.g., government censorship). |

## 5xx - Server Error Responses

| Code | Name | Description |
|---|---|---|
| `500` | Internal Server Error | Generic server error - server encountered an unexpected condition. |
| `501` | Not Implemented | Server does not support the requested HTTP method. |
| `502` | Bad Gateway | Server acting as a gateway received an invalid response from an upstream server. |
| `503` | Service Unavailable | Server is temporarily down - overloaded or under maintenance. |
| `504` | Gateway Timeout | Gateway server did not receive a timely response from the upstream server. |
| `505` | HTTP Version Not Supported | The HTTP version used in the request is not supported by the server. |
| `507` | Insufficient Storage | Server cannot store the representation needed to complete the request (WebDAV). |
| `508` | Loop Detected | Server detected an infinite loop while processing the request (WebDAV). |
| `511` | Network Authentication Required | Client must authenticate to gain network access (e.g., captive portal). |
