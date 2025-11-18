export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      light: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'ui-pro@nuxt.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'zinc',
      secondary: 'slate',
      success: 'green',
      error: 'red',
      info: 'blue',
      warning: 'red',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    },
    pageSection: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32'
      }
    },
    avatar: {
      variants: {
        size: {
          md: {
            root: 'size-8 text-sm'
          }
        }
      }
    },
    prose: {
      callout: {
        slots: {
          base: [
            'group relative block px-4 py-3 rounded-md text-sm/6 my-5 last:mb-0',
            '[&_code]:text-xs/5 [&_code]:bg-default [&_pre]:bg-default',
            '[&>div]:my-2.5 [&_ul]:my-2.5 [&_ol]:my-2.5 [&>*]:last:!mb-0',
            '[&_ul]:ps-4.5 [&_ol]:ps-4.5 [&_li]:my-0',
            'transition-colors'
          ],
          icon: [
            'size-4 shrink-0 align-sub me-1.5 inline-block',
            'transition-colors'
          ]
        },
        variants: {
          color: {
            primary: {
              base: 'border border-primary/25 bg-primary/10 text-primary-600 dark:text-primary-300',
              icon: 'text-primary'
            },
            success: {
              base: 'border border-success/25 bg-success/10 text-success-600 dark:text-success-300',
              icon: 'text-success'
            },
            info: {
              base: 'border border-info/25 bg-info/10 text-info-600 dark:text-info-300',
              icon: 'text-info'
            },
            warning: {
              base: 'border border-warning/25 bg-warning/10 text-warning-600 dark:text-warning-300',
              icon: 'text-warning'
            },
            error: {
              base: 'border border-error/25 bg-error/10 text-error-600 dark:text-error-300',
              icon: 'text-error'
            },
            neutral: {
              base: 'border border-muted bg-muted text-default',
              icon: 'text-highlighted'
            }
          }
        },
        defaultVariants: {
          color: 'neutral'
        }
      }
    }
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-discord',
      'to': 'https://go.nuxt.com/discord',
      'target': '_blank',
      'aria-label': 'Nuxt on Discord'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://go.nuxt.com/x',
      'target': '_blank',
      'aria-label': 'Nuxt on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/nuxt/ui',
      'target': '_blank',
      'aria-label': 'Nuxt UI on GitHub'
    }]
  }
})
