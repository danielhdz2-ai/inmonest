-- ══════════════════════════════════════════════════════════════════
-- 034_listing_contacts_owner.sql
-- Añade owner_user_id a listing_contacts para vincular directamente
-- cada lead con el propietario del anuncio.
-- EJECUTAR EN SUPABASE SQL EDITOR
-- ══════════════════════════════════════════════════════════════════

-- 1. Nueva columna: desnormalización del propietario del anuncio
ALTER TABLE listing_contacts
  ADD COLUMN IF NOT EXISTS owner_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Índice para queries rápidas desde el panel del propietario
CREATE INDEX IF NOT EXISTS idx_listing_contacts_owner_user
  ON listing_contacts(owner_user_id, created_at DESC)
  WHERE owner_user_id IS NOT NULL;

-- 3. Backfill: propagar owner_user_id a los contactos existentes
--    (sólo actualiza filas donde ya existe el listing activo con dueño)
UPDATE listing_contacts lc
SET owner_user_id = l.owner_user_id
FROM listings l
WHERE l.id = lc.listing_id
  AND l.owner_user_id IS NOT NULL
  AND lc.owner_user_id IS NULL;
