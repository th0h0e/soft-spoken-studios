<template>
  <!-- Desktop Layout - 12 Column Grid -->
  <div class="grid grid-cols-12 gap-4 p-4 min-h-screen">
    <!-- Left Column - New Sidebar (2/12) -->
    <SectionsLeftSidebar />

    <!-- Middle Column - Main Content (7/12 or 10/12 on gallery) -->
    <div :class="mainColumnSpan" class="flex min-h-screen flex-col transition-all duration-300">
      <div class="flex-1">
        <slot />
      </div>
      <AppFooter />
    </div>

    <!-- Right Column - Dynamic Content (3/12) - Hidden on gallery page -->
    <div v-if="!hideRightColumn" class="col-span-3">
      <div class="md:sticky md:top-4">
        <ClientOnly>
          <AnimatePresence mode="wait">
            <Motion
              :key="sidebarKey"
              :initial="{ x: 50, opacity: 0 }"
              :animate="{ x: 0, opacity: 1 }"
              :exit="{ x: 50, opacity: 0 }"
              :transition="{ duration: 0.4, ease: 'easeInOut' }"
            >
              <!-- Render custom sidebar based on route, otherwise default to RecentArticles -->
              <AboutCard v-if="showAboutCard" />
              <RecentArticles v-else />
            </Motion>
          </AnimatePresence>
          <template #fallback>
            <AboutCard v-if="showAboutCard" />
            <RecentArticles v-else />
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

// Determine which sidebar to show based on route
const showAboutCard = computed(() => route.path === '/about' || route.path === '/test-about');
const sidebarKey = computed(() => showAboutCard.value ? 'about' : 'articles');

// Hide right column on gallery page to allow full width
const hideRightColumn = computed(() => route.path === '/gallery');
const mainColumnSpan = computed(() => hideRightColumn.value ? 'col-span-10' : 'col-span-7');
</script>
