/**
 * Schema.org RealEstateProperty
 * Rich snippets en Google con precio, ubicación, características
 * Aparece en resultados de búsqueda con información destacada
 */

interface Listing {
  id: string
  title: string
  description: string | null
  city: string | null
  district: string | null
  address: string | null
  lat: number | null
  lng: number | null
  operation: 'sale' | 'rent'
  price_eur: number | null
  area_m2: number | null
  bedrooms: number | null
  bathrooms: number | null
  is_particular: boolean
  agency_name: string | null
  photos: Array<{ url: string }>
}

interface Props {
  listing: Listing
}

export default function RealEstatePropertySchema({ listing }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateProperty',
    name: listing.title,
    description: listing.description || `${listing.operation === 'sale' ? 'Piso en venta' : 'Piso en alquiler'} en ${listing.city || 'España'}`,
    url: `https://inmonest.com/pisos/${listing.id}`,
    
    // Ubicación
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.city,
      addressRegion: listing.district,
      streetAddress: listing.address,
      addressCountry: 'ES',
    },

    // Coordenadas geográficas
    ...(listing.lat && listing.lng ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: listing.lat,
        longitude: listing.lng,
      },
    } : {}),

    // Características
    numberOfRooms: listing.bedrooms,
    numberOfBathroomsTotal: listing.bathrooms,
    floorSize: listing.area_m2 ? {
      '@type': 'QuantitativeValue',
      value: listing.area_m2,
      unitCode: 'MTK', // Metros cuadrados
    } : undefined,

    // Oferta (precio)
    offers: {
      '@type': 'Offer',
      price: listing.price_eur,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceSpecification: listing.operation === 'rent' ? {
        '@type': 'UnitPriceSpecification',
        price: listing.price_eur,
        priceCurrency: 'EUR',
        unitText: 'MONTH',
      } : undefined,
      seller: {
        '@type': listing.is_particular ? 'Person' : 'Organization',
        name: listing.is_particular ? 'Particular' : (listing.agency_name || 'Agencia'),
      },
    },

    // Imágenes
    image: listing.photos.map(p => p.url),
  }

  // Limpiar valores undefined
  const cleanSchema = JSON.parse(JSON.stringify(schema))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  )
}
