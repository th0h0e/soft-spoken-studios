<script setup lang="ts">
</script>

<template>
  <div>
    <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-10">
      <!-- LEFT SIDEBAR -->
      <aside class="lg:col-span-2 lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto">
        <Navigation />
      </aside>

      <!-- CENTER CONTENT -->
      <main class="lg:col-span-7">
        <slot />
      </main>

      <!-- RIGHT SIDEBAR -->
      <aside class="lg:col-span-3 order-first lg:order-last lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto">
        <Card />
      </aside>
    </div>

    <AppFooter />
  </div>
</template>
