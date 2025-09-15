export default defineEventHandler(async (event) => {
  const hostname = 'https://softspokenstudios.com' // Update with your actual domain

  // Get all articles and portfolio items from Nuxt Content
  const articles = await serverQueryContent(event, 'articles').find()
  const portfolio = await serverQueryContent(event, 'portfolio').find()

  // Create XML sitemap
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ]

  // Add static pages
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/work', priority: '0.9', changefreq: 'weekly' },
    { path: '/blog', priority: '0.8', changefreq: 'daily' },
    { path: '/gallery', priority: '0.6', changefreq: 'monthly' },
  ]

  staticPages.forEach(page => {
    sitemap.push(`
  <url>
    <loc>${hostname}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`)
  })

  // Add blog articles
  articles.forEach(article => {
    sitemap.push(`
  <url>
    <loc>${hostname}${article._path}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${article.date ? new Date(article.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
  </url>`)
  })

  // Add portfolio projects
  portfolio.forEach(project => {
    sitemap.push(`
  <url>
    <loc>${hostname}${project._path}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>${project.date ? new Date(project.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
  </url>`)
  })

  sitemap.push('</urlset>')

  // Set content type and return XML
  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap.join('')
})