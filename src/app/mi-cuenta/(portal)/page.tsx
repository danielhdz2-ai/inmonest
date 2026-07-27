import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'

export default async function DashboardHomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { count: anunciosCount },
    { count: favCount },
    { data: anuncios },
    { data: contratos },
    { data: profileData },
  ] = await Promise.all([
    supabase.from('listings').select('id', { count: 'exact', head: true }).eq('owner_user_id', user!.id).eq('status', 'published'),
    supabase.from('user_favorites').select('id', { count: 'exact', head: true }).eq('user_id', user!.id),
    supabase.from('listings').select('id').eq('owner_user_id', user!.id),
    supabase.from('gestoria_requests').select('id,service_key,step,paid_at,amount_eur').eq('client_email', user!.email).order('paid_at', { ascending: false }).limit(3),
    supabase.from('user_profiles').select('full_name').eq('user_id', user!.id).single(),
  ])

  const anuncioIds = (anuncios ?? []).map((a: { id: string }) => a.id)
  const { count: msgCount } = anuncioIds.length > 0
    ? await supabase.from('listing_contacts').select('id', { count: 'exact', head: true }).in('listing_id', anuncioIds)
    : { count: 0 }

  const displayName = profileData?.full_name ?? user!.email?.split('@')[0] ?? 'Usuario'
  const hour = new Date().getHours()
  const greeting = hour < 13 ? 'Buenos dias' : hour < 20 ? 'Buenas tardes' : 'Buenas noches'

  const SERVICE_SHORT: Record<string, string> = {
    'arras-confirmatorias':  'Arras Confirmatorias',
    'arras-penitenciales':   'Arras Penitenciales',
    'alquiler-vivienda-lau': 'Contrato Alquiler',
    'opcion-compra':         'Opcion de Compra',
    'compraventa-privada':   'Compraventa',
    'alquiler-temporada':    'Alquiler Temporada',
  }

  return (
    <div className="space-y-8">

      {/* HERO BIENVENIDA */}
      <div className="relative overflow-hidden rounded-2xl text-white p-8 shadow-xl min-h-[200px]">
        <div className="absolute inset-0">
          <Image src="/interior2.jpg" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1008]/95 via-[#1a1008]/80 to-[#1a1008]/40" />
        </div>
        <div className="relative z-10">
          <p className="text-amber-300 text-sm font-medium mb-1">{greeting}</p>
          <h1 className="text-3xl font-bold mb-2">{displayName} 👋</h1>
          <p className="text-gray-300 text-sm max-w-md">
            Bienvenido a tu panel personal. Gestiona tus anuncios, contratos y documentacion desde aqui.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/publicar"
              className="inline-flex items-center gap-2 bg-[#c9962a] hover:bg-[#b8841e] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Publicar anuncio
            </Link>
            <Link
              href="/gestoria"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors backdrop-blur-sm border border-white/20"
            >
              Contratar gestoria
            </Link>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {([
          { label: 'Anuncios activos', value: anunciosCount ?? 0,          icon: '🏠', href: '/mi-cuenta/anuncios',   bg: 'from-blue-50 to-blue-100/40',   ib: 'bg-blue-100 text-blue-600' },
          { label: 'Favoritos',        value: favCount ?? 0,               icon: '❤️',  href: '/mi-cuenta/favoritos',  bg: 'from-rose-50 to-rose-100/40',   ib: 'bg-rose-100 text-rose-600' },
          { label: 'Mensajes',         value: msgCount ?? 0,               icon: '💬',  href: '/mi-cuenta/mensajes',   bg: 'from-green-50 to-green-100/40', ib: 'bg-green-100 text-green-600' },
          { label: 'Contratos',        value: (contratos ?? []).length,    icon: '📄',  href: '/mi-cuenta/contratos',  bg: 'from-amber-50 to-amber-100/40', ib: 'bg-amber-100 text-amber-600' },
        ] as const).map(s => (
          <Link
            key={s.label}
            href={s.href}
            className={`relative group bg-gradient-to-br ${s.bg} rounded-2xl p-5 border border-white hover:shadow-md transition-all`}
          >
            <div className={`w-10 h-10 rounded-xl ${s.ib} flex items-center justify-center text-xl mb-3`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors absolute bottom-4 right-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* DOS COLUMNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Ultimos contratos */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Ultimos contratos</h2>
            <Link href="/mi-cuenta/contratos" className="text-xs text-[#c9962a] hover:underline font-medium">Ver todos →</Link>
          </div>
          {!contratos || contratos.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-4xl mb-3">📄</div>
              <p className="text-sm text-gray-500">No has contratado ningun servicio aun.</p>
              <Link href="/gestoria" className="inline-block mt-4 text-sm text-[#c9962a] font-semibold hover:underline">
                Ver gestoria →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {contratos.map(c => (
                <div key={c.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-base flex-shrink-0">
                    📋
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {SERVICE_SHORT[c.service_key] ?? c.service_key.replace(/-/g, ' ')}
                    </p>
                    <p className="text-xs text-gray-400">
                      {c.paid_at
                        ? new Date(c.paid_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'Sin fecha'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-[#c9962a]">
                      {c.amount_eur ? `${c.amount_eur} EUR` : ''}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      (c.step ?? 1) >= 4 ? 'bg-green-100 text-green-700' :
                      (c.step ?? 1) === 3 ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      Paso {c.step ?? 1}/4
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Acciones rapidas + promo */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Acciones rapidas</h2>
            <div className="space-y-1">
              {([
                { href: '/mi-cuenta/anuncios',  label: 'Gestionar mis anuncios', icon: '🏠' },
                { href: '/mi-cuenta/favoritos', label: 'Ver mis favoritos',       icon: '❤️' },
                { href: '/mi-cuenta/contratos', label: 'Subir documentacion',    icon: '📤' },
                { href: '/mi-cuenta/perfil',    label: 'Editar mi perfil',        icon: '✏️' },
              ] as const).map(a => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-lg">{a.icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{a.label}</span>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#c9962a] ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Promo gestoria */}
          <div className="relative overflow-hidden rounded-2xl p-5 text-white min-h-[160px]">
            <div className="absolute inset-0">
              <Image src="/gestoria1.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#7a5c1e]/95 to-[#c9962a]/80" />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-semibold text-amber-200 mb-1 uppercase tracking-wide">Gestoria</p>
              <p className="font-bold text-lg leading-tight mb-2">Contratos con validez legal</p>
              <p className="text-sm text-amber-100/90 mb-4">
                Redactados por abogados especializados.
              </p>
              <Link
                href="/gestoria"
                className="inline-block bg-white text-[#7a5c1e] text-sm font-bold px-4 py-2 rounded-xl hover:bg-amber-50 transition-colors"
              >
                Ver contratos →
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
