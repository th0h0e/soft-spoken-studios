import messages from '~/i18n/locales/messages'

export default defineNuxtPlugin(async () => {
  const { $i18n } = useNuxtApp()

  // Set messages for all locales
  Object.keys(messages).forEach((locale) => {
    $i18n.setLocaleMessage(locale, messages[locale as keyof typeof messages])
  })
})