<template>
  <UiAccordion :type="type" :collapsible="collapsible" class="my-6">
    <UiAccordionItem
      v-for="(item, index) in items"
      :key="index"
      :value="`item-${index}`"
    >
      <UiAccordionTrigger>
        <Icon v-if="item.icon" :name="item.icon" class="mr-2 h-4 w-4" />
        {{ item.title }}
      </UiAccordionTrigger>
      <UiAccordionContent>
        {{ item.content }}
      </UiAccordionContent>
    </UiAccordionItem>
  </UiAccordion>
</template>

<script setup>
/**
 * BlogAccordion - Wrapper for UiAccordion component
 *
 * Usage in Markdown:
 * ::blog-accordion
 * ---
 * type: single
 * collapsible: true
 * items:
 *   - title: What is copywriting?
 *     content: Copywriting is the art of writing persuasive text...
 *     icon: lucide:pen-tool
 *   - title: How long does a project take?
 *     content: Most projects take 2-4 weeks...
 *     icon: lucide:clock
 * ---
 * ::
 */

defineProps({
  items: {
    type: Array,
    required: true,
    // e.g., [{ title: 'Question', content: 'Answer', icon: 'lucide:help-circle' }]
  },
  type: {
    type: String,
    default: 'single',
    // Supports: single, multiple
  },
  collapsible: {
    type: Boolean,
    default: true,
  },
})
</script>
