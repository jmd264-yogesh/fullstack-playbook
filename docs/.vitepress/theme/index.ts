import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import type { Theme } from "vitepress";
import MermaidZoom from "./MermaidZoom.vue";
import "./style.css";
import "./framework-folder-tabs.css";
import FrontendFrameworkTabs from "./components/FrontendFrameworkFolderTabs.vue";
import BackendFrameworkTabs from "./components/BackendFrameworkFolderTabs.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(MermaidZoom),
    });
  },

  enhanceApp({ app }) {
    app.component("FrameworkTabs", FrontendFrameworkTabs);
    app.component("BackendFrameworkTabs", BackendFrameworkTabs);
  },
} satisfies Theme;