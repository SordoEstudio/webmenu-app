'use client'

import React, { useMemo, useEffect, useRef } from 'react'
import { Box, Typography, List, Divider } from '@mui/material'
import { useSearch } from '@/context/SearchContext'
import { useMenu } from '@/context/MenuContext'
import CategoryComponent from '@/components/CategoryComponent'
import ProductComponent from '@/components/ProductComponent'
import { useTheme } from '@mui/material/styles'
import { useTenant } from '@/context/TenantContext'
import { trackSearch } from '@/utils/analytics'
const SearchResults = () => {
  const { searchTerm, isSearchActive } = useSearch()
  const { categories, products } = useMenu()
  const theme = useTheme()
  const { tenantId } = useTenant()
  const previousSearchTerm = useRef<string>('')

  // Filtrar categorías que coincidan con la búsqueda
  const filteredCategories = useMemo(() => {
    if (!isSearchActive) return []
    
    const term = searchTerm.toLowerCase().trim()
    return categories.filter(
      (category) =>
        category.visible &&
        (category.name.toLowerCase().includes(term))
    )
  }, [searchTerm, categories, isSearchActive])

  // Filtrar productos que coincidan con la búsqueda
  const filteredProducts = useMemo(() => {
    if (!isSearchActive) return []
    
    const term = searchTerm.toLowerCase().trim()
    return products.filter(
      (product) =>
        product.visible &&
        product.stock &&
        (product.name.toLowerCase().includes(term))
    )
  }, [searchTerm, products, isSearchActive])

  // Track search when results are shown
  useEffect(() => {
    if (isSearchActive && searchTerm.trim() && searchTerm !== previousSearchTerm.current) {
      const totalResults = filteredCategories.length + filteredProducts.length
      trackSearch({
        search_term: searchTerm.trim(),
        results_count: totalResults,
        tenant: tenantId,
      })
      previousSearchTerm.current = searchTerm.trim()
    }
  }, [isSearchActive, searchTerm, filteredCategories.length, filteredProducts.length, tenantId])

  if (!isSearchActive) {
    return null
  }

  const hasResults = filteredCategories.length > 0 || filteredProducts.length > 0

  if (!hasResults) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No se encontraron resultados
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Intenta con otros términos de búsqueda
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 2, marginTop:'60px'}}>
      {/* Categorías encontradas */}
      {filteredCategories.length > 0 && (
        <Box sx={{ mb: 4 }}>
{/*       <Box sx={{ position:"sticky", top:75, zIndex:1000 ,backgroundColor:theme.palette.background.default,boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)', width:'100%'}}>
<Typography variant="h6" gutterBottom sx={{color:'grey.500',textAlign:'center'}}>
  Categorías  ({filteredCategories.length})  
</Typography>
      </Box> */}
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              margin: 0,
              marginBottom: 3,
            }}
          >
            {filteredCategories.map((category) => (
              <CategoryComponent
                key={category.id}
                category={category}
                avatarView={false}
              />
            ))}
          </List>
        </Box>
      )}

      {/* Divider entre categorías y productos */}
{/*       {filteredCategories.length > 0 && filteredProducts.length > 0 && (
        <Divider sx={{ my: 3 }} />
      )} */}

      {/* Productos encontrados */}
      {filteredProducts.length > 0 && (
        <Box>
{/*           <Typography color="text.primary" variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
            Productos ({filteredProducts.length})
          </Typography> */}
          <List sx={{ mt: 2, mb: 6 }}>
            {filteredProducts.map((product) => (
              <ProductComponent key={product.id} product={product} />
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default SearchResults

