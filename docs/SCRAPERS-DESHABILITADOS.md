# Scrapers y portal particulares — desactivados

**Estado (2026-10+):** Inmonest pivota a **gestoría inmobiliaria**. El marketplace de particulares está cerrado; los raspadores **no deben ejecutarse en cron**.

## GitHub Actions

Workflows deshabilitados en el repositorio (sin schedule activo):

- Daily Scrape – Particulares
- Raspadores Pro
- Detector de Pisos No Disponibles (404s)
- Limpieza Semanal de Pisos Obsoletos
- Bot de Mantenimiento - Limpieza Avanzada
- Generate AI Descriptions v2.0

Los YAML en `.github/workflows/` deben mantener **solo `workflow_dispatch`** (sin `schedule`). Cambios en esos archivos requieren token GitHub con scope `workflow` al hacer push desde CI local.

## Manual legacy

Si alguna vez hace falta un scrape puntual: GitHub → Actions → workflow → **Run workflow** (no reactivar cron).
