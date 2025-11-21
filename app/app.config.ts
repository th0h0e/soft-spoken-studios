import appMeta from './app.meta'

export default defineAppConfig({
  global: {
    picture: {
      dark: 'sss.png',
      light: 'sss-black.png',
      alt: 'Soft Spoken Studio'
    },
    meetingLink: appMeta.bookingLink,
    email: appMeta.contactEmail,
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
    pageBody: {
      base: 'mt-8 pb-24 space-y-12 px-4'
    },
    pageHeader: {
      slots: {
        root: 'relative border-b border-default py-8 px-4'
      }
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl text-default',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    },
    pageSection: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32 px-4'
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
    },
    card: {
      slots: {
        header: 'p-4 sm:px-6',
        body: 'p-4 sm:p-6',
        footer: 'p-4 sm:px-6'
      },
      variants: {
        variant: {
          solid: {
            root: 'text-inverted divide-y divide-default',
            header: 'bg-inverted',
            body: 'bg-inverted',
            footer: 'bg-inverted'
          },
          outline: {
            root: 'ring ring-default divide-y divide-default',
            header: 'bg-default',
            body: 'bg-default',
            footer: 'bg-default'
          },
          soft: {
            root: 'divide-y divide-default',
            header: 'bg-elevated/50',
            body: 'bg-elevated/50',
            footer: 'bg-elevated/50'
          },
          subtle: {
            root: 'ring ring-default divide-y divide-default',
            header: 'bg-elevated/10',
            body: 'bg-elevated/10',
            footer: 'bg-elevated/50'
          }
        }
      },
      defaultVariants: {
        variant: 'outline'
      }
    },
    footer: {
      slots: {
        top: 'p-0',
        bottom: 'pt-0 pb-8 lg:pb-12'
      }
    },
    changelogVersion: {
      slots: {
        container: 'flex flex-col max-w-none ps-4 lg:ps-0 lg:ms-48 pe-4 sm:pe-4 lg:pe-10 pb-18',
        indicator: 'absolute start-0 top-0 w-32 hidden lg:flex items-center justify-end gap-3 min-w-0'
      }
    },
    pageColumns: {
      base: 'relative column-1 md:columns-2 lg:columns-3 gap-4 space-y-8 *:break-inside-avoid-column *:will-change-transform'
    }
  },
  footer: {
    credits: `Built by Kontext • © ${new Date().getFullYear()}`,
    creditsLink: 'https://kontext.site',
    links: Object.entries(appMeta.social).map(([, social]) => ({
      'to': social.url,
      'icon': social.icon,
      'aria-label': social.label,
      'target': '_blank'
    }))
  }
})
