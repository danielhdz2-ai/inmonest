# Inmonest — Análisis del Proyecto y Auditoría de Seguridad / Privacidad / Cookies

> **Fecha:** Octubre 2026
> **Alcance:** Auditoría completa del proyecto Inmonest (`inmonest.com`) — gestoría inmobiliaria online + portal de particulares.
> **Objetivo:** Detectar huecos críticos (seguridad, privacidad, cumplimiento LSSI/RGPD) y priorizar el roadmap de implementación.

---

## 1. Resumen ejecutivo del proyecto

**Inmonest** es un proyecto web en producción (`https://inmonest.com`) con dos líneas de negocio conviviendo bajo el mismo dominio:

1. **Gestoría inmobiliaria online** — redacción y revisión de contratos (arras, alquiler LAU, compraventa, rescisión, due diligence, etc.) con entrega en 48 h y precios desde 61 €. Genera el grueso de ingresos actuales (Stripe ya integrado).
2. **Portal de particulares** (`/pisos`) — buscador y publicación de anuncios de particulares sin comisión, con modelo de monetización (Turbo, Pack Visibilidad) y scraping de portales externos.

**Stack técnico:** Next.js 16.2 (App Router) + React 19 + Supabase (Auth + Postgres + Storage) + Vercel + Stripe + Resend + Gemini/OpenAI/OpenRouter + Upstash (rate limit) + Cloudflare Turnstile (anti-bot) + GTM/GA + PWA + Service Worker + Playwright/Puppeteer (scrapers).

**Madurez observada:** el proyecto está **funcionalmente muy maduro** (45 migraciones SQL, ~80 páginas, landings SEO por ciudad/servicio, scrapers, sistema de leads, etc.) pero **presenta incumplimientos legales explotables AHORA MISMO en producción**. Esto es lo que se aborda en las secciones 3–6.

---

## 2. Lo que el proyecto ya hace bien (fortalezas)

| Área | Implementación actual |
|---|---|
| **Auth** | Supabase Auth con cookies httpOnly gestionadas vía `@supabase/ssr`; magic link + Google/Facebook/Apple OAuth |
| **Autorización** | RLS activo en `profiles`, `listings`, `listing_images`, `listing_contacts`, `listing_views`, `orders`, `contract_generations`, `gestoria_requests`, etc. |
| **Admin** | Panel `/admin` protegido por whitelist de emails (`isAdminEmail()`) + verificación server-side con `getUser()` y cliente con `service_role` para bypass de RLS |
| **Rate limiting** | Upstash en login, contacto, publicación, gestoría, leads, scraping, API autenticada y API pública |
| **Bot protection** | Honeypot + Turnstile en formularios de lead, calculadoras y gestoría; bloqueo de GPTBot/Claude/CCBot/etc. en middleware |
| **SSRF** | `/api/img-proxy` valida HTTPS, bloquea IPs privadas y metadata cloud (169.254.169.254) |
| **Pagos** | Stripe Checkout con webhooks; no se almacenan PAN |
| **Almacenamiento** | Bucket `listings` con políticas de INSERT (auth), SELECT (público) y UPDATE/DELETE restringido a `auth.uid()` |
| **Scrapeo legal** | Bloqueo `noai, noimageai` en cabeceras de rutas públicas (robots semánticos anti-entrenamiento IA) |
| **SEO** | Metadata dinámica, sitemap con ~1500 URLs, robots.txt, schema Organization/LegalService, canonical, OG, redirects 301/308, breadcrumbs |
| **Privacidad de datos** | Tabla `email_logs` para trazabilidad de envíos; `notification_preferences` para granularidad |
| **Cron endpoints** | Protegidos con `CRON_SECRET` (Bearer) |
| **Service Worker** | Registro de SW propio, push notifications, cache offline para `/`, `/pisos`, `/gestoria` |

**Veredicto:** la base técnica es sólida. El problema está en la capa legal/de cumplimiento.

---

## 3. Incumplimientos críticos detectables hoy

### 🔴 CRÍTICO 1 — Carga de Google Tag Manager SIN consentimiento (RGPD/LSSI-CE)

**Evidencia:** `src/app/layout.tsx:147-153`

```tsx
<Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `(function(w,d,s,l,i){...j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;...})(...);`,
}} />
```

GTM (`GTM-57Q8NRVN`) se inyecta **en todas las páginas** sin esperar al consentimiento. Esto significa:

- Cookies de Google Analytics + GTM (`_ga`, `_gat`, `_gid`, `_gtm_*`, `_gcl_au`) se instalan **antes** de que el usuario acepte.
- Hay `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=...">` también sin consentimiento (`layout.tsx:138-143`).
- Existe `/cookies` declarando que estas cookies **requieren consentimiento** (`src/app/cookies/page.tsx:81`), lo que agrava el incumplimiento por contradicción documental.

**Riesgo legal:** sanción de hasta 20 M€ o 4 % del volumen de negocio anual (RGPD art. 83.5). En España, la AEPD ha multado reiteradamente por este patrón. Una denuncia de un usuario (o un control de la AEPD en una campaña sectorial) es suficiente.

**Solución propuesta (orden de trabajo):**

1. Crear componente `CookieConsent` que renderice un banner en el primer load, bloquee el render hasta decisión, y guarde preferencia en cookie `inmonest_consent` (técnica, no exime del bloqueo de GTM).
2. Envolver el `<Script id="gtm">` en una condición `consent === 'granted'` y mover el `noscript` de GTM al mismo flujo.
3. Implementar `gtag('consent', 'default', { analytics_storage: 'denied' })` y actualizar a `'granted'` solo tras aceptar.
4. Botones obligatorios: "Aceptar todas", "Rechazar todas", "Configurar" (granular). Por defecto todo denegado.
5. Registrar el consentimiento en BD/log (cumple con la obligación de prueba del RGPD).
7. Política de cookies debe pasar a llamarse "Política de cookies y tecnologías similares" e incluir listado completo (incluidas las de sesión `sb-*` que ahora se mencionan pero sin detallar proveedor Supabase).
8. Botón flotante permanente en footer para revisar/cambiar preferencias.

> **Recomendación librería:** CookieConsent de Osano o `vanilla-cookieconsent` (MIT, gratis, sin tracking). Evitar Cookiebot/Cookie-Script si no hay presupuesto (60 €/mes mínimo).

---

### 🔴 CRÍTICO 2 — Aviso Legal incompleto (LSSI art. 10)

**Evidencia:** `src/app/aviso-legal/page.tsx:29-33`

```
Denominación social: Inmonest
Nombre comercial:    Inmonest
Correo electrónico:  info@inmonest.com
Sitio web:           https://inmonest.com
```

**Faltan campos OBLIGATORIOS por el art. 10 LSSI:**

- ❌ **NIF/CIF** (obligatorio)
- ❌ **Domicilio social** (calle, número, código postal, municipio, provincia)
- ❌ **Datos de inscripción en el Registro Mercantil** (registro, tomo, libro, folio, hoja)
- ❌ **Número de teléfono** de contacto (recomendado por la AEPD, no obligatorio pero sí habitual)
- ❌ **Autorización administrativa** si la actividad lo requiere (en gestoría inmobiliaria depende de la comunidad autónoma; Cataluña requiere colegiación para "gestor" en sentido estricto)

**Riesgo legal:** infracción leve/grave de la LSSI; las páginas de aterrizaje con elementos comerciales también deben identificar al titular en lugar visible (no enterrado en un footer link).

**Solución:**

1. Completar el aviso legal con los datos reales de la empresa (NIF, dirección, registro).
3. Añadir `schema.org/Organization` con `address` postal **completo** (ahora en `OrganizationSchema.tsx:23-26` solo pone `addressCountry: 'ES'`).
4. Si operáis como sociedad, mover a SL/SLNE y reflejarlo; si sois autónomo, especificar NIF + régimen.

---

### 🟠 IMPORTANTE 1 — Política de Privacidad mejorable (RGPD/LOPDGDD)

**Evidencia:** `src/app/privacidad/page.tsx`

Está bastante completa pero le faltan detalles y un canal formal:

| Punto | Estado |
|---|---|
| Responsable identificado | ✅ |
| Datos que se recopilan | ✅ |
| Finalidad y base jurídica | ✅ |
| Destinatarios (encargados) | ✅ — falta Cloudflare (Turnstile), Anthropic/OpenAI (IA), Twilio/Resend |
| Transferencias internacionales | ⚠️ Menciona EU-US DPF para Google, pero no aclara para OpenAI/Stripe/Resend |
| Plazo de conservación | ⚠️ "30 días" sin precisar por tipo de dato |
| Derechos (ARCO-POL) | ✅ |
| **Delegado de Protección de Datos (DPD/DPO)** | ❌ Si tratáis datos a gran escala o de categorías especiales, RGPD art. 37 obliga |
| **Reclamación ante AEPD** | ✅ |
| **Cómo ejercer los derechos** (procedimiento concreto, formulario) | ⚠️ Solo email; falta canal/URL de formulario |
| **Decisiones automatizadas / IA** | ❌ Usáis IA para generar descripciones y chat — RGPD art. 22 obliga a informar |
| **Categorías de datos (especiales)** | ⚠️ Si tratáis DNI (vistos en `GestoriaDniUpload.tsx`), debéis informar |
| **Perfilado** | ❌ Idem |

**Solución:**

1. Crear endpoint `/api/derechos-ARCO` o panel `/mi-cuenta/privacidad` (parece que ya existe `PrivacidadDatosPanel.tsx`) — verificar que está enlazado desde la página de privacidad.
3. Informar del uso de IA para generación de descripciones y para el chat de soporte: derecho a no ser objeto de decisión automatizada.
4. Ampliar destinatarios: añadir Cloudflare (Turnstile), Google AI / OpenAI / Anthropic / OpenRouter (modelos IA), Supabase (subprocesadores).
5. Añadir espacio para "decisiones individuales automatizadas" en el cuadro de finalidades.
6. Si tratáis >5000 personas/año o datos especiales (DNI, cuentas bancarias), **nombrar un DPD o justificar la exención** (art. 37.1.c RGPD).

---

### 🟠 IMPORTANTE 2 — Política de Cookies incompleta y desalineada

**Evidencia:** `src/app/cookies/page.tsx`

- ❌ **No menciona cookies técnicas de sesión** (Supabase) con detalle suficiente: `sb-*-auth-token` (tipo, duración exacta, proveedor).
- ❌ **No menciona Push Notifications** (VAPID) si las usáis.
- ❌ **No menciona Cloudflare Turnstile** (que pone cookie `cf_clearance` o `__cf_bm`).
- ❌ **No menciona Service Worker** como tecnología similar (LSSI-CE incluye el concepto "tecnologías similares" desde 2018).
- ❌ **No menciona Cloudflare** como encargado si pasa por su CDN/WAF.
- ❌ **No menciona el pixel de Stripe** que pone cookies en el checkout.
- ❌ **No tiene lista de TODOS los subdominios/dominios de terceros** que pueden setear cookies (Google, Stripe, Supabase, Resend, Turnstile, Cloudflare, etc.).
- ⚠️ El cuadro dice "Google Analytics vía GTM" pero el código carga `gtm.js` con cualquier etiqueta que esté configurada en GTM, no solo GA — **lo que declare GTM debe estar declarado en la política**.

**Solución:** tabla exhaustiva con: nombre, tipo, finalidad, duración exacta, proveedor (con enlace a su política), y si se transfiere fuera del EEE.

---

### 🔴 CRÍTICO 3 — Ausencia de cabeceras de seguridad HTTP

**Evidencia:** `next.config.ts` (no tiene `headers()`), `vercel.json:22-50` (solo Cache-Control + X-Robots-Tag).

Falta **toda** la capa de seguridad de transporte/cabeceras. Esto incluye:

| Cabecera | Estado | Impacto |
|---|---|---|
| `Strict-Transport-Security` (HSTS) | ❌ | Sin forzar HTTPS |
| `Content-Security-Policy` (CSP) | ❌ | Vulnerable a XSS, sin control de orígenes |
| `X-Content-Type-Options: nosniff` | ❌ | MIME sniffing |
| `X-Frame-Options` / `frame-ancestors` | ❌ | Clickjacking |
| `Referrer-Policy` | ❌ default a `strict-origin-when-cross-origin` (browsers) | Pierde control de fugas de referrer |
| `Permissions-Policy` | ❌ | Sin restricción de APIs (cámara, micro, geolocalización, USB…) |
| `Cross-Origin-*` (COOP/COEP/CORP) | ❌ | Sin aislamiento cross-origin |
| `X-XSS-Protection` | ❌ | (deprecated, pero recomendado para legacy) |

**Riesgo:** vuln XSS en cualquier input de usuario (formularios, descripciones, títulos) podría exfiltrar sesión. HSTS es el suelo mínimo hoy día — la AEPD también lo valora en auditorías.

**Solución (siguiente sección).**

---

### 🟠 IMPORTANTE 3 — Otros hallazgos de seguridad

| # | Hallazgo | Severidad | Archivo / línea |
|---|---------|----------|----------------|
| a | El middleware confía en `x-forwarded-for` para `getIP()` — correcto en Vercel pero peligroso si alguna vez se mueve | Media | `src/lib/rate-limit.ts:131-144` |
| b | `AUTH_HEADER.split(' ')[1]?.slice(0, 10)` para identificar usuarios en rate limit: si dos usuarios comparten prefijo colisionan en cuota | Baja | `src/middleware.ts:142` |
| c | El chat (`/api/chat`) y otros endpoints internos no aparecen revisados — falta ver listado de handlers POST/GET y validar tamaño de payload | Media | (pendiente revisar) |
| d | `src/components/ChatWidget.tsx` y otros llaman a `gtmPush` — correcto, pero asegura que el consentimiento de cookies bloquea el push | Media | varios |
| e | No hay validación de `Content-Length` ni body size limit explícito en middleware → potencial DoS por payloads enormes | Media | `src/middleware.ts` |
| f | El Service Worker cachea respuestas sin lógica de stale/error (`sw.js:34-44`) — ok para offline pero **no invalida al cambiar versión de assets** si no se cambia `CACHE_NAME` | Baja | `public/sw.js` |
| g | `VAPID_PRIVATE_KEY` y otras claves privadas en `.env.local` — bien ignorado por git, pero el repo tiene `.env.production.vercel` con claves de Vercel | Media | confirmar que Vercel Secrets cubre todo |
| h | `dump` de DB en `scripts/run-seed.bat` ignorado — bien. `*.sql` ignorado también | OK | `.gitignore:59` |
| i | `claude-batch-input.json` y `claude-batch-output.json` en raíz — **NO ignorados**, podrían contener datos sintéticos pero es mala higiene. Revisar si tienen secretos | Media | raíz |

---

### 🟡 MENOR — Mejoras de cumplimiento

| # | Hallazgo |
|---|---------|
| 1 | No hay **registro de actividades de tratamiento** (art. 30 RGPD) — recomendable aunque no obligatorio si < 250 empleados |
| 2 | No hay **análisis de impacto (AIA/DPIA)** para el tratamiento con IA de datos personales en generación de descripciones |
| 3 | No hay **procedimiento de notificación de brechas** documentado interno — la página `/seguridad` lo promete al usuario pero no hay runbook interno |
| 4 | Formularios: **no se ve checkbox de aceptación de la política de privacidad** explícito antes del submit (obligatorio LSSI-CE art. 5 y RGPD) — revisar `LeadCaptureForm.tsx`, `GestoriaPideInfoForm.tsx` |
| 5 | **No hay "modo oscuro" / banner de no rastrear** declarado |
| 6 | El sitio expone `tel:+34745022862` en JSON-LD y en middleware — bien que esté visible, **pero** debe existir como línea de atención al cliente formal en el aviso legal |

---

## 4. Lo que falta para privacidad/seguridad — PLAN DE IMPLEMENTACIÓN

### Fase 0 (1–2 días) — apagar el incendio legal

| Tarea | Esfuerzo | Riesgo si no se hace |
|---|---|---|
| 0.1 Bloquear GTM/GA hasta consentimiento (sin banner: denegar por defecto + publicar banner) | 0.5 d | **Multa AEPD segura** |
| 0.2 Banner de consentimiento con rechazo | 1 d | Idem |
| 0.3 Política de cookies ampliada | 0.5 d | Idem |
| 0.4 Aviso legal con NIF + domicilio social + Registro Mercantil | 0.5 d | Infracción LSSI |

### Fase 1 (3–5 días) — cabeceras de seguridad

Bloque a añadir en `next.config.ts` (función `headers()`):

```ts
async headers() {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com",
    // ⚠️ unsafe-inline solo si usas next/script con dangerouslySetInnerHTML para GTM
    // Mejor migrar GTM a un endpoint propio /api/gtm-init que sí podemos controlar
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://*.analytics.google.com https://api.stripe.com",
    "frame-src https://js.stripe.com https://hooks.stripe.com https://www.google.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  return [{
    source: '/:path*',
    headers: [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Content-Type-Options',     value: 'nosniff' },
      { key: 'X-Frame-Options',             value: 'DENY' },
      { key: 'Referrer-Policy',             value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy',          value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
      { key: 'Content-Security-Policy',     value: csp },
      { key: 'Cross-Origin-Opener-Policy',  value: 'same-origin' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
    ],
  }];
}
```

> ⚠️ Antes de activar CSP en estricto (sin `unsafe-inline`), auditar todos los componentes que usan `dangerouslySetInnerHTML` para estilos/scripts y todos los `style={{...}}` inline (Tailwind v4 los compila, debería estar limpio). También Stripe.js inyecta iframe — añadir a `frame-src`.

### Fase 2 (1 semana) — panel de privacidad de usuario + RGPD completo

| Tarea |
|---|
| Verificar que `PrivacidadDatosPanel.tsx` está enlazado desde `privacidad` y `/mi-cuenta` |
| Crear `POST /api/derechos` para solicitar acceso/rectificación/supresión/portabilidad |
| Endpoint `GET /api/datos-personales` que devuelve export JSON de los datos del usuario (portabilidad, art. 20 RGPD) |
| Endpoint `DELETE /api/cuenta` que anonimiza perfil tras periodo legal |
| Tabla `consent_log` con `user_id | consent_type | granted | ip | user_agent | timestamp` |
| Tabla `dpa_register` (Análisis de Impacto) para IA y tratamiento de DNI |
| Procedimiento interno de breach notification (art. 33 RGPD: 72 h a AEPD) |

### Fase 3 (continuación) — endurecimiento

- Limitar `Content-Length` en middleware (`< 1 MB` para JSON).
- Quitar `claude-batch-*.json` del repo (están en raíz, no ignorados).
- Documentar `SECURITY.md` con runbook de breach + contacto CSIRT.
- Activar [Mozilla Observatory](https://observatory.mozilla.org/) y [securityheaders.com](https://securityheaders.com) en CI.
- Implementar [Subresource Integrity](https://developer.mozilla.org/) si cargas librerías externas de terceros.
- Revisar endpoints `/api/*` (especialmente `/api/chat`, `/api/publicar`, `/api/webhooks/*`) por:
  - Validación de payload (zod/valibot).
  - Verificación de firma en webhook Stripe (ya hecho según el archivo).
  - Timeouts explícitos.

---

## 5. Checklist rápida para pasar auditoría AEPD/sanidad legal

```markdown
[ ] 0.1 Bloquear GTM hasta decisión del usuario
[ ] 0.2 Banner cookies con Aceptar/Rechazar/Configurar (granular)
[ ] 0.3 Política de cookies ampliada (proveedor + duración + finalidad)
[ ] 0.4 Aviso legal con NIF + domicilio + Registro Mercantil
[ ] 0.5 Política privacidad con IA + transferencias + procedimiento derechos
[ ] 0.6 Checkbox aceptación política privacidad en TODOS los formularios
[ ] 0.7 Panel /mi-cuenta/privacidad funcional (descargar/eliminar datos)
[ ] 1.1 Cabeceras: HSTS, CSP, X-Frame, X-Content-Type, Referrer, Permissions
[ ] 1.2 Probar CSP en report-only antes de enforce
[ ] 2.1 Registro de consentimientos con timestamp
[ ] 2.2 Procedimiento breach interno (72 h AEPD)
[ ] 3.1 Eliminar archivos .json/.sql/.md sueltos del repo con datos sintéticos
[ ] 3.2 Revisar endpoints /api/* por validación y rate limit
[ ] 3.3 Monitorización (Sentry/Logflare) con redacción de PII
[ ] 4.1 Formulario "Solicitar mis datos" público
[ ] 4.2 Formulario "Borrar mis datos" con verificación email
```

---

## 6. Orden de prioridad recomendado

| Prioridad | Tarea | Esfuerzo | Impacto legal |
|---|---|---|---|
| **P0** | Bloquear GTM/GA sin consentimiento | 0.5 d | Crítico |
| **P0** | Banner cookies | 1 d | Crítico |
| **P0** | Aviso legal completo (NIF, etc.) | 0.5 d | Crítico |
| **P0** | Política cookies ampliada | 0.5 d | Crítico |
| **P1** | Cabeceras de seguridad (CSP, HSTS, etc.) | 1 d | Alto |
| **P1** | Política privacidad: completar IA + transferencias + derechos | 1 d | Alto |
| **P1** | Checkbox aceptación en formularios | 0.5 d | Alto |
| **P2** | Panel /mi-cuenta/privacidad funcional | 2 d | Medio |
| **P2** | Registro de consentimientos | 1 d | Medio |
| **P2** | Documentar breach procedure interno | 0.5 d | Medio |
| **P3** | Endurecimiento endpoints /api/* | 1–2 d | Bajo |
| **P3** | Sentry + redacción PII | 1 d | Bajo |
| **P3** | SECURITY.md + observatory en CI | 0.5 d | Bajo |

---

## 7. Sobre la implementación (Fase 4+ del roadmap original)

Mirando `ROADMAP_PRODUCCION.md`, `FASES.md`, `INVENTARIO_LANDING_PAGES_SEO.md`, etc., observo:

1. **Fase 1 (MVP) está prácticamente completa.** Solo falta ejecutar migrations pendientes (`043_apply_pending_029_040.sql`) y desplegar — pero el repo está desplegado, así que la 043 puede ser histórico.
2. **Fase 2 (publicación directa) está en marcha.** Wizard `/publicar-anuncio` con pasos, generación de descripción con IA, panel de propietario, formulario de contacto. Probablemente solo falta el badge Propietario Verificado con verificación por SMS (Twilio, no visto).
4. **Fase 3 (scraping) está activa.** Hipoges, Pisos.com, Solvia, Properstar, Indomio — todos con Playwright + stealth.
5. **Fase 4 (chat IA) está activa.** `ChatWidget.tsx` + `/api/chat`.
6. **Fase 5 (Stripe) está activa.** Turbo, visibilidad, contratos, packs.
7. **Fase 6 (SEO avanzado) está operativa** con landings por ciudad y barrio.

**Implementación sugerida (a coordinar contigo antes de tocar nada):**

1. **Prioridad inmediata:** corregir los 4 P0 de seguridad/privacidad antes de seguir con producto.
2. **Siguiente:** cabeceras de seguridad.
3. **Después:** Funcionalidades de privacidad de usuario (export, borrar).
4. **En paralelo (sin bloquear):** nuevas features de producto (mapa Leaflet, PWA offline, comparador, chat mejorado).

---

## 8. Resumen final

| | Hoy | Tras Fase 0–2 |
|---|---|---|
| Riesgo sanción AEPD | **Muy alto** (multas hasta 20 M€ / 4 % facturación) | Bajo |
| Cabeceras de seguridad | 0/8 | 8/8 |
| Cumplimiento LSSICE | Parcial | Alto |
| Cumplimiento RGPD derechos | Parcial | Alto |
| Madurez funcional | Muy alta | Igual + segura |

**Conclusión:** el proyecto está técnicamente listo para competir. Antes de invertir en más SEO, ads o features, **cierra las brechas legales** — son tuits de un competidor o un cliente disgustado los que pueden convertir el proyecto en un problema.

---

*Documento generado por análisis estático del repositorio en `D:\Proyectos\Inmonest\inmonest`. No incluye auditoría dinámica (pentest), que requeriría ejecutar el build y probar cabeceras/cookies en runtime contra `https://inmonest.com`.*