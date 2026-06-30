import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Approval Workflows (ARB & CAB)","description":"","frontmatter":{},"headers":[],"relativePath":"governance/approvals.md","filePath":"governance/approvals.md"}');
const _sfc_main = { name: "governance/approvals.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="approval-workflows-arb-cab" tabindex="-1">Approval Workflows (ARB &amp; CAB) <a class="header-anchor" href="#approval-workflows-arb-cab" aria-label="Permalink to &quot;Approval Workflows (ARB &amp; CAB)&quot;">​</a></h1><p>To manage risk, major systemic changes require formal review boards. We strive to keep these lightweight and asynchronous where possible.</p><h2 id="_1-architecture-review-board-arb" tabindex="-1">1. Architecture Review Board (ARB) <a class="header-anchor" href="#_1-architecture-review-board-arb" aria-label="Permalink to &quot;1. Architecture Review Board (ARB)&quot;">​</a></h2><p>The ARB ensures that new systems align with enterprise architecture, security policies, and cost models.</p><ul><li><strong>When is ARB required?</strong><ul><li>Creating a brand new microservice or application.</li><li>Introducing a technology that is not on the &quot;Adopt&quot; ring of the Tech Radar.</li><li>Making a fundamental shift in architecture (e.g., moving from REST to GraphQL, or from Monolith to Microservices).</li></ul></li><li><strong>The Process</strong>: <ol><li>The Architect submits a High-Level Design (HLD) document.</li><li>The ARB (consisting of Principal Architects and InfoSec) reviews asynchronously.</li><li>A 30-minute sync is held to discuss trade-offs, security implications, and approve/reject.</li></ol></li></ul><h2 id="_2-change-advisory-board-cab" tabindex="-1">2. Change Advisory Board (CAB) <a class="header-anchor" href="#_2-change-advisory-board-cab" aria-label="Permalink to &quot;2. Change Advisory Board (CAB)&quot;">​</a></h2><p>The CAB manages the risk of deploying changes into the Production environment.</p><ul><li><strong>Standard Changes (Automated)</strong>: <ul><li>Low-risk, repeatable changes (e.g., standard sprint feature releases, UI updates).</li><li>Pre-approved by CAB. Deployment is automated via CI/CD once Quality Gates pass. No meeting required.</li></ul></li><li><strong>Normal Changes</strong>: <ul><li>Moderate-risk changes (e.g., large database schema migrations, infrastructure changes).</li><li>Requires async review and approval by the Release Manager and Tech Lead.</li></ul></li><li><strong>Major Changes</strong>: <ul><li>High-risk changes (e.g., major system cutover, core framework upgrades).</li><li>Requires attendance at the weekly CAB meeting for formal risk assessment, downtime approval, and rollback plan review.</li></ul></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("governance/approvals.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const approvals = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  approvals as default
};
