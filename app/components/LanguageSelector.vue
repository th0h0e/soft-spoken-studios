<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost" size="sm" class="h-8 w-full justify-start gap-2">
        <Icon :name="currentLocaleIcon" class="w-4 h-4" />
        <span class="hidden lg:inline">{{ currentLocaleName }}</span>
        <span class="lg:hidden">{{ currentLocale.toUpperCase() }}</span>
        <Icon name="lucide:chevron-down" class="w-3 h-3 ml-auto" />
      </UiButton>
    </UiDropdownMenuTrigger>

    <UiDropdownMenuContent align="start" class="w-40">
      <UiDropdownMenuItem
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="switchLanguage(locale.code)"
        :class="{ 'bg-accent': locale.code === currentLocale }"
      >
        <Icon :name="getLocaleIcon(locale.code)" class="w-4 h-4 mr-2" />
        <span>{{ locale.name }}</span>
        <Icon v-if="locale.code === currentLocale" name="lucide:check" class="w-3 h-3 ml-auto" />
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script setup>
const { locale, locales } = useI18n()
const localePath = useLocalePath()
const router = useRouter()

// Current locale
const currentLocale = computed(() => locale.value)

// Available locales
const availableLocales = computed(() => locales.value)

// Current locale name
const currentLocaleName = computed(() => {
  const current = availableLocales.value.find(l => l.code === currentLocale.value)
  return current?.name || currentLocale.value
})

// Get flag icons for locales
const getLocaleIcon = (localeCode) => {
  const icons = {
    'en': 'lucide:flag',
    'nl': 'lucide:flag',
    'sv': 'lucide:flag'
  }
  return icons[localeCode] || 'lucide:flag'
}

const currentLocaleIcon = computed(() => getLocaleIcon(currentLocale.value))

// Switch language function
const switchLanguage = async (newLocale) => {
  if (newLocale === currentLocale.value) return

  try {
    // Get current route path
    const currentPath = router.currentRoute.value.fullPath

    // Remove current locale prefix if it exists
    const pathWithoutLocale = currentPath.replace(new RegExp(`^/${currentLocale.value}`), '') || '/'

    // Create new path with new locale
    const newPath = localePath(pathWithoutLocale, newLocale)

    // Navigate to new path
    await navigateTo(newPath)
  } catch (error) {
    console.error('Language switch error:', error)
    // Fallback: just set the locale
    locale.value = newLocale
  }
}
</script>