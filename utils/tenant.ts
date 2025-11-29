/**
 * Utilidades para manejo de multi-tenant
 * Detecta el tenant desde subdominio o variable de entorno
 * Carga la configuración del tenant desde tenants/{tenantId}.json
 */

export interface TenantConfig {
  tenantId: string
  api?: {
    coffeeShopId: string
  }
  metadata: {
    title: string
    description: string
    language: string
  }
  branding: {
    baseColor: string
    secondary: {
      main: string
    }
    logo?: string
    logoHeader?: string
    defaultImage?: string
    typography?: {
      fontFamily?: string
    }
  }
  about: {
    title: string
    subtitle?: string
    description?: string
    images?: Array<{
      id: string
      image: string
      alt: string
      principal?: boolean
    }>
    contact?: Array<{
      name: string
      link: string
      label: string
      social?: boolean
      media?: boolean
    }>
    location?: {
      address?: string
      city?: string
      province?: string
      postalCode?: string
      mapUrl?: string
    }
    hours?: {
      monday?: string
      tuesday?: string
      wednesday?: string
      thursday?: string
      friday?: string
      saturday?: string
      sunday?: string
    }
  }
}

/**
 * Extrae el subdominio del hostname
 * Ejemplos:
 * - "axionsjn.webmenu.com" -> "axionsjn"
 * - "axionsjn.localhost" -> "axionsjn"
 * - "localhost" -> null
 */
function extractSubdomain(hostname: string): string | null {
  const parts = hostname.split('.')
  
  // Caso especial para localhost con subdominio (ej: axionsjn.localhost)
  if (hostname.includes('localhost') && parts.length >= 2) {
    const subdomain = parts[0]
    if (subdomain && subdomain !== 'localhost') {
      return subdomain
    }
    return null
  }
  
  // Caso normal: subdomain.domain.tld (al menos 3 partes)
  if (parts.length >= 3) {
    const subdomain = parts[0]
    // Ignorar 'www'
    if (subdomain && subdomain !== 'www') {
      return subdomain
    }
  }
  
  return null
}

/**
 * Detecta el tenant ID desde:
 * 1. Subdominio (producción)
 * 2. Variable de entorno NEXT_PUBLIC_TENANT_ID (desarrollo)
 * 3. Fallback a "default"
 */
export function getTenantId(): string {
  // 1. Intentar desde subdominio (solo en cliente)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    const subdomain = extractSubdomain(hostname)
    if (subdomain) {
      return subdomain
    }
  }
  
  // 2. Intentar desde variable de entorno (desarrollo)
  const envTenant = process.env.NEXT_PUBLIC_TENANT_ID
  if (envTenant) {
    return envTenant
  }
  
  // 3. Fallback
  return 'default'
}

/**
 * Carga la configuración del tenant desde el archivo JSON
 */
export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
  try {
    // Intentar cargar el tenant específico
    const config = await import(`@/tenants/${tenantId}.json`)
    
    // Aplicar overrides de variables de entorno si existen
    const tenantConfig: TenantConfig = {
      ...config.default,
      tenantId,
    }
    
    // Override de Coffee Shop ID desde variable de entorno (solo desarrollo)
    if (process.env.NEXT_PUBLIC_COFFEE_SHOP_ID) {
      tenantConfig.api = {
        ...tenantConfig.api,
        coffeeShopId: process.env.NEXT_PUBLIC_COFFEE_SHOP_ID,
      }
    }
    
    return tenantConfig
  } catch (error) {
    console.error(`Error cargando configuración del tenant ${tenantId}:`, error)
    
    // Si falla, intentar cargar default
    if (tenantId !== 'default') {
      try {
        const defaultConfig = await import('@/tenants/default.json')
        return {
          ...defaultConfig.default,
          tenantId: 'default',
        }
      } catch (defaultError) {
        console.error('Error cargando configuración default:', defaultError)
        throw new Error(`No se pudo cargar la configuración del tenant ${tenantId}`)
      }
    }
    
    throw error
  }
}

/**
 * Obtiene la configuración del tenant de forma síncrona (para uso en server components)
 * Nota: Requiere que el tenant ya esté determinado
 */
export function getTenantConfigSync(tenantId: string): TenantConfig {
  // En Next.js, los imports dinámicos de JSON son síncronos en build time
  // pero necesitamos manejar esto de forma diferente
  // Por ahora, retornamos una función que se puede usar en runtime
  throw new Error('Use loadTenantConfig() para cargar la configuración de forma asíncrona')
}

/**
 * Obtiene la URL base de la API
 * Prioridad:
 * 1. Variable de entorno NEXT_PUBLIC_API_BASE_URL
 * 2. Fallback a valor por defecto
 */
export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://coffeemanagement-api-b6bgerb6a5fxh0hx.brazilsouth-01.azurewebsites.net'
  )
}

/**
 * Obtiene el Coffee Shop ID del tenant
 * Prioridad:
 * 1. Variable de entorno NEXT_PUBLIC_COFFEE_SHOP_ID (desarrollo - override)
 * 2. Configuración del tenant (producción)
 */
export function getCoffeeShopId(tenantConfig: TenantConfig): string {
  // Override desde variable de entorno (desarrollo)
  // process.env.NEXT_PUBLIC_* está disponible tanto en servidor como cliente
  if (process.env.NEXT_PUBLIC_COFFEE_SHOP_ID) {
    return process.env.NEXT_PUBLIC_COFFEE_SHOP_ID
  }
  
  // Desde configuración del tenant
  if (tenantConfig.api?.coffeeShopId) {
    return tenantConfig.api.coffeeShopId
  }
  
  throw new Error(`Coffee Shop ID no configurado para el tenant ${tenantConfig.tenantId}`)
}

