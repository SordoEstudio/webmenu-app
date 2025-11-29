'use client'

import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import AboutComponent from '@/components/AboutComponent'
import { useTenant } from '@/context/TenantContext'

export default function AboutPage() {
  const { config, loading } = useTenant()
  
  if (loading) {
    return (
      <Box sx={{ width: '100%', p: 4 }}>
        <LinearProgress />
      </Box>
    )
  }
  
  if (!config?.about) {
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
          Información no disponible
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No se pudo cargar la información sobre nosotros.
        </Typography>
      </Box>
    )
  }
  
  const data = config.about

  if (!data) {
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
          Información no disponible
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No se pudo cargar la información sobre nosotros.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 2 }}>
      <AboutComponent data={data} />
    </Box>
  )
}

