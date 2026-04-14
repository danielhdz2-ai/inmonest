-- ─────────────────────────────────────────────────────────────────────────────
-- 015_fix_agency_mislabeled_particular.sql
--
-- Reparación retroactiva: corrige listings marcados como is_particular=true
-- que en realidad son de agencias, detectados por:
--   1. advertiser_name con marca de agencia conocida o nombre en MAYÚSCULAS
--   2. Descripción / título con términos de agencia inequívocos
--   3. Portales 100% agencia que por un bug en scraper entraron como particular
--
-- CONSERVADOR: solo hace false lo que es INEQUÍVOCAMENTE agencia.
-- No toca listings con señales ambiguas para no crear falsos negativos.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Nombres de anunciante que son marcas de agencias conocidas ─────────────
UPDATE listings
SET
  is_particular  = false,
  ranking_score  = 30
WHERE is_particular = true
  AND status = 'published'
  AND (
    advertiser_name ILIKE '%tuksa%'
    OR advertiser_name ILIKE '%century 21%'
    OR advertiser_name ILIKE '%keller williams%'
    OR advertiser_name ILIKE '%engel%volkers%'
    OR advertiser_name ILIKE '%coldwell banker%'
    OR advertiser_name ILIKE '%donpiso%'
    OR advertiser_name ILIKE '%housell%'
    OR advertiser_name ILIKE '%lucas fox%'
    OR advertiser_name ILIKE '%bcn advisors%'
    OR advertiser_name ILIKE '%amat inmobiliaris%'
    OR advertiser_name ILIKE '%tecnocasa%'
    OR advertiser_name ILIKE '%redpiso%'
    OR advertiser_name ILIKE '%gilmar%'
    OR advertiser_name ILIKE '%monapart%'
    OR advertiser_name ILIKE '%solvia%'
    OR advertiser_name ILIKE '%aliseda%'
    OR advertiser_name ILIKE '%servihabitat%'
    OR advertiser_name ILIKE '%habitaclia%'
    OR advertiser_name ILIKE '%remax%'
    OR advertiser_name ILIKE '%anticipa%'
    OR advertiser_name ILIKE '%altamira%'
    OR advertiser_name ILIKE '%haya real estate%'
    OR advertiser_name ILIKE '%neinor homes%'
    OR advertiser_name ILIKE '%metrovacesa%'
    OR advertiser_name ILIKE '%vía célere%'
    OR advertiser_name ILIKE '%via celere%'
    OR advertiser_name ILIKE '%inmoglaciar%'
    OR advertiser_name ILIKE '%cbre%'
    OR advertiser_name ILIKE '%jll%'
    OR advertiser_name ILIKE '%savills%'
    OR advertiser_name ILIKE '%cushman%'
    OR advertiser_name ILIKE '%colliers%'
    -- Sufijos societarios (S.L., S.A., S.L.U., etc.)
    OR advertiser_name ~* '\ms\.?\s*l\.?\s*u?\b'
    OR advertiser_name ~* '\ms\.?\s*a\.?\b'
    OR advertiser_name ILIKE '%sociedad limitada%'
    OR advertiser_name ILIKE '%sociedad anónima%'
  );

-- ── 2. Nombres en MAYÚSCULAS completas de 4+ letras (siglas corporativas) ─────
-- Excluimos: NULL, "Propietario Particular", nombres cortos (≤3 letras)
UPDATE listings
SET
  is_particular  = false,
  ranking_score  = 30
WHERE is_particular = true
  AND status = 'published'
  AND advertiser_name IS NOT NULL
  AND advertiser_name !~* '^propietario'
  AND length(advertiser_name) >= 4
  -- Nombre formado solo por letras mayúsculas (y espacios), sin minúsculas
  AND advertiser_name ~ '^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s\-]{3,}$'
  -- Excluir nombres cortos que podrían ser iniciales de particulares
  AND length(regexp_replace(advertiser_name, '\s', '', 'g')) >= 4;

-- ── 3. Descripción contiene términos inequívocos de agencia ───────────────────
-- Solo usamos patrones MUY específicos para evitar falsos positivos
-- (un particular puede decir "sin inmobiliaria", "no pagué comisión", etc.)
UPDATE listings
SET
  is_particular  = false,
  ranking_score  = 30
WHERE is_particular = true
  AND status = 'published'
  AND (
    description ILIKE '%honorarios de agencia%'
    OR description ILIKE '%honorarios de intermediación%'
    OR description ILIKE '%gastos de agencia%'
    OR description ILIKE '%gastos de gestión de la agencia%'
    OR description ILIKE '%comisión de agencia%'
    OR description ILIKE '%ver inmuebles de %'
    OR description ILIKE '%nuestra cartera de pisos%'
    OR description ILIKE '%nuestra cartera de viviendas%'
    OR description ILIKE '%nuestros inmuebles disponibles%'
    OR description ILIKE '%contacta con nuestra inmobiliaria%'
    OR description ILIKE '%somos tu inmobiliaria%'
    OR description ILIKE '%su agencia de confianza%'
    OR description ILIKE '%anunciante profesional%'
    OR description ILIKE '%registro de agentes inmobiliarios%'
    -- Marcas en descripción con contexto posesivo/identificativo
    OR description ~* 'desde (tuksa|gilmar|tecnocasa|redpiso|monapart|aliseda|servihabitat)'
    OR description ~* '(tuksa|gilmar|tecnocasa|redpiso|monapart|aliseda|servihabitat) (te|os|le) (presentamos|ofrecemos|gestionamos)'
  );

-- ── 4. Portales 100% agencia que nunca deberían ser is_particular=true ─────────
-- Estos portales SOLO tienen agencias; si entraron como particular fue un bug
UPDATE listings
SET
  is_particular  = false,
  ranking_score  = 30
WHERE is_particular = true
  AND status = 'published'
  AND source_portal IN (
    'tecnocasa', 'redpiso', 'gilmar', 'solvia', 'aliseda',
    'monapart', 'servihabitat', 'tucasa'
  );

-- ── 5. Log del impacto (solo para revisión manual en consola Supabase) ─────────
-- Descomentar para ver cuántos registros se actualizaron en cada categoría:
-- SELECT COUNT(*) FROM listings WHERE is_particular = false AND ranking_score = 30 AND updated_at > NOW() - INTERVAL '1 minute';
