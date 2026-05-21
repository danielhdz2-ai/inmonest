# 🔐 Configurar GitHub Secrets para Workflows

## ❌ Problema Actual

El workflow `🔔 Enviar Alertas de Búsqueda` está fallando porque falta el secret `CRON_SECRET` en GitHub.

## ✅ Solución

### 1. Obtener el valor del secret

El `CRON_SECRET` debe ser **el mismo** que tienes en tu `.env.local` de Vercel.

**Opción A**: Si ya lo tienes en `.env.local`:
```bash
# Ver el valor (NO lo compartas públicamente)
cat .env.local | grep CRON_SECRET
```

**Opción B**: Si no existe, genera uno nuevo:
```bash
# Generar un secret aleatorio fuerte
openssl rand -hex 32
```

### 2. Configurar en GitHub

1. Ve a tu repositorio: **https://github.com/danielhdz2-ai/inmonest**
2. Click en **Settings** (⚙️ arriba derecha)
3. En el menú izquierdo: **Secrets and variables** → **Actions**
4. Click en **New repository secret**
5. Configura:
   - **Name**: `CRON_SECRET`
   - **Value**: `[pega aquí el valor de tu .env.local]`
6. Click en **Add secret**

### 3. Configurar en Vercel (si no lo tienes)

Si el secret no existe en tu `.env.local`, agrégalo también en Vercel:

1. Ve a **https://vercel.com/danielhdz2-ai/inmonest/settings/environment-variables**
2. Agrega nueva variable:
   - **Key**: `CRON_SECRET`
   - **Value**: `[el mismo valor que pusiste en GitHub]`
   - **Environments**: Production, Preview, Development
3. Click en **Save**
4. **Redeploy** la aplicación para que tome efecto

### 4. Verificar que funciona

Después de configurar el secret:

1. Ve a **Actions** en GitHub
2. Selecciona el workflow `🔔 Enviar Alertas de Búsqueda`
3. Click en **Run workflow** (botón derecho)
4. Revisa que se ejecute sin errores

## 📋 Checklist de Secrets Necesarios

Estos son todos los secrets que tus workflows necesitan:

| Secret | Workflow | Estado | Descripción |
|--------|----------|--------|-------------|
| `CRON_SECRET` | alertas.yml | ❌ **FALTA** | Autenticación para crons |
| `SUPABASE_URL` | scrapers.yml, limpieza-semanal.yml | ✅ | URL de Supabase |
| `SUPABASE_SERVICE_KEY` | scrapers.yml, limpieza-semanal.yml | ✅ | Service role key |

## 🔒 Seguridad

**NUNCA** hagas commit de estos valores en el código. Los secrets deben estar:

- ✅ En GitHub Secrets (para Actions)
- ✅ En Vercel Environment Variables (para la app)
- ✅ En tu `.env.local` (solo local, NO en git)
- ❌ NUNCA en archivos públicos o commits

## 📊 Resultado Esperado

Una vez configurado correctamente:

```bash
✅ Workflow ejecuta sin errores
✅ Endpoint responde 200 OK
✅ Usuarios reciben emails de alertas
✅ Logs muestran: "X alertas procesadas, Y emails enviados"
```

## ⚠️ Troubleshooting

### Error 401: No autorizado
- El `CRON_SECRET` en GitHub no coincide con el de Vercel
- Verifica que sean exactamente iguales (case-sensitive)

### Error 500: Error interno
- Revisa logs en Vercel: https://vercel.com/danielhdz2-ai/inmonest/logs
- Posibles causas:
  - `RESEND_API_KEY` no configurada
  - `SUPABASE_SERVICE_ROLE_KEY` incorrecta
  - Error en la base de datos

### Workflow sigue fallando
- Espera 1-2 minutos después de configurar el secret
- Ejecuta manualmente: **Actions** → **Run workflow**
- Si persiste, revisa los logs del workflow en GitHub Actions
