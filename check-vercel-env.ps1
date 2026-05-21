# Script para verificar si CRON_SECRET está configurado en Vercel
# Y agregarlo automáticamente si falta

Write-Host "🔍 Verificando configuración de CRON_SECRET en Vercel..." -ForegroundColor Cyan
Write-Host ""

# Leer el secret del .env.local
$secret = (Get-Content .env.local | Select-String 'CRON_SECRET=' | ForEach-Object { $_ -replace 'CRON_SECRET=', '' }).Trim()

if (-not $secret) {
    Write-Host "❌ No se encontró CRON_SECRET en .env.local" -ForegroundColor Red
    exit 1
}

Write-Host "✅ CRON_SECRET encontrado en .env.local" -ForegroundColor Green
Write-Host ""

# Verificar si el usuario tiene Vercel CLI instalado
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "⚠️  Vercel CLI no está instalado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 OPCIÓN 1: Instalar Vercel CLI y agregar automáticamente" -ForegroundColor Cyan
    Write-Host "   npm install -g vercel"
    Write-Host "   vercel env add CRON_SECRET production"
    Write-Host "   (pegar el valor cuando te lo pida)"
    Write-Host ""
    Write-Host "📋 OPCIÓN 2: Agregar manualmente en Vercel Dashboard" -ForegroundColor Cyan
    Write-Host "   Link: https://vercel.com/danielhdz2-ai/inmonest/settings/environment-variables"
    Write-Host "   Variable: CRON_SECRET"
    Write-Host "   Value: $secret"
    Write-Host "   Environments: Production, Preview, Development"
    exit 0
}

Write-Host "✅ Vercel CLI instalado" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Agregando CRON_SECRET a Vercel..." -ForegroundColor Cyan
Write-Host ""

# Intentar agregar la variable
$secretInput = $secret | Out-String
try {
    $secretInput | vercel env add CRON_SECRET production 2>&1 | Out-Host
    $secretInput | vercel env add CRON_SECRET preview 2>&1 | Out-Host
    $secretInput | vercel env add CRON_SECRET development 2>&1 | Out-Host
    
    Write-Host ""
    Write-Host "✅ CRON_SECRET agregado a Vercel en todos los environments" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔄 Ahora necesitas hacer un redeploy:" -ForegroundColor Yellow
    Write-Host "   git commit --allow-empty -m 'Trigger redeploy'"
    Write-Host "   git push origin main"
} catch {
    Write-Host "⚠️  No se pudo agregar automáticamente" -ForegroundColor Yellow
    Write-Host "Por favor agrega manualmente en:" -ForegroundColor Yellow
    Write-Host "https://vercel.com/danielhdz2-ai/inmonest/settings/environment-variables" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Variable: CRON_SECRET" -ForegroundColor White
    Write-Host "Value: $secret" -ForegroundColor White
}
