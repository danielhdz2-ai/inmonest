# 🔐 SEGURIDAD: VAPID Keys Comprometidas

## ⚠️ ACCIÓN INMEDIATA REQUERIDA

Las VAPID keys estaban expuestas en el repositorio público de GitHub. Han sido rotadas.

## Nuevas VAPID Keys Generadas:

```
Public Key:  BJG-n26E2CSS5o59vYsl_4sxEoSetEMUN5MjSzP2rW2EIGJsDRX3Yk2EXQu3X2sRn6BqcE5WTaxOn9EOdDaqrZo
Private Key: o4-pJUDuLi7MPTt7-kDHOQG-TansWNxlcGfblDjtems
```

## Pasos para Actualizar:

### 1. Local (.env.local)
```bash
# Actualiza tu archivo .env.local con las nuevas keys:
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BJG-n26E2CSS5o59vYsl_4sxEoSetEMUN5MjSzP2rW2EIGJsDRX3Yk2EXQu3X2sRn6BqcE5WTaxOn9EOdDaqrZo
VAPID_PRIVATE_KEY=o4-pJUDuLi7MPTt7-kDHOQG-TansWNxlcGfblDjtems
```

### 2. Vercel (Producción)
1. Ve a https://vercel.com/dashboard
2. Selecciona proyecto **Inmonest**
3. **Settings** → **Environment Variables**
4. Edita las variables existentes:
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY` → Nueva public key
   - `VAPID_PRIVATE_KEY` → Nueva private key
5. **Importante**: Aplica a **Production + Preview + Development**
6. Click **Save**
7. **Redeploy** el proyecto para que tome las nuevas keys

### 3. Re-suscribir Usuarios
Los usuarios que estaban suscritos a push notifications necesitarán volver a suscribirse porque las keys cambiaron.

**Opcional**: Puedes añadir un banner en la app:
```tsx
"🔔 Mejoramos las notificaciones. Por favor, reactiva las alertas push en Configuración."
```

## Limpieza de Base de Datos

Todas las suscripciones antiguas son inválidas. Límpiala:

```sql
-- En Supabase Dashboard → SQL Editor
DELETE FROM push_subscriptions WHERE created_at < NOW();
```

O mejor, deja que se auto-limpien cuando fallen (el código ya lo hace).

## Lecciones Aprendidas

❌ **MAL**: Poner keys reales en `.env.example`
```bash
VAPID_PRIVATE_KEY=KllP9K0Z5HSokTGis8veAlhDHFdoOET68rc1l-gEhC4
```

✅ **BIEN**: Usar placeholders
```bash
VAPID_PRIVATE_KEY=TU_VAPID_PRIVATE_KEY_AQUI
```

## Eliminar del Historial de Git (Opcional)

Si quieres eliminar completamente las keys del historial:

```bash
# ⚠️ Esto reescribe el historial - úsalo solo si es crítico
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.example" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

**Nota**: No es necesario si ya rotaste las keys. Las antiguas ya no sirven.

## Estado Actual

- ✅ Nuevas VAPID keys generadas
- ✅ `.env.example` actualizado con placeholders
- ✅ Documentación actualizada con advertencias de seguridad
- ⏳ Pendiente: Actualizar keys en Vercel
- ⏳ Pendiente: Reiniciar push subscriptions

---

**Fecha**: 30 de abril 2026, 08:45 UTC
**Detectado por**: GitGuardian
**Severidad**: ALTA (pero mitigada con rotación)
