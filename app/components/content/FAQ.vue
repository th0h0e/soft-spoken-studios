<script setup lang="ts">
/**
 * FAQ Component - Orchestrator for FAQ Tabs and Accordion
 *
 * Displays FAQ content organized by categories using FAQTabs and FAQAccordion
 * sub-components for separation of concerns.
 *
 * Props-based format - receives data from parent component.
 *
 * Usage:
 * <FAQ :title="title" :description="description" :categories="categories" />
 */

interface Question {
  label: string
  content: string
}

interface Category {
  title: string
  questions: Question[]
}

const props = defineProps<{
  title: string
  description: string
  categories: Category[]
}>()

const activeCategory = ref(0)
const activeTabKey = ref('')

const currentQuestions = computed(() => {
  return props.categories[activeCategory.value]?.questions || []
})

const tabItems = computed(() => {
  return props.categories.map((category, index) => ({
    label: category.title,
    value: index
  }))
})

// Sync activeTabKey changes to activeCategory index
watch(activeTabKey, (newValue) => {
  activeCategory.value = Number(newValue)
}, { immediate: false })

// Initialize on mount
onMounted(() => {
  if (props.categories.length > 0) {
    activeTabKey.value = 0
  }
})

const tabUi = {
  root: 'flex items-center gap-4 w-full',
  list: 'relative flex bg-transparent dark:bg-transparent gap-2 px-0',
  indicator: 'absolute top-[4px] duration-200 ease-out focus:outline-none rounded-lg bg-elevated/60',
  trigger: 'px-3 py-2 rounded-lg hover:bg-muted/50 data-[state=active]:text-highlighted data-[state=inactive]:text-muted',
  label: 'truncate'
}
</script>

<template>
  <UPageSection
    :title="title"
    :description="description"
    :ui="{
      container: 'gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <!-- Tabs for Category Selection -->
    <div class="w-full mb-6">
      <UTabs
        v-model="activeTabKey"
        :items="tabItems"
        orientation="horizontal"
        :ui="tabUi"
      />
    </div>

    <!-- Accordion for Questions -->
    <FAQAccordion :questions="currentQuestions" />
  </UPageSection>
</template>
