<script setup lang="ts">
</script>

<template>
  <div>
    <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-0">
      <!-- LEFT SIDEBAR -->
      <aside class="lg:col-span-2 lg:sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto pr-px">
        <Navigation />
      </aside>

      <!-- CENTER CONTENT -->
      <main class="lg:col-span-7">
        <slot />
        <AppFooter />
      </main>

      <!-- RIGHT SIDEBAR -->
      <aside class="lg:col-span-3 lg:sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto pl-px">
        <UCard
          variant="outline"
          class="h-full"
          :ui="{
            root: 'flex flex-col h-full',
            body: 'flex-1 !p-0'
          }"
        >
          <Card />
        </UCard>
      </aside>
    </div>
  </div>
</template>
