import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Gestoría Inmobiliaria por Ciudad | Servicios en toda España | Inmonest',
  description: 'Servicios de gestoría inmobiliaria en las principales ciudades de España: Madrid, Barcelona, Valencia, Sevilla y más. Contratos, trámites y asesoría legal online.',
  keywords: 'gestoría inmobiliaria madrid, gestoría inmobiliaria barcelona, contrato arras ciudad, contrato alquiler ciudad, servicios gestoría españa',
  openGraph: {
    title: 'Gestoría Inmobiliaria por Ciudad | Inmonest',
    description: 'Servicios de gestoría inmobiliaria en las principales ciudades de España. Contratos, trámites y asesoría legal online.',
    type: 'website',
  },
}

const CIUDADES = [
  { slug: 'madrid', nombre: 'Madrid', emoji: '🏛️' },
  { slug: 'barcelona', nombre: 'Barcelona', emoji: '🏖️' },
  { slug: 'valencia', nombre: 'Valencia', emoji: '🌊' },
  { slug: 'sevilla', nombre: 'Sevilla', emoji: '☀️' },
  { slug: 'malaga', nombre: 'Málaga', emoji: '🌴' },
  { slug: 'salamanca', nombre: 'Salamanca', emoji: '🎓' },
  { slug: 'valladolid', nombre: 'Valladolid', emoji: '🚄' },
]

// LANDING PAGES GENÉRICAS (SIN CIUDADES)
const LANDING_GENERICAS = [
  { slug: 'asesoria-compra-piso', nombre: 'Asesoría Compra de Piso', precio: '666€' },
  { slug: 'due-diligence-precompra', nombre: 'Due Diligence Pre-Compra', precio: '350€' },
  { slug: 'asesoramiento-arras-venta', nombre: 'Asesoramiento Arras a Venta', precio: '166€' },
  { slug: 'arras-vs-reserva-compra', nombre: 'Arras vs Reserva Compra', precio: 'Info' },
  { slug: 'guia-arras-penitenciales', nombre: 'Guía Arras Penitenciales', precio: 'Info' },
  { slug: 'revision-contrato-arras', nombre: 'Revisión Contrato Arras', precio: '60€' },
  { slug: 'contrato-compraventa', nombre: 'Contrato Compraventa', precio: '80€' },
  { slug: 'cuanto-cuesta-contrato-alquiler', nombre: 'Cuánto Cuesta Contrato Alquiler', precio: 'Info' },
  { slug: 'revision-contrato-alquiler', nombre: 'Revisión Contrato Alquiler', precio: '60€' },
  { slug: 'contrato-ilegal', nombre: 'Análisis Contrato Ilegal', precio: '29€' },
  { slug: 'ayuda-propietarios', nombre: 'Ayuda Propietarios LAU', precio: '73€' },
  { slug: 'contrato-arras', nombre: 'Contrato Arras (Info)', precio: 'Info' },
  { slug: 'venta-completa-reserva-escritura', nombre: 'Venta Completa Genérica', precio: '666€' },
]

// LANDING PAGES CON VARIANTES POR CIUDAD
const LANDING_POR_CIUDAD = [
  { 
    servicio: 'venta-completa-reserva-escritura', 
    nombre: 'Servicio Completo Venta',
    ciudades: ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'salamanca', 'valladolid']
  },
  { 
    servicio: 'due-diligence-precompra', 
    nombre: 'Pack Due Diligence Pre-Compra',
    ciudades: ['madrid', 'barcelona']
  },
  { 
    servicio: 'ciudad-hub', 
    nombre: 'Gestoría Ciudad (Hub)',
    ciudades: ['madrid', 'barcelona', 'valencia', 'sevilla']
  },
]

const SERVICIOS = [
  {
    titulo: 'Gestoría Inmobiliaria',
    descripcion: 'Asesoría completa para comprar, vender o alquilar tu propiedad',
    slug: 'gestoria',
    icono: '📋',
    color: 'from-blue-500 to-blue-600',
  },
  {
    titulo: 'Contrato de Arras',
    descripcion: 'Redacción profesional de contratos de señal y arras penitenciales',
    slug: 'contrato-arras',
    icono: '📝',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    titulo: 'Contrato de Alquiler',
    descripcion: 'Contratos LAU con todas las cláusulas legales actualizadas',
    slug: 'contrato-alquiler',
    icono: '🏠',
    color: 'from-purple-500 to-purple-600',
  },
  {
    titulo: 'Acompañamiento de Venta',
    descripcion: 'Te ayudamos en todo el proceso de venta de tu propiedad',
    slug: 'acompanamiento-venta',
    icono: '🤝',
    color: 'from-orange-500 to-orange-600',
  },
  {
    titulo: 'Revisión Contrato Alquiler',
    descripcion: 'Revisión legal de contratos de alquiler existentes',
    slug: 'revision-contrato-alquiler',
    icono: '🔍',
    color: 'from-pink-500 to-pink-600',
  },
  {
    titulo: 'Contrato de Compraventa',
    descripcion: 'Contratos privados de compraventa inmobiliaria',
    slug: 'contrato-compraventa',
    icono: '💼',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    titulo: 'Venta Completa + Escritura',
    descripcion: 'Servicio integral desde reserva hasta firma en notaría',
    slug: 'venta-completa-reserva-escritura',
    icono: '✅',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    titulo: 'Asesoría Compra de Piso',
    descripcion: 'Asesoramiento experto antes de comprar tu vivienda',
    slug: 'asesoria-compra-piso',
    icono: '🏡',
    color: 'from-red-500 to-red-600',
  },
]

export default function CiudadesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#2b4c7e] to-[#1e3a5f] text-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Gestoría Inmobiliaria en <span className="text-[#c9a84c]">Toda España</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
                Servicios profesionales de gestoría inmobiliaria online en las principales ciudades de España. 
                Contratos, trámites y asesoría legal desde 49€.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                {CIUDADES.map(ciudad => (
                  <span key={ciudad.slug} className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                    {ciudad.emoji} {ciudad.nombre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Servicios Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Guías y Servicios por Ciudad
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Selecciona el servicio que necesitas y encuentra información específica para tu ciudad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICIOS.map(servicio => (
                <div 
                  key={servicio.slug}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Header con gradiente */}
                  <div className={`bg-gradient-to-r ${servicio.color} p-6 text-white`}>
                    <div className="text-4xl mb-3">{servicio.icono}</div>
                    <h3 className="text-xl font-bold mb-2">{servicio.titulo}</h3>
                    <p className="text-white/90 text-sm">{servicio.descripcion}</p>
                  </div>

                  {/* Ciudades disponibles */}
                  <div className="p-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Disponible en toda España:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {CIUDADES.slice(0, 3).map(ciudad => (
                        <span
                          key={ciudad.slug}
                          className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                        >
                          {ciudad.nombre}
                        </span>
                      ))}
                      <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                        +40 ciudades
                      </span>
                    </div>
                    
                    <Link
                      href={`/gestoria/${servicio.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] hover:bg-[#a68939] text-white rounded-lg font-semibold transition-colors shadow-md"
                    >
                      Ver servicio completo
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* PANEL DE AUDITORÍA SEO */}
        <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-12">
              <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                🔍 PANEL DE AUDITORÍA SEO
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Todas las Landing Pages SEO
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Inventario completo de {LANDING_GENERICAS.length + LANDING_POR_CIUDAD.reduce((acc, l) => acc + l.ciudades.length, 0) + 4} landing pages para auditoría manual
              </p>
            </div>

            {/* Landing Pages Genéricas */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">📄</span>
                Landing Pages Genéricas (Sin Ciudades)
                <span className="ml-auto bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
                  {LANDING_GENERICAS.length} páginas
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {LANDING_GENERICAS.map(landing => (
                  <Link
                    key={landing.slug}
                    href={`/gestoria/${landing.slug}`}
                    target="_blank"
                    className="group p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {landing.nombre}
                      </h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                        {landing.precio}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>/{landing.slug}</span>
                      <span className="ml-auto text-purple-600 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Landing Pages por Ciudad */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">🗺️</span>
                Landing Pages por Ciudad
                <span className="ml-auto bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                  {LANDING_POR_CIUDAD.reduce((acc, l) => acc + l.ciudades.length, 0)} páginas
                </span>
              </h3>

              <div className="space-y-6">
                {LANDING_POR_CIUDAD.map(landing => (
                  <div key={landing.servicio} className="border-2 border-gray-200 rounded-lg p-6">
                    <h4 className="font-bold text-lg text-gray-900 mb-4">
                      {landing.nombre}
                    </h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {CIUDADES.map(ciudad => {
                        const existe = landing.ciudades.includes(ciudad.slug)
                        const url = landing.servicio === 'ciudad-hub' 
                          ? `/gestoria/${ciudad.slug}`
                          : `/gestoria/${landing.servicio}/${ciudad.slug}`
                        
                        return (
                          <div key={ciudad.slug}>
                            {existe ? (
                              <Link
                                href={url}
                                target="_blank"
                                className="flex items-center gap-2 p-3 bg-green-50 border-2 border-green-500 rounded-lg hover:bg-green-100 transition-all group"
                              >
                                <span className="text-lg">{ciudad.emoji}</span>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900 text-sm">{ciudad.nombre}</div>
                                  <div className="text-xs text-green-600">✓ Existe</div>
                                </div>
                                <span className="text-green-600 group-hover:translate-x-1 transition-transform">
                                  →
                                </span>
                              </Link>
                            ) : (
                              <div className="flex items-center gap-2 p-3 bg-gray-50 border-2 border-gray-300 rounded-lg opacity-50">
                                <span className="text-lg grayscale">{ciudad.emoji}</span>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-500 text-sm">{ciudad.nombre}</div>
                                  <div className="text-xs text-gray-400">✗ No existe</div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Páginas de Ciudad Genéricas */}
              <div className="mt-6 border-2 border-gray-200 rounded-lg p-6 bg-blue-50">
                <h4 className="font-bold text-lg text-gray-900 mb-4">
                  Hubs de Ciudad (Genéricos)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {CIUDADES.map(ciudad => {
                    const hubCiudades = LANDING_POR_CIUDAD.find((l) => l.servicio === 'ciudad-hub')?.ciudades ?? []
                    const tieneHub = hubCiudades.includes(ciudad.slug)

                    return (
                      <div key={ciudad.slug}>
                        {tieneHub ? (
                          <Link
                            href={`/gestoria/${ciudad.slug}`}
                            target="_blank"
                            className="flex items-center gap-2 p-3 bg-white border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-all group"
                          >
                            <span className="text-lg">{ciudad.emoji}</span>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-sm">{ciudad.nombre}</div>
                              <div className="text-xs text-blue-600">Hub general</div>
                            </div>
                            <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2 p-3 bg-gray-50 border-2 border-gray-300 rounded-lg opacity-50">
                            <span className="text-lg grayscale">{ciudad.emoji}</span>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-500 text-sm">{ciudad.nombre}</div>
                              <div className="text-xs text-gray-400">✗ Sin hub</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Resumen */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">TOTAL LANDING PAGES SEO</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {LANDING_GENERICAS.length + LANDING_POR_CIUDAD.reduce((acc, l) => acc + l.ciudades.length, 0) + CIUDADES.length} páginas
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{LANDING_GENERICAS.length}</div>
                      <div className="text-xs text-gray-600">Genéricas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {LANDING_POR_CIUDAD.reduce((acc, l) => acc + l.ciudades.length, 0) + CIUDADES.length}
                      </div>
                      <div className="text-xs text-gray-600">Por ciudad</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#2b4c7e] to-[#1e3a5f]">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿No encuentras tu ciudad?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Nuestros servicios de gestoría inmobiliaria online están disponibles en toda España. 
              Contáctanos y te ayudamos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+34641008847"
                className="px-8 py-4 bg-white text-[#2b4c7e] rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                📞 Llamar: 641 008 847
              </a>
              <a
                href="https://wa.me/34641008847?text=Hola,%20necesito%20información%20sobre%20servicios%20de%20gestoría"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25d366] text-white rounded-lg font-bold text-lg hover:bg-[#20ba5a] transition-colors shadow-lg"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Gestoría Inmobiliaria Online en Toda España
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              En <strong>Inmonest</strong> ofrecemos servicios de gestoría inmobiliaria online para todas las ciudades de España. 
              Ya sea que estés en Madrid, Barcelona, Valencia, Sevilla o cualquier otra ciudad, puedes contar con nuestros 
              servicios profesionales de redacción de contratos, asesoría legal y acompañamiento en operaciones inmobiliarias.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir una gestoría inmobiliaria online?
            </h3>
            
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span><strong>Ahorro de tiempo:</strong> Sin desplazamientos, todo online desde tu casa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span><strong>Precios transparentes:</strong> Desde 49€, sin sorpresas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span><strong>Profesionales especializados:</strong> Expertos en derecho inmobiliario</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span><strong>Servicio rápido:</strong> Contratos listos en 24-48 horas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span><strong>Disponible en toda España:</strong> No importa dónde estés</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Servicios más demandados por ciudad
            </h3>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Cada ciudad tiene sus particularidades en el mercado inmobiliario. Por eso ofrecemos información 
              específica y servicios adaptados a la legislación autonómica de cada comunidad:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">🏛️ Madrid</h4>
                <p className="text-sm text-gray-600">Contratos de arras, alquiler LAU, compraventa</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">🏖️ Barcelona</h4>
                <p className="text-sm text-gray-600">Cesión de contrato, alquiler turístico, compraventa</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">🌊 Valencia</h4>
                <p className="text-sm text-gray-600">Contratos de alquiler, arras, asesoría compra</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">☀️ Sevilla</h4>
                <p className="text-sm text-gray-600">Venta sin agencia, contratos LAU, due diligence</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">🌴 Málaga</h4>
                <p className="text-sm text-gray-600">Venta completa reserva→escritura, costa y centro</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">🎓 Salamanca</h4>
                <p className="text-sm text-gray-600">Venta universitaria, casco histórico, Castilla y León</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">🚄 Valladolid</h4>
                <p className="text-sm text-gray-600">Venta particular, compradores desde Madrid, provincia</p>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
