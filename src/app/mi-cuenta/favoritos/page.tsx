import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import FavoritoCard from './FavoritoCard'

export default async function FavoritosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Obtener favoritos con datos del listing
  const { data: favs } = await supabase
    .from('user_favorites')
    .select('id,listing_id,created_at')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const listingIds = (favs ?? []).map(f => f.listing_id)

  const { data: listings } = listingIds.length > 0
    ? await supabase
        .from('listings')
        .select('id,title,city,province,price_eur,operation,bedrooms,bathrooms,area_m2,images,source')
        .in('id', listingIds)
    : { data: [] }

  const listingMap = Object.fromEntries((listings ?? []).map(l => [l.id, l]))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis favoritos</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {(favs ?? []).length} {(favs ?? []).length === 1 ? 'propiedad guardada' : 'propiedades guardadas'}
        </p>
      </div>

      {!favs || favs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
          <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">❤️</div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Sin favoritos aun</h2>
          <p className="text-sm text-gray-400 mb-6">
            Guarda las propiedades que te interesen pulsando el corazon en cualquier anuncio.
          </p>
          <Link href="/pisos" className="inline-block bg-[#c9962a] hover:bg-[#b8841e] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
            Explorar propiedades
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {(favs ?? []).map(fav => {
            const listing = listingMap[fav.listing_id]
            if (!listing) return null
            return (
              <FavoritoCard
                key={fav.id}
                favId={fav.id}
                listing={listing}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
