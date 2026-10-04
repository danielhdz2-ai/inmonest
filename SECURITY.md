# Seguridad y respuesta a incidentes — Inmonest

Documento interno operativo (no sustituye asesoría legal).

## Contacto

- **Operaciones / seguridad:** info@inmonest.com
- **Infraestructura:** Vercel + Supabase (panel de cada proveedor)

## Notificación de brechas de datos (RGPD art. 33–34)

Plazo: **72 horas** desde el conocimiento del incidente para notificar a la AEPD si hay riesgo para derechos y libertades.

### 1. Detección y contención (0–4 h)

1. Confirmar si hay acceso no autorizado, exfiltración o pérdida de datos personales.
2. Contener: rotar claves comprometidas (`SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_*`, `CRON_SECRET`, etc.).
3. Preservar evidencias (logs Vercel, Supabase, Stripe) sin alterar más de lo necesario.

### 2. Evaluación (4–24 h)

- Qué categorías de datos (cuentas, DNI en gestoría, pagos, mensajes).
- Cuántos afectados (orden de magnitud).
- Si el riesgo para las personas es **bajo** (puede no requerir notificación a AEPD — documentar la decisión).

### 3. Notificación AEPD (≤ 72 h)

- Canal: [sede electrónica AEPD](https://www.aepd.es) — notificación de brecha de seguridad.
- Incluir: naturaleza de la brecha, categorías y volumen aproximado, posibles consecuencias, medidas adoptadas.

### 4. Comunicación a interesados (art. 34)

Si hay **alto riesgo** para derechos y libertades: email claro a usuarios afectados (qué pasó, qué datos, qué hacer, contacto).

### 5. Post-mortem (≤ 7 días)

- Causa raíz, acciones correctivas, revisión RLS/API keys, actualizar este runbook si aplica.

## Variables legales LSSI (producción)

Configurar en Vercel:

- `INMONEST_LEGAL_NIF`
- `INMONEST_LEGAL_ADDRESS`
- `INMONEST_LEGAL_REGISTRY` (datos Registro Mercantil, si procede)
- `INMONEST_LEGAL_PHONE` (opcional; por defecto +34 745 022 862)

## Migraciones RGPD

- `046_consent_log.sql` — ejecutar en Supabase antes de confiar en el registro de consentimientos de cookies.
