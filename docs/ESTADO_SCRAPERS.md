# Estado de Scrapers - Mayo 2026

## ✅ Scrapers Activos y Validados

### Pisos.com
- **Estado**: ✅ ACTIVO - Calidad verificada
- **Volumen**: 545 pisos (489 particulares, 56 agencias)
- **Calidad**: Alta - Imágenes HD, datos completos
- **Cron**: 07:00 AM diario

### Solvia (Banco Sabadell)
- **Estado**: ✅ ACTIVO - Productos bancarios de calidad
- **Volumen**: 10 pisos
- **Calidad**: Alta - Agencia bancaria oficial
- **Cron**: Maintenance 06:00 AM

### Gilmar
- **Estado**: ✅ ACTIVO - Agencia premium
- **Volumen**: 17 pisos
- **Calidad**: Alta
- **Cron**: Maintenance 06:00 AM

### Wallapop (Solo Particulares)
- **Estado**: ✅ ACTIVO - Filtro estricto de particulares
- **Volumen**: 1 piso particular verificado
- **Nota**: Pisos de agencia eliminados
- **Cron**: Maintenance 06:00 AM

### Hipoges
- **Estado**: ✅ ACTIVO - Calidad verificada ⭐ NUEVO
- **Volumen**: 5 pisos (productos bancarios)
- **Calidad**: Alta - Imágenes nítidas, datos completos
- **Nota**: Scraper arreglado con selector `init-similar-card`
- **Cron**: Maintenance 06:00 AM

---

## ❌ Scrapers Desactivados (Baja Calidad)

### Properstar
- **Estado**: ❌ ELIMINADO
- **Razón**: Imágenes de baja calidad, datos incompletos
- **Acción**: Todos los pisos eliminados de la BD

### Indomio
- **Estado**: ❌ BLOQUEADO
- **Razón**: Anti-bot 403 Forbidden
- **Cron**: Desactivado

---

## 📋 Política de Calidad

### Estándares Mínimos:
1. **Imágenes**: Resolución mínima 800x600, sin marcas de agua excesivas
2. **Datos**: Precio, m², habitaciones, ubicación completa
3. **Particulares**: Verificación estricta (sin agencias disfrazadas)
4. **Duplicados**: Sistema de deduplicación activo

### Proceso de Validación para Nuevos Scrapers:
1. **Fase 1**: Máximo 2 pisos de prueba
2. **Fase 2**: Revisión manual de calidad
3. **Fase 3**: Aprobación para volumen completo
4. **Fase 4**: Monitoreo continuo

---

## 🎯 Portales Activos por Tipo

### Particulares (84%)
- Pisos.com: 489
- Wallapop: 1
- **Total**: 490 pisos

### Agencias Verificadas (16%)
- Pisos.com: 56
- Solvia: 10
- Gilmar: 17
- Hipoges: 5 ⭐ NUEVO
- **Total**: 88 pisos

### Total General: 578 pisos

---

## 🚫 Wallapop - Pisos de Agencia Eliminados

Se eliminaron todos los pisos de agencia de Wallapop porque:
- Wallapop debe ser exclusivamente para particulares
- Las agencias en Wallapop suelen tener calidad inferior
- Interfiere con la propuesta de valor de "sin comisiones"

---

Última actualización: 1 de Mayo 2026
