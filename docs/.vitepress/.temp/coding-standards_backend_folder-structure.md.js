import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Backend Folder Structure","description":"","frontmatter":{},"headers":[],"relativePath":"coding-standards/backend/folder-structure.md","filePath":"coding-standards/backend/folder-structure.md"}');
const _sfc_main = { name: "coding-standards/backend/folder-structure.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="backend-folder-structure" tabindex="-1">Backend Folder Structure <a class="header-anchor" href="#backend-folder-structure" aria-label="Permalink to &quot;Backend Folder Structure&quot;">​</a></h1><p>A well-organised backend project structure ensures developer productivity, clear separation of concerns, and long-term maintainability. Standards differ between our two primary backend frameworks.</p><hr><h2 id="nestjs-folder-structure" tabindex="-1">NestJS Folder Structure <a class="header-anchor" href="#nestjs-folder-structure" aria-label="Permalink to &quot;NestJS Folder Structure&quot;">​</a></h2><p>NestJS uses a <strong>module-based architecture</strong>. Every feature is a self-contained module with its own controller, service, DTOs, and entities.</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>project-root/</span></span>
<span class="line"><span>├── src/</span></span>
<span class="line"><span>│   ├── main.ts                         # Application bootstrap</span></span>
<span class="line"><span>│   ├── app.module.ts                   # Root application module</span></span>
<span class="line"><span>│   ├── app.controller.ts               # Root health/status controller</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── modules/                        # Feature modules (bounded contexts)</span></span>
<span class="line"><span>│   │   └── [feature]/</span></span>
<span class="line"><span>│   │       ├── [feature].module.ts     # Module registration</span></span>
<span class="line"><span>│   │       ├── [feature].controller.ts # HTTP routing only</span></span>
<span class="line"><span>│   │       ├── [feature].service.ts    # Business logic</span></span>
<span class="line"><span>│   │       ├── dto/                    # Data Transfer Objects (request/response shapes)</span></span>
<span class="line"><span>│   │       │   ├── create-[feature].dto.ts</span></span>
<span class="line"><span>│   │       │   └── update-[feature].dto.ts</span></span>
<span class="line"><span>│   │       ├── entities/               # Database entity / ORM model</span></span>
<span class="line"><span>│   │       │   └── [feature].entity.ts</span></span>
<span class="line"><span>│   │       └── __tests__/</span></span>
<span class="line"><span>│   │           ├── [feature].controller.spec.ts</span></span>
<span class="line"><span>│   │           └── [feature].service.spec.ts</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── common/                         # Shared cross-cutting concerns</span></span>
<span class="line"><span>│   │   ├── decorators/                 # Custom decorators (e.g., @CurrentUser)</span></span>
<span class="line"><span>│   │   ├── filters/                    # Exception filters (global error handler)</span></span>
<span class="line"><span>│   │   ├── guards/                     # Auth guards (JWT, roles)</span></span>
<span class="line"><span>│   │   ├── interceptors/               # Logging, serialization</span></span>
<span class="line"><span>│   │   ├── pipes/                      # Validation and transformation pipes</span></span>
<span class="line"><span>│   │   ├── middleware/                 # HTTP middleware</span></span>
<span class="line"><span>│   │   └── types/                      # Shared TypeScript types/interfaces</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── config/                         # Configuration modules</span></span>
<span class="line"><span>│   │   ├── app.config.ts</span></span>
<span class="line"><span>│   │   ├── database.config.ts</span></span>
<span class="line"><span>│   │   └── auth.config.ts</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   └── database/                       # Database layer (if using TypeORM or Prisma separately)</span></span>
<span class="line"><span>│       ├── migrations/</span></span>
<span class="line"><span>│       └── seeds/</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── test/                               # E2E / integration tests</span></span>
<span class="line"><span>│   ├── app.e2e-spec.ts</span></span>
<span class="line"><span>│   └── jest-e2e.json</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── prisma/                             # Prisma schema and migrations (if using Prisma)</span></span>
<span class="line"><span>│   ├── schema.prisma</span></span>
<span class="line"><span>│   └── migrations/</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── .env.example</span></span>
<span class="line"><span>├── nest-cli.json</span></span>
<span class="line"><span>├── tsconfig.json</span></span>
<span class="line"><span>└── package.json</span></span></code></pre></div><h3 id="key-nestjs-principles" tabindex="-1">Key NestJS Principles <a class="header-anchor" href="#key-nestjs-principles" aria-label="Permalink to &quot;Key NestJS Principles&quot;">​</a></h3><p><strong>One module per feature domain.</strong> Each module is fully self-contained.</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>modules/</span></span>
<span class="line"><span>├── users/</span></span>
<span class="line"><span>├── orders/</span></span>
<span class="line"><span>├── payments/</span></span>
<span class="line"><span>└── notifications/</span></span></code></pre></div><p><strong>Controller → Service → Repository</strong> is the strict dependency chain. Controllers call services; services call repositories or the ORM directly. No business logic in controllers.</p><p><strong>Common modules are shared, not duplicated.</strong> Guards, filters, decorators, and interceptors belong in <code>common/</code> and are registered globally in <code>main.ts</code> or <code>app.module.ts</code>.</p><hr><h2 id="laravel-folder-structure" tabindex="-1">Laravel Folder Structure <a class="header-anchor" href="#laravel-folder-structure" aria-label="Permalink to &quot;Laravel Folder Structure&quot;">​</a></h2><p>Laravel follows the <strong>MVC pattern</strong> with additional layers for clean architecture. The standard <code>app/</code> directory is extended with <code>Actions/</code> and <code>Services/</code> for business logic separation.</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>project-root/</span></span>
<span class="line"><span>├── app/</span></span>
<span class="line"><span>│   ├── Actions/                        # Single-responsibility business logic classes</span></span>
<span class="line"><span>│   │   └── CreateUserAction.php</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── Http/</span></span>
<span class="line"><span>│   │   ├── Controllers/                # HTTP-only: receive request, return response</span></span>
<span class="line"><span>│   │   │   └── UserController.php</span></span>
<span class="line"><span>│   │   ├── Requests/                   # Form Request validation and authorization</span></span>
<span class="line"><span>│   │   │   ├── StoreUserRequest.php</span></span>
<span class="line"><span>│   │   │   └── UpdateUserRequest.php</span></span>
<span class="line"><span>│   │   ├── Resources/                  # API Resource transformers (JSON output)</span></span>
<span class="line"><span>│   │   │   └── UserResource.php</span></span>
<span class="line"><span>│   │   └── Middleware/                 # Route-level middleware</span></span>
<span class="line"><span>│   │       └── EnsureProfileComplete.php</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── Models/                         # Eloquent models</span></span>
<span class="line"><span>│   │   └── User.php</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── Services/                       # Complex orchestration services (multi-action flows)</span></span>
<span class="line"><span>│   │   └── PaymentService.php</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── Jobs/                           # Queued background jobs</span></span>
<span class="line"><span>│   │   └── SendWelcomeEmailJob.php</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── Events/                         # Domain events</span></span>
<span class="line"><span>│   │   └── UserRegistered.php</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── Listeners/                      # Event listeners</span></span>
<span class="line"><span>│   │   └── SendWelcomeEmail.php</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── Policies/                       # Model authorization policies</span></span>
<span class="line"><span>│   │   └── PostPolicy.php</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   └── Exceptions/                     # Custom exception handlers</span></span>
<span class="line"><span>│       └── Handler.php</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── database/</span></span>
<span class="line"><span>│   ├── migrations/                     # Database schema migrations</span></span>
<span class="line"><span>│   ├── seeders/                        # Test/dev data seeders</span></span>
<span class="line"><span>│   └── factories/                      # Model factories for testing</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── routes/</span></span>
<span class="line"><span>│   ├── api.php                         # Stateless API routes</span></span>
<span class="line"><span>│   └── web.php                         # Web/session routes</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── tests/</span></span>
<span class="line"><span>│   ├── Feature/                        # HTTP / integration tests (Pest PHP)</span></span>
<span class="line"><span>│   │   └── UserRegistrationTest.php</span></span>
<span class="line"><span>│   └── Unit/                           # Pure unit tests</span></span>
<span class="line"><span>│       └── CreateUserActionTest.php</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── config/</span></span>
<span class="line"><span>├── resources/</span></span>
<span class="line"><span>├── storage/</span></span>
<span class="line"><span>├── .env.example</span></span>
<span class="line"><span>└── composer.json</span></span></code></pre></div><h3 id="key-laravel-principles" tabindex="-1">Key Laravel Principles <a class="header-anchor" href="#key-laravel-principles" aria-label="Permalink to &quot;Key Laravel Principles&quot;">​</a></h3><p><strong>Action classes, not fat controllers.</strong> If business logic exceeds ~5 lines, move it to a dedicated <code>Action</code> class. Controllers should only:</p><ol><li>Receive the request via a <code>FormRequest</code></li><li>Call an <code>Action</code> or <code>Service</code></li><li>Return a response via an API <code>Resource</code></li></ol><p><strong>Policies for authorization.</strong> Never check <code>$user-&gt;role === &#39;admin&#39;</code> inline. Create a Policy and call <code>$this-&gt;authorize(&#39;update&#39;, $post)</code> in the controller.</p><p><strong>FormRequests always.</strong> Never use <code>$request-&gt;validate()</code> inside a controller method. Always use dedicated <code>FormRequest</code> classes — they make authorization and validation reusable and testable.</p><hr><h2 id="private-folders-conventions" tabindex="-1">Private Folders &amp; Conventions <a class="header-anchor" href="#private-folders-conventions" aria-label="Permalink to &quot;Private Folders &amp; Conventions&quot;">​</a></h2><p>Both frameworks follow this convention for internal-only code:</p><table tabindex="0"><thead><tr><th>Prefix</th><th>Meaning</th></tr></thead><tbody><tr><td><code>__tests__/</code></td><td>Co-located test files</td></tr><tr><td><code>_</code> prefix (NestJS)</td><td>Internal utility not exported publicly</td></tr><tr><td><code>Abstract</code> prefix</td><td>Abstract base classes</td></tr><tr><td><code>I</code> prefix</td><td>Interfaces (NestJS/TypeScript)</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("coding-standards/backend/folder-structure.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const folderStructure = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  folderStructure as default
};
