```vue
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface Props {
  dates?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  // Default dates if none are provided
  dates: () => [
    'Mar 7, 2025',
    'Feb 15, 2025',
    'Jan 20, 2025',
    'Dec 24, 2024',
    'Nov 10, 2024'
  ]
})

// Ref to store the HTML element references for each timeline item
const itemRefs = ref<HTMLElement[]>([])
// Ref to track which timeline items are currently in view
const itemsInView = ref<boolean[]>([])
// IntersectionObserver instance
let observer: IntersectionObserver | null = null

// Computed property to calculate the height of the animated beam
const beamHeight = computed(() => {
  // Find the last index of a true value in itemsInView
  const lastIndex = itemsInView.value.lastIndexOf(true)
  // Calculate the beam height as a percentage based on the last item in view
  return lastIndex === -1 ? 0 : ((lastIndex + 1) / props.dates.length) * 100
})

// Function to set up the IntersectionObserver
const setupObserver = () => {
  // Disconnect the observer if it exists
  observer?.disconnect()
  // Initialize itemsInView with an array of false values, one for each date
  itemsInView.value = Array(props.dates.length).fill(false)

  // Create a new IntersectionObserver
  observer = new IntersectionObserver(
    (entries) => {
      // Iterate through the entries (observed elements)
      entries.forEach((entry) => {
        // Get the index of the observed element in itemRefs
        const index = itemRefs.value.indexOf(entry.target as HTMLElement)
        // If the element is found, update itemsInView based on its intersection state
        if (index !== -1) itemsInView.value[index] = entry.isIntersecting
      })
    },
    { rootMargin: '-20% 0px -20% 0px', threshold: 0.1 }
  )

  // Observe each element in itemRefs
  itemRefs.value.forEach(el => el && observer?.observe(el))
}

// On component mounted, set up the observer after the next tick
onMounted(() => nextTick(setupObserver))
// Watch for changes in the dates prop and re-setup the observer
watch(() => props.dates.length, () => nextTick(setupObserver))
// On component unmounted, disconnect the observer
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="timeline-container">
    <!-- Vertical line with animated beam -->
    <aside class="timeline-indicator">
      <div class="absolute inset-0 bg-border opacity-30" />
      <div
        class="absolute inset-x-0 top-0 bg-primary transition-all duration-300"
        :style="{ height: `${beamHeight}%` }"
      />
    </aside>

    <!-- Timeline items -->
    <UPageList>
      <article
        v-for="(date, index) in dates"
        :key="index"
        :ref="(el) => { if (el) itemRefs[index] = el as HTMLElement }"
        class="timeline-item"
      >
        <header class="flex items-center gap-2">
          <time class="w-26 text-sm text-muted text-right">{{ date }}</time>
          <div class="flex items-center justify-center size-4">
            <div class="size-4 rounded-full bg-default ring ring-default flex items-center justify-center">
              <div class="size-2 rounded-full bg-primary" />
            </div>
          </div>
        </header>
        <section />
      </article>
    </UPageList>
  </div>
</template>

<style scoped>
.timeline-container {
  position: relative;
}

.timeline-indicator {
  position: absolute;
  inset-block: 0;
  left: 120px;
  width: 1px;
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 128px 1fr;
  height: 400px;
  z-index: 1;
}
</style>
```
