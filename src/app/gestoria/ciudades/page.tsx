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
  { slug: 'bilbao', nombre: 'Bilbao', emoji: '🏔️' },
  { slug: 'zaragoza', nombre: 'Zaragoza', emoji: '🏰' },
  { slug: 'alicante', nombre: 'Alicante', emoji: '⛱️' },
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
                      Disponible en:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {CIUDADES.slice(0, 3).map(ciudad => {
                        // Usar rutas existentes para servicios que ya tienen páginas por ciudad
                        const href = ['contrato-arras', 'contrato-alquiler'].includes(servicio.slug)
                          ? `/${ciudad.slug}/${servicio.slug}`
                          : `/gestoria/${servicio.slug}/${ciudad.slug}`
                        
                        return (
                          <Link
                            key={ciudad.slug}
                            href={href}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-[#c9a84c] hover:text-white rounded-full text-sm font-medium text-gray-700 transition-colors"
                          >
                            {ciudad.nombre}
                          </Link>
                        )
                      })}
                    </div>
                    
                    <Link
                      href={`/gestoria/${servicio.slug}`}
                      className="text-sm text-[#c9a84c] hover:text-[#a68939] font-semibold flex items-center gap-1 group"
                    >
                      Ver todas las ciudades 
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              ))}
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
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
