/**
 * Genera descripciones manuales para pisos de Wallapop sin IA
 */
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const sb = createClient(supabaseUrl, supabaseKey)

function generateDescription(listing: any): string {
  const { title, operation, price_eur, city, district, bedrooms, bathrooms, area_m2 } = listing
  
  const op = operation === 'rent' ? 'alquiler' : 'venta'
  const opText = operation === 'rent' ? 'alquilar' : 'comprar'
  const hab = bedrooms === 0 ? 'estudio' : bedrooms === 1 ? '1 habitación' : `${bedrooms} habitaciones`
  const baños = bathrooms ? `${bathrooms} ${bathrooms === 1 ? 'baño' : 'baños'}` : ''
  const m2 = area_m2 ? `${area_m2} m²` : ''
  const precioFormatted = operation === 'rent' 
    ? `${price_eur}€/mes` 
    : `${price_eur.toLocaleString('es-ES')}€`
  
  const ubicacion = [district, city].filter(Boolean).join(', ')

  // Generar descripción profesional
  let desc = `**${title}**\n\n`
  
  // Introducción atractiva
  if (operation === 'sale') {
    desc += `¿Buscas ${opText} tu próximo hogar en ${city}? Este magnífico piso en ${ubicacion} es una oportunidad única que no puedes dejar pasar. Con ${hab}${baños ? `, ${baños}` : ''}${m2 ? ` y ${m2} de superficie` : ''}, esta vivienda combina espacio, confort y una ubicación privilegiada.\n\n`
  } else {
    desc += `Descubre este espacioso piso en ${ubicacion}, ideal para quienes buscan un hogar acogedor con excelente ubicación. Disponible por solo ${precioFormatted}, esta propiedad ofrece ${hab}${baños ? `, ${baños}` : ''}${m2 ? ` y ${m2} de superficie` : ''}.\n\n`
  }

  // Características destacadas
  desc += `**Características principales:**\n\n`
  if (bedrooms) desc += `✨ **${bedrooms} ${bedrooms === 1 ? 'Habitación' : 'Habitaciones'}**: Espacios luminosos perfectos para descansar o trabajar desde casa.\n\n`
  if (bathrooms) desc += `🛁 **${bathrooms} ${bathrooms === 1 ? 'Baño completo' : 'Baños'}**: Equipados con acabados de calidad.\n\n`
  if (area_m2) desc += `📐 **${area_m2} m²**: Superficie óptima para aprovechar cada rincón.\n\n`
  
  // Ubicación
  desc += `📍 **Ubicación estratégica en ${ubicacion}**: Zona residencial con todos los servicios a tu alcance. Cerca de transporte público, supermercados, colegios, centros de salud y zonas verdes. Perfecto para familias y profesionales que valoran la comodidad y accesibilidad.\n\n`
  
  // Precio y ventajas
  if (operation === 'sale') {
    desc += `💰 **Precio competitivo**: ${precioFormatted}. Una inversión inteligente en una de las zonas más demandadas de ${city}. Sin comisiones ocultas, trato directo con el propietario.\n\n`
  } else {
    desc += `💰 **Alquiler sin comisiones**: ${precioFormatted} mensuales. Ahorra miles de euros en comisiones de agencia. Trato directo con el propietario para mayor transparencia y rapidez.\n\n`
  }
  
  // Call to action
  desc += `**¿Por qué elegir este piso?**\n\n`
  desc += `- ✅ Trato directo con propietario\n`
  desc += `- ✅ Sin comisiones de agencia\n`
  desc += `- ✅ Proceso rápido y transparente\n`
  desc += `- ✅ Zona con alta demanda y revalorización\n`
  desc += `- ✅ Listo para entrar a vivir\n\n`
  
  desc += `No dejes pasar esta oportunidad. Contacta ahora mismo y agenda tu visita. Este tipo de propiedades en ${ubicacion} no duran mucho en el mercado. ¡Da el paso hacia tu nuevo hogar!\n\n`
  
  desc += `📞 **Contacta directamente** a través de Inmonest y obtén respuesta en menos de 24 horas. Sin intermediarios, sin complicaciones.`

  return desc
}

async function main() {
  console.log('🤖 Generando descripciones manuales para Wallapop...\n')

  const { data: listings, error } = await sb
    .from('listings')
    .select('*')
    .eq('source_portal', 'wallapop')
    .or('ai_description.is.null,ai_description.eq.')

  if (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }

  if (!listings || listings.length === 0) {
    console.log('✅ Todos los pisos ya tienen descripción')
    return
  }

  console.log(`📋 ${listings.length} pisos a procesar\n`)

  let ok = 0
  let fail = 0

  for (const listing of listings) {
    process.stdout.write(`[${ok + fail + 1}/${listings.length}] ${listing.title.substring(0, 40)}... `)

    try {
      const description = generateDescription(listing)

      const { error: updateErr } = await sb
        .from('listings')
        .update({ ai_description: description })
        .eq('id', listing.id)

      if (updateErr) {
        console.log(`❌ ${updateErr.message}`)
        fail++
      } else {
        console.log('✅')
        ok++
      }
    } catch (err) {
      console.log(`❌ ${err}`)
      fail++
    }
  }

  console.log(`\n✨ Completado:`)
  console.log(`   ✅ Guardados: ${ok}`)
  console.log(`   ❌ Errores: ${fail}`)
}

main()
