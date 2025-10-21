<template>
  <!-- Mobile Layout with Sidebar -->
  <UiSidebarProvider v-if="isMobile" :defaultOpen="false">
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
        <div class="space-y-2 px-4 py-2">
          <div class="text-muted-foreground text-sm">
            We can write your talk, and capture your walk
          </div>
        </div>
      </UiSidebarFooter>
    </UiSidebar>

    <UiSidebarInset>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="mb-4 flex items-center">
          <UiSidebarTrigger />
        </div>
        <slot />
      </div>

      <AppFooter />
    </UiSidebarInset>
  </UiSidebarProvider>

  <!-- Desktop Layout with Sidebar -->
  <div v-else class="grid min-h-screen gap-0 p-4 lg:grid-cols-[16rem_1fr]">
    <!-- Left Column - Custom Sidebar -->
    <div class="hidden lg:block">
      <div class="lg:sticky lg:top-4">
        <!-- Open Sidebar Button -->
        <div v-show="hideSidebar" class="p-2">
          <UiButton variant="ghost" size="icon" class="size-7" @click="hideSidebar = false">
            <Icon name="lucide:panel-left" />
          </UiButton>
        </div>

        <!-- Sidebar Content -->
        <div
          class="bg-sidebar-background border-sidebar-border flex h-[calc(100vh-2rem)] w-full flex-col rounded-lg border shadow-sm"
          v-show="!hideSidebar"
        >
          <!-- Header with Navigation -->
          <div class="relative flex-1 p-4">
            <UiButton
              variant="ghost"
              size="sm"
              class="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent absolute top-2 right-2 z-10 h-8 w-8 rounded-md p-0"
              @click="hideSidebar = true"
            >
              <Icon name="lucide:x" />
            </UiButton>

            <div class="space-y-0 pr-10">
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
      </div>
    </div>

    <!-- Right Column - Page Content -->
    <div class="flex flex-1 flex-col gap-4">
      <slot />
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
  const colorMode = useColorMode();
  const hideSidebar = ref(false);

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

  // Use VueUse's built-in breakpoints (already available in your project)
  const { width } = useWindowSize();
  const isMobile = computed(() => width.value < 768); // md breakpoint
</script>
