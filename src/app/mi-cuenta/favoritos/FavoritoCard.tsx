'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ListingImage {
  external_url: string | null
  storage_path: string | null
  position: number
}

interface Listing {
  id: string
  title: string
  city: string | null
  province: string | null
  price_eur: number | null
  operation: string
  bedrooms: number | null
  bathrooms: number | null
  area_m2: number | null
  listing_images: ListingImage[]
  source: string
}

interface Props {
  favId: string
  listing: Listing
}

export default function FavoritoCard({ favId, listing }: Props) {
  const router  = useRouter()
  const [removing, setRemoving] = useState(false)

  async function handleRemove() {
    setRemoving(true)
    await fetch('/api/favoritos/toggle', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ listing_id: listing.id }),
    })
    router.refresh()
  }

  const firstImg = (listing.listing_images ?? []).sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]
  const imgSrc = firstImg?.storage_path
    ? firstImg.storage_path
    : firstImg?.external_url
      ? `/api/img-proxy?url=${encodeURIComponent(firstImg.external_url)}`
      : '/interior1.jpg'
  const location = [listing.city, listing.province].filter(Boolean).join(', ')
  const price = listing.price_eur
    ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(listing.price_eur)
    : null

  return (
    <div className={`group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-all ${removing ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="relative h-48 bg-gray-100">
        <Image
          src={imgSrc}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = '/interior1.jpg' }}
        />
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-rose-50 transition-colors"
          title="Quitar de favoritos"
        >
          <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {listing.operation && (
          <span className="absolute bottom-2 left-2 bg-[#c9962a] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {listing.operation === 'rent' ? 'Alquiler' : 'Venta'}
          </span>
        )}
      </div>
      <div className="p-4">
        <Link href={`/pisos/${listing.id}`} className="block">
          <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-[#c9962a] transition-colors">
            {listing.title}
          </p>
          {location && <p className="text-xs text-gray-400 mt-1">{location}</p>}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            {listing.bedrooms != null && <span>{listing.bedrooms} hab.</span>}
            {listing.bathrooms != null && <span>{listing.bathrooms} ban.</span>}
            {listing.area_m2 != null && <span>{listing.area_m2} m²</span>}
          </div>
          {price && (
            <p className="text-base font-bold text-[#c9962a] mt-2">
              {price}{listing.operation === 'rent' ? '/mes' : ''}
            </p>
          )}
        </Link>
      </div>
    </div>
  )
}
