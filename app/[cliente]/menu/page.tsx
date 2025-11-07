'use client'

import { useParams } from 'next/navigation'
import { Box, Typography } from '@mui/material'

export default function MenuPage() {
  const params = useParams()
  const cliente = params?.cliente as string

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 4,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Menú de {cliente}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Esta es la página del menú. Aquí irá el contenido del menú.
      </Typography>
    </Box>
  )
}

