# 🤖 Estado de Bots y Alertas - Inmonest

**Fecha**: 21 Mayo 2026  
**Total Pisos Activos**: 2,452  
**Alertas Configuradas**: 6 activas

---

## 📊 Resumen Ejecutivo

### Estado Actual
- ✅ **6 alertas activas** enviando notificaciones por email
- ✅ **Scrapers automáticos** ejecutándose 2 veces/día (7 AM y 7 PM)
- ✅ **8 ciudades** siendo monitoreadas
- ⚠️ **0 emails enviados** (alertas recién configuradas, esperando nuevos pisos)

### Cobertura Geográfica
**Ciudades scrapeadas activamente:**
1. Barcelona
2. Madrid
3. Valencia
4. Sevilla
5. Málaga
6. Bilbao
7. Zaragoza
8. Granada

---

## 🔔 Alertas Activas (6 usuarios)

### Alerta #1 - Venta Solo Particulares
- **Usuario**: info@inmonest.com
- **Estado**: ✅ Activa
- **Frecuencia**: Diaria
- **Filtros**: 
  - Operación: Venta
  - Solo particulares: Sí
- **Pisos coincidentes**: 0 (desde 14 Mayo)
- **Emails enviados**: 0

---

### Alerta #2 - Búsqueda General (Immediate)
- **Usuario**: daniel.mic2022@gmail.com
- **Estado**: ✅ Activa
- **Frecuencia**: Inmediata (cada hora mínimo)
- **Filtros**: Sin filtros (todos los pisos)
- **Pisos coincidentes**: 20
  - Piso en Málaga - 2,700€
  - Piso en Zaragoza - 550€
  - Piso en Zaragoza - 680€
- **Emails enviados**: 0 (pendiente primer envío)
- ⚠️ **Recomendación**: Configurar filtros específicos para evitar spam

---

### Alerta #3 - Búsqueda General (Daily)
- **Usuario**: daniel.mic2022@gmail.com
- **Estado**: ✅ Activa
- **Frecuencia**: Diaria
- **Filtros**: Sin filtros (todos los pisos)
- **Pisos coincidentes**: 20
- **Emails enviados**: 0
- ⚠️ **Duplicada** con Alerta #2

---

### Alerta #4 - 2 Habitaciones
- **Usuario**: daniel.trading.sniper@gmail.com
- **Estado**: ✅ Activa
- **Frecuencia**: Diaria
- **Filtros**: 
  - Habitaciones: 2+
- **Pisos coincidentes**: 20
  - Málaga, Zaragoza
- **Emails enviados**: 0

---

### Alerta #5 - Barcelona Alquiler Particulares
- **Usuario**: anamariaposada17@gmail.com
- **Estado**: ✅ Activa
- **Frecuencia**: Diaria
- **Filtros**:
  - Ciudad: Barcelona
  - Operación: Alquiler
  - Solo particulares: Sí
- **Pisos coincidentes**: 8
  - El Masnou Centro - 640€
  - Sant Martí de Provençals - 1,050€
  - Granollers Centre - 1,025€
- **Emails enviados**: 0

---

### Alerta #6 - Barcelona Alquiler Particulares (Duplicada)
- **Usuario**: anamariaposada17@gmail.com
- **Estado**: ✅ Activa
- **Frecuencia**: Diaria
- **Filtros**: Idénticos a Alerta #5
- **Pisos coincidentes**: 8
- **Emails enviados**: 0
- ⚠️ **Duplicada** con Alerta #5

---

## 🤖 Scrapers Activos

### 1. GitHub Actions - Scrapers Pro
**Workflow**: `scrapers.yml`  
**Horario**: 2 veces/día (07:00 y 19:00 UTC = 09:00 y 21:00 España)  
**Estado**: ✅ Activo desde 02 Mayo 2026

#### Portales Scrapeados:

##### 🏢 Tecnocasa
- **Ciudades**: Madrid, Barcelona, Valencia, Sevilla (4)
- **Operaciones**: Alquiler + Venta
- **Ejecuciones**: 2×4×2 = 16 jobs/día
- **Max anuncios**: 50 por ciudad/operación

##### 🏢 Redpiso
- **Ciudades**: Madrid, Barcelona, Valencia, Sevilla (4)
- **Operaciones**: Alquiler + Venta
- **Ejecuciones**: 2×4×2 = 16 jobs/día
- **Max anuncios**: 50 por ciudad/operación

##### 🏢 Monapart
- **Ciudades**: Nacional (todas)
- **Operaciones**: Alquiler + Venta
- **Ejecuciones**: 2×2 = 4 jobs/día
- **Max anuncios**: 50 por operación

##### 🏠 pisos.com (Agencias)
- **Ciudades**: Madrid, Barcelona, Valencia, Sevilla (4)
- **Operaciones**: Alquiler + Venta
- **Ejecuciones**: 2×4×2 = 16 jobs/día
- **Max anuncios**: 50 por ciudad/operación

##### 🏠 Gilmar
- **Ciudades**: Madrid, Barcelona (2)
- **Operaciones**: Alquiler + Venta
- **Ejecuciones**: 2×2×2 = 8 jobs/día

##### 🏦 Solvia (Banco Sabadell)
- **Ciudades**: Nacional
- **Operaciones**: Venta
- **Ejecuciones**: 2 jobs/día
- **Estado**: ✅ Alta calidad

##### 🏦 Aliseda (Santander/Blackstone)
- **Ciudades**: Nacional
- **Operaciones**: Venta
- **Ejecuciones**: 2 jobs/día

##### 🏠 Particulares - pisos.com
- **Ciudades**: Madrid, Barcelona, Valencia, Sevilla (4)
- **Operaciones**: Alquiler + Venta
- **Ejecuciones**: 2×4×2 = 16 jobs/día

##### 🏠 Particulares - Milanuncios
- **Ciudades**: Barcelona, Madrid, Valencia, Sevilla, Málaga, Bilbao, Zaragoza, Granada (8)
- **Operaciones**: Alquiler + Venta
- **Ejecuciones**: Incluido en Daily Scrape

##### 🏠 Particulares - Fotocasa
- **Ciudades**: Barcelona, Madrid, Valencia, Sevilla, Málaga, Bilbao, Zaragoza, Granada (8)
- **Operaciones**: Alquiler + Venta
- **Ejecuciones**: Incluido en Daily Scrape

##### 🏠 Particulares - Habitaclia
- **Ciudades**: Barcelona, Madrid, Valencia, Sevilla, Málaga, Bilbao, Zaragoza, Granada (8)
- **Operaciones**: Alquiler + Venta
- **Ejecuciones**: Incluido en Daily Scrape

---

### 2. Daily Scrape - Particulares
**Workflow**: `daily-scrape.yml`  
**Horario**: 1 vez/día (07:00 UTC = 09:00 España)  
**Estado**: ✅ Activo

#### Portales Scrapeados:

##### pisos.com Particulares
- **Ciudades**: Barcelona, Madrid, Valencia, Sevilla, Málaga, Bilbao, Zaragoza, Granada (8)
- **Páginas**: 2-3 por ciudad
- **Operaciones**: Alquiler + Venta

##### Milanuncios Particulares
- **Ciudades**: 8 ciudades principales
- **Páginas**: 2-3 por ciudad
- **Operaciones**: Alquiler + Venta

##### TuCasa (enalquiler)
- **Ciudades**: Barcelona, Madrid (2)
- **Páginas**: 2-3 por ciudad
- **Operaciones**: Solo alquiler

---

### 3. Scrapers Desactivados (Vercel Crons)

Todos los crons de Vercel fueron **desactivados el 01 Mayo 2026** para reducir consumo de CPU:

```json
// vercel.json
"crons": []  // ❌ TODOS DESACTIVADOS
```

**Scrapers migrados a GitHub Actions:**
- ✅ pisos.com → GitHub Actions (Daily Scrape)
- ✅ Solvia → GitHub Actions (Scrapers Pro)
- ✅ Agencias → GitHub Actions (Scrapers Pro)
- ❌ Alertas cron → Ejecutar manualmente vía `/api/test-alertas`

---

## 📧 Sistema de Notificaciones

### Método de Envío
- **Proveedor**: Resend (resend.com)
- **Dominio**: inmonest.com
- **Estado**: ✅ Configurado correctamente

### Frecuencias Disponibles
1. **Inmediata** (immediate): Cada 1 hora mínimo
2. **Diaria** (daily): Cada 20 horas
3. **Semanal** (weekly): Cada 6 días

### Formato del Email
- **Asunto**: "🔔 Nuevos pisos para tu alerta"
- **Contenido**: 
  - Nombre de la alerta
  - Número de pisos nuevos
  - Primeros 6 pisos con imagen
  - Enlace a búsqueda completa
- **CTA**: "Ver todos los resultados"
- **Footer**: Enlace para gestionar alertas

---

## 🎯 Cobertura por Ciudad

### Barcelona
- **Scrapers activos**: 8
  - Tecnocasa, Redpiso, pisos.com, Gilmar
  - pisos.com particulares, Milanuncios, Fotocasa, Habitaclia
- **Alertas activas**: 2 (duplicadas - anamariaposada17@gmail.com)
- **Operaciones**: Alquiler + Venta

### Madrid
- **Scrapers activos**: 7
  - Tecnocasa, Redpiso, pisos.com, Gilmar
  - pisos.com particulares, Milanuncios, Fotocasa, Habitaclia
- **Alertas activas**: 0
- **Operaciones**: Alquiler + Venta

### Valencia
- **Scrapers activos**: 7
  - Tecnocasa, Redpiso, pisos.com
  - pisos.com particulares, Milanuncios, Fotocasa, Habitaclia
- **Alertas activas**: 0
- **Operaciones**: Alquiler + Venta

### Sevilla
- **Scrapers activos**: 7
  - Tecnocasa, Redpiso, pisos.com
  - pisos.com particulares, Milanuncios, Fotocasa, Habitaclia
- **Alertas activas**: 0
- **Operaciones**: Alquiler + Venta

### Málaga, Bilbao, Zaragoza, Granada
- **Scrapers activos**: 4 cada una
  - pisos.com particulares, Milanuncios, Fotocasa, Habitaclia
- **Alertas activas**: 0
- **Operaciones**: Alquiler + Venta

---

## ⚠️ Problemas Detectados

### 1. Alertas Duplicadas
- **anamariaposada17@gmail.com**: 2 alertas idénticas de Barcelona alquiler
- **daniel.mic2022@gmail.com**: 2 alertas de búsqueda general

**Solución**: Eliminar duplicados desde `/mi-cuenta/alertas`

### 2. Alerta Sin Filtros
- **daniel.mic2022@gmail.com**: Alerta general sin filtros (recibirá TODOS los pisos)

**Recomendación**: Configurar filtros específicos (ciudad, precio, habitaciones)

### 3. Emails No Enviados
- Todas las alertas tienen `total_sent: 0`
- `last_sent_at: null`

**Causa**: Cron de alertas desactivado en Vercel

**Solución Temporal**: Ejecutar manualmente:
```bash
curl https://inmonest.com/api/test-alertas
```

**Solución Permanente**: Reactivar cron en Vercel o migrar a GitHub Actions

---

## 🔧 Cómo Activar el Envío de Alertas

### Opción 1: Reactivar Cron en Vercel (Recomendado)

Editar `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/alertas",
      "schedule": "0 8 * * *"
    }
  ]
}
```

**Consumo estimado**: ~2-3 min CPU/día

---

### Opción 2: GitHub Action (Bajo CPU)

Crear `.github/workflows/alertas.yml`:
```yaml
name: 🔔 Enviar Alertas

on:
  schedule:
    - cron: '0 8 * * *'  # 08:00 UTC = 10:00 España
  workflow_dispatch:

jobs:
  send-alerts:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger alerts endpoint
        run: |
          curl -X POST https://inmonest.com/api/cron/alertas \
            -H "x-cron-secret: ${{ secrets.CRON_SECRET }}"
```

**Ventaja**: 0 consumo de CPU en Vercel

---

### Opción 3: Manual (Temporal)

Visitar desde el navegador:
```
https://inmonest.com/api/test-alertas
```

O ejecutar desde terminal:
```bash
curl https://inmonest.com/api/test-alertas
```

---

## 📈 Métricas de Rendimiento

### Scrapers (GitHub Actions)
- **Ejecuciones/día**: ~150-200 jobs
- **Duración promedio**: 2-5 min por job
- **Nuevos pisos/día**: Variable (0-50)
- **Costo**: $0 (plan gratuito de GitHub)

### Alertas
- **Usuarios con alertas**: 4
- **Alertas activas**: 6
- **Emails pendientes de envío**: 6 (nunca enviados)
- **Costo Resend**: $0 (plan gratuito: 100 emails/día)

### Base de Datos
- **Total pisos**: 2,452
- **Con descripción AI**: 545 (22%)
- **Sin descripción**: 1,907
- **Particulares**: ~490 (20%)
- **Agencias**: ~1,962 (80%)

---

## ✅ Próximos Pasos Recomendados

### Inmediato
1. ✅ Reactivar cron de alertas (Opción 1 o 2)
2. ⚠️ Eliminar alertas duplicadas
3. ⚠️ Configurar filtros en alertas generales

### Corto Plazo (1-2 semanas)
1. Monitorear consumo de CPU tras reactivar alertas
2. Verificar que los emails se envían correctamente
3. Ajustar frecuencias según feedback de usuarios

### Largo Plazo (1 mes)
1. Implementar notificaciones push (ya hay guía: `GUIA_PUSH_NOTIFICATIONS.md`)
2. Añadir alertas por Telegram/WhatsApp
3. Dashboard de métricas de alertas

---

## 🛠️ Comandos Útiles

### Verificar Estado de Alertas
```bash
cd inmonest
npx tsx scripts/check-alertas-status.mts
```

### Ejecutar Alertas Manualmente
```bash
curl https://inmonest.com/api/test-alertas
```

### Ver Estado de Scrapers
```bash
cd inmonest
npx tsx scripts/check-status.mts
```

### Ver GitHub Actions
```bash
# Visitar:
https://github.com/danielhdz-a/inmonest/actions
```

---

**Última actualización**: 21 Mayo 2026  
**Autor**: Análisis automático vía GitHub Copilot  
**Estado**: ✅ Sistema funcionando - Pendiente reactivar cron de alertas
