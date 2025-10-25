<template>
  <UiCard class="my-6">
    <UiCardHeader v-if="$slots.title || $slots.description">
      <UiCardTitle v-if="$slots.title">
        <slot name="title" mdc-unwrap="p" />
      </UiCardTitle>
      <UiCardDescription v-if="$slots.description">
        <slot name="description" mdc-unwrap="p" />
      </UiCardDescription>
    </UiCardHeader>

    <UiCardContent>
      <slot mdc-unwrap="p" />
    </UiCardContent>

    <UiCardFooter v-if="$slots.footer">
      <slot name="footer" mdc-unwrap="p" />
    </UiCardFooter>
  </UiCard>
</template>

<script setup>
/**
 * BlogCard - Wrapper for UiCard component
 *
 * Usage in Markdown:
 * ::blog-card
 * #title
 * Card Title
 *
 * #description
 * Optional description
 *
 * #default
 * Main card content goes here
 *
 * #footer
 * Optional footer content
 * ::
 */
</script>
