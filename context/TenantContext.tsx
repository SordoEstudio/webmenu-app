'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getTenantId, loadTenantConfig, getApiBaseUrl, getCoffeeShopId, type TenantConfig } from '@/utils/tenant'
import { logger } from '@/utils/logger'

interface TenantContextType {
  tenantId: string
  config: TenantConfig | null
  apiBaseUrl: string
  coffeeShopId: string | null
  loading: boolean
  error: string | null
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export const useTenant = () => {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenant debe usarse dentro de un TenantProvider')
  }
  return context
}

interface TenantProviderProps {
  children: React.ReactNode
}

export const TenantProvider = ({ children }: TenantProviderProps) => {
  const [tenantId, setTenantId] = useState<string>('default')
  const [config, setConfig] = useState<TenantConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTenant = async () => {
      try {
        setLoading(true)
        setError(null)

        // Detectar tenant ID
        const detectedTenantId = getTenantId()
        setTenantId(detectedTenantId)

        // Cargar configuración del tenant
        const tenantConfig = await loadTenantConfig(detectedTenantId)
        setConfig(tenantConfig)
      } catch (err) {
        logger.error('Error cargando configuración del tenant:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    loadTenant()
  }, [])

  const apiBaseUrl = getApiBaseUrl()
  const coffeeShopId = config ? getCoffeeShopId(config) : null

  const value: TenantContextType = {
    tenantId,
    config,
    apiBaseUrl,
    coffeeShopId,
    loading,
    error,
  }

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}

