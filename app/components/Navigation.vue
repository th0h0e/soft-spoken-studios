<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { navLinks } from '~/utils/links'

const items = ref<NavigationMenuItem[][]>(navLinks)
</script>

<template>
  <UCard
    variant="outline"
    class="h-full"
    :ui="{
      root: 'flex flex-col h-full',
      body: 'flex-1'
    }"
  >
    <template #header>
      <UNavigationMenu
        orientation="vertical"
        :items="items"
        class="data-[orientation=vertical]:w-full"
      />
    </template>

    <div class="flex-1" />

    <template #footer>
      <div class="flex justify-center">
        <ColorModeButton />
      </div>
    </template>
  </UCard>
</template>
