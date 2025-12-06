'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface SearchContextType {
  searchTerm: string
  setSearchTerm: (term: string) => void
  isSearchActive: boolean
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch debe usarse dentro de un SearchProvider')
  }
  return context
}

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const isSearchActive = searchTerm.trim().length > 0
  const pathname = usePathname()

  // Limpiar búsqueda cuando se navega fuera de la página principal de menú
  useEffect(() => {
    // Si la ruta no es exactamente '/menu', limpiar la búsqueda
    // Esto asegura que al navegar a categorías o productos, la búsqueda se limpie
    if (pathname !== '/menu') {
      setSearchTerm('')
    }
  }, [pathname])

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, isSearchActive }}>
      {children}
    </SearchContext.Provider>
  )
}

