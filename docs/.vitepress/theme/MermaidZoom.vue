<template>
  <Teleport to="body">
    <Transition name="mz-fade">
      <div v-if="open" class="mz-overlay" @click.self="close">
        <button class="mz-close" aria-label="Close" @click="close">✕</button>
        <div ref="svgHost" class="mz-svg-host"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

const open = ref(false)
const svgHost = ref(null)

let scale = 1
let baseScale = 1 // the "fit to screen" scale, zoom is relative to this
let originX = 0
let originY = 0
let isDragging = false
let lastX = 0
let lastY = 0

function applyTransform() {
  const svg = svgHost.value?.querySelector('svg')
  if (svg) {
    svg.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`
    svg.style.transformOrigin = 'center center'
  }
}

function fitToScreen(svg) {
  // Natural size of the diagram (use viewBox if present, else bbox)
  const vb = svg.viewBox?.baseVal
  const naturalWidth = vb?.width || svg.getBoundingClientRect().width
  const naturalHeight = vb?.height || svg.getBoundingClientRect().height

  const availW = window.innerWidth * 0.9
  const availH = window.innerHeight * 0.9

  const fitScale = Math.min(availW / naturalWidth, availH / naturalHeight, 1)

  // Set explicit pixel size at 1:1, then scale down/up via transform
  svg.style.width = `${naturalWidth}px`
  svg.style.height = `${naturalHeight}px`

  baseScale = fitScale
  scale = fitScale
  originX = 0
  originY = 0
  applyTransform()
}

function onWheel(e) {
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  scale = Math.min(Math.max(scale + delta, baseScale * 0.3), baseScale * 8)
  applyTransform()
}

function onPointerDown(e) {
  isDragging = true
  lastX = e.clientX
  lastY = e.clientY
}

function onPointerMove(e) {
  if (!isDragging) return
  originX += e.clientX - lastX
  originY += e.clientY - lastY
  lastX = e.clientX
  lastY = e.clientY
  applyTransform()
}

function onPointerUp() {
  isDragging = false
}

async function onDocClick(e) {
  const mermaidEl = e.target.closest('.mermaid, [class*="mermaid"]')
  if (!mermaidEl) return

  const svgEl = mermaidEl.tagName === 'svg' ? mermaidEl : mermaidEl.querySelector('svg')
  if (!svgEl) return

  open.value = true
  await nextTick()
  if (!svgHost.value) return

  const clone = svgEl.cloneNode(true)
  clone.style.cursor = 'grab'
  clone.style.transition = 'transform 0.05s linear'
  clone.style.display = 'block'

  svgHost.value.innerHTML = ''
  svgHost.value.appendChild(clone)

  fitToScreen(clone)

  svgHost.value.removeEventListener('wheel', onWheel)
  svgHost.value.addEventListener('wheel', onWheel, { passive: false })
  svgHost.value.removeEventListener('pointerdown', onPointerDown)
  svgHost.value.addEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointermove', onPointerMove)
  window.addEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.addEventListener('pointerup', onPointerUp)
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

function close() {
  open.value = false
  if (svgHost.value) {
    svgHost.value.innerHTML = ''
    svgHost.value.removeEventListener('wheel', onWheel)
    svgHost.value.removeEventListener('pointerdown', onPointerDown)
  }
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
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
.mermaid,
.mermaid svg {
  cursor: zoom-in;
}

/* Full-page-level overlay - this IS the modal, no inner card */
.mz-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: zoom-out;
}

/* No padding, no background, no border - just a positioning host for the SVG */
.mz-svg-host {
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Close button pinned to the viewport corner, like GFG */
.mz-close {
  position: fixed;
  top: 1rem;
  right: 1.25rem;
  z-index: 10000;
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.mz-close:hover {
  background: #e74c3c;
  color: #fff;
}

.mz-fade-enter-active,
.mz-fade-leave-active {
  transition: opacity 0.2s ease;
}
.mz-fade-enter-from,
.mz-fade-leave-to {
  opacity: 0;
}
</style>