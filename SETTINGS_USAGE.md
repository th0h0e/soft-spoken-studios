# Using Site Settings

The site settings data collection allows you to manage global configuration through Nuxt Studio's "Data" section.

## Schema Fields

### Site Information
- `siteName` - The name of your site
- `tagline` - Site tagline/slogan
- `description` - Site description

### Contact Information
- `contact.email` - Contact email address (used as recipient for contact form submissions)
- `contact.phone` - Contact phone number
- `contact.address` - Physical address

**Important:** The `contact.email` field is automatically used by the contact form to determine where to send messages. When users submit the contact form on your website, messages will be delivered to this email address.

### Social Media Profiles
- `social.twitter` - Twitter/X profile URL
- `social.linkedin` - LinkedIn profile URL
- `social.instagram` - Instagram profile URL

### SEO & Branding
- `seo.defaultTitle` - Default page title
- `seo.titleTemplate` - Template for page titles (use %s for page name)
- `seo.defaultDescription` - Default meta description
- `seo.defaultOgImage` - Default Open Graph image (with media picker)
- `seo.favicon` - Favicon path (with media picker)
- `seo.appleTouchIcon` - Apple touch icon path (with media picker)

## Usage Examples

### In Components or Pages

```vue
<script setup>
const { settings } = await useSiteSettings();
</script>

<template>
  <div>
    <h1>{{ settings.siteName }}</h1>
    <p>{{ settings.tagline }}</p>
    <a :href="settings.social.twitter">Twitter</a>
  </div>
</template>
```

### In useHead() for SEO

```vue
<script setup>
const { settings } = await useSiteSettings();

useHead({
  title: settings.seo?.defaultTitle,
  meta: [
    {
      name: 'description',
      content: settings.seo?.defaultDescription
    },
    {
      property: 'og:image',
      content: settings.seo?.defaultOgImage
    }
  ],
  link: [
    {
      rel: 'icon',
      href: settings.seo?.favicon
    }
  ]
});
</script>
```

### Accessing Contact Info

```vue
<script setup>
const { settings } = await useSiteSettings();
</script>

<template>
  <footer>
    <a :href="`mailto:${settings.contact?.email}`">
      {{ settings.contact?.email }}
    </a>
    <a :href="`tel:${settings.contact?.phone}`">
      {{ settings.contact?.phone }}
    </a>
  </footer>
</template>
```

### Building Social Media Links

```vue
<script setup>
const { settings } = await useSiteSettings();

const socialLinks = computed(() => {
  return [
    { name: 'Twitter', url: settings.value?.social?.twitter, icon: 'lucide:twitter' },
    { name: 'LinkedIn', url: settings.value?.social?.linkedin, icon: 'lucide:linkedin' },
    { name: 'Instagram', url: settings.value?.social?.instagram, icon: 'lucide:instagram' },
  ].filter(link => link.url); // Only include links that are set
});
</script>

<template>
  <div class="social-links">
    <a
      v-for="link in socialLinks"
      :key="link.name"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon :name="link.icon" />
      {{ link.name }}
    </a>
  </div>
</template>
```

## Contact Form Integration

The contact form automatically uses the `contact.email` setting to determine where to send messages.

**How it works:**

1. User submits contact form on your website
2. Server API (`/api/contact`) processes the submission
3. Email utility (`server/utils/email.ts`) queries the settings collection
4. Email is sent to the address specified in `settings.contact.email`
5. Email subject and content use `settings.siteName` for branding

**To change where contact form messages are sent:**

1. Open Nuxt Studio
2. Go to "Data" section
3. Click "settings"
4. Update the `contact.email` field
5. Save - all future contact form submissions will go to the new email

**Email Template:**
- Subject: `New Contact Form Message - {siteName}`
- Recipient: `{contact.email}`
- Content: Formatted message with site branding

**Fallback:** If settings cannot be loaded, emails default to `info@softspokenstudios.com`

## Editing in Nuxt Studio

1. Open your project in Nuxt Studio
2. Navigate to the "Data" section in the sidebar
3. Click on "settings"
4. Edit the fields using the auto-generated form
5. Media fields (favicon, ogImage, appleTouchIcon) will show a media picker
6. All changes are saved to `content/settings.yml`

## File Location

The settings data is stored in: `content/settings.yml`

You can also edit this file directly, but using Nuxt Studio provides a better editing experience with validation and media pickers.
