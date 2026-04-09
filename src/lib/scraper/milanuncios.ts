// Scraper de Milanuncios via RSS
// RSS no requiere browser — es XML puro

export interface MilanunciosListing {
  id: string
  title: string
  description: string
  price: number | null
  city: string
  operation: 'rent' | 'sale'
  url: string
  image_url: string | null
}

const CITY_SLUGS: Record<string, string> = {
  Madrid:    'madrid',
  Barcelona: 'barcelona',
  Valencia:  'valencia-ciudad',
  Sevilla:   'sevilla',
  Málaga:    'malaga',
  Bilbao:    'bilbao',
  Zaragoza:  'zaragoza',
  Alicante:  'alicante',
}

const OPERATIONS = [
  { slug: 'pisos-en-alquiler', operation: 'rent' as const },
  { slug: 'pisos-en-venta',    operation: 'sale' as const },
]

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  return (match?.[1] ?? match?.[2] ?? '').trim()
}

function extractPrice(text: string): number | null {
  const m = text.match(/(\d[\d.,]+)\s*€/)
  if (!m) return null
  return parseFloat(m[1].replace('.', '').replace(',', '.'))
}

function extractImageUrl(content: string): string | null {
  const m = content.match(/<img[^>]+src=["']([^"']+)["']/)
  return m?.[1] ?? null
}

function parseItems(rssXml: string, city: string, operation: 'rent' | 'sale'): MilanunciosListing[] {
  const results: MilanunciosListing[] = []
  const itemBlocks = rssXml.match(/<item>([\s\S]*?)<\/item>/g) ?? []

  for (const block of itemBlocks) {
    const title = extractTag(block, 'title')
    const link  = extractTag(block, 'link')
    const desc  = extractTag(block, 'description')
    const guid  = extractTag(block, 'guid')

    if (!title || !link) continue

    const id = `milanuncios-${guid || link.split('/').filter(Boolean).pop() || Math.random().toString(36).slice(2)}`
    const price = extractPrice(title) ?? extractPrice(desc)
    const image = extractImageUrl(desc)

    results.push({
      id,
      title: title.replace(/\s+/g, ' '),
      description: desc.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 2000),
      price,
      city,
      operation,
      url: link,
      image_url: image,
    })
  }

  return results
}

export async function scrapeMilanuncios(): Promise<MilanunciosListing[]> {
  const results: MilanunciosListing[] = []

  for (const [cityName, citySlug] of Object.entries(CITY_SLUGS)) {
    for (const { slug, operation } of OPERATIONS) {
      try {
        const url = `https://www.milanuncios.com/rss/${slug}/?where=${citySlug}`
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; bot/1.0; +https://miviviendalibre.com)',
            'Accept': 'application/rss+xml, application/xml, text/xml',
          },
          next: { revalidate: 0 },
        })

        if (!res.ok) continue

        const xml = await res.text()
        const items = parseItems(xml, cityName, operation)
        results.push(...items)

        await new Promise(r => setTimeout(r, 500))
      } catch {
        // Ignorar errores individuales
      }
    }
  }

  return results
}
