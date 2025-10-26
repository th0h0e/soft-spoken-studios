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
  <div class="hidden md:grid min-h-screen gap-0 p-4 md:grid-cols-[16rem_1fr]">
    <!-- Left Column - Custom Sidebar -->
    <div>
      <div class="md:sticky md:top-4">
        <!-- Open Sidebar Button -->
        <ClientOnly>
          <div
            v-motion="'openButton'"
            v-show="hideSidebar"
            :initial="{ x: -50, opacity: 0 }"
            :enter="{ x: 0, opacity: 1 }"
            :visible="{ x: 0, opacity: 1 }"
            class="p-2"
          >
            <UiButton variant="ghost" size="icon" class="size-7" @click="openSidebar">
              <Icon name="lucide:panel-left" />
            </UiButton>
          </div>
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
          <div
            v-motion="'sidebarContent'"
            v-show="!hideSidebar"
            :initial="{ x: -320, opacity: 0 }"
            :enter="{ x: 0, opacity: 1 }"
            :visible="{ x: 0, opacity: 1 }"
            class="bg-sidebar-background border-sidebar-border flex h-[calc(100vh-2rem)] w-full flex-col rounded-lg border shadow-sm"
          >
          <!-- Header with Navigation -->
          <div class="relative flex-1 p-4">
            <UiButton
              variant="ghost"
              size="sm"
              class="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent absolute top-2 right-2 z-10 h-8 w-8 rounded-md p-0"
              @click="closeSidebar"
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
        <template #fallback>
          <div v-show="!hideSidebar" class="bg-sidebar-background border-sidebar-border flex h-[calc(100vh-2rem)] w-full flex-col rounded-lg border shadow-sm">
            <!-- Header with Navigation -->
            <div class="relative flex-1 p-4">
              <UiButton
                variant="ghost"
                size="sm"
                class="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent absolute top-2 right-2 z-10 h-8 w-8 rounded-md p-0"
                @click="closeSidebar"
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
        </template>
      </ClientOnly>
      </div>
    </div>

    <!-- Right Column - Page Content -->
    <div class="flex min-h-screen flex-1 flex-col gap-4">
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

  // Get motion instances
  const motions = useMotions();

  // Animate sidebar open
  const openSidebar = async () => {
    hideSidebar.value = false;
  };

  // Animate sidebar close
  const closeSidebar = async () => {
    const sidebarContent = motions.sidebarContent;
    if (sidebarContent) {
      await sidebarContent.apply({
        x: -320,
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 250,
          damping: 25,
        },
      });
    }
    hideSidebar.value = true;
  };

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
