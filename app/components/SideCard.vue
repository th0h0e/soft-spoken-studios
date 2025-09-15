<template>
  <div class="space-y-4">
    <UiDivider />
    
    <div class="space-y-3">
      <h3 class="font-semibold text-foreground">
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