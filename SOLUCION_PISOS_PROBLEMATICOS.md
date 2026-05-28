# 🚨 Solución Urgente: Pisos con Problemas

**Fecha**: Mayo 28, 2026  
**Usuario afectado**: jeronimo.lebenbauhaus@gmail.com  
**Pisos problemáticos**: 2

---

## 📊 Problemas Detectados

### 1. Precios Incorrectos ❌

**Piso 1**: PISO EN VENTA EN C/DEL ARTE, 33 (COSTILLARES, MADRID)
- **ID**: `47326927-14a8-4c73-920e-aa2880af1ace`
- **Precio**: 820€
- **Operación**: Venta
- **Problema**: 820€ es claramente incorrecto para venta (debería ser ~820.000€ o el usuario quiso poner alquiler)

**Piso 2**: Tu Piso de Obra Nueva en Algete Tiene Nombre: Limón Verde
- **ID**: `2a242eb1-ece4-4d01-8e04-9801cf28076b`
- **Precio**: 298€
- **Operación**: Venta
- **Problema**: 298€ es absurdo para venta (probablemente 298.000€)

### 2. Imágenes No Se Muestran ❌

Ambos pisos tienen imágenes cargadas pero no se visualizan en la página de detalle.

**Causas posibles**:
1. Fallo en subida a Supabase Storage
2. Falta de registros en tabla `listing_images`
3. Permisos incorrectos en bucket `listings`
4. Error silencioso durante la publicación

---

## ✅ Soluciones Implementadas

### 1. Validación de Precios Mínimos

**Archivo**: `src/app/api/publicar/route.ts`

```typescript
// ✅ Validar precios mínimos razonables
if (operation === 'sale' && priceNum < 10000) {
  return NextResponse.json({ 
    error: 'El precio de venta debe ser al menos 10.000€. Si es alquiler, selecciona "Alquilar" en el paso 1.' 
  }, { status: 400 })
}
if (operation === 'rent' && priceNum < 100) {
  return NextResponse.json({ 
    error: 'El precio de alquiler debe ser al menos 100€/mes' 
  }, { status: 400 })
}
```

**Impacto**: 
- ✅ Evita que usuarios publiquen precios absurdos en el futuro
- ✅ Mensaje claro si confundieron venta con alquiler

---

### 2. Mejor Manejo de Errores en Subida de Imágenes

**Archivo**: `src/app/publicar/PublicarWizard.tsx`

**Antes**:
```typescript
const { error: upErr } = await supabase.storage.from('listings').upload(...)
if (!upErr) {
  // Solo sube si no hay error, pero NO informa al usuario si falla
}
```

**Después**:
```typescript
const uploadErrors: string[] = []

const { error: upErr } = await supabase.storage.from('listings').upload(...)
if (upErr) {
  console.error('[Upload Error]', upErr)
  uploadErrors.push(`Foto ${i + 1}: ${upErr.message}`)
  continue
}

// Insertar en listing_images
const { error: insertErr } = await supabase.from('listing_images').insert(...)
if (insertErr) {
  console.error('[Insert Image Error]', insertErr)
  uploadErrors.push(`DB Foto ${i + 1}: ${insertErr.message}`)
}

// Si todas fallaron, alertar al usuario
if (uploadErrors.length > 0 && uploadedUrls.length === 0) {
  alert('⚠️ Las imágenes no se pudieron subir. Contacta a soporte.')
}
```

**Impacto**:
- ✅ Errores de subida ahora se muestran al usuario
- ✅ Logs detallados en consola para debugging
- ✅ Usuario sabe que algo falló y puede contactar soporte

---

### 3. Indicador Visual de Precio Mínimo

**Archivo**: `src/app/publicar/PublicarWizard.tsx`

```typescript
<input
  type="number"
  min={form.operation === 'rent' ? 100 : 10000}
  placeholder={form.operation === 'rent' ? '900' : '250000'}
/>
<p className="text-xs text-gray-600">
  {form.operation === 'rent' ? 'Mínimo 100€/mes' : 'Mínimo 10.000€'}
</p>
```

**Impacto**:
- ✅ Ayuda visual para el usuario
- ✅ HTML5 validation (navegador advierte si el valor es menor)

---

### 4. Script de Corrección para Pisos Existentes

**Archivo**: `scripts/fix-problematic-listings.mts`

**Funciones**:
1. Detecta pisos con precio < 10.000€ en venta
2. Los marca como `draft` (no visibles) hasta que el usuario los corrija
3. Verifica si existen archivos en Storage pero faltan registros en `listing_images`
4. Reconstruye registros de imágenes si es posible
5. Genera reporte detallado

**Uso**:
```bash
cd inmonest
tsx scripts/fix-problematic-listings.mts
```

---

## 🔧 Verificación de Supabase Storage

### ¿Existe el bucket "listings"?

**Pasos para verificar**:
1. Ir a Supabase Dashboard → Storage
2. Verificar que existe bucket `listings`
3. Verificar que es **público** (o tiene políticas RLS correctas)

### Políticas RLS recomendadas:

```sql
-- Política 1: Usuarios autenticados pueden subir sus propias imágenes
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'listings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política 2: Todos pueden leer imágenes (bucket público)
CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'listings');

-- Política 3: Usuarios pueden actualizar sus propias imágenes
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'listings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política 4: Usuarios pueden borrar sus propias imágenes
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'listings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

---

## 📧 Contactar al Usuario

**Email a enviar**:

```
Asunto: Corrección necesaria en tus anuncios — Inmonest

Hola,

Hemos detectado un problema en los dos pisos que publicaste hoy:

1. **Piso en C/DEL ARTE, 33 (Costillares, Madrid)** — Precio: 820€
2. **Tu Piso de Obra Nueva en Algete — Limón Verde** — Precio: 298€

Ambos precios son incorrectos para venta. ¿Quisiste publicarlos en alquiler o faltaron dígitos?

Además, las imágenes que subiste no se están mostrando. Por favor:
1. Edita los anuncios desde tu cuenta
2. Corrige los precios
3. Vuelve a subir las fotos

Si tienes alguna duda, responde a este email.

Saludos,
Equipo Inmonest
```

---

## 🎯 Próximos Pasos

### Inmediato
- [ ] Ejecutar script `fix-problematic-listings.mts`
- [ ] Verificar bucket "listings" en Supabase
- [ ] Verificar políticas RLS del bucket
- [ ] Contactar al usuario jeronimo.lebenbauhaus@gmail.com

### Corto plazo (1-2 días)
- [ ] Monitorear si más usuarios reportan problemas similares
- [ ] Revisar logs de Vercel para errores de Storage
- [ ] Testear flujo completo de publicación en entorno de prueba

### Largo plazo
- [ ] Implementar validación de imágenes más robusta
- [ ] Agregar preview de anuncio antes de publicar
- [ ] Permitir edición de anuncios publicados

---

## 🐛 Root Cause Analysis

### ¿Por qué pasó esto?

1. **Precios incorrectos**:
   - No había validación de precio mínimo
   - Usuario pudo confundir venta con alquiler
   - Campo `type="number" min="0"` permitía cualquier valor > 0

2. **Imágenes no visibles**:
   - Subida a Storage puede haber fallado silenciosamente
   - No se mostró error al usuario
   - Posible problema de permisos en bucket
   - Código asumía éxito sin verificar

### ¿Cómo evitamos que vuelva a pasar?

✅ **Validación de precios** — Implementada  
✅ **Errores visibles** — Implementado (alert si fallan imágenes)  
⏳ **Verificar Storage** — Pendiente  
⏳ **Preview antes de publicar** — Futuro  

---

**Última actualización**: Mayo 28, 2026  
**Estado**: ✅ Parche implementado, esperando verificación de Storage
