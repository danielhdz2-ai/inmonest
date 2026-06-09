import fs from 'fs'

const priceFiles666 = [
  'src/app/gestoria/asesoria-compra-piso/page.tsx',
  'src/app/gestoria/ciudades/page.tsx',
  'src/app/servicios/vender-piso-sin-inmobiliaria/page.tsx',
  'src/app/vender-piso-sin-agencia/page.tsx',
  'src/app/blog/servicio-completo-compra-vivienda/page.tsx',
  'src/app/gestoria/valencia/page.tsx',
  'src/app/vender-casa/page.tsx',
]

for (const file of priceFiles666) {
  if (!fs.existsSync(file)) continue
  let c = fs.readFileSync(file, 'utf8')
  const next = c.replace(/666/g, '687')
  if (next !== c) {
    fs.writeFileSync(file, next)
    console.log('PRICE 666→687', file)
  }
}

const revisionArras = 'src/app/gestoria/revision-contrato-arras/page.tsx'
if (fs.existsSync(revisionArras)) {
  let c = fs.readFileSync(revisionArras, 'utf8')
  const next = c.replace(/45€/g, '60€')
  if (next !== c) {
    fs.writeFileSync(revisionArras, next)
    console.log('PRICE 45→60', revisionArras)
  }
}

const landingFiles = [
  'src/app/gestoria/venta-completa-reserva-escritura/madrid/page.tsx',
  'src/app/gestoria/venta-completa-reserva-escritura/barcelona/page.tsx',
  'src/app/gestoria/venta-completa-reserva-escritura/valencia/page.tsx',
  'src/app/gestoria/venta-completa-reserva-escritura/sevilla/page.tsx',
  'src/app/gestoria/venta-completa-reserva-escritura/malaga/page.tsx',
  'src/app/gestoria/venta-completa-reserva-escritura/salamanca/page.tsx',
  'src/app/gestoria/venta-completa-reserva-escritura/valladolid/page.tsx',
  'src/app/gestoria/due-diligence-precompra/page.tsx',
  'src/app/gestoria/due-diligence-precompra/madrid/page.tsx',
  'src/app/gestoria/due-diligence-precompra/barcelona/page.tsx',
  'src/app/gestoria/revision-contrato-arras/page.tsx',
  'src/app/gestoria/revision-contrato-alquiler/page.tsx',
  'src/app/gestoria/contrato-ilegal/page.tsx',
  'src/app/gestoria/ayuda-propietarios/page.tsx',
  'src/app/gestoria/contrato-compraventa/page.tsx',
  'src/app/servicios/vender-piso-sin-inmobiliaria/page.tsx',
  'src/app/vender-piso-sin-agencia/page.tsx',
  'src/app/vender-casa/page.tsx',
]

const block = `
      <GestorContactBanner />
      <TestimoniosSection />
`

for (const file of landingFiles) {
  if (!fs.existsSync(file)) continue
  let c = fs.readFileSync(file, 'utf8')
  if (c.includes('TestimoniosSection')) {
    console.log('SKIP already', file)
    continue
  }

  if (!c.includes("import GestorContactBanner")) {
    c = c.replace(
      /(import Navbar[^\n]+\n)/,
      "$1import GestorContactBanner from '@/components/GestorContactBanner'\nimport TestimoniosSection from '@/components/TestimoniosSection'\n"
    )
  }

  const ctaMarkers = [
    '      {/* CTA Final */}',
    '      {/* CTA Madrid */}',
    '      {/* CTA Barcelona */}',
    '      {/* CTA Valencia */}',
    '      {/* CTA Sevilla */}',
    '      {/* CTA Final */}',
    '      {/* CTA Salamanca */}',
    '      {/* CTA Valladolid */}',
  ]

  let inserted = false
  for (const marker of ctaMarkers) {
    if (c.includes(marker) && !c.includes(marker + block)) {
      c = c.replace(marker, block + '\n' + marker)
      inserted = true
      break
    }
  }

  if (!inserted) {
    console.log('SKIP no CTA marker', file)
    continue
  }

  fs.writeFileSync(file, c)
  console.log('ADDED testimonials+banner', file)
}
