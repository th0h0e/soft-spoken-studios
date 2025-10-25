<template>
  <div class="my-4">
    <UiButton
      v-if="to"
      :variant="variant"
      :size="size"
      as-child
    >
      <NuxtLink :to="to" :target="external ? '_blank' : undefined">
        <Icon v-if="icon" :name="icon" class="mr-2 h-4 w-4" />
        <slot mdc-unwrap="p" />
        <Icon v-if="external" name="lucide:external-link" class="ml-2 h-4 w-4" />
      </NuxtLink>
    </UiButton>
    <UiButton
      v-else
      :variant="variant"
      :size="size"
    >
      <Icon v-if="icon" :name="icon" class="mr-2 h-4 w-4" />
      <slot mdc-unwrap="p" />
    </UiButton>
  </div>
</template>

<script setup>
/**
 * BlogButton - Wrapper for UiButton component
 *
 * Usage in Markdown:
 * ::blog-button
 * ---
 * variant: default
 * size: lg
 * icon: lucide:arrow-right
 * to: /contact
 * external: false
 * ---
 * Get in Touch
 * ::
 */

defineProps({
  variant: {
    type: String,
    default: 'default',
    // Supports: default, destructive, outline, secondary, ghost, link
  },
  size: {
    type: String,
    default: 'default',
    // Supports: default, sm, lg, icon
  },
  icon: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
  external: {
    type: Boolean,
    default: false,
  },
})
</script>
