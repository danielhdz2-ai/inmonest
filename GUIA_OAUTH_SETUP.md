# ============================================================================
# GUÍA: Configurar OAuth Social Login (Google, Facebook, Apple)
# ============================================================================

## IMPORTANTE: Configurar OAuth en Supabase

Para que funcione el login con Google, Facebook y Apple, necesitas configurar cada provider en Supabase Dashboard.

---

## 1. CONFIGURAR GOOGLE OAUTH

### Paso 1: Crear aplicación en Google Cloud Console

1. Ve a https://console.cloud.google.com/apis/credentials
2. Crea un proyecto nuevo (o selecciona existente)
3. Click en **"Create Credentials"** → **"OAuth 2.0 Client ID"**
4. Tipo de aplicación: **"Web application"**
5. Nombre: `Inmonest`
6. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://inmonest.com
   https://TU_PROYECTO.supabase.co
   ```
7. **Authorized redirect URIs**:
   ```
   http://localhost:3000/auth/callback
   https://inmonest.com/auth/callback
   https://TU_PROYECTO.supabase.co/auth/v1/callback
   ```
8. Click **"Create"**
9. Copia el **Client ID** y **Client Secret**

### Paso 2: Configurar en Supabase

1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. **Authentication** → **Providers** → **Google**
4. Activa **"Google Enabled"**
5. Pega **Client ID** y **Client Secret**
6. Click **"Save"**

✅ ¡Google OAuth configurado!

---

## 2. CONFIGURAR FACEBOOK OAUTH

### Paso 1: Crear app en Facebook Developers

1. Ve a https://developers.facebook.com/apps
2. Click **"Create App"** → **"Consumer"**
3. Nombre: `Inmonest`
4. Email de contacto: `hola@inmonest.com`
5. Click **"Create App"**

### Paso 2: Configurar Facebook Login

1. En el Dashboard de tu app, añade **"Facebook Login"**
2. Tipo: **"Web"**
3. **Settings** → **Basic**:
   - App ID: (cópialo)
   - App Secret: Click **"Show"** y cópialo
4. **Facebook Login** → **Settings**:
   - **Valid OAuth Redirect URIs**:
     ```
     https://TU_PROYECTO.supabase.co/auth/v1/callback
     ```
5. **App Domains**:
   ```
   inmonest.com
   TU_PROYECTO.supabase.co
   ```
6. **Privacy Policy URL**: `https://inmonest.com/privacidad`
7. **Terms of Service URL**: `https://inmonest.com/terminos`

### Paso 3: Hacer app pública (IMPORTANTE)

1. **Settings** → **Basic**
2. Cambia estado de **"Development"** a **"Live"**
3. Selecciona categoría: **"Business and Pages"**
4. Click **"Switch Mode"**

### Paso 4: Configurar en Supabase

1. Ve a Supabase Dashboard → **Authentication** → **Providers** → **Facebook**
2. Activa **"Facebook Enabled"**
3. Pega **App ID** y **App Secret**
4. Click **"Save"**

✅ ¡Facebook OAuth configurado!

---

## 3. CONFIGURAR APPLE OAUTH (Sign in with Apple)

### Paso 1: Configurar en Apple Developer

1. Ve a https://developer.apple.com/account/resources/identifiers/list
2. Click **"+"** para crear nuevo identifier
3. Selecciona **"Services IDs"** → Continue
4. Description: `Inmonest`
5. Identifier: `com.inmonest.web` (debe ser único)
6. Click **"Continue"** → **"Register"**

### Paso 2: Configurar Sign in with Apple

1. Selecciona el Services ID que creaste
2. Marca **"Sign in with Apple"**
3. Click **"Configure"**
4. **Domains and Subdomains**:
   ```
   inmonest.com
   ```
5. **Return URLs**:
   ```
   https://TU_PROYECTO.supabase.co/auth/v1/callback
   ```
6. Click **"Save"** → **"Continue"** → **"Register"**

### Paso 3: Obtener credenciales

1. Ve a **"Certificates, Identifiers & Profiles"** → **"Keys"**
2. Click **"+"** para crear nueva key
3. Nombre: `Inmonest Sign in with Apple`
4. Marca **"Sign in with Apple"**
5. Click **"Configure"** → Selecciona tu Services ID → **"Save"**
6. Click **"Continue"** → **"Register"**
7. **IMPORTANTE**: Descarga el archivo `.p8` (solo se puede descargar UNA VEZ)
8. Copia el **Key ID**

### Paso 4: Configurar en Supabase

1. Ve a Supabase Dashboard → **Authentication** → **Providers** → **Apple**
2. Activa **"Apple Enabled"**
3. **Services ID**: `com.inmonest.web`
4. **Key ID**: (el que copiaste)
5. **Secret Key**: Abre el archivo `.p8` en un editor de texto y pega TODO el contenido
6. **Team ID**: Ve a https://developer.apple.com/account/ → Membership → copia el Team ID
7. Click **"Save"**

✅ ¡Apple OAuth configurado!

---

## 4. VERIFICAR CONFIGURACIÓN

### URLs de Callback

Asegúrate de que estas URLs están configuradas en Supabase:

1. **Supabase Dashboard** → **Authentication** → **URL Configuration**
2. **Site URL**: `https://inmonest.com`
3. **Redirect URLs** (añade todas):
   ```
   http://localhost:3000/auth/callback
   https://inmonest.com/auth/callback
   https://www.inmonest.com/auth/callback
   ```

---

## 5. TESTING LOCAL

### Desarrollo local (localhost)

Para probar OAuth en localhost, necesitas:

1. **Google**: Ya configurado con `http://localhost:3000` en origins
2. **Facebook**: Solo funciona con HTTPS (usa túnel ngrok o deploy a Vercel preview)
3. **Apple**: Solo funciona con HTTPS (usa túnel ngrok o deploy a Vercel preview)

### Túnel HTTPS para testing (opcional)

```bash
# Instalar ngrok
npm install -g ngrok

# Iniciar túnel
ngrok http 3000

# Copiar la URL HTTPS y añadirla a:
# - Redirect URIs de Google/Facebook/Apple
# - Redirect URLs de Supabase
```

---

## 6. PRODUCTION DEPLOYMENT

Cuando despliegues a producción:

1. **Actualiza URLs en Google Console**:
   - Añade `https://inmonest.com/auth/callback`
   
2. **Actualiza URLs en Facebook**:
   - Añade `https://inmonest.com` a App Domains
   - Asegura que la app está en modo **"Live"**

3. **Actualiza URLs en Apple**:
   - Añade `inmonest.com` a Domains

4. **Actualiza en Supabase**:
   - Site URL: `https://inmonest.com`
   - Redirect URLs: incluir todas las variantes (www, sin www)

---

## 7. TROUBLESHOOTING

### Error: "Redirect URI mismatch"
- Verifica que la URL de callback está exactamente igual en el provider y Supabase
- Incluye http/https, www/sin www, con/sin trailing slash

### Error: "App not in production mode" (Facebook)
- Ve a Facebook Developer Console → App → Settings → Basic
- Cambia de "Development" a "Live"

### Error: "Invalid client" (Apple)
- Verifica que el Team ID es correcto
- Verifica que el archivo .p8 está completo (incluye BEGIN/END PRIVATE KEY)

### Botón de OAuth no hace nada:
- Abre consola del navegador (F12) y busca errores
- Verifica que las variables están correctas en Supabase
- Prueba con OAuth Playground: https://supabase.com/docs/guides/auth

---

## 8. EMAIL VERIFICATION

### Configurar verificación automática

Por defecto, Supabase envía email de verificación al registrarse con contraseña.

Para **deshabilitar** verificación (permitir acceso inmediato):

1. Supabase Dashboard → **Authentication** → **Providers** → **Email**
2. Desactiva **"Confirm email"**
3. Click **"Save"**

⚠️ **No recomendado para producción** - Permite crear cuentas con emails falsos.

### Personalizar templates de email

1. Supabase Dashboard → **Authentication** → **Email Templates**
2. Edita los templates:
   - **Confirm signup**: Email de verificación
   - **Magic Link**: Enlace mágico para login
   - **Reset Password**: Recuperación de contraseña

Variables disponibles:
- `{{ .ConfirmationURL }}` - Link de verificación
- `{{ .Token }}` - Código de verificación
- `{{ .TokenHash }}` - Hash del token
- `{{ .SiteURL }}` - URL de tu sitio

---

## RESUMEN DE COSTOS

| Provider | Plan Gratuito | Límite |
|----------|---------------|--------|
| **Google** | ✅ Gratis | Ilimitado |
| **Facebook** | ✅ Gratis | Ilimitado |
| **Apple** | ❌ $99/año | Requiere Apple Developer Program |

**Recomendación**: Implementa Google y Facebook primero (gratis), Apple después si tienes presupuesto.

---

## ESTADO ACTUAL

- ✅ Código implementado (SocialAuthButtons component)
- ✅ UI mejorada (login/registro con toggle magic-link/password)
- ✅ Recuperación de contraseña (/recuperar-contrasena)
- ⏳ **Pendiente**: Configurar providers en Supabase Dashboard

**Próximos pasos**:
1. Configurar Google OAuth (5 minutos) - GRATIS
2. Configurar Facebook OAuth (10 minutos) - GRATIS
3. (Opcional) Configurar Apple OAuth (15 minutos) - $99/año

============================================================================
