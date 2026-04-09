// Scraper de Wallapop (API JSON no oficial)
// Categoría 200 = Inmobiliaria, 213 = Pisos, 214 = Casas

export interface WallapopListing {
  id: string
  title: string
  description: string
  price: number | null
  city: string
  operation: 'rent' | 'sale'
  url: string
  image_url: string | null
}

const CITIES: Record<string, { lat: number; lng: number; name: string }> = {
  madrid:    { lat: 40.4168, lng: -3.7038, name: 'Madrid' },
  barcelona: { lat: 41.3851, lng:  2.1734, name: 'Barcelona' },
  valencia:  { lat: 39.4699, lng: -0.3763, name: 'Valencia' },
  sevilla:   { lat: 37.3891, lng: -5.9845, name: 'Sevilla' },
  malaga:    { lat: 36.7213, lng: -4.4214, name: 'Málaga' },
  bilbao:    { lat: 43.2630, lng: -2.9350, name: 'Bilbao' },
  zaragoza:  { lat: 41.6488, lng: -0.8891, name: 'Zaragoza' },
  alicante:  { lat: 38.3452, lng: -0.4810, name: 'Alicante' },
}

function buildUrl(lat: number, lng: number, keywords: string): string {
  const params = new URLSearchParams({
    keywords,
    filters_source: 'search_box',
    latitude: lat.toString(),
    longitude: lng.toString(),
    order_by: 'newest',
    category_ids: '200',
    start: '0',
    items_count: '40',
    language: 'es_ES',
  })
  return `https://api.wallapop.com/api/v3/general/search?${params}`
}

function detectOperation(title: string, desc: string): 'rent' | 'sale' {
  const text = `${title} ${desc}`.toLowerCase()
  const rentWords = ['alquil', 'arriend', 'renta', 'mensual', '/mes', 'mes']
  const saleWords = ['vend', 'venta', 'compra', 'precio total', 'oportunidad de compra']
  const rentScore = rentWords.filter(w => text.includes(w)).length
  const saleScore = saleWords.filter(w => text.includes(w)).length
  return saleScore > rentScore ? 'sale' : 'rent'
}

export async function scrapeWallapop(): Promise<WallapopListing[]> {
  const results: WallapopListing[] = []
  const seen = new Set<string>()

  const searches = [
    { keywords: 'piso alquiler particular' },
    { keywords: 'piso venta particular propietario' },
    { keywords: 'apartamento alquiler propietario' },
  ]

  for (const [cityKey, cityData] of Object.entries(CITIES)) {
    for (const search of searches) {
      try {
        const url = buildUrl(cityData.lat, cityData.lng, search.keywords)
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; bot)',
            'Accept': 'application/json',
            'Accept-Language': 'es-ES,es;q=0.9',
          },
          next: { revalidate: 0 },
        })

        if (!res.ok) continue

        const data = await res.json()
        const items = data?.data?.section?.payload?.items ?? []

        for (const item of items) {
          const id = `wallapop-${item.id ?? item.item_id}`
          if (seen.has(id)) continue
          seen.add(id)

          const title: string = item.title ?? ''
          const desc: string = item.description ?? ''
          const priceObj = item.price ?? item.sale_price ?? {}
          const price = priceObj.amount != null ? parseFloat(priceObj.amount) : null
          const imageUrl = item.main_image?.urls?.['640']
            ?? item.main_image?.urls?.['320']
            ?? item.images?.[0]?.urls?.['640']
            ?? null

          results.push({
            id,
            title,
            description: desc,
            price,
            city: cityData.name,
            operation: detectOperation(title, desc),
            url: `https://es.wallapop.com/item/${item.web_slug ?? item.id}`,
            image_url: imageUrl,
          })
        }

        // Pausa cortés entre peticiones
        await new Promise(r => setTimeout(r, 300))
      } catch {
        // Ignorar errores de ciudad/búsqueda individual
      }
    }
  }

  return results
}
