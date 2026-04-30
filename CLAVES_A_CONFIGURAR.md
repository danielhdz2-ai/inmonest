# 🔑 CLAVES A CONFIGURAR EN VERCEL

## ⚠️ URGENTE - Rotar Claves Comprometidas

Estas claves estaban en documentación pública (Git) y necesitan rotación:

### 1. RESEND_API_KEY ❌ COMPROMETIDA
**Acción**: Rotar en Resend Dashboard
1. Ve a https://resend.com/api-keys
2. **Elimina** la clave: `re_WycLX8Bp_7vW16ahjXD17NNh1dZvnXnYV`
3. Click **"Create API Key"**
4. Copia la nueva clave
5. Añádela a Vercel: Settings → Environment Variables → RESEND_API_KEY → Edit
6. Redeploy

---

## 🆕 NUEVAS CLAVES GENERADAS

### 2. NEXT_PUBLIC_VAPID_PUBLIC_KEY (Nueva)
```
BJG-n26E2CSS5o59vYsl_4sxEoSetEMUN5MjSzP2rW2EIGJsDRX3Yk2EXQu3X2sRn6BqcE5WTaxOn9EOdDaqrZo
```
**Acción**: Actualizar en Vercel
- Settings → Environment Variables → NEXT_PUBLIC_VAPID_PUBLIC_KEY → Edit
- Pegar la clave de arriba
- Aplicar a: Production, Preview, Development

### 3. VAPID_PRIVATE_KEY (Nueva)
```
o4-pJUDuLi7MPTt7-kDHOQG-TansWNxlcGfblDjtems
```
**Acción**: Actualizar en Vercel
- Settings → Environment Variables → VAPID_PRIVATE_KEY → Edit
- Pegar la clave de arriba
- Aplicar a: Production, Preview, Development

---

## ➕ CLAVES FALTANTES (Needs Attention)

### 4. CRON_SECRET (Necesaria para cron jobs)
```
Aebi7hvdGV3DRnlWNy/AuICM9nWgo8/YPGVh+b/IYMg=
```
**Acción**: Añadir en Vercel
- Settings → Environment Variables → Add New
- Key: `CRON_SECRET`
- Value: Pegar la clave de arriba
- Aplicar a: Production, Preview, Development

**Uso**: Protege endpoints `/api/cron/*`, `/api/scraper`, `/api/maintenance`

### 5. SCRAPER_SECRET (Necesaria para ingest API)
```
eYZqcDzojRp05do6p4CWKEjgl8z64yIChwxmQiwmhxg=
```
**Acción**: Añadir en Vercel
- Settings → Environment Variables → Add New
- Key: `SCRAPER_SECRET`
- Value: Pegar la clave de arriba
- Aplicar a: Production, Preview, Development

**Uso**: Protege endpoint `/api/ingest`

### 6. GOOGLE_AI_API_KEY (Opcional - fallback)
**Estado**: Marcada "Needs Attention" pero opcional
**Acción**: 
- Si NO la usas (usas OpenRouter): Eliminarla de Vercel
- Si SÍ la usas: Obtenerla en https://makersuite.google.com/app/apikey

**Uso**: Fallback para `/api/chat` si no hay `OPENROUTER_API_KEY`

---

## 📋 CHECKLIST COMPLETO

- [ ] **Rotar RESEND_API_KEY** (eliminar antigua, crear nueva en Resend Dashboard)
- [ ] **Actualizar NEXT_PUBLIC_VAPID_PUBLIC_KEY** en Vercel
- [ ] **Actualizar VAPID_PRIVATE_KEY** en Vercel
- [ ] **Añadir CRON_SECRET** en Vercel
- [ ] **Añadir SCRAPER_SECRET** en Vercel
- [ ] **Decidir sobre GOOGLE_AI_API_KEY** (eliminar o configurar)
- [ ] **Redeploy** en Vercel después de cambios
- [ ] **Limpiar push_subscriptions** en Supabase (opcional): `DELETE FROM push_subscriptions;`
- [ ] **Marcar incidentes GitGuardian** como "Fixed - Secret Rotated"
- [ ] **Actualizar .env.local** con las nuevas claves

---

## 💾 TU .env.local DEBE QUEDAR ASÍ:

```bash
# ── Supabase (NO cambiar, están bien) ────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://ktsdxpmaljiyuwimcugx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJ...tu_service_role_key

# ── Resend (ROTAR - Nueva clave de Dashboard) ────────────────
RESEND_API_KEY=re_NUEVA_CLAVE_AQUI

# ── VAPID Keys (NUEVAS) ───────────────────────────────────────
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BJG-n26E2CSS5o59vYsl_4sxEoSetEMUN5MjSzP2rW2EIGJsDRX3Yk2EXQu3X2sRn6BqcE5WTaxOn9EOdDaqrZo
VAPID_PRIVATE_KEY=o4-pJUDuLi7MPTt7-kDHOQG-TansWNxlcGfblDjtems

# ── Secrets (NUEVOS) ──────────────────────────────────────────
CRON_SECRET=Aebi7hvdGV3DRnlWNy/AuICM9nWgo8/YPGVh+b/IYMg=
SCRAPER_SECRET=eYZqcDzojRp05do6p4CWKEjgl8z64yIChwxmQiwmhxg=

# ── Otras (NO cambiar si ya funcionan) ────────────────────────
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
OPENROUTER_API_KEY=...
# etc.
```

---

## 🎯 RESUMEN DE ACCIONES (5 MINUTOS)

1. **Resend**: Rotar API key (https://resend.com/api-keys)
2. **Vercel**: Actualizar 5 variables (3 editar, 2 añadir)
3. **Redeploy**: Vercel dashboard → Redeploy
4. **GitGuardian**: Marcar como resuelto
5. **Local**: Actualizar .env.local con nuevas claves

---

**Última actualización**: 30 de abril 2026, 09:00 UTC
