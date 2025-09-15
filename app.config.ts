export default defineAppConfig({
  // Site Identity
  site: {
    name: 'Soft Spoken Studios',
    tagline: 'We can write your talk, and capture your walk',
    description: 'An at your service creative agency, specializing in telling stories through copywriting and video.',
    url: 'https://softspokenstudios.com',
    language: 'en'
  },

  // Contact Information
  contact: {
    email: 'info@softspokenstudios.com',
    phone: '+31 6 1234 5678',
    address: 'Amsterdam, Netherlands'
  },

  // Profile Information
  profile: {
    name: 'Soft Spoken Studios',
    picture: '/IMG_6637.jpg',
    bio: 'Thoughtful communication over loud marketing. Quality over noise.'
  },

  // Social Media Links
  socials: {
    instagram: '',
    linkedin: '',
    twitter: '',
    youtube: ''
  },

  // Features & Settings
  features: {
    contactForm: {
      enabled: true,
      timeout: 5000,
      validation: {
        smartDetection: true
      }
    },
    gallery: {
      enabled: true,
      lightbox: true
    },
    blog: {
      enabled: true,
      commentsEnabled: false
    }
  },

  // SEO Configuration
  seo: {
    siteName: 'Soft Spoken Studios',
    titleTemplate: '%s | Soft Spoken Studios',
    description: 'Creative communication and strategic storytelling. We write your talk and capture your walk.',
    keywords: ['creative agency', 'copywriting', 'video production', 'storytelling', 'communication', 'branding'],
    ogImage: '/og-image.jpg'
  },

  // Business Information
  business: {
    services: ['Copywriting', 'Video Production', 'Brand Strategy', 'Content Creation'],
    languages: ['English', 'Swedish', 'Dutch'],
    availability: true,
    meetingLink: ''
  }
})