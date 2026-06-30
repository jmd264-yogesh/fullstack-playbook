import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Governance Overview","description":"","frontmatter":{},"headers":[],"relativePath":"governance/overview.md","filePath":"governance/overview.md"}');
const _sfc_main = { name: "governance/overview.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="governance-overview" tabindex="-1">Governance Overview <a class="header-anchor" href="#governance-overview" aria-label="Permalink to &quot;Governance Overview&quot;">​</a></h1><p>Engineering Governance is the framework of rules, roles, and processes that ensures software is delivered securely, efficiently, and in alignment with enterprise strategy.</p><p>Governance is often misconstrued as red tape. In our CoE, governance is implemented as <strong>&quot;Guardrails, not Blockers&quot;</strong>. We automate compliance wherever possible to keep developer velocity high.</p><h2 id="the-three-pillars-of-governance" tabindex="-1">The Three Pillars of Governance <a class="header-anchor" href="#the-three-pillars-of-governance" aria-label="Permalink to &quot;The Three Pillars of Governance&quot;">​</a></h2><ol><li><strong>Architectural Governance</strong>: Ensuring teams build scalable, resilient systems that fit into the broader enterprise ecosystem (managed via the ARB).</li><li><strong>Operational Governance</strong>: Ensuring systems are observable, secure, and maintainable in production (managed via Quality Gates and DevOps).</li><li><strong>Delivery Governance</strong>: Ensuring the SDLC is followed, capacity is managed, and quality metrics are tracked (managed via Agile processes and KPIs).</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("governance/overview.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const overview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  overview as default
};
