export const usePageType = () => {
  const route = useRoute()

  const isWritingPage = computed(() => route.path.startsWith('/writing/'))
  const isWritingArticle = computed(() =>
    isWritingPage.value && route.path !== '/writing/'
  )

  return {
    isWritingPage,
    isWritingArticle
  }
}
