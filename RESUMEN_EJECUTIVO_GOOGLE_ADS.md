# ⚡ RESUMEN EJECUTIVO - Google Ads Inmonest

**Fecha:** 17 Mayo 2026  
**Estado actual:** Campaña bloqueada por clasificación incorrecta como "anuncio político"

---

## 🔥 HACER AHORA MISMO (Próximas 2 horas)

### 1️⃣ **Resolver el Rechazo de Google Ads**

📄 **Leer:** [RESOLVER_RECHAZO_ANUNCIO_POLITICO.md](./RESOLVER_RECHAZO_ANUNCIO_POLITICO.md)

**Acciones:**
1. Ir a Google Ads → Herramientas → Políticas
2. Solicitar revisión con el mensaje del documento
3. Ir a Google Ads → Herramientas → Verificación de anunciante
4. Completar verificación (subir DNI, factura, CIF)

**Tiempo:** 30 minutos  
**Resultado esperado:** Revisión en 3-7 días

---

### 2️⃣ **Configurar Eventos de Conversión**

✅ **Código ya implementado** en:
- `src/app/gestoria/GestoriaContent.tsx` (evento: view_item)
- `src/app/gestoria/SolicitarModal.tsx` (eventos: begin_checkout, add_to_cart)
- `src/app/gestoria/confirmacion/page.tsx` (evento: purchase)

**Acciones pendientes:**
1. Ir a Google Ads → Herramientas → Conversiones → + Nueva conversión
2. Crear conversión "Solicitud de Contrato":
   - Categoría: Lead
   - Evento: begin_checkout
   - Valor: Usar valor de transacción
3. Crear conversión "Compra Completada":
   - Categoría: Compra
   - Evento: purchase
   - Valor: Usar valor de transacción
4. Copiar los IDs de conversión (AW-XXXXXXXXX)
5. Actualizar `src/app/gestoria/confirmacion/page.tsx` línea 46:
   ```typescript
   // Reemplazar esto:
   send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL'
   // Por tus IDs reales
   ```

**Tiempo:** 15 minutos  
**Crítico:** Sin esto no verás conversiones

---

## 📅 ESTA SEMANA (Días 1-7)

### Lunes-Martes: Crear Campañas

📄 **Leer:** [ESTRATEGIA_GOOGLE_ADS_COMPLETA.md](./ESTRATEGIA_GOOGLE_ADS_COMPLETA.md) - Sección "Estructura de 3 Campañas"

**Crear en Google Ads:**

**Campaña 1: Madrid**
- Presupuesto: 13€/día
- Ubicación: Comunidad de Madrid
- Keywords: 30 términos (ver documento)
- Anuncios: 4 variantes (copies en documento)

**Campaña 2: Barcelona**
- Presupuesto: 8€/día
- Ubicación: Provincia Barcelona
- Keywords: 25 términos + catalán
- Anuncios: 4 variantes

**Campaña 3: Resto España**
- Presupuesto: 5€/día
- Ubicación: España (excl. Madrid/Barcelona)
- Keywords: 20 términos
- Anuncios: 3 variantes

---

### Miércoles-Jueves: Optimizaciones

**Configurar:**
1. Extensiones de anuncio (sitelinks, texto destacado)
2. Palabras clave negativas (gratis, plantilla, etc.)
3. Ajustes demográficos: Mujeres 35-44 años +30% puja
4. Horarios optimizados: Viernes 22-23h, Sábado 14-17h

---

### Viernes: Test y Lanzamiento

1. Test de conversión (compra de prueba)
2. Verificar eventos en Google Ads → Conversiones
3. Lanzar campañas
4. Monitorizar primeras 24h

---

## 💰 PRESUPUESTO Y PROYECCIONES

| Concepto | Valor |
|----------|-------|
| **Presupuesto mes 1** | 800€ |
| **Clics esperados** | 500-800 |
| **Conversiones esperadas** | 30-100 |
| **CPA objetivo** | < 35€ |
| **ROAS objetivo** | > 2.5x |
| **Ingresos proyectados** | 3,600€ - 12,000€ |

---

## 📊 KPIs CRÍTICOS (Revisar Diario)

| Métrica | ¿Está bien? | ¿Está mal? | Acción si está mal |
|---------|-------------|------------|-------------------|
| **CPC** | < 1.20€ | > 1.80€ | Bajar pujas, pausar keywords caras |
| **CTR** | > 3% | < 2% | Mejorar anuncios, revisar keywords |
| **Conversiones** | > 1/día | 0 conversiones | Revisar tracking, bajar CPC |
| **Tasa conversión** | > 10% | < 5% | Revisar landing, ajustar keywords |

---

## 📂 DOCUMENTOS CREADOS

### 1. **ESTRATEGIA_GOOGLE_ADS_COMPLETA.md**
Todo el plan detallado:
- 📌 100+ keywords optimizadas (organizadas por categoría)
- 📌 12 anuncios completos (títulos + descripciones)
- 📌 3 campañas geográficas configuradas
- 📌 Proyecciones de resultados
- 📌 Configuración paso a paso

### 2. **RESOLVER_RECHAZO_ANUNCIO_POLITICO.md**
Solución al problema actual:
- 📌 Cómo apelar la clasificación
- 📌 Mensaje de apelación (copiar/pegar)
- 📌 Anuncios reformulados "seguros"
- 📌 Palabras a evitar / usar
- 📌 Completar verificación de anunciante

### 3. **Código actualizado**
- ✅ `src/app/gestoria/GestoriaContent.tsx` - Tracking view_item
- ✅ `src/app/gestoria/SolicitarModal.tsx` - Tracking begin_checkout
- ✅ `src/app/gestoria/confirmacion/page.tsx` - Tracking purchase

---

## 🎯 OBJETIVO FINAL

**Pasar de:**
- 52 impresiones en 3 días
- 3 clics (3.89€ gastados)
- 0 conversiones
- Madrid: 0 impresiones ❌

**A:**
- 500-1000 impresiones/día
- 15-25 clics/día
- 3-5 conversiones/día
- Madrid: Tu mercado principal ✅

---

## ✅ CHECKLIST RÁPIDO

### Hoy (2 horas):
- [ ] Apelar clasificación política
- [ ] Completar verificación de anunciante
- [ ] Configurar conversiones en Google Ads
- [ ] Actualizar IDs de conversión en código

### Esta semana (5 días):
- [ ] Crear Campaña Madrid
- [ ] Crear Campaña Barcelona
- [ ] Crear Campaña Resto España
- [ ] Importar keywords (de ESTRATEGIA_GOOGLE_ADS_COMPLETA.md)
- [ ] Crear anuncios (copies en documento)
- [ ] Configurar extensiones
- [ ] Añadir palabras negativas
- [ ] Test de conversión
- [ ] Lanzar campañas

### Próximos 30 días:
- [ ] Monitorizar CPC diario
- [ ] Pausar keywords > 1.80€
- [ ] Optimizar anuncios (pausar CTR < 3%)
- [ ] Escalar presupuesto si ROAS > 2.5x

---

## 🚨 PROBLEMAS COMUNES Y SOLUCIONES

### "No veo conversiones"
1. Verificar que eventos GTM están funcionando (abrir consola browser → hacer compra test)
2. Comprobar que los IDs de conversión están bien en el código
3. Esperar 24-48h (Google tarda en procesar)

### "CPC muy alto (> 2€)"
1. Bajar pujas manualmente
2. Pausar keywords con CPC > 1.80€
3. Añadir más keywords de concordancia amplia (más baratas)

### "CTR muy bajo (< 2%)"
1. Revisar que los anuncios coinciden con la búsqueda
2. Añadir más extensiones de anuncio
3. Usar los copies reformulados del documento

### "Me siguen rechazando como político"
1. Segunda apelación (más detallada)
2. Solicitar llamada con Google Ads Support
3. Enviar evidencia: factura de servicio, contrato firmado, alta IAE

---

## 📞 SOPORTE

**Google Ads Support:**
- Chat: Google Ads → Ayuda → Contactar
- Teléfono: 900 814 542 (L-V 9:00-18:00)
- Email: advertisers-es@google.com

**Yo (GitHub Copilot):**
- Pregúntame cualquier duda sobre la implementación
- Puedo ayudarte a ajustar el código si hay problemas
- Puedo crear más variantes de anuncios si las necesitas

---

## 💡 PRÓXIMOS PASOS DESPUÉS DEL MES 1

Si todo va bien (CPA < 35€, ROAS > 2.5x):

1. **Escalar presupuesto:** 800€ → 1,500€/mes
2. **Agregar Display Remarketing:** Para usuarios que visitaron /gestoria
3. **Crear campañas de búsqueda dinámicas:** Para capturar más long-tail
4. **Test de Performance Max:** Campañas automáticas de Google
5. **Expansión a Meta Ads:** Facebook/Instagram con mismo público

---

**🎯 TU SIGUIENTE ACCIÓN:** Abrir [RESOLVER_RECHAZO_ANUNCIO_POLITICO.md](./RESOLVER_RECHAZO_ANUNCIO_POLITICO.md) y seguir los pasos de la sección "Plan de Acción Inmediato".

**⏰ Tiempo estimado hasta primer resultado:** 7-10 días (3-7 días apelación + 3 días setup campañas)

**💰 Inversión total necesaria:** 800€ mes 1 + tiempo de configuración

**📈 ROI esperado:** 350% - 1,400% (conservador a optimista)
