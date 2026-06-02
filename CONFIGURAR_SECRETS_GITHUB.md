# 🔐 Configuración de Secrets en GitHub Actions

## 📍 Ir a la página de Secrets

1. Abrir: https://github.com/danielhdz2-ai/inmonest/settings/secrets/actions
2. Click en **"New repository secret"** para cada uno

---

## 🔑 Secrets a Configurar

### 1. CRON_SECRET
**Nombre del secret:** `CRON_SECRET`  
**Valor:**
```
uacb4nRUtgzIJoVi3l8fAwpMxqXDkd6EyNFh1WmQSjBH2rCLYeT9K7Ov0s5GPZ
```
**Usado por:**
- 🔔 Enviar Alertas de Búsqueda
- 🔧 Bot de Mantenimiento

---

### 2. NEXT_PUBLIC_SUPABASE_URL
**Nombre del secret:** `NEXT_PUBLIC_SUPABASE_URL`  
**Valor:**
```
https://ktsdxpmaljiyuwimcugx.supabase.co
```
**Usado por:**
- 🧹 Limpieza Semanal de Pisos Obsoletos
- 🔍 Detector de Pisos No Disponibles (404s)

---

### 3. NEXT_PUBLIC_SUPABASE_ANON_KEY
**Nombre del secret:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
**Valor:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NTQ4NTQsImV4cCI6MjA5MTIzMDg1NH0.P1qEC73XK9QCCcN7GH9RmBrE1e1oQbes5Nj061h5LLA
```
**Usado por:**
- 🧹 Limpieza Semanal de Pisos Obsoletos

---

### 4. SUPABASE_SERVICE_ROLE_KEY
**Nombre del secret:** `SUPABASE_SERVICE_ROLE_KEY`  
**Valor:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY1NDg1NCwiZXhwIjoyMDkxMjMwODU0fQ.0VuUqRsrb2kNgLfoqyduMC7weRc9JJKtg1r14mOEbi8
```
**Usado por:**
- 🔍 Detector de Pisos No Disponibles (404s)
- Generate AI Descriptions v2.0

---

### 5. SUPABASE_URL (opcional para AI descriptions)
**Nombre del secret:** `SUPABASE_URL`  
**Valor:**
```
https://ktsdxpmaljiyuwimcugx.supabase.co
```
**Usado por:**
- Generate AI Descriptions v2.0

---

## ✅ Verificación

Después de configurar todos los secrets, verifica que están configurados:
```bash
gh secret list
```

Deberías ver:
- ✅ CRON_SECRET
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- ✅ SUPABASE_SERVICE_ROLE_KEY
- ✅ SUPABASE_URL
- ✅ SUPABASE_SERVICE_KEY (ya configurado)

---

## 🚀 Activar Workflows

Una vez configurados los secrets, ejecutar:
```bash
git pull
```

Luego, descomentar los schedules en los workflows y hacer commit/push.

O simplemente esperar a la siguiente ejecución programada de cada workflow.

---

## 📊 Schedules Configurados

Una vez activos, los workflows se ejecutarán automáticamente:

| Workflow | Frecuencia | Hora (UTC) | Hora (España) |
|----------|------------|------------|---------------|
| 🔔 Alertas | Diario | 08:00 | 10:00 |
| 🔧 Mantenimiento | Semanal (Lunes) | 06:00 | 08:00 |
| 🧹 Limpieza Semanal | Semanal (Domingo) | 01:00 | 03:00 |
| 🔍 Detector 404s | Semanal (Miércoles) | 04:00 | 06:00 |

---

**Última actualización:** 2026-06-02  
**Generado automáticamente desde `.env.local`**
