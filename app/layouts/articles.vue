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
                <Icon :name="isDark ? 'feather:sun' : 'feather:moon'" />
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

    <!-- Desktop Layout - 12 Column Grid (shown only on desktop via CSS) -->
    <div class="hidden md:grid grid-cols-12 gap-4 p-4 min-h-screen">
      <!-- Left Column - Empty (2/12) -->
      <div class="col-span-2"></div>

      <!-- Middle Column - Main Content (7/12) -->
      <div class="col-span-7 flex min-h-screen flex-col">
        <div class="flex-1">
          <slot />
        </div>
        <AppFooter />
      </div>

      <!-- Right Column - Empty (3/12) -->
      <div class="col-span-3"></div>
    </div>
  </div>
</template>

<script setup>
  const colorMode = useColorMode();

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
