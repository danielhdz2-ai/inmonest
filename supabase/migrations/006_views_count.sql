-- ============================================================
-- Mi Vivienda Libre — Contador de visitas en listings
-- Ejecutar en el SQL Editor de Supabase
-- ============================================================

-- Añadir columna views_count si no existe
alter table listings
  add column if not exists views_count integer not null default 0;

-- Función para incrementar de forma segura (evita race conditions)
create or replace function increment_views(listing_id uuid)
returns void
language sql
security definer
as $$
  update listings
  set views_count = views_count + 1
  where id = listing_id
    and status = 'published';
$$;

-- Permitir llamarla desde el cliente anónimo (lectura pública)
grant execute on function increment_views(uuid) to anon, authenticated;
