# 📊 Guía de Configuración de Google Analytics 4

## ✅ Implementación Completada

La integración de Google Analytics 4 ha sido implementada en la aplicación. Los siguientes eventos están configurados para trackearse automáticamente:

- ✅ `page_view` - Visualización de páginas (automático)
- ✅ `product_view` - Visualización de productos
- ✅ `category_view` - Visualización de categorías
- ✅ `search_performed` - Búsquedas realizadas
- ✅ `whatsapp_click` - Clics en WhatsApp
- ✅ `image_zoom` - Zoom en imágenes de productos
- ✅ `about_click` - Clics en "Acerca de"

## 🚀 Pasos para Configurar GA4

### Paso 1: Crear una Propiedad de Google Analytics 4

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Si no tienes una cuenta, crea una nueva cuenta
4. Crea una nueva **Propiedad** de tipo **GA4** (Google Analytics 4)
5. Completa la información:
   - **Nombre de la propiedad**: Ej: "WebMenu App"
   - **Zona horaria**: Selecciona tu zona horaria
   - **Moneda**: Selecciona tu moneda

### Paso 2: Configurar un Flujo de Datos Web

1. En la propiedad recién creada, ve a **Administración** (⚙️)
2. En la columna **Propiedad**, haz clic en **Flujos de datos**
3. Haz clic en **Agregar flujo** → **Web**
4. Completa la información:
   - **URL del sitio web**: Ej: `https://tudominio.com`
   - **Nombre del flujo**: Ej: "WebMenu Web Stream"
5. Haz clic en **Crear flujo**

### Paso 3: Obtener el Measurement ID

1. Después de crear el flujo, verás la página de configuración
2. Copia el **ID de medición** (formato: `G-XXXXXXXXXX`)
3. Este ID es el que necesitarás para la aplicación

### Paso 4: Configurar la Variable de Entorno

1. En la raíz del proyecto, crea o edita el archivo `.env.local`
2. Agrega la siguiente variable:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Reemplaza `G-XXXXXXXXXX` con tu Measurement ID real.**

3. Si ya tienes un archivo `.env.local`, simplemente agrega esta línea al final

### Paso 5: Reiniciar el Servidor de Desarrollo

Si tienes el servidor corriendo, deténlo y reinícialo:

```bash
# Detener el servidor (Ctrl+C)
# Luego reiniciar
pnpm dev
# o
npm run dev
```

### Paso 6: Verificar la Implementación

#### 6.1. Verificar en el Código

1. Abre la aplicación en el navegador
2. Abre las **Herramientas de Desarrollador** (F12)
3. Ve a la pestaña **Console**
4. No deberías ver errores relacionados con Google Analytics

#### 6.2. Verificar en Google Analytics

1. Ve a tu propiedad de GA4 en [Google Analytics](https://analytics.google.com/)
2. En el menú lateral, ve a **Informes** → **Tiempo real**
3. Realiza algunas acciones en la aplicación:
   - Navega a diferentes páginas
   - Ve a una categoría
   - Ve a un producto
   - Realiza una búsqueda
   - Haz clic en WhatsApp
   - Haz clic en "Acerca de"
4. Deberías ver eventos apareciendo en tiempo real en GA4

#### 6.3. Verificar Eventos Personalizados

1. En GA4, ve a **Configurar** → **Eventos**
2. Deberías ver los eventos personalizados que hemos configurado:
   - `product_view`
   - `category_view`
   - `search_performed`
   - `whatsapp_click`
   - `image_zoom`
   - `about_click`

## 🧪 Pruebas Recomendadas

### Prueba 1: Visualización de Producto
1. Navega a `/menu/[categoryId]/[productId]`
2. Verifica en GA4 que se disparó el evento `product_view` con:
   - `product_id`
   - `product_name`
   - `product_category_id`
   - `value` (precio)
   - `currency`
   - `tenant`

### Prueba 2: Visualización de Categoría
1. Navega a `/menu/[categoryId]`
2. Verifica en GA4 que se disparó el evento `category_view` con:
   - `category_id`
   - `category_name`
   - `tenant`

### Prueba 3: Búsqueda
1. Abre la búsqueda y escribe un término
2. Verifica en GA4 que se disparó el evento `search_performed` con:
   - `search_term`
   - `results_count`
   - `tenant`

### Prueba 4: WhatsApp
1. Haz clic en el botón de WhatsApp
2. Verifica en GA4 que se disparó el evento `whatsapp_click` con:
   - `tenant`

### Prueba 5: Zoom de Imagen
1. Ve a un producto y haz clic en la imagen
2. Verifica en GA4 que se disparó el evento `image_zoom` con:
   - `product_id`
   - `product_name`
   - `tenant`

### Prueba 6: About
1. Haz clic en el botón "Acerca de"
2. Verifica en GA4 que se disparó el evento `about_click` con:
   - `tenant`

## 📝 Configuración de Eventos como Conversiones (Opcional)

Si quieres marcar ciertos eventos como conversiones importantes:

1. En GA4, ve a **Configurar** → **Eventos**
2. Busca el evento que quieres marcar (ej: `whatsapp_click`)
3. Activa el toggle **Marcar como conversión**

Los eventos recomendados para marcar como conversiones:
- ✅ `whatsapp_click` - Conversión principal (contacto con el cliente)
- ✅ `product_view` - Interés en productos

## 🔍 Verificación de Datos Multi-Tenant

Como la aplicación es multi-tenant, cada evento incluye el parámetro `tenant` que identifica el cliente. Esto te permitirá:

1. Filtrar datos por tenant en GA4
2. Comparar métricas entre diferentes clientes
3. Crear reportes personalizados por tenant

### Cómo filtrar por tenant en GA4:

1. Ve a **Explorar** → **Análisis libre**
2. Agrega una dimensión: `tenant`
3. Agrega métricas: eventos, usuarios, sesiones
4. Filtra por el tenant que quieras analizar

## 🐛 Solución de Problemas

### Problema: No veo eventos en GA4

**Solución:**
1. Verifica que `NEXT_PUBLIC_GA_MEASUREMENT_ID` esté configurado correctamente
2. Verifica que el servidor se haya reiniciado después de agregar la variable
3. Verifica en la consola del navegador que no haya errores
4. Espera unos minutos (puede haber un delay en GA4)

### Problema: Veo errores en la consola

**Solución:**
1. Verifica que el Measurement ID tenga el formato correcto: `G-XXXXXXXXXX`
2. Verifica que no haya espacios extra en el archivo `.env.local`
3. Asegúrate de que el archivo se llame `.env.local` (no `.env`)

### Problema: Los eventos no tienen el parámetro `tenant`

**Solución:**
1. Verifica que el `TenantContext` esté funcionando correctamente
2. Verifica que el tenant se esté detectando desde el subdominio o variable de entorno

## 📊 Próximos Pasos

Una vez que GA4 esté funcionando correctamente, puedes:

1. **Configurar Reportes Personalizados**: Crea reportes específicos para tus métricas clave
2. **Configurar Alertas**: Recibe notificaciones cuando ocurran eventos importantes
3. **Exportar Datos**: Exporta datos para análisis más profundos
4. **Integrar con otras herramientas**: Conecta GA4 con otras herramientas de analytics

## 📚 Recursos Adicionales

- [Documentación oficial de GA4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Guía de eventos de GA4](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Vista de depuración de GA4](https://support.google.com/analytics/answer/7201382)

## ✅ Checklist de Configuración

- [ ] Propiedad de GA4 creada
- [ ] Flujo de datos web configurado
- [ ] Measurement ID obtenido
- [ ] Variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` configurada en `.env.local`
- [ ] Servidor reiniciado
- [ ] Eventos apareciendo en GA4 Tiempo real
- [ ] Eventos personalizados visibles en GA4
- [ ] Parámetro `tenant` presente en los eventos
- [ ] Eventos marcados como conversiones (opcional)

---

**Nota**: Los datos pueden tardar entre 24-48 horas en aparecer completamente en los reportes estándar de GA4. La vista de "Tiempo real" muestra datos inmediatamente.

