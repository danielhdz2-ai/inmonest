-- ══════════════════════════════════════════════════════════════════
-- 035_gestoria_user_id.sql
-- Vincula gestoria_requests al usuario autenticado y añade campos
-- para gestión de documentos entregados.
-- EJECUTAR EN SUPABASE SQL EDITOR
-- ══════════════════════════════════════════════════════════════════

-- 1. Nuevas columnas
ALTER TABLE gestoria_requests
  ADD COLUMN IF NOT EXISTS user_id             uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS document_folder_url text,   -- link a carpeta Drive/Storage con docs entregados
  ADD COLUMN IF NOT EXISTS admin_notes         text;   -- notas internas del admin

-- 2. Índice para queries rápidas del panel de usuario
CREATE INDEX IF NOT EXISTS idx_gestoria_requests_user
  ON gestoria_requests(user_id, created_at DESC)
  WHERE user_id IS NOT NULL;

-- 3. Política RLS: el usuario autenticado puede ver sus propios pedidos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'gestoria_requests'
      AND policyname = 'gestoria: usuario ve sus pedidos'
  ) THEN
    CREATE POLICY "gestoria: usuario ve sus pedidos"
      ON gestoria_requests FOR SELECT TO authenticated
      USING (user_id = auth.uid());
  END IF;
END;
$$;
