import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Compliance & Audit Model","description":"","frontmatter":{},"headers":[],"relativePath":"governance/compliance-model.md","filePath":"governance/compliance-model.md"}');
const _sfc_main = { name: "governance/compliance-model.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="compliance-audit-model" tabindex="-1">Compliance &amp; Audit Model <a class="header-anchor" href="#compliance-audit-model" aria-label="Permalink to &quot;Compliance &amp; Audit Model&quot;">​</a></h1><p>As an enterprise, we are subject to external audits (e.g., SOC2, ISO 27001, GDPR). Our engineering practices must inherently satisfy these compliance requirements without causing manual overhead during audit season.</p><h2 id="automated-compliance-evidence" tabindex="-1">Automated Compliance Evidence <a class="header-anchor" href="#automated-compliance-evidence" aria-label="Permalink to &quot;Automated Compliance Evidence&quot;">​</a></h2><p>Auditors require proof that our governance processes are followed. We automate this evidence collection:</p><ol><li><strong>Change Management (SOC2 CC8.1)</strong>: <ul><li><em>Requirement</em>: All code changes to production must be reviewed and tested.</li><li><em>Evidence</em>: Branch protection rules in GitHub ensure no code is merged without a PR approval. The CI pipeline logs prove automated tests passed.</li></ul></li><li><strong>Access Control (SOC2 CC6.1)</strong>: <ul><li><em>Requirement</em>: Only authorized personnel can deploy code or access production databases.</li><li><em>Evidence</em>: Deployment triggers are restricted via Identity Provider (Okta/Azure AD) groups. Production DB access is vaulted and logged via Bastion hosts.</li></ul></li><li><strong>Vulnerability Management (SOC2 CC7.1)</strong>: <ul><li><em>Requirement</em>: System vulnerabilities must be identified and patched.</li><li><em>Evidence</em>: Snyk/SonarQube CI logs prove that code containing critical CVEs is blocked from deployment.</li></ul></li></ol><h2 id="the-monthly-compliance-scorecard" tabindex="-1">The Monthly Compliance Scorecard <a class="header-anchor" href="#the-monthly-compliance-scorecard" aria-label="Permalink to &quot;The Monthly Compliance Scorecard&quot;">​</a></h2><p>The CoE dashboard aggregates repository data and issues a monthly compliance score (0-100%) to every engineering squad based on:</p><ul><li>Test coverage metrics.</li><li>Open security vulnerabilities (and SLA breaches).</li><li>Presence of stale/unmerged PRs.</li><li>Infrastructure drift (Terraform state vs actual cloud state).</li></ul><p><strong>Enforcement</strong>: Teams falling below a 90% compliance score must dedicate the next sprint exclusively to technical debt and compliance remediation. Feature work is halted.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("governance/compliance-model.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const complianceModel = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  complianceModel as default
};
