import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Observability & Monitoring","description":"","frontmatter":{},"headers":[],"relativePath":"operations/observability.md","filePath":"operations/observability.md"}');
const _sfc_main = { name: "operations/observability.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="observability-monitoring" tabindex="-1">Observability &amp; Monitoring <a class="header-anchor" href="#observability-monitoring" aria-label="Permalink to &quot;Observability &amp; Monitoring&quot;">​</a></h1><h2 id="_1-the-three-pillars" tabindex="-1">1. The Three Pillars <a class="header-anchor" href="#_1-the-three-pillars" aria-label="Permalink to &quot;1. The Three Pillars&quot;">​</a></h2><ul><li><strong>Logs</strong>: Structured JSON logs. Avoid multi-line string logs.</li><li><strong>Metrics</strong>: Time-series data tracking RPS (Requests Per Second), Error Rates, and Latency.</li><li><strong>Traces</strong>: Distributed tracing (e.g., OpenTelemetry, Jaeger) is mandatory for microservices to track a request&#39;s journey across network boundaries.</li></ul><h2 id="_2-service-level-objectives-slos" tabindex="-1">2. Service Level Objectives (SLOs) <a class="header-anchor" href="#_2-service-level-objectives-slos" aria-label="Permalink to &quot;2. Service Level Objectives (SLOs)&quot;">​</a></h2><ul><li><strong>SLI (Indicator)</strong>: E.g., The percentage of HTTP 200 responses in the last 5 minutes.</li><li><strong>SLO (Objective)</strong>: E.g., 99.9% of requests must succeed.</li><li><strong>Error Budgets</strong>: If a team burns through their error budget (drops below 99.9%), feature development is halted, and the team must exclusively work on reliability.</li></ul><h2 id="_3-correlation-ids" tabindex="-1">3. Correlation IDs <a class="header-anchor" href="#_3-correlation-ids" aria-label="Permalink to &quot;3. Correlation IDs&quot;">​</a></h2><ul><li>Every incoming HTTP request at the API Gateway receives a unique <code>x-correlation-id</code> header. This ID must be injected into all logs and passed downstream to all other microservices to allow for exact tracing of a failed request.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("operations/observability.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const observability = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  observability as default
};
