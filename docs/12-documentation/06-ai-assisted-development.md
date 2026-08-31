# AI-Assisted Development

The advent of agentic AI coding assistants represents a paradigm shift in software engineering. Tools like **Antigravity** and **Claude Code** are no longer just autocomplete engines; they are autonomous pair programmers capable of analyzing context, generating architectural boilerplates, writing tests, and refactoring legacy code.

Our CoE strongly encourages the use of these tools to significantly accelerate developer velocity, provided they are used responsibly and within governance boundaries.

## 1. Approved AI Coding Assistants

- **Antigravity**: Our primary agentic assistant for full-stack, autonomous task execution (e.g., scaffolding entire features, updating documentation, migrating databases).
- **Claude Code**: Utilized for deep architectural reasoning, highly complex refactoring, and traversing massive codebases.
- **GitHub Copilot**: Used for inline autocomplete and micro-function generation directly within the IDE.

## 2. Best Practices for AI-Assisted Engineering

### A. The "Driver vs. Navigator" Model
Treat agentic AI as your pair programming "Navigator". 
- **Best Practice**: You (the engineer) are the "Driver". You must maintain full context of the architecture. Use AI to generate the boilerplate, write the tests, or suggest the algorithms, but *you* must review, understand, and own every single line of code it produces.

### B. Context is Everything
Agentic AI is only as good as the context you provide.
- **Best Practice**: Provide the AI with explicit architectural boundaries before asking it to generate code. 
- **Example Prompt**: *"Using our standard NestJS CQRS architecture, generate a CreateUserCommand. Ensure you use class-validator on the DTO, and do not write SQL directly in the handler."*

### C. Accelerating the Testing Phase
- **Best Practice**: Use AI to generate the initial pass of Unit and Integration tests. AI is exceptionally good at identifying edge cases and writing Jest/Pest boilerplate.
- **Action**: After you write a complex service method, immediately ask the AI: *"Generate a comprehensive Jest test suite for this method, including mock implementations for the database repository, and cover the 3 edge cases where the API returns 404."*

## 3. What NOT to do with AI (Anti-Patterns)

### 1. Blind Acceptance
- **Anti-Pattern**: Copying/pasting or blindly accepting AI-generated code without reading it.
- **Why?**: AI can hallucinate APIs, use outdated library syntax (especially in fast-moving ecosystems like Next.js App Router), or introduce subtle security flaws.
- **Rule**: If you do not understand the code, you cannot commit it.

### 2. Bypassing Governance
- **Anti-Pattern**: Using AI to quickly bypass Quality Gates (e.g., asking AI to write empty tests just to bump the code coverage percentage).
- **Why?**: This defeats the purpose of the gate and introduces massive technical debt. 

### 3. Leaking Sensitive Data
- **Anti-Pattern**: Pasting production database dumps, real PII (Personally Identifiable Information), or hardcoded API keys into an AI prompt.
- **Rule**: Never expose sensitive data. Always sanitize your prompts or rely exclusively on enterprise-secured instances of these tools.

## 4. The Future of the SDLC
The integration of tools like Antigravity means the traditional SDLC is compressing.
- **Design**: AI helps generate C4 diagrams and PlantUML from requirements.
- **Development**: AI writes the boilerplate, leaving the engineer to focus solely on complex business logic and edge cases.
- **Review**: AI acts as the first-pass PR reviewer, instantly flagging code smells before a human reviewer even sees the code.
