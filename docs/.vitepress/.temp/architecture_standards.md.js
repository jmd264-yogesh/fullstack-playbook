import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Architecture Standards","description":"","frontmatter":{},"headers":[],"relativePath":"architecture/standards.md","filePath":"architecture/standards.md"}');
const _sfc_main = { name: "architecture/standards.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="architecture-standards" tabindex="-1">Architecture Standards <a class="header-anchor" href="#architecture-standards" aria-label="Permalink to &quot;Architecture Standards&quot;">​</a></h1><p>Defining clear boundaries is critical for scalable engineering. We use these architectural standards to ensure consistency across the enterprise.</p><h2 id="_1-monorepo-vs-polyrepo-guidance" tabindex="-1">1. Monorepo vs Polyrepo Guidance <a class="header-anchor" href="#_1-monorepo-vs-polyrepo-guidance" aria-label="Permalink to &quot;1. Monorepo vs Polyrepo Guidance&quot;">​</a></h2><ul><li><strong>Default to Monorepo (Turborepo/Nx)</strong>: For a full-stack application (e.g., Next.js frontend + NestJS backend) that share the same domain logic and release cycle, a monorepo is mandatory. It allows for sharing DTOs (TypeScript types) seamlessly across the stack.</li><li><strong>When to use Polyrepo</strong>: When building isolated, generic microservices that are consumed by multiple, entirely separate products with different lifecycles.</li></ul><h2 id="_2-event-driven-patterns" tabindex="-1">2. Event-Driven Patterns <a class="header-anchor" href="#_2-event-driven-patterns" aria-label="Permalink to &quot;2. Event-Driven Patterns&quot;">​</a></h2><p>For decoupled, highly scalable systems, we favor asynchronous event-driven architectures.</p><ul><li><strong>Message Broker</strong>: Kafka or RabbitMQ.</li><li><strong>Pattern</strong>: Choreography over Orchestration. Services should emit domain events (e.g., <code>OrderPlaced</code>) rather than directly calling other services via synchronous HTTP/REST, which creates tight coupling and cascading failures.</li><li><strong>Idempotency</strong>: All event consumers MUST be idempotent to handle potential at-least-once delivery duplicates.</li></ul><h2 id="_3-microservice-checklist" tabindex="-1">3. Microservice Checklist <a class="header-anchor" href="#_3-microservice-checklist" aria-label="Permalink to &quot;3. Microservice Checklist&quot;">​</a></h2><p>Before creating a new microservice, the Architect must ensure it meets these criteria:</p><ul><li>[ ] Does it own its own database? (Microservices must never share a database).</li><li>[ ] Can it be deployed independently without requiring another service to be deployed simultaneously?</li><li>[ ] Does it have a dedicated Health Check endpoint (<code>/health</code>)?</li><li>[ ] Is it stateless?</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("architecture/standards.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const standards = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  standards as default
};
