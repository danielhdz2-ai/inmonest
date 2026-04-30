# 🔍 GUÍA DE VERIFICACIÓN DE PROBLEMAS CRÍTICOS

## ❌ PROBLEMA 1: Alertas no llegan al email

### Causas posibles:
1. **Variables de entorno no configuradas en Vercel**
2. **Cron no está activo en Vercel**
3. **No hay alertas activas o no tienen nuevos pisos**

### ✅ Solución paso a paso:

#### 1. Verificar variables de entorno en Vercel
Ve a: https://vercel.com/dashboard → tu-proyecto → Settings → Environment Variables

Verifica que existan:
- ✅ `RESEND_API_KEY` = `re_WycLX8Bp_...`
- ✅ `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGc...`
- ✅ `CRON_SECRET` = (cualquier string secreto, ej: `mi-cron-secreto-2024`)

Si NO existen, agrégalas:
```
RESEND_API_KEY=re_WycLX8Bp_7vW16ahjXD17NNh1dZvnXnYV
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY1NDg1NCwiZXhwIjoyMDkxMjMwODU0fQ.0VuUqRsrb2kNgLfoqyduMC7weRc9JJKtg1r14mOEbi8
CRON_SECRET=mi-cron-secreto-2024
```

**IMPORTANTE:** Después de agregar variables, haz **Redeploy** del proyecto.

#### 2. Verificar que el cron está activo
Ve a: https://vercel.com/dashboard → tu-proyecto → Cron Jobs

Deberías ver:
- ✅ `/api/cron/alertas` - Daily at 8:00 AM
- ✅ `/api/scraper` - Daily at 7:00 AM
- ✅ `/api/cron/generate-descriptions` - Daily at 9:00 AM

Si NO aparecen, es porque Vercel no detectó el archivo `vercel.json`. Haz un nuevo deploy.

#### 3. Probar el cron manualmente
Ejecuta en tu terminal:

```bash
npx tsx scripts/test-alertas-email.mts
```

Esto llamará al endpoint `/api/cron/alertas` y te dirá:
- ✅ Cuántas alertas se procesaron
- ✅ Cuántos emails se enviaron
- ❌ Si hubo errores

#### 4. Crear una alerta de prueba
1. Ve a https://inmonest.com/pisos
2. Busca "Madrid" → "Venta"
3. Haz click en "Guardar búsqueda" (si no aparece, necesitas login)
4. Crea alerta con frecuencia "Diaria"
5. Espera al día siguiente o ejecuta el script de test

---

## ❌ PROBLEMA 2: Pisos publicados por particulares sin fotos

### Causa:
El bucket de Supabase Storage `listings` no existe o no tiene permisos correctos.

### ✅ Solución:

#### 1. Verificar el bucket
Ejecuta:
```bash
npx tsx scripts/check-storage-bucket.mts
```

Si el bucket NO existe, verás:
```
❌ El bucket "listings" NO EXISTE
```

#### 2. Crear el bucket en Supabase
Ve a: https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/storage/buckets

1. Click **"New bucket"**
2. Nombre: `listings`
3. Public: ✅ **Sí** (importante)
4. File size limit: `15 MB`
5. Allowed MIME types: `image/*`
6. Click **"Create bucket"**

#### 3. Configurar políticas RLS del bucket
En la misma página, click en el bucket `listings` → **"Policies"**

Necesitas crear estas políticas:

**Política 1: SELECT (público - leer imágenes)**
```sql
-- Nombre: Public read
-- Allowed operation: SELECT
CREATE POLICY "Public read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'listings');
```

**Política 2: INSERT (usuarios autenticados - subir fotos)**
```sql
-- Nombre: Authenticated users can upload
-- Allowed operation: INSERT
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'listings' 
    AND auth.role() = 'authenticated'
  );
```

**Política 3: UPDATE (solo propietario)**
```sql
-- Nombre: Users can update own files
-- Allowed operation: UPDATE
CREATE POLICY "Users can update own files" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'listings' 
    AND owner = auth.uid()
  );
```

**Política 4: DELETE (solo propietario)**
```sql
-- Nombre: Users can delete own files
-- Allowed operation: DELETE
CREATE POLICY "Users can delete own files" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'listings' 
    AND owner = auth.uid()
  );
```

#### 4. Probar subida de imagen
1. Ve a https://inmonest.com/publicar
2. Completa el formulario
3. Arrastra 1-2 fotos en el paso 4
4. Verifica que aparece "Optimizando..."
5. Publica el anuncio
6. Verifica que las fotos se ven en el detalle

---

## ✅ CHECKLIST FINAL

- [ ] Variables de entorno en Vercel configuradas
- [ ] Crons activos en Vercel dashboard
- [ ] Test de alertas ejecutado: `npx tsx scripts/test-alertas-email.mts`
- [ ] Bucket `listings` creado en Supabase Storage
- [ ] Políticas RLS del bucket configuradas
- [ ] Test de subida de foto ejecutado
- [ ] Al menos 1 alerta creada para probar
- [ ] Redeploy después de cambios en Vercel

---

## 🚀 Scripts útiles

```bash
# Probar sistema de alertas
npx tsx scripts/test-alertas-email.mts

# Verificar bucket de storage
npx tsx scripts/check-storage-bucket.mts

# Ver estado de la base de datos
npx tsx scripts/check-status.mts
```

---

## 📞 Si sigues teniendo problemas

1. Revisa los logs de Vercel: https://vercel.com/dashboard → tu-proyecto → Logs
2. Busca errores relacionados con "alertas" o "RESEND"
3. Verifica que el email `alertas@inmonest.com` está verificado en Resend
4. Comprueba que no estás en el plan gratuito de Resend (límite 100 emails/día)
