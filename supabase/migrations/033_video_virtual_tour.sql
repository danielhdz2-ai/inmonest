-- Migration 033: Añade columnas video_url y virtual_tour_url a listings
-- Ejecutar en Supabase SQL Editor

ALTER TABLE listings
  ADD COLUMN IF NOT EXISTS video_url        text,
  ADD COLUMN IF NOT EXISTS virtual_tour_url text;

COMMENT ON COLUMN listings.video_url        IS 'URL de vídeo del inmueble (YouTube embed, etc.)';
COMMENT ON COLUMN listings.virtual_tour_url IS 'URL de tour virtual (Matterport, etc.)';
