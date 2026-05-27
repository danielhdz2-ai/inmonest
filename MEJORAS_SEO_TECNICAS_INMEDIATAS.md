# 🔧 MEJORAS SEO TÉCNICAS - IMPLEMENTACIÓN INMEDIATA
**Fecha**: 27 Mayo 2026  
**Tiempo estimado**: 4-6 horas  
**Impacto esperado**: +200% tráfico en 30 días

---

## 🚨 PRIORIDAD CRÍTICA - HACER HOY

### ✅ **TAREA 1: Optimizar Meta Tags Páginas de Arras (30 min)**

#### **Archivo**: `src/lib/contrato-arras-premium-config.ts`

**PROBLEMA ACTUAL**: Keywords insuficientes en páginas de arras por ciudad

**SOLUCIÓN**: Expandir keywords en cada configuración de ciudad

```typescript
// EJEMPLO: Bilbao - ANTES
keywords: ['contrato arras Bilbao', 'arras País Vasco']

// EJEMPLO: Bilbao - DESPUÉS
keywords: [
  'contrato de arras bilbao',
  'contrato arras penitenciales bilbao',
  'contrato arras confirmatorias bilbao',
  'modelo contrato arras bilbao',
  'precio contrato arras bilbao',
  'gestoría arras bilbao',
  'abogado contrato arras bilbao',
  'revision contrato arras bilbao',
  'contrato arras país vasco',
  'contrato arras vizcaya'
]
```

**APLICAR A TODAS LAS CIUDADES**:
- bilbao
- madrid
- barcelona
- valencia
- sevilla
- malaga
- zaragoza
- murcia
- palma
- (todas las demás)

**CÓDIGO A MODIFICAR**:
```typescript
export const CONTRATO_ARRAS_PREMIUM: Record<string, ContratoArrasPremiumConfig> = {
  bilbao: {
    slug: 'bilbao',
    nombre: 'Bilbao',
    meta: {
      title: 'Contrato de Arras en Bilbao 【145€】 Penitenciales · Gestoría Digital',
      description: '¿Vas a dar arras en Bilbao? Contrato redactado por abogados en 48h. Protección comprador/vendedor. Penitenciales y confirmatorias. Desde 145€.',
      keywords: [
        'contrato de arras bilbao',
        'contrato arras penitenciales bilbao',
        'contrato arras confirmatorias bilbao',
        'modelo contrato arras bilbao',
        'precio contrato arras bilbao',
        'gestoría arras bilbao',
        'abogado contrato arras bilbao',
        'revision contrato arras bilbao',
        'contrato arras país vasco',
        'contrato arras vizcaya',
        'cuanto se da de arras bilbao',
        'arras compraventa piso bilbao'
      ],
      // ... resto de config
    }
  }
}
```

---

### ✅ **TAREA 2: Mejorar Titles y Descriptions de Alquiler (30 min)**

#### **Archivo**: `src/lib/contrato-alquiler-premium-config.ts`

**PROBLEMA**: Titles muy largos (>60 caracteres) y descriptions genéricas

**SOLUCIÓN**: Acortar titles + añadir urgencia/precio + mejorar descriptions

**EJEMPLO: Madrid**

```typescript
// ANTES
title: '¿Necesitas redactar el contrato de alquiler en Madrid? 120 € · 48 h | Inmonest'  // 78 caracteres - DEMASIADO

// DESPUÉS
title: 'Contrato Alquiler Madrid 【120€】 LAU 2026 · Gestoría Digital'  // 58 caracteres - PERFECTO

// ANTES  
description: '¿Necesitas redactar un contrato de alquiler en Madrid? LAU + Ley Vivienda 2026, 48h, precio cerrado 120€. Madrid capital y Comunidad de Madrid.'

// DESPUÉS
description: 'Contrato de alquiler LAU en Madrid redactado por abogados. Cumple Ley Vivienda 2026. Protección propietario e inquilino. Entrega en 48h. Desde 120€.'
```

**APLICAR A**:
- madrid
- barcelona
- valencia
- sevilla
- malaga
- bilbao
- mallorca
- castellon
- zaragoza
- granada
- (todas las demás)

---

### ✅ **TAREA 3: Crear robots.txt Optimizado (5 min)**

#### **Archivo**: `public/robots.txt`

**PROBLEMA ACTUAL**: No bloquea páginas privadas ni rutas dinámicas

**CÓDIGO A REEMPLAZAR**:

```txt
# ANTES
User-agent: *
Allow: /

Sitemap: https://inmonest.com/sitemap.xml

# DESPUÉS
User-agent: *

# Permitir rastreo general
Allow: /

# Bloquear páginas privadas
Disallow: /mi-cuenta/
Disallow: /admin/
Disallow: /api/

# Bloquear páginas de autenticación
Disallow: /login
Disallow: /registro
Disallow: /auth/

# Bloquear búsquedas con parámetros
Disallow: /pisos?*
Disallow: /pisos/*?*

# Bloquear gestoria/error
Disallow: /gestoria/error

# Permitir páginas importantes
Allow: /gestoria/
Allow: /blog/
Allow: /pisos/$

# Sitemaps
Sitemap: https://inmonest.com/sitemap.xml

# Crawl-delay para bots agresivos
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

User-agent: *
Crawl-delay: 2
```

---

### ✅ **TAREA 4: Añadir Breadcrumbs Schema (1 hora)**

#### **Archivos a modificar**:
- `src/components/ContratoAlquilerCiudadPremium.tsx`
- `src/components/ContratoArrasCiudadPremium.tsx`

**CÓDIGO A AÑADIR** (en ambos componentes):

```typescript
export default function ContratoAlquilerCiudadPremium({ config }: { config: ContratoAlquilerPremiumConfig }) {
  
  // Schema de breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Inicio',
        'item': 'https://inmonest.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': config.nombre,
        'item': `https://inmonest.com/${config.slug}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Contrato de Alquiler',
        'item': `https://inmonest.com/${config.slug}/contrato-alquiler`
      }
    ]
  }

  return (
    <>
      {/* Añadir schema breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* ... resto del componente */}
    </>
  )
}
```

---

### ✅ **TAREA 5: Optimizar Sitemap - Prioridades (15 min)**

#### **Archivo**: `src/app/sitemap.ts`

**PROBLEMA**: Todas las páginas de gestoría tienen priority 0.85 (demasiado alta)

**SOLUCIÓN**: Priorizar según importancia estratégica

```typescript
// PÁGINAS DE SERVICIO PRINCIPAL (conversión directa)
{ url: `${BASE_URL}/gestoria/solicitar/arras-penitenciales`,     priority: 0.95 },  // Antes: 0.85
{ url: `${BASE_URL}/gestoria/solicitar/contrato-alquiler`,       priority: 0.95 },  // Antes: 0.85
{ url: `${BASE_URL}/gestoria/revision-contrato-alquiler`,        priority: 0.92 },  // Antes: 0.88
{ url: `${BASE_URL}/gestoria/revision-contrato-arras`,           priority: 0.92 },  // Antes: 0.88

// LANDING PAGES CIUDAD - ALQUILER (tráfico local alto)
{ url: `${BASE_URL}/madrid/contrato-alquiler`,                   priority: 0.90 },  // NUEVO
{ url: `${BASE_URL}/barcelona/contrato-alquiler`,                priority: 0.90 },  // NUEVO
{ url: `${BASE_URL}/valencia/contrato-alquiler`,                 priority: 0.88 },  // NUEVO
{ url: `${BASE_URL}/mallorca/contrato-alquiler`,                 priority: 0.80 },  // Antes: no estaba
{ url: `${BASE_URL}/castellon/contrato-alquiler`,                priority: 0.80 },  // Antes: no estaba

// ARTÍCULOS BLOG (SEO informativo)
{ url: `${BASE_URL}/blog/contrato-arras-diferencias`,            priority: 0.85 },  // Antes: sin especificar
{ url: `${BASE_URL}/blog/contrato-alquiler-vivienda-guia`,       priority: 0.85 },  // Antes: sin especificar
{ url: `${BASE_URL}/blog/clausulas-abusivas-contrato-alquiler`,  priority: 0.82 },  // Antes: 0.84

// SERVICIOS SECUNDARIOS (menor conversión)
{ url: `${BASE_URL}/gestoria/solicitar/alquiler-habitaciones`,   priority: 0.75 },  // Antes: 0.82
{ url: `${BASE_URL}/gestoria/solicitar/alquiler-garaje-trastero`, priority: 0.70 }, // Antes: 0.78
```

---

### ✅ **TAREA 6: Añadir AggregateRating Schema (30 min)**

#### **Archivos**: Páginas de servicio principales

**OBJETIVO**: Mostrar estrellas ⭐⭐⭐⭐⭐ en Google

**CÓDIGO A AÑADIR** (ejemplo para arras-penitenciales):

```typescript
// src/app/gestoria/solicitar/[servicio]/page.tsx

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  'name': data.nombre,
  'description': data.incluye.join('. '),
  'brand': {
    '@type': 'Brand',
    'name': 'Inmonest'
  },
  'offers': {
    '@type': 'Offer',
    'price': data.precio,
    'priceCurrency': 'EUR',
    'availability': 'https://schema.org/InStock',
    'url': `${BASE_URL}/gestoria/solicitar/${servicio}`
  },
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.9',
    'reviewCount': '312',
    'bestRating': '5',
    'worstRating': '1'
  }
}

// En el return:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
/>
```

**IMPORTANTE**: Estas valoraciones deben ser REALES. Si no tienes 312 reviews, usa números reales:
- Si tienes 0 reviews: NO añadas AggregateRating todavía
- Si tienes 10+ reviews: Usa datos reales

---

### ✅ **TAREA 7: Internal Linking Automático (1 hora)**

#### **Archivo**: `src/app/page.tsx` (homepage)

**OBJETIVO**: Añadir sección "Servicios Más Solicitados" con enlaces optimizados

**CÓDIGO A AÑADIR** (después del hero):

```typescript
{/* NUEVA SECCIÓN: Servicios Destacados */}
<section className="py-16 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Contratos más solicitados
      </h2>
      <p className="text-xl text-gray-600">
        Redactados por abogados especializados. Entrega en 48h.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Contrato de Arras */}
      <Link href="/gestoria/solicitar/arras-penitenciales" className="group">
        <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-[#c9a84c] transition-all hover:shadow-xl">
          <div className="text-5xl mb-4">📄</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#c9a84c]">
            Contrato de Arras
          </h3>
          <p className="text-gray-600 mb-4">
            Protege tu compraventa. Penitenciales y confirmatorias. Revisión de nota simple incluida.
          </p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-[#c9a84c]">145€</span>
            <span className="text-gray-500 line-through">200€</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Redacción personalizada
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Revisión nota simple
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Entrega en 48h
            </li>
          </ul>
          <div className="bg-[#c9a84c] text-white px-6 py-3 rounded-lg font-semibold text-center group-hover:bg-[#b8972a] transition">
            Solicitar contrato →
          </div>
        </div>
      </Link>

      {/* Contrato de Alquiler LAU */}
      <Link href="/gestoria/solicitar/contrato-alquiler" className="group">
        <div className="border-2 border-[#c9a84c] rounded-xl p-8 hover:shadow-2xl transition-all relative">
          <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Más Popular
          </div>
          <div className="text-5xl mb-4">🏠</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#c9a84c]">
            Contrato de Alquiler LAU
          </h3>
          <p className="text-gray-600 mb-4">
            Cumple Ley Vivienda 2026. Protección propietario e inquilino. Cláusulas personalizadas.
          </p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-[#c9a84c]">120€</span>
            <span className="text-gray-500 line-through">180€</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              LAU + Ley Vivienda 2026
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Fianza y garantías
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Actualización renta IPC
            </li>
          </ul>
          <div className="bg-[#c9a84c] text-white px-6 py-3 rounded-lg font-semibold text-center group-hover:bg-[#b8972a] transition">
            Solicitar contrato →
          </div>
        </div>
      </Link>

      {/* Revisión Legal */}
      <Link href="/gestoria/revision-contrato-alquiler" className="group">
        <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-[#c9a84c] transition-all hover:shadow-xl">
          <div className="text-5xl mb-4">⚖️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#c9a84c]">
            Revisión Legal
          </h3>
          <p className="text-gray-600 mb-4">
            ¿Ya tienes un contrato? Lo revisamos en 24h. Detectamos cláusulas abusivas e ilegales.
          </p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-[#c9a84c]">60€</span>
            <span className="text-gray-500 line-through">90€</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Revisión completa 24h
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Detección cláusulas ilegales
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Informe detallado PDF
            </li>
          </ul>
          <div className="bg-[#c9a84c] text-white px-6 py-3 rounded-lg font-semibold text-center group-hover:bg-[#b8972a] transition">
            Revisar mi contrato →
          </div>
        </div>
      </Link>
    </div>

    {/* CTA Ver todos los servicios */}
    <div className="text-center mt-12">
      <Link
        href="/gestoria"
        className="inline-block bg-white border-2 border-[#c9a84c] text-[#c9a84c] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#c9a84c] hover:text-white transition"
      >
        Ver todos los servicios de gestoría →
      </Link>
    </div>
  </div>
</section>
```

**BENEFICIO SEO**:
- 3 enlaces internos con anchor text optimizado
- Keywords en H2 y H3
- Precios visibles (Google puede mostrarlos)
- CTR mejorado desde homepage

---

### ✅ **TAREA 8: Añadir Canonical URLs Faltantes (15 min)**

#### **Verificar en todas las páginas de ciudad**

**PROBLEMA**: Algunas páginas ciudad pueden no tener canonical

**SOLUCIÓN**: Verificar y añadir en metadata

```typescript
// Ejemplo: src/app/mallorca/contrato-alquiler/page.tsx

export const metadata: Metadata = {
  title: cfg.meta.title,
  description: cfg.meta.description,
  keywords: cfg.meta.keywords,
  
  // AÑADIR ESTO:
  alternates: {
    canonical: `https://inmonest.com/${cfg.slug}/contrato-alquiler`
  },
  
  // ... resto de metadata
}
```

**APLICAR A**:
- /mallorca/contrato-alquiler
- /castellon/contrato-alquiler
- /zaragoza/contrato-alquiler
- /granada/contrato-alquiler
- /gestoria/sevilla
- Todas las landing pages ciudad

---

## 🎯 CHECKLIST IMPLEMENTACIÓN

**Copiar y pegar en tu gestor de tareas**:

```markdown
### SEO Técnico - Hoy
- [ ] TAREA 1: Expandir keywords en contrato-arras-premium-config.ts (30 min)
- [ ] TAREA 2: Optimizar titles/descriptions en contrato-alquiler-premium-config.ts (30 min)
- [ ] TAREA 3: Actualizar robots.txt (5 min)
- [ ] TAREA 4: Añadir BreadcrumbList schema en componentes ciudad (1 hora)
- [ ] TAREA 5: Ajustar prioridades en sitemap.ts (15 min)
- [ ] TAREA 6: Añadir AggregateRating schema (30 min)
- [ ] TAREA 7: Sección "Servicios Destacados" en homepage (1 hora)
- [ ] TAREA 8: Verificar canonical URLs (15 min)

TIEMPO TOTAL: 4h 35min
```

---

## 📈 IMPACTO ESPERADO

**Después de implementar estas 8 tareas**:

| Métrica | Antes | Después (30 días) | Mejora |
|---------|-------|-------------------|--------|
| Impresiones | 345/mes | 5,000/mes | +1,350% |
| Clics | 48/mes | 250/mes | +420% |
| CTR | 13.91% | 15% | +8% |
| Posiciones Top 10 | 3 keywords | 25 keywords | +733% |
| Conversiones SEO | 0/mes | 10/mes | +∞ |
| Ingresos SEO | 0€ | 1,200€/mes | +∞ |

---

## 🚀 SIGUIENTE PASO

**Una vez implementadas estas 8 tareas**, continúa con:

1. **Crear artículos de blog** (ver ESTRATEGIA_SEO_GESTORIA_TRAFICO.md)
2. **Landing pages ciudad**: Madrid, Barcelona, Valencia
3. **Link building**: Guest posting + Digital PR

**¿Necesitas ayuda con alguna tarea?** Avísame y te genero el código exacto para copiar y pegar.

---

**Última actualización**: 27 Mayo 2026  
**Próxima revisión**: 3 Junio 2026 (verificar resultados)
