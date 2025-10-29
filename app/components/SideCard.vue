<template>
  <div class="space-y-4">
    <hr class="border-t border-neutral-300 dark:border-neutral-700" />

    <div class="space-y-3">
      <h3 class="text-foreground font-semibold">
        <slot name="title" />
      </h3>

      <p class="text-muted-foreground leading-relaxed">
        <slot name="content" />
      </p>
    </div>
  </div>
</template>

<script setup>
  // Simple side card component for right column content
</script>
