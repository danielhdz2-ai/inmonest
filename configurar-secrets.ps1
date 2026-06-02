# Script para configurar secrets en GitHub Actions
# Ejecutar: .\configurar-secrets.ps1

Write-Host "Configurando secrets en GitHub Actions..." -ForegroundColor Cyan
Write-Host ""

$secrets = @{
    "CRON_SECRET" = "uacb4nRUtgzIJoVi3l8fAwpMxqXDkd6EyNFh1WmQSjBH2rCLYeT9K7Ov0s5GPZ"
    "NEXT_PUBLIC_SUPABASE_URL" = "https://ktsdxpmaljiyuwimcugx.supabase.co"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NTQ4NTQsImV4cCI6MjA5MTIzMDg1NH0.P1qEC73XK9QCCcN7GH9RmBrE1e1oQbes5Nj061h5LLA"
    "SUPABASE_SERVICE_ROLE_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY1NDg1NCwiZXhwIjoyMDkxMjMwODU0fQ.0VuUqRsrb2kNgLfoqyduMC7weRc9JJKtg1r14mOEbi8"
    "SUPABASE_URL" = "https://ktsdxpmaljiyuwimcugx.supabase.co"
}

$success = 0
$failed = 0

foreach ($secret in $secrets.GetEnumerator()) {
    Write-Host "Configurando $($secret.Key)..." -ForegroundColor Yellow
    
    try {
        # Intentar con gh CLI
        $value = $secret.Value
        gh secret set $secret.Key -b "$value" 2>$null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "   OK $($secret.Key) configurado" -ForegroundColor Green
            $success++
        } else {
            throw "gh CLI fallo"
        }
    } catch {
        Write-Host "   ERROR con gh CLI" -ForegroundColor Red
        Write-Host "   Copiar manualmente:" -ForegroundColor Cyan
        Write-Host "      Nombre: $($secret.Key)" -ForegroundColor White
        Write-Host "      Valor: $($secret.Value)" -ForegroundColor Gray
        Write-Host ""
        $failed++
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "OK Configurados: $success" -ForegroundColor Green
Write-Host "ERROR Fallidos: $failed" -ForegroundColor Red

if ($failed -gt 0) {
    Write-Host ""
    Write-Host "Configurar manualmente en:" -ForegroundColor Yellow
    Write-Host "   https://github.com/danielhdz2-ai/inmonest/settings/secrets/actions" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Ver CONFIGURAR_SECRETS_GITHUB.md para instrucciones detalladas" -ForegroundColor White
}
