<template>
  <div class="pb-8">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />

    <div class="flex">
      <!-- Left Column - Empty (1/3) -->
      <div class="w-1/3"></div>

      <!-- Right Column - Title and Subtitle (2/3) -->
      <div class="w-2/3">
        <h1 class="mb-6 mt-8 text-[7rem] font-normal leading-tight">
          <slot name="h1" />
        </h1>

        <h3 class="mb-4 mt-6 text-[2rem] font-normal leading-snug">
          <slot name="h3" />
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Title component with h1 and h3 headings
</script>
