/**
 * Cliente OAuth para Google Search Console API (app de escritorio).
 * Credenciales: scripts/seo/gsc-oauth-client.json (descargar de Google Cloud, no commitear).
 * Token guardado: scripts/seo/.gsc-token.json (generado con gsc-auth.ts).
 */

import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { fileURLToPath } from 'url'
import { config as loadDotenv } from 'dotenv'
import { google } from 'googleapis'
import type { OAuth2Client } from 'google-auth-library'

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

const dir = path.dirname(fileURLToPath(import.meta.url))
loadDotenv({ path: path.join(dir, '../../.env.local') })
export const GSC_CREDENTIALS_PATH = path.join(dir, 'gsc-oauth-client.json')
export const GSC_TOKEN_PATH = path.join(dir, '.gsc-token.json')

export const DEFAULT_GSC_SITE = 'https://inmonest.com/'

type InstalledCredentials = {
  installed: {
    client_id: string
    client_secret: string
    redirect_uris: string[]
  }
}

function loadCredentials(): InstalledCredentials {
  if (!fs.existsSync(GSC_CREDENTIALS_PATH)) {
    throw new Error(
      `No se encuentra ${GSC_CREDENTIALS_PATH}. Descarga el JSON OAuth (app de escritorio) desde Google Cloud y guárdalo ahí.`,
    )
  }
  return JSON.parse(fs.readFileSync(GSC_CREDENTIALS_PATH, 'utf8')) as InstalledCredentials
}

function createOAuthClient(): OAuth2Client {
  const { client_id, client_secret, redirect_uris } = loadCredentials().installed
  return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0] ?? 'http://localhost')
}

function saveToken(client: OAuth2Client): void {
  fs.writeFileSync(GSC_TOKEN_PATH, JSON.stringify(client.credentials, null, 2), 'utf8')
}

function loadToken(client: OAuth2Client): boolean {
  if (fs.existsSync(GSC_TOKEN_PATH)) {
    client.setCredentials(JSON.parse(fs.readFileSync(GSC_TOKEN_PATH, 'utf8')))
    return true
  }
  const refresh = process.env.GSC_REFRESH_TOKEN?.trim()
  if (refresh) {
    client.setCredentials({ refresh_token: refresh })
    return true
  }
  return false
}

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

/** Extrae el code= de una URL de redirección o acepta el código directamente. */
export function parseAuthCode(input: string): string {
  const trimmed = input.trim()
  if (!trimmed.includes('code=')) return trimmed
  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `http://x?${trimmed}`)
    const code = url.searchParams.get('code')
    if (!code) throw new Error('Sin code en la URL')
    return code
  } catch {
    const match = trimmed.match(/[?&]code=([^&]+)/)
    if (match?.[1]) return decodeURIComponent(match[1])
    return trimmed
  }
}

/** Autorización interactiva (primera vez o token caducado sin refresh). */
export async function authorizeInteractive(): Promise<OAuth2Client> {
  const client = createOAuthClient()
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  })

  console.log('\n🔐 Autoriza el acceso a Search Console con la cuenta que tiene inmonest.com:\n')
  console.log(authUrl)
  console.log('\nTras autorizar, Google redirige a localhost (puede fallar en el navegador — es normal).')
  console.log('Copia la URL completa de la barra de direcciones o solo el parámetro code=...\n')

  const raw = await prompt('Pega la URL o el código aquí: ')
  const code = parseAuthCode(raw)
  const { tokens } = await client.getToken(code)
  client.setCredentials(tokens)
  saveToken(client)
  console.log(`\n✅ Token guardado en ${GSC_TOKEN_PATH}\n`)
  return client
}

/** Cliente autenticado; refresca token si hace falta. */
export async function getAuthenticatedClient(): Promise<OAuth2Client> {
  const client = createOAuthClient()
  if (!loadToken(client)) {
    return authorizeInteractive()
  }

  try {
    await client.getAccessToken()
    saveToken(client)
    return client
  } catch {
    console.warn('⚠️  Token caducado o inválido — nueva autorización...')
    return authorizeInteractive()
  }
}

export function getSearchConsole(auth: OAuth2Client) {
  return google.searchconsole({ version: 'v1', auth })
}

export async function resolveSiteUrl(auth: OAuth2Client, preferred?: string): Promise<string> {
  const sc = getSearchConsole(auth)
  const { data } = await sc.sites.list()
  const entries = data.siteEntry ?? []
  const urls = entries.map((e) => e.siteUrl).filter(Boolean) as string[]

  if (preferred && urls.includes(preferred)) return preferred

  const match =
    urls.find((u) => u === 'sc-domain:inmonest.com') ??
    urls.find((u) => u.includes('inmonest.com')) ??
    urls[0]

  if (!match) {
    throw new Error(
      `No hay propiedades Search Console accesibles. Verifica la cuenta OAuth. Encontradas: ${urls.join(', ') || 'ninguna'}`,
    )
  }
  return match
}

export function siteFromEnv(): string | undefined {
  return process.env.GSC_SITE_URL?.trim() || undefined
}
