import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[][] = [
  [
    {
      label: 'Navigation',
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
      label: 'Test Layout',
      to: '/test-layout'
    }
  ]
]
