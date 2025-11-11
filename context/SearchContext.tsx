'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

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

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, isSearchActive }}>
      {children}
    </SearchContext.Provider>
  )
}

