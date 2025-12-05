<script setup lang="ts">
const router = useRouter()
const navOpen = ref(false)

watch(() => router.currentRoute.value.path, () => {
  navOpen.value = false
})
</script>

<template>
  <div>
    <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-0">
      <!-- LEFT SIDEBAR -->
      <aside class="hidden lg:block lg:col-span-2 lg:sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto pr-px">
        <Navigation />
      </aside>

      <!-- MAIN CONTENT (takes remaining space) -->
      <main class="lg:col-span-10">
        <!-- Mobile navigation collapsible -->
        <div class="lg:hidden border-b border-default">
          <UCollapsible
            v-model:open="navOpen"
            class="px-4 py-3"
          >
            <UButton
              class="group w-full justify-between"
              label="Soft Spoken Studio"
              color="neutral"
              variant="ghost"
              trailing-icon="lucide:chevron-down"
              :ui="{
                trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
              }"
            />

            <template #content>
              <div class="pt-2 pb-4">
                <Navigation />
              </div>
            </template>
          </UCollapsible>
        </div>

        <slot />
        <AppFooter />
      </main>
    </div>
  </div>
</template>
