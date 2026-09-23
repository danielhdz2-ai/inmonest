#!/usr/bin/env node
/**
 * Añade www.inmonest.com al proyecto Vercel y lo redirige a inmonest.com.
 * Requiere VERCEL_TOKEN con acceso al team danielhdz2-ai / proyecto inmonest.
 *
 * Uso: VERCEL_TOKEN=... node scripts/setup-vercel-www.mjs
 */

const TOKEN = process.env.VERCEL_TOKEN
const TEAM = process.env.VERCEL_TEAM_ID || process.env.VERCEL_ORG_ID
const PROJECT = process.env.VERCEL_PROJECT_ID || 'inmonest'
const APEX = 'inmonest.com'
const WWW = 'www.inmonest.com'

if (!TOKEN) {
  console.error('Falta VERCEL_TOKEN')
  process.exit(1)
}

const qs = TEAM ? `?teamId=${TEAM}` : ''

async function api(path, opts = {}) {
  const res = await fetch(`https://api.vercel.com${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  })
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = text
  }
  if (!res.ok) {
    throw new Error(`${res.status} ${path}: ${typeof body === 'string' ? body : JSON.stringify(body)}`)
  }
  return body
}

async function resolveProjectId() {
  if (PROJECT.startsWith('prj_')) return PROJECT
  const data = await api(`/v9/projects${qs}&search=${PROJECT}`)
  const hit = (data.projects || []).find((p) => p.name === PROJECT)
  if (!hit) throw new Error(`Proyecto "${PROJECT}" no encontrado`)
  return hit.id
}

async function main() {
  const projectId = await resolveProjectId()
  console.log('Proyecto:', projectId)

  try {
    const added = await api(`/v10/projects/${projectId}/domains${qs}`, {
      method: 'POST',
      body: JSON.stringify({ name: WWW, redirect: APEX, redirectStatusCode: 308 }),
    })
    console.log('Dominio www añadido:', added.name, '→', added.redirect || APEX)
  } catch (err) {
    const msg = String(err.message || err)
    if (msg.includes('already exists') || msg.includes('DOMAIN_ALREADY_EXISTS')) {
      console.log('www ya existe; actualizando redirect…')
      await api(`/v9/projects/${projectId}/domains/${WWW}${qs}`, {
        method: 'PATCH',
        body: JSON.stringify({ redirect: APEX, redirectStatusCode: 308 }),
      })
      console.log('Redirect actualizado a', APEX)
    } else {
      throw err
    }
  }

  const domains = await api(`/v9/projects/${projectId}/domains${qs}`)
  const www = (domains.domains || []).find((d) => d.name === WWW)
  console.log('Estado www:', www ? { verified: www.verified, redirect: www.redirect } : 'no encontrado')
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
