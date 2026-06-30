import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Git & Branching Strategy","description":"","frontmatter":{},"headers":[],"relativePath":"engineering/git-branching.md","filePath":"engineering/git-branching.md"}');
const _sfc_main = { name: "engineering/git-branching.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="git-branching-strategy" tabindex="-1">Git &amp; Branching Strategy <a class="header-anchor" href="#git-branching-strategy" aria-label="Permalink to &quot;Git &amp; Branching Strategy&quot;">​</a></h1><p>Our branching model is designed to minimize merge conflicts and accelerate the delivery pipeline.</p><h2 id="_1-branching-model-trunk-based-development" tabindex="-1">1. Branching Model: Trunk-Based Development <a class="header-anchor" href="#_1-branching-model-trunk-based-development" aria-label="Permalink to &quot;1. Branching Model: Trunk-Based Development&quot;">​</a></h2><p>We strictly follow <strong>Trunk-Based Development</strong>.</p><ul><li>Developers branch off <code>main</code>, create short-lived feature branches, and merge back into <code>main</code> frequently (at least once a day).</li><li>Long-lived <code>develop</code> or <code>release/*</code> branches are heavily discouraged as they lead to integration hell.</li></ul><h2 id="_2-branch-naming-conventions" tabindex="-1">2. Branch Naming Conventions <a class="header-anchor" href="#_2-branch-naming-conventions" aria-label="Permalink to &quot;2. Branch Naming Conventions&quot;">​</a></h2><p>Branches must follow this format: <code>&lt;type&gt;/&lt;ticket-id&gt;-&lt;short-desc&gt;</code></p><ul><li><code>feat/JIRA-123-add-login-form</code></li><li><code>fix/JIRA-456-patch-null-pointer</code></li><li><code>chore/JIRA-789-update-deps</code></li></ul><h2 id="_3-semantic-commits" tabindex="-1">3. Semantic Commits <a class="header-anchor" href="#_3-semantic-commits" aria-label="Permalink to &quot;3. Semantic Commits&quot;">​</a></h2><p>All commits must follow the Conventional Commits specification. This allows us to auto-generate changelogs and trigger semantic versioning bumps.</p><ul><li><code>feat: add user authentication</code></li><li><code>fix: resolve race condition in payment service</code></li><li><code>docs: update API schema</code></li></ul><h2 id="_4-merge-strategy-squash-merge" tabindex="-1">4. Merge Strategy: Squash &amp; Merge <a class="header-anchor" href="#_4-merge-strategy-squash-merge" aria-label="Permalink to &quot;4. Merge Strategy: Squash &amp; Merge&quot;">​</a></h2><ul><li>We enforce <strong>Squash and Merge</strong> for all Pull Requests into <code>main</code>.</li><li>This keeps the <code>main</code> git history perfectly linear, clean, and easily readable for rollbacks.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("engineering/git-branching.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const gitBranching = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  gitBranching as default
};
