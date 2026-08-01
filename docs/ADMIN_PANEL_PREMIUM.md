# 🎯 Panel de Admin Premium - Inmonest

## 📋 Descripción

Panel de administración avanzado con métricas en tiempo real, base de datos de clientes, analytics y gestión completa de pedidos de gestoría.

---

## ✨ Características Principales

### 📊 **Dashboard**
- **KPIs en tiempo real**: Ingresos totales, pedidos pagados, clientes únicos, ticket promedio
- **Métricas secundarias**: Tasa de conversión, tiempo promedio de procesamiento
- **Top servicios**: Ranking de servicios más vendidos con gráficos
- **Gráfico de ingresos**: Visualización de ingresos diarios (últimos 30 días)

### 👥 **Base de Datos de Clientes**
- Tabla completa con todos los clientes
- Información agregada por cliente:
  - Total de pedidos
  - Pedidos pagados
  - Ingresos generados
  - Primera y última compra
  - Contacto (email, teléfono)
- Búsqueda y filtrado
- Exportación a CSV
- Acceso directo a pedidos del cliente

### 📋 **Gestión de Pedidos**
- Lista completa de pedidos con detalles
- Información completa:
  - Servicio contratado
  - Cliente (nombre, email, teléfono)
  - Monto y estado de pago
  - Progreso (paso 1-4)
  - Link directo a Stripe
- Búsqueda por cliente
- Filtros por estado

### 📂 **Documentos** (Próximamente)
- Gestión centralizada de documentos
- Organización por cliente y pedido

---

## 🔧 Instalación

### 1. **Ejecutar Migración en Supabase**

Ve al SQL Editor de tu proyecto Supabase y ejecuta el archivo:

```bash
supabase/migrations/040_admin_enhancements.sql
```

Esta migración crea:
- ✅ Campos adicionales en `gestoria_requests` (tags, priority, internal_notes, etc.)
- ✅ Tabla `gestoria_activity` para timeline de actividad
- ✅ Tabla `client_communications` para comunicaciones
- ✅ Tabla `admin_metrics` para métricas agregadas
- ✅ Función `update_daily_metrics()` para calcular KPIs
- ✅ Trigger automático para registrar actividad
- ✅ Índices para performance
- ✅ Políticas RLS

### 2. **Actualizar Datos Históricos**

Después de ejecutar la migración, actualiza las métricas con datos existentes:

```sql
-- Ejecutar en Supabase SQL Editor
SELECT update_daily_metrics();
```

### 3. **Deploy**

El panel ya está configurado y se desplegará automáticamente con el siguiente push:

```bash
git add .
git commit -m "feat: Admin Panel Premium with metrics, clients DB and analytics"
git push origin main
```

---

## 🚀 Uso

### **Acceso**

El panel está en: **https://inmonest.com/admin**

Solo los siguientes emails tienen acceso:
- Email configurado en `CONTACT_NOTIFY_EMAIL` (Vercel)
- `inmonest.admin@gmail.com`

### **Navegación**

El panel tiene 4 tabs principales:

1. **📊 Dashboard**
   - Visualiza métricas generales
   - Ve el rendimiento de servicios
   - Analiza tendencias de ingresos

2. **👥 Clientes**
   - Busca cualquier cliente
   - Ve el historial completo de compras
   - Exporta la base de datos a CSV
   - Accede rápidamente a sus pedidos

3. **📋 Pedidos**
   - Lista completa de pedidos
   - Búsqueda por cliente
   - Acceso directo a Stripe
   - Ver progreso de cada pedido

4. **📂 Documentos**
   - (En construcción)

---

## 📊 Métricas Automáticas

### **Cómo Funciona**

Los ingresos se actualizan **automáticamente** desde Stripe:

1. **Webhook de Stripe** (`/api/stripe/webhook`)
   - Cuando un cliente paga, Stripe envía el evento `checkout.session.completed`
   - El webhook guarda el pedido en `gestoria_requests` con `status: 'paid'`
   - Se marca la fecha de pago en `paid_at`

2. **API de Métricas** (`/api/admin/metrics`)
   - Calcula KPIs en tiempo real desde la base de datos
   - No requiere mantenimiento manual
   - Se actualiza cada vez que cargas el dashboard

3. **Función `update_daily_metrics()`**
   - Opcionalmente, puedes ejecutarla para cache de métricas históricas
   - Útil si tienes muchos pedidos (>10,000)

---

## 🎨 Características Técnicas

### **APIs Creadas**

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/admin/clients` | GET | Base de datos completa de clientes |
| `/api/admin/clients` | POST | Actualizar tags/notas de cliente |
| `/api/admin/metrics` | GET | Métricas agregadas y KPIs |
| `/api/admin/activity` | GET | Timeline de actividad de pedido |
| `/api/admin/activity` | POST | Agregar actividad manual |

### **Componentes**

- **AdminPanelPremium.tsx**: Componente principal del panel
- **Admin APIs**: Endpoints para datos (clientes, métricas, actividad)
- **Migración 040**: Schema de base de datos mejorado

### **Performance**

- ✅ Índices en todas las tablas críticas
- ✅ Queries optimizadas con agregación en cliente
- ✅ Carga lazy de métricas (solo cuando se necesitan)
- ✅ RLS policies para seguridad

---

## 📈 Próximas Mejoras Sugeridas

1. **Gestión de Documentos Completa**
   - Subir/descargar documentos desde el panel
   - Organización por cliente y pedido
   - Preview de PDFs

2. **Comunicaciones**
   - Historial de emails enviados
   - Enviar emails desde el panel
   - WhatsApp integration

3. **Tareas y Recordatorios**
   - Sistema de to-do por pedido
   - Recordatorios automáticos
   - Asignación de pedidos a admins

4. **Analytics Avanzados**
   - Gráficos interactivos (Chart.js, Recharts)
   - Predicción de ingresos
   - Análisis de retención de clientes

5. **Notificaciones**
   - Push notifications para nuevos pedidos
   - Alertas de pedidos estancados
   - Recordatorios de seguimiento

---

## 🐛 Solución de Problemas

### **No veo los datos de Wilson**

Si no aparecen los datos del cliente Wilson (wilval7126@gmail.com):

1. Verifica que el pago se haya procesado en Stripe:
   ```
   https://dashboard.stripe.com/payments
   ```

2. Revisa que el webhook esté configurado correctamente:
   ```
   https://dashboard.stripe.com/webhooks
   ```

3. Verifica en Supabase que el registro exista:
   ```sql
   SELECT * FROM gestoria_requests 
   WHERE client_email = 'wilval7126@gmail.com';
   ```

4. Si no existe, crea el registro manualmente:
   ```sql
   INSERT INTO gestoria_requests (
     service_key, client_name, client_email, client_phone,
     amount_eur, status, paid_at, step
   ) VALUES (
     'revision-contrato-arras', 
     'Wilson', 
     'wilval7126@gmail.com', 
     '',
     120,
     'paid',
     NOW(),
     1
   );
   ```

### **Las métricas no coinciden**

Ejecuta manualmente la actualización de métricas:

```sql
SELECT update_daily_metrics();
```

### **No tengo acceso al panel**

Verifica que tu email esté en la lista de admins:
1. Ve a `/debug-session` después de hacer login
2. Verifica que tu email coincida con uno de los configurados
3. Si no, contacta al desarrollador para agregarlo

---

## 💡 Tips de Uso

1. **Exporta regularmente** la base de datos de clientes para backup
2. **Revisa el Dashboard diariamente** para monitorear el rendimiento
3. **Usa la búsqueda** para encontrar rápidamente clientes o pedidos
4. **Filtra por estado** para priorizar pedidos pendientes
5. **Accede a Stripe** desde los pedidos para ver detalles de pago

---

## 📞 Soporte

Para preguntas o problemas, contacta:
- Email: inmonest.admin@gmail.com
- Supabase Project: [Tu proyecto ID]
- Vercel: https://vercel.com/danielhdz2-ai/inmonest

---

**¡Disfruta tu nuevo Panel de Admin Premium! 🎉**
