# 🔒 BUENAS PRÁCTICAS DE SEGURIDAD - INMONEST

## 🚨 REGLAS DE ORO (NUNCA ROMPER)

### 1. ❌ NUNCA pongas claves reales en archivos que se suben a Git

**MAL** ❌:
```bash
# .env.example
RESEND_API_KEY=re_WycLX8Bp_7vW16ahjXD17NNh1dZvnXnYV  # ❌ CLAVE REAL
VAPID_PRIVATE_KEY=KllP9K0Z5HSokTGis8veAlhDHFdoOET68rc1l-gEhC4  # ❌ CLAVE REAL
```

**BIEN** ✅:
```bash
# .env.example
RESEND_API_KEY=TU_RESEND_API_KEY_AQUI  # ✅ PLACEHOLDER
VAPID_PRIVATE_KEY=TU_VAPID_PRIVATE_KEY_AQUI  # ✅ PLACEHOLDER
```

---

### 2. ✅ Archivos seguros para claves REALES:

| Archivo | ¿Se sube a Git? | ¿Contiene claves reales? |
|---------|-----------------|--------------------------|
| `.env.local` | ❌ NO (en .gitignore) | ✅ SÍ - Seguro |
| `.env` | ❌ NO (en .gitignore) | ✅ SÍ - Seguro |
| `.env.example` | ✅ SÍ (se commitea) | ❌ NO - Solo placeholders |
| `*.md` docs | ✅ SÍ (se commitea) | ❌ NO - Solo placeholders |
| Vercel Dashboard | ❌ NO (solo tú) | ✅ SÍ - Seguro |

---

### 3. 🔑 Tipos de Secrets y Cómo Manejarlos

#### A) API Keys de Terceros (Resend, Stripe, OpenAI)
- **Obtención**: Dashboard del servicio
- **Almacenamiento local**: `.env.local`
- **Almacenamiento producción**: Vercel Environment Variables
- **En documentación**: Enlace al dashboard + placeholder
- **Rotación**: Regenerar en dashboard del servicio si se expone

**Ejemplo**:
```markdown
# GUÍA: Configurar Resend
1. Ve a https://resend.com/api-keys
2. Click "Create API Key"
3. Copia la clave
4. Añádela a .env.local: RESEND_API_KEY=TU_CLAVE_AQUI
```

#### B) Secrets Generados (CRON_SECRET, SCRAPER_SECRET)
- **Generación**: `openssl rand -base64 32` o `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- **Almacenamiento**: Mismo que API Keys
- **Rotación**: Generar nuevo, actualizar en Vercel, redeploy

#### C) VAPID Keys (Web Push)
- **Generación**: `npx web-push generate-vapid-keys`
- **ÚNICO POR PROYECTO**: No reutilizar
- **Rotación**: Generar nuevo par, perder suscripciones antiguas

---

### 4. 📝 Checklist ANTES de commitear

Ejecuta esto SIEMPRE antes de `git add`:

```bash
# Buscar posibles secrets expuestos
git diff | grep -E "(API_KEY|SECRET|PRIVATE|VAPID|sk_live|re_[A-Za-z0-9]{30})"
```

Si encuentra algo, **REVISAR** que sean placeholders y no valores reales.

---

### 5. 🛡️ Qué hacer si expones un secret

#### A) Secret de Tercero (Resend, Stripe, etc.)
1. **Ir al dashboard del servicio**
2. **Revocar/Eliminar** la clave comprometida
3. **Generar nueva clave**
4. **Actualizar** en `.env.local` y Vercel
5. **Redeploy** aplicación
6. **Commitear** cambio con placeholders

#### B) Secret Generado (CRON_SECRET, etc.)
1. **Generar nuevo**: `openssl rand -base64 32`
2. **Actualizar** en `.env.local` y Vercel
3. **Redeploy** aplicación
4. **Commitear** cambio con placeholders

#### C) VAPID Keys
1. **Generar nuevas**: `npx web-push generate-vapid-keys`
2. **Actualizar** en `.env.local` y Vercel
3. **Redeploy** aplicación
4. **Avisar usuarios** que re-activen notificaciones
5. **Limpiar** tabla `push_subscriptions`

---

### 6. 🔍 Verificar que .gitignore está correcto

```bash
# Debe incluir estas líneas:
.env*
.env*.local
!.env.example
```

**Probar**:
```bash
git status
# NO debe aparecer .env.local ni .env
```

---

### 7. 🚀 Variables de Entorno en Vercel

#### Cuándo usar cada tipo:

| Variable | Prefijo | Cuándo usar |
|----------|---------|-------------|
| **Pública** | `NEXT_PUBLIC_` | Necesaria en navegador (ej: `NEXT_PUBLIC_SUPABASE_URL`) |
| **Privada** | Sin prefijo | Solo servidor (ej: `RESEND_API_KEY`, `STRIPE_SECRET_KEY`) |

⚠️ **NUNCA** pongas secrets en `NEXT_PUBLIC_`:
```bash
# ❌ MAL - Se expone al navegador
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_live_xxx

# ✅ BIEN - Solo servidor
STRIPE_SECRET_KEY=sk_live_xxx
```

---

### 8. 📊 Herramientas de Detección

#### GitGuardian (Ya activo)
- ✅ Detecta secrets en commits
- ✅ Envía alertas al email
- 🔧 Cuando recibas alerta: **Rotar inmediatamente**

#### GitHub Secret Scanning (Gratis para repos públicos)
- ✅ Detecta automáticamente
- 🔧 Habilitar: Settings → Security → Secret scanning

---

### 9. ❓ Variables "Needs Attention" en Vercel

Vercel marca variables con **"Needs Attention"** cuando:

1. **No se usan en el código** → Puedes eliminarlas
2. **Solo se usan en scripts** → Normal, ignorar
3. **Están vacías** → Añadir valor

**Tu caso (screenshot)**:
- `CRON_SECRET` → ✅ Se usa en `/api/cron/*`
- `GOOGLE_AI_API_KEY` → ❓ ¿Se usa? (probablemente NO, usas OpenRouter)
- `SCRAPER_SECRET` → ❓ ¿Se usa? (verificar)

---

### 10. ✅ Checklist de Seguridad Completa

- [ ] `.gitignore` incluye `.env*` y `.env*.local`
- [ ] `.env.example` solo tiene placeholders
- [ ] Ningún archivo `.md` tiene claves reales
- [ ] Todas las claves en Vercel están configuradas
- [ ] GitGuardian está activo
- [ ] Documentación usa enlaces a dashboards, no claves
- [ ] Scripts de desarrollo usan `.env.local` (nunca commiteado)
- [ ] Cron jobs usan `CRON_SECRET` para autenticación

---

## 🎓 Regla Simple para Recordar

> **"Si un archivo se sube a Git (commit/push), NO puede tener claves reales. SOLO placeholders."**

Archivos que se suben a Git:
- ✅ `.env.example` → Placeholders
- ✅ `*.md` documentación → Placeholders
- ✅ Código `.ts/.tsx/.js` → Sin claves hardcodeadas
- ❌ `.env.local` → NO se sube (en .gitignore)
- ❌ `.env` → NO se sube (en .gitignore)

---

**Última actualización**: 30 de abril 2026
**Mantenido por**: Equipo Inmonest
