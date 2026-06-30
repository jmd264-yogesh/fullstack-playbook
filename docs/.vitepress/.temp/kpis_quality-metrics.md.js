import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Quality & Stability Metrics","description":"","frontmatter":{},"headers":[],"relativePath":"kpis/quality-metrics.md","filePath":"kpis/quality-metrics.md"}');
const _sfc_main = { name: "kpis/quality-metrics.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="quality-stability-metrics" tabindex="-1">Quality &amp; Stability Metrics <a class="header-anchor" href="#quality-stability-metrics" aria-label="Permalink to &quot;Quality &amp; Stability Metrics&quot;">​</a></h1><p>Quality metrics provide visibility into the maintainability of the codebase and the effectiveness of our Quality Gates.</p><h2 id="_1-escaped-defect-rate" tabindex="-1">1. Escaped Defect Rate <a class="header-anchor" href="#_1-escaped-defect-rate" aria-label="Permalink to &quot;1. Escaped Defect Rate&quot;">​</a></h2><ul><li><strong>Definition</strong>: The number of bugs found in Production compared to the number of bugs found in Pre-Production (QA/Staging).</li><li><strong>Target</strong>: &lt; 5% of total defects should be found in Production.</li><li><strong>Action</strong>: High escaped defect rates require an immediate review of the E2E test suite. Every escaped defect MUST result in a new automated test to prevent recurrence.</li></ul><h2 id="_2-code-coverage-trend" tabindex="-1">2. Code Coverage Trend <a class="header-anchor" href="#_2-code-coverage-trend" aria-label="Permalink to &quot;2. Code Coverage Trend&quot;">​</a></h2><ul><li><strong>Definition</strong>: The percentage of source code executed by automated tests.</li><li><strong>Target</strong>: Strictly maintained at &gt;= 80%.</li><li><strong>Action</strong>: Monitored continuously via SonarQube. Pipeline fails if coverage drops relative to the <code>main</code> branch.</li></ul><h2 id="_3-technical-debt-ratio" tabindex="-1">3. Technical Debt Ratio <a class="header-anchor" href="#_3-technical-debt-ratio" aria-label="Permalink to &quot;3. Technical Debt Ratio&quot;">​</a></h2><ul><li><strong>Definition</strong>: The estimated time required to fix all Code Smells and maintainability issues relative to the total time it took to write the code (Measured by SonarQube).</li><li><strong>Target</strong>: Maintainability Rating &#39;A&#39; (&lt; 5% tech debt ratio).</li><li><strong>Action</strong>: If the ratio climbs, teams must allocate more than the standard 20% sprint capacity to refactoring.</li></ul><h2 id="_4-defect-resolution-time-sla" tabindex="-1">4. Defect Resolution Time (SLA) <a class="header-anchor" href="#_4-defect-resolution-time-sla" aria-label="Permalink to &quot;4. Defect Resolution Time (SLA)&quot;">​</a></h2><ul><li><strong>Definition</strong>: Time taken to resolve reported bugs based on priority.</li><li><strong>Enterprise SLAs</strong>: <ul><li><strong>P1 (Critical - Outage)</strong>: &lt; 4 hours.</li><li><strong>P2 (High - Core feature broken)</strong>: &lt; 24 hours.</li><li><strong>P3 (Medium - Workaround exists)</strong>: Within the current or next sprint.</li><li><strong>P4 (Low - Cosmetic)</strong>: Backlogged for prioritization.</li></ul></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("kpis/quality-metrics.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const qualityMetrics = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  qualityMetrics as default
};
