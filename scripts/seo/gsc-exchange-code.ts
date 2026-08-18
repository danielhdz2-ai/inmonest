/**
 * Canjea un código OAuth (pega URL de localhost o el code) y guarda el token.
 *
 * Uso:
 *   npx tsx scripts/seo/gsc-exchange-code.ts "http://localhost/?code=4/0A..."
 *   GSC_AUTH_CODE=4/0A... npx tsx scripts/seo/gsc-exchange-code.ts
 */

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { google } from 'googleapis'
import {
  GSC_CREDENTIALS_PATH,
  GSC_TOKEN_PATH,
  parseAuthCode,
  getSearchConsole,
  resolveSiteUrl,
} from './gsc-client'

const dir = path.dirname(fileURLToPath(import.meta.url))
const envLocalPath = path.join(dir, '../../.env.local')

function appendRefreshTokenToEnvLocal(refreshToken: string): void {
  let content = fs.existsSync(envLocalPath) ? fs.readFileSync(envLocalPath, 'utf8') : ''
  const line = `GSC_REFRESH_TOKEN=${refreshToken}`
  if (/^GSC_REFRESH_TOKEN=/m.test(content)) {
    content = content.replace(/^GSC_REFRESH_TOKEN=.*$/m, line)
  } else {
    content += (content.endsWith('\n') || !content ? '' : '\n') + `\n# Google Search Console API\n${line}\n`
  }
  fs.writeFileSync(envLocalPath, content, 'utf8')
}

async function main() {
  const raw = process.argv[2] ?? process.env.GSC_AUTH_CODE
  if (!raw) {
    console.error('Uso: npx tsx scripts/seo/gsc-exchange-code.ts "http://localhost/?code=..."')
    process.exit(1)
  }

  const creds = JSON.parse(fs.readFileSync(GSC_CREDENTIALS_PATH, 'utf8')).installed
  const client = new google.auth.OAuth2(
    creds.client_id,
    creds.client_secret,
    creds.redirect_uris[0] ?? 'http://localhost',
  )

  const code = parseAuthCode(raw)
  const { tokens } = await client.getToken(code)
  client.setCredentials(tokens)
  fs.writeFileSync(GSC_TOKEN_PATH, JSON.stringify(tokens, null, 2), 'utf8')

  if (tokens.refresh_token) {
    appendRefreshTokenToEnvLocal(tokens.refresh_token)
    console.log('✅ GSC_REFRESH_TOKEN guardado en .env.local')
  }

  const siteUrl = await resolveSiteUrl(client)
  const { data } = await getSearchConsole(client).sites.list()

  console.log('✅ Token guardado:', GSC_TOKEN_PATH)
  console.log('   Propiedad:', siteUrl)
  console.log('   Propiedades:', (data.siteEntry ?? []).map((e) => e.siteUrl).join(', '))
  console.log('\n   Ya puedo ejecutar: npm run gsc:fetch')
}

main().catch((err) => {
  console.error('❌', err instanceof Error ? err.message : err)
  process.exit(1)
})
