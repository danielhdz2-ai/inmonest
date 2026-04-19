-- ══════════════════════════════════════════════════════════════════
-- 032_email_logs.sql
-- Log de estado de envío de emails en listing_contacts
-- EJECUTAR EN SUPABASE SQL EDITOR
-- ══════════════════════════════════════════════════════════════════

-- Añadir columnas de log a listing_contacts
ALTER TABLE listing_contacts
  ADD COLUMN IF NOT EXISTS email_owner_status  text,        -- 'sent' | 'failed' | 'no_key' | 'no_owner'
  ADD COLUMN IF NOT EXISTS email_reply_status  text,        -- 'sent' | 'failed' | 'no_key'
  ADD COLUMN IF NOT EXISTS email_sent_at       timestamptz; -- cuándo se procesaron los envíos

-- Índice para filtrar por estado (útil en panel admin)
CREATE INDEX IF NOT EXISTS idx_listing_contacts_email_status
  ON listing_contacts(email_owner_status, created_at DESC);

-- Política: admin puede leer todos los contactos (para panel)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'listing_contacts'
      AND policyname = 'listing_contacts: admin lee todos'
  ) THEN
    CREATE POLICY "listing_contacts: admin lee todos"
      ON listing_contacts FOR SELECT TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM profiles p
          WHERE p.user_id = auth.uid()
            AND p.is_verified = true
        )
        OR
        EXISTS (
          SELECT 1 FROM listings l
          WHERE l.id = listing_contacts.listing_id
            AND l.owner_user_id = auth.uid()
        )
      );
  END IF;
END;
$$;
