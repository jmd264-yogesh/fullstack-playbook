import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Production Readiness Checklist","description":"","frontmatter":{},"headers":[],"relativePath":"templates/production-readiness.md","filePath":"templates/production-readiness.md"}');
const _sfc_main = { name: "templates/production-readiness.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="production-readiness-checklist" tabindex="-1">Production Readiness Checklist <a class="header-anchor" href="#production-readiness-checklist" aria-label="Permalink to &quot;Production Readiness Checklist&quot;">​</a></h1><p>Before any service goes live to customers for the first time, this checklist must be completed by the Tech Lead.</p><h2 id="reliability" tabindex="-1">Reliability <a class="header-anchor" href="#reliability" aria-label="Permalink to &quot;Reliability&quot;">​</a></h2><ul><li>[ ] Load testing completed (p95 latency within budget).</li><li>[ ] Autoscaling policies configured and tested.</li><li>[ ] Database backups configured and restoration tested.</li></ul><h2 id="security" tabindex="-1">Security <a class="header-anchor" href="#security" aria-label="Permalink to &quot;Security&quot;">​</a></h2><ul><li>[ ] Pen-test / DAST scan completed with 0 high vulnerabilities.</li><li>[ ] WAF (Web Application Firewall) blocking rules enabled.</li><li>[ ] Rate limiting applied to all public endpoints.</li></ul><h2 id="observability" tabindex="-1">Observability <a class="header-anchor" href="#observability" aria-label="Permalink to &quot;Observability&quot;">​</a></h2><ul><li>[ ] PagerDuty alerts configured for SEV-1 scenarios.</li><li>[ ] Dashboards created for SLIs (Error rate, Latency, Traffic).</li><li>[ ] Runbook written and linked in the repository.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("templates/production-readiness.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const productionReadiness = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  productionReadiness as default
};
