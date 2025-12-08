/**
 * Utilidades para Google Analytics 4
 * Proporciona funciones para trackear eventos personalizados
 */

// Declarar gtag en el scope global
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/**
 * Verifica si Google Analytics está disponible
 */
export const isGAEnabled = (): boolean => {
  return typeof window !== 'undefined' && !!GA_MEASUREMENT_ID && !!window.gtag
}

/**
 * Trackea un evento personalizado en Google Analytics
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (!isGAEnabled()) {
    return
  }

  try {
    window.gtag('event', eventName, {
      ...eventParams,
      // Agregar timestamp
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    // Silenciar errores de analytics en producción
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracking event:', error)
    }
  }
}

/**
 * Trackea la visualización de un producto
 */
export const trackProductView = (product: {
  id: string
  name: string
  category_id?: string
  category?: string
  price?: number
  currency?: string
  tenant?: string
}): void => {
  trackEvent('product_view', {
    product_id: product.id,
    product_name: product.name,
    product_category_id: product.category_id || product.category,
    value: product.price,
    currency: product.currency || 'USD',
    tenant: product.tenant,
  })
}

/**
 * Trackea la visualización de una categoría
 */
export const trackCategoryView = (category: {
  id: string
  name: string
  tenant?: string
}): void => {
  trackEvent('category_view', {
    category_id: category.id,
    category_name: category.name,
    tenant: category.tenant,
  })
}

/**
 * Trackea una búsqueda realizada
 */
export const trackSearch = (params: {
  search_term: string
  results_count?: number
  tenant?: string
}): void => {
  trackEvent('search_performed', {
    search_term: params.search_term,
    results_count: params.results_count,
    tenant: params.tenant,
  })
}

/**
 * Trackea un clic en WhatsApp
 */
export const trackWhatsAppClick = (params: {
  product_id?: string
  product_name?: string
  category_id?: string
  tenant?: string
}): void => {
  trackEvent('whatsapp_click', {
    product_id: params.product_id,
    product_name: params.product_name,
    category_id: params.category_id,
    tenant: params.tenant,
  })
}

/**
 * Trackea el zoom de una imagen
 */
export const trackImageZoom = (params: {
  product_id?: string
  product_name?: string
  image_url?: string
  tenant?: string
}): void => {
  trackEvent('image_zoom', {
    product_id: params.product_id,
    product_name: params.product_name,
    image_url: params.image_url,
    tenant: params.tenant,
  })
}

/**
 * Trackea un clic en About
 */
export const trackAboutClick = (params?: { tenant?: string }): void => {
  trackEvent('about_click', {
    tenant: params?.tenant,
  })
}

/**
 * Trackea un error 404
 */
export const track404 = (params: {
  path: string
  tenant?: string
}): void => {
  trackEvent('page_not_found', {
    page_path: params.path,
    tenant: params.tenant,
  })
}

