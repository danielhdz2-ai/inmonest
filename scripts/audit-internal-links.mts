#!/usr/bin/env tsx
/**
 * AUDITORÍA DE ENLACES INTERNOS
 * 
 * Detecta enlaces rotos en todas las páginas antes de deploy
 * Evita 404s en producción
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, dirname, resolve } from 'path'

const WORKSPACE_ROOT = process.cwd()

// Páginas que SÍ existen (rutas dinámicas)
const DYNAMIC_ROUTES = [
  '/gestoria/solicitar/:servicio',  // Cualquier service_key válido
  '/gestoria/venta-completa-reserva-escritura/madrid',
  '/gestoria/venta-completa-reserva-escritura/barcelona',
  '/gestoria/madrid',
  '/gestoria/barcelona',
  '/gestoria/valencia',
  '/gestoria/sevilla',
  '/pisos/:id',
  '/mi-cuenta/anuncios/:id/editar',
  '/:ciudad/pisos',
  '/:ciudad/contrato-alquiler',
  '/:ciudad/contrato-arras',
  '/:ciudad/alquiler-particulares',
  '/:ciudad/vender-piso',
]

// Service keys válidos para /gestoria/solicitar/:servicio
const VALID_SERVICE_KEYS = [
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
  'compra-completa-reserva-escritura',
  'venta-completa-reserva-escritura',
  'revision-alquiler',
  'revision-arras',
  'revision-correccion',
  'revision-correccion-arras',
  'ayuda-propietarios',
  'contrato-ilegal',
  'asesoria-compra',
  'asesoria-compra-premium',
  'burofax-desistimiento',
  'pack-due-diligence-precompra',
  'contrato-compraventa',
]

interface LinkError {
  file: string
  line: number
  href: string
  context: string
  reason: string
}

const errors: LinkError[] = []

async function main() {
  console.log('🔍 AUDITORÍA DE ENLACES INTERNOS\n')

  // Buscar todos los archivos .tsx y .ts en src/app recursivamente
  const files: string[] = []
  
  function walkDir(dir: string) {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          walkDir(fullPath)
        }
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) && !entry.name.endsWith('.d.ts')) {
        files.push(fullPath.replace(WORKSPACE_ROOT + '\\', '').replace(/\\/g, '/'))
      }
    }
  }

  walkDir(join(WORKSPACE_ROOT, 'src', 'app'))

  console.log(`📁 Analizando ${files.length} archivos...\n`)

  for (const file of files) {
    const content = readFileSync(join(WORKSPACE_ROOT, file), 'utf-8')
    const lines = content.split('\n')

    lines.forEach((line, idx) => {
      // Buscar enlaces Next.js Link y <a href>
      const linkMatches = [
        ...line.matchAll(/href=["']([^"']+)["']/g),
        ...line.matchAll(/Link\s+href=["']([^"']+)["']/g),
      ]

      for (const match of linkMatches) {
        const href = match[1]

        // Ignorar enlaces externos, anclas, mailto, tel, etc.
        if (
          href.startsWith('http') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.startsWith('#') ||
          href.startsWith('javascript:') ||
          href === '/'
        ) {
          continue
        }

        // Validar si el enlace existe
        const isValid = validateLink(href)

        if (!isValid) {
          errors.push({
            file,
            line: idx + 1,
            href,
            context: line.trim().slice(0, 80),
            reason: getErrorReason(href),
          })
        }
      }
    })
  }

  // Mostrar resultados
  if (errors.length === 0) {
    console.log('✅ NO SE ENCONTRARON ENLACES ROTOS\n')
  } else {
    console.log(`❌ ${errors.length} ENLACES ROTOS DETECTADOS:\n`)
    
    errors.forEach((err, i) => {
      console.log(`${i + 1}. ${err.file}:${err.line}`)
      console.log(`   Enlace: ${err.href}`)
      console.log(`   Razón: ${err.reason}`)
      console.log(`   Contexto: ${err.context}`)
      console.log('')
    })

    process.exit(1)
  }
}

function validateLink(href: string): boolean {
  // Normalizar href (eliminar query params y hash)
  const cleanHref = href.split('?')[0].split('#')[0]

  // Verificar si es una ruta dinámica válida
  if (cleanHref.includes('/gestoria/solicitar/')) {
    const serviceKey = cleanHref.split('/gestoria/solicitar/')[1]
    return VALID_SERVICE_KEYS.includes(serviceKey)
  }

  // Verificar si existe físicamente en src/app
  const possiblePaths = [
    join(WORKSPACE_ROOT, 'src/app', cleanHref.slice(1), 'page.tsx'),
    join(WORKSPACE_ROOT, 'src/app', cleanHref.slice(1), 'page.ts'),
    join(WORKSPACE_ROOT, 'src/app', cleanHref.slice(1) + '.tsx'),
  ]

  return possiblePaths.some(p => existsSync(p))
}

function getErrorReason(href: string): string {
  if (href.includes('/gestoria/solicitar/')) {
    const key = href.split('/gestoria/solicitar/')[1]
    return `Service key '${key}' no existe en STRIPE_SERVICES`
  }

  if (href.match(/\/gestoria\/[a-z-]+\/(madrid|barcelona|valencia|sevilla)/)) {
    return 'Página por ciudad no existe (solo venta-completa tiene versiones por ciudad)'
  }

  return 'Página no encontrada en src/app'
}

main().catch(console.error)
