import type { ContentSearchLink } from '@nuxt/ui'

export const searchLinks: ContentSearchLink[] = [
  {
    label: 'Home',
    icon: 'i-feather-home',
    to: '/'
  },
  {
    label: 'Projects',
    icon: 'i-feather-layout',
    to: '/projects'
  },
  {
    label: 'Writing',
    icon: 'i-feather-pen-tool',
    to: '/writing'
  },
  {
    label: 'About',
    icon: 'i-feather-users',
    to: '/about'
  },
  {
    label: 'Gallery',
    icon: 'i-feather-image',
    to: '/gallery'
  }
]
