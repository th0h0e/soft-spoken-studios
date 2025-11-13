<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { navLinks } from '~/utils/links'

const items = ref<NavigationMenuItem[][]>(navLinks)
</script>

<template>
  <UCard
    variant="subtle"
    class="h-full bg-muted/80 backdrop-blur-sm border-muted/50 shadow-lg shadow-neutral-950/5"
    :ui="{
      root: 'flex flex-col h-full',
      body: 'flex-1 flex flex-col justify-between'
    }"
  >
    <UNavigationMenu
      orientation="vertical"
      :items="items"
      class="data-[orientation=vertical]:w-full"
    />

    <div class="mt-4 pt-4 border-t border-default flex justify-center">
      <ColorModeButton />
    </div>
  </UCard>
</template>
