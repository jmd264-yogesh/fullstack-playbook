import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Environment Strategy","description":"","frontmatter":{},"headers":[],"relativePath":"engineering/environments.md","filePath":"engineering/environments.md"}');
const _sfc_main = { name: "engineering/environments.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="environment-strategy" tabindex="-1">Environment Strategy <a class="header-anchor" href="#environment-strategy" aria-label="Permalink to &quot;Environment Strategy&quot;">​</a></h1><p>Properly segregated environments prevent experimental code from impacting production systems and secure customer data.</p><h2 id="_1-the-environment-pipeline" tabindex="-1">1. The Environment Pipeline <a class="header-anchor" href="#_1-the-environment-pipeline" aria-label="Permalink to &quot;1. The Environment Pipeline&quot;">​</a></h2><p>Code promotes sequentially through the following environments:</p><ol><li><strong>Local</strong>: Developer&#39;s machine (Docker Compose).</li><li><strong>Preview (Ephemeral)</strong>: Spun up automatically per Pull Request. Used for UX review.</li><li><strong>Dev</strong>: Continuous Integration target. The bleeding edge of <code>main</code>.</li><li><strong>Staging</strong>: Exact replica of Production. Used for E2E, Load Testing, and UAT. Data is sanitized.</li><li><strong>Production</strong>: Live customer traffic. Highly restricted access.</li></ol><h2 id="_2-secrets-management" tabindex="-1">2. Secrets Management <a class="header-anchor" href="#_2-secrets-management" aria-label="Permalink to &quot;2. Secrets Management&quot;">​</a></h2><ul><li><strong>Rule</strong>: NEVER commit <code>.env</code> files or hardcode secrets in the repository.</li><li><strong>Local</strong>: Use <code>.env.local</code> (ignored by git) or a local Vault instance.</li><li><strong>Deployed Environments</strong>: Secrets must be injected at runtime via AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault.</li></ul><h2 id="_3-feature-flags" tabindex="-1">3. Feature Flags <a class="header-anchor" href="#_3-feature-flags" aria-label="Permalink to &quot;3. Feature Flags&quot;">​</a></h2><p>To decouple <em>Deployment</em> from <em>Release</em>, we utilize Feature Flags (e.g., LaunchDarkly, Unleash).</p><ul><li>Deploying code to production should be a non-event. The feature remains disabled via a flag until the business is ready to toggle it on for specific user segments.</li><li><strong>Cleanup</strong>: Flags must be removed from the codebase within one sprint of being fully rolled out to 100% of users.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("engineering/environments.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const environments = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  environments as default
};
