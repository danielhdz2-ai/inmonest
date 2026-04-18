import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'

export default async function MensajesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: anuncios } = await supabase
    .from('listings')
    .select('id,title')
    .eq('owner_user_id', user!.id)

  const anuncioIds = (anuncios ?? []).map((a: { id: string }) => a.id)
  const anuncioMap = Object.fromEntries((anuncios ?? []).map((a: { id: string; title: string }) => [a.id, a.title]))

  const { data: leads } = anuncioIds.length > 0
    ? await supabase
        .from('listing_contacts')
        .select('id,listing_id,from_name,from_email,from_phone,message,created_at')
        .in('listing_id', anuncioIds)
        .order('created_at', { ascending: false })
        .limit(100)
    : { data: [] }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mensajes recibidos</h1>
        <p className="text-sm text-gray-500 mt-0.5">{(leads ?? []).length} mensajes</p>
      </div>

      {!leads || leads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">💬</div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Sin mensajes aun</h2>
          <p className="text-sm text-gray-400 mb-6">
            Cuando alguien contacte a traves de tus anuncios, aparecera aqui.
          </p>
          <Link href="/publicar" className="inline-block bg-[#c9962a] hover:bg-[#b8841e] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
            Publicar anuncio
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9962a] to-[#7a5c1e] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {(lead.from_name ?? '?').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{lead.from_name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <a href={`mailto:${lead.from_email}`} className="text-xs text-[#c9962a] hover:underline">{lead.from_email}</a>
                      {lead.from_phone && (
                        <>
                          <span className="text-gray-300">·</span>
                          <a href={`tel:${lead.from_phone}`} className="text-xs text-[#c9962a] hover:underline">{lead.from_phone}</a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(lead.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">{lead.message}</p>
              <p className="mt-2 text-xs text-gray-400 italic truncate">
                Anuncio: {anuncioMap[lead.listing_id] ?? lead.listing_id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
