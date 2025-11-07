# 📋 Archivos Faltantes - Migración de Vite a Next.js

Este documento lista los archivos que necesitas agregar o configurar para completar la migración.

## 🖼️ Imágenes y Recursos Estáticos

### Logo del Restaurante

- **Ubicación requerida**: `/public/logo.png`
- **Descripción**: Logo principal que se muestra en la pantalla de bienvenida
- **Formato recomendado**: PNG con fondo transparente o JPG
- **Tamaño recomendado**: Mínimo 400x300px, máximo 800x600px
- **Nota**: El logo se carga desde `theme.extras.logo` en `components/ThemeProvider.tsx`

### Logo del Header

- **Ubicación requerida**: `/public/logo.png` (o un logo específico para el header)
- **Descripción**: Logo que se muestra en el HeaderAppBar
- **Formato recomendado**: PNG con fondo transparente o JPG
- **Tamaño recomendado**: Mínimo 150x40px
- **Nota**: El logo se carga desde `theme.extras.logoHeader` en `components/ThemeProvider.tsx`

### Otros recursos estáticos

Si tu proyecto original tenía otras imágenes, iconos o recursos, colócalos en la carpeta `/public/`:

- `/public/images/` - Para imágenes generales
- `/public/icons/` - Para iconos personalizados
- `/public/fonts/` - Para fuentes personalizadas (si las usas)

## 🧩 Contextos (Contexts) - **FALTANTES**

Los siguientes contextos son necesarios para que los componentes funcionen correctamente:

### 1. CartContext (`context/CartContext.tsx`)

- **Ubicación requerida**: `/context/CartContext.tsx`
- **Usado en**: `components/CartFab.tsx`
- **Hook exportado**: `useCart()`
- **Propiedades esperadas**:
  - `cart`: Array de productos en el carrito
  - Cada item del carrito debe tener al menos:
    - `count`: número (cantidad del producto)
- **Descripción**: Contexto que maneja el estado del carrito de compras
- **Adaptaciones necesarias**:
  - Convertir a TypeScript si viene de JavaScript
  - Asegurar que use `'use client'` si usa hooks de React
  - Adaptar tipos TypeScript para el carrito

### 2. ConfigContext (`context/ConfigContext.tsx`)

- **Ubicación requerida**: `/context/ConfigContext.tsx`
- **Usado en**: `components/HeaderAppBar.tsx`
- **Hook exportado**: `usePlan()`
- **Propiedades esperadas**:
  - `carrito`: boolean (indica si el carrito está habilitado/visible)
- **Descripción**: Contexto que maneja la configuración del plan/cliente
- **Adaptaciones necesarias**:
  - Convertir a TypeScript si viene de JavaScript
  - Asegurar que use `'use client'` si usa hooks de React
  - Adaptar tipos TypeScript para la configuración

### 3. ClientContext (`context/ClientContext.tsx`)

- **Ubicación requerida**: `/context/ClientContext.tsx`
- **Usado en**: `components/Footer.tsx`
- **Hook exportado**: `useClient()`
- **Propiedades esperadas**:
  - `socialLinks`: Array u objeto con enlaces a redes sociales
- **Descripción**: Contexto que maneja la información del cliente
- **Adaptaciones necesarias**:
  - Convertir a TypeScript si viene de JavaScript
  - Asegurar que use `'use client'` si usa hooks de React
  - Adaptar tipos TypeScript para los datos del cliente

## 🧩 Componentes - **FALTANTES**

### 1. Social (`components/Social.tsx`)

- **Ubicación requerida**: `/components/Social.tsx`
- **Usado en**: `components/Footer.tsx`
- **Props esperadas**:
  - `socialLinks`: Array u objeto con enlaces a redes sociales
  - `sx?`: Propiedades de estilo de Material-UI (opcional)
- **Descripción**: Componente que muestra los iconos/enlaces de redes sociales
- **Adaptaciones necesarias**:
  - Convertir a TypeScript si viene de JavaScript
  - Agregar directiva `'use client'` si usa hooks de React
  - Adaptar tipos TypeScript para las props
  - Si usa `Link` de react-router-dom, reemplazar por `Link` de `next/link` o usar `a` tags

## ⚙️ Configuración del Tema

### Personalizar el logo por cliente

Si necesitas diferentes logos según el cliente, puedes:

1. **Opción 1**: Modificar `components/ThemeProvider.tsx` para aceptar props y pasar el logo desde el layout
2. **Opción 2**: Crear un hook o contexto que determine el logo según el parámetro `cliente`
3. **Opción 3**: Colocar logos con nombres específicos: `/public/logos/[cliente]-logo.png`

### Personalizar colores del tema

Los colores del tema están definidos en `components/ThemeProvider.tsx`:

- `primary.main`: Color principal (actualmente `#1976d2`)
- `secondary.main`: Color secundario (actualmente `#dc004e`)
- `background.default`: Color de fondo (actualmente `#ffffff`)

## 📁 Estructura de Rutas

Las siguientes rutas están configuradas:

- `/` - Página de bienvenida (sin cliente específico) - **SIN layout** (HeaderAppBar, Footer, CartFab)
- `/[cliente]` - Página de bienvenida para un cliente específico - **SIN layout**
- `/[cliente]/menu` - Página del menú del cliente - **CON layout** (HeaderAppBar, Footer, CartFab)
- `/app/cart` - Página del carrito - **CON layout**
- `/app/revision` - Página de revisión - **CON layout**
- `/app/orders` - Página de órdenes - **CON layout**

## 🔧 Dependencias

Todas las dependencias necesarias están en `package.json`. No se requiere `react-router-dom` ya que Next.js tiene su propio sistema de routing.

## ✅ Checklist de Migración

- [x] Adaptar componente WelcomeScreen para Next.js
- [x] Reemplazar react-router-dom con next/navigation
- [x] Crear tipos TypeScript para el tema extendido
- [x] Configurar rutas dinámicas `[cliente]` y `[cliente]/menu`
- [x] Usar componente Image de Next.js para optimización
- [x] Adaptar CartFab a TypeScript y Next.js
- [x] Adaptar HeaderAppBar a TypeScript y Next.js
- [x] Adaptar Footer a TypeScript y Next.js
- [x] Crear layout que se aplique a todas las rutas excepto la página de bienvenida
- [ ] Crear o migrar CartContext desde proyecto original
- [ ] Crear o migrar ConfigContext desde proyecto original
- [ ] Crear o migrar ClientContext desde proyecto original
- [ ] Crear o migrar componente Social desde proyecto original
- [ ] Agregar logo en `/public/logo.png`
- [ ] Personalizar colores del tema si es necesario
- [ ] Migrar otros componentes del proyecto original
- [ ] Configurar variables de entorno si las hay
- [ ] Probar todas las rutas y funcionalidades

## 📝 Notas Adicionales

- El componente `Image` de Next.js optimiza automáticamente las imágenes
- Las rutas dinámicas usan la sintaxis `[cliente]` de Next.js App Router
- El tema de MUI está extendido con propiedades personalizadas (`extras.logo`, `extras.logoHeader` y `typographyColor`)
- Todos los componentes que usan hooks de React deben tener la directiva `'use client'`
- El Layout (HeaderAppBar, Footer, CartFab) se aplica automáticamente a todas las rutas **excepto** la página de bienvenida (`/`)
- Para agregar el Layout a otras rutas específicas, modifica `components/LayoutWrapper.tsx`

## 🔍 Archivos del Proyecto Original a Revisar

Para completar la migración, revisa estos archivos del proyecto original de Vite:

1. **CartContext original:**

   - Busca el contexto del carrito (probablemente en `src/context/CartContext.jsx` o `src/context/CartContext.tsx`)
   - Copia el archivo a `/context/CartContext.tsx`
   - Adapta a TypeScript si es necesario
   - Asegura que exporte el hook `useCart()` con la estructura `{ cart }`

2. **ConfigContext original:**

   - Busca el contexto de configuración (probablemente en `src/context/ConfigContext.jsx` o `src/context/ConfigContext.tsx`)
   - Copia el archivo a `/context/ConfigContext.tsx`
   - Adapta a TypeScript si es necesario
   - Asegura que exporte el hook `usePlan()` con la estructura `{ carrito }`

3. **ClientContext original:**

   - Busca el contexto del cliente (probablemente en `src/context/ClientContext.jsx` o `src/context/ClientContext.tsx`)
   - Copia el archivo a `/context/ClientContext.tsx`
   - Adapta a TypeScript si es necesario
   - Asegura que exporte el hook `useClient()` con la estructura `{ socialLinks }`

4. **Social component original:**
   - Busca el componente Social (probablemente en `src/components/Social.jsx` o `src/components/Social.tsx`)
   - Copia el archivo a `/components/Social.tsx`
   - Adapta a TypeScript si es necesario
   - Reemplaza `Link` de react-router-dom por `Link` de `next/link` o `a` tags si es necesario
   - Agrega `'use client'` al inicio del archivo si usa hooks

## 📦 Estructura de Carpetas Esperada

```
webmenu-app/
├── app/                    # App Router de Next.js
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de bienvenida
│   └── globals.css         # Estilos globales
├── components/              # Componentes reutilizables
│   ├── ThemeProvider.tsx   # ✅ Creado
│   ├── AppLayout.tsx       # ✅ Creado
│   ├── LayoutWrapper.tsx       # ✅ Creado
│   ├── CartFab.tsx         # ✅ Adaptado
│   ├── HeaderAppBar.tsx    # ✅ Adaptado
│   ├── Footer.tsx          # ✅ Adaptado
│   └── Social.tsx          # ❌ FALTANTE - Migrar desde proyecto original
├── context/                 # Contextos de React
│   ├── CartContext.tsx     # ❌ FALTANTE - Migrar desde proyecto original
│   ├── ConfigContext.tsx   # ❌ FALTANTE - Migrar desde proyecto original
│   └── ClientContext.tsx   # ❌ FALTANTE - Migrar desde proyecto original
├── public/                  # Archivos estáticos
│   └── logo.png            # ❌ FALTANTE - Agregar imagen
└── types/                   # Tipos TypeScript
    └── theme.d.ts          # ✅ Creado
```
