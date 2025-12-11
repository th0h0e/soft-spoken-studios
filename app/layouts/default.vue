<script setup lang="ts">
import { ref, watch } from 'vue'

const router = useRouter()
const navOpen = ref(false)

watch(() => router.currentRoute.value.path, () => {
  navOpen.value = false
})
</script>

<template>
  <div>
    <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-0">
      <!-- LEFT SIDEBAR (desktop only) -->
      <aside class="hidden lg:block lg:col-span-2 lg:sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto pr-px">
        <Navigation />
      </aside>

      <!-- CENTER CONTENT -->
      <main class="lg:col-span-7">
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
              trailing-icon="i-feather-chevron-down"
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

      <!-- RIGHT SIDEBAR (desktop only) -->
      <aside class="hidden lg:block lg:col-span-3 lg:sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto pl-px">
        <UCard
          variant="outline"
          class="h-full"
          :ui="{
            root: 'flex flex-col h-full',
            body: 'flex-1 !p-0',
            footer: 'bg-elevated/30 py-4'
          }"
        >
          <ArticleSidebar />

          <template #footer>
            <Copy content="info@softspokenstudio.com" />
          </template>
        </UCard>
      </aside>
    </div>
  </div>
</template>
