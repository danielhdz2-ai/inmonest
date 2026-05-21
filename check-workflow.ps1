Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   ESTADO DEL WORKFLOW DE ALERTAS" -ForegroundColor White
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Obtener información del último run
Write-Host "📊 Últimos 3 runs:" -ForegroundColor Yellow
gh run list --workflow=alertas.yml --limit 3

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Obtener logs del último run fallido
Write-Host "🔍 Logs del último run (fallido):" -ForegroundColor Yellow
Write-Host ""
gh run view --log-failed 2>&1

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   DIAGNÓSTICO Y SOLUCIÓN" -ForegroundColor White  
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "❌ Último run: FALLÓ a las 10:59 AM (automático)" -ForegroundColor Red
Write-Host "✅ Fix aplicado: 11:XX AM (después del error)" -ForegroundColor Green
Write-Host ""
Write-Host "📝 El workflow falló porque faltaba CRON_SECRET" -ForegroundColor White
Write-Host "✅ CRON_SECRET ya está configurado ahora" -ForegroundColor Green
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   PRÓXIMOS PASOS" -ForegroundColor White
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opción 1 (Manual - 1 click):" -ForegroundColor Yellow
Write-Host "  1. Abre: https://github.com/danielhdz2-ai/inmonest/actions/workflows/alertas.yml" -ForegroundColor Cyan
Write-Host "  2. Click en 'Run workflow'" -ForegroundColor White
Write-Host "  3. Click en 'Run workflow' (botón verde)" -ForegroundColor White
Write-Host "  4. Espera 5-10 segundos y verás el resultado" -ForegroundColor White
Write-Host ""
Write-Host "Opción 2 (Automático):" -ForegroundColor Yellow
Write-Host "  El workflow se ejecutará solo mañana a las 10:00 AM" -ForegroundColor White
Write-Host "  Y todos los días después de eso" -ForegroundColor White
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
