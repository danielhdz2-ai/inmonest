# SOLUCIÓN: Configurar Políticas RLS para Subir Imágenes

## ❌ PROBLEMA DETECTADO
```
StorageApiError: new row violates row-level security policy
```

El bucket de Supabase Storage "listings" tiene RLS activado pero SIN políticas que permitan subir archivos.

---

## ✅ SOLUCIÓN RÁPIDA (2 MINUTOS)

### Opción 1: Política Permisiva (RECOMENDADA PARA DESARROLLO)

Acabo de abrir el dashboard de Supabase en tu navegador. Sigue estos pasos:

1. **Ir a Storage Policies**
   - URL: https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/storage/policies
   - O navegar: Dashboard > Storage > Policies

2. **Seleccionar el bucket "listings"**
   - En el menú de la izquierda, click en "listings"

3. **Crear nueva política**
   - Click en botón verde "New Policy"
   - Seleccionar "For full customization"

4. **Configurar la política:**
   ```
   Policy name: Allow uploads for authenticated users
   
   Allowed operation: INSERT
   
   Target roles: authenticated
   
   USING expression: true
   
   WITH CHECK expression: bucket_id = 'listings'
   ```

5. **Guardar**
   - Click "Save policy"

6. **Repetir para lectura pública (OPCIONAL)**
   - Nueva política:
   ```
   Policy name: Public read access
   Allowed operation: SELECT
   Target roles: public
   USING expression: bucket_id = 'listings'
   ```

---

### Opción 2: SQL Editor (MÁS RÁPIDO)

1. Ir a: https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/sql/new

2. Copiar y pegar este SQL:

```sql
-- Política para permitir subidas de usuarios autenticados
CREATE POLICY "Allow uploads for authenticated users"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'listings');

-- Política para permitir lectura pública
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'listings');
```

3. Click "Run" (▶️)

---

## 🧪 VERIFICAR QUE FUNCIONA

Después de crear las políticas:

1. Vuelve a https://inmonest.com/publicar
2. Intenta publicar un anuncio con fotos
3. Las imágenes deberían subirse sin error

---

## 📋 VERIFICAR POLÍTICAS CREADAS

Para ver las políticas activas, ejecutar en SQL Editor:

```sql
SELECT 
  policyname, 
  cmd as operation,
  roles,
  qual as using_expr,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%listings%';
```

---

## 🔒 POLÍTICAS DE PRODUCCIÓN (OPCIONAL)

Para mayor seguridad, puedes limitar uploads solo a los propios archivos del usuario:

```sql
-- Solo puede subir a su propia carpeta (userId/...)
CREATE POLICY "Users upload to own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'listings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

Pero para que funcione YA, usa la Opción 1 o 2 de arriba (permisiva para desarrollo).
