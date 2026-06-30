import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Folder Structure & Architecture","description":"","frontmatter":{},"headers":[],"relativePath":"coding-standards/frontend/folder-structure.md","filePath":"coding-standards/frontend/folder-structure.md"}');
const _sfc_main = { name: "coding-standards/frontend/folder-structure.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="folder-structure-architecture" tabindex="-1">Folder Structure &amp; Architecture <a class="header-anchor" href="#folder-structure-architecture" aria-label="Permalink to &quot;Folder Structure &amp; Architecture&quot;">​</a></h1><p>A well-organised folder structure is critical for developer productivity and long-term maintainability. The recommended architecture follows a <strong>feature-based (bounded context)</strong> pattern combined with a shared common layer.</p><hr><h2 id="top-level-structure" tabindex="-1">Top-Level Structure <a class="header-anchor" href="#top-level-structure" aria-label="Permalink to &quot;Top-Level Structure&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>project-root/</span></span>
<span class="line"><span>├── src/</span></span>
<span class="line"><span>│   ├── app/                    # Next.js App Router (pages, layouts, routes only)</span></span>
<span class="line"><span>│   ├── common/                 # Shared components, hooks, utils, types</span></span>
<span class="line"><span>│   │   ├── components/</span></span>
<span class="line"><span>│   │   │   └── ui/             # Base UI primitives (Button, Input, Select)</span></span>
<span class="line"><span>│   │   ├── hooks/</span></span>
<span class="line"><span>│   │   ├── util/</span></span>
<span class="line"><span>│   │   ├── store/              # Global state (Zustand)</span></span>
<span class="line"><span>│   │   ├── data/               # Shared API fetching</span></span>
<span class="line"><span>│   │   ├── types/</span></span>
<span class="line"><span>│   │   ├── schemas/            # Shared Zod schemas</span></span>
<span class="line"><span>│   │   ├── _domain/            # Domain models &amp; enums</span></span>
<span class="line"><span>│   │   └── constants.ts</span></span>
<span class="line"><span>│   ├── context.&lt;feature&gt;/      # Feature-based bounded contexts</span></span>
<span class="line"><span>│   │   ├── components/</span></span>
<span class="line"><span>│   │   ├── _domain/</span></span>
<span class="line"><span>│   │   │   ├── model.types.&lt;name&gt;.ts</span></span>
<span class="line"><span>│   │   │   ├── model.schemas.&lt;name&gt;.ts</span></span>
<span class="line"><span>│   │   │   └── model.enums.&lt;name&gt;.ts</span></span>
<span class="line"><span>│   │   ├── data/</span></span>
<span class="line"><span>│   │   ├── hooks/</span></span>
<span class="line"><span>│   │   ├── _utils/</span></span>
<span class="line"><span>│   │   └── __tests__/</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>├── e2e/                        # End-to-End tests (Playwright + BDD)</span></span>
<span class="line"><span>│   ├── features/               # Gherkin .feature files</span></span>
<span class="line"><span>│   ├── steps/                  # Step definitions</span></span>
<span class="line"><span>│   ├── common/                 # Page objects &amp; utilities</span></span>
<span class="line"><span>│   └── support/                # Test data, mocks, helpers</span></span>
<span class="line"><span>├── public/                     # Static assets</span></span>
<span class="line"><span>├── docs/                       # Project documentation</span></span>
<span class="line"><span>├── __mocks__/                  # Global test mocks</span></span>
<span class="line"><span>└── scripts/                    # Build &amp; utility scripts</span></span></code></pre></div><hr><h2 id="key-architectural-principles" tabindex="-1">Key Architectural Principles <a class="header-anchor" href="#key-architectural-principles" aria-label="Permalink to &quot;Key Architectural Principles&quot;">​</a></h2><h3 id="feature-based-organisation" tabindex="-1">Feature-Based Organisation <a class="header-anchor" href="#feature-based-organisation" aria-label="Permalink to &quot;Feature-Based Organisation&quot;">​</a></h3><p>Group code by feature domain (<code>context.&lt;name&gt;</code>) rather than by technical role. Each context folder is self-contained with its own components, hooks, utilities, domain models, and tests.</p><p><strong>Do this:</strong></p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>src/context.customer/</span></span>
<span class="line"><span>  components/</span></span>
<span class="line"><span>  _domain/</span></span>
<span class="line"><span>  hooks/</span></span>
<span class="line"><span>  data/</span></span>
<span class="line"><span>  __tests__/</span></span></code></pre></div><p><strong>Not this:</strong></p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>src/components/</span></span>
<span class="line"><span>src/hooks/</span></span>
<span class="line"><span>src/services/</span></span>
<span class="line"><span>src/types/</span></span></code></pre></div><h3 id="shared-common-layer" tabindex="-1">Shared Common Layer <a class="header-anchor" href="#shared-common-layer" aria-label="Permalink to &quot;Shared Common Layer&quot;">​</a></h3><p>Reusable components, hooks, and utilities that span multiple features live in <code>src/common/</code>. Base UI primitives (Input, Button, Select, Dialog) go in <code>common/components/ui/</code> and are built on Radix UI headless components.</p><h3 id="app-router-for-routing-only" tabindex="-1">App Router for Routing Only <a class="header-anchor" href="#app-router-for-routing-only" aria-label="Permalink to &quot;App Router for Routing Only&quot;">​</a></h3><p>The <code>src/app/</code> directory should only contain Next.js route files:</p><ul><li><code>page.tsx</code></li><li><code>layout.tsx</code></li><li><code>loading.tsx</code></li><li><code>error.tsx</code></li></ul><p>All UI logic and components come from <code>context.*</code> or <code>common</code> folders. The app directory is the entry point, not the feature implementation.</p><h3 id="private-folders" tabindex="-1">Private Folders <a class="header-anchor" href="#private-folders" aria-label="Permalink to &quot;Private Folders&quot;">​</a></h3><p>Prefix internal/private folders with an underscore to indicate they should not be imported from outside their context:</p><ul><li><code>_domain/</code> — type definitions, schemas, enums</li><li><code>_hooks/</code> — context-internal hooks</li><li><code>_utils/</code> — context-internal utilities</li><li><code>_components/</code> — context-internal components</li></ul><h3 id="domain-layer" tabindex="-1">Domain Layer <a class="header-anchor" href="#domain-layer" aria-label="Permalink to &quot;Domain Layer&quot;">​</a></h3><p>Each context has a <code>_domain/</code> folder containing:</p><table tabindex="0"><thead><tr><th>File</th><th>Purpose</th></tr></thead><tbody><tr><td><code>model.types.&lt;name&gt;.ts</code></td><td>TypeScript type definitions</td></tr><tr><td><code>model.schemas.&lt;name&gt;.ts</code></td><td>Zod validation schemas</td></tr><tr><td><code>model.enums.&lt;name&gt;.ts</code></td><td>Enums for the domain</td></tr></tbody></table><hr><h2 id="barrel-files" tabindex="-1">Barrel Files <a class="header-anchor" href="#barrel-files" aria-label="Permalink to &quot;Barrel Files&quot;">​</a></h2><blockquote><p><strong>Avoid barrel files (<code>index.ts</code> re-exports).</strong> Import directly from the source file.</p></blockquote><p>Barrel files slow down builds and create circular dependency issues. They also obscure where a module actually lives, making refactoring harder.</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// ❌ Avoid</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { CustomerForm } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;@/context.customer&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// ✅ Correct</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { CustomerForm } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;@/context.customer/components/CustomerForm&#39;</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("coding-standards/frontend/folder-structure.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const folderStructure = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  folderStructure as default
};
