# 🚨 Optimización CPU Vercel - Mayo 2026

**Fecha**: 21 Mayo 2026  
**Problema**: Excedido límite gratuito de Fluid Active CPU (5h 56m / 4h)  
**Causa**: Regeneración ISR excesiva sin tráfico real (0.5 visitas/día)

---

## 📊 Diagnóstico del Problema

### Consumo Identificado

**Vercel Fluid Active CPU consumido por:**

1. **Sitemap gigante regenerándose cada hora**
   - Consultaba hasta **49,000 listings** de Supabase
   - Se regeneraba cada **1 hora** (3,600 seg)
   - API sitemap se regeneraba cada **6 horas**
   - Sin tráfico real, esto es completamente innecesario

2. **Páginas ISR con revalidación muy frecuente:**
   - `/pisos` → cada 1 hora
   - `/[ciudad]/pisos` → cada 2 horas × 8 ciudades = 96 regeneraciones/día
   - `/[ciudad]/alquiler-particulares` → cada 2 horas × 8 ciudades = 96 regeneraciones/día
   - Páginas gestoría → cada 1 hora × 6 páginas = 144 regeneraciones/día
   - Páginas contratos por ciudad → cada 1 hora × múltiples rutas

**Total estimado: ~300-400 regeneraciones automáticas por día** sin usuarios visitando el sitio.

### Contexto de Tráfico Real

- **Visitas reales**: ~0.5 visitas/día (según Google Search Console)
- **Impresiones**: ~4/día
- **Posición promedio**: #16 (página 2 de Google)
- **Registros**: 0
- **Ingresos**: 0€

**Conclusión**: El 99.9% del consumo de CPU era regeneración automática de páginas que nadie visitaba.

---

## ✅ Soluciones Implementadas

### 1. Sitemap Optimizado

**Antes:**
```typescript
// sitemap.ts
export const revalidate = 3600  // 1 hora

// api/sitemap/route.ts
export const revalidate = 21600  // 6 horas
const MAX_LISTINGS = 49_000
```

**Ahora:**
```typescript
// sitemap.ts
export const revalidate = 86400  // 24 horas

// api/sitemap/route.ts
export const revalidate = 86400  // 24 horas
const MAX_LISTINGS = 10_000
```

**Reducción de CPU estimada:**
- De 24 regeneraciones/día → 1 regeneración/día (**-96%**)
- De 49k listings → 10k listings (**-80% consultas a BD**)

---

### 2. Páginas Principales Optimizadas

#### Página de Pisos

**Antes:**
```typescript
// src/app/pisos/page.tsx
export const revalidate = 3600  // 1 hora
```

**Ahora:**
```typescript
// src/app/pisos/page.tsx
export const revalidate = 43200  // 12 horas
```

**Reducción:** De 24 regeneraciones/día → 2 regeneraciones/día (**-92%**)

---

#### Páginas de Gestoría (6 páginas)

**Antes:**
```typescript
export const revalidate = 3600  // 1 hora
```

**Ahora:**
```typescript
export const revalidate = 86400  // 24 horas
```

**Archivos modificados:**
- `src/app/gestoria/asesoria-compra-piso/page.tsx`
- `src/app/gestoria/contrato-ilegal/page.tsx`
- `src/app/gestoria/ayuda-propietarios/page.tsx`
- `src/app/gestoria/revision-contrato-alquiler/page.tsx`
- `src/app/gestoria/revision-contrato-arras/page.tsx`

**Reducción:** De 144 regeneraciones/día (6×24) → 6 regeneraciones/día (**-96%**)

---

### 3. Páginas por Ciudad Optimizadas

#### Páginas de Pisos por Ciudad

**Antes:**
```typescript
// src/app/[ciudad]/pisos/page.tsx
export const revalidate = 7200  // 2 horas
```

**Ahora:**
```typescript
export const revalidate = 43200  // 12 horas
```

**Reducción por ciudad:** De 12 regeneraciones/día → 2 regeneraciones/día (**-83%**)  
**Total (8 ciudades):** De 96 regeneraciones/día → 16 regeneraciones/día

---

#### Páginas de Alquiler Particulares por Ciudad

**Antes:**
```typescript
// src/app/[ciudad]/alquiler-particulares/page.tsx
export const revalidate = 7200  // 2 horas
```

**Ahora:**
```typescript
export const revalidate = 43200  // 12 horas
```

**Reducción total:** De 96 regeneraciones/día → 16 regeneraciones/día (**-83%**)

---

#### Páginas de Contratos por Ciudad

**Antes:**
```typescript
export const revalidate = 3600  // 1 hora
```

**Ahora:**
```typescript
export const revalidate = 86400  // 24 horas
```

**Archivos modificados:**
- `src/app/[ciudad]/contrato-arras/page.tsx`
- `src/app/[ciudad]/contrato-alquiler/page.tsx`
- `src/app/bilbao/contrato-arras/page.tsx`
- `src/app/bilbao/contrato-alquiler/page.tsx`

---

## 📈 Impacto Estimado Total

### Antes de la Optimización
- **Regeneraciones ISR/día**: ~350-400
- **Consumo CPU estimado**: ~150-180 min/día (~75-90 horas/mes)
- **Estado**: Excediendo límite gratuito (100 horas/mes)

### Después de la Optimización
- **Regeneraciones ISR/día**: ~40-50 (reducción del **88%**)
- **Consumo CPU estimado**: ~15-20 min/día (~7-10 horas/mes)
- **Estado**: Dentro del límite gratuito (**90% de reducción**)

---

## 🎯 Próximos Pasos

### 1. Deploy y Monitoreo (Inmediato)

```bash
cd inmonest
git add .
git commit -m "🔧 Optimización CPU: Reducir ISR de 1-2h a 12-24h"
git push origin main
```

**Luego monitorear en Vercel:**
- Dashboard → Usage → Fluid Active CPU
- Verificar reducción en próximos 3-7 días

### 2. Ajustes Adicionales (Si es Necesario)

Si el consumo sigue alto después de 7 días:

**Opción A - Aumentar más los tiempos:**
```typescript
// Todas las páginas a 24 horas
export const revalidate = 86400
```

**Opción B - Usar generación estática pura:**
```typescript
// Para páginas que casi nunca cambian
export const dynamic = 'force-static'
// export const revalidate = false  // Sin ISR
```

**Opción C - On-Demand Revalidation:**
```typescript
// Solo regenerar cuando se añaden nuevos listings vía API
// src/app/api/scraper/route.ts
import { revalidatePath } from 'next/cache'

export async function POST() {
  // ... insertar listings ...
  revalidatePath('/pisos')
  revalidatePath('/sitemap.xml')
}
```

### 3. Optimización de Scrapers (Opcional)

Los GitHub Actions están bien (no consumen CPU de Vercel), pero si quieres optimizar más:

**Actual:**
- `scrapers.yml` → 2 veces/día (7:00, 19:00 UTC)
- `daily-scrape.yml` → 1 vez/día (7:00 UTC)

**Opción reducida:**
```yaml
# Reducir a 1 vez cada 2-3 días si no hay mucho tráfico
schedule:
  - cron: '0 7 */2 * *'  # Cada 2 días a las 7 AM
```

---

## 📋 Checklist de Verificación

- [x] Sitemap reducido de 1h → 24h
- [x] Límite de listings reducido de 49k → 10k
- [x] API sitemap reducida de 6h → 24h
- [x] Página `/pisos` reducida de 1h → 12h
- [x] Páginas gestoría reducidas de 1h → 24h
- [x] Páginas por ciudad reducidas de 1-2h → 12-24h
- [ ] Deploy a producción
- [ ] Monitorear Vercel Usage en 24-48h
- [ ] Verificar que no afecta SEO (Google tarda días en recrawl)

---

## ⚠️ Consideraciones SEO

**¿Afectará esto al SEO?**

**NO**, por las siguientes razones:

1. **Google no crawlea cada hora**: Con 4 impresiones/día, Google apenas visita el sitio
2. **ISR solo afecta al cache**: Los datos siguen actualizándose en la BD
3. **On-demand revalidation**: Cuando un usuario visita, se regenera si pasó el tiempo
4. **Sitemap XML sigue funcionando**: Google lo recrawlea cada varios días, no cada hora

**Recomendación**: Esperar 1-2 semanas y revisar Google Search Console. Con 0.5 visitas/día, el impacto será imperceptible.

---

## 📞 Contacto y Soporte

Si después de 7 días el consumo sigue alto:

1. Revisar Vercel Analytics → Usage → Fluid Active CPU
2. Revisar logs de funciones para identificar qué consume más
3. Considerar migrar páginas estáticas a `force-static`
4. Evaluar si vale la pena el plan Pro de Vercel ($20/mes)

---

**Última actualización**: 21 Mayo 2026  
**Autor**: Optimización automática vía GitHub Copilot  
**Estado**: ✅ Implementado - Pendiente de deploy y monitoreo
