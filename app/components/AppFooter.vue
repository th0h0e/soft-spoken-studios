<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter
    class="z-10 bg-elevated/30 border-t border-default"
    :ui="{
      left: 'text-muted text-xs',
      container: 'px-4 sm:px-6 lg:px-8 !py-5'
    }"
  >
    <template #left>
      <a
        :href="footer.creditsLink"
        target="_blank"
        rel="noopener"
        class="hover:text-default transition-colors"
      >
        {{ footer.credits }}
      </a>
    </template>

    <template #right>
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
