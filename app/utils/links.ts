import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[][] = [
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
]
