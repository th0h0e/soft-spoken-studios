<template>
  <UiTabs :default-value="defaultValue" class="my-6">
    <UiTabsList>
      <UiTabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
      >
        <Icon v-if="tab.icon" :name="tab.icon" class="mr-2 h-4 w-4" />
        {{ tab.label }}
      </UiTabsTrigger>
    </UiTabsList>

    <UiTabsContent
      v-for="tab in tabs"
      :key="tab.value"
      :value="tab.value"
      class="mt-4"
    >
      <slot :name="tab.value" />
    </UiTabsContent>
  </UiTabs>
</template>

<script setup>
/**
 * BlogTabs - Wrapper for UiTabs component
 *
 * Usage in Markdown:
 * ::blog-tabs
 * ---
 * tabs:
 *   - label: Preview
 *     value: preview
 *     icon: lucide:eye
 *   - label: Code
 *     value: code
 *     icon: lucide:code
 * defaultValue: preview
 * ---
 * #preview
 * This is the preview content
 *
 * #code
 * ```javascript
 * console.log('code here')
 * ```
 * ::
 */

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    // e.g., [{ label: 'Preview', value: 'preview', icon: 'lucide:eye' }]
  },
  defaultValue: {
    type: String,
    default: '',
  },
})

// Set default value to first tab if not provided
const defaultValue = computed(() => {
  return props.defaultValue || props.tabs[0]?.value || ''
})
</script>
