# 📊 SEO PENDIENTE - INMONEST
*Última actualización: 30 de Abril de 2026*

---

## ✅ SEO YA IMPLEMENTADO

### 1. **Metadatos Básicos** ✅
- Title tags optimizados (50-60 caracteres)
- Meta descriptions (150-160 caracteres)
- Keywords relevantes
- Canonical URLs en todas las páginas
- Hreflang (preparado para multi-idioma)

### 2. **Open Graph & Social** ✅
- Open Graph completo (título, descripción, imagen, URL)
- Twitter Cards configuradas
- Favicon + Apple Touch Icon
- Metadata en layout.tsx global

### 3. **Estructura Técnica** ✅
- Sitemap.xml dinámico (incluye listings, ciudades, blog)
- robots.txt configurado
- URLs limpias y semánticas
- Breadcrumbs visuales (falta Schema.org)

### 4. **Schema.org Parcial** ⚠️ (60% implementado)
- ✅ Article schema (blog posts)
- ✅ BreadcrumbList (blog)
- ✅ FAQPage (páginas ciudad)
- ✅ WebPage básico
- ❌ RealEstateProperty (listings) - **FALTA**
- ❌ Organization (empresa) - **FALTA**
- ❌ LocalBusiness - **FALTA**
- ❌ AggregateRating (reviews) - **FALTA**
- ❌ Service (gestoría) - **FALTA**

### 5. **Performance** ✅
- Next.js Image optimization
- Static generation (SSG) para páginas clave
- Edge caching en Vercel
- Lazy loading imágenes

---

## 🚀 SEO PENDIENTE DE IMPLEMENTAR

### PRIORIDAD CRÍTICA 🔴

#### 1. **Schema.org: RealEstateProperty en Listings**
**Impacto:** Rich snippets en Google (precio, ubicación, fotos)
**Esfuerzo:** 2-3 horas

**Implementación:**
```tsx
// src/components/ListingPropertySchema.tsx
export default function ListingPropertySchema({ listing }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateProperty",
    "name": listing.title,
    "description": listing.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": listing.city,
      "addressRegion": listing.district,
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": listing.lat,
      "longitude": listing.lng
    },
    "numberOfRooms": listing.bedrooms,
    "numberOfBathroomsTotal": listing.bathrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": listing.area_m2,
      "unitCode": "MTK"
    },
    "offers": {
      "@type": "Offer",
      "price": listing.price_eur,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": listing.is_particular ? "Person" : "Organization",
        "name": listing.is_particular ? "Particular" : listing.agency_name
      }
    },
    "image": listing.photos.map(p => p.url),
    "url": `https://inmonest.com/pisos/${listing.id}`
  }

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**Archivo a modificar:**
- `src/app/pisos/[id]/page.tsx` - Importar y usar el componente

---

#### 2. **Schema.org: Organization (Empresa)**
**Impacto:** Panel de conocimiento en Google, credibilidad
**Esfuerzo:** 1 hora

**Implementación:**
```tsx
// src/app/layout.tsx - Agregar dentro de <body>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Inmonest",
      "url": "https://inmonest.com",
      "logo": "https://inmonest.com/logo.png",
      "description": "Portal inmobiliario para comprar, vender o alquilar pisos entre particulares sin comisiones de agencia.",
      "foundingDate": "2026",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ES"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+34-XXX-XXX-XXX", // ❗ Añadir teléfono real
        "contactType": "Customer Service",
        "email": "hola@inmonest.com",
        "availableLanguage": "Spanish"
      },
      "sameAs": [
        "https://www.facebook.com/inmonest",  // ❗ Crear perfiles
        "https://twitter.com/inmonest",
        "https://www.instagram.com/inmonest",
        "https://www.linkedin.com/company/inmonest"
      ]
    })
  }}
/>
```

**Archivo a modificar:**
- `src/app/layout.tsx`

---

#### 3. **Schema.org: LocalBusiness (Gestoría)**
**Impacto:** Aparecer en búsquedas locales "gestoría inmobiliaria cerca de mí"
**Esfuerzo:** 1 hora

**Implementación:**
```tsx
// src/app/gestoria/page.tsx - Agregar schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Inmonest Gestoría Inmobiliaria",
  "description": "Contratos de arras, alquiler y compraventa redactados por abogados especializados.",
  "url": "https://inmonest.com/gestoria",
  "priceRange": "€€",
  "telephone": "+34-XXX-XXX-XXX", // ❗ Añadir teléfono
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ES"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de gestoría",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Contrato de Arras",
          "description": "Contrato de arras redactado por abogados",
          "price": "30",
          "priceCurrency": "EUR"
        }
      },
      // ... resto de servicios
    ]
  }
}
```

**Archivo a modificar:**
- `src/app/gestoria/page.tsx`
- `src/app/gestoria/[servicio]/page.tsx`

---

### PRIORIDAD ALTA 🟡

#### 4. **Breadcrumbs Schema Completo**
**Impacto:** Migas de pan en resultados de Google
**Esfuerzo:** 2 horas

**Páginas pendientes:**
- `/pisos/[id]` (Inicio > Ciudad > Pisos > [Título])
- `/[ciudad]/pisos` (Inicio > Ciudad > Pisos)
- `/gestoria/[servicio]` (Inicio > Gestoría > Servicio)

**Implementación:**
```tsx
// src/components/BreadcrumbSchema.tsx
interface BreadcrumbItem {
  name: string
  url: string
}

export default function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://inmonest.com${item.url}`
    }))
  }

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

#### 5. **AggregateRating Schema (Reseñas)**
**Impacto:** ⭐⭐⭐⭐⭐ estrellas en Google
**Esfuerzo:** 4 horas (requiere sistema de reseñas)

**Prerequisito:** Implementar sistema de valoraciones de usuarios

**Implementación:**
```tsx
// src/components/ListingRatingSchema.tsx
const ratingSchema = {
  "@context": "https://schema.org",
  "@type": "Product", // o RealEstateProperty con aggregateRating
  "name": listing.title,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "23"
  }
}
```

**Tareas:**
1. Crear tabla `reviews` en Supabase
2. API para crear/obtener reviews
3. Componente formulario review
4. Mostrar reviews en detalle de piso
5. Agregar Schema.org

---

#### 6. **Optimización Core Web Vitals**
**Impacto:** Ranking en Google (Page Experience Update)
**Esfuerzo:** 3-4 horas

**Métricas objetivo:**
- LCP (Largest Contentful Paint): < 2.5s ✅ (probablemente ya cumple)
- FID (First Input Delay): < 100ms ✅ (probablemente ya cumple)
- CLS (Cumulative Layout Shift): < 0.1 ⚠️ **Revisar**

**Tareas:**
- [ ] Agregar `width` y `height` a todas las imágenes
- [ ] Preload fuentes críticas
- [ ] Diferir scripts no críticos
- [ ] Optimizar CSS above-the-fold
- [ ] Lazy load iframes (mapas, widgets)

**Implementación:**
```tsx
// src/app/layout.tsx
<link 
  rel="preload" 
  href="/fonts/inter.woff2" 
  as="font" 
  type="font/woff2" 
  crossOrigin="anonymous"
/>
```

---

#### 7. **Sitemap: Frecuencia de actualización real**
**Impacto:** Google rastrea con mayor frecuencia
**Esfuerzo:** 1 hora

**Problema actual:**
- Todas las fechas son `new Date()` (hoy)
- No refleja cambios reales

**Solución:**
```tsx
// src/app/sitemap.ts
const { data } = await supabase
  .from('listings')
  .select('id, updated_at')

return data.map(listing => ({
  url: `${BASE_URL}/pisos/${listing.id}`,
  lastModified: new Date(listing.updated_at), // Fecha real de actualización
  changeFrequency: 'weekly',
  priority: 0.8
}))
```

---

### PRIORIDAD MEDIA 🟢

#### 8. **Hreflang para multi-idioma** (Futuro)
**Impacto:** SEO internacional si expandes a Cataluña/País Vasco
**Esfuerzo:** 6-8 horas

**Implementación:**
```tsx
// src/app/layout.tsx
<link rel="alternate" hreflang="es" href="https://inmonest.com" />
<link rel="alternate" hreflang="ca" href="https://inmonest.com/ca" />
<link rel="alternate" hreflang="eu" href="https://inmonest.com/eu" />
```

---

#### 9. **Microformatos HTML5** (Opcional)
**Impacto:** Bajo (Schema.org es más importante)
**Esfuerzo:** 2 horas

```html
<article itemscope itemtype="https://schema.org/RealEstateProperty">
  <h1 itemprop="name">{listing.title}</h1>
  <span itemprop="price">{listing.price_eur}</span>
</article>
```

---

#### 10. **Artículos relacionados en blog**
**Impacto:** Mayor tiempo en página, menor bounce rate
**Esfuerzo:** 2 horas

**Implementación:**
```tsx
// src/app/blog/[slug]/page.tsx
<section>
  <h2>Artículos relacionados</h2>
  {relatedPosts.map(post => (
    <Link href={`/blog/${post.slug}`}>
      {post.title}
    </Link>
  ))}
</section>
```

---

## 📈 MEJORAS ADICIONALES (NICE TO HAVE)

### 11. **Google Search Console Integration**
- Crear cuenta GSC
- Verificar propiedad con meta tag
- Enviar sitemap manualmente
- Monitorear errores de rastreo

### 12. **Bing Webmaster Tools**
- Crear cuenta
- Verificar propiedad
- Enviar sitemap

### 13. **Lighthouse CI en GitHub Actions**
- Auditoría automática de SEO/performance en cada PR
- Bloquear merge si score < 90

### 14. **Canonical URLs dinámicas con query params**
```tsx
// Problema: /pisos?ciudad=madrid y /madrid/pisos son duplicados
// Solución: Canonical siempre apunta a versión preferida
<link rel="canonical" href="https://inmonest.com/madrid/pisos" />
```

### 15. **Meta tags para WhatsApp/Telegram**
```tsx
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="..." />
```

---

## 🎯 PLAN DE ACCIÓN RECOMENDADO

### Fase 1 (Esta semana) - **4-5 horas**
1. ✅ Schema.org Organization en layout.tsx
2. ✅ Schema.org RealEstateProperty en listings
3. ✅ Schema.org LocalBusiness en gestoría
4. ✅ Breadcrumbs schema completos

### Fase 2 (Próxima semana) - **3-4 horas**
5. ✅ Core Web Vitals audit + fixes
6. ✅ Sitemap con fechas reales
7. ✅ Google Search Console setup

### Fase 3 (Futuro, requiere features) - **6-8 horas**
8. ⏳ Sistema de reviews + AggregateRating
9. ⏳ Artículos relacionados
10. ⏳ Lighthouse CI

---

## 📊 MÉTRICAS DE ÉXITO

**KPIs a medir:**
- 📈 Posición promedio en Google Search Console
- 📊 Impresiones orgánicas (objetivo: +50% en 3 meses)
- 🔍 CTR orgánico (objetivo: > 3%)
- ⚡ Core Web Vitals (objetivo: 100% verde)
- 📱 Mobile usability (objetivo: 0 errores)
- 🔗 Backlinks (objetivo: 50+ dominios en 6 meses)

---

## ❗ URGENTE - ANTES DE LANZAR

### Checklist Pre-Lanzamiento SEO:
- [ ] Todas las páginas tienen title + description
- [ ] Sitemap.xml accesible y enviado a GSC
- [ ] robots.txt permite rastreo
- [ ] Schema.org Organization implementado
- [ ] Schema.org en listings implementado
- [ ] Core Web Vitals en verde
- [ ] No hay contenido duplicado (canonical correcto)
- [ ] Todas las imágenes tienen alt text
- [ ] URLs limpias (sin query params innecesarios)
- [ ] HTTPS habilitado ✅ (Vercel)
- [ ] Certificado SSL válido ✅ (Vercel)
- [ ] Redirect 301 de www → no-www (o viceversa)
- [ ] Página 404 personalizada
- [ ] Velocidad de carga < 3s

---

**Última actualización:** 30 de Abril de 2026
**Responsable SEO:** Daniel HDZ
**Próxima revisión:** 7 de Mayo de 2026
