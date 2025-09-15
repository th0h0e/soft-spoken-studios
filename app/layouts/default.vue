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
              <UiSidebarMenuItem>
                <UiSidebarMenuButton as-child>
                  <NuxtLink to="/">
                    <span>Home</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
              
              <UiSidebarMenuItem>
                <UiSidebarMenuButton as-child>
                  <NuxtLink to="/about">
                    <span>About</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
              
              <UiSidebarMenuItem>
                <UiSidebarMenuButton as-child>
                  <NuxtLink to="/work">
                    <span>Work</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
              
              <UiSidebarMenuItem>
                <UiSidebarMenuButton as-child>
                  <NuxtLink to="/blog">
                    <span>Blog</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
              
              <UiSidebarMenuItem>
                <UiSidebarMenuButton as-child>
                  <NuxtLink to="/gallery">
                    <span>Gallery</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>
      
      <UiSidebarFooter>
        <div class="px-4 py-2 text-sm text-muted-foreground">
          We can write your talk, and capture your walk
        </div>
      </UiSidebarFooter>
    </UiSidebar>
    
    <UiSidebarInset>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="flex items-center mb-4">
          <UiSidebarTrigger />
        </div>
        <slot />
      </div>
      
      <AppFooter />
    </UiSidebarInset>
  </UiSidebarProvider>

  <!-- Desktop Layout with Sidebar -->
  <div v-else class="grid lg:grid-cols-[16rem_1fr] gap-0 p-4 min-h-screen">
    <!-- Left Column - Custom Sidebar -->
    <div class="lg:block hidden">
      <div class="lg:sticky lg:top-4">
      <!-- Open Sidebar Button -->
      <div v-show="hideSidebar" class="p-2">
        <UiButton 
          variant="ghost" 
          size="icon" 
          class="size-7"
          @click="hideSidebar = false"
        >
          <Icon name="lucide:panel-left" />
        </UiButton>
      </div>
      
      <!-- Sidebar Content -->
      <div class="flex h-[calc(100vh-2rem)] w-full flex-col bg-sidebar-background rounded-lg border border-sidebar-border shadow-sm" v-show="!hideSidebar">
        <!-- Header with Navigation -->
        <div class="flex-1 p-4 relative">
          <UiButton 
            variant="ghost" 
            size="sm" 
            class="absolute top-2 right-2 h-8 w-8 p-0 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-md z-10"
            @click="hideSidebar = true"
          >
            <Icon name="lucide:x" />
          </UiButton>
          
          <div class="space-y-0 pr-10">
            <div class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <NuxtLink to="/" class="flex items-center gap-2 w-full">
                <span>Home</span>
              </NuxtLink>
            </div>
            
            <div class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <NuxtLink to="/about" class="flex items-center gap-2 w-full">
                <span>About</span>
              </NuxtLink>
            </div>
            
            <div class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <NuxtLink to="/work" class="flex items-center gap-2 w-full">
                <span>Work</span>
              </NuxtLink>
            </div>
            
            <div class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <NuxtLink to="/blog" class="flex items-center gap-2 w-full">
                <span>Blog</span>
              </NuxtLink>
            </div>
            
            <div class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <NuxtLink to="/gallery" class="flex items-center gap-2 w-full">
                <span>Gallery</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="px-4 py-2 border-t bg-card relative">
          <div class="text-sm text-muted-foreground mb-2">
            We can write your talk, and capture your walk
          </div>
          <div class="text-sm font-medium">
            14:30
          </div>
          
          <UiToggle 
            size="xs"
            :pressed="colorMode.preference === 'dark'"
            @click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'"
            class="absolute bottom-2 right-2 h-8 w-8 p-0 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent data-[state=on]:text-sidebar-accent-foreground data-[state=on]:bg-sidebar-accent rounded-md"
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
const colorMode = useColorMode()
const hideSidebar = ref(false)

// Use VueUse's built-in breakpoints (already available in your project)
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768) // md breakpoint
</script>