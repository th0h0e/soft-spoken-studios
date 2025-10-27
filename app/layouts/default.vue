<template>
  <div>
    <!-- Mobile Layout with Sidebar (shown only on mobile via CSS) -->
    <div class="md:hidden">
    <UiSidebarProvider :defaultOpen="false">
    <UiSidebar variant="floating" collapsible="offcanvas">
      <UiSidebarHeader>
        <div class="p-2">
          <div class="text-sm font-medium">
            <div>14:30</div>
            <div class="text-muted-foreground text-xs">11/09/2024</div>
          </div>
        </div>
      </UiSidebarHeader>

      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="item in navigation" :key="item.name">
                <UiSidebarMenuButton as-child>
                  <NuxtLink :to="item.to">
                    <span>{{ item.name }}</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>

      <UiSidebarFooter>
        <div class="relative space-y-2 px-4 py-2">
          <div class="text-muted-foreground text-sm">
            We can write your talk, and capture your walk
          </div>

          <UiToggle
            size="xs"
            :pressed="isDark"
            @click="isDark = !isDark"
            class="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent data-[state=on]:text-sidebar-accent-foreground data-[state=on]:bg-sidebar-accent absolute right-2 bottom-2 h-8 w-8 rounded-md p-0"
          >
            <Icon name="lucide:lamp-desk" />
          </UiToggle>
        </div>
      </UiSidebarFooter>
    </UiSidebar>

    <UiSidebarInset>
      <div class="flex min-h-screen flex-1 flex-col gap-4 p-4">
        <div class="mb-4 flex items-center">
          <UiSidebarTrigger />
        </div>
        <div class="flex-1">
          <slot />
        </div>
      </div>

      <AppFooter />
    </UiSidebarInset>
  </UiSidebarProvider>
  </div>

  <!-- Desktop Layout with Sidebar (shown only on desktop via CSS) -->
  <div class="hidden md:grid grid-cols-12 gap-4 p-4 min-h-screen">
    <!-- Left Column - Custom Sidebar (2/12 width, sticky) -->
    <div class="col-span-2">
      <div class="md:sticky md:top-4">
        <!-- Open Sidebar Button -->
        <ClientOnly>
          <AnimatePresence>
            <Motion
              v-if="hideSidebar"
              :initial="{ x: -50, opacity: 0 }"
              :animate="{ x: 0, opacity: 1 }"
              :exit="{ x: -50, opacity: 0 }"
              :transition="{ duration: 0.6, ease: 'easeInOut' }"
              class="p-2"
            >
              <UiButton variant="ghost" size="icon" class="size-7" @click="openSidebar">
                <Icon name="lucide:panel-left" />
              </UiButton>
            </Motion>
          </AnimatePresence>
          <template #fallback>
            <div v-show="hideSidebar" class="p-2">
              <UiButton variant="ghost" size="icon" class="size-7" @click="openSidebar">
                <Icon name="lucide:panel-left" />
              </UiButton>
            </div>
          </template>
        </ClientOnly>

        <!-- Sidebar Content -->
        <ClientOnly>
          <AnimatePresence>
            <Motion
              v-if="!hideSidebar"
              :initial="{ x: -320, opacity: 0 }"
              :animate="{ x: 0, opacity: 1 }"
              :exit="{ x: -320, opacity: 0 }"
              :transition="{ duration: 0.6, ease: 'easeInOut' }"
              class="bg-sidebar-background border-sidebar-border flex h-[calc(100vh-2rem)] w-full flex-col rounded-lg border shadow-sm"
            >
          <!-- Header with Navigation -->
          <div class="relative flex-1 p-4">
            <div class="space-y-0">
              <div
                v-for="item in navigation"
                :key="item.name"
                class="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-colors"
              >
                <NuxtLink :to="item.to" class="flex w-full items-center gap-2">
                  <span>{{ item.name }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-card relative border-t px-4 py-2">
            <div class="text-muted-foreground mb-2 text-sm">
              We can write your talk, and capture your walk
            </div>
            <div class="text-sm font-medium">14:30</div>

            <UiToggle
              size="xs"
              :pressed="isDark"
              @click="isDark = !isDark"
              class="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent data-[state=on]:text-sidebar-accent-foreground data-[state=on]:bg-sidebar-accent absolute right-2 bottom-2 h-8 w-8 rounded-md p-0"
            >
              <Icon name="lucide:lamp-desk" />
            </UiToggle>
          </div>
          </Motion>
          </AnimatePresence>
        <template #fallback>
          <div v-show="!hideSidebar" class="bg-sidebar-background border-sidebar-border flex h-[calc(100vh-2rem)] w-full flex-col rounded-lg border shadow-sm">
            <!-- Header with Navigation -->
            <div class="relative flex-1 p-4">
              <div class="space-y-0">
                <div
                  v-for="item in navigation"
                  :key="item.name"
                  class="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-colors"
                >
                  <NuxtLink :to="item.to" class="flex w-full items-center gap-2">
                    <span>{{ item.name }}</span>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="bg-card relative border-t px-4 py-2">
              <div class="text-muted-foreground mb-2 text-sm">
                We can write your talk, and capture your walk
              </div>
              <div class="text-sm font-medium">14:30</div>

              <UiToggle
                size="xs"
                :pressed="isDark"
                @click="isDark = !isDark"
                class="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent data-[state=on]:text-sidebar-accent-foreground data-[state=on]:bg-sidebar-accent absolute right-2 bottom-2 h-8 w-8 rounded-md p-0"
              >
                <Icon name="lucide:lamp-desk" />
              </UiToggle>
            </div>
          </div>
        </template>
      </ClientOnly>
      </div>
    </div>

    <!-- Content Area - Remaining 10 columns -->
    <div class="col-span-10 flex min-h-screen flex-col">
      <div class="flex-1">
        <slot />
      </div>
      <AppFooter />
    </div>
  </div>
  </div>
</template>

<script setup>
  const colorMode = useColorMode();
  const hideSidebar = ref(false);
  const route = useRoute();

  // Toggle sidebar visibility
  const openSidebar = () => {
    hideSidebar.value = false;
  };

  const closeSidebar = () => {
    hideSidebar.value = true;
  };

  // Close sidebar when navigating to detail pages, open when navigating away
  watch(() => route.path, (newPath, oldPath) => {
    const isDetailPage = (path) => path?.startsWith('/articles/') || path?.startsWith('/portfolio/');

    if (isDetailPage(newPath)) {
      // Navigating to a detail page - close sidebar
      closeSidebar();
    } else if (oldPath && isDetailPage(oldPath)) {
      // Navigating away from a detail page - open sidebar
      openSidebar();
    }
  });

  // Simple hardcoded navigation - always English pages
  const navigation = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Work", to: "/work" },
    { name: "Blog", to: "/blog" },
    { name: "Gallery", to: "/gallery" },
  ];

  // Improved color mode toggle following documentation patterns
  const isDark = computed({
    get() {
      return colorMode.value === "dark";
    },
    set(_isDark) {
      colorMode.preference = _isDark ? "dark" : "light";
    },
  });
</script>
