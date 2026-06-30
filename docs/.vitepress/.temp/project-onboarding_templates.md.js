import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Standard Repository Structures","description":"","frontmatter":{},"headers":[],"relativePath":"project-onboarding/templates.md","filePath":"project-onboarding/templates.md"}');
const _sfc_main = { name: "project-onboarding/templates.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="standard-repository-structures" tabindex="-1">Standard Repository Structures <a class="header-anchor" href="#standard-repository-structures" aria-label="Permalink to &quot;Standard Repository Structures&quot;">​</a></h1><p>Consistency in repository layout allows engineers to switch between projects seamlessly without spending hours understanding where logic lives.</p><h2 id="monorepo-strategy-turborepo-nx" tabindex="-1">Monorepo Strategy (Turborepo / Nx) <a class="header-anchor" href="#monorepo-strategy-turborepo-nx" aria-label="Permalink to &quot;Monorepo Strategy (Turborepo / Nx)&quot;">​</a></h2><p>For tightly coupled full-stack applications, we prefer a Monorepo structure managed by Turborepo or Nx.</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/</span></span>
<span class="line"><span>├── apps/</span></span>
<span class="line"><span>│   ├── web/                # Next.js Frontend</span></span>
<span class="line"><span>│   │   ├── src/</span></span>
<span class="line"><span>│   │   ├── package.json</span></span>
<span class="line"><span>│   │   └── next.config.js</span></span>
<span class="line"><span>│   ├── api/                # NestJS Backend</span></span>
<span class="line"><span>│   │   ├── src/</span></span>
<span class="line"><span>│   │   ├── package.json</span></span>
<span class="line"><span>│   │   └── nest-cli.json</span></span>
<span class="line"><span>├── packages/</span></span>
<span class="line"><span>│   ├── ui/                 # Shared React Components (Tailwind)</span></span>
<span class="line"><span>│   ├── database/           # Prisma schema and shared DB client</span></span>
<span class="line"><span>│   ├── types/              # Shared TypeScript interfaces (DTOs)</span></span>
<span class="line"><span>│   ├── eslint-config/      # Standardized linting rules</span></span>
<span class="line"><span>│   └── tsconfig/           # Standardized TS configs</span></span>
<span class="line"><span>├── .github/workflows/      # CI/CD Pipelines</span></span>
<span class="line"><span>├── turbo.json              # Turborepo task runner config</span></span>
<span class="line"><span>└── package.json            # Root workspace dependencies</span></span></code></pre></div><h2 id="required-boilerplate-files" tabindex="-1">Required Boilerplate Files <a class="header-anchor" href="#required-boilerplate-files" aria-label="Permalink to &quot;Required Boilerplate Files&quot;">​</a></h2><p>Regardless of monorepo or polyrepo, every repository MUST contain the following at the root:</p><ol><li><strong><code>README.md</code></strong>: Must contain: <ul><li>High-level system architecture overview.</li><li>Local development setup instructions (<code>npm run dev</code>, Docker Compose commands).</li><li>Links to staging/production URLs and APM dashboards.</li></ul></li><li><strong><code>.nvmrc</code></strong>: Explicitly defines the required Node.js version (e.g., <code>20.11.1</code>).</li><li><strong><code>docker-compose.yml</code></strong>: Must spin up the local development database (e.g., Postgres, Redis) so developers don&#39;t need to install databases globally on their machines.</li><li><strong><code>Makefile</code> or <code>package.json</code> scripts</strong>: Standardized commands (<code>make test</code>, <code>make lint</code>, <code>make build</code>) so CI pipelines can execute consistently across different stacks.</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("project-onboarding/templates.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const templates = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  templates as default
};
