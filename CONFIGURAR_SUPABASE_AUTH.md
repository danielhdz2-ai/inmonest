# 🔧 Configuración de Supabase Auth para que funcionen los registros

## ❌ Problema actual:
Los usuarios no pueden registrarse con email porque Supabase está rechazando las peticiones (error 500).

---

## ✅ Solución 1: DESACTIVAR confirmación de email (más rápido)

### Ir a Supabase Dashboard:

1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto **Inmonest**
3. **Authentication** → **Settings** (en el menú lateral izquierdo)
4. Busca la sección **"Email"**
5. Encuentra **"Enable Email Confirmations"**
6. **DESACTIVA** esta opción (toggle OFF)
7. Click en **"Save"**

**Resultado**: Los usuarios se registrarán instantáneamente sin necesidad de confirmar email.

---

## ✅ Solución 2: CONFIGURAR envío de emails (si quieres confirmación)

Si prefieres que los usuarios confirmen su email, necesitas configurar el proveedor de email:

### Opción A: Usar email por defecto de Supabase (limitado)

1. **Authentication** → **Settings** → **Email**
2. Asegúrate que **"Enable Email Confirmations"** esté activado
3. Los emails se enviarán desde `noreply@mail.app.supabase.io`
4. **IMPORTANTE**: Supabase limita a 3-4 emails por hora en plan gratuito

### Opción B: Configurar SMTP personalizado (recomendado)

1. **Authentication** → **Settings** → **Email**
2. Scroll hasta **"SMTP Settings"**
3. Configura:
   ```
   SMTP Host: smtp.gmail.com (o tu proveedor)
   SMTP Port: 587
   SMTP User: tu-email@gmail.com
   SMTP Password: tu-app-password (no la contraseña normal)
   Sender Email: noreply@inmonest.com
   Sender Name: Inmonest
   ```
4. Click **"Save"**

---

## ✅ Solución 3: Configurar URLs de redirección

1. **Authentication** → **URL Configuration**
2. **Site URL**: `https://inmonest.com`
3. **Redirect URLs** (agregar estas 2 líneas):
   ```
   https://inmonest.com/auth/callback
   http://localhost:3000/auth/callback
   ```
4. Click **"Save"**

---

## 🚀 QUÉ HACER AHORA:

### Opción más rápida (5 minutos):
1. Sigue **Solución 1** (desactivar confirmación de email)
2. Espera 1 minuto
3. Prueba registrarte de nuevo en https://inmonest.com/registro
4. Debería funcionar instantáneamente

### Alternativa:
Mientras arreglas Supabase, los usuarios pueden:
- **Registrarse con Google** (botón "Continuar con Google") ← esto ya funciona

---

## 📋 Verificar que funcionó:

Después de configurar Supabase:

1. Abre https://inmonest.com/registro
2. Llena el formulario:
   - Nombre: Prueba
   - Email: test@example.com
   - Contraseña: 12345678
3. Click en **"Crear cuenta gratis"**
4. Si funciona:
   - **Con confirmación OFF**: Te llevará directo a /mi-cuenta
   - **Con confirmación ON**: Verás "¡Cuenta creada! Confirma tu email"

---

## 🆘 Si sigue sin funcionar:

1. Ve a **Authentication** → **Users** en Supabase
2. Verifica si el usuario se creó (aunque no pueda iniciar sesión)
3. Si aparece: el problema es la confirmación de email
4. Si NO aparece: el problema es otro (contacta soporte de Supabase)

---

**RECOMENDACIÓN**: Usa **Solución 1** (desactivar confirmación) para lanzar rápido. Puedes activarla después cuando configures SMTP.
