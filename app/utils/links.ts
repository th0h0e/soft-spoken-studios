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
      to: '/writing',
      defaultOpen: true,
      children: [
        {
          label: 'All Articles',
          description: 'View all articles',
          icon: 'i-lucide-library',
          to: '/writing'
        },
        {
          label: 'Web Development',
          description: 'Articles about web development',
          icon: 'i-lucide-code',
          to: '/writing/web-development'
        },
        {
          label: 'Design',
          description: 'Articles about design',
          icon: 'i-lucide-palette',
          to: '/writing/design'
        },
        {
          label: 'Tutorials',
          description: 'Step-by-step tutorials',
          icon: 'i-lucide-graduation-cap',
          to: '/writing/tutorials'
        }
      ]
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
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com',
      target: '_blank'
    },
    {
      label: 'Twitter',
      icon: 'i-simple-icons-x',
      to: 'https://twitter.com',
      target: '_blank'
    }
  ]
]
