<template>
  <UiAlert :variant="variant" class="my-6">
    <Icon v-if="icon" :name="icon" class="h-4 w-4" />
    <UiAlertTitle v-if="$slots.title">
      <slot name="title" mdc-unwrap="p" />
    </UiAlertTitle>
    <UiAlertDescription>
      <slot mdc-unwrap="p" />
    </UiAlertDescription>
  </UiAlert>
</template>

<script setup>
/**
 * BlogAlert - Wrapper for UiAlert component
 *
 * Usage in Markdown:
 * ::blog-alert
 * ---
 * variant: warning
 * icon: lucide:alert-triangle
 * ---
 * #title
 * Important Notice
 *
 * #default
 * This is an alert message that needs attention.
 * ::
 */

defineProps({
  variant: {
    type: String,
    default: 'default',
    // Supports: default, destructive
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>
