import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"CI/CD Standards","description":"","frontmatter":{},"headers":[],"relativePath":"operations/ci-cd.md","filePath":"operations/ci-cd.md"}');
const _sfc_main = { name: "operations/ci-cd.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ci-cd-standards" tabindex="-1">CI/CD Standards <a class="header-anchor" href="#ci-cd-standards" aria-label="Permalink to &quot;CI/CD Standards&quot;">​</a></h1><p>Our deployment pipelines are the backbone of the delivery lifecycle.</p><h2 id="_1-pipeline-stages" tabindex="-1">1. Pipeline Stages <a class="header-anchor" href="#_1-pipeline-stages" aria-label="Permalink to &quot;1. Pipeline Stages&quot;">​</a></h2><p>A standard enterprise pipeline flows automatically:</p><ol><li><code>Lint &amp; Format</code></li><li><code>Unit Tests</code></li><li><code>SAST &amp; SCA Security Scan</code></li><li><code>Build Docker Image</code></li><li><code>Push to Registry</code></li><li><code>Deploy to Staging</code></li><li><code>E2E Smoke Tests</code></li><li><code>Promote to Production</code></li></ol><h2 id="_2-build-optimization-caching" tabindex="-1">2. Build Optimization &amp; Caching <a class="header-anchor" href="#_2-build-optimization-caching" aria-label="Permalink to &quot;2. Build Optimization &amp; Caching&quot;">​</a></h2><ul><li><strong>Docker Caching</strong>: Utilize multi-stage Docker builds and layer caching. Always copy <code>package.json</code> and run <code>npm install</code> BEFORE copying the rest of the source code.</li><li><strong>Dependency Caching</strong>: Cache <code>node_modules</code> and <code>.npm</code> folders across pipeline runs to cut build times in half.</li></ul><h2 id="_3-deployment-automation" tabindex="-1">3. Deployment Automation <a class="header-anchor" href="#_3-deployment-automation" aria-label="Permalink to &quot;3. Deployment Automation&quot;">​</a></h2><ul><li>We enforce <strong>Zero Downtime Deployments</strong>.</li><li><strong>Rolling Updates</strong>: Kubernetes progressively replaces pods so the service is never unavailable.</li><li><strong>Blue/Green &amp; Canary</strong>: For high-risk releases, deploy to a dark &quot;Green&quot; environment, run smoke tests, and then shift 10% of traffic (Canary) before going 100%.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("operations/ci-cd.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ciCd = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ciCd as default
};
