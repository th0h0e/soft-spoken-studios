<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <!-- Mobile Footer -->
  <UFooter
    class="lg:hidden z-10 bg-elevated/30 border-t border-default"
    :ui="{
      left: 'text-muted text-xs mt-0',
      right: 'mt-0',
      container: 'px-4 sm:px-6 !py-5 flex items-center justify-between gap-4'
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
      <div class="flex items-center gap-2">
        <span class="text-muted text-sm">Soft Spoken Studio</span>
        <template v-if="footer?.links">
          <UButton
            v-for="(link, index) of footer?.links"
            :key="index"
            v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
          />
        </template>
      </div>
    </template>
  </UFooter>

  <!-- Desktop Footer -->
  <UFooter
    class="hidden lg:block z-10 bg-elevated/30 border-t border-default"
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
      <div class="flex items-center gap-2">
        <span class="text-default">Soft Spoken Studio</span>
        <template v-if="footer?.links">
          <UButton
            v-for="(link, index) of footer?.links"
            :key="index"
            v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
          />
        </template>
      </div>
    </template>
  </UFooter>
</template>
