/**
 * Libera Deployment Storage en Hobby borrando deployments antiguos (no el de producción).
 *
 * Uso (PowerShell, token en https://vercel.com/account/tokens del team inmonest):
 *   $env:VERCEL_TOKEN="..."
 *   node scripts/prune-vercel-deployments.mjs
 *
 * Opcional: KEEP=5 (por defecto 3) deployments recientes además del current production.
 */
const TOKEN = process.env.VERCEL_TOKEN
const PROJECT_ID = process.env.VERCEL_PROJECT_ID ?? 'prj_vakemsjwhSzXZA7w6zZBfT6Eaba'
const TEAM_ID = process.env.VERCEL_TEAM_ID ?? 'team_ATJtNnHt8feXAc3BNhGAxFlB'
const KEEP = Math.max(1, Number(process.env.KEEP ?? 3))

if (!TOKEN) {
  console.error('Falta VERCEL_TOKEN (Vercel → Account Settings → Tokens).')
  process.exit(1)
}

const base = `https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&teamId=${TEAM_ID}&limit=100`

async function api(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { Authorization: `Bearer ${TOKEN}`, ...(opts.headers ?? {}) },
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`${res.status} ${url}\n${text}`)
  return text ? JSON.parse(text) : {}
}

const { deployments = [] } = await api(base)
const production = deployments.find((d) => d.target === 'production' && d.state === 'READY')
const sorted = [...deployments].sort((a, b) => b.created - a.created)
const protectedIds = new Set([production?.uid].filter(Boolean))
for (const d of sorted.slice(0, KEEP)) protectedIds.add(d.uid)

const toDelete = sorted.filter((d) => !protectedIds.has(d.uid))
console.log(`Total: ${deployments.length}, protegidos: ${protectedIds.size}, a borrar: ${toDelete.length}`)

for (const d of toDelete) {
  const url = `https://api.vercel.com/v13/deployments/${d.uid}?teamId=${TEAM_ID}`
  await api(url, { method: 'DELETE' })
  console.log('Deleted', d.uid, d.meta?.githubCommitMessage?.slice(0, 60) ?? d.url)
}

console.log('Listo. Revisa Usage → Deployment Storage en el dashboard.')
