import fs from 'fs'

const prestamoPath = 'src/lib/prestamo-particulares-ciudad-data.ts'
let p = fs.readFileSync(prestamoPath, 'utf8')
const vStart = p.indexOf('  valladolid: {')
const idxP = p.search(/\r?\n}\r?\n\r?\nexport function buildPrestamoParticularesMetadata/)
if (vStart === -1 || idxP === -1) throw new Error('prestamo markers not found')
const vBlock = p.slice(vStart, idxP)

function prestamoClone(slug, name, region) {
  return vBlock
    .replaceAll('valladolid', slug)
    .replaceAll('Valladolid', name)
    .replaceAll('Castilla y León', region)
    .replaceAll('prestamo-particulares-valladolid', `prestamo-particulares-${slug}`)
}

const prestamoInserts = [
  ['alicante', 'Alicante', 'Comunitat Valenciana'],
  ['murcia', 'Murcia', 'Región de Murcia'],
  ['granada', 'Granada', 'Andalucía'],
  ['coruna', 'A Coruña', 'Galicia'],
  ['pamplona', 'Pamplona', 'Navarra'],
  ['salamanca', 'Salamanca', 'Castilla y León'],
]
  .filter(([slug]) => !p.includes(`  ${slug}: {`))
  .map(([s, n, r]) => prestamoClone(s, n, r))

if (prestamoInserts.length) {
  p = `${p.slice(0, idxP)},\n\n${prestamoInserts.join('\n\n')}${p.slice(idxP)}`
}

if (!p.includes("{ slug: 'alicante', nombre: 'Alicante' },")) {
  p = p.replace(
    "{ slug: 'valladolid', nombre: 'Valladolid' },",
    `{ slug: 'valladolid', nombre: 'Valladolid' },
  { slug: 'alicante', nombre: 'Alicante' },
  { slug: 'murcia', nombre: 'Murcia' },
  { slug: 'granada', nombre: 'Granada' },
  { slug: 'coruna', nombre: 'A Coruña' },
  { slug: 'pamplona', nombre: 'Pamplona' },
  { slug: 'salamanca', nombre: 'Salamanca' },`,
  )
}
fs.writeFileSync(prestamoPath, p)

const alqPath = 'src/lib/alquiler-local-comercial-ciudad-data.ts'
let a = fs.readFileSync(alqPath, 'utf8')
const aStart = a.indexOf('  alicante: {')
const idxA = a.search(/\r?\n}\r?\n\r?\nexport function buildAlquilerLocalComercialMetadata/)
if (aStart === -1 || idxA === -1) throw new Error('alquiler markers not found')
const aBlock = a.slice(aStart, idxA)

function alqClone(slug, name, region, renta) {
  return aBlock
    .replaceAll('alicante', slug)
    .replaceAll('Alicante', name)
    .replaceAll('Comunitat Valenciana · Costa Blanca', region)
    .replaceAll('alquiler-local-comercial-alicante', `alquiler-local-comercial-${slug}`)
    .replace(/rentaEjemploMensual: \d+/, `rentaEjemploMensual: ${renta}`)
}

const alqInserts = [
  ['murcia', 'Murcia', 'Región de Murcia', 750],
  ['granada', 'Granada', 'Andalucía', 820],
  ['coruna', 'A Coruña', 'Galicia', 900],
  ['pamplona', 'Pamplona', 'Navarra', 950],
  ['mallorca', 'Mallorca', 'Islas Baleares', 1100],
  ['salamanca', 'Salamanca', 'Castilla y León', 700],
]
  .filter(([slug]) => !a.includes(`  ${slug}: {`))
  .map(([s, n, r, rent]) => alqClone(s, n, r, rent))

if (alqInserts.length) {
  a = `${a.slice(0, idxA)},\n\n${alqInserts.join('\n\n')}${a.slice(idxA)}`
}

if (!a.includes("{ slug: 'murcia', nombre: 'Murcia' },")) {
  a = a.replace(
    "{ slug: 'alicante', nombre: 'Alicante' },",
    `{ slug: 'alicante', nombre: 'Alicante' },
  { slug: 'murcia', nombre: 'Murcia' },
  { slug: 'granada', nombre: 'Granada' },
  { slug: 'coruna', nombre: 'A Coruña' },
  { slug: 'pamplona', nombre: 'Pamplona' },
  { slug: 'mallorca', nombre: 'Mallorca' },
  { slug: 'salamanca', nombre: 'Salamanca' },`,
  )
}
fs.writeFileSync(alqPath, a)

console.log('data extended', { prestamo: prestamoInserts.length, alquiler: alqInserts.length })
