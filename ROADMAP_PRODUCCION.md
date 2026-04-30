# 🚀 ANÁLISIS DE COMPLETITUD - INMONEST
*Fecha: 30 Abril 2026*
*Excluido: Scrapers adicionales, IA descripciones, SEO/Marketing*

---

## 📊 RESUMEN EJECUTIVO

**Porcentaje Global de Completitud: 68%**
**Estado: MVP+ (Listo para Beta Privada, NO para lanzamiento público masivo)**

---

## ✅ LO QUE YA TIENES (100% FUNCIONAL)

### Core Business (95%)
- ✅ Sistema de autenticación completo (email + OAuth Google)
- ✅ Búsqueda de pisos con filtros avanzados
- ✅ Detalle de inmueble con galería + mapa
- ✅ Publicar anuncios (particulares con fotos)
- ✅ Sistema de favoritos
- ✅ Sistema de alertas por email
- ✅ Panel "Mi Cuenta" completo
- ✅ Calculadoras (hipoteca, gastos compra/alquiler)
- ✅ Gestoría integrada (formulario + documentos)
- ✅ Stripe pagos configurado
- ✅ Storage de imágenes (Supabase)
- ✅ Blog básico
- ✅ Páginas legales completas

### Infraestructura (85%)
- ✅ Next.js 16 + React 19 (stack moderno)
- ✅ Supabase PostgreSQL + Storage
- ✅ Vercel hosting + crons
- ✅ 39 migraciones de BD (schema robusto)
- ✅ Image proxy con CDN
- ✅ Resend emails configurado
- ✅ Edge Functions

---

## 🔴 LO QUE FALTA (CRÍTICO PARA PRODUCCIÓN)

### 1. **SISTEMA DE MENSAJERÍA EN TIEMPO REAL** 🚨
**Estado actual:** Solo estructura de BD, sin tiempo real
**Problema:** Los usuarios no ven mensajes nuevos sin recargar página
**Impacto:** Muy mala UX, abandono de conversaciones

**Qué implementar:**
```typescript
// src/hooks/useRealtimeMessages.ts
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useRealtimeMessages(conversationId: string, onNewMessage: (msg) => void) {
  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, payload => {
        onNewMessage(payload.new)
      })
      .subscribe()
    
    return () => { channel.unsubscribe() }
  }, [conversationId])
}
```

**Tiempo estimado:** 2-3 días
**Prioridad:** 🔴🔴🔴 MÁXIMA

---

### 2. **NOTIFICACIONES PUSH (Web Push API)** ⚠️
**Estado actual:** 0% implementado
**Problema:** Usuarios no saben cuando tienen mensajes/alertas
**Impacto:** Pérdida de engagement, leads fríos

**Qué implementar:**
- Service Worker para notificaciones
- Tabla `push_subscriptions` en BD
- API `/api/push/subscribe`
- Envío automático en nuevos mensajes/favoritos

**Tiempo estimado:** 3-4 días
**Prioridad:** 🔴🔴 ALTA

---

### 3. **PANEL DE ADMIN COMPLETO** ⚠️
**Estado actual:** 25% (solo endpoint básico)
**Problema:** No puedes gestionar usuarios/listings/denuncias
**Impacto:** Mantenimiento manual tedioso, no escalable

**Qué implementar:**
- Dashboard con estadísticas en tiempo real
- Gestión usuarios (activar/desactivar, verificar)
- Moderación de anuncios (aprobar/rechazar)
- Gestión de denuncias
- Ver conversaciones (soporte)
- Estadísticas avanzadas (conversiones, fuentes tráfico)
- Exportar datos (CSV/Excel)

**Tiempo estimado:** 1-2 semanas
**Prioridad:** 🔴🔴 ALTA

---

### 4. **SISTEMA DE MODERACIÓN Y DENUNCIAS** ⚠️
**Estado actual:** 0% implementado
**Problema:** Sin control de contenido fraudulento/spam
**Impacto:** Riesgo legal, pérdida de confianza

**Qué implementar:**
- Botón "Reportar anuncio/usuario"
- Categorías de denuncia (fraude, spam, duplicado, contenido inapropiado)
- Cola de moderación en panel admin
- Auto-suspensión tras X denuncias
- Sistema de strikes (3 strikes = ban permanente)

**Tiempo estimado:** 4-5 días
**Prioridad:** 🔴 MEDIA-ALTA

---

### 5. **VERIFICACIÓN DE USUARIOS** ⚠️
**Estado actual:** 0% implementado
**Problema:** Cualquiera puede publicar sin verificar identidad
**Impacto:** Fraudes, estafas, baja confianza

**Qué implementar:**
- Verificación email (ya tienes con magic link ✅)
- Verificación teléfono (SMS con Twilio)
- Verificación identidad (DNI/NIE con OCR + selfie)
- Badge "Verificado ✓" en perfil
- Tabla `user_verifications` (email, phone, identity)

**Tiempo estimado:** 1 semana
**Prioridad:** 🟡 MEDIA

---

### 6. **MONITOREO DE ERRORES (Sentry)** 🚨
**Estado actual:** 0% implementado
**Problema:** No sabes cuando hay errores en producción
**Impacto:** Bugs silenciosos, usuarios frustrados

**Qué implementar:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
})
```

**Tiempo estimado:** 2-3 horas
**Prioridad:** 🔴🔴🔴 MÁXIMA

---

### 7. **TESTS AUTOMATIZADOS** 🚨
**Estado actual:** 0 tests
**Problema:** Cambios rompen funcionalidades sin darte cuenta
**Impacto:** Regresiones, pérdida de tiempo debuggeando

**Qué implementar:**
```bash
# Tests E2E críticos
- Login/Registro
- Publicar anuncio con fotos
- Enviar mensaje
- Crear alerta
- Hacer favorito
- Contactar vendedor
- Proceso de pago gestoría
```

Usar: Playwright (ya instalado ✅)

**Tiempo estimado:** 1 semana
**Prioridad:** 🔴 MEDIA-ALTA

---

### 8. **RATE LIMITING** ⚠️
**Estado actual:** 0% implementado
**Problema:** Vulnerable a spam, scrapers, ataques DDoS
**Impacto:** Factura de Vercel/Supabase explota, mal servicio

**Qué implementar:**
```typescript
// middleware.ts con Upstash Rate Limit
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 req/10seg
})

export async function middleware(req: Request) {
  const ip = req.headers.get('x-forwarded-for')
  const { success } = await ratelimit.limit(ip ?? 'anonymous')
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 })
  }
}
```

**Tiempo estimado:** 1 día
**Prioridad:** 🔴 MEDIA-ALTA

---

### 9. **ANALYTICS PROPIOS** ⚠️
**Estado actual:** 0% implementado
**Problema:** No sabes qué hacen los usuarios, qué funciona/falla
**Impacto:** Decisiones a ciegas, no puedes optimizar

**Qué implementar:**
- Tabla `analytics_events` (event, user_id, metadata, timestamp)
- Trackear: búsquedas, clicks en listings, contactos, favoritos, alertas creadas
- Dashboard admin con gráficas (Chart.js)
- Embudo de conversión (visita → búsqueda → detalle → contacto)

**Tiempo estimado:** 3-4 días
**Prioridad:** 🟡 MEDIA

---

### 10. **NOTIFICACIONES DE CAMBIO DE PRECIO EN FAVORITOS** ⚠️
**Estado actual:** 0% implementado
**Problema:** Usuarios guardan favoritos pero no saben si baja precio
**Impacto:** Baja conversión, feature inútil

**Qué implementar:**
- Cron diario `/api/cron/price-changes`
- Comparar `price_eur` actual vs precio cuando agregó a favoritos
- Email si bajó ≥5%: "¡Bajó de precio! Antes 300k€ → Ahora 280k€"
- Guardar histórico de precios en `listing_price_history`

**Tiempo estimado:** 1 día
**Prioridad:** 🟡 MEDIA

---

### 11. **COMPARADOR DE PISOS** 🟢
**Estado actual:** 0% implementado
**Problema:** Usuarios no pueden comparar lado a lado
**Impacto:** UX mejorable, no diferenciador

**Qué implementar:**
- Checkbox "Comparar" en cada listing
- Botón flotante "Comparar (3)" cuando hay seleccionados
- Página `/comparar` con tabla lado a lado:
  * Fotos, precio, m², hab, baños, características
  * Cálculo de €/m²
  * Distancia a punto de interés
  * Pros/contras automáticos

**Tiempo estimado:** 2-3 días
**Prioridad:** 🟢 BAJA (nice to have)

---

### 12. **VALORACIÓN AUTOMÁTICA (IA/ML)** 🟢
**Estado actual:** 0% implementado
**Problema:** Usuarios no saben si precio es justo
**Impacto:** Diferenciador fuerte si lo tienes

**Qué implementar:**
- Modelo ML entrenado con datos históricos
- API `/api/valorar` (ciudad, m², hab, baños → precio estimado)
- Badge en listings: "🔥 Ganga (-12% vs mercado)" o "⚠️ Sobrevalorado (+8%)"
- Página `/valorar-mi-piso` (genera leads)

**Tecnología:** Scikit-learn / TensorFlow.js / OpenRouter GPT-4

**Tiempo estimado:** 2 semanas (con datos suficientes)
**Prioridad:** 🟢 BAJA (post-lanzamiento)

---

### 13. **SISTEMA DE PLANES PREMIUM** 🟢
**Estado actual:** 40% (Stripe configurado, sin planes definidos)
**Problema:** No hay monetización clara para particulares/agencias
**Impacto:** Sin ingresos recurrentes

**Qué implementar:**

**Plan Gratis (Particular):**
- 2 anuncios simultáneos
- Fotos: 6 máximo
- Sin destacar
- Sin estadísticas

**Plan Básico (9€/mes):**
- 5 anuncios simultáneos
- Fotos: 15 máximo
- Estadísticas básicas (visitas, favoritos)
- Renovación automática anuncios

**Plan Premium (19€/mes):**
- Anuncios ilimitados
- Destacar 3 anuncios (aparecen primero)
- Fotos ilimitadas
- Estadísticas avanzadas
- Badge "Premium ⭐"
- Soporte prioritario

**Plan Agencia (99€/mes):**
- Todo lo anterior +
- Subdominio personalizado
- CRM integrado
- API acceso
- Gestor cuenta dedicado

**Tiempo estimado:** 1 semana
**Prioridad:** 🟡 MEDIA

---

### 14. **CRM BÁSICO PARA LEADS** 🟢
**Estado actual:** 0% implementado
**Problema:** Leads llegan pero no hay seguimiento
**Impacto:** Conversión baja, leads perdidos

**Qué implementar:**
- Tabla `lead_pipeline` (lead_id, stage, last_contact, notes)
- Stages: Nuevo → Contactado → Calificado → Negociación → Ganado/Perdido
- Emails automáticos de seguimiento (día 1, 3, 7, 14)
- Recordatorios "Llamar a X en 2 días"
- Dashboard "Mis leads" para vendedores

**Tiempo estimado:** 1 semana
**Prioridad:** 🟢 BAJA (post-lanzamiento)

---

### 15. **BACKUP AUTOMÁTICO BD** 🚨
**Estado actual:** Solo backups de Supabase (cada 7 días)
**Problema:** Si Supabase falla o borras datos, pierdes todo
**Impacto:** CATASTRÓFICO

**Qué implementar:**
```bash
# Script diario
pg_dump $SUPABASE_URL > backup-$(date +%Y%m%d).sql
# Subir a S3 / Google Drive
aws s3 cp backup-*.sql s3://inmonest-backups/
# Retener 30 días, borrar viejos
```

**Tiempo estimado:** 4 horas
**Prioridad:** 🔴🔴 ALTA

---

### 16. **OPTIMIZACIÓN DE IMÁGENES** ⚠️
**Estado actual:** 60% (WebP en cliente, sin CDN optimizado)
**Problema:** Imágenes grandes = carga lenta = usuarios se van
**Impacto:** SEO penalizado, conversión baja

**Qué mejorar:**
- Usar Next.js Image component (lazy load automático)
- Generar thumbnails en server (150x150, 400x300, 800x600)
- Implementar Cloudflare Images o Vercel Image Optimization
- Servir WebP con fallback JPEG

**Tiempo estimado:** 2 días
**Prioridad:** 🟡 MEDIA

---

### 17. **HISTORIAL DE BÚSQUEDAS** 🟢
**Estado actual:** 0% implementado
**Problema:** Usuarios repiten búsquedas manualmente
**Impacto:** UX mejorable

**Qué implementar:**
- Tabla `search_history` (user_id, filters, timestamp)
- Dropdown "Búsquedas recientes" (últimas 10)
- Botón "Repetir búsqueda" con 1 click

**Tiempo estimado:** 1 día
**Prioridad:** 🟢 BAJA

---

### 18. **SISTEMA DE REVIEWS/VALORACIONES** 🟢
**Estado actual:** 0% implementado
**Problema:** Sin reputación, confianza baja
**Impacto:** Usuarios desconfían de vendedores

**Qué implementar:**
- Solo pueden valorar tras conversación confirmada
- Estrellas 1-5 + comentario
- Badge "★ 4.8 (23 reseñas)"
- Denunciar review falsa

**Tiempo estimado:** 3-4 días
**Prioridad:** 🟢 BAJA (post-lanzamiento)

---

### 19. **MULTI-IDIOMA (i18n)** 🟢
**Estado actual:** 0% implementado (solo español)
**Problema:** No puedes expandir internacionalmente
**Impacto:** Mercado limitado a España

**Qué implementar:**
```bash
npm install next-intl
```

Idiomas: ES (español), EN (inglés), CA (catalán), EU (euskera)

**Tiempo estimado:** 1 semana
**Prioridad:** 🟢 BAJA (post-lanzamiento)

---

### 20. **TÉRMINOS Y CONDICIONES DINÁMICOS** ⚠️
**Estado actual:** Estáticos en HTML
**Problema:** Si cambias términos, no hay registro de aceptación
**Impacto:** Riesgo legal (GDPR)

**Qué implementar:**
- Tabla `terms_versions` (version, content, effective_date)
- Tabla `user_terms_acceptances` (user_id, version, accepted_at)
- Modal "Hemos actualizado los términos" en login si no aceptó última versión

**Tiempo estimado:** 1 día
**Prioridad:** 🟡 MEDIA

---

## 📊 DESGLOSE POR CATEGORÍAS

| CATEGORÍA | % COMPLETADO | CRÍTICO FALTANTE |
|-----------|--------------|------------------|
| **Core Features** | 90% | Mensajería tiempo real |
| **UX/Engagement** | 60% | Notificaciones push, comparador |
| **Admin/Gestión** | 25% | Panel admin completo, moderación |
| **Seguridad** | 70% | Rate limiting, verificación usuarios |
| **Monetización** | 40% | Planes premium definidos |
| **Infraestructura** | 75% | Sentry, backups, tests |
| **Analytics** | 10% | Tracking eventos, estadísticas |
| **Legal/Compliance** | 80% | Términos dinámicos |

---

## 🎯 ROADMAP PRIORIZADO (PARA LANZAMIENTO PÚBLICO)

### **FASE 1: FUNCIONALIDAD CRÍTICA (2-3 semanas)** 🔴
**Objetivo:** Plataforma estable y usable con tráfico real

1. ✅ **Sentry** (3 horas) - Monitoreo errores
2. ✅ **Mensajería tiempo real** (3 días) - Chat funcional
3. ✅ **Notificaciones push** (4 días) - Engagement
4. ✅ **Panel admin básico** (5 días) - Gestión esencial
5. ✅ **Rate limiting** (1 día) - Anti-spam
6. ✅ **Backups automáticos** (4 horas) - Seguridad datos

**Total:** ~15 días laborables

---

### **FASE 2: MODERACIÓN Y SEGURIDAD (1-2 semanas)** 🟡
**Objetivo:** Control de calidad y confianza

7. ✅ **Sistema de denuncias** (5 días)
8. ✅ **Verificación usuarios** (5 días) - Teléfono + DNI
9. ✅ **Tests E2E** (5 días) - Flows críticos

**Total:** ~10 días laborables

---

### **FASE 3: MONETIZACIÓN (1 semana)** 🟡
**Objetivo:** Generar ingresos

10. ✅ **Planes premium** (5 días)
11. ✅ **Facturación automática** (2 días)

**Total:** ~5 días laborables

---

### **FASE 4: OPTIMIZACIÓN (1-2 semanas)** 🟢
**Objetivo:** Mejorar conversión y UX

12. ✅ **Analytics propios** (4 días)
13. ✅ **Notif. cambio precio** (1 día)
14. ✅ **Optimización imágenes** (2 días)
15. ✅ **Comparador pisos** (3 días)

**Total:** ~7 días laborables

---

## 💰 INVERSIÓN ESTIMADA (DESARROLLO)

| FASE | DÍAS | COSTO (50€/h, 8h/día) | TOTAL |
|------|------|----------------------|-------|
| Fase 1 (Crítico) | 15 días | 6,000€ | **6,000€** |
| Fase 2 (Seguridad) | 10 días | 4,000€ | **4,000€** |
| Fase 3 (Monetización) | 5 días | 2,000€ | **2,000€** |
| Fase 4 (Optimización) | 7 días | 2,800€ | **2,800€** |
| **TOTAL 4 FASES** | **37 días** | - | **14,800€** |

---

## 🚦 CRITERIOS DE "LISTO PARA PRODUCCIÓN"

### ✅ CHECKLIST PRE-LANZAMIENTO

**Funcionalidad:**
- [ ] Mensajería tiempo real funciona
- [ ] Notificaciones push activas
- [ ] Moderación de contenido implementada
- [ ] Rate limiting configurado
- [ ] Sentry capturando errores
- [ ] Tests E2E pasan al 100%

**Seguridad:**
- [ ] RLS Supabase configurado en todas las tablas
- [ ] Políticas Storage correctas
- [ ] HTTPS forzado
- [ ] Headers de seguridad (CSP, HSTS)
- [ ] Inputs sanitizados (XSS prevention)

**Performance:**
- [ ] Lighthouse score >90
- [ ] Time to Interactive <3s
- [ ] Imágenes optimizadas (WebP)
- [ ] CDN configurado
- [ ] Caching correcto

**Legal:**
- [ ] RGPD compliance verificado
- [ ] Cookies banner funcional
- [ ] Términos y condiciones revisados por abogado
- [ ] Política de privacidad actualizada

**Monitoreo:**
- [ ] Sentry funcionando
- [ ] Uptime monitor (UptimeRobot)
- [ ] Backups automáticos diarios
- [ ] Alertas configuradas (email si caída)

---

## 📈 CONCLUSIÓN

### **Porcentaje Actual: 68%**

**Breakdown:**
- ✅ Funcionalidad core: 90%
- ⚠️ Engagement features: 60%
- ❌ Admin/moderación: 25%
- ⚠️ Infraestructura producción: 75%
- ❌ Analytics: 10%

### **Para ser "1000% profesional" necesitas:**

1. **Fase 1 obligatoria** (15 días) → **85% completitud**
2. **Fase 2 obligatoria** (10 días) → **90% completitud**
3. **Fase 3 recomendada** (5 días) → **95% completitud**
4. **Fase 4 opcional** (7 días) → **98% completitud**

### **Recomendación:**

**Lanzamiento Beta Privada:** YA (con Fase 1 completada)
- Invita 50-100 usuarios seleccionados
- Recoge feedback
- Itera rápido

**Lanzamiento Público:** Tras Fase 1 + Fase 2 (25 días)
- ~90% completitud
- Suficientemente robusto para tráfico orgánico
- Monetización pendiente pero no bloqueante

**Lanzamiento "Premium":** Tras todas las fases (37 días)
- ~98% completitud
- Competir con Idealista/Fotocasa
- Todas las features de engagement
- Monetización activa

---

## 🎯 NEXT STEPS INMEDIATOS

1. **Prioriza Fase 1** (15 días de desarrollo)
2. **Consigue financiación** (6,000€ mínimo)
3. **Contrata desarrollador** o dedica tiempo full-time
4. **Ejecuta en orden** sin saltar pasos
5. **Testing continuo** con usuarios beta

---

*Este análisis excluye: más scrapers, optimización IA, SEO/marketing, que son proyectos paralelos independientes.*
