import { createClient } from '@/lib/supabase/server'
import MisAnunciosList from '../MisAnunciosList'
import Link from 'next/link'

export default async function MisAnunciosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: anuncios } = await supabase
    .from('listings')
    .select('id,title,city,price_eur,operation,status,published_at,views_count,turbo_until')
    .eq('owner_user_id', user!.id)
    .order('published_at', { ascending: false })
    .limit(50)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis anuncios</h1>
          <p className="text-sm text-gray-500 mt-0.5">{(anuncios ?? []).length} publicaciones</p>
        </div>
        <Link
          href="/publicar"
          className="inline-flex items-center gap-2 bg-[#c9962a] hover:bg-[#b8841e] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo anuncio
        </Link>
      </div>
      <MisAnunciosList anuncios={anuncios ?? []} />
    </div>
  )
}
