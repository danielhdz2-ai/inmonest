# 🔧 GitHub Actions - Configuración de Workflows

## 📋 Estado de los Workflows

### ✅ Activos (Funcionando)
- **🤖 Raspadores Pro** (`scrapers.yml`)
  - Ejecuta: 2 veces al día (07:00 y 19:00 UTC)
  - Secrets requeridos: `SUPABASE_SERVICE_KEY` ✓ Configurado
  
- **Daily Scrape - Particulares** (`daily-scrape.yml`)
  - Ejecuta: Diariamente a las 07:00 UTC
  - Secrets requeridos: `SUPABASE_SERVICE_KEY` ✓ Configurado

- **Generate AI Descriptions** (`generate-ai-descriptions.yml`)
  - Ejecuta: Solo manual (workflow_dispatch)
  - Secrets requeridos: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENROUTER_API_KEY`

### ⏸️ Desactivados (Requieren Configuración)

#### 1. **🔔 Enviar Alertas de Búsqueda** (`alertas.yml`)
**Error:** HTTP 401 Unauthorized  
**Causa:** `CRON_SECRET` no configurado en GitHub Secrets

**Secrets necesarios:**
- `CRON_SECRET` - Token secreto para autenticar llamadas al endpoint `/api/cron/alertas`

**Cómo activar:**
1. Ir a GitHub → Settings → Secrets and variables → Actions
2. Crear nuevo secret `CRON_SECRET` con valor aleatorio seguro
3. Añadir el mismo valor a las variables de entorno de Vercel
4. Descomentar el `schedule:` en `alertas.yml` (líneas 15-17)
5. Commit y push

---

#### 2. **🔧 Bot de Mantenimiento** (`maintenance-bot.yml`)
**Error:** HTTP 401 Unauthorized  
**Causa:** `CRON_SECRET` no configurado en GitHub Secrets

**Secrets necesarios:**
- `CRON_SECRET` - Token secreto para autenticar llamadas al endpoint `/api/maintenance`

**Cómo activar:**
1. Configurar `CRON_SECRET` (igual que arriba)
2. Descomentar el `schedule:` en `maintenance-bot.yml` (líneas 4-7)
3. Commit y push

---

#### 3. **🧹 Limpieza Semanal de Pisos Obsoletos** (`limpieza-semanal.yml`)
**Error:** `supabaseUrl is required`  
**Causa:** `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` no configurados

**Secrets necesarios:**
- `NEXT_PUBLIC_SUPABASE_URL` - URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clave anon key de Supabase

**Cómo activar:**
1. Ir a Supabase → Project Settings → API
2. Copiar `Project URL` y `anon public`
3. Añadirlos como secrets en GitHub Actions
4. Descomentar el `schedule:` en `limpieza-semanal.yml` (líneas 4-7)
5. Commit y push

---

#### 4. **🔍 Detector de Pisos No Disponibles (404s)** (`detect-404s.yml`)
**Error:** Variables de entorno no configuradas  
**Causa:** Secrets de Supabase no configurados

**Secrets necesarios:**
- `NEXT_PUBLIC_SUPABASE_URL` - URL de tu proyecto Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (admin) de Supabase

**Cómo activar:**
1. Ir a Supabase → Project Settings → API
2. Copiar `Project URL` y `service_role` (⚠️ Mantener secreto, tiene permisos admin)
3. Añadirlos como secrets en GitHub Actions
4. Descomentar el `schedule:` en `detect-404s.yml` (líneas 4-7)
5. Commit y push

---

## 🔐 Resumen de Secrets Necesarios

| Secret | Descripción | Usado por |
|--------|-------------|-----------|
| `CRON_SECRET` | Token secreto para autenticar cron jobs | alertas.yml, maintenance-bot.yml |
| `SUPABASE_SERVICE_KEY` | Service key de Supabase | scrapers.yml ✓, daily-scrape.yml ✓ |
| `NEXT_PUBLIC_SUPABASE_URL` | URL pública del proyecto Supabase | limpieza-semanal.yml, detect-404s.yml |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key pública de Supabase | limpieza-semanal.yml |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (admin) de Supabase | detect-404s.yml, generate-ai-descriptions.yml |
| `SUPABASE_URL` | URL del proyecto Supabase | generate-ai-descriptions.yml |
| `OPENROUTER_API_KEY` | API key de OpenRouter para IA | generate-ai-descriptions.yml |

---

## 🚀 Instrucciones de Activación

### 1. Generar CRON_SECRET
```bash
# Generar token aleatorio seguro (32 caracteres)
openssl rand -base64 32
```

### 2. Añadir Secrets a GitHub
1. Ir a tu repositorio en GitHub
2. Navegar a **Settings** → **Secrets and variables** → **Actions**
3. Click en **New repository secret**
4. Añadir cada secret necesario

### 3. Añadir CRON_SECRET a Vercel
1. Ir a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Añadir `CRON_SECRET` con el mismo valor que en GitHub
4. Redeploy el proyecto

### 4. Descomentar Schedules
En cada archivo `.yml` desactivado:
- Buscar `# DESACTIVADO: Requiere...`
- Descomentar las líneas `schedule:` y `- cron:`
- Guardar cambios

### 5. Commit y Push
```bash
git add .github/workflows/*.yml
git commit -m "chore: Activar workflows con secrets configurados"
git push
```

---

## 📊 Monitoreo

### Ver ejecuciones recientes:
```bash
gh run list --limit 10
```

### Ver logs de un workflow específico:
```bash
gh run view <RUN_ID> --log-failed
```

### Ejecutar manualmente un workflow:
```bash
gh workflow run <workflow-name.yml>
```

---

## ⚠️ Importante

- **Nunca** commitear secrets directamente en el código
- Los secrets de Supabase **Service Role** tienen permisos de admin, mantenerlos seguros
- `CRON_SECRET` debe ser el mismo en GitHub Actions y Vercel
- Los workflows desactivados NO consumen minutos de GitHub Actions
- GitHub Actions es gratis hasta 2,000 minutos/mes para repositorios privados
- Los scrapers activos están optimizados para NO exceder el límite gratuito

---

**Última actualización:** 2026-06-02  
**Motivo desactivación:** Secrets faltantes causando errores 401/500 en GitHub Actions
