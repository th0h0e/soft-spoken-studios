<script setup lang="ts">
// Inject the unified navigation from the plugin
const { $navigation } = useNuxtApp()
</script>

<template>
  <div>
    <AppHeader />

    <UPage>
      <!-- LEFT SIDEBAR: Unified Navigation -->
      <template #left>
        <UPageAside>
          <!-- Unified navigation with all pages + content collections -->
          <UContentNavigation
            :navigation="$navigation"
            highlight
            color="primary"
            variant="pill"
            type="multiple"
          />
        </UPageAside>
      </template>

      <!-- CENTER: Main Content -->
      <slot />

      <!-- RIGHT SIDEBAR: Context-specific content -->
      <template #right>
        <UPageAside>
          <!-- This slot can be overridden by individual pages -->
          <slot name="aside">
            <!-- Default: Color mode toggle -->
            <UCard variant="subtle">
              <template #header>
                <h3 class="font-semibold">
                  Settings
                </h3>
              </template>
              <div class="flex justify-center">
                <ColorModeButton />
              </div>
            </UCard>
          </slot>
        </UPageAside>
      </template>
    </UPage>

    <AppFooter />
  </div>
</template>
