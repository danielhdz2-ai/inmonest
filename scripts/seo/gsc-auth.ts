/**
 * Primera autorización OAuth para Google Search Console.
 *
 * Uso: npx tsx scripts/seo/gsc-auth.ts
 */

import {
  authorizeInteractive,
  GSC_CREDENTIALS_PATH,
  GSC_TOKEN_PATH,
  getSearchConsole,
  resolveSiteUrl,
} from './gsc-client'

async function main() {
  console.log('📁 Credenciales:', GSC_CREDENTIALS_PATH)
  const auth = await authorizeInteractive()
  const siteUrl = await resolveSiteUrl(auth)
  const sc = getSearchConsole(auth)
  const { data } = await sc.sites.list()

  console.log('✅ Autorización OK')
  console.log('   Propiedad activa:', siteUrl)
  console.log('   Token:', GSC_TOKEN_PATH)
  console.log('\n   Propiedades visibles:')
  for (const entry of data.siteEntry ?? []) {
    console.log(`   - ${entry.siteUrl} (${entry.permissionLevel ?? '?'})`)
  }
  console.log('\n   Siguiente paso: npm run gsc:fetch')
}

main().catch((err) => {
  console.error('❌', err instanceof Error ? err.message : err)
  process.exit(1)
})
