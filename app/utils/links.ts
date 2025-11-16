import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[][] = [
  [
    {
      label: 'Navigation',
      type: 'label'
    },
    {
      label: 'Home',
      icon: 'i-lucide-home',
      to: '/'
    },
    {
      label: 'Projects',
      icon: 'i-lucide-folder',
      to: '/projects'
    },
    {
      label: 'Writing',
      icon: 'i-lucide-pen-line',
      to: '/writing'
    },
    {
      label: 'About',
      icon: 'i-lucide-user',
      to: '/about'
    },
    {
      label: 'Test Layout',
      icon: 'i-lucide-layout-grid',
      to: '/test-layout'
    }
  ]
]
