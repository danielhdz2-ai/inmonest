# 🏷️ Configuración Google Tag Manager para Conversiones

**Objetivo:** Conectar los eventos del código (view_item, begin_checkout, purchase) con Google Ads para que se registren como conversiones.

---

## 📋 Pre-requisitos

Antes de empezar, necesitas:
1. ✅ Cuenta de Google Ads activa
2. ✅ Google Tag Manager instalado (ya lo tienes: GTM-57Q8NRVN)
3. ✅ Cuenta de Google Analytics 4 (GA4)
4. ⏳ IDs de conversión de Google Ads (los crearás en paso 1)

---

## 🎯 PASO 1: Crear Conversiones en Google Ads

### A. Acceder a Conversiones
1. Ir a [ads.google.com](https://ads.google.com)
2. Click en **Herramientas** (icono llave inglesa arriba derecha)
3. En "Medición", click en **Conversiones**

### B. Crear "Solicitud de Contrato" (Lead)
1. Click en **+ Nueva conversión**
2. Seleccionar **Sitio web**
3. Configurar:
   ```
   Nombre: Solicitud de Contrato
   Categoría: Lead (cliente potencial)
   Valor: Usar valores diferentes para cada conversión
   Conteo: Todas
   Ventana conversión clic: 30 días
   Ventana conversión vista: 1 día
   Modelo atribución: Basado en datos
   ```
4. Click en **Crear y continuar**
5. Método de seguimiento: **Usar Google Tag Manager**
6. **COPIAR** el ID de conversión que aparece (formato: `AW-XXXXXXXXX`)
7. **COPIAR** la etiqueta de conversión (formato: `XXXXXXXXXXX`)
8. Guardar en un notepad:
   ```
   SOLICITUD_CONVERSION_ID: AW-XXXXXXXXX
   SOLICITUD_CONVERSION_LABEL: XXXXXXXXXXX
   ```

### C. Crear "Compra Completada" (Purchase)
1. Repetir proceso anterior
2. Configurar:
   ```
   Nombre: Compra Completada - Gestoría
   Categoría: Compra
   Valor: Usar valores diferentes para cada conversión
   Conteo: Una sola
   Ventana conversión clic: 30 días
   ```
3. **COPIAR** IDs y guardar:
   ```
   COMPRA_CONVERSION_ID: AW-XXXXXXXXX
   COMPRA_CONVERSION_LABEL: XXXXXXXXXXX
   ```

---

## 🏷️ PASO 2: Configurar Google Tag Manager

### A. Acceder a GTM
1. Ir a [tagmanager.google.com](https://tagmanager.google.com)
2. Seleccionar contenedor: **GTM-57Q8NRVN** (Inmonest)

### B. Crear Variables

#### 1. Google Ads Conversion ID
1. En GTM, click **Variables** (menú izquierda)
2. Sección "Variables definidas por el usuario" → **Nueva**
3. Configurar:
   ```
   Nombre: Google Ads - Conversion ID
   Tipo: Constante
   Valor: AW-XXXXXXXXX (tu ID de paso 1B)
   ```
4. Guardar

#### 2. Etiqueta Conversión - Solicitud
1. Nueva variable
2. Configurar:
   ```
   Nombre: Conversion Label - Solicitud
   Tipo: Constante
   Valor: XXXXXXXXXXX (tu label de paso 1B)
   ```
3. Guardar

#### 3. Etiqueta Conversión - Compra
1. Nueva variable
2. Configurar:
   ```
   Nombre: Conversion Label - Compra
   Tipo: Constante
   Valor: XXXXXXXXXXX (tu label de paso 1C)
   ```
3. Guardar

#### 4. Valor de Conversión (DataLayer)
1. Nueva variable
2. Configurar:
   ```
   Nombre: DL - Conversion Value
   Tipo: Variable de capa de datos
   Nombre de la variable: ecommerce.value
   ```
3. Guardar

#### 5. Transaction ID (DataLayer)
1. Nueva variable
2. Configurar:
   ```
   Nombre: DL - Transaction ID
   Tipo: Variable de capa de datos
   Nombre de la variable: ecommerce.transaction_id
   ```
3. Guardar

---

### C. Crear Activadores (Triggers)

#### 1. Activador: begin_checkout
1. En GTM, click **Activadores** → **Nuevo**
2. Configurar:
   ```
   Nombre: Event - begin_checkout
   Tipo de activador: Evento personalizado
   Nombre del evento: begin_checkout
   Este activador se activa en: Todos los eventos personalizados
   ```
3. Guardar

#### 2. Activador: purchase
1. Nuevo activador
2. Configurar:
   ```
   Nombre: Event - purchase
   Tipo de activador: Evento personalizado
   Nombre del evento: purchase
   Este activador se activa en: Todos los eventos personalizados
   ```
3. Guardar

---

### D. Crear Etiquetas (Tags)

#### 1. Etiqueta: Google Ads - Solicitud de Contrato
1. En GTM, click **Etiquetas** → **Nueva**
2. Configurar etiqueta:
   ```
   Nombre: Google Ads - Solicitud Contrato
   Tipo de etiqueta: Conversión de Google Ads
   
   ID de conversión: {{Google Ads - Conversion ID}}
   Etiqueta de conversión: {{Conversion Label - Solicitud}}
   Valor de conversión: {{DL - Conversion Value}}
   Código de moneda de conversión: EUR
   ```
3. Configurar activador:
   ```
   Activación: Event - begin_checkout
   ```
4. Guardar

#### 2. Etiqueta: Google Ads - Compra Completada
1. Nueva etiqueta
2. Configurar:
   ```
   Nombre: Google Ads - Compra Completada
   Tipo de etiqueta: Conversión de Google Ads
   
   ID de conversión: {{Google Ads - Conversion ID}}
   Etiqueta de conversión: {{Conversion Label - Compra}}
   Valor de conversión: {{DL - Conversion Value}}
   Código de moneda de conversión: EUR
   ID de pedido: {{DL - Transaction ID}}
   ```
3. Activador:
   ```
   Activación: Event - purchase
   ```
4. Guardar

---

## 🧪 PASO 3: Probar las Conversiones

### A. Activar Modo Vista Previa
1. En GTM, click **Vista previa** (arriba derecha)
2. Introducir URL: `https://inmonest.com/gestoria`
3. Click **Connect**
4. Se abrirá una nueva pestaña con el modo depuración

### B. Test 1: Evento begin_checkout
1. En la web, ir a /gestoria
2. Click en "Solicitar" en cualquier servicio
3. Rellenar formulario
4. Click "Pagar XXX € con tarjeta"
5. En GTM Debug:
   - Verificar que aparece **begin_checkout** en timeline
   - Click en el evento
   - En "Tags Fired" debería aparecer: **Google Ads - Solicitud Contrato** ✅
   - Click en la etiqueta y verificar que tiene:
     - Conversion ID: AW-XXXXXXXXX ✅
     - Conversion Label: XXXXXXXXXXX ✅
     - Value: (precio del servicio) ✅

### C. Test 2: Evento purchase
1. Completar un pago de prueba en Stripe (usa tarjeta de test: 4242 4242 4242 4242)
2. Serás redirigido a `/gestoria/confirmacion?session_id=cs_XXXX`
3. En GTM Debug:
   - Verificar **purchase** en timeline ✅
   - Verificar "Google Ads - Compra Completada" en Tags Fired ✅
   - Verificar Transaction ID presente ✅

### D. Verificar en Google Ads
1. Ir a Google Ads → Herramientas → Conversiones
2. En 15-30 minutos deberías ver las conversiones de prueba
3. Si aparecen → Todo funciona ✅

---

## 📤 PASO 4: Publicar Cambios

### A. Enviar a Producción
1. En GTM, click **Enviar** (arriba derecha)
2. Nombre de la versión:
   ```
   Configuración Google Ads Conversiones - Gestoría
   ```
3. Descripción:
   ```
   - Etiquetas de conversión: Solicitud + Compra
   - Variables: Conversion IDs y Labels
   - Activadores: begin_checkout, purchase
   - Tracking para campañas Google Ads Mayo 2026
   ```
4. Click **Publicar**

---

## 🔧 PASO 5: Actualizar Código (Opcional)

El código ya está implementado y funcionará con GTM. Pero si quieres también enviar conversiones directamente a Google Ads (sin pasar por GTM), actualiza:

### Archivo a editar:
`src/app/gestoria/confirmacion/page.tsx`

### Línea 46, reemplazar:
```typescript
// ANTES:
send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL'

// DESPUÉS (con tus IDs reales):
send_to: 'AW-XXXXXXXXX/XXXXXXXXXXX'  // Tus IDs de paso 1C
```

**Nota:** Esto es redundante si ya configuraste GTM, pero no hace daño tenerlo duplicado como backup.

---

## 📊 PASO 6: Vincular Google Ads con GA4

### A. Vincular Cuentas
1. Ir a Google Ads → Herramientas → Cuentas vinculadas
2. Buscar "Google Analytics (GA4)"
3. Click **Vincular**
4. Seleccionar tu propiedad de GA4
5. Activar:
   - ✅ Importar conversiones de sitio web
   - ✅ Importar métricas de Google Analytics
   - ✅ Personalización de búsqueda
6. Guardar

### B. Importar Objetivos de GA4
1. Google Ads → Herramientas → Conversiones
2. Click **+ Nueva conversión** → **Importar**
3. Seleccionar **Google Analytics 4**
4. Marcar eventos:
   - ✅ purchase
   - ✅ begin_checkout
5. Importar y continuar

**Ventaja:** Tendrás datos de conversión tanto de Google Ads como de GA4.

---

## ✅ CHECKLIST FINAL

- [ ] Conversión "Solicitud" creada en Google Ads
- [ ] Conversión "Compra" creada en Google Ads
- [ ] Variables creadas en GTM (5 variables)
- [ ] Activadores creados en GTM (2 activadores)
- [ ] Etiquetas creadas en GTM (2 etiquetas)
- [ ] Test en modo Vista Previa exitoso
- [ ] Conversiones de prueba aparecen en Google Ads
- [ ] Cambios publicados en GTM
- [ ] Google Ads vinculado con GA4
- [ ] Código actualizado con IDs reales (opcional)

---

## 🚨 Solución de Problemas

### "No veo conversiones en Google Ads"
**Posibles causas:**
1. ❌ Etiquetas no se disparan → Revisar activadores en GTM Debug
2. ❌ IDs incorrectos → Verificar que copiaste bien los IDs
3. ❌ Eventos no se envían → Abrir consola browser (F12) y buscar errores
4. ⏰ Esperar 30 min → Google Ads puede tardar en procesar

**Solución:**
```javascript
// Test manual - pega esto en consola del browser:
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'begin_checkout',
  ecommerce: {
    value: 120,
    currency: 'EUR'
  }
});
```
Luego verifica en GTM Debug si se dispara la etiqueta.

---

### "Etiqueta se dispara pero no llega a Google Ads"
**Causa:** IDs incorrectos o cuenta no vinculada

**Solución:**
1. Verificar formato IDs:
   - Conversion ID: `AW-123456789` (empieza con AW-)
   - Label: `AbC123XyZ` (alfanumérico sin AW-)
2. Ir a Google Ads → Herramientas → Conversiones
3. Click en tu conversión
4. Verificar que el ID coincide

---

### "Conversiones duplicadas"
**Causa:** Estás enviando 2 veces (código + GTM)

**Solución:**
- Si configuraste GTM correctamente, comenta el código en `confirmacion/page.tsx` líneas 40-48
- O viceversa: usa solo código y desactiva etiquetas GTM

**Recomendado:** Usar GTM (más flexible para cambios futuros).

---

## 📚 Recursos Adicionales

- [Guía oficial Google Ads Conversions](https://support.google.com/google-ads/answer/6095821)
- [Configurar GTM para Google Ads](https://support.google.com/tagmanager/answer/6105160)
- [Eventos ecommerce GA4](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Test conversiones Google Ads](https://support.google.com/google-ads/answer/6331314)

---

## 🎯 Resumen Rápido

1. **Google Ads:** Crear 2 conversiones (Solicitud + Compra) → Copiar IDs
2. **GTM:** Crear 5 variables, 2 activadores, 2 etiquetas
3. **Probar:** Modo vista previa + compra de test
4. **Publicar:** Enviar cambios a producción
5. **Verificar:** Conversiones aparecen en Google Ads en 30 min

**Tiempo total:** 45-60 minutos

**Dificultad:** Media (seguir pasos exactos)

**Crítico:** Sin esto, Google Ads no sabrá qué anuncios generan conversiones y gastará dinero sin optimizar.

---

**🚀 PRÓXIMO PASO:** Una vez completado esto, ve a [ESTRATEGIA_GOOGLE_ADS_COMPLETA.md](./ESTRATEGIA_GOOGLE_ADS_COMPLETA.md) para crear las campañas.
