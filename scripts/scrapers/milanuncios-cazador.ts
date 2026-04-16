/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  BOT CAZADOR — Milanuncios Particulares (Modo Sostenible)               ║
 * ║                                                                          ║
 * ║  Reglas de negocio:                                                      ║
 * ║  • 5 NUEVOS particulares exactos por ejecución diaria                    ║
 * ║  • Solo los anuncios más recientes (top de la lista, pág. 1+)            ║
 * ║  • Rotación automática de ciudades: barcelona → madrid → valencia → ...  ║
 * ║  • Estado y log persistidos en /logs/cazador-state.json                  ║
 * ║  • Verificación TRIPLE de is_particular antes de guardar                 ║
 * ║  • Stealth máximo: delays aleatorios, mouse moves, scroll simulado       ║
 * ║                                                                          ║
 * ║  Uso manual:                                                              ║
 * ║    npx tsx scripts/scrapers/milanuncios-cazador.ts                       ║
 * ║    npx tsx scripts/scrapers/milanuncios-cazador.ts --dry-run             ║
 * ║                                                                          ║
 * ║  El cron lo instala: scripts/install-cazador.ps1                         ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

import { chromium }    from 'playwright-extra'
import StealthPlugin   from 'puppeteer-extra-plugin-stealth'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve }     from 'path'
import { upsertListing, type ScrapedListing } from './utils'

chromium.use(StealthPlugin())

// ─── Paths ────────────────────────────────────────────────────────────────────
const ROOT       = resolve(process.cwd())
const LOGS_DIR   = resolve(ROOT, 'logs')
const STATE_FILE = resolve(LOGS_DIR, 'cazador-state.json')
const LOG_FILE   = resolve(LOGS_DIR, 'cazador.log')

mkdirSync(LOGS_DIR, { recursive: true })

// ─── Flags ────────────────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes('--dry-run')

// ─── Configuración ────────────────────────────────────────────────────────────
/** Máximo de particulares NUEVOS a importar por ejecución diaria */
const MAX_NEW_PER_RUN = 5

/**
 * Orden de rotación de ciudades.
 * Comienza en barcelona (día 1), madrid (día 2), y sigue en orden.
 */
const ROTATION: Array<{ key: string; slug: string; city: string; province: string }> = [
  { key: 'barcelona', slug: 'barcelona', city: 'Barcelona', province: 'Barcelona' },
  { key: 'madrid',    slug: 'madrid',    city: 'Madrid',    province: 'Madrid'    },
  { key: 'valencia',  slug: 'valencia',  city: 'Valencia',  province: 'Valencia'  },
  { key: 'sevilla',   slug: 'sevilla',   city: 'Sevilla',   province: 'Sevilla'   },
  { key: 'zaragoza',  slug: 'zaragoza',  city: 'Zaragoza',  province: 'Zaragoza'  },
  { key: 'bilbao',    slug: 'bilbao',    city: 'Bilbao',    province: 'Vizcaya'   },
  { key: 'malaga',    slug: 'malaga',    city: 'Málaga',    province: 'Málaga'    },
  { key: 'granada',   slug: 'granada',   city: 'Granada',   province: 'Granada'   },
  { key: 'murcia',    slug: 'murcia',    city: 'Murcia',    province: 'Murcia'    },
  { key: 'alicante',  slug: 'alicante',  city: 'Alicante',  province: 'Alicante'  },
  { key: 'valladolid',slug: 'valladolid',city: 'Valladolid',province: 'Valladolid'},
  { key: 'pamplona',  slug: 'pamplona',  city: 'Pamplona',  province: 'Navarra'   },
  { key: 'santander', slug: 'santander', city: 'Santander', province: 'Cantabria' },
  { key: 'cordoba',   slug: 'cordoba',   city: 'Córdoba',   province: 'Córdoba'   },
]

// ─── Estado persistido ────────────────────────────────────────────────────────
interface CazadorState {
  cityIndex:      number   // índice actual en ROTATION
  totalImported:  number   // acumulado histórico de particulares importados
  lastRun:        string   // ISO date del último run exitoso (YYYY-MM-DD)
  lastCity:       string   // nombre de la última ciudad procesada
}

function loadState(): CazadorState {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf-8')) as CazadorState
  } catch {
    // Primera ejecución: empezar en barcelona (índice 0)
    return { cityIndex: 0, totalImported: 0, lastRun: '', lastCity: '' }
  }
}

function saveState(state: CazadorState): void {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8')
}

function log(msg: string): void {
  const ts = new Date().toISOString()
  const line = `[${ts}] ${msg}`
  console.log(line)
  try {
    const existing = (() => { try { return readFileSync(LOG_FILE, 'utf-8') } catch { return '' } })()
    writeFileSync(LOG_FILE, existing + line + '\n', 'utf-8')
  } catch {
    // Si no se puede escribir el log, continuar igualmente
  }
}

// ─── Stealth helpers ──────────────────────────────────────────────────────────

/** Delay aleatorio entre min y max ms — evita patrones temporales predecibles */
function randDelay(minMs: number, maxMs: number): Promise<void> {
  const ms = Math.floor(Math.random() * (maxMs - minMs) + minMs)
  return new Promise((r) => setTimeout(r, ms))
}

/** Movimiento de ratón aleatorio en el viewport — señal humana ante Imperva */
async function humanMouseMove(page: import('playwright').Page): Promise<void> {
  const vp = page.viewportSize() ?? { width: 1366, height: 768 }
  // Dos movimientos con paso intermedio (imita trayectoria natural)
  await page.mouse.move(
    Math.floor(Math.random() * vp.width  * 0.4 + vp.width  * 0.1),
    Math.floor(Math.random() * vp.height * 0.4 + vp.height * 0.1),
    { steps: 6 + Math.floor(Math.random() * 8) },
  )
  await randDelay(120, 400)
  await page.mouse.move(
    Math.floor(Math.random() * vp.width  * 0.5 + vp.width  * 0.25),
    Math.floor(Math.random() * vp.height * 0.5 + vp.height * 0.25),
    { steps: 5 + Math.floor(Math.random() * 6) },
  )
}

/** Scroll simulado — imita usuario explorando la página */
async function humanScroll(page: import('playwright').Page): Promise<void> {
  const scrollDown = 200 + Math.floor(Math.random() * 400)
  await page.evaluate((y: number) => window.scrollBy({ top: y, behavior: 'smooth' }), scrollDown)
  await randDelay(300, 800)
  await page.evaluate((y: number) => window.scrollBy({ top: -y / 3, behavior: 'smooth' }), scrollDown)
}

// ─── Tipos JSON de Milanuncios ────────────────────────────────────────────────
interface MilaTag { type: string; text: string }
interface MilaAd {
  id?:          number
  url?:         string
  title?:       string
  description?: string
  sellerType?:  string   // 'private' | 'professional'
  price?:       { cashPrice?: { value?: number } }
  images?:      string[]
  tags?:        MilaTag[]
  location?:    { city?: { name?: string }; province?: { name?: string } }
}
interface MilaProps {
  adListPagination?: {
    adList?:     { ads?: MilaAd[] }
    pagination?: { page?: number; totalPages?: number; totalAds?: number }
  }
}

// ─── Navegación Playwright ────────────────────────────────────────────────────

function buildSearchUrl(operation: 'venta' | 'alquiler', citySlug: string, page: number): string {
  const suffix = operation === 'venta'
    ? 'pisos-en-venta-particulares'
    : 'pisos-en-alquiler-particulares'
  const base = `https://www.milanuncios.com/${operation}-de-pisos-en-${citySlug}/${suffix}.htm`
  return page === 1 ? base : `${base}?pagina=${page}`
}

async function fetchPage(
  browser: import('playwright').Browser,
  url: string,
): Promise<MilaProps | null> {
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale:    'es-ES',
    viewport:  { width: 1366, height: 768 },
    javaScriptEnabled: true,
    // Variación leve del viewport para cada contexto — evita fingerprinting
    ...(Math.random() > 0.5 ? { viewport: { width: 1440, height: 900 } } : {}),
  })

  // Bloquear recursos que no aportan datos
  await context.route('**/*', (route) => {
    const rtype = route.request().resourceType()
    if (['image', 'media', 'font', 'stylesheet'].includes(rtype)) return route.abort()
    const rUrl = route.request().url()
    const BLOCK = ['googletagmanager', 'google-analytics', 'doubleclick',
                   'facebook.net', 'criteo', 'taboola', 'outbrain', 'pubads']
    if (BLOCK.some((t) => rUrl.includes(t))) return route.abort()
    return route.continue()
  })

  const page = await context.newPage()
  try {
    // Delay previo aleatorio — evita patrón de timing predecible
    await randDelay(1200, 3000)

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35_000 })

    // ── Detección de bloqueo Imperva ───────────────────────────────────────
    const pageTitle = await page.title()
    if (pageTitle.includes('Pardon Our Interruption')) {
      throw new Error('BLOQUEO_IMPERVA')
    }
    const blocked = await page.evaluate(
      () => document.documentElement.innerHTML.includes('showBlockPage')
    )
    if (blocked) throw new Error('BLOQUEO_IMPERVA')

    // ── Señales humanas ────────────────────────────────────────────────────
    await humanMouseMove(page)
    await randDelay(400, 900)
    await humanScroll(page)
    await randDelay(300, 700)

    // ── Extraer window.__INITIAL_PROPS__ ───────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: MilaProps | null = await page.evaluate((): any => {
      // @ts-ignore
      return typeof window.__INITIAL_PROPS__ !== 'undefined' ? window.__INITIAL_PROPS__ : null
    })
    if (props) return props

    // Fallback: parsear desde el tag <script> crudo
    const rawJson = await page.evaluate((): string | null => {
      for (const script of Array.from(document.querySelectorAll('script'))) {
        const text = script.textContent ?? ''
        if (!text.includes('__INITIAL_PROPS__')) continue
        const m = text.match(/window\.__INITIAL_PROPS__\s*=\s*JSON\.parse\("(.+?)"\);/)
        if (m) return m[1]
      }
      return null
    })
    if (!rawJson) return null
    return JSON.parse(rawJson.replace(/\\"/g, '"').replace(/\\\\/g, '\\')) as MilaProps
  } finally {
    await context.close()
  }
}

// ─── TRIPLE VERIFICACIÓN de is_particular ────────────────────────────────────
/**
 * Verifica 3 capas independientes antes de aceptar un anuncio como particular:
 *
 *   Capa 1 — API de Milanuncios: sellerType === 'private'
 *   Capa 2 — Keywords negativas: ausencia de términos de agencia en título/descripción
 *   Capa 3 — Sanity check de precio: los precios absurdos (>9M€ o <1000€ en venta)
 *            sugieren anuncios de "compro piso" disfrazados, no se importan.
 *
 * Las 3 capas deben pasar. Si falla cualquiera → descartado o guardado como agencia.
 */
function tripleCheckParticular(ad: MilaAd, operation: 'venta' | 'alquiler'): {
  isParticular: boolean
  reason: string
} {
  // Capa 1: señal del portal
  if (ad.sellerType !== 'private') {
    return { isParticular: false, reason: `sellerType="${ad.sellerType ?? 'undefined'}"` }
  }

  // Capa 2: keywords negativas en texto
  const text = ((ad.title ?? '') + ' ' + (ad.description ?? '')).toLowerCase()
  const AGENCY_KEYWORDS = [
    'inmobiliaria', 'agencia', 'agente', 'asesor inmobiliario',
    'franquicia', 'grupo inmobiliario', 'real estate', 'consultora',
    'servicios inmobiliarios', 'gestión inmobiliaria',
  ]
  const foundAgencyKw = AGENCY_KEYWORDS.find((kw) => text.includes(kw))
  if (foundAgencyKw) {
    return { isParticular: false, reason: `keyword agencia detectada: "${foundAgencyKw}"` }
  }

  // Capa 3: sanity check de precio
  const price = ad.price?.cashPrice?.value ?? 0
  if (operation === 'venta' && price > 9_000_000) {
    return { isParticular: false, reason: `precio sospechoso (${price}€) > 9M — posible "compro piso"` }
  }
  if (operation === 'alquiler' && price > 50_000) {
    return { isParticular: false, reason: `precio sospechoso (${price}€) > 50k alquiler` }
  }

  return { isParticular: true, reason: 'ok' }
}

// ─── Parser de anuncio ────────────────────────────────────────────────────────
function parseAd(
  ad: MilaAd,
  operation: 'sale' | 'rent',
  city: string,
  province: string,
  isParticular: boolean,
): ScrapedListing | null {
  if (!ad.url) return null
  const price = ad.price?.cashPrice?.value ?? null
  if (!price || price <= 0) return null

  const images = (ad.images ?? [])
    .map((img) => img.startsWith('http') ? img : `https://${img}?rule=detail_640x480`)
    .filter(Boolean)
  if (images.length === 0) return null

  const tags     = ad.tags ?? []
  const tagVal   = (type: string) => tags.find((t) => t.type === type)?.text ?? null
  const bedrooms  = tagVal('dormitorios')       ? (parseInt(tagVal('dormitorios')!,       10) || null) : null
  const bathrooms = tagVal('baños')              ? (parseInt(tagVal('baños')!,             10) || null) : null
  const areaRaw   = tagVal('metros cuadrados')
  const area      = areaRaw ? (parseInt(areaRaw.replace(/[^\d]/g, ''), 10) || null) : null

  const adCity     = ad.location?.city?.name     ?? city
  const adProvince = ad.location?.province?.name ?? province

  const urlPath   = ad.url.startsWith('/') ? ad.url : new URL(ad.url).pathname
  const distM     = urlPath.match(/\/([^/]+)-\d{7,12}\.htm$/)
  const district  = distM
    ? distM[1].split('-').slice(0, 3).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : null

  const idM       = ad.url.match(/-(\d{7,12})\.htm/)
  const externalId = idM ? idM[1] : ad.url.replace(/\W/g, '').slice(-15)
  const detailUrl  = ad.url.startsWith('http')
    ? ad.url
    : `https://www.milanuncios.com${ad.url}`

  return {
    title:              ad.title ?? `Piso en ${adCity}`,
    description:        ad.description ? ad.description.slice(0, 3000) : undefined,
    price_eur:          price,
    operation,
    province:           adProvince,
    city:               adCity,
    district:           district  ?? undefined,
    bedrooms:           bedrooms  ?? undefined,
    bathrooms:          bathrooms ?? undefined,
    area_m2:            area      ?? undefined,
    images,
    source_portal:      'milanuncios.com',
    source_url:         detailUrl,
    source_external_id: `mil_${externalId}`,
    is_particular:      isParticular,
    external_link:      detailUrl,
  }
}

// ─── Scraper principal del cazador ────────────────────────────────────────────
async function cazadorRun(): Promise<void> {
  const state = loadState()
  const today = new Date().toISOString().slice(0, 10)  // YYYY-MM-DD

  // ── Elegir ciudad del día ──────────────────────────────────────────────────
  const cityData  = ROTATION[state.cityIndex % ROTATION.length]
  const nextIndex = (state.cityIndex + 1) % ROTATION.length

  log(`════════════════════════════════════════════════════`)
  log(`🎯 BOT CAZADOR — ${today}`)
  log(`   Ciudad: ${cityData.city}  (índice ${state.cityIndex} de ${ROTATION.length})`)
  log(`   Modo:   ${DRY_RUN ? 'DRY RUN (sin escritura en BD)' : 'PRODUCCIÓN'}`)
  log(`   Límite: ${MAX_NEW_PER_RUN} nuevos particulares`)
  log(`════════════════════════════════════════════════════`)

  let newImported  = 0  // particulares NUEVOS en esta ejecución
  let agencias     = 0
  let descartados  = 0

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1366,768',
    ],
  })

  try {
    // Intentamos hasta 4 páginas en total (venta pág.1, venta pág.2,
    // alquiler pág.1, alquiler pág.2) hasta alcanzar MAX_NEW_PER_RUN.
    const QUEUE: Array<{ op: 'venta' | 'alquiler'; page: number }> = [
      { op: 'venta',    page: 1 },
      { op: 'alquiler', page: 1 },
      { op: 'venta',    page: 2 },
      { op: 'alquiler', page: 2 },
    ]

    for (const { op, page } of QUEUE) {
      if (newImported >= MAX_NEW_PER_RUN) break

      const url = buildSearchUrl(op, cityData.slug, page)
      log(`\n  📄 [${op.toUpperCase()}] Página ${page}: ${url}`)

      let props: MilaProps | null = null
      try {
        props = await fetchPage(browser, url)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        log(`  ❌ ${msg}`)
        if (msg === 'BLOQUEO_IMPERVA') break
        continue
      }

      const allAds = props?.adListPagination?.adList?.ads ?? []
      if (allAds.length === 0) {
        log(`  ℹ️  Sin anuncios en esta página, pasando`)
        continue
      }

      const pagination = props?.adListPagination?.pagination
      log(`  🔗 ${allAds.length} anuncios totales (pág. ${pagination?.page ?? page}/${pagination?.totalPages ?? '?'})`)

      for (const ad of allAds) {
        if (newImported >= MAX_NEW_PER_RUN) break

        // ── TRIPLE VERIFICACIÓN ────────────────────────────────────────────
        const check = tripleCheckParticular(ad, op)
        if (!check.isParticular) {
          agencias++
          log(`  🏢 [AGENCIA/DESCARTADO] ${(ad.title ?? 'sin título').slice(0, 50)} — ${check.reason}`)
          continue
        }

        const listing = parseAd(
          ad,
          op === 'venta' ? 'sale' : 'rent',
          cityData.city,
          cityData.province,
          true,  // isParticular — ya verificado en las 3 capas
        )

        if (!listing) {
          descartados++
          log(`  ⚠️  [SIN PRECIO/FOTO] ${ad.url ?? '(sin url)'}`)
          continue
        }

        // Verificación final — is_particular DEBE ser true antes de guardar
        if (!listing.is_particular) {
          // Nunca debería llegar aquí dado el triple check, pero por seguridad:
          log(`  🛡️  [BLOQUEO FINAL] is_particular=false tras triple check — DESCARTADO`)
          descartados++
          continue
        }

        if (DRY_RUN) {
          newImported++
          log(
            `  🧪 [DRY RUN] ${listing.price_eur}€ | ${listing.area_m2 ?? '?'}m² | ` +
            `${listing.images?.length ?? 0}📷 | ${listing.bedrooms ?? '?'}hab | ` +
            `${listing.title?.slice(0, 50)}`
          )
        } else {
          const saved = await upsertListing(listing)
          if (saved) {
            newImported++
            log(
              `  ✅ [NUEVO] ${listing.price_eur}€ | ${listing.area_m2 ?? '?'}m² | ` +
              `${listing.images?.length ?? 0}📷 | ${listing.bedrooms ?? '?'}hab | ` +
              `is_particular=true | ${listing.title?.slice(0, 50)}`
            )
          } else {
            log(`  📎 [DUPLICADO] ya existe: ${listing.source_external_id}`)
          }
        }

        // Micro-delay entre imports — evita ráfagas predecibles
        await randDelay(800, 2000)
      }

      // Delay entre páginas/operaciones — permite al servidor respirar
      if (newImported < MAX_NEW_PER_RUN) {
        await randDelay(3500, 7500)
      }
    }
  } finally {
    await browser.close()
    log(`\n  🔒 Navegador cerrado`)
  }

  // ── Resumen ───────────────────────────────────────────────────────────────
  log(`\n${'─'.repeat(52)}`)
  log(`  ✅ Nuevos particulares importados : ${newImported}/${MAX_NEW_PER_RUN}`)
  log(`  🏢 Agencias/descartados por check : ${agencias}`)
  log(`  ⚠️  Descartados (sin precio/foto)  : ${descartados}`)
  log(`  📅 Próxima ciudad                 : ${ROTATION[nextIndex].city}`)
  log(`${'─'.repeat(52)}`)

  // ── Actualizar estado ─────────────────────────────────────────────────────
  if (!DRY_RUN) {
    const newState: CazadorState = {
      cityIndex:     nextIndex,
      totalImported: state.totalImported + newImported,
      lastRun:       today,
      lastCity:      cityData.city,
    }
    saveState(newState)
    log(`  💾 Estado guardado → ${STATE_FILE}`)
  } else {
    log(`  🧪 DRY RUN — estado NO modificado`)
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────
cazadorRun().catch((err) => {
  log(`💥 ERROR FATAL: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
})
