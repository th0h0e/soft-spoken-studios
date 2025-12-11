<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Soft Spoken Studio',
      type: 'label'
    },
    {
      label: 'Home',
      to: '/'
    },
    {
      label: 'Projects',
      to: '/projects'
    },
    {
      label: 'Writing',
      to: '/writing'
    },
    {
      label: 'About',
      to: '/about'
    },
    {
      label: 'Gallery',
      to: '/gallery'
    }
  ]
])

// Color mode toggle for mobile navigation
const colorMode = useColorMode()

const switchTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const startViewTransition = (event: Event) => {
  if (!document.startViewTransition) {
    switchTheme()
    return
  }

  // Try to get coordinates from event, fallback to center of screen
  const mouseEvent = event as MouseEvent
  const x = mouseEvent.clientX || window.innerWidth / 2
  const y = mouseEvent.clientY || window.innerHeight / 2

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    switchTheme()
  })

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 600,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}

// Mobile items with color mode toggle appended to last group (no separator)
// Filter out the "Soft Spoken Studio" label since it's shown in the collapsible trigger
const mobileItems = computed<NavigationMenuItem[][]>(() => {
  const mobileNavItems = items.value.map(group =>
    group.filter(item => !(item.type === 'label' && item.label === 'Soft Spoken Studio'))
  )
  const lastGroupIndex = mobileNavItems.length - 1
  mobileNavItems[lastGroupIndex] = [
    ...(mobileNavItems[lastGroupIndex] ?? []),
    {
      label: colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode',
      onSelect: startViewTransition
    }
  ]
  return mobileNavItems
})
</script>

<template>
  <!-- Mobile: Navigation menu with color mode toggle -->
  <UNavigationMenu
    orientation="vertical"
    :items="mobileItems"
    class="lg:hidden data-[orientation=vertical]:w-full"
  />

  <!-- Desktop: Full card with navigation, spacer, and footer -->
  <UCard
    variant="outline"
    class="hidden lg:flex h-full"
    :ui="{
      root: 'flex flex-col h-full',
      body: 'flex-1',
      footer: 'bg-elevated/30 py-5!'
    }"
  >
    <template #header>
      <UNavigationMenu
        orientation="vertical"
        :items="items"
        class="data-[orientation=vertical]:w-full"
      />
    </template>

    <div class="flex-1" />

    <template #footer>
      <div class="flex justify-center">
        <ColorModeButton />
      </div>
    </template>
  </UCard>
</template>
