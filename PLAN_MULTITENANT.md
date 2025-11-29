# 🏢 Plan de Implementación Multi-Tenant

## 📋 Resumen Ejecutivo

Implementar soporte multi-tenant manteniendo un solo repositorio, donde cada cliente (tenant) tiene su propia configuración en `tenants/{tenantId}.json` y variables de entorno específicas. Cada tenant tendrá su propio deploy en Vercel con un subdominio dedicado.

---

## 🎯 Decisiones de Diseño

### 1. Determinación del Tenant

#### ✅ **Recomendación: Subdominio como método principal, variable de entorno como fallback**

**Opción A: Subdominio (RECOMENDADO)**

- **Ventajas:**

  - ✅ Más profesional y escalable
  - ✅ SEO mejorado (cada tenant tiene su propio dominio)
  - ✅ Aislamiento completo entre tenants
  - ✅ Fácil de configurar en Vercel (cada proyecto = un subdominio)
  - ✅ Permite dominios personalizados en el futuro
  - ✅ Mejor para branding del cliente

- **Desventajas:**
  - ⚠️ Requiere configuración de DNS por tenant
  - ⚠️ Más complejo para desarrollo local

**Opción B: Variable de Entorno**

- **Ventajas:**

  - ✅ Simple para desarrollo local
  - ✅ No requiere configuración de DNS

- **Desventajas:**
  - ❌ Menos profesional
  - ❌ Todos los tenants comparten el mismo dominio
  - ❌ Más difícil de escalar
  - ❌ Problemas de SEO

**Solución Híbrida:**

```
1. Intentar detectar tenant desde subdominio (producción)
2. Si no hay subdominio, usar NEXT_PUBLIC_TENANT_ID (desarrollo/local)
3. Fallback a "default" si no se encuentra ninguno
```

---

### 2. Dónde Guardar Coffee Shop ID

#### ✅ **Recomendación: En el JSON del tenant + variable de entorno como override**

**Opción A: Solo en JSON (RECOMENDADO)**

- **Ventajas:**

  - ✅ Todo centralizado en un solo lugar
  - ✅ Fácil de versionar y auditar
  - ✅ No requiere cambios en variables de entorno por tenant
  - ✅ Más fácil de mantener

- **Desventajas:**
  - ⚠️ El JSON está en el repositorio (pero es solo configuración, no datos sensibles)

**Opción B: Solo en Variables de Entorno**

- **Ventajas:**

  - ✅ No expone IDs en el repositorio

- **Desventajas:**
  - ❌ Requiere configurar variables por cada deploy
  - ❌ Más difícil de mantener
  - ❌ No versionado

**Solución Híbrida (RECOMENDADA):**

```
1. Coffee Shop ID en tenants/{tenantId}.json (valor por defecto)
2. Variable NEXT_PUBLIC_COFFEE_SHOP_ID como override (opcional)
3. Si existe la variable, tiene prioridad sobre el JSON
```

**Razón:** Permite flexibilidad para casos especiales sin complicar la configuración normal.

---

## 📁 Estructura de Archivos

### Estructura Propuesta

```
webmenu-app/
├── tenants/
│   ├── axionsjn.json          # Tenant: axionsjn
│   ├── client01.json          # Tenant: client01
│   ├── client02.json          # Tenant: client02
│   └── default.json           # Tenant por defecto (fallback)
│
├── utils/
│   ├── tenant.ts              # Lógica de detección y carga de tenant
│   ├── fetchingApi.ts        # Actualizado para usar tenant config
│   └── theme.ts               # Sin cambios
│
├── app/
│   ├── layout.tsx             # Actualizado para cargar tenant config
│   └── ...
│
├── .env.local                 # Desarrollo local
├── .env.example               # Plantilla
└── vercel.json                # Configuración de Vercel (opcional)
```

### Estructura del JSON del Tenant

```json
{
  "tenantId": "axionsjn",
  "api": {
    "baseUrl": "https://coffeemanagement-api...",
    "coffeeShopId": "9b783131-32d0-48cc-bd95-7ed6784d9793"
  },
  "metadata": {
    "title": "Axion San Jerónimo Norte",
    "description": "Spot Axion - San Jerónimo Norte",
    "language": "es"
  },
  "branding": {
    "baseColor": "#D40F7D",
    "secondary": {
      "main": "#981d97"
    },
    "logo": "/logo-spot.png",
    "logoHeader": "/logo-spot.png",
    "defaultImage": "/logo-spot.webp"
  },
  "about": {
    "title": "Sobre Nosotros",
    "contact": [...],
    "location": {...},
    "hours": {...}
  }
}
```

---

## 🔄 Flujo de Carga de Configuración

### 1. Detección del Tenant

```
┌─────────────────────────────────────┐
│  Request llega a la aplicación      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  ¿Hay subdominio?                    │
│  (ej: axionsjn.webmenu.com)         │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
    SÍ            NO
        │             │
        │             ▼
        │    ┌──────────────────────┐
        │    │ ¿Existe NEXT_PUBLIC_ │
        │    │ TENANT_ID?           │
        │    └──────────┬───────────┘
        │               │
        │         ┌─────┴─────┐
        │         │           │
        │         ▼           ▼
        │       SÍ          NO
        │         │           │
        │         │           ▼
        │         │    ┌──────────────┐
        │         │    │ Usar "default"│
        │         │    └──────────────┘
        │         │
        └─────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Cargar tenants/{tenantId}.json    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Aplicar overrides de variables     │
│  de entorno si existen              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Configuración lista para usar      │
└─────────────────────────────────────┘
```

### 2. Implementación Técnica

**Archivo: `utils/tenant.ts`**

```typescript
// Pseudocódigo
function getTenantId() {
  // 1. Intentar desde subdominio
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const subdomain = extractSubdomain(hostname);
    if (subdomain && subdomain !== "www") {
      return subdomain;
    }
  }

  // 2. Intentar desde variable de entorno
  const envTenant = process.env.NEXT_PUBLIC_TENANT_ID;
  if (envTenant) {
    return envTenant;
  }

  // 3. Fallback
  return "default";
}

function loadTenantConfig(tenantId: string) {
  // Cargar JSON del tenant
  // Aplicar overrides de variables de entorno
  // Retornar configuración completa
}
```

---

## 🚀 Configuración en Vercel

### Opción 1: Múltiples Proyectos (RECOMENDADO)

**Ventajas:**

- ✅ Aislamiento completo
- ✅ Variables de entorno independientes
- ✅ Deploys independientes
- ✅ Mejor para escalar

**Configuración:**

1. **Crear un proyecto en Vercel por cada tenant:**

   - Proyecto: `webmenu-axionsjn`
   - Proyecto: `webmenu-client01`
   - Proyecto: `webmenu-client02`

2. **Configurar subdominio por proyecto:**

   - `axionsjn.webmenu.com` → Proyecto `webmenu-axionsjn`
   - `client01.webmenu.com` → Proyecto `webmenu-client01`
   - `client02.webmenu.com` → Proyecto `webmenu-client02`

3. **Variables de entorno por proyecto:**

   ```
   NEXT_PUBLIC_TENANT_ID=axionsjn (opcional, para override)
   NEXT_PUBLIC_API_BASE_URL=... (opcional, si difiere del JSON)
   NEXT_PUBLIC_COFFEE_SHOP_ID=... (opcional, override del JSON)
   ```

4. **Conectar todos los proyectos al mismo repositorio:**
   - Branch: `main` (o el branch principal)
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Opción 2: Un Solo Proyecto con Múltiples Deploys

**Ventajas:**

- ✅ Menos proyectos que gestionar
- ✅ Un solo lugar para ver todos los deploys

**Desventajas:**

- ❌ Variables de entorno compartidas (problema)
- ❌ Más difícil de aislar

**No recomendado** para multi-tenant.

---

## 📝 Variables de Entorno por Tenant

### Variables Requeridas (Opcionales - tienen defaults en JSON)

```bash
# Opcional: Override del tenant ID
NEXT_PUBLIC_TENANT_ID=axionsjn

# Opcional: Override de API URL
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

# Opcional: Override de Coffee Shop ID
NEXT_PUBLIC_COFFEE_SHOP_ID=xxx-xxx-xxx
```

**Nota:** Todas son opcionales porque los valores por defecto están en el JSON del tenant.

---

## 🔧 Cambios Necesarios en el Código

### 1. Crear `utils/tenant.ts`

- Función para detectar tenant ID
- Función para cargar configuración del tenant
- Función para aplicar overrides de variables de entorno

### 2. Actualizar `utils/fetchingApi.ts`

- Usar configuración del tenant en lugar de variables de entorno directas
- Coffee Shop ID desde tenant config (con override opcional)

### 3. Actualizar `app/layout.tsx`

- Cargar configuración del tenant
- Pasar configuración a ThemeProvider y otros componentes

### 4. Actualizar `components/ThemeProvider.tsx`

- Recibir configuración como prop en lugar de importar JSON directamente

### 5. Actualizar `components/Footer.tsx`

- Usar configuración del tenant

### 6. Actualizar `app/about/page.tsx`

- Usar configuración del tenant

### 7. Actualizar `app/page.tsx`

- Usar configuración del tenant

---

## 🧪 Desarrollo Local

### Configuración para Desarrollo

**`.env.local` (desarrollo local):**

```bash
# Especificar tenant para desarrollo local
NEXT_PUBLIC_TENANT_ID=axionsjn

# Overrides opcionales
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_COFFEE_SHOP_ID=xxx-xxx-xxx
```

**Alternativa: Modificar hosts file**

```
127.0.0.1 axionsjn.localhost
127.0.0.1 client01.localhost
```

Y acceder a `http://axionsjn.localhost:3000`

---

## 📊 Comparación de Opciones

### Determinación del Tenant

| Método                  | Pros                          | Contras           | Recomendación       |
| ----------------------- | ----------------------------- | ----------------- | ------------------- |
| **Subdominio**          | Profesional, SEO, Aislamiento | Requiere DNS      | ✅ **RECOMENDADO**  |
| **Variable de entorno** | Simple                        | Menos profesional | ⚠️ Solo para dev    |
| **Híbrido**             | Flexible                      | Más complejo      | ✅ **MEJOR OPCIÓN** |

### Coffee Shop ID

| Ubicación               | Pros                     | Contras             | Recomendación       |
| ----------------------- | ------------------------ | ------------------- | ------------------- |
| **Solo JSON**           | Centralizado, versionado | En repositorio      | ✅ **RECOMENDADO**  |
| **Solo ENV**            | No en repo               | Difícil de mantener | ❌ No recomendado   |
| **JSON + ENV override** | Flexible                 | Más complejo        | ✅ **MEJOR OPCIÓN** |

---

## ✅ Checklist de Implementación

### Fase 1: Preparación

- [ ] Crear estructura de carpetas `tenants/`
- [ ] Migrar `clientConfig.json` existente a `tenants/default.json`
- [ ] Crear `tenants/axionsjn.json` desde el ejemplo
- [ ] Actualizar `.gitignore` si es necesario

### Fase 2: Lógica de Tenant

- [ ] Crear `utils/tenant.ts` con funciones de detección
- [ ] Implementar detección por subdominio
- [ ] Implementar fallback a variable de entorno
- [ ] Implementar carga de configuración del tenant
- [ ] Implementar sistema de overrides

### Fase 3: Actualización de Componentes

- [ ] Actualizar `utils/fetchingApi.ts`
- [ ] Actualizar `app/layout.tsx`
- [ ] Actualizar `components/ThemeProvider.tsx`
- [ ] Actualizar `components/Footer.tsx`
- [ ] Actualizar `app/about/page.tsx`
- [ ] Actualizar `app/page.tsx`
- [ ] Actualizar cualquier otro componente que use `clientConfig`

### Fase 4: Testing

- [ ] Probar detección por subdominio
- [ ] Probar fallback a variable de entorno
- [ ] Probar carga de configuración
- [ ] Probar overrides de variables de entorno
- [ ] Probar con múltiples tenants

### Fase 5: Vercel

- [ ] Crear proyecto en Vercel para cada tenant
- [ ] Configurar subdominios
- [ ] Configurar variables de entorno
- [ ] Probar deploys

---

## 🎯 Recomendaciones Finales

### 1. Determinación del Tenant

**✅ Usar método híbrido:**

- **Producción:** Subdominio (ej: `axionsjn.webmenu.com`)
- **Desarrollo:** Variable de entorno `NEXT_PUBLIC_TENANT_ID`
- **Fallback:** `default`

### 2. Coffee Shop ID

**✅ Guardar en JSON + override opcional:**

- **Valor por defecto:** En `tenants/{tenantId}.json`
- **Override:** Variable `NEXT_PUBLIC_COFFEE_SHOP_ID` (opcional)

### 3. Vercel

**✅ Múltiples proyectos:**

- Un proyecto por tenant
- Cada proyecto conectado al mismo repositorio
- Subdominio único por proyecto

### 4. Estructura

**✅ Mantener todo en un solo repositorio:**

- Configuraciones en `tenants/`
- Código compartido
- Fácil de mantener y versionar

---

## 📚 Consideraciones Adicionales

### Seguridad

- Los JSONs de tenant no contienen información sensible (solo configuración)
- Coffee Shop ID no es información sensible (es un identificador público)
- Variables de entorno para información realmente sensible (si se agrega en el futuro)

### Escalabilidad

- Fácil agregar nuevos tenants: solo crear nuevo JSON
- No requiere cambios en código para nuevos tenants
- Cada tenant puede tener su propio dominio personalizado en el futuro

### Mantenimiento

- Un solo código base para todos los tenants
- Actualizaciones se aplican a todos automáticamente
- Configuración versionada en Git

---

**Última actualización:** 2024-11-27
**Versión:** 1.0
