-- ═════════════════════════════════════════════════════════════════════════════
-- 016_purge_false_particulares.sql
-- Auditoría + Limpieza agresiva de agencias infiltradas como particulares
-- ═════════════════════════════════════════════════════════════════════════════
--
-- INSTRUCCIONES DE USO EN SUPABASE SQL EDITOR:
--
--   1. Primero ejecuta solo la sección de DIAGNÓSTICO (SELECT al final)
--      para ver cuántos registros se van a tocar.
--   2. Luego ejecuta los UPDATEs.
--   3. Repite el SELECT para confirmar que el count sea 0.
--
-- ═════════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────────────
-- PARTE A — POR ADVERTISER_NAME
-- Captura agencias locales y genéricas que el scraper guardó como nombre
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE listings
SET is_particular = false, ranking_score = 30
WHERE is_particular = true
  AND status = 'published'
  AND advertiser_name IS NOT NULL
  AND (
    -- ── Sufijos societarios (S.L., S.A., S.L.U., S.C.P., C.B., S.COOP.) ─────
    advertiser_name ~* '\mS\.?\s*L\.?\s*U?\.?\s*\y'
    OR advertiser_name ~* '\mS\.?\s*A\.?\s*\y'
    OR advertiser_name ~* '\mS\.?\s*C\.?\s*P?\.?\s*\y'
    OR advertiser_name ~* '\mC\.?\s*B\.?\s*\y'
    OR advertiser_name ILIKE '%s.coop%'
    OR advertiser_name ILIKE '%sociedad limitada%'
    OR advertiser_name ILIKE '%sociedad anónima%'
    OR advertiser_name ILIKE '%sociedad anonima%'

    -- ── Palabras genéricas que indican estructura empresarial ──────────────
    OR advertiser_name ILIKE '%inmobiliaria%'
    OR advertiser_name ILIKE '%inmuebles%'
    OR advertiser_name ILIKE '%gestión%'
    OR advertiser_name ILIKE '%gestion%'
    OR advertiser_name ILIKE '%asesores%'
    OR advertiser_name ILIKE '%asesoría%'
    OR advertiser_name ILIKE '%asesoria%'
    OR advertiser_name ILIKE '%finca%'
    OR advertiser_name ILIKE '%finques%'
    OR advertiser_name ILIKE '%pisos%'
    OR advertiser_name ILIKE '%propiedades%'
    OR advertiser_name ILIKE '%servicios%'
    OR advertiser_name ILIKE '%inversiones%'
    OR advertiser_name ILIKE '%patrimon%'
    OR advertiser_name ILIKE '%alquileres%'
    OR advertiser_name ILIKE '%promotora%'
    OR advertiser_name ILIKE '%constructora%'
    OR advertiser_name ILIKE '%grupo%'
    OR advertiser_name ILIKE '%real estate%'
    OR advertiser_name ILIKE '%consulting%'
    OR advertiser_name ILIKE '%management%'

    -- ── Agencias locales conocidas (no cubiertas en 015) ──────────────────
    OR advertiser_name ILIKE '%inmosur%'
    OR advertiser_name ILIKE '%inmoelite%'
    OR advertiser_name ILIKE '%inmotop%'
    OR advertiser_name ILIKE '%inmobase%'
    OR advertiser_name ILIKE '%inmocasa%'
    OR advertiser_name ILIKE '%inmobarrio%'
    OR advertiser_name ILIKE '%immoble%'
    OR advertiser_name ILIKE '%immocat%'
    OR advertiser_name ILIKE '%pisogest%'
    OR advertiser_name ILIKE '%gestoria%'
    OR advertiser_name ILIKE '%gestoría%'
    OR advertiser_name ILIKE '%agencia%'
    OR advertiser_name ILIKE '%habitat%'
    OR advertiser_name ILIKE '%urban%'
    OR advertiser_name ILIKE '%premium%'
    OR advertiser_name ILIKE '%global%'
    OR advertiser_name ILIKE '%capital%'

    -- ── Marcas nacionales adicionales ────────────────────────────────────
    OR advertiser_name ILIKE '%tuksa%'
    OR advertiser_name ILIKE '%century 21%'
    OR advertiser_name ILIKE '%keller williams%'
    OR advertiser_name ILIKE '%engel%volkers%'
    OR advertiser_name ILIKE '%coldwell%'
    OR advertiser_name ILIKE '%donpiso%'
    OR advertiser_name ILIKE '%housell%'
    OR advertiser_name ILIKE '%lucas fox%'
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
    OR advertiser_name ILIKE '%haya real%'
    OR advertiser_name ILIKE '%neinor%'
    OR advertiser_name ILIKE '%metrovacesa%'
    OR advertiser_name ILIKE '%celere%'
    OR advertiser_name ILIKE '%inmoglaciar%'
    OR advertiser_name ILIKE '%cbre%'
    OR advertiser_name ILIKE '%savills%'
    OR advertiser_name ILIKE '%cushman%'
    OR advertiser_name ILIKE '%colliers%'
    OR advertiser_name ILIKE '%bcn advisors%'
  );


-- ─────────────────────────────────────────────────────────────────────────────
-- PARTE B — NOMBRES EN MAYÚSCULAS (INMOSUR DOS HERMANAS, CBRE, JLL…)
-- Detecta nombres totalmente en mayúsculas de 4+ letras: patrón corporativo
-- EXCLUYE: "Propietario Particular", nombres muy cortos, acentos de nombre propio
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE listings
SET is_particular = false, ranking_score = 30
WHERE is_particular = true
  AND status = 'published'
  AND advertiser_name IS NOT NULL
  AND advertiser_name !~* '^\s*propietario'
  AND advertiser_name !~* '^\s*particular'
  -- Nombre formado mayoritariamente por MAYÚSCULAS (>80% del texto es mayúscula)
  -- Excluir nombres cortos ≤3 letras y nombres con dígitos que podrían ser refs
  AND length(regexp_replace(advertiser_name, '\s', '', 'g')) >= 4
  AND length(regexp_replace(advertiser_name, '[^A-ZÁÉÍÓÚÜÑ]', '', 'g'))
      > length(regexp_replace(advertiser_name, '[^a-záéíóúüñ]', '', 'g'))
  -- Al menos 4 letras mayúsculas consecutivas (evita falsos positivos de iniciales "J.M.")
  AND advertiser_name ~ '[A-ZÁÉÍÓÚÜÑ]{4,}';


-- ─────────────────────────────────────────────────────────────────────────────
-- PARTE C — POR DESCRIPCIÓN (frases de agencia que se escaparon)
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE listings
SET is_particular = false, ranking_score = 30
WHERE is_particular = true
  AND status = 'published'
  AND description IS NOT NULL
  AND (
    -- Frases de captación de clientes típicas de agencias
    description ILIKE '%honorarios no incluidos%'
    OR description ILIKE '%honorarios de intermediación%'
    OR description ILIKE '%gastos de intermediación%'
    OR description ILIKE '%gastos de gestión%'
    OR description ILIKE '%comisión de agencia%'
    OR description ILIKE '%servicios de intermediación%'
    OR description ILIKE '%llámanos para visitar%'
    OR description ILIKE '%llamanos para visitar%'
    OR description ILIKE '%llame para visitar%'
    OR description ILIKE '%llámenos para%'
    OR description ILIKE '%contacte con nosotros para%'
    OR description ILIKE '%contáctenos para%'
    OR description ILIKE '%contactenos para%'
    OR description ILIKE '%referencia catastral%'
    OR description ILIKE '%ref. catastral%'
    OR description ILIKE '%visita nuestra web%'
    OR description ILIKE '%visite nuestra web%'
    OR description ILIKE '%nuestra página web%'
    OR description ILIKE '%nuestra pagina web%'
    OR description ILIKE '%más pisos en%'
    OR description ILIKE '%mas pisos en%'
    OR description ILIKE '%toda nuestra oferta%'
    OR description ILIKE '%nuestra cartera%'
    OR description ILIKE '%nuestros inmuebles%'
    OR description ILIKE '%desde nuestra agencia%'
    OR description ILIKE '%ofrecemos este%'
    OR description ILIKE '%te ofrecemos%'
    OR description ILIKE '%les ofrecemos%'
    OR description ILIKE '%gestión integral%'
    OR description ILIKE '%gestion integral%'
    OR description ILIKE '%tramitamos la hipoteca%'
    OR description ILIKE '%tramitamos financiación%'
    OR description ILIKE '%somos especialistas%'
    OR description ILIKE '%somos expertos en%'
    OR description ILIKE '%agencia inmobiliaria%'
    OR description ILIKE '%inmobiliaria especializada%'
    OR description ILIKE '%anunciante profesional%'
    OR description ILIKE '%registro de agentes%'
    OR description ILIKE '%registre d''agents%'
    -- Marcas en descripción
    OR description ~* '\m(inmosur|inmoelite|inmotop|inmobase)\m'
    OR description ~* '\m(tuksa|gilmar|tecnocasa|donpiso|housell)\m'
  );


-- ─────────────────────────────────────────────────────────────────────────────
-- PARTE D — POR TÍTULO
-- Títulos que revelan agencia directamente
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE listings
SET is_particular = false, ranking_score = 30
WHERE is_particular = true
  AND status = 'published'
  AND (
    title ILIKE '%inmobiliaria%'
    OR title ILIKE '%agencia%'
    OR title ILIKE '%inmosur%'
    OR title ~* '\m(s\.?\s*l\.?)\m'
  );


-- ─────────────────────────────────────────────────────────────────────────────
-- PARTE E — PORTALES 100% AGENCIA (doble cobertura, no debería haber ninguno)
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE listings
SET is_particular = false, ranking_score = 30
WHERE is_particular = true
  AND status = 'published'
  AND source_portal IN (
    'tecnocasa', 'redpiso', 'gilmar', 'solvia', 'aliseda',
    'monapart', 'servihabitat', 'tucasa'
  );


-- ═════════════════════════════════════════════════════════════════════════════
-- DIAGNÓSTICO — ejecutar ANTES y DESPUÉS para ver el impacto
-- ═════════════════════════════════════════════════════════════════════════════

-- Conteo total de falsos particulares detectados POR CATEGORÍA:
SELECT
  'A: advertiser_name corporativo' AS categoria,
  COUNT(*) AS afectados
FROM listings
WHERE is_particular = true AND status = 'published'
  AND advertiser_name IS NOT NULL
  AND (
    advertiser_name ~* '\mS\.?\s*L\.?\s*U?\.?\s*\y'
    OR advertiser_name ~* '\mS\.?\s*A\.?\s*\y'
    OR advertiser_name ILIKE '%inmobiliaria%'
    OR advertiser_name ILIKE '%inmosur%'
    OR advertiser_name ILIKE '%gestión%' OR advertiser_name ILIKE '%gestion%'
    OR advertiser_name ILIKE '%asesores%' OR advertiser_name ILIKE '%finca%'
    OR advertiser_name ILIKE '%finques%' OR advertiser_name ILIKE '%grupo%'
    OR advertiser_name ILIKE '%real estate%' OR advertiser_name ILIKE '%inmuebles%'
    OR advertiser_name ILIKE '%promotora%' OR advertiser_name ILIKE '%agencia%'
    OR advertiser_name ILIKE '%tuksa%' OR advertiser_name ILIKE '%remax%'
    OR advertiser_name ILIKE '%century 21%' OR advertiser_name ILIKE '%tecnocasa%'
  )

UNION ALL

SELECT
  'B: nombre en MAYÚSCULAS (corp.)' AS categoria,
  COUNT(*) AS afectados
FROM listings
WHERE is_particular = true AND status = 'published'
  AND advertiser_name IS NOT NULL
  AND advertiser_name !~* '^\s*propietario'
  AND advertiser_name !~* '^\s*particular'
  AND length(regexp_replace(advertiser_name, '\s', '', 'g')) >= 4
  AND length(regexp_replace(advertiser_name, '[^A-ZÁÉÍÓÚÜÑ]', '', 'g'))
      > length(regexp_replace(advertiser_name, '[^a-záéíóúüñ]', '', 'g'))
  AND advertiser_name ~ '[A-ZÁÉÍÓÚÜÑ]{4,}'

UNION ALL

SELECT
  'C: descripción con frases de agencia' AS categoria,
  COUNT(*) AS afectados
FROM listings
WHERE is_particular = true AND status = 'published'
  AND (
    description ILIKE '%honorarios%' OR description ILIKE '%gastos de gestión%'
    OR description ILIKE '%gastos de intermediación%' OR description ILIKE '%llámanos para visitar%'
    OR description ILIKE '%referencia catastral%' OR description ILIKE '%nuestra cartera%'
    OR description ILIKE '%nuestros inmuebles%' OR description ILIKE '%agencia inmobiliaria%'
    OR description ILIKE '%visita nuestra web%' OR description ILIKE '%gestión integral%'
  )

UNION ALL

SELECT
  'D: título con marca de agencia' AS categoria,
  COUNT(*) AS afectados
FROM listings
WHERE is_particular = true AND status = 'published'
  AND (title ILIKE '%inmobiliaria%' OR title ILIKE '%agencia%' OR title ILIKE '%inmosur%')

UNION ALL

SELECT
  'E: portal 100% agencia' AS categoria,
  COUNT(*) AS afectados
FROM listings
WHERE is_particular = true AND status = 'published'
  AND source_portal IN ('tecnocasa','redpiso','gilmar','solvia','aliseda','monapart','servihabitat','tucasa')

UNION ALL

SELECT
  'TOTAL is_particular=true en BD' AS categoria,
  COUNT(*) AS afectados
FROM listings
WHERE is_particular = true AND status = 'published';


-- ─────────────────────────────────────────────────────────────────────────────
-- TOP 30 FALSOS PARTICULARES — para revisión manual antes de ejecutar UPDATEs
-- ─────────────────────────────────────────────────────────────────────────────

SELECT
  id,
  advertiser_name,
  title,
  city,
  source_portal,
  source_url,
  CASE
    WHEN advertiser_name ILIKE '%inmobiliaria%' OR advertiser_name ILIKE '%inmosur%'
         OR advertiser_name ILIKE '%asesores%' OR advertiser_name ILIKE '%gestión%'
         OR advertiser_name ~* '\mS\.?\s*L\.?'                                        THEN 'Nombre corporativo'
    WHEN advertiser_name ~ '[A-ZÁÉÍÓÚÜÑ]{4,}'
         AND length(regexp_replace(advertiser_name, '[^A-ZÁÉÍÓÚÜÑ]', '', 'g'))
             > length(regexp_replace(advertiser_name, '[^a-záéíóúüñ]', '', 'g'))       THEN 'Todo en MAYÚSCULAS'
    WHEN description ILIKE '%honorarios%' OR description ILIKE '%agencia inmobiliaria%'
         OR description ILIKE '%referencia catastral%'                                 THEN 'Texto delata agencia'
    ELSE 'Otro'
  END AS motivo_sospecha
FROM listings
WHERE is_particular = true
  AND status = 'published'
  AND (
    advertiser_name ILIKE '%inmobiliaria%' OR advertiser_name ILIKE '%inmosur%'
    OR advertiser_name ILIKE '%asesores%' OR advertiser_name ILIKE '%gestion%'
    OR advertiser_name ILIKE '%gestión%' OR advertiser_name ILIKE '%finques%'
    OR advertiser_name ILIKE '%grupo%' OR advertiser_name ILIKE '%real estate%'
    OR advertiser_name ~* '\mS\.?\s*L\.?' OR advertiser_name ~ '[A-ZÁÉÍÓÚÜÑ]{5,}'
    OR description ILIKE '%honorarios%' OR description ILIKE '%agencia inmobiliaria%'
    OR description ILIKE '%referencia catastral%' OR description ILIKE '%nuestra cartera%'
    OR title ILIKE '%inmobiliaria%' OR title ILIKE '%agencia%'
  )
ORDER BY
  CASE WHEN advertiser_name ILIKE '%inmobiliaria%' OR advertiser_name ILIKE '%inmosur%' THEN 0
       WHEN advertiser_name ~ '[A-ZÁÉÍÓÚÜÑ]{5,}' THEN 1
       ELSE 2 END,
  created_at DESC
LIMIT 30;
