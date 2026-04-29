#!/usr/bin/env pwsh
# Script para generar meta descriptions

Write-Host "`n📝 Generando Meta Descriptions..." -ForegroundColor Cyan

# Cargar variables de entorno
Get-Content .env.local | ForEach-Object {
    if ($_ -match '^NEXT_PUBLIC_SUPABASE_URL=(.+)$') {
        $env:SUPABASE_URL = $matches[1]
    }
    if ($_ -match '^SUPABASE_SERVICE_ROLE_KEY=(.+)$') {
        $env:SUPABASE_SERVICE_ROLE_KEY = $matches[1]
    }
}

Write-Host "✓ Variables de entorno cargadas" -ForegroundColor Green
Write-Host "✓ Ejecutando generación..." -ForegroundColor Green

# Ejecutar script
npx tsx scripts/seo/generate-meta-descriptions.mts

Write-Host "`n✅ Meta descriptions generadas!" -ForegroundColor Green
