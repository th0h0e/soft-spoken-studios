export default defineNuxtSchema({
  appConfig: {
    // Site Identity
    site: {
      name: {
        $schema: { type: 'string' },
        $default: 'Soft Spoken Studios'
      },
      tagline: {
        $schema: { type: 'string' },
        $default: 'Creative Communication Agency'
      },
      description: {
        $schema: { type: 'string' },
        $default: 'An at your service creative agency, specializing in telling stories through copywriting and video.'
      },
      url: {
        $schema: { type: 'string' },
        $default: 'https://softspokenstudios.com'
      },
      language: {
        $schema: { type: 'string' },
        $default: 'en'
      }
    },

    // Contact Information
    contact: {
      email: {
        $schema: { type: 'string' },
        $default: 'info@softspokenstudios.com'
      },
      phone: {
        $schema: { type: 'string' },
        $default: '+31 6 1234 5678'
      },
      address: {
        $schema: { type: 'string' },
        $default: 'Amsterdam, Netherlands'
      }
    },

    // Profile Information
    profile: {
      name: {
        $schema: { type: 'string' },
        $default: 'Soft Spoken Studios'
      },
      picture: {
        $schema: { type: 'string' },
        $default: '/IMG_6637.jpg'
      },
      bio: {
        $schema: { type: 'string' },
        $default: 'Thoughtful communication over loud marketing. Quality over noise.'
      }
    },

    // Social Media Links
    socials: {
      instagram: {
        $schema: { type: 'string' },
        $default: ''
      },
      linkedin: {
        $schema: { type: 'string' },
        $default: ''
      },
      twitter: {
        $schema: { type: 'string' },
        $default: ''
      },
      youtube: {
        $schema: { type: 'string' },
        $default: ''
      }
    },

    // Features & Settings
    features: {
      contactForm: {
        enabled: {
          $schema: { type: 'boolean' },
          $default: true
        },
        timeout: {
          $schema: { type: 'number' },
          $default: 5000
        },
        validation: {
          smartDetection: {
            $schema: { type: 'boolean' },
            $default: true
          }
        }
      },
      gallery: {
        enabled: {
          $schema: { type: 'boolean' },
          $default: true
        },
        lightbox: {
          $schema: { type: 'boolean' },
          $default: true
        }
      },
      blog: {
        enabled: {
          $schema: { type: 'boolean' },
          $default: true
        },
        commentsEnabled: {
          $schema: { type: 'boolean' },
          $default: false
        }
      }
    },

    // SEO Configuration
    seo: {
      siteName: {
        $schema: { type: 'string' },
        $default: 'Soft Spoken Studios'
      },
      titleTemplate: {
        $schema: { type: 'string' },
        $default: '%s | Soft Spoken Studios'
      },
      description: {
        $schema: { type: 'string' },
        $default: 'Creative communication and strategic storytelling. We write your talk and capture your walk.'
      },
      keywords: {
        $schema: { type: 'array', items: { type: 'string' } },
        $default: ['creative agency', 'copywriting', 'video production', 'storytelling', 'communication', 'branding']
      },
      ogImage: {
        $schema: { type: 'string' },
        $default: '/og-image.jpg'
      }
    },

    // Business Information
    business: {
      services: {
        $schema: { type: 'array', items: { type: 'string' } },
        $default: ['Copywriting', 'Video Production', 'Brand Strategy', 'Content Creation']
      },
      languages: {
        $schema: { type: 'array', items: { type: 'string' } },
        $default: ['English', 'Swedish', 'Dutch']
      },
      availability: {
        $schema: { type: 'boolean' },
        $default: true
      },
      meetingLink: {
        $schema: { type: 'string' },
        $default: ''
      }
    }
  }
})