import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/NavbarServer'
import Link from 'next/link'
import MisAnunciosList from './MisAnunciosList'

export default async function MiCuentaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Obtener sus anuncios
  const { data: misAnuncios } = await supabase
    .from('listings')
    .select('id, title, city, price_eur, operation, status, published_at, views_count')
    .eq('owner_user_id', user.id)
    .order('published_at', { ascending: false })
    .limit(20)

  // Obtener leads recibidos (últimos 30)
  const anuncioIds = (misAnuncios ?? []).map((a) => a.id)
  const { data: leads } = anuncioIds.length > 0
    ? await supabase
        .from('listing_contacts')
        .select('id, listing_id, from_name, from_email, from_phone, message, created_at')
        .in('listing_id', anuncioIds)
        .order('created_at', { ascending: false })
        .limit(30)
    : { data: [] }

  // Mapa id → título del anuncio
  const anuncioMap = Object.fromEntries((misAnuncios ?? []).map((a) => [a.id, a.title]))

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mi cuenta</h1>
            <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
          </div>
          <Link
            href="/publicar"
            className="px-5 py-2.5 bg-[#c9962a] text-white rounded-full text-sm font-semibold hover:bg-[#a87a20] transition-colors"
          >
            + Publicar anuncio
          </Link>
        </div>

        {/* Mis anuncios */}
        <section>
          <h2 className="text-base font-semibold text-gray-700 mb-3">Mis anuncios</h2>
          <MisAnunciosList anuncios={misAnuncios ?? []} />
        </section>

        {/* Leads / mensajes recibidos */}
        <section className="mt-10">
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            Mensajes recibidos
            {leads && leads.length > 0 && (
              <span className="ml-2 text-xs bg-[#fef0c0] text-[#a87a20] px-2 py-0.5 rounded-full font-medium">
                {leads.length}
              </span>
            )}
          </h2>
          {!leads || leads.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <p className="text-gray-500 text-sm">Aún no has recibido ningún mensaje.</p>
              <p className="text-xs text-gray-400 mt-1">Cuando alguien contacte desde tus anuncios, aparecerá aquí.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{lead.from_name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        <a href={`mailto:${lead.from_email}`} className="text-[#c9962a] hover:underline">{lead.from_email}</a>
                        {lead.from_phone && <> · <a href={`tel:${lead.from_phone}`} className="text-[#c9962a] hover:underline">{lead.from_phone}</a></>}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 shrink-0">
                      {new Date(lead.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">{lead.message}</p>
                  <p className="mt-2 text-xs text-gray-400 italic truncate">
                    Anuncio: {anuncioMap[lead.listing_id] ?? lead.listing_id}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Cerrar sesión */}
        <form action="/auth/signout" method="POST" className="mt-10">
          <button
            type="submit"
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  )
}
