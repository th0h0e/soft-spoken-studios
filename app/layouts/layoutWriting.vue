<script setup lang="ts">
const tocOpen = ref(false)
</script>

<template>
  <div>
    <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-0">
      <!-- LEFT SIDEBAR -->
      <aside class="hidden lg:block lg:col-span-2 lg:sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto pr-px">
        <Navigation />
      </aside>

      <!-- CENTER CONTENT -->
      <main class="lg:col-span-7">
        <!-- Mobile collapsible for ToC only -->
        <div
          v-if="$slots['mobile-toc']"
          class="lg:hidden border-b border-default"
        >
          <UCollapsible
            v-model:open="tocOpen"
            class="px-4 py-3"
          >
            <UButton
              class="group w-full justify-between"
              label="On this page"
              color="neutral"
              variant="ghost"
              trailing-icon="lucide:chevron-down"
              :ui="{
                trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
              }"
            />

            <template #content>
              <div class="pt-2 pb-4">
                <slot name="mobile-toc" />
              </div>
            </template>
          </UCollapsible>
        </div>

        <slot />
        <AppFooter />
      </main>

      <!-- RIGHT SIDEBAR (desktop only) -->
      <aside
        v-if="$slots.right"
        class="hidden lg:block lg:col-span-3 lg:sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto pl-px py-8 px-4"
      >
        <slot name="right" />
      </aside>
    </div>
  </div>
</template>
