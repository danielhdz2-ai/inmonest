# 🖼️ CONFIGURAR BUCKET DE IMÁGENES EN SUPABASE

## ❌ Problema Actual

Las imágenes de los pisos publicados por particulares NO se muestran porque el bucket de Supabase Storage no está configurado correctamente.

**Error visible:** Icono de casa genérico en lugar de las fotos reales.

---

## ✅ Solución: Configurar Bucket Público

### **1. Acceder a Supabase Dashboard**

https://supabase.com/dashboard/project/YOUR_PROJECT_ID/storage/buckets

### **2. Verificar si existe el bucket "listings"**

Si NO existe:
1. Click en **"New bucket"**
2. Nombre: `listings`
3. **✅ Marcar como "Public bucket"** (CRÍTICO)
4. Click "Create bucket"

Si YA existe pero no es público:
1. Click en el bucket `listings`
2. Click en **"Settings"** (rueda arriba a la derecha)
3. Activar **"Public bucket"**
4. Click "Save"

---

### **3. Configurar Políticas de Acceso (RLS)**

Ir a **Storage** → **Policies** → Bucket `listings`

**Crear 2 políticas:**

#### **Política 1: Lectura Pública (SELECT)**
```sql
-- Nombre: Public Read Access
-- Tipo: SELECT
-- Target roles: public
-- Policy:
true
```

#### **Política 2: Escritura Autenticada (INSERT)**
```sql
-- Nombre: Authenticated Users Can Upload
-- Tipo: INSERT
-- Target roles: authenticated
-- Policy:
auth.role() = 'authenticated'
```

---

## 🧪 Verificar que Funciona

### **Opción 1: Desde el navegador**

URL de prueba (reemplaza con tu proyecto):
```
https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/listings/test.jpg
```

Debería devolver 404 (archivo no existe) pero NO un error de autenticación.

### **Opción 2: Probar subida**

1. Publicar un piso de prueba en http://localhost:3000/publicar
2. Subir 2-3 fotos
3. Ver el anuncio publicado
4. ✅ Las fotos deben mostrarse correctamente

---

## 🔍 Diagnóstico de Errores

### **Error: "Access denied"**
❌ El bucket NO es público
✅ Activar "Public bucket" en Settings

### **Error: "Bucket not found"**
❌ El bucket "listings" NO existe
✅ Crear bucket con nombre exacto `listings`

### **Error: "Policy violation"**
❌ Falta política de lectura pública
✅ Crear política SELECT con `true`

### **Las imágenes NO cargan**
❌ Variable `NEXT_PUBLIC_SUPABASE_URL` incorrecta en `.env.local`
✅ Verificar que sea: `https://YOUR_PROJECT_ID.supabase.co`

---

## 📝 Cambios en el Código (Ya implementados)

### **1. Prioridad a `storage_path` sobre `external_url`**

Ahora las URLs se construyen así:

```typescript
function buildUrl(img: ImageItem) {
  // Prioridad 1: storage_path (más confiable)
  if (img.storage_path) {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL
    return `${base}/storage/v1/object/public/listings/${img.storage_path}`
  }
  
  // Prioridad 2: external_url (fallback)
  if (img.external_url) {
    return img.external_url
  }
  
  return ''
}
```

**Archivos actualizados:**
- `src/components/ListingCardGallery.tsx`
- `src/components/ListingGallery.tsx`

---

## 🚀 Próximos Pasos

1. **Configurar bucket público en Supabase** (5 minutos)
2. **Crear políticas de acceso** (2 minutos)
3. **Probar publicación de anuncio** (3 minutos)
4. **Commit y deploy** (1 minuto)

**Total: ~10 minutos**

---

## ⚠️ IMPORTANTE

Sin configurar el bucket público, **NINGUNA** imagen de pisos publicados por particulares se mostrará. Las imágenes scrapeadas de portales externos (Fotocasa, Idealista) funcionan porque usan `external_url` con URLs externas que pasan por el proxy.

**Solo afecta a:** Pisos publicados directamente en Inmonest (`origin = 'direct'`)
