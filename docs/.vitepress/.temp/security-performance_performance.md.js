import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Performance Standards","description":"","frontmatter":{},"headers":[],"relativePath":"security-performance/performance.md","filePath":"security-performance/performance.md"}');
const _sfc_main = { name: "security-performance/performance.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="performance-standards" tabindex="-1">Performance Standards <a class="header-anchor" href="#performance-standards" aria-label="Permalink to &quot;Performance Standards&quot;">​</a></h1><p>Performance is a feature. Slow systems lead to churn and high infrastructure costs.</p><h2 id="_1-frontend-performance-budgets" tabindex="-1">1. Frontend Performance Budgets <a class="header-anchor" href="#_1-frontend-performance-budgets" aria-label="Permalink to &quot;1. Frontend Performance Budgets&quot;">​</a></h2><ul><li><strong>Core Web Vitals</strong>: <ul><li><strong>LCP (Largest Contentful Paint)</strong>: &lt; 2.5 seconds.</li><li><strong>FID (First Input Delay)</strong>: &lt; 100 milliseconds.</li><li><strong>CLS (Cumulative Layout Shift)</strong>: &lt; 0.1.</li></ul></li><li><strong>Bundle Size</strong>: Initial JS bundle must not exceed 200KB (gzipped). Use code splitting heavily.</li></ul><h2 id="_2-api-response-targets" tabindex="-1">2. API Response Targets <a class="header-anchor" href="#_2-api-response-targets" aria-label="Permalink to &quot;2. API Response Targets&quot;">​</a></h2><ul><li><strong>p95 Latency</strong>: 95% of API requests must complete in under <strong>250ms</strong>.</li><li><strong>Heavy Queries</strong>: Any query taking longer than 1 second must be offloaded to an asynchronous background queue (Kafka/Redis) and return a <code>202 Accepted</code> to the client.</li></ul><h2 id="_3-caching-strategy" tabindex="-1">3. Caching Strategy <a class="header-anchor" href="#_3-caching-strategy" aria-label="Permalink to &quot;3. Caching Strategy&quot;">​</a></h2><ul><li><strong>Client-Side</strong>: Utilize <code>ETag</code> and <code>Cache-Control</code> headers for static assets.</li><li><strong>CDN</strong>: All static assets (images, CSS, JS) must be served via a CDN (Cloudflare/CloudFront).</li><li><strong>Application</strong>: Frequently accessed, rarely mutating data (e.g., product catalogs, feature flags) must be cached in Redis to protect the primary database.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("security-performance/performance.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const performance = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  performance as default
};
