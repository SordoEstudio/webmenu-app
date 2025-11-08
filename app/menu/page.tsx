'use client'

import React, { useState } from 'react'
import { Box, List } from '@mui/material'
import CategoryComponent from '@/components/CategoryComponent'
import CategoriesGrid from '@/components/CategoriesGrid'
import ViewToggleFab from '@/components/ViewToggleFab'
import { useMenu } from '@/context/MenuContext'

export default function MenuPage() {
  const [cardView, setCardView] = useState(true)
  const avatarView = false
  const { categories, loading } = useMenu()

  const handleView = () => {
    setCardView(!cardView)
  }

  // Filtrar solo categorías visibles
  const visibleCategories = categories.filter((cat) => cat.visible)

  if (loading) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: { xs: 'calc(50% - 8px)', sm: 'calc(33.333% - 16px)', md: 'calc(25% - 18px)' },
                height: 200,
                bgcolor: 'grey.200',
                borderRadius: 2,
              }}
            />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 2 }}>
      {/* FAB para cambiar vista */}
      <ViewToggleFab isGridView={cardView} onToggle={handleView} />

      {/* Contenido: Lista o Grid */}
      {!cardView ? (
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            margin: 0,
            marginBottom: 3,
          }}
        >
          {visibleCategories.map((category) => (
            <CategoryComponent
              key={category.id}
              category={category}
              avatarView={avatarView}
            />
          ))}
        </List>
      ) : (
        <CategoriesGrid categories={visibleCategories} avatarView={avatarView} />
      )}
    </Box>
  )
}

