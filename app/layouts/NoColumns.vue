<script setup lang="ts">
</script>

<template>
  <div>
    <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-0">
      <!-- LEFT SIDEBAR -->
      <aside class="lg:col-span-2 lg:sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto pr-px">
        <Navigation />
      </aside>

      <!-- MAIN CONTENT (takes remaining space) -->
      <main class="lg:col-span-10">
        <slot />
      </main>
    </div>
  </div>
</template>
