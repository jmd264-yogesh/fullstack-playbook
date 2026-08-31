# What is Full Stack?

**Level:** 🟢 Beginner - readable with no technical background

## Simple explanation

"Full stack" means every layer required to take a user's action and turn it into a real-world result: the screen they look at, the server that makes decisions, the database that remembers things, and the infrastructure that keeps it all running. A full-stack team (or engineer) understands and can work across all of these layers, rather than just one.

## Real-world analogy

Think of a restaurant. The dining room is what the customer sees and interacts with (the **frontend**). The kitchen prepares the order based on rules and recipes (the **backend / business logic**). The pantry and fridge store the ingredients (the **database**). The building, gas, electricity, and staffing behind all of it is the **infrastructure** that makes the whole thing possible every day, not just once. A customer only sees the dining room, but the meal depends on all four layers working together.

## The four layers, in plain language

| Layer | What it does | Restaurant analogy |
|---|---|---|
| **Frontend** | What the user sees and clicks | The dining room and menu |
| **Backend** | Applies rules, checks permissions, makes decisions | The kitchen and the chef's recipes |
| **Database** | Stores information reliably, so it's still there tomorrow | The pantry and fridge |
| **Infrastructure / Cloud** | Keeps the whole thing running, secure, and available | The building, utilities, and staff rota |

## Why it matters

Non-technical stakeholders often think of "the app" as one thing. Understanding that it's actually several cooperating layers explains a lot of real behavior:

- Why a "small" visual change on screen can require backend and database changes too.
- Why an application can be "up" but still slow, if the database layer is struggling.
- Why security has to exist at every layer, not just the login screen.
- Why a team needs different specialists (or one generalist) to build and operate the whole thing.

## Technical explanation

For the engineering-level breakdown - request/response flow, the specific technologies used at each layer, and a full worked example tracing a request end-to-end - see [Full-Stack Architecture](/basics/full-stack-architecture) in Basics. For a plain-language walkthrough of one real transaction that doesn't assume any coding background, see [How Software Works in Real Life](/business-foundations/how-software-works-in-real-life).

## When to use a full-stack approach

Whenever a business problem calls for a system that real users interact with directly (see [Application vs Automation](/business-foundations/application-vs-automation) for when it doesn't). Most customer-facing products, internal tools, and admin systems need all four layers in some form.

## Common mistakes

::: warning Common mistakes
- Treating "full stack" as a job title requirement rather than a way of thinking about how systems fit together.
- Assuming every problem needs all four layers built from scratch - sometimes the right database or backend already exists and only a thin frontend (or no frontend at all) is needed.
- Underestimating the infrastructure and operations layer, which is invisible until it fails. See [Deployment & Operations](/operations/overview).
:::

## Where this leads

- [How Software Works in Real Life](/business-foundations/how-software-works-in-real-life) - one transaction, traced end-to-end
- [Full-Stack Architecture](/basics/full-stack-architecture) - the technical deep dive
- [Choosing the Right Solution](/business-foundations/choosing-the-right-solution) - deciding whether you need a full application at all
