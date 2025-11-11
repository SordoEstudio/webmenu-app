'use client'

import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import AboutComponent from '@/components/AboutComponent'
import aboutData from '@/data/aboutData.json'

export default function AboutPage() {
  // En el futuro, esto podría venir de una API con fallback al JSON
  const data = aboutData

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

