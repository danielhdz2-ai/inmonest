# 🎯 ESTRATEGIA SEO - REPOSICIONAR INMONEST COMO GESTORÍA DIGITAL

**Fecha implementación:** 8 Mayo 2026  
**Objetivo:** Cambiar percepción de "portal de pisos" a "gestoría inmobiliaria digital con pisos"  
**Estado:** ✅ IMPLEMENTADO

---

## 📊 PROBLEMA DETECTADO

### **ANTES (Google mostraba):**

```
Título: Inmonest | Pisos entre particulares sin comisiones
Descripción: Compra, vende o alquila tu piso directamente entre particulares. 
Sin agencias, sin comisiones. Miles de inmuebles en toda España.

Sitelinks:
- Vender tu piso sin comisiones
- Vender Casa Sin Comisión
- Pisos en Valencia
- Agencias Inmobiliarias
- Pisos en España
- Contacto
```

**PROBLEMA:** 100% enfocado en pisos, 0% en gestoría.

---

## ✅ SOLUCIÓN IMPLEMENTADA

### **1. METADATA GLOBAL (layout.tsx)**

#### **Title optimizado:**
```typescript
title: 'Inmonest | Gestoría Inmobiliaria Digital + Contratos desde 29€'
```

#### **Description optimizada:**
```typescript
description: 'Gestoría inmobiliaria online: Contratos de arras, alquiler LAU, 
compraventa desde 29€. Redactados por abogados en 48h. También pisos entre 
particulares sin comisiones.'
```

#### **Keywords ampliadas (16 keywords de gestoría):**
```typescript
keywords: [
  // PRIORIDAD ALTA - Gestoría
  'gestoría inmobiliaria online',
  'contratos de arras',
  'contrato de alquiler LAU',
  'contrato compraventa vivienda',
  'abogado inmobiliario online',
  'revisión contrato arras',
  'revisión contrato alquiler',
  'gestoría digital Barcelona',
  'gestoría digital Madrid',
  'gestoría digital Valencia',
  'redactar contrato alquiler',
  'redactar contrato arras',
  'asesoría jurídica compra vivienda',
  
  // SECUNDARIO - Pisos
  'pisos particulares sin comisión',
  'alquiler sin agencia',
  'inmonest',
]
```

---

### **2. HOMEPAGE REESCRITA (page.tsx)**

#### **HERO optimizado:**

**Badge:**
```html
📄 Gestoría Inmobiliaria Digital
```

**H1 nuevo:**
```html
<h1>
  Contratos inmobiliarios desde 29€ en 48h
</h1>
```

**Description nueva:**
```
Gestoría online especializada: Contratos de arras, alquiler LAU, compraventa. 
Redactados por abogados. También pisos entre particulares sin comisiones.
```

#### **Strip de confianza optimizado:**
```
⚖️ Redactados por abogados
⚡ Entrega en 48h
💰 Desde 29€
🔒 Pago seguro Stripe
```

**ANTES:** Publicación gratuita, Sin intermediarios, Contratos jurídicos desde 7€, IA

---

### **3. REORGANIZACIÓN DE CONTENIDO**

#### **Nuevo orden de secciones:**

1. ✅ **Hero** (gestoría como protagonista)
2. ✅ **Strip de confianza** (abogados, 48h, desde 29€)
3. ✅ **Grid de servicios de gestoría** (NUEVO - 3 servicios destacados)
4. ✅ **Ciudades populares** (pisos - MOVIDO ABAJO)
5. ✅ Bento ventajas
6. ✅ CTA publicar
7. ✅ Chollos
8. ✅ Hipoteca

#### **Grid de servicios (NUEVA SECCIÓN):**

```jsx
<section>
  <h2>Contratos redactados por abogados en 48h</h2>
  <p>Redacción, revisión y asesoría legal inmobiliaria. Desde 29€.</p>
  
  {/* 3 tarjetas destacadas */}
  - Contrato de Arras (145€) → /gestoria/solicitar/arras-penitenciales
  - Contrato de Alquiler LAU (120€) → /gestoria/solicitar/contrato-alquiler
  - Revisión Legal (60€) → /gestoria/revision-contrato-arras
  
  <CTA>Ver todos los servicios de gestoría</CTA>
</section>
```

**Beneficios SEO:**
- ✅ 3 enlaces internos prominentes a gestoría
- ✅ Anchor text optimizado ("Contrato de Arras", "Contrato de Alquiler LAU")
- ✅ Precios visibles (Google muestra en snippets)
- ✅ CTA claro hacia /gestoria

---

### **4. SCHEMA ORGANIZATION ACTUALIZADO**

#### **Nuevo @type múltiple:**
```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LegalService", "ProfessionalService"],
  "name": "Inmonest",
  "alternateName": "Inmonest Gestoría Inmobiliaria",
  "slogan": "Tu gestoría inmobiliaria digital",
  "description": "Gestoría inmobiliaria digital especializada en derecho 
    inmobiliario. Redacción y revisión de contratos...",
  "serviceType": [
    "Gestoría inmobiliaria",
    "Redacción contrato de arras",
    "Redacción contrato de alquiler",
    "Revisión legal de contratos",
    "Asesoría jurídica inmobiliaria",
    "Contrato de compraventa"
  ],
  "priceRange": "29€ - 666€",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Gestoría Inmobiliaria",
    "itemListElement": [...]
  }
}
```

**ANTES:** Solo @type: "Organization"

**Beneficios:**
- ✅ Google entiende que eres un "LegalService"
- ✅ Apareces en búsquedas de servicios legales
- ✅ hasOfferCatalog ayuda a generar sitelinks de servicios
- ✅ priceRange aparece en Knowledge Panel

---

## 🔗 ESTRATEGIA DE SITELINKS

### **¿Qué son los Sitelinks?**

Son los enlaces que Google muestra debajo del resultado principal:

```
Inmonest | Gestoría Inmobiliaria Digital + Contratos desde 29€
https://inmonest.com
Gestoría inmobiliaria online: Contratos de arras, alquiler LAU...

  📄 Contrato de Arras    🏠 Contrato de Alquiler    🔍 Revisión Legal
  📋 Gestoría Barcelona   ⚖️ Asesoría Compra        💼 Blog Jurídico
```

### **¿Cómo los generamos?**

Google NO permite seleccionarlos manualmente. Los genera automáticamente basándose en:

1. ✅ **Estructura del sitio** (jerarquía clara)
2. ✅ **Enlaces internos** (anclas descriptivas)
3. ✅ **Tráfico/clicks** (páginas más visitadas)
4. ✅ **Schema markup** (hasOfferCatalog, serviceType)
5. ✅ **H1 y títulos** (claros y descriptivos)
6. ✅ **Prioridad en sitemap.xml**

### **Implementación en Inmonest:**

#### **1. Enlaces internos prominentes (homepage):**
```jsx
// Grid de servicios (3 tarjetas grandes)
<Link href="/gestoria/solicitar/arras-penitenciales">
  Contrato de Arras
</Link>

<Link href="/gestoria/solicitar/contrato-alquiler">
  Contrato de Alquiler LAU
</Link>

<Link href="/gestoria/revision-contrato-arras">
  Revisión Legal
</Link>

// CTA principal
<Link href="/gestoria">
  Ver todos los servicios de gestoría →
</Link>
```

#### **2. Anchor text optimizado:**
- ❌ EVITAR: "Clic aquí", "Ver más", "Servicios"
- ✅ USAR: "Contrato de Arras", "Gestoría Barcelona", "Revisión de Contratos"

#### **3. Sitemap con prioridades:**
```typescript
// Gestoría = PRIORIDAD ALTA
{ url: '/gestoria', priority: 0.9 }
{ url: '/gestoria/revision-contrato-arras', priority: 0.88 }
{ url: '/gestoria/solicitar/arras-penitenciales', priority: 0.85 }

// Pisos = PRIORIDAD MEDIA-ALTA
{ url: '/pisos', priority: 0.9 }
{ url: '/barcelona', priority: 0.95 }
```

#### **4. Schema hasOfferCatalog:**
```json
{
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Gestoría Inmobiliaria",
    "itemListElement": [
      { "name": "Contrato de Arras Penitenciales" },
      { "name": "Contrato de Alquiler LAU" },
      { "name": "Revisión de Contratos" }
    ]
  }
}
```

---

## 📈 MÉTRICAS DE ÉXITO

### **KPIs a monitorizar (Google Search Console):**

#### **1. Impresiones por keyword:**
```
ANTES:
- "pisos particulares" → 50,000 impresiones/mes
- "gestoría inmobiliaria" → 500 impresiones/mes

META (3 meses):
- "gestoría inmobiliaria" → 10,000 impresiones/mes
- "contrato de arras" → 15,000 impresiones/mes
- "contrato alquiler LAU" → 8,000 impresiones/mes
```

#### **2. CTR (Click-Through Rate):**
```
META: >5% para keywords de gestoría
Actual homepage: ~3.5%
```

#### **3. Posición promedio:**
```
META:
- "gestoría inmobiliaria online" → Top 3
- "contrato de arras Barcelona" → Top 5
- "redactar contrato alquiler" → Top 10
```

#### **4. Sitelinks generados:**
```
META: Al menos 6 sitelinks de gestoría en resultados de "Inmonest"
Tiempo estimado: 2-4 semanas
```

---

## 🚀 ACCIONES ADICIONALES RECOMENDADAS

### **A. CONTENIDO (PRIORIDAD ALTA):**

1. ✅ **Crear landing pages ciudad × servicio:**
   ```
   /barcelona/contrato-arras
   /madrid/contrato-alquiler
   /valencia/revision-contratos
   ```
   
2. ✅ **Agregar FAQPage schema a más páginas:**
   ```
   /gestoria/contrato-compraventa → +FAQPage
   /gestoria/asesoria-compra-piso → +FAQPage
   /gestoria/ayuda-propietarios → +FAQPage
   ```

3. ✅ **Crear más blog posts orientados a gestoría:**
   ```
   "Cómo revisar un contrato de arras antes de firmar"
   "Cláusulas obligatorias en contrato de alquiler LAU 2026"
   "Diferencias entre arras penitenciales y confirmatorias"
   "Qué hacer si te estafan con un contrato de arras"
   ```

### **B. LINKBUILDING (PRIORIDAD MEDIA):**

4. ❌ **Guest posts en blogs inmobiliarios:**
   ```
   - Idealista blog
   - Fotocasa blog
   - Habitaclia blog
   - Blog de notarios
   ```

5. ❌ **Directorios legales:**
   ```
   - Directorio de abogados
   - Colegios de abogados provinciales
   - Portales de servicios jurídicos
   ```

6. ❌ **Menciones en medios:**
   ```
   - Notas de prensa sobre gestoría digital
   - Colaboraciones con influencers inmobiliarios
   ```

### **C. GOOGLE MY BUSINESS (PRIORIDAD ALTA):**

7. ❌ **Crear perfiles GMB por ciudad:**
   ```
   Inmonest Gestoría Barcelona
   Inmonest Gestoría Madrid
   Inmonest Gestoría Valencia
   ```

8. ❌ **Optimizar ficha:**
   ```
   - Categoría principal: "Servicio de gestoría"
   - Categorías secundarias: "Abogado inmobiliario", "Notaría online"
   - Descripción: Keywords de gestoría
   - Posts semanales sobre contratos
   ```

### **D. PAID ADS (PRIORIDAD BAJA):**

9. ❌ **Google Ads para acelerar:**
   ```
   Campañas:
   - "Contrato de arras [ciudad]"
   - "Revisión contrato alquiler"
   - "Gestoría inmobiliaria online"
   
   Presupuesto inicial: 500€/mes
   CPC esperado: 0.50€ - 2€
   ```

---

## 🎯 ROADMAP DE IMPLEMENTACIÓN

### **FASE 1 - FUNDAMENTOS (COMPLETADA ✅):**
- [x] Cambiar metadata global (title, description, keywords)
- [x] Reorganizar homepage (gestoría primero)
- [x] Crear grid de servicios destacados
- [x] Actualizar OrganizationSchema
- [x] Optimizar anchor text de enlaces
- [x] Verificar sitemap prioridades

### **FASE 2 - EXPANSIÓN (2-4 SEMANAS):**
- [ ] Crear 9 landing pages ciudad × servicio (3 ciudades × 3 servicios)
- [ ] Agregar FAQPage schema a 3 páginas más
- [ ] Crear 4 blog posts nuevos orientados a gestoría
- [ ] Agregar LocalBusiness schema a /gestoria/madrid y /valencia
- [ ] Optimizar imágenes con alt text de gestoría

### **FASE 3 - AUTORIDAD (1-3 MESES):**
- [ ] Conseguir 5 backlinks de calidad (DR>30)
- [ ] Crear perfiles GMB en 3 ciudades
- [ ] Publicar 2 guest posts en blogs del sector
- [ ] Conseguir 20 reseñas Google (5 estrellas)
- [ ] Campaña Google Ads test (500€)

### **FASE 4 - CONSOLIDACIÓN (3-6 MESES):**
- [ ] Análisis de competencia (top 3 competidores)
- [ ] Optimización conversión (A/B testing CTAs)
- [ ] Expansión a más ciudades (10 total)
- [ ] Video marketing (YouTube + schema VideoObject)
- [ ] Podcast sobre derecho inmobiliario

---

## 📊 COMPARATIVA ANTES/DESPUÉS

| Métrica | ANTES | DESPUÉS | Mejora |
|---------|-------|---------|---------|
| **Keywords gestoría en title** | 0 | 3 | +∞ |
| **Keywords gestoría en description** | 1 | 8 | +700% |
| **Enlaces internos a gestoría (homepage)** | 1 | 4 | +300% |
| **Prioridad gestoría en H1** | ❌ Secundaria | ✅ Principal | - |
| **Schema @type LegalService** | ❌ No | ✅ Sí | - |
| **Servicios destacados (homepage)** | 0 | 3 | +∞ |
| **Anchor text optimizado** | ❌ Genérico | ✅ Descriptivo | - |

---

## 🔍 CÓMO VERIFICAR LOS CAMBIOS

### **1. Google Search Console (1-2 semanas):**
```
Performance → Search results → 
- Filtrar por "gestoria"
- Ver impresiones, clicks, posición
- Comparar con período anterior
```

### **2. Rich Results Test:**
```
https://search.google.com/test/rich-results
Probar: https://inmonest.com

Verificar que aparece:
- Organization
- LegalService
- hasOfferCatalog
```

### **3. Google Preview:**
```
Buscar en Google: "site:inmonest.com"
Ver cómo Google muestra el título y descripción
```

### **4. Sitelinks (2-4 semanas):**
```
Buscar: "Inmonest"
Verificar si aparecen sitelinks de gestoría
```

---

## 📚 RECURSOS Y HERRAMIENTAS

### **SEO Tools:**
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google My Business](https://business.google.com)
- [Ahrefs](https://ahrefs.com) (análisis competencia)
- [Semrush](https://semrush.com) (keywords research)

### **Schema Validators:**
- [Schema.org Validator](https://validator.schema.org/)
- [Google Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)

### **Documentación:**
- [Google Search Central - Sitelinks](https://developers.google.com/search/docs/appearance/sitelinks)
- [Schema.org - LegalService](https://schema.org/LegalService)
- [Schema.org - OfferCatalog](https://schema.org/OfferCatalog)

---

## ✅ CHECKLIST DE VALIDACIÓN

Antes de deployment:

- [x] Build exitoso sin errores
- [x] Metadata actualizada en layout.tsx
- [x] Homepage reorganizada (gestoría primero)
- [x] Grid de servicios creado
- [x] OrganizationSchema con LegalService
- [x] Anchor text optimizado
- [x] Sitemap con prioridades correctas
- [x] No hay errores TypeScript
- [ ] Probar en Google Rich Results Test
- [ ] Verificar Open Graph en Facebook Debugger
- [ ] Revisar Google Search Console tras 1 semana

---

**Última actualización:** 8 Mayo 2026  
**Próxima revisión:** 22 Mayo 2026 (2 semanas)  
**Responsable:** Equipo SEO Inmonest
