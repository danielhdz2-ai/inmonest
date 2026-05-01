# ⚙️ Crons Optimizados - Configuración Actual

## ✅ Estado Actual (2026-05-01)

**Scrapers activos optimizados:**
- ✅ **Pisos.com Particulares** - Lunes 07:00 AM (semanal)
- ✅ **Solvia (Banco Sabadell)** - Miércoles 07:00 AM (semanal)

**Consumo estimado:**
- Pisos.com: ~2-3 min CPU/semana
- Solvia: ~1-2 min CPU/semana
- **TOTAL: ~3-5 min CPU/semana = ~12-20 min/mes** (~5% del plan gratuito)

## 🚨 Problema Original Resuelto

**Fecha:** 2026-05-01  
**Causa:** Vercel alertó 75% de consumo CPU sin usuarios registrados

### Consumo Identificado

Los crons estaban ejecutándose **diariamente** consumiendo:
- **56-77 minutos CPU/semana** sin usuarios activos
- 4 crons × 7 días = 28 ejecuciones/semana
- Plan gratuito: 100 horas Fluid Active CPU/mes

## ✅ Solución Aplicada

### Crons Desactivados (todos)

```json
// vercel.json - ANTES (4 crons diarios)
"crons": [
  { "path": "/api/scraper",                    "schedule": "0 7 * * *" }, // 07:00 AM
  { "path": "/api/maintenance",                "schedule": "0 6 * * *" }, // 06:00 AM
  { "path": "/api/cron/alertas",               "schedule": "0 8 * * *" }, // 08:00 AM
  { "path": "/api/cron/generate-descriptions", "schedule": "0 9 * * *" }  // 09:00 AM
]

// vercel.json - AHORA (0 crons)
"crons": []
```

### Límites Agregados

```typescript
// src/app/api/maintenance/route.ts
export const maxDuration = 120 // 2 min máx.

// src/app/api/cron/alertas/route.ts  
export const maxDuration = 60 // Ya existía

// vercel.json
"src/app/api/maintenance/route.ts": { "maxDuration": 120 }
"src/app/api/cron/alertas/route.ts": { "maxDuration": 60 }
```

## 🔧 Ejecución Manual (cuando sea necesario)

### 1. Scrapers Activos (ya automáticos)

```bash
# Pisos.com - Se ejecuta automáticamente lunes 07:00 AM
# Solvia - Se ejecuta automáticamente miércoles 07:00 AM

# Para forzar ejecución manual inmediata:
curl https://inmonest.com/api/cron/scraper-pisoscom \
  -H "Authorization: Bearer $CRON_SECRET"

curl https://inmonest.com/api/cron/scraper-solvia \
  -H "Authorization: Bearer $CRON_SECRET"
```

### 2. Otros Scrapers (bajo demanda)

```bash
# Ejecutar scraper manualmente (local)
npx tsx scripts/scrapers/pisoscom_particulares.ts alquiler madrid 2

# Ejecutar TODOS los scrapers de una zona (cuidado con tiempo)
curl https://inmonest.com/api/scraper \
  -H "Authorization: Bearer $CRON_SECRET"
```

### 2. Mantenimiento

```bash
# Local - limpiar demanda + imágenes rotas
curl http://localhost:3000/api/maintenance \
  -H "x-cron-secret: $CRON_SECRET"

# Producción
curl https://inmonest.com/api/maintenance \
  -H "Authorization: Bearer $CRON_SECRET"
```

### 3. Generar Descripciones AI

```bash
# Local
curl http://localhost:3000/api/cron/generate-descriptions \
  -H "x-cron-secret: $CRON_SECRET"

# Producción
curl https://inmonest.com/api/cron/generate-descriptions \
  -H "Authorization: Bearer $CRON_SECRET"
```

### 4. Alertas de Usuarios

```bash
# Local
curl http://localhost:3000/api/cron/alertas \
  -H "x-cron-secret: $CRON_SECRET"

# Producción  
curl https://inmonest.com/api/cron/alertas \
  -H "Authorization: Bearer $CRON_SECRET"
```

## 📋 Cuándo Reactivar los Crons

### Fase 1: Pre-Lanzamiento (ACTUAL)
- ✅ Scrapers: **Manual solo para poblar BD inicial**
- ✅ Maintenance: **Manual 1×/semana**
- ✅ Alertas: **Desactivado** (no hay usuarios)
- ✅ Descripciones: **Manual bajo demanda**

### Fase 2: Primeros Usuarios (10-50 usuarios)
```json
"crons": [
  { "path": "/api/scraper",      "schedule": "0 7 * * 1" },    // Solo LUNES
  { "path": "/api/maintenance",  "schedule": "0 6 * * 0" },    // Solo DOMINGO
  { "path": "/api/cron/alertas", "schedule": "0 8 * * 1,4" }   // Lunes + Jueves
]
```

### Fase 3: Crecimiento (100+ usuarios)
```json
"crons": [
  { "path": "/api/scraper",                    "schedule": "0 7 * * *" },    // Diario
  { "path": "/api/maintenance",                "schedule": "0 6 * * 0,3" },  // Dom + Mié
  { "path": "/api/cron/alertas",               "schedule": "0 8 * * *" },    // Diario
  { "path": "/api/cron/generate-descriptions", "schedule": "0 9 * * 1,4" }   // Lun + Jue
]
```

### Fase 4: Producción Completa (1000+ usuarios)
```json
"crons": [
  { "path": "/api/scraper",                    "schedule": "0 7 * * *" },
  { "path": "/api/maintenance",                "schedule": "0 6 * * *" },
  { "path": "/api/cron/alertas",               "schedule": "0 8,20 * * *" }, // 2×/día
  { "path": "/api/cron/generate-descriptions", "schedule": "0 9 * * *" }
]
```

## 💡 Optimizaciones Futuras

### 1. Detección Automática de Usuarios
```typescript
// En cada cron, verificar primero si hay usuarios activos
const { count } = await supabase
  .from('auth.users')
  .select('*', { count: 'exact', head: true })

if (count === 0) {
  return NextResponse.json({ 
    skipped: true, 
    reason: 'No active users' 
  })
}
```

### 2. Scraper Incremental
```typescript
// Solo scrapear ciudades con usuarios activos
const activeCities = await supabase
  .from('saved_searches')
  .select('filters->ciudad')
  .neq('filters->ciudad', null)
// Ejecutar solo para esas ciudades
```

### 3. Throttling de Imágenes
```typescript
// En maintenance, verificar solo 20 pisos en vez de 80
const IMAGES_CHECK_LIMIT = 20 // Reducir carga
```

## 📊 Monitoreo

### Verificar Consumo en Vercel
1. Ve a: https://vercel.com/inmonest/usage
2. Revisa: **Fluid Active CPU (hours)**
3. Meta: Mantener < 50% hasta tener usuarios

### Logs de Ejecución
```bash
# Ver logs en Vercel
vercel logs inmonest --since=24h

# Filtrar solo crons
vercel logs inmonest --since=24h | grep "api/cron"
```

## ⚠️ Notas Importantes

1. **NUNCA reactivar todos los crons diarios** sin usuarios
2. **Scraper consume más CPU** que otros crons (300s vs 60s)
3. **Maintenance hace fetches** a imágenes externas (red intensivo)
4. **Plan Hobby de Vercel:** Solo permite crons diarios, no sub-hourly

## 🎯 KPIs para Reactivación

| Métrica | Umbral Mínimo | Cron a Activar |
|---------|---------------|----------------|
| Usuarios registrados | 10 | alertas (semanal) |
| Usuarios registrados | 50 | scraper (semanal) |
| Búsquedas guardadas | 25 | scraper (diario) |
| Alertas activas | 10 | alertas (diario) |
| Clicks en listings | 100/día | generate-descriptions |

---

**Última actualización:** 2026-05-01  
**Estado actual:** ✅ Todos los crons desactivados  
**Consumo actual:** ~0% (solo requests manuales)
