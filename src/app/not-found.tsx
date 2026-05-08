import Link from 'next/link'
import Navbar from '@/components/NavbarServer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-black text-[#c9962a] mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Página no encontrada
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition shadow-lg"
            >
              Volver al inicio
            </Link>
            <Link
              href="/pisos"
              className="border-2 border-[#c9962a] text-[#c9962a] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#c9962a] hover:text-white transition"
            >
              Ver pisos
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              ¿Buscabas algo en particular?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <Link href="/gestoria" className="p-4 border rounded-lg hover:border-[#c9962a] transition group">
                <div className="font-semibold text-gray-900 group-hover:text-[#c9962a] mb-1">
                  📄 Contratos y gestoría
                </div>
                <p className="text-sm text-gray-600">
                  Contratos de arras, alquiler y más
                </p>
              </Link>
              
              <Link href="/pisos" className="p-4 border rounded-lg hover:border-[#c9962a] transition group">
                <div className="font-semibold text-gray-900 group-hover:text-[#c9962a] mb-1">
                  🏠 Pisos en venta
                </div>
                <p className="text-sm text-gray-600">
                  Miles de propiedades sin comisión
                </p>
              </Link>

              <Link href="/publicar-anuncio" className="p-4 border rounded-lg hover:border-[#c9962a] transition group">
                <div className="font-semibold text-gray-900 group-hover:text-[#c9962a] mb-1">
                  📢 Publicar anuncio
                </div>
                <p className="text-sm text-gray-600">
                  Publica gratis tu propiedad
                </p>
              </Link>

              <Link href="/contacto" className="p-4 border rounded-lg hover:border-[#c9962a] transition group">
                <div className="font-semibold text-gray-900 group-hover:text-[#c9962a] mb-1">
                  💬 Contacto
                </div>
                <p className="text-sm text-gray-600">
                  Estamos aquí para ayudarte
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
