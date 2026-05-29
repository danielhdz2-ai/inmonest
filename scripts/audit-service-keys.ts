/**
 * AUDITORÍA CRÍTICA: Service Keys usados vs disponibles en Stripe
 * 
 * Detecta landing pages que promocionan un servicio
 * pero redirigen a un checkout con service_key diferente
 */

// Service keys REALES disponibles en Stripe (de checkout/route.ts)
const STRIPE_SERVICES_KEYS = [
  'arras-penitenciales',
  'arras-confirmatorias',
  'reserva-compra',
  'alquiler-vivienda-lau',
  'contrato-alquiler',
  'alquiler-temporada',
  'contrato-alquiler-temporal',
  'alquiler-habitacion',
  'reserva-alquiler',
  'rescision-alquiler',
  'liquidacion-fianza',
  'alquiler-habitaciones',
  'alquiler-local-comercial',
  'alquiler-garaje-trastero',
  'alquiler-opcion-compra',
  'prestamo-particulares',
  'pack-revision-reserva-alquiler',
  'arras-parking-garage',
  'acompanamiento-reserva-arras',
  'compra-completa-reserva-escritura',  // ← 666€ Servicio completo
  'revision-alquiler',
  'revision-arras',
  'revision-correccion',
  'revision-correccion-arras',
  'ayuda-propietarios',
  'contrato-ilegal',
  'asesoria-compra',  // ← 95€ Asesoría básica
  'pack-due-diligence-precompra',
  'contrato-compraventa',
]

// Service keys USADOS en landing pages (extraídos del grep)
const USED_IN_LANDINGS = [
  // ❌ ERRORES DETECTADOS
  { file: 'asesoria-compra-piso/page.tsx', line: 448, key: 'compra-completa-reserva-escritura', context: 'Botón "Contratar asesoría premium" (195€) apunta a servicio de 666€' },
  { file: 'burofax-desistimiento-alquiler/page.tsx', line: 74, key: 'burofax-desistimiento', context: '❌ NO EXISTE en Stripe' },
  { file: 'burofax-desistimiento-alquiler/page.tsx', line: 258, key: 'burofax-desistimiento', context: '❌ NO EXISTE en Stripe' },
  { file: 'venta-completa-reserva-escritura/page.tsx', line: 138, key: 'venta-completa-reserva-escritura', context: '❌ NO EXISTE (debería ser compra-completa...)' },
  { file: 'venta-completa-reserva-escritura/madrid/page.tsx', line: 111, key: 'venta-completa-reserva-escritura', context: '❌ NO EXISTE' },
  { file: 'venta-completa-reserva-escritura/barcelona/page.tsx', line: 111, key: 'venta-completa-reserva-escritura', context: '❌ NO EXISTE' },
  
  // ✅ CORRECTOS (muestra)
  { file: 'asesoria-compra-piso/page.tsx', line: 402, key: 'asesoria-compra', context: '✅ Correcto - 95€' },
  { file: 'revision-contrato-arras/page.tsx', line: 125, key: 'revision-arras', context: '✅ Correcto' },
  { file: 'due-diligence-precompra/page.tsx', line: 74, key: 'pack-due-diligence-precompra', context: '✅ Correcto' },
]

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('🚨 AUDITORÍA CRÍTICA: SERVICE KEYS INCORRECTOS')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

const errors = USED_IN_LANDINGS.filter(u => !STRIPE_SERVICES_KEYS.includes(u.key))

if (errors.length > 0) {
  console.log(`❌ ${errors.length} ERRORES DETECTADOS:\n`)
  errors.forEach((e, i) => {
    console.log(`${i + 1}. ${e.file}:${e.line}`)
    console.log(`   Service key: "${e.key}"`)
    console.log(`   Problema: ${e.context}`)
    console.log('')
  })
} else {
  console.log('✅ No se encontraron errores\n')
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('CORRECCIONES NECESARIAS:')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

console.log('1. CREAR servicio "asesoria-compra-premium" (195€) en checkout/route.ts')
console.log('2. CREAR servicio "burofax-desistimiento" en checkout/route.ts')
console.log('3. CORREGIR "venta-completa..." → "compra-completa-reserva-escritura"')
console.log('4. ACTUALIZAR botón en asesoria-compra-piso/page.tsx línea 448\n')

export {}
