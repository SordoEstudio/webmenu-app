'use client'

import { useParams } from 'next/navigation'
import { Badge, Box, Chip, List, Typography } from '@mui/material'
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
        {category.subtitle && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {category.subtitle}
          </Typography>
        )}
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

          </Box>
        )}
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ position:"sticky", top:70, zIndex:1000 ,backgroundColor:theme.palette.background.default,boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)', width:'100%', paddingTop:1}}>
<Typography variant="h6"  sx={{color:'grey.500',textAlign:'center'}}>
  {category.name} 
</Typography>
{category.subtitle && (
  <Typography variant="body1"  gutterBottom color="text.secondary" sx={{ textAlign:'center'}}>
    {category.subtitle}
  </Typography>
)}
      </Box>
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 0, textAlign: 'center' }}>

      <List sx={{ mt: 2, mb: 2 }}>
        {products.map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </List>
    </Box>
    </>

  )
}

