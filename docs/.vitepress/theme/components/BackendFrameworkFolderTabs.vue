<script setup lang="ts">
import { computed, ref } from "vue";
import { backendFrameworks } from "../data/backend-framework-folder-data";

const selectedFramework = ref(backendFrameworks[0].id);

const framework = computed(
  () =>
    backendFrameworks.find(
      (f) => f.id === selectedFramework.value
    ) ?? backendFrameworks[0]
);
</script>

<template>
  <div class="framework-tabs">
    <!-- Navigation -->
    <div class="framework-tabs-nav">
      <button
        v-for="item in backendFrameworks"
        :key="item.id"
        class="framework-tab"
        :class="{ active: selectedFramework === item.id }"
        @click="selectedFramework = item.id"
      >
        <img
          :src="item.icon"
          :alt="item.name"
          class="framework-tab-icon"
        />

        <span>{{ item.name }}</span>
      </button>
    </div>

    <!-- Content -->
    <div class="framework-content">
      <h2>{{ framework.name }}</h2>

      <p class="framework-description">
        {{ framework.description }}
      </p>

      <div class="framework-meta">
        <strong>Architecture:</strong>
        {{ framework.architecture }}
      </div>

      <h3>Folder Structure</h3>

      <div class="language-text vp-adaptive-theme">
        <button
          title="Copy Code"
          class="copy"
        ></button>

        <span class="lang">text</span>
      <pre><code>{{ framework.folderStructure }}</code></pre>
      </div>

      <div
        v-if="framework.libraries?.length"
        class="framework-libraries"
      >
        <h3>Recommended Libraries</h3>

        <ul>
          <li
            v-for="library in framework.libraries"
            :key="library"
          >
            {{ library }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>