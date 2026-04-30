# ============================================================================
# GUÍA: Configurar Notificaciones Push
# ============================================================================

## 1. INSTALAR DEPENDENCIAS

```bash
npm install web-push
```

## 2. GENERAR VAPID KEYS (Solo Primera Vez)

⚠️ **IMPORTANTE**: Cada proyecto debe tener sus propias VAPID keys únicas. NO reutilices keys de ejemplo.

```bash
npx web-push generate-vapid-keys
```

Esto genera:
- **Public Key**: Para el cliente (navegador)
- **Private Key**: Para el servidor (¡MANTENER SECRETA!)

## 3. CONFIGURAR VARIABLES DE ENTORNO

Añade las keys generadas a `.env.local`:

```bash
# Frontend (Public) - Reemplaza con tu Public Key generada
NEXT_PUBLIC_VAPID_PUBLIC_KEY=TU_PUBLIC_KEY_AQUI

# Backend (Private) - ⚠️ ¡NUNCA COMPARTAS ESTA! ⚠️
# ¡NO la subas a Git! ¡NO la pongas en .env.example!
VAPID_PRIVATE_KEY=TU_PRIVATE_KEY_AQUI
```

⚠️ **CRÍTICO DE SEGURIDAD**:
- Las VAPID keys son como contraseñas
- La private key NUNCA debe estar en código público
- Genera keys ÚNICAS para cada entorno (desarrollo, producción)

También en **Vercel → Settings → Environment Variables**:
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` (Production + Preview)
- `VAPID_PRIVATE_KEY` (Production + Preview)

## 4. CREAR TABLA EN SUPABASE

Ejecuta la migración `1000_create_push_subscriptions.sql` en **Supabase Dashboard → SQL Editor**:

```sql
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, endpoint)
);
```

## 5. CREAR ICONOS PARA NOTIFICACIONES

Crea los siguientes archivos en `/public`:

- `icon-192x192.png` - Icono de la notificación (192x192px)
- `badge-72x72.png` - Badge pequeño (72x72px)

Pueden ser el logo de Inmonest en formato PNG.

## 6. REGISTRAR SERVICE WORKER

El Service Worker (`/public/sw.js`) ya está creado.

Para registrarlo automáticamente en toda la app, añade esto a `src/app/layout.tsx`:

```tsx
'use client'

useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => console.log('✅ Service Worker registrado'))
      .catch((err) => console.error('❌ Error registrando SW:', err))
  }
}, [])
```

## 7. INTEGRAR EN LA UI

### Opción A: Página de configuración

Añade el componente `<PushNotificationSettings />` en:
- `/mi-cuenta/ajustes` (si existe)
- `/mi-cuenta/notificaciones` (página dedicada)

```tsx
import PushNotificationSettings from '@/components/PushNotificationSettings'

export default function NotificacionesPage() {
  return (
    <div>
      <h1>Notificaciones</h1>
      <PushNotificationSettings />
    </div>
  )
}
```

### Opción B: Modal/Banner promocional

Muestra un banner la primera vez que el usuario inicia sesión:

```tsx
const { subscribe } = usePushNotifications()

<div className="bg-amber-50 p-4 rounded-xl">
  <p>🔔 ¿Quieres recibir alertas de nuevos mensajes?</p>
  <button onClick={subscribe}>Activar notificaciones</button>
</div>
```

## 8. PROBAR LOCALMENTE

### Paso 1: Iniciar servidor de desarrollo
```bash
npm run dev
```

### Paso 2: Activar notificaciones
1. Abre `http://localhost:3000`
2. Inicia sesión
3. Ve a la página con `<PushNotificationSettings />`
4. Activa el toggle
5. Acepta el permiso del navegador

### Paso 3: Enviar mensaje de prueba
1. Envía un mensaje desde otra cuenta
2. Deberías recibir una notificación push

### Debugging:
```javascript
// En la consola del navegador:
navigator.serviceWorker.ready.then(reg => 
  reg.pushManager.getSubscription().then(sub => console.log(sub))
)
```

## 9. DESPLEGAR A PRODUCCIÓN

```bash
git add -A
git commit -m "feat: notificaciones push"
git push origin main
```

Vercel desplegará automáticamente.

### Verificar en Vercel:
1. Settings → Environment Variables
2. Verificar `NEXT_PUBLIC_VAPID_PUBLIC_KEY` y `VAPID_PRIVATE_KEY`

## 10. PERMISOS HTTPS

⚠️ **IMPORTANTE**: Las notificaciones push **SOLO funcionan en HTTPS**.

- ✅ Producción (`https://inmonest.com`) - OK
- ✅ Localhost (`http://localhost:3000`) - OK (excepción)
- ❌ HTTP en producción - NO funciona

## 11. CASOS DE USO IMPLEMENTADOS

### ✅ Nuevo mensaje
Automático en `/api/mensajes/[id]/route.ts`

### ❌ Nuevo favorito (Pendiente)
Añadir en `/api/favoritos/route.ts`:
```tsx
import { notifyNewFavorite } from '@/lib/push-notifications'

// Al marcar favorito:
notifyNewFavorite(listing.owner_id, listing.title, listing.id)
```

### ❌ Alerta de búsqueda (Pendiente)
Añadir en `/api/cron/alertas/route.ts`:
```tsx
import { notifyNewAlert } from '@/lib/push-notifications'

// Al encontrar coincidencias:
notifyNewAlert(userId, matchCount, searchName)
```

## 12. MONITOREO

### Ver suscripciones activas:
```sql
SELECT 
  user_id, 
  COUNT(*) as devices,
  MAX(created_at) as last_subscribed
FROM push_subscriptions
GROUP BY user_id
ORDER BY last_subscribed DESC;
```

### Limpiar suscripciones antiguas (>90 días):
```sql
DELETE FROM push_subscriptions 
WHERE created_at < NOW() - INTERVAL '90 days';
```

## 13. TROUBLESHOOTING

### Error: "Notification permission denied"
- El usuario debe aceptar el permiso manualmente
- Si lo denegó, debe ir a configuración del navegador y habilitarlo

### Error: "Service Worker registration failed"
- Verificar que `/public/sw.js` existe
- Verificar consola del navegador para errores de syntax

### Error: "Push subscription failed"
- Verificar `NEXT_PUBLIC_VAPID_PUBLIC_KEY` en frontend
- Verificar que es la misma key que `VAPID_PRIVATE_KEY` en backend

### Notificaciones no llegan:
- Verificar tabla `push_subscriptions` tiene registros
- Verificar logs de servidor para errores
- Verificar que el Service Worker está activo: `chrome://serviceworker-internals/`

## 14. LÍMITES Y QUOTAS

- **Chrome**: Sin límite de suscripciones
- **Firefox**: Sin límite de suscripciones
- **Safari iOS**: Soportado desde iOS 16.4+ (Marzo 2023)
- **Safari macOS**: Soportado desde macOS Ventura

⚠️ **Nota**: Las notificaciones push tienen una tasa de entrega del ~95%. Algunas pueden perderse si el dispositivo está offline o el navegador cerrado.

## 15. RECURSOS

- [Web Push Spec](https://www.w3.org/TR/push-api/)
- [web-push library](https://github.com/web-push-libs/web-push)
- [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

============================================================================
