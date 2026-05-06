import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: '10 Cláusulas Abusivas en Contratos de Alquiler que Debes Evitar【2026】',
  description: 'Cláusulas ilegales más comunes en contratos de alquiler: fianzas excesivas, prohibición mascotas, gastos al inquilino. Guía actualizada Ley Vivienda 2026.',
  alternates: {
    canonical: `${BASE_URL}/blog/clausulas-abusivas-contrato-alquiler`,
  },
  openGraph: {
    title: '10 Cláusulas Abusivas en Contratos de Alquiler【2026】',
    description: 'Detecta cláusulas ilegales en tu contrato de alquiler. Guía actualizada a la Ley de Vivienda 2026.',
    url: `${BASE_URL}/blog/clausulas-abusivas-contrato-alquiler`,
    type: 'article',
    publishedTime: '2026-05-06',
  },
}

export const revalidate = 86400

export default function ClausulasAbusivasAlquilerBlogPost() {
  return (
    <>
      <Navbar />
      <WhatsAppButton />
      
      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12">
          <div className="text-sm text-gray-500 mb-4">
            📅 Actualizado: 6 mayo 2026 · ⏱️ 8 min lectura
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            10 Cláusulas Abusivas en Contratos de Alquiler que Debes Evitar en 2026
          </h1>
          <p className="text-xl text-gray-600">
            La Ley de Vivienda 2026 prohíbe cláusulas que antes eran comunes. Descubre cuáles son ilegales 
            y cómo protegerte como inquilino.
          </p>
        </header>

        <Image
          src="/blog/clausulas-abusivas-alquiler.jpg"
          alt="Persona revisando contrato de alquiler con lupa"
          width={800}
          height={400}
          className="rounded-lg mb-12"
        />

        <div className="prose prose-lg max-w-none">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <p className="text-yellow-800 font-semibold mb-2">⚠️ Dato importante:</p>
            <p className="text-yellow-700">
              Aunque firmes cláusulas abusivas, son <strong>nulas de pleno derecho</strong>. 
              No tienen validez legal aunque aparezcan en el contrato. Pero es mejor eliminarlas antes de firmar.
            </p>
          </div>

          <h2>1. Fianza superior a 2 meses 🚫</h2>
          <p>
            <strong>Qué dice:</strong> "El inquilino pagará 3 meses de fianza + 1 mes de garantía adicional = 4 meses"
          </p>
          <p>
            <strong>Por qué es ilegal:</strong> La Ley de Vivienda 2026 establece un <strong>máximo de 2 meses de fianza</strong> para alquileres LAU. 
            Antes era 1 mes, pero se amplió para dar más seguridad a propietarios. Sin embargo, <strong>jamás pueden pedir más de 2 meses</strong>.
          </p>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            ✅ <strong>Qué hacer:</strong> Exige eliminar la cláusula. Si el casero insiste, es señal de alerta. 
            <Link href="/gestoria/revision-contrato-alquiler" className="text-green-700 underline">Haz revisar tu contrato por un abogado (desde 39€)</Link>.
          </p>

          <h2>2. Prohibición total de mascotas 🐕</h2>
          <p>
            <strong>Qué dice:</strong> "Queda terminantemente prohibida la tenencia de animales de cualquier tipo"
          </p>
          <p>
            <strong>Por qué es abusiva:</strong> La jurisprudencia reciente establece que <strong>no se puede prohibir mascotas de forma genérica</strong>, 
            salvo que los estatutos de la comunidad lo prohíban expresamente o existan razones sanitarias justificadas.
          </p>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            ✅ <strong>Qué hacer:</strong> Pide al propietario los estatutos de la comunidad. Si no prohíben mascotas, 
            la cláusula es nula. Negocia cambiarla por "mascotas previo consentimiento propietario" o eliminarla.
          </p>

          <h2>3. Gastos de gestoría a cargo del inquilino 💰</h2>
          <p>
            <strong>Qué dice:</strong> "Los honorarios de la agencia inmobiliaria (700€) serán abonados por el inquilino"
          </p>
          <p>
            <strong>Por qué es abusiva:</strong> El Tribunal Supremo ha declarado que <strong>las comisiones de agencias son abusivas si las paga el inquilino</strong>. 
            Debe pagarlas quien contrata el servicio: el propietario.
          </p>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            ✅ <strong>Qué hacer:</strong> Niégate a pagar comisiones de gestoría. Es jurisprudencia firme. 
            Si la agencia insiste, <Link href="/gestoria/contrato-ilegal" className="text-green-700 underline">consulta si el contrato es ilegal (29€)</Link>.
          </p>

          <h2>4. Subidas de renta arbitrarias 📈</h2>
          <p>
            <strong>Qué dice:</strong> "La renta se incrementará un 6% anual independientemente del IPC"
          </p>
          <p>
            <strong>Por qué es ilegal:</strong> La actualización de renta debe estar <strong>vinculada al IPC</strong> y con límites establecidos por ley. 
            No pueden poner subidas arbitrarias del 5%, 10% o cualquier cifra.
          </p>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            ✅ <strong>Qué hacer:</strong> Exige que la cláusula diga: "La renta se actualizará según IPC anual, 
            con el límite establecido por la legislación vigente".
          </p>

          <h2>5. Renuncia a prórrogas legales 📅</h2>
          <p>
            <strong>Qué dice:</strong> "El inquilino renuncia expresamente a los 5 años de prórroga obligatoria establecidos por ley"
          </p>
          <p>
            <strong>Por qué es nula:</strong> Las prórrogas de la LAU son <strong>derecho imperativo</strong>. 
            No puedes renunciar a ellas aunque quieras. La cláusula es nula de pleno derecho.
          </p>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            ✅ <strong>Qué hacer:</strong> Aunque la firmes, es nula. Pero elimínala para evitar conflictos futuros.
          </p>

          <h2>6. Penalizaciones excesivas por rescisión 💸</h2>
          <p>
            <strong>Qué dice:</strong> "Si el inquilino desiste antes de 3 años, deberá pagar 3 meses de indemnización"
          </p>
          <p>
            <strong>Por qué es abusiva:</strong> La LAU establece penalizaciones máximas muy claras:
          </p>
          <ul className="list-disc pl-6">
            <li>Antes de 6 meses: lo que reste hasta 6 meses</li>
            <li>Después de 6 meses: 1 mes de renta</li>
            <li>Después de 1 año: nada</li>
          </ul>
          <p>Cualquier penalización mayor es <strong>abusiva y desproporcionada</strong>.</p>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            ✅ <strong>Qué hacer:</strong> Exige que la cláusula se ajuste a lo establecido en la LAU.
          </p>

          <h2>7. Reparaciones a cargo del inquilino (todas) 🔧</h2>
          <p>
            <strong>Qué dice:</strong> "Cualquier reparación, incluyendo averías estructurales, será abonada por el inquilino"
          </p>
          <p>
            <strong>Por qué es ilegal:</strong> El propietario debe hacerse cargo de:
          </p>
          <ul className="list-disc pl-6">
            <li>Reparaciones estructurales (tejado, fachada, instalaciones)</li>
            <li>Electrodomésticos que venían con el piso</li>
            <li>Averías no causadas por mal uso del inquilino</li>
          </ul>
          <p>Solo las <strong>pequeñas reparaciones de uso diario</strong> son del inquilino (bombillas, limpieza, etc.).</p>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            ✅ <strong>Qué hacer:</strong> Exige cláusula que especifique claramente qué reparaciones corresponden a cada parte.
          </p>

          <h2>8. Retención automática de fianza sin justificar 🏦</h2>
          <p>
            <strong>Qué dice:</strong> "Al finalizar el contrato, se retendrá 1 mes de fianza por limpieza y posibles desperfectos"
          </p>
          <p>
            <strong>Por qué es abusiva:</strong> La fianza solo puede retenerse si hay <strong>desperfectos justificados y probados</strong>. 
            No pueden retenerla "por si acaso" o de forma automática.
          </p>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            ✅ <strong>Qué hacer:</strong> Haz inventario detallado con fotos al entrar. La fianza se devuelve completa 
            salvo desperfectos probados que superen el desgaste normal.
          </p>

          <h2>9. Obligación de contratar seguros específicos 📋</h2>
          <p>
            <strong>Qué dice:</strong> "El inquilino deberá contratar seguro de hogar con la compañía X que indique el propietario"
          </p>
          <p>
            <strong>Por qué es abusiva:</strong> Pueden exigirte tener seguro de hogar (es razonable), pero <strong>no pueden obligarte a contratarlo con una compañía específica</strong>. 
            Eso es vinculación comercial abusiva.
          </p>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            ✅ <strong>Qué hacer:</strong> Acepta tener seguro, pero con la compañía que tú elijas. 
            Proporciona póliza al propietario para demostrar que estás asegurado.
          </p>

          <h2>10. Cláusulas de "todo riesgo" para el propietario ⚖️</h2>
          <p>
            <strong>Qué dice:</strong> "El inquilino se hace responsable de cualquier incidencia, daño, robo o problema que ocurra en la vivienda, 
            incluso si no es causante directo"
          </p>
          <p>
            <strong>Por qué es abusiva:</strong> Esta cláusula intenta trasladar <strong>todo el riesgo al inquilino</strong>, incluso cosas que no controla 
            (robos, inundaciones de vecinos, desperfectos estructurales, etc.).
          </p>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            ✅ <strong>Qué hacer:</strong> Eliminar por completo. El inquilino solo responde de daños causados por 
            mal uso o negligencia demostrada.
          </p>

          <h2>¿Qué hacer si tu contrato tiene cláusulas abusivas?</h2>
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 my-8">
            <h3 className="font-bold text-lg mb-4">Tienes 3 opciones:</h3>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Antes de firmar:</strong> Negocia con el propietario para eliminar las cláusulas abusivas. 
                <Link href="/gestoria/revision-contrato-alquiler" className="text-blue-700 underline ml-1">
                  Haz revisar el contrato por un abogado (39€)
                </Link> para tener argumentos legales sólidos.
              </li>
              <li>
                <strong>Ya firmaste pero no has entrado:</strong> Algunas cláusulas nulas te permiten anular el contrato completo. 
                Consulta con abogado si puedes salir sin penalización.
              </li>
              <li>
                <strong>Ya vives en el piso:</strong> Las cláusulas nulas no tienen efecto aunque las hayas firmado. 
                Si el casero intenta aplicarlas, reclámalas legalmente.
              </li>
            </ol>
          </div>

          <h2>Conclusión</h2>
          <p>
            <strong>No firmes contratos de alquiler sin leer y entender cada cláusula.</strong> Muchas veces, 
            propietarios y agencias incluyen condiciones ilegales esperando que el inquilino no las detecte.
          </p>
          <p>
            La Ley de Vivienda 2026 protege mucho más a los inquilinos que antes. Si tienes dudas sobre tu contrato:
          </p>
          <ul className="list-disc pl-6">
            <li><Link href="/gestoria/revision-contrato-alquiler" className="text-blue-600 underline">Revisión de contrato de alquiler (39€)</Link> - Detectamos cláusulas ilegales en 24h</li>
            <li><Link href="/gestoria/contrato-ilegal" className="text-blue-600 underline">¿Tu contrato es completamente ilegal? (29€)</Link> - Análisis forense completo</li>
            <li><Link href="/gestoria/ayuda-propietarios" className="text-blue-600 underline">Contratos legales para propietarios (73€)</Link> - Si eres casero y quieres hacerlo bien</li>
          </ul>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">¿Necesitas ayuda con tu contrato de alquiler?</h3>
          <p className="text-gray-700 mb-6">
            Un abogado especializado lo revisa en 24 horas. Detectamos cláusulas abusivas, errores y te protegemos legalmente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/gestoria/revision-contrato-alquiler"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-center"
            >
              Revisar mi contrato (39€)
            </Link>
            <a
              href="https://wa.me/34624177966?text=Hola,%20tengo%20dudas%20sobre%20mi%20contrato%20de%20alquiler"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
            >
              💬 Consulta gratuita (WhatsApp)
            </a>
          </div>
        </div>
      </article>
    </>
  )
}
