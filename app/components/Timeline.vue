<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { Motion, useScroll, useSpring, useTransform } from 'motion-v'
import { useDateFormat, useResizeObserver } from '@vueuse/core'

interface Project {
  path: string
  title: string
  description: string
  gallery?: string[]
  date: Date
}

interface Props {
  projects: Project[]
}

defineProps<Props>()

const formatDate = (date: string | Date) => useDateFormat(date, 'MMM. YYYY')

// Measure header width to position beam through dot center
const headerRef = useTemplateRef<HTMLElement>('header')
const beamLeft = ref(8)

useResizeObserver(headerRef, (entries) => {
  const entry = entries[0]
  if (entry) beamLeft.value = entry.contentRect.width - 7
})

// Scroll-driven beam animation with spring physics
const { scrollYProgress } = useScroll()
const smoothProgress = useSpring(scrollYProgress, { damping: 30, restDelta: 0.001 })
const beamHeight = useTransform(() => `${smoothProgress.get() * 100}%`)
</script>

<template>
  <UPageSection>
    <div class="timeline-container">
      <!-- Vertical line with animated beam -->
      <aside
        class="timeline-indicator"
        :style="{ left: `${beamLeft}px` }"
      >
        <div class="absolute inset-0 bg-border opacity-30" />
        <Motion
          class="absolute inset-x-0 top-0 bg-primary"
          :style="{ height: beamHeight }"
        />
      </aside>

      <!-- Timeline items -->
      <UPageList>
        <article
          v-for="(project, index) in projects"
          :key="index"
          class="timeline-item"
        >
          <header
            :ref="index === 0 ? 'header' : undefined"
            class="flex items-center gap-2"
          >
            <time class="hidden sm:block text-xs text-muted text-right">{{ formatDate(project.date) }}</time>
            <div class="flex items-center justify-center size-4">
              <div class="size-4 rounded-full bg-default ring ring-default flex items-center justify-center">
                <div class="size-2 rounded-full bg-primary" />
              </div>
            </div>
          </header>
          <section class="ps-2">
            <ProjectCard
              :to="project.path"
              :title="project.title"
              :description="project.description"
              :gallery="project.gallery"
            />
          </section>
        </article>
      </UPageList>
    </div>
  </UPageSection>
</template>

<style scoped>
.timeline-container {
  position: relative;
}

.timeline-indicator {
  position: absolute;
  inset-block: 0;
  width: 1px;
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  z-index: 1;
}
</style>
