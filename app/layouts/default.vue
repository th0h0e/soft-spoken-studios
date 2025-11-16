<script setup lang="ts">
import { navLinks } from '~/utils/links'
</script>

<template>
  <div>
    <AppHeader :links="navLinks" />
    <slot />
    <AppFooter />
  </div>
</template>
