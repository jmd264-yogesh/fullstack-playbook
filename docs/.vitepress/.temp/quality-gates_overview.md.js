import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Quality Gates Overview","description":"","frontmatter":{},"headers":[],"relativePath":"quality-gates/overview.md","filePath":"quality-gates/overview.md"}');
const _sfc_main = { name: "quality-gates/overview.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="quality-gates-overview" tabindex="-1">Quality Gates Overview <a class="header-anchor" href="#quality-gates-overview" aria-label="Permalink to &quot;Quality Gates Overview&quot;">​</a></h1><p>Quality Gates are the automated, non-negotiable checkpoints in our CI/CD pipelines. They act as the objective judges of code quality, security, and performance.</p><p>By enforcing standards via automation rather than manual review, we eliminate subjectivity, reduce cognitive load on reviewers, and guarantee a consistent baseline of quality across the entire enterprise.</p><h2 id="the-principle-of-fail-fast" tabindex="-1">The Principle of &quot;Fail Fast&quot; <a class="header-anchor" href="#the-principle-of-fail-fast" aria-label="Permalink to &quot;The Principle of &quot;Fail Fast&quot;&quot;">​</a></h2><p>Quality gates are designed to fail as early in the SDLC as possible.</p><ul><li><strong>IDE Level</strong>: Linting and formatting run locally via Husky pre-commit hooks.</li><li><strong>PR Level</strong>: Unit tests and SAST scans run when a Pull Request is opened.</li><li><strong>Integration Level</strong>: E2E tests and DAST scans run when code is merged.</li><li><strong>Release Level</strong>: Performance and smoke tests run before promoting to Production.</li></ul><p>If a gate fails, the pipeline halts immediately. Code cannot bypass a failed gate without documented, temporary exception approval from the Engineering Director.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("quality-gates/overview.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const overview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  overview as default
};
