import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Testing Gates","description":"","frontmatter":{},"headers":[],"relativePath":"quality-gates/testing-gates.md","filePath":"quality-gates/testing-gates.md"}');
const _sfc_main = { name: "quality-gates/testing-gates.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="testing-gates" tabindex="-1">Testing Gates <a class="header-anchor" href="#testing-gates" aria-label="Permalink to &quot;Testing Gates&quot;">​</a></h1><p>Automated functional and performance testing gates ensure that code behaves exactly as expected under real-world conditions.</p><h2 id="_1-functional-testing-gates" tabindex="-1">1. Functional Testing Gates <a class="header-anchor" href="#_1-functional-testing-gates" aria-label="Permalink to &quot;1. Functional Testing Gates&quot;">​</a></h2><ul><li><strong>Unit &amp; Integration Tests</strong>: Pipeline executes <code>npm run test</code> or <code>phpunit</code>. <ul><li><strong>Gate</strong>: <strong>100% Pass Rate</strong>. A single failing test halts the deployment pipeline.</li></ul></li><li><strong>End-to-End (E2E) Tests</strong>: Executed against the ephemeral Staging environment post-deployment. <ul><li><strong>Gate</strong>: <strong>100% Pass Rate</strong> for Critical User Journeys (CUJs) defined in Cypress/Playwright.</li></ul></li></ul><h2 id="_2-performance-resilience-gates" tabindex="-1">2. Performance &amp; Resilience Gates <a class="header-anchor" href="#_2-performance-resilience-gates" aria-label="Permalink to &quot;2. Performance &amp; Resilience Gates&quot;">​</a></h2><p>Performance regressions must be caught before Production.</p><ul><li><strong>Tooling</strong>: k6, JMeter.</li><li><strong>Gate Conditions (Load Test)</strong>: <ul><li><strong>Latency</strong>: The p95 response time for core APIs must not exceed <strong>250ms</strong> under baseline load.</li><li><strong>Error Rate</strong>: HTTP 5xx errors must remain at <strong>0%</strong> during the load test.</li><li><strong>Throughput</strong>: System must successfully handle the defined Requests Per Second (RPS) benchmark without crashing or autoscaling failing.</li></ul></li></ul><h2 id="_3-accessibility-a11y-gates" tabindex="-1">3. Accessibility (a11y) Gates <a class="header-anchor" href="#_3-accessibility-a11y-gates" aria-label="Permalink to &quot;3. Accessibility (a11y) Gates&quot;">​</a></h2><p>For all front-end applications, accessibility is a compliance requirement.</p><ul><li><strong>Tooling</strong>: Axe-core CI integration.</li><li><strong>Gate</strong>: Zero <strong>Critical</strong> accessibility violations (e.g., missing ARIA labels, invalid contrast ratios).</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("quality-gates/testing-gates.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const testingGates = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  testingGates as default
};
