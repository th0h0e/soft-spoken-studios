import type { ContentNavigationItem } from '@nuxt/content'

export default defineNuxtPlugin(async () => {
  // Fetch all writing posts
  const { data: writingPosts } = await useAsyncData('writing-posts', () =>
    queryCollection('writing').order('date', 'DESC').all()
  )

  // Fetch all projects
  const { data: projects } = await useAsyncData('projects-items', () =>
    queryCollection('projects').order('date', 'DESC').all()
  )

  // Create unified navigation structure
  const unifiedNavigation = computed<ContentNavigationItem[]>(() => {
    // Map writing posts to navigation items
    const writingChildren: ContentNavigationItem[] = (writingPosts.value || []).map(post => ({
      title: post.title,
      to: post.path,
      _path: post.path
    }))

    // Map projects to navigation items
    const projectsChildren: ContentNavigationItem[] = (projects.value || []).map(project => ({
      title: project.title,
      to: project.path,
      _path: project.path
    }))

    const nav: ContentNavigationItem[] = [
      {
        title: 'Home',
        to: '/',
        _path: '/'
      },
      {
        title: 'Projects',
        to: '/projects',
        _path: '/projects',
        children: projectsChildren
      },
      {
        title: 'Writing',
        to: '/writing',
        _path: '/writing',
        children: writingChildren
      },
      {
        title: 'About',
        to: '/about',
        _path: '/about'
      },
      {
        title: 'Gallery',
        to: '/gallery',
        _path: '/gallery'
      }
    ]

    return nav
  })

  // Provide navigation to all components
  return {
    provide: {
      navigation: unifiedNavigation
    }
  }
})
