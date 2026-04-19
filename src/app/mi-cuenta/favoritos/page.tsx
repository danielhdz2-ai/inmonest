import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import FavoritoCard from './FavoritoCard'

export default async function FavoritosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // JOIN !inner: solo devuelve favoritos cuyo listing aún existe.
  // Incluye listing_images para mostrar la foto principal.
  const { data: favs } = await supabase
    .from('user_favorites')
    .select(`
      id,
      listing_id,
      created_at,
      listings!inner(
        id,title,city,province,price_eur,operation,bedrooms,bathrooms,area_m2,source,
        listing_images(external_url,storage_path,position)
      )
    `)
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const count = (favs ?? []).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis favoritos</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {count} {count === 1 ? 'propiedad guardada' : 'propiedades guardadas'}
        </p>
      </div>

      {count === 0 ? (
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const listing = (fav as any).listings
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
