import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Release Management","description":"","frontmatter":{},"headers":[],"relativePath":"operations/release-management.md","filePath":"operations/release-management.md"}');
const _sfc_main = { name: "operations/release-management.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="release-management" tabindex="-1">Release Management <a class="header-anchor" href="#release-management" aria-label="Permalink to &quot;Release Management&quot;">​</a></h1><h2 id="_1-semantic-versioning" tabindex="-1">1. Semantic Versioning <a class="header-anchor" href="#_1-semantic-versioning" aria-label="Permalink to &quot;1. Semantic Versioning&quot;">​</a></h2><p>All releases must follow <code>MAJOR.MINOR.PATCH</code> (e.g., <code>v1.4.2</code>).</p><ul><li><strong>MAJOR</strong>: Breaking API changes.</li><li><strong>MINOR</strong>: Backward-compatible new features.</li><li><strong>PATCH</strong>: Backward-compatible bug fixes.</li></ul><h2 id="_2-changelog-standards" tabindex="-1">2. Changelog Standards <a class="header-anchor" href="#_2-changelog-standards" aria-label="Permalink to &quot;2. Changelog Standards&quot;">​</a></h2><p>Changelogs are generated automatically via Semantic Release based on Semantic Commits.</p><ul><li>Release notes are automatically posted to the #engineering Slack/Teams channel upon successful production deployment.</li></ul><h2 id="_3-rollback-policy" tabindex="-1">3. Rollback Policy <a class="header-anchor" href="#_3-rollback-policy" aria-label="Permalink to &quot;3. Rollback Policy&quot;">​</a></h2><ul><li><strong>Rule</strong>: If a deployment triggers a P1/P2 incident (error spikes, latency spikes), the pipeline MUST allow for a 1-click rollback to the previous known good version.</li><li>Because of this, database migrations must ALWAYS be backward-compatible with the previous version of the code.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("operations/release-management.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const releaseManagement = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  releaseManagement as default
};
