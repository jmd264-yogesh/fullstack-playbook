import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Full Stack Delivery Playbook","text":"Engineering Governance & Standards","tagline":"The definitive guide to shipping secure, scalable, and maintainable software.","image":{"src":"/hero-logo.png","alt":"Playbook Logo"},"actions":[{"theme":"brand","text":"Explore the Lifecycle","link":"/delivery-lifecycle/overview"},{"theme":"alt","text":"View Coding Standards","link":"/coding-standards/overview"}]},"features":[{"title":"🚀 Delivery Lifecycle","details":"Standardized SDLC phases, from Requirement Intake to Production Hypercare."},{"title":"💻 Strict Coding Standards","details":"Deep architectural guidelines for React, Next.js, NestJS, Laravel, and Databases."},{"title":"🛡️ DevSecOps & Quality","details":"CI/CD Quality Gates enforcing 80% coverage, SAST/SCA scanning, and zero critical CVEs."},{"title":"🤖 AI-Assisted Engineering","details":"Accelerating delivery velocity using Antigravity and Claude Code securely."},{"title":"📊 DORA Metrics & KPIs","details":"Objective tracking of Deployment Frequency, Lead Time, MTTR, and Change Failure Rate."},{"title":"🏛️ Enterprise Governance","details":"Lightweight ARB/CAB approval workflows, RACI matrices, and SOC2 compliance automation."}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="custom-stats-section"><h2 class="custom-stats-title">Built for High-Velocity Engineering Teams</h2><p class="custom-stats-desc"> This playbook is not just documentation; it is the absolute source of truth for how we build software at scale. By standardizing our tech stack, automating our quality gates, and embracing AI-driven workflows, we eliminate boilerplate decisions and empower engineers to focus purely on delivering massive business value. </p><div class="custom-stats-grid"><div class="custom-stat-card"><div class="custom-stat-value" style="${ssrRenderStyle({ "color": "#19105b" })}">100%</div><div class="custom-stat-label">Compliance</div></div><div class="custom-stat-card"><div class="custom-stat-value" style="${ssrRenderStyle({ "color": "#ff6196" })}">Zero</div><div class="custom-stat-label">Critical CVEs</div></div><div class="custom-stat-card"><div class="custom-stat-value" style="${ssrRenderStyle({ "color": "#19105b" })}">Day 1</div><div class="custom-stat-label">Developer Onboarding</div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
