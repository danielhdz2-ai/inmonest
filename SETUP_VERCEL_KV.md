# Configurar Rate Limiting con Vercel Upstash Redis Integration

## ✅ SIN NECESIDAD DE TARJETA DE CRÉDITO - PLAN FREE

### Paso 1: Agregar Integración desde Vercel Dashboard

1. Ve a tu proyecto en **Vercel Dashboard**
2. Click en **"Storage"** (sidebar izquierdo)
3. O ve directamente a: https://vercel.com/dashboard/stores
4. Click en **"Create Database"**
5. Selecciona **"Upstash Redis"** (logo rojo)
6. Click **"Continue"**

### Paso 2: Configurar Database

1. **Database Name**: `inmonest-redis` (o el que prefieras)
2. **Plan**: Selecciona **"Free"** (10,000 comandos/día)
   - ✅ Sin tarjeta de crédito
   - ✅ 10,000 requests/día
   - ✅ 256 MB storage
3. **Primary Region**: Selecciona **Europe (Ireland)** o la más cercana
4. Click **"Create"**

### Paso 3: Conectar a Proyecto

1. Después de crear, verás la pantalla "Connect to Project"
2. Selecciona tu proyecto **"inmonest"**
3. Selecciona environment: **Production** + **Preview** + **Development**
4. Click **"Connect Store"**

### Paso 4: Verificar Variables

Vercel configurará automáticamente estas variables en tu proyecto:

```bash
KV_REST_API_URL=https://XXXXX.upstash.io
KV_REST_API_TOKEN=AXX...
KV_REST_API_READ_ONLY_TOKEN=AXX...
```

Para verificar:
1. Ve a **Settings** → **Environment Variables**
2. Deberías ver las 3 variables `KV_*` configuradas

### Paso 5: Re-deploy (Opcional)

Si el proyecto ya está desplegado, haz un re-deploy para que tome las nuevas variables:

```bash
git commit --allow-empty -m "trigger redeploy for KV vars"
git push origin main
```

O desde Vercel Dashboard: **Deployments** → Click en el último → **⋮** → **Redeploy**

---

## ✅ LISTO

El rate limiting ya funcionará automáticamente. Las variables `KV_REST_API_URL` y `KV_REST_API_TOKEN` son detectadas por [src/lib/rate-limit.ts](src/lib/rate-limit.ts).

## Límites del Plan Free

- **10,000 comandos/día** (aprox. 1,000-2,000 requests según configuración)
- **256 MB storage**
- **Max request size**: 1 MB
- **Max response size**: 1 MB

Para un MVP esto es más que suficiente. Si creces, puedes actualizar a plan **Pro** (3,000,000 comandos/mes por $10).

## Troubleshooting

### No veo las variables KV_* en Vercel

1. Ve a **Storage** → Verifica que la database está conectada
2. Desconecta y reconecta el proyecto
3. Verifica que seleccionaste todos los environments (Production + Preview + Development)

### Rate limiting no funciona

1. Verifica en logs de Vercel que las variables están cargadas:
   ```bash
   vercel logs
   ```
2. Busca errores relacionados con Redis
3. Verifica que el plan Free no esté agotado (10k comandos/día)

### ¿Cómo veo el uso de Redis?

1. Ve a **Vercel Dashboard** → **Storage**
2. Click en tu database Redis
3. Verás gráficas de **Daily Requests** y **Storage**

---

## Alternativa: Upstash Directo

Si prefieres crear cuenta directamente en Upstash (mismo proveedor):

1. Ve a https://console.upstash.com/redis
2. Crea cuenta (GitHub OAuth más rápido)
3. Click **"Create Database"**
4. Selecciona **región Europe** y plan **Free**
5. Copia **REST URL** y **REST Token**
6. Añádelos manualmente a Vercel:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

El código detectará automáticamente cuál usar (prioriza `KV_REST_API_*`).
