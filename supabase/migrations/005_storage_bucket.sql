-- ============================================================
-- Mi Vivienda Libre — Storage bucket para fotos de anuncios
-- Ejecutar en el SQL Editor de Supabase
-- ============================================================

-- Crear bucket público "listings" para fotos de anuncios
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listings',
  'listings',
  true,
  10485760,  -- 10 MB por archivo
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- Policy: cualquiera puede leer fotos (bucket público)
create policy "listings: lectura pública"
  on storage.objects for select
  using (bucket_id = 'listings');

-- Policy: propietario autenticado puede subir sus fotos
-- La ruta de subida es: {user_id}/{listing_id}/{index}.{ext}
-- Así solo puede subir a su propia carpeta
create policy "listings: subida autenticada propia carpeta"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'listings'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: propietario puede actualizar/reemplazar sus fotos
create policy "listings: actualizar propia carpeta"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'listings'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: propietario puede borrar sus fotos
create policy "listings: borrar propia carpeta"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'listings'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
