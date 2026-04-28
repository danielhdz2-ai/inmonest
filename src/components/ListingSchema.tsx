/**
 * 🏠 Schema Markup RealEstateListing
 * 
 * Genera JSON-LD structured data para Google Rich Results
 * Ayuda a Google a entender el contenido y mostrar rich snippets
 * 
 * Ref: https://schema.org/RealEstateListing
 */

interface ListingSchemaProps {
  listing: any // Flexible para aceptar diferentes tipos de Listing
}

export default function ListingSchema({ listing }: ListingSchemaProps) {
  const baseUrl = 'https://inmonest.com'
  const url = `${baseUrl}/pisos/${listing.id}`
  
  // Dirección completa
  const address = {
    '@type': 'PostalAddress',
    addressLocality: listing.city || 'España',
    addressRegion: listing.province || listing.city || 'España',
    postalCode: listing.postal_code || undefined,
    addressCountry: 'ES',
  }
  
  // Ubicación geográfica
  const geo = listing.lat && listing.lng ? {
    '@type': 'GeoCoordinates',
    latitude: listing.lat,
    longitude: listing.lng,
  } : undefined
  
  // Imágenes
  const images = (listing.listing_images || [])
    .slice(0, 10)
    .map((img: any) => img.image_url)
  
  // Descripción (priorizar AI description)
  const description = (listing.ai_description || listing.description || listing.title).slice(0, 300)
  
  // Precio
  const priceSpecification = listing.price_eur ? {
    '@type': 'PriceSpecification',
    price: listing.price_eur,
    priceCurrency: 'EUR',
    ...(listing.operation === 'rent' && { unitText: 'MONTH' }),
  } : undefined
  
  // Schema principal RealEstateListing
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': url,
    url,
    name: listing.title,
    description,
    ...(images.length > 0 && { image: images }),
    
    // Tipo de oferta
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: listing.price_eur || undefined,
      priceCurrency: 'EUR',
      priceSpecification,
      url,
    },
    
    // Propiedad
    mainEntity: {
      '@type': listing.operation === 'sale' ? 'SingleFamilyResidence' : 'Apartment',
      name: listing.title,
      description,
      address,
      ...(geo && { geo }),
      
      // Características
      ...(listing.bedrooms && { numberOfRooms: listing.bedrooms }),
      ...(listing.bathrooms && { numberOfBathroomsTotal: listing.bathrooms }),
      ...(listing.area_m2 && { 
        floorSize: {
          '@type': 'QuantitativeValue',
          value: listing.area_m2,
          unitCode: 'MTK', // metros cuadrados
        }
      }),
    },
    
    // Fechas
    datePosted: listing.created_at,
    dateModified: listing.updated_at || listing.created_at,
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
