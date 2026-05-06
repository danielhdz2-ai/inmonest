import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Cómo Detectar un Contrato de Arras Fraudulento【Guía 2026】',
  description: 'Señales de alerta en contratos de arras: vendedor falso, documentos manipulados, precios sospechosos. Protege tu dinero antes de pagar señal.',
  alternates: {
    canonical: `${BASE_URL}/blog/detectar-contrato-arras-fraudulento`,
  },
  openGraph: {
    title: 'Cómo Detectar un Contrato de Arras Fraudulento【2026】',
    description: '9 señales de que tu contrato de arras puede ser un fraude. Protege tu dinero antes de pagar.',
    url: `${BASE_URL}/blog/detectar-contrato-arras-fraudulento`,
    type: 'article',
    publishedTime: '2026-05-06',
  },
}

export const revalidate = 86400

export default function DetectarArrasFraudulentoBlogPost() {
  return (
    <>
      <Navbar />
      <WhatsAppButton />
      
      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12">
          <div className="text-sm text-gray-500 mb-4">
            📅 Actualizado: 6 mayo 2026 · ⏱️ 10 min lectura
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cómo Detectar un Contrato de Arras Fraudulento (Antes de Perder tu Dinero)
          </h1>
          <p className="text-xl text-gray-600">
            9 señales de alerta que indican que tu contrato de arras puede ser un fraude. 
            Casos reales y cómo protegerte.
          </p>
        </header>

        <Image
          src="/blog/contrato-arras-fraudulento.jpg"
          alt="Persona examinando contrato con lupa detectando fraude"
          width={800}
          height={400}
          className="rounded-lg mb-12"
        />

        <div className="prose prose-lg max-w-none">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <p className="text-red-800 font-semibold mb-2">🚨 ALERTA:</p>
            <p className="text-red-700">
              En 2025 se denunciaron <strong>más de 2.400 estafas inmobiliarias</strong> en España. 
              El 67% involucraban contratos de arras falsos. <strong>No seas la próxima víctima.</strong>
            </p>
          </div>

          <h2>¿Qué es un contrato de arras fraudulento?</h2>
          <p>
            Un contrato de arras fraudulento es aquel en el que:
          </p>
          <ul>
            <li>El "vendedor" NO es el propietario real</li>
            <li>El inmueble tiene cargas ocultas que lo hacen imposible de vender</li>
            <li>Los documentos (nota simple, DNI, escrituras) son falsificados</li>
            <li>Es un okupa vendiendo un piso que no le pertenece</li>
            <li>El piso no existe o ya está vendido a otra persona</li>
          </ul>
          <p>
            En todos estos casos, <strong>pagas la señal y pierdes tu dinero</strong>. El estafador desaparece 
            y nunca podrás comprar el piso.
          </p>

          <h2>9 Señales de Alerta 🚩</h2>

          <h3>1. Te piden pagar en efectivo</h3>
          <p>
            <strong>Señal de alerta:</strong> "Trae 10.000€ en billetes para las arras. Así evitamos comisiones bancarias y todo es más rápido."
          </p>
          <p>
            <strong>Por qué es sospechoso:</strong> Las transferencias bancarias dejan rastro. Los estafadores prefieren efectivo 
            porque una vez lo cobran, es casi imposible recuperarlo.
          </p>
          <p className="bg-green-50 p-4 rounded-lg">
            ✅ <strong>Qué hacer:</strong> Paga SIEMPRE por transferencia bancaria. Si el vendedor se niega rotundamente, 
            huye. Es fraude casi seguro.
          </p>

          <h3>2. Presión extrema para firmar YA</h3>
          <p>
            <strong>Señal de alerta:</strong> "Hay 3 personas interesadas. Si no firmas hoy, se lo vendo a otro. 
            No hay tiempo para nota simple ni abogados."
          </p>
          <p>
            <strong>Por qué es sospechoso:</strong> Los estafadores necesitan que firmes rápido, antes de que descubras el fraude. 
            Un vendedor legítimo te da tiempo para verificar.
          </p>
          <p className="bg-green-50 p-4 rounded-lg">
            ✅ <strong>Qué hacer:</strong> NUNCA firmes bajo presión. Un buen piso puede esperar 2-3 días para que 
            pidas la nota simple y revises documentación.
          </p>

          <h3>3. No te dejan ver la nota simple registral</h3>
          <p>
            <strong>Señal de alerta:</strong> "La nota simple está en trámite" o "No hace falta, yo soy el propietario, confía en mí" 
            o "Te la doy después de las arras".
          </p>
          <p>
            <strong>Por qué es sospechoso:</strong> La nota simple se pide en 24h y cuesta 15€. Si no te la muestran, 
            probablemente ocultan algo: hipotecas, embargos, o que no son los propietarios.
          </p>
          <p className="bg-green-50 p-4 rounded-lg">
            ✅ <strong>Qué hacer:</strong> Exige ver la nota simple ANTES de firmar arras. Pídela tú mismo al Registro 
            o <Link href="/gestoria/nota-simple" className="text-green-700 underline">te la gestionamos en 24h (15€)</Link>.
          </p>

          <h3>4. Precio muy por debajo del mercado</h3>
          <p>
            <strong>Señal de alerta:</strong> Piso de 200.000€ en zona premium a 130.000€. "El propietario necesita dinero urgente 
            por divorcio/herencia/etc."
          </p>
          <p>
            <strong>Por qué es sospechoso:</strong> Las gangas inmobiliarias reales son rarísimas. Si algo es "demasiado bueno para ser verdad", 
            probablemente es mentira.
          </p>
          <p className="bg-green-50 p-4 rounded-lg">
            ✅ <strong>Qué hacer:</strong> Compara con precios de portales (Idealista, Fotocasa). Si está 30-40% por debajo, 
            <Link href="/gestoria/contrato-ilegal" className="text-green-700 underline">haz analizar el caso (29€)</Link>.
          </p>

          <h3>5. Documentos con errores evidentes</h3>
          <p>
            <strong>Señal de alerta:</strong> Contrato con faltas de ortografía graves, DNI borroso, nota simple en PDF con pixelado sospechoso.
          </p>
          <p>
            <strong>Por qué es sospechoso:</strong> Los documentos oficiales (nota simple, DNI) no tienen errores ni están pixelados. 
            Si ves algo raro, puede ser falsificación con Photoshop.
          </p>
          <p className="bg-green-50 p-4 rounded-lg">
            ✅ <strong>Qué hacer:</strong> Pide documentos originales físicos. Si solo te dan PDFs, verifica con el Registro 
            de la Propiedad que la nota simple es auténtica.
          </p>

          <h3>6. El vendedor no quiere ir a notario</h3>
          <p>
            <strong>Señal de alerta:</strong> "No hace falta notario, el contrato privado de arras es suficiente. Firmaremos escritura después."
          </p>
          <p>
            <strong>Por qué es sospechoso:</strong> El estafador sabe que en notaría verificarán su identidad y la propiedad del inmueble. 
            Prefiere un "contrato privado" que después no vale nada.
          </p>
          <p className="bg-green-50 p-4 rounded-lg">
            ✅ <strong>Qué hacer:</strong> Las arras pueden ser privadas (es legal), pero exige que el vendedor se comprometa 
            a ir a notaría en fecha concreta. Si se niega, sospecha.
          </p>

          <h3>7. Vendedor no coincide con datos registrales</h3>
          <p>
            <strong>Señal de alerta:</strong> La nota simple dice "Propietario: Juan García Pérez". El vendedor es "Antonio Martínez López" 
            y dice "soy el hermano/apoderado/heredero".
          </p>
          <p>
            <strong>Por qué es sospechoso:</strong> Si alguien vende en nombre de otro, debe tener <strong>poder notarial verificable</strong>. 
            Si no lo muestra, puede ser un impostor.
          </p>
          <p className="bg-green-50 p-4 rounded-lg">
            ✅ <strong>Qué hacer:</strong> Si el vendedor no es el propietario registral, exige poder notarial ANTES de firmar. 
            Verifica el poder en notaría.
          </p>

          <h3>8. Te piden dinero antes de ver el piso</h3>
          <p>
            <strong>Señal de alerta:</strong> "Envíame 500€ por Bizum para reservarlo y te paso las llaves para verlo."
          </p>
          <p>
            <strong>Por qué es sospechoso:</strong> Nadie paga sin ver el piso. Es una estafa conocida: cobran "reservas" a 20 personas 
            para el mismo piso y desaparecen.
          </p>
          <p className="bg-green-50 p-4 rounded-lg">
            ✅ <strong>Qué hacer:</strong> NUNCA pagues sin haber visitado físicamente el inmueble. Punto.
          </p>

          <h3>9. Datos de contacto sospechosos</h3>
          <p>
            <strong>Señal de alerta:</strong> Solo móvil extranjero (+44, +33, +212), email genérico (@gmail.com sin empresa), 
            se niega a darte dirección física o datos de contacto completos.
          </p>
          <p>
            <strong>Por qué es sospechoso:</strong> Vendedores legítimos dan todos sus datos sin problema. Los estafadores usan 
            números temporales y emails anónimos para desaparecer fácilmente.
          </p>
          <p className="bg-green-50 p-4 rounded-lg">
            ✅ <strong>Qué hacer:</strong> Exige datos completos: nombre completo, DNI, dirección, teléfono fijo si es agencia. 
            Verifica que la agencia existe en Google Maps.
          </p>

          <h2>Caso real: Okupa vendiendo piso ajeno</h2>
          <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300 my-8">
            <p className="font-bold text-lg mb-3">📖 Caso real (Barcelona, marzo 2026):</p>
            <p className="mb-3">
              <strong>Situación:</strong> Cliente encontró piso de 180.000€ en Eixample. Precio: 120.000€. 
              "Vendo por divorcio urgente". Le pidieron 15.000€ de arras en efectivo "para agilizar".
            </p>
            <p className="mb-3">
              <strong>Lo que detectamos:</strong> Pedimos nota simple oficial. El "vendedor" había falsificado el DNI 
              y la nota simple. Era un okupa que llevaba 8 meses en el piso. El propietario real vivía en Londres 
              y ni sabía que lo estaban "vendiendo".
            </p>
            <p className="text-green-700 font-bold">
              ✅ <strong>Resultado:</strong> Cliente no pagó nada. Denunciamos a Policía. Okupa fue detenido por estafa 
              y usurpación. Cliente evitó perder 15.000€.
            </p>
          </div>

          <h2>Cómo protegerte ANTES de firmar arras</h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Pide nota simple oficial (15€, 24h):</strong> No te fíes de PDFs que te envíe el vendedor. 
              <Link href="/gestoria/nota-simple" className="text-blue-600 underline ml-1">Pídela tú mismo aquí</Link>.
            </li>
            <li>
              <strong>Verifica identidad del vendedor:</strong> Compara DNI físico con nota simple. Deben coincidir nombre y apellidos exactos.
            </li>
            <li>
              <strong>Revisa el contrato ANTES de firmar:</strong> 
              <Link href="/gestoria/revision-contrato-arras" className="text-blue-600 underline ml-1">
                Un abogado lo revisa en 24h por 45€
              </Link>. Mucho más barato que perder 10.000€.
            </li>
            <li>
              <strong>Paga siempre por transferencia bancaria:</strong> Nunca en efectivo. La transferencia deja rastro 
              y permite denuncia si es fraude.
            </li>
            <li>
              <strong>Visita el piso físicamente:</strong> Habla con vecinos. Pregunta cuánto tiempo lleva viviendo el "vendedor". 
              A veces descubres que es un inquilino o okupa.
            </li>
            <li>
              <strong>Si tienes 2+ señales de alerta:</strong> 
              <Link href="/gestoria/contrato-ilegal" className="text-blue-600 underline ml-1">
                Haz analizar el caso por un abogado (29€)
              </Link>. Vale la pena.
            </li>
          </ol>

          <h2>¿Qué hacer si ya pagaste arras y sospechas fraude?</h2>
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 my-8">
            <h3 className="font-bold text-lg mb-4">Actúa RÁPIDO:</h3>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Denuncia inmediatamente:</strong> Ve a Policía Nacional o Guardia Civil. Lleva contrato, 
                transferencia, emails, todo lo que tengas.
              </li>
              <li>
                <strong>Congela el pago si aún no lo cobraron:</strong> Si pagaste por transferencia hace menos de 24-48h, 
                contacta tu banco URGENTE para intentar bloquear.
              </li>
              <li>
                <strong>Contacta al propietario real:</strong> Si sabes quién es (por nota simple), avísale de que 
                alguien está vendiendo su piso. Te lo agradecerá y puede ayudarte en la denuncia.
              </li>
              <li>
                <strong>Consulta con abogado especializado:</strong> 
                <Link href="/gestoria/contrato-ilegal" className="text-red-700 underline ml-1">
                  Analizamos tu caso y te guiamos en la recuperación (29€)
                </Link>.
              </li>
            </ol>
          </div>

          <h2>Conclusión: Mejor prevenir que llorar</h2>
          <p>
            <strong>Firmar arras sin verificar es como darle tu dinero a un desconocido y esperar que te lo devuelva.</strong> 
            No lo harías con 10.000€ en la calle, no lo hagas con un piso.
          </p>
          <p>
            Por 45€ puedes hacer revisar tu contrato y evitar perder 10.000€, 20.000€ o más. 
            <strong>Vale la pena.</strong>
          </p>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-2 border-red-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">¿Sospechas que tu contrato puede ser fraudulento?</h3>
          <p className="text-gray-700 mb-6">
            Un abogado especializado lo analiza en 24 horas. Detectamos fraudes, documentos falsos y estafas inmobiliarias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/gestoria/contrato-ilegal"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition text-center"
            >
              Analizar mi caso (29€)
            </Link>
            <Link
              href="/gestoria/revision-contrato-arras"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
            >
              Revisar contrato de arras (45€)
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
