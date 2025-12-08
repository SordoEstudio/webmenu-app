'use client'

import React, { useEffect } from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import ProductDetailComponent from '@/components/ProductDetailComponent'
import { useParams } from 'next/navigation'
import { useMenu } from '@/context/MenuContext'
import { useRouter } from 'next/navigation'
import { useTenant } from '@/context/TenantContext'
import { trackProductView } from '@/utils/analytics'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params?.productId as string
  const categoryId = params?.categoryId as string
  const router = useRouter()
  const { getProductById, loading } = useMenu()
  const { tenantId } = useTenant()

  const product = getProductById(productId)

  // Track product view
  useEffect(() => {
    if (product && !loading) {
      trackProductView({
        id: product.id,
        name: product.name,
        category_id: product.productCategoryId || categoryId,
        category: product.category,
        price: product.price,
        currency: product.currency,
        tenant: tenantId,
      })
    }
  }, [product, loading, categoryId, tenantId])

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    )
  }

  if (!product) {
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
          Producto no encontrado
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          El producto que buscas no existe o ha sido eliminado.
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => router.push(categoryId ? `/menu/${categoryId}` : '/menu')}
        >
          Volver a la categoría
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 2 }}>
      <ProductDetailComponent product={product} />
    </Box>
  )
}
