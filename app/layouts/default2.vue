<script setup lang="ts">
</script>

<template>
  <UPage>
    <!-- Left sticky sidebar with navigation -->
    <template #left>
      <UPageAside>
        <Navigation />
      </UPageAside>
    </template>

    <!-- Main content area -->
    <div class="pt-10">
      <slot />
      <AppFooter />
    </div>

    <!-- Right sticky sidebar with your custom card -->
    <template #right>
      <UPageAside>
        <Card />
      </UPageAside>
    </template>
  </UPage>
</template>
