<script setup lang="ts">
  import { navLinks } from '~/utils/links'
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
    <UContainer class="sm:border-x border-default pt-10">
      <!-- Old navigation navbar - commented out -->
      <!-- <AppHeader :links="navLinks" /> -->
      <slot />
      <AppFooter />
    </UContainer>

    <!-- Right sticky sidebar with your custom card -->
    <template #right>
      <UPageAside>
        <Card />
      </UPageAside>
    </template>
  </UPage>
</template>

    