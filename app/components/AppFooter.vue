<script setup lang="ts">
const { footer, global } = useAppConfig()
</script>

<template>
  <UFooter
    class="z-10 bg-elevated/30 border-t border-default"
    :ui="{
      left: 'text-muted text-xs',
      container: 'px-4 sm:px-6 lg:px-8'
    }"
  >
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <div class="py-8 px-4 sm:px-6 lg:px-8">
        <Copy :content="global.email" />
      </div>
      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
