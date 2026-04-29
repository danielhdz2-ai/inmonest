#!/usr/bin/env pwsh
# Script para actualizar títulos SEO de los listings

Write-Host "`n🎯 Actualizando Títulos SEO..." -ForegroundColor Cyan

# Cargar variables de entorno desde .env.local
Get-Content .env.local | ForEach-Object {
    if ($_ -match '^NEXT_PUBLIC_SUPABASE_URL=(.+)$') {
        $env:SUPABASE_URL = $matches[1]
    }
    if ($_ -match '^SUPABASE_SERVICE_ROLE_KEY=(.+)$') {
        $env:SUPABASE_SERVICE_ROLE_KEY = $matches[1]
    }
}

Write-Host "✓ Variables de entorno cargadas" -ForegroundColor Green
Write-Host "✓ Ejecutando actualización de títulos..." -ForegroundColor Green

# Ejecutar script
npx tsx scripts/seo/generate-optimized-titles.mts

Write-Host "`n✅ Títulos actualizados!" -ForegroundColor Green
