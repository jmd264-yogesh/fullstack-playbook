<script setup lang="ts">
import { ref, computed } from "vue";
import { frontendFrameworks } from "../data/frontend-framework-folder-data";

const activeFramework = ref(frontendFrameworks[0].id);

const selectedFramework = computed(() =>
  frontendFrameworks.find((framework) => framework.id === activeFramework.value)
);
</script>

<template>
  <div class="framework-tabs">
    <!-- Tabs -->
    <div class="framework-tabs-nav">
      <button
        v-for="framework in frontendFrameworks"
        :key="framework.id"
        class="framework-tab"
        :class="{ active: framework.id === activeFramework }"
        @click="activeFramework = framework.id"
      >
        <img
          :src="framework.icon"
          :alt="framework.name"
          class="framework-tab-icon"
        />

        <span>{{ framework.name }}</span>
      </button>
    </div>

    <!-- Content -->
    <div
      v-if="selectedFramework"
      class="framework-content"
    >
      <h2>{{ selectedFramework.name }}</h2>

      <p class="framework-description">
        {{ selectedFramework.description }}
      </p>

      <div class="framework-meta">
        <strong>Architecture:</strong>
        {{ selectedFramework.architecture }}
      </div>

      <h3>Folder Structure</h3>

      <div class="language-text vp-adaptive-theme">
        <button
          title="Copy Code"
          class="copy"
        ></button>

        <span class="lang">text</span>

        <pre><code>{{ selectedFramework.folderStructure }}</code></pre>
      </div>

      <template v-if="selectedFramework.libraries?.length">
        <h3>Recommended Libraries</h3>

        <ul class="framework-libraries">
          <li
            v-for="library in selectedFramework.libraries"
            :key="library"
          >
            {{ library }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>