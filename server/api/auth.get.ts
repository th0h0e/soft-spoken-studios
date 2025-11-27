export default defineEventHandler(async (event) => {
  // This endpoint is required by Nuxt Studio for authentication
  // It provides basic auth status that Studio can use
  return {
    authenticated: true,
    user: null
  }
})
