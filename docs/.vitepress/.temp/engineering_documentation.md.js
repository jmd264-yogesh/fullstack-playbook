import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Documentation Standards","description":"","frontmatter":{},"headers":[],"relativePath":"engineering/documentation.md","filePath":"engineering/documentation.md"}');
const _sfc_main = { name: "engineering/documentation.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="documentation-standards" tabindex="-1">Documentation Standards <a class="header-anchor" href="#documentation-standards" aria-label="Permalink to &quot;Documentation Standards&quot;">​</a></h1><p>&quot;If a human has to repeat it twice, document it.&quot;</p><h2 id="_1-architecture-decision-records-adrs" tabindex="-1">1. Architecture Decision Records (ADRs) <a class="header-anchor" href="#_1-architecture-decision-records-adrs" aria-label="Permalink to &quot;1. Architecture Decision Records (ADRs)&quot;">​</a></h2><p>We use ADRs to capture why architectural decisions were made.</p><ul><li><strong>Where</strong>: Stored in <code>docs/adr/</code> within the repository.</li><li><strong>Format</strong>: <ul><li>Context (The problem)</li><li>Options Considered</li><li>Decision (What we chose and why)</li><li>Consequences (Trade-offs)</li></ul></li></ul><h2 id="_2-api-documentation" tabindex="-1">2. API Documentation <a class="header-anchor" href="#_2-api-documentation" aria-label="Permalink to &quot;2. API Documentation&quot;">​</a></h2><ul><li>APIs must be self-documenting.</li><li>REST APIs must expose a Swagger/OpenAPI UI (e.g., via <code>@nestjs/swagger</code> in NestJS or L5-Swagger in Laravel).</li><li>GraphQL APIs must expose the GraphiQL playground in non-production environments with rich schema descriptions.</li></ul><h2 id="_3-runbooks" tabindex="-1">3. Runbooks <a class="header-anchor" href="#_3-runbooks" aria-label="Permalink to &quot;3. Runbooks&quot;">​</a></h2><p>Every microservice must have a <code>RUNBOOK.md</code> that explains to the On-Call engineer:</p><ol><li>What this service does.</li><li>What alerts are associated with it.</li><li>How to view its logs.</li><li>Step-by-step instructions for known failure mitigation.</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("engineering/documentation.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const documentation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  documentation as default
};
