import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Reliability & Incident Management","description":"","frontmatter":{},"headers":[],"relativePath":"operations/incident-management.md","filePath":"operations/incident-management.md"}');
const _sfc_main = { name: "operations/incident-management.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="reliability-incident-management" tabindex="-1">Reliability &amp; Incident Management <a class="header-anchor" href="#reliability-incident-management" aria-label="Permalink to &quot;Reliability &amp; Incident Management&quot;">​</a></h1><h2 id="_1-incident-severity-matrix" tabindex="-1">1. Incident Severity Matrix <a class="header-anchor" href="#_1-incident-severity-matrix" aria-label="Permalink to &quot;1. Incident Severity Matrix&quot;">​</a></h2><ul><li><strong>SEV-1 (Critical)</strong>: Total system outage or severe data breach. (SLA: 15 mins).</li><li><strong>SEV-2 (High)</strong>: Core functionality broken for many users. (SLA: 30 mins).</li><li><strong>SEV-3 (Medium)</strong>: Non-core feature broken, workaround exists. (SLA: Next working day).</li></ul><h2 id="_2-the-on-call-process" tabindex="-1">2. The On-Call Process <a class="header-anchor" href="#_2-the-on-call-process" aria-label="Permalink to &quot;2. The On-Call Process&quot;">​</a></h2><ul><li>Handled via PagerDuty/Opsgenie.</li><li>Alerts must be actionable. &quot;CPU is at 80%&quot; is not an alert; autoscaling handles that. &quot;Payment Success Rate dropped below 95%&quot; is an alert.</li></ul><h2 id="_3-blameless-postmortems" tabindex="-1">3. Blameless Postmortems <a class="header-anchor" href="#_3-blameless-postmortems" aria-label="Permalink to &quot;3. Blameless Postmortems&quot;">​</a></h2><p>After every SEV-1 or SEV-2 incident, a postmortem document is required.</p><ul><li><strong>Rule</strong>: Postmortems are strictly <strong>blameless</strong>. We do not ask &quot;Who broke it?&quot;, we ask &quot;Why did the system allow a human to break it?&quot;</li><li>Must result in actionable Jira tickets (e.g., adding a new E2E test, tweaking an alert threshold) to prevent recurrence.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("operations/incident-management.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const incidentManagement = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  incidentManagement as default
};
