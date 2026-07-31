<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="mermaid-zoom-overlay"
      @click.self="close"
    >
      <button class="mermaid-zoom-close" aria-label="Close" @click="close">✕</button>
      <div class="mermaid-zoom-content" v-html="svgHtml"></div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const open = ref(false)
const svgHtml = ref('')

function onDocClick(e) {
  const target = e.target.closest && e.target.closest('.mermaid')
  if (!target) return
  svgHtml.value = target.innerHTML
  open.value = true
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

function close() {
  open.value = false
  svgHtml.value = ''
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style>
.mermaid {
  cursor: zoom-in;
  overflow-x: auto;
  max-width: 100%;
}

.mermaid-zoom-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  cursor: zoom-out;
  overflow: auto;
}

.mermaid-zoom-content {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 2rem;
  max-width: min(95vw, 1400px);
  max-height: 90vh;
  overflow: auto;
  cursor: default;
}

.mermaid-zoom-content svg {
  width: auto !important;
  height: auto !important;
  max-width: none !important;
}

.mermaid-zoom-close {
  position: fixed;
  top: 1.5rem;
  right: 2rem;
  z-index: 1001;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--vp-c-text-1);
}

.mermaid-zoom-close:hover {
  background: var(--vp-c-brand-1);
  color: white;
}
</style>
