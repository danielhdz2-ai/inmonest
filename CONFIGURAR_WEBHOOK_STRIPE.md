# 🔔 Configurar Webhook de Stripe para Gestoría

## ⚠️ PROBLEMA ACTUAL

Las ventas de gestoría **NO se están guardando automáticamente** en la base de datos. 

**Evidencia:**
- ✅ Email de notificación de venta recibido (Mónica Pérez - 145€)
- ❌ La venta NO aparece en el panel de admin
- ❌ Solo 1 de 4 ventas está en la DB según el diagnóstico

**Causa:** El webhook de Stripe no está configurado o no está funcionando.

---

## 🔧 SOLUCIÓN: Configurar Webhook en Stripe

### Paso 1: Ir a Stripe Dashboard

1. Inicia sesión en [Stripe Dashboard](https://dashboard.stripe.com)
2. Ve a **Developers** → **Webhooks**
3. Haz clic en **Add endpoint** (Agregar endpoint)

### Paso 2: Configurar el Endpoint

**URL del webhook:**
```
https://inmonest.com/api/webhooks/stripe
```

**Eventos a escuchar:**
Selecciona solo este evento:
- ✅ `checkout.session.completed`

**Descripción (opcional):**
```
Webhook de gestoría - guarda ventas en gestoria_requests
```

### Paso 3: Obtener el Signing Secret

1. Después de crear el endpoint, Stripe te mostrará un **Signing secret** (whsec_...)
2. Copia este secret

### Paso 4: Configurar en Vercel/Railway

1. Ve a tu plataforma de hosting (Vercel o Railway)
2. Encuentra las **variables de entorno** del proyecto
3. Busca la variable `STRIPE_WEBHOOK_SECRET`
4. **Actualiza su valor** con el nuevo signing secret que copiaste
5. Codifícalo en base64:
   ```
   b64:TU_SIGNING_SECRET_AQUI
   ```

**Ejemplo:**
```env
STRIPE_WEBHOOK_SECRET=b64:d2hzZWNfVEhyQzdtcFYw...
```

6. **Guarda** y **redeploy** la aplicación

### Paso 5: Probar el Webhook

1. En Stripe Dashboard → Webhooks → Tu endpoint
2. Haz clic en **Send test webhook**
3. Selecciona `checkout.session.completed`
4. Envía el evento de prueba
5. Verifica que el estado sea **Succeeded** (200 OK)

---

## 📊 Verificar que Funciona

### Opción 1: Hacer una venta de prueba

1. Ve a https://inmonest.com/gestoria
2. Solicita un servicio barato (ej: Reserva de Alquiler - 61€)
3. Completa el pago con la tarjeta de prueba:
   - **Número:** 4242 4242 4242 4242
   - **Fecha:** Cualquier fecha futura
   - **CVC:** Cualquier 3 dígitos
4. Espera 1-2 minutos
5. Revisa el panel de admin - debería aparecer automáticamente

### Opción 2: Verificar los logs

**En Stripe:**
1. Dashboard → Webhooks → Tu endpoint
2. Ve a la pestaña **Recent deliveries**
3. Deberías ver eventos con estado 200 (éxito)

**En Vercel/Railway:**
1. Ve a los **logs** de tu aplicación
2. Busca `[webhooks/stripe]`
3. Deberías ver mensajes como:
   ```
   [webhooks/stripe] Evento verificado: checkout.session.completed
   [webhooks/stripe] gestoria_requests guardado OK
   [webhooks/stripe] Email enviado OK
   ```

---

## 🛠️ Solución Temporal: Sincronizar Ventas Manualmente

Mientras configuras el webhook, puedes sincronizar las ventas faltantes:

```powershell
cd "c:\Users\Daniel HDZ\Desktop\Proyectos\Inmonest\inmonest"
npx dotenv-cli -e .env.local npx tsx scripts/sync-stripe-to-db.mts
```

Este script:
- ✅ Importa todas las ventas de Stripe que no están en la DB
- ✅ Excluye las ventas de prueba automáticamente
- ✅ No duplica ventas existentes

---

## 📝 Checklist de Configuración

- [ ] Webhook creado en Stripe Dashboard
- [ ] URL correcta: `https://inmonest.com/api/webhooks/stripe`
- [ ] Evento seleccionado: `checkout.session.completed`
- [ ] Signing secret copiado
- [ ] Variable `STRIPE_WEBHOOK_SECRET` actualizada en Vercel/Railway
- [ ] Aplicación redesplegada
- [ ] Webhook de prueba enviado exitosamente
- [ ] Venta de prueba procesada correctamente
- [ ] Ventas aparecen en el panel de admin automáticamente

---

## 🆘 Troubleshooting

### El webhook devuelve error 400 "Firma inválida"

**Causa:** El signing secret no está configurado correctamente.

**Solución:**
1. Verifica que hayas copiado el **signing secret completo** (empieza con `whsec_`)
2. Asegúrate de codificarlo en base64: `b64:whsec_...`
3. Redespliega la aplicación después de cambiar la variable

### El webhook devuelve error 500

**Causa:** Error en la base de datos o en el código del webhook.

**Solución:**
1. Revisa los logs en Vercel/Railway para ver el error específico
2. Verifica que la tabla `gestoria_requests` existe en Supabase
3. Verifica que las columnas necesarias existen (session_id, service_key, etc.)

### Las ventas se guardan pero sin información del cliente

**Causa:** Los metadatos de Stripe no se están pasando correctamente.

**Solución:**
1. Verifica que el formulario de gestoría esté pasando los metadatos al crear la sesión de Stripe
2. Revisa el archivo `src/app/api/stripe/create-checkout/route.ts`

---

## 📞 Soporte

Si tienes problemas con la configuración, revisa:
1. Logs de Vercel/Railway: busca `[webhooks/stripe]`
2. Logs de Stripe: Dashboard → Webhooks → Recent deliveries
3. Script de diagnóstico: `scripts/check-stripe-sales.mts`
