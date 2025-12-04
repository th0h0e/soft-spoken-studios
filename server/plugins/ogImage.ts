import { defineNitroPlugin } from 'nitropack/runtime/plugin'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('nuxt-og-image:context', async (ctx) => {
    // e is the H3Event
    if (!ctx.e.path.startsWith('/fancy-og-images/'))
      return

    // modify props (usually better suited in route rules)
    ctx.options.props.isFancy = true
    // make all images use the same cache key
    ctx.key = 'fancy-og-images'
  })

  // Strip px units from zIndex in OG images (Satori shouldn't add units to zIndex)
  nitroApp.hooks.hook('nuxt-og-image:satori:vnodes', async (vnodes) => {
    const stripZIndexUnits = (node: any) => {
      if (!node)
        return
      if (node.style && typeof node.style.zIndex === 'string') {
        node.style.zIndex = node.style.zIndex.replace('px', '')
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          stripZIndexUnits(child)
        }
      }
    }
    stripZIndexUnits(vnodes)
  })
})
