#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const ROOT = path.join(process.cwd(), 'src')

const REPLACEMENTS = [
  ['💬 WhatsApp directo', 'WhatsApp directo'],
  ['💬 Preguntar por WhatsApp', 'Preguntar por WhatsApp'],
  ['💬 Consulta gratuita (WhatsApp)', 'Consulta gratuita (WhatsApp)'],
  ['💬 Contactar para pack agencias', 'Contactar para pack agencias'],
  ['💬 Asesoramiento gratuito (WhatsApp)', 'Asesoramiento gratuito (WhatsApp)'],
  ['💬 ', ''],
  ['📞 Llamar', 'Llamar'],
  ['📞 Habla con un asesor experto ahora', 'Habla con un asesor experto ahora'],
  ['📞 ', ''],
  ['🏠 Ver pisos', 'Ver pisos'],
  ['🏠 Todos los pisos', 'Todos los pisos'],
  ['🏠 Financiación', 'Financiación'],
  ['🏠 Para propietarios particulares', 'Para propietarios particulares'],
  ['🏠 Gestoría inmobiliaria para particulares', 'Gestoría inmobiliaria para particulares'],
  ['🏠 Barcelona • Particulares • Sin Comisión', 'Barcelona · Particulares · Sin Comisión'],
  ['🏠 Buscar agencias →', 'Buscar agencias →'],
  ['Hecho con ❤ en España', 'Hecho en España'],
  ['from-green-600', 'from-gold-600'],
  ['via-green-500', 'via-gold-500'],
  ['to-green-600', 'to-gold-600'],
  ['bg-green-600', 'bg-gold-600'],
  ['hover:bg-green-700', 'hover:bg-gold-700'],
  ['bg-green-500', 'bg-gold-500'],
  ['hover:bg-green-600', 'hover:bg-gold-600'],
  ['from-[#c9962a]', 'from-gold-500'],
  ['to-[#a87a20]', 'to-gold-700'],
  ['to-[#2e1900]', 'to-forest-950'],
  ['via-[#c9962a]', 'via-gold-500'],
]

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, files)
    else if (/\.(tsx|ts)$/.test(ent.name)) files.push(p)
  }
  return files
}

let changed = 0
for (const file of walk(ROOT)) {
  let content = fs.readFileSync(file, 'utf8')
  const orig = content
  for (const [from, to] of REPLACEMENTS) content = content.split(from).join(to)
  if (content !== orig) {
    fs.writeFileSync(file, content)
    changed++
  }
}
console.log(`Updated ${changed} files (emoji/green cleanup)`)
