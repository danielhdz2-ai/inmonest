-- ══════════════════════════════════════════════════════════════════
-- 035b_gestoria_requests_fix.sql
-- FIX URGENTE: añade columnas que el webhook ya intenta escribir.
-- Idempotente — se puede ejecutar aunque el 035 original ya corrió.
-- EJECUTAR EN SUPABASE SQL EDITOR → Run
-- ══════════════════════════════════════════════════════════════════

-- 1. Columnas necesarias para el webhook de Stripe
ALTER TABLE gestoria_requests
  ADD COLUMN IF NOT EXISTS user_id             uuid    REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS document_folder_url text,
  ADD COLUMN IF NOT EXISTS admin_notes         text;

-- 2. Índice para queries del panel /mi-cuenta/contratos
CREATE INDEX IF NOT EXISTS idx_gestoria_requests_user
  ON gestoria_requests(user_id, created_at DESC)
  WHERE user_id IS NOT NULL;

-- 3. RLS: usuario puede ver sus propios pedidos (por user_id O por email)
ALTER TABLE gestoria_requests ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Política por user_id (pagos realizados con sesión activa)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'gestoria_requests'
      AND policyname = 'gestoria: usuario ve sus pedidos'
  ) THEN
    CREATE POLICY "gestoria: usuario ve sus pedidos"
      ON gestoria_requests FOR SELECT TO authenticated
      USING (user_id = auth.uid());
  END IF;

  -- Política por email (pagos realizados sin cuenta — retrocompatibilidad)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'gestoria_requests'
      AND policyname = 'gestoria: usuario ve pedidos por email'
  ) THEN
    CREATE POLICY "gestoria: usuario ve pedidos por email"
      ON gestoria_requests FOR SELECT TO authenticated
      USING (client_email = (SELECT email FROM auth.users WHERE id = auth.uid()));
  END IF;
END;
$$;

-- 4. Verificación: muestra las columnas actuales de la tabla
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'gestoria_requests'
ORDER BY ordinal_position;
