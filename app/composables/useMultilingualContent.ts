/**
 * Composable for handling multilingual content with Nuxt Content
 */
export const useMultilingualContent = () => {
  const { locale } = useI18n()

  /**
   * Get the collection name for the current locale
   */
  const getLocalizedCollection = (baseCollection: string) => {
    return `${baseCollection}_${locale.value}`
  }

  /**
   * Query content from locale-specific collection with fallback
   */
  const queryLocalizedContent = async (baseCollection: string) => {
    const localizedCollection = getLocalizedCollection(baseCollection)

    try {
      return await queryCollection(localizedCollection).all()
    } catch (error) {
      // Fallback to base collection if localized version doesn't exist
      console.warn(`Collection ${localizedCollection} not found, falling back to '${baseCollection}'`)
      return await queryCollection(baseCollection).all()
    }
  }

  /**
   * Query a single content item from locale-specific collection with fallback
   */
  const queryLocalizedContentItem = async (baseCollection: string, path: string) => {
    const localizedCollection = getLocalizedCollection(baseCollection)

    try {
      return await queryCollection(localizedCollection).path(path).first()
    } catch (error) {
      // Fallback to base collection if localized version doesn't exist
      console.warn(`Collection ${localizedCollection} not found, falling back to '${baseCollection}'`)
      return await queryCollection(baseCollection).path(path).first()
    }
  }

  /**
   * Get articles for the current locale
   */
  const getLocalizedArticles = async () => {
    const articles = await queryLocalizedContent('articles')
    return articles.sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  /**
   * Get portfolio items for the current locale
   */
  const getLocalizedPortfolio = async () => {
    const portfolio = await queryLocalizedContent('portfolio')
    return portfolio.sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  /**
   * Get about content for the current locale
   */
  const getLocalizedAbout = async () => {
    return await queryLocalizedContent('about')
  }

  return {
    locale,
    getLocalizedCollection,
    queryLocalizedContent,
    queryLocalizedContentItem,
    getLocalizedArticles,
    getLocalizedPortfolio,
    getLocalizedAbout,
  }
}