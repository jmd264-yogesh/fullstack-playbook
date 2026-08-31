<template>
  <div class="hero-visual-wrap">
    <ol class="hero-timeline">
      <li v-for="(stop, i) in stops" :key="i">
        <span class="hero-timeline-dot" :style="{ background: stop.color }"></span>
        <a :href="stop.link">{{ stop.label }}</a>
      </li>
    </ol>

    <div class="hero-strip">
      <span class="hero-strip-stat"><strong>18</strong> Practice Areas</span>
      <span class="hero-strip-dot">·</span>
      <span class="hero-strip-stat"><strong>180+</strong> Pages</span>
      <span class="hero-strip-dot">·</span>
      <span class="hero-strip-stat">One Standard, Every Team</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const stops = [
  { label: 'Business & Solution Foundations', link: '/business-foundations/overview', color: '#19105b' },
  { label: 'Basics', link: '/basics/overview', color: '#3d2f7a' },
  { label: 'Delivery Lifecycle', link: '/delivery-lifecycle/overview', color: '#7a3e8f' },
  { label: 'Coding Standards', link: '/coding-standards/overview', color: '#c14aa0' },
  { label: 'Deployment & Operations', link: '/operations/overview', color: '#ff4785' },
  { label: 'Governance & KPIs', link: '/governance/overview', color: '#ff6196' },
]
</script>

<style scoped>
.hero-visual-wrap {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.hero-timeline {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0 0 0 28px;
}

.hero-timeline::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: linear-gradient(180deg, #19105b, #ff6196);
  border-radius: 999px;
}

.hero-timeline li {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 2.5rem;
}

.hero-timeline-dot {
  position: absolute;
  left: -28px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.hero-timeline a {
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: color 0.2s ease;
}

.hero-timeline a:hover {
  color: #ff6196;
}

.hero-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.hero-strip-stat strong {
  color: #ff6196;
  font-weight: 800;
}

.hero-strip-dot {
  opacity: 0.4;
}
</style>
