<template>
  <UiBadge :variant="variant" :size="size" class="my-2">
    <Icon v-if="icon" :name="icon" class="mr-1 h-3 w-3" />
    <slot mdc-unwrap="p" />
  </UiBadge>
</template>

<script setup>
/**
 * BlogBadge - Wrapper for UiBadge component
 *
 * Usage in Markdown:
 * ::blog-badge
 * ---
 * variant: default
 * size: default
 * icon: lucide:tag
 * ---
 * Featured
 * ::
 *
 * Inline usage:
 * This article is ::blog-badge{variant="outline"}New::
 */

defineProps({
  variant: {
    type: String,
    default: 'default',
    // Supports: default, secondary, destructive, outline
  },
  size: {
    type: String,
    default: 'default',
    // Supports: default, sm, lg
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>
