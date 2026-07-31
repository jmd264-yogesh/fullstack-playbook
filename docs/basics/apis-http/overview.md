# APIs & HTTP — Overview

An **API** (Application Programming Interface) is a set of rules that allows different software applications to communicate and exchange data with each other. It acts as a bridge between systems, enabling one application to request services or information from another in a structured way.

> 💡 **Real-world analogy**: Think of an API like a waiter at a restaurant. You (the client) tell the waiter (the API) what you want. The waiter takes your request to the kitchen (the server), and brings back your food (the response). You never go into the kitchen yourself — the waiter handles all communication.

---

## How an API Works

An API acts as a communication layer between a **client** and a **server**, handling requests and returning responses to enable data exchange between applications.

```mermaid
flowchart LR
    C["💻 Client"]
    A["⚙️ API"]
    S["🖥️ API Server"]

    C -- "Request" --> A
    A -- "Forward" --> S
    S -- "Return data" --> A
    A -- "Response" --> C

    style C fill:#f0ecff,color:#19105b,stroke:#ff6196,stroke-width:2px
    style A fill:#ff6196,color:#fff,stroke:#ff4785,stroke-width:2px
    style S fill:#19105b,color:#fff,stroke:#0d0a33,stroke-width:2px
```

### The 4-Step Flow

1. **Client → API (Request)**: The client sends a request containing the required data, parameters, headers, and authentication details.
2. **API → Server (Forward)**: The API validates the input, applies business logic, and forwards it to the appropriate server or database.
3. **Server → API (Result)**: The server processes the request, retrieves or updates the data, and sends the result back to the API.
4. **API → Client (Response)**: The API formats the result (typically as JSON) and sends it back to the client.

---

## Next Sub-topics

Explore the detailed sub-sections in this module:
- [Request & Response Anatomy](/basics/apis-http/request-response-anatomy)
- [HTTP Methods & Verbs](/basics/apis-http/http-methods)
- [HTTP Status Codes](/basics/apis-http/http-status-codes)
- [API Architectures & Types](/basics/apis-http/architectures-types)
- [Advanced HTTP Concepts & Protocols](/basics/apis-http/advanced-concepts)
- [API Integration & Testing Tools](/basics/apis-http/integration-tools)
