'use client'

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { fetchAllData} from '@/utils/fetchingApi'
import { useTenant } from '@/context/TenantContext'
import { LinearProgress, Box, Typography } from '@mui/material'
import { logger } from '@/utils/logger'


interface Category {
  id: string
  name: string
  subtitle?: string
  description?: string
  image?: string | null
  thumbnail?: string | null
  visible: boolean
  featured: boolean
  displayOrder?: number
}

interface Product {
  id: string
  name: string
  subtitle?: string
  details?: string
  productCategoryId: string
  category: string
  image?: string
  price: number
  currency?: string
  visible: boolean
  stock: boolean
  featured: boolean
  displayOrder?: number
}

interface MenuContextType {
  categories: Category[]
  products: Product[]
  getProductsByCategory: (categoryId: string) => Product[]
  getCategoryById: (categoryId: string) => Category | undefined
  getProductById: (productId: string) => Product | undefined
  loading: boolean
  error: string | null
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu debe usarse dentro de un MenuProvider')
  }
  return context
}

interface MenuProviderProps {
  children: React.ReactNode
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const { coffeeShopId, apiBaseUrl, loading: tenantLoading } = useTenant()
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      // Esperar a que el tenant esté cargado
      if (tenantLoading || !coffeeShopId) {
        return
      }

      try {
        setLoading(true)
        setError(null)

        // Obtener datos desde la API usando configuración del tenant
        const {categories, products} = await fetchAllData(coffeeShopId, apiBaseUrl)
        
        // Ordenar categorías: primero destacadas, luego no destacadas, ambas por displayOrder
        const sortedCategories = (categories?.items || []).sort((a: Category, b: Category) => {
          // Primero ordenar por featured (destacadas primero: true antes que false)
          if (a.featured !== b.featured) {
            return a.featured ? -1 : 1
          }
          
          // Si ambas tienen el mismo estado de featured, ordenar por displayOrder
          const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER
          const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER
          return orderA - orderB
        })
        
        // Ordenar productos: primero destacados, luego no destacados, ambos por displayOrder
        const sortedProducts = (products?.items || []).sort((a: Product, b: Product) => {
          // Primero ordenar por featured (destacados primero: true antes que false)
          if (a.featured !== b.featured) {
            return a.featured ? -1 : 1
          }
          
          // Si ambos tienen el mismo estado de featured, ordenar por displayOrder
          const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER
          const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER
          return orderA - orderB
        })
        
        setCategories(sortedCategories)
        setProducts(sortedProducts)
      } catch (err) {
        logger.error('Error loading menu data:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [coffeeShopId, apiBaseUrl, tenantLoading])

  // Función para obtener productos por categoría (ya ordenados por displayOrder)
  const getProductsByCategory = useMemo(
    () => (categoryId: string) => {
      return products.filter(
        (product) =>
          product.productCategoryId === categoryId &&
          product.visible
      )
      // Los productos ya vienen ordenados por displayOrder desde el estado
    },
    [products]
  )

  // Función para obtener categoría por ID
  const getCategoryById = useMemo(
    () => (categoryId: string) => {
      return categories.find((cat) => cat.id === categoryId)
    },
    [categories]
  )

  // Función para obtener producto por ID
  const getProductById = useMemo(
    () => (productId: string) => {
      return products.find((product) => product.id === productId)
    },
    [products]
  )

  const value: MenuContextType = {
    categories,
    products,
    getProductsByCategory,
    getCategoryById,
    getProductById,
    loading,
    error,
  }

  if (loading) {
    return (
      <Box sx={{ width: '100%'}}>
        <LinearProgress color="primary" />
      </Box>
    )
  }

  if (error && categories.length === 0 && products.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          p: 4,
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          Error al cargar los datos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error}
        </Typography>
      </Box>
    )
  }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

