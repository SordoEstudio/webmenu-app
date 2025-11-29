# 📋 Guía de Configuración para Nuevo Cliente

Este documento detalla todos los archivos y configuraciones que deben modificarse al configurar la aplicación para un nuevo cliente.

**⚠️ IMPORTANTE:** Toda la configuración del cliente está centralizada en:

- **Variables de entorno** (`.env.local`) - Para API y Coffee Shop ID
- **Archivo JSON centralizado** (`data/clientConfig.json`) - Para toda la información del cliente

---

## 🔑 1. Configuración de API y Backend (Variables de Entorno)

### 1.1. Crear archivo de variables de entorno

**Archivo:** `.env.local` (crear desde `env.example`)

**Pasos:**

1. Copiar el archivo `env.example` como `.env.local` en la raíz del proyecto
2. Completar con los valores del nuevo cliente:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://nueva-api-cliente.brazilsouth-01.azurewebsites.net
NEXT_PUBLIC_COFFEE_SHOP_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**⚠️ Importante:**

- El archivo `.env.local` está en `.gitignore` y no se sube al repositorio
- El `COFFEE_SHOP_ID` debe coincidir con el `coffeeShopId` registrado en la base de datos de la API
- Las variables deben tener el prefijo `NEXT_PUBLIC_` para estar disponibles en el cliente
- Reiniciar el servidor de desarrollo después de crear/modificar `.env.local`

---

## 🎨 2. Configuración Centralizada del Cliente

### 2.1. Archivo de Configuración Centralizado

**Archivo:** `data/clientConfig.json`

**Este archivo contiene TODA la configuración del cliente en un solo lugar:**

- Metadatos (título, descripción, idioma)
- Branding (colores, logos, tipografía)
- Información "Sobre Nosotros"
- Redes sociales
- Contacto y ubicación
- Horarios

### 2.2. Estructura completa del archivo

```json
{
  "metadata": {
    "title": "WebMenu Digital",
    "description": "Aplicación web para gestión de menús digitales",
    "language": "es"
  },
  "branding": {
    "baseColor": "#D40F7D",
    "secondary": {
      "main": "#981d97"
    },
    "logo": "/logo-spot.png",
    "logoHeader": "/logo-spot.png",
    "defaultImage": "/logo-spot.webp",
    "typography": {
      "fontFamily": "Roboto, Arial, sans-serif"
    }
  },
  "about": {
    "title": "Sobre Nosotros",
    "subtitle": "Conoce más sobre nuestro negocio",
    "description": "Somos un negocio dedicado a ofrecer productos de calidad...",
    "images": [
      {
        "id": "1",
        "image": "/images/MaMaLogo.webp",
        "alt": "Imagen del local",
        "principal": true
      }
    ],
    "contact": [
      {
        "icon": "FaPhone",
        "link": "tel:+541112345678",
        "label": "3492 646 589"
      },
      {
        "icon": "FaEnvelope",
        "link": "mailto:contacto@ejemplo.com",
        "label": "contacto@ejemplo.com"
      },
      {
        "icon": "FaWhatsapp",
        "link": "https://wa.me/541112345678",
        "label": "+54 11 1234-5678"
      },
      {
        "icon": "FaInstagram",
        "link": "https://www.instagram.com/usuario",
        "label": "/usuario"
      },
      {
        "icon": "FaFacebook",
        "link": "https://www.facebook.com/usuario",
        "label": "/usuario"
      }
    ],
    "location": {
      "address": "Av. Principal 1234",
      "city": "San Vicente",
      "province": "Santa Fe",
      "postalCode": "C1234ABC",
      "mapUrl": "https://maps.google.com/?q=Av+Principal+1234"
    },
    "hours": {
      "monday": "09:00 - 20:00",
      "tuesday": "09:00 - 20:00",
      "wednesday": "09:00 - 20:00",
      "thursday": "09:00 - 20:00",
      "friday": "09:00 - 20:00",
      "saturday": "10:00 - 18:00",
      "sunday": "Cerrado"
    }
  },
  "socialMedia": [
    {
      "name": "Instagram",
      "url": "https://www.instagram.com/usuario",
      "icon": "FaInstagram",
      "title": "/usuario"
    },
    {
      "name": "Facebook",
      "url": "https://www.facebook.com/usuario",
      "icon": "FaFacebook",
      "title": "/usuario"
    }
  ]
}
```

---

## 📝 3. Secciones Detalladas a Configurar

### 3.1. Metadatos (`metadata`)

- **title**: Título que aparece en la pestaña del navegador y SEO
- **description**: Descripción para SEO y redes sociales
- **language**: Código de idioma (es, en, pt, etc.)

### 3.2. Branding (`branding`)

#### ✅ Configuración Mínima Requerida:

- **baseColor**: Color principal de la marca (hex) - **REQUERIDO**
- **secondary.main**: Color secundario (hex) - **REQUERIDO**

#### ✅ Colores Generados Automáticamente:

A partir de `baseColor`, se generan automáticamente:

- **primary.main** = `baseColor`
- **primary.light** = Variante clara (generada automáticamente con `lighten(baseColor, 0.2)`)
- **primary.ultraLight** = Variante ultra clara (generada automáticamente con `lighten(baseColor, 0.3)`)
- **primary.dark** = Variante oscura (generada automáticamente con `darken(baseColor, 0.2)`)
- **primary.contrastText** = Calculado automáticamente según luminosidad
  - Si el color es claro (luminosidad > 0.5) → texto negro (#1a1a1a)
  - Si el color es oscuro (luminosidad ≤ 0.5) → texto blanco (#ffffff)

#### ⚠️ Valores por Defecto (no requieren configuración):

- **background.default**: `#f5f5f5` (gris claro)
- **background.dark**: `#121212` (gris oscuro)
- **socialMedia.main**: `#ffffff` (blanco)
- **typographyColor.white**: `#fafafa` (blanco suave)
- **typographyColor.black**: `#1a1a1a` (negro suave)
- **typography.fontFamily**: `"Roboto, Arial, sans-serif"`

#### 📝 Configuraciones Opcionales:

- **logo**: Ruta del logo principal (en carpeta `public/`)
- **logoHeader**: Ruta del logo en el header
- **defaultImage**: Imagen por defecto
- **typography.fontFamily**: Fuente personalizada (opcional)

**Nota:** Si necesitas ajustar los factores de variación de color (`light`, `ultraLight`, `dark`), puedes agregarlos opcionalmente en `primary`, pero tienen valores por defecto que funcionan bien en la mayoría de casos.

### 3.3. Información "Sobre Nosotros" (`about`)

- **title**, **subtitle**, **description**: Textos informativos
- **images**: Array de imágenes del local/negocio
- **contact**: Array de métodos de contacto
  - Iconos disponibles: `FaPhone`, `FaEnvelope`, `FaWhatsapp`, `FaInstagram`, `FaFacebook`, etc.
- **location**: Dirección y ubicación
- **hours**: Horarios de atención por día

### 3.4. Redes Sociales (`socialMedia`)

- Array con las redes sociales del cliente
- Cada red debe tener: `name`, `url`, `icon`, `title`

---

## 🖼️ 4. Archivos de Imágenes

### 4.1. Logos e Imágenes

**Directorio:** `public/`

**Archivos a colocar:**

- Logo principal (ej: `logo-cliente.png`)
- Logo para header (puede ser el mismo)
- Imagen por defecto (ej: `logo-cliente.webp`)
- Imágenes del local (en `public/images/`)

**Acción:**

1. Colocar las imágenes en la carpeta `public/`
2. Actualizar las rutas en `clientConfig.json` para que coincidan con los nombres de los archivos

**Ejemplo:**

```json
"logo": "/logo-cliente.png",
"logoHeader": "/logo-cliente.png",
"defaultImage": "/logo-cliente.webp"
```

---

## ✅ 5. Checklist de Configuración

### Variables de Entorno

- [ ] Archivo `.env.local` creado desde `env.example`
- [ ] `NEXT_PUBLIC_API_BASE_URL` configurado
- [ ] `NEXT_PUBLIC_COFFEE_SHOP_ID` configurado
- [ ] Verificar que el ID coincida con el registrado en la base de datos

### Archivo Centralizado

- [ ] `data/clientConfig.json` actualizado con toda la información
- [ ] Metadatos (título, descripción, idioma) configurados
- [ ] **`baseColor` configurado** (color principal - REQUERIDO)
- [ ] **`secondary.main` configurado** (color secundario - REQUERIDO)
- [ ] Logos e imágenes configurados
- [ ] Información de contacto actualizada
- [ ] Redes sociales configuradas
- [ ] Ubicación y horarios actualizados

### Imágenes

- [ ] Logos colocados en `public/`
- [ ] Imágenes del local colocadas en `public/images/`
- [ ] Rutas en `clientConfig.json` coinciden con los archivos

### Verificación Final

- [ ] Servidor reiniciado después de crear `.env.local`
- [ ] Probar que la API responde correctamente
- [ ] Verificar que los logos se muestran correctamente
- [ ] Comprobar que los colores se aplican bien
- [ ] Revisar que los enlaces de redes sociales funcionan
- [ ] Validar que la información de contacto es correcta
- [ ] Probar en diferentes dispositivos (responsive)

---

## 🔍 6. Verificación Post-Configuración

### 6.1. Pruebas de API

1. Abrir la consola del navegador (F12)
2. Verificar que las llamadas a la API se realizan correctamente
3. Comprobar que el header `coffeeShopId` se envía correctamente
4. Validar que las respuestas de la API contienen datos

### 6.2. Pruebas Visuales

1. Verificar que los colores se aplican correctamente
2. Comprobar que los logos se muestran en todas las ubicaciones
3. Validar que las fuentes se cargan correctamente
4. Revisar el diseño responsive en móvil y desktop

### 6.3. Pruebas Funcionales

1. Navegar por las categorías
2. Ver productos
3. Probar la búsqueda
4. Verificar enlaces de redes sociales
5. Comprobar información de contacto
6. Revisar página "Sobre Nosotros"

---

## 📚 7. Estructura de Archivos

```
webmenu-app/
├── .env.local                    ⚠️ CREAR (variables de entorno)
├── env.example                   ✅ Plantilla de variables
├── data/
│   └── clientConfig.json         ⚠️ MODIFICAR (toda la info del cliente)
└── public/
    ├── logo-*.png                ⚠️ REEMPLAZAR (imágenes)
    ├── logo-*.webp               ⚠️ REEMPLAZAR (imágenes)
    └── images/                    ⚠️ REEMPLAZAR (imágenes del local)
```

**Archivos que NO requieren modificación:**

- `utils/fetchingApi.ts` - Lee variables de entorno automáticamente
- `components/ThemeProvider.tsx` - Lee de `clientConfig.json`
- `components/Footer.tsx` - Lee de `clientConfig.json`
- `app/layout.tsx` - Lee de `clientConfig.json`
- `app/about/page.tsx` - Lee de `clientConfig.json`

---

## 🚫 8. Archivos Obsoletos (Ya no se usan)

Los siguientes archivos ya no son necesarios y pueden eliminarse:

- `data/brandConfig.json` - Reemplazado por `clientConfig.json`
- `data/aboutData.json` - Reemplazado por `clientConfig.json`
- `data/social.json` - Reemplazado por `clientConfig.json`
- `data/categoriesData.json` - Fallback eliminado
- `data/productData.json` - Fallback eliminado
- `data/demoData.json` - Fallback eliminado

**Nota:** La aplicación ahora obtiene categorías y productos únicamente desde la API, sin fallbacks.

---

## 📝 9. Notas Adicionales

### 9.1. Variables de Entorno en Producción

Para producción, configurar las variables de entorno en la plataforma de despliegue:

- **Vercel**: Settings → Environment Variables
- **Netlify**: Site settings → Environment variables
- **Azure**: Configuration → Application settings

### 9.2. Iconos Disponibles

Los iconos disponibles para contacto y redes sociales son de `react-icons`:

- `FaPhone`, `FaEnvelope`, `FaWhatsapp`
- `FaInstagram`, `FaFacebook`, `FaTwitter`
- `FaLinkedin`, `FaYoutube`, etc.

### 9.3. Soporte

Si encuentras problemas durante la configuración:

1. Verificar la consola del navegador para errores
2. Revisar los logs de la API
3. Validar que el archivo JSON tiene sintaxis correcta
4. Comprobar que las rutas de imágenes son correctas
5. Asegurarse de que las variables de entorno tienen el prefijo `NEXT_PUBLIC_`

---

**Última actualización:** 2024-11-27
**Versión:** 2.0 (Configuración Centralizada)
