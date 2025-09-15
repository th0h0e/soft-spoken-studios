type Where = 'home' | 'app'

export type Navigation = {
  name: string
  to: string
  icon: string
}

export function getNavigation(where: Where): Record<string, Navigation> | [] {
  switch (where) {
    case 'home':
      return {
        home: {
          name: 'Home',
          to: '/',
          icon: 'lucide:home',
        },
        about: {
          name: 'About',
          to: '/about',
          icon: 'lucide:user',
        },
        work: {
          name: 'Work',
          to: '/work',
          icon: 'lucide:briefcase',
        },
        blog: {
          name: 'Blog',
          to: '/blog',
          icon: 'lucide:library',
        },
        gallery: {
          name: 'Gallery',
          to: '/gallery',
          icon: 'lucide:image',
        },
      }
    default:
      return []
  }
}