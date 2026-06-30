import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Security Playbook","description":"","frontmatter":{},"headers":[],"relativePath":"security-performance/security-playbook.md","filePath":"security-performance/security-playbook.md"}');
const _sfc_main = { name: "security-performance/security-playbook.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="security-playbook" tabindex="-1">Security Playbook <a class="header-anchor" href="#security-playbook" aria-label="Permalink to &quot;Security Playbook&quot;">​</a></h1><p>Security is paramount. The following standards are strictly enforced across the enterprise.</p><h2 id="_1-owasp-top-10-checklist" tabindex="-1">1. OWASP Top 10 Checklist <a class="header-anchor" href="#_1-owasp-top-10-checklist" aria-label="Permalink to &quot;1. OWASP Top 10 Checklist&quot;">​</a></h2><p>All applications must actively mitigate the OWASP Top 10.</p><ul><li><strong>Injection</strong>: Use parameterized queries/ORMs (Prisma, Eloquent). Never concatenate raw SQL strings.</li><li><strong>Broken Authentication</strong>: Enforce strong password hashing (Argon2, bcrypt), implement rate-limiting, and mandate MFA for admin panels.</li><li><strong>XSS</strong>: Sanitize user input and rely on modern framework escaping (React <code>{}</code> and Blade <code>${ssrInterpolate()}</code>). Implement strict Content Security Policies (CSP).</li></ul><h2 id="_2-secrets-handling" tabindex="-1">2. Secrets Handling <a class="header-anchor" href="#_2-secrets-handling" aria-label="Permalink to &quot;2. Secrets Handling&quot;">​</a></h2><ul><li>No credentials, API keys, or JWT secrets in source code.</li><li>If a secret is accidentally committed, the key MUST be revoked and rotated immediately. You cannot just rewrite the Git history.</li></ul><h2 id="_3-role-based-access-control-rbac" tabindex="-1">3. Role-Based Access Control (RBAC) <a class="header-anchor" href="#_3-role-based-access-control-rbac" aria-label="Permalink to &quot;3. Role-Based Access Control (RBAC)&quot;">​</a></h2><ul><li><strong>Principle of Least Privilege</strong>: Users and services should only have the absolute minimum permissions required to perform their task.</li><li>Enforce authorization checks at the service layer, not just the UI layer.</li></ul><h2 id="_4-production-access-audit-logging" tabindex="-1">4. Production Access &amp; Audit Logging <a class="header-anchor" href="#_4-production-access-audit-logging" aria-label="Permalink to &quot;4. Production Access &amp; Audit Logging&quot;">​</a></h2><ul><li>Direct SSH or DB access to production requires temporary, just-in-time (JIT) credentials via an Identity Broker (e.g., Teleport).</li><li>Every mutation (Create, Update, Delete) on critical business entities must trigger an immutable audit log recording <code>who</code>, <code>what</code>, and <code>when</code>.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("security-performance/security-playbook.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const securityPlaybook = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  securityPlaybook as default
};
