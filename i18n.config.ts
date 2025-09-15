import messages from './i18n/locales/messages'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: messages,
}))