'use client'

import { useParams } from 'next/navigation'
import { Box, List, Typography } from '@mui/material'
import ProductComponent from '@/components/ProductComponent'
import { useMenu } from '@/context/MenuContext'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'

export default function CategoryProductsPage() {
  const params = useParams()
  const categoryId = params?.categoryId as string
  const theme = useTheme()
  const { getProductsByCategory, getCategoryById, loading } = useMenu()

  const category = getCategoryById(categoryId)
  const products = getProductsByCategory(categoryId)

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Box sx={{ mb: 2, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
        <List>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              sx={{
                mb: 2,
                height: 100,
                bgcolor: 'grey.200',
                borderRadius: 1,
              }}
            />
          ))}
        </List>
      </Box>
    )
  }

  if (!category) {
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
        <Typography variant="h5" gutterBottom>
          Categoría no encontrada
        </Typography>
        <Typography variant="body2" color="text.secondary">
          La categoría que buscas no existe o ha sido eliminada.
        </Typography>
      </Box>
    )
  }

  if (products.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          {category.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Esta sección estará disponible muy pronto!
        </Typography>
        {theme.extras?.logo && (
          <Box
            sx={{
              position: 'relative',
              width: '200px',
              height: '200px',
              maxWidth: '40%',
              maxHeight: '40%',
            }}
          >
            <Image
              src={theme.extras.logo}
              alt="Logo"
              fill
              sizes="(max-width: 600px) 200px, 200px"
              style={{ objectFit: 'contain' }}
            />
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {category.name}
      </Typography>
      {category.subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {category.subtitle}
        </Typography>
      )}
      <List sx={{ mt: 2, mb: 6 }}>
        {products.map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </List>
    </Box>
  )
}

