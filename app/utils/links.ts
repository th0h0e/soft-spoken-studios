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
      label: 'Blog',
      icon: 'i-lucide-file-text',
      to: '/blog',
      defaultOpen: true,
      children: [
        {
          label: 'All Posts',
          description: 'View all blog posts',
          icon: 'i-lucide-library',
          to: '/blog'
        },
        {
          label: 'Web Development',
          description: 'Posts about web development',
          icon: 'i-lucide-code',
          to: '/blog/web-development'
        },
        {
          label: 'Design',
          description: 'Posts about design',
          icon: 'i-lucide-palette',
          to: '/blog/design'
        },
        {
          label: 'Tutorials',
          description: 'Step-by-step tutorials',
          icon: 'i-lucide-graduation-cap',
          to: '/blog/tutorials'
        }
      ]
    },
    {
      label: 'Speaking',
      icon: 'i-lucide-mic',
      to: '/speaking'
    },
    {
      label: 'About',
      icon: 'i-lucide-user',
      to: '/about'
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
