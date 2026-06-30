import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Developer Experience (DX)","description":"","frontmatter":{},"headers":[],"relativePath":"engineering/developer-experience.md","filePath":"engineering/developer-experience.md"}');
const _sfc_main = { name: "engineering/developer-experience.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="developer-experience-dx" tabindex="-1">Developer Experience (DX) <a class="header-anchor" href="#developer-experience-dx" aria-label="Permalink to &quot;Developer Experience (DX)&quot;">​</a></h1><p>A frictionless Developer Experience (DX) pays off massively in velocity and retention. Our goal: <strong>A new engineer must be able to push their first commit to production on Day 1.</strong></p><h2 id="_1-the-one-command-local-setup" tabindex="-1">1. The &quot;One-Command&quot; Local Setup <a class="header-anchor" href="#_1-the-one-command-local-setup" aria-label="Permalink to &quot;1. The &quot;One-Command&quot; Local Setup&quot;">​</a></h2><p>Local environments must not require 15 manual steps to configure.</p><ul><li>Every repository must have a <code>make setup</code> or <code>npm run init</code> script that: <ol><li>Installs dependencies.</li><li>Copies <code>.env.example</code> to <code>.env</code>.</li><li>Spins up required databases via Docker Compose.</li><li>Runs the database migrations and seeds dummy data.</li></ol></li></ul><h2 id="_2-preconfigured-tooling" tabindex="-1">2. Preconfigured Tooling <a class="header-anchor" href="#_2-preconfigured-tooling" aria-label="Permalink to &quot;2. Preconfigured Tooling&quot;">​</a></h2><p>Developers should not waste time debating code styles.</p><ul><li><strong>Linting &amp; Formatting</strong>: ESLint and Prettier configs must be centralized and automatically enforced upon file save.</li><li><strong>IDE Settings</strong>: Repositories must include <code>.vscode/settings.json</code> and <code>extensions.json</code> to automatically configure the editor for anyone joining the project.</li></ul><h2 id="_3-local-debugging" tabindex="-1">3. Local Debugging <a class="header-anchor" href="#_3-local-debugging" aria-label="Permalink to &quot;3. Local Debugging&quot;">​</a></h2><ul><li>Include pre-configured <code>.vscode/launch.json</code> so engineers can attach a debugger to Node.js/PHP processes instantly with a single click (F5), rather than relying entirely on <code>console.log</code>.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("engineering/developer-experience.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const developerExperience = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  developerExperience as default
};
