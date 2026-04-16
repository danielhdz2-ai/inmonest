import { MetadataRoute } from 'next'

/**
 * Stub vacio — el sitemap real se sirve desde src/app/sitemap.xml/route.ts
 * que toma precedencia sobre este metadata route para /sitemap.xml
 * segun los docs de Next.js: `route.js takes priority over metadata routes`
 */
export const revalidate = 0

export default function sitemap(): MetadataRoute.Sitemap {
  return []
}

