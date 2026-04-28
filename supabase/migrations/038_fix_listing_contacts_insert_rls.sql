-- ══════════════════════════════════════════════════════════════════
-- 038_fix_listing_contacts_insert_rls.sql
-- Restaura la política RLS de INSERT en listing_contacts.
-- El error 42501 indica que la política fue eliminada o nunca aplicó
-- en producción. Esta migración la recrea de forma idempotente.
-- EJECUTAR EN SUPABASE SQL EDITOR
-- ══════════════════════════════════════════════════════════════════

-- Eliminar política existente si existe (por si fue recreada con nombre distinto)
DROP POLICY IF EXISTS "listing_contacts: cualquiera puede insertar" ON listing_contacts;

-- Recrear la política: cualquier rol (anon o authenticated) puede insertar
CREATE POLICY "listing_contacts: cualquiera puede insertar"
  ON listing_contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
