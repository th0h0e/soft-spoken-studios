<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost" size="sm" class="gap-2">
        <Icon name="heroicons:language" class="h-4 w-4" />
        <span class="hidden sm:inline">{{ currentLocale?.name }}</span>
        <span class="sm:hidden">{{ currentLocale?.code.toUpperCase() }}</span>
        <Icon name="heroicons:chevron-down" class="h-3 w-3" />
      </UiButton>
    </UiDropdownMenuTrigger>

    <UiDropdownMenuContent align="end" class="w-48">
      <UiDropdownMenuLabel>{{ $t('global.languages') || 'Languages' }}</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />

      <UiDropdownMenuItem
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="switchLanguage(locale.code)"
        class="cursor-pointer"
        :class="{ 'bg-accent': locale.code === $i18n.locale.value }"
      >
        <div class="flex items-center justify-between w-full">
          <span>{{ locale.name }}</span>
          <span class="text-xs text-muted-foreground">{{ locale.code.toUpperCase() }}</span>
        </div>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value)
const currentLocale = computed(() =>
  availableLocales.value.find(l => l.code === locale.value)
)

const switchLanguage = async (localeCode) => {
  await navigateTo(switchLocalePath(localeCode))
}
</script>