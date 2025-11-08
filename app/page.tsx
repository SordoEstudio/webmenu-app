'use client'

import React from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { lighten, darken } from '@mui/system'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'

const WelcomeScreen = () => {
  const router = useRouter()
  const params = useParams()
  const cliente = params?.cliente as string | undefined
  
  const theme = useTheme()
  const baseColor = theme.palette.primary.main

  // Generar colores para el gradiente
  const lightColor = lighten(baseColor, 0.2)
  const darkColor = darken(baseColor, 0.2)

  const handleEnter = () => {
    router.push('/menu')
  }

  const logoPath = theme.extras?.logo 

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        background: `linear-gradient(to bottom, ${darkColor}, ${lightColor})`,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          position: 'relative',
          width: '80%',
          maxWidth: '400px',
          height: '40%',
          maxHeight: '300px',
          mb: 4,
        }}
      >
        <Image
          src={logoPath}
          alt="Logo del restaurante"
          fill
          sizes="(max-width: 600px) 300px, 400px"
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>

      {/* Mensaje de bienvenida */}
      <Typography
        variant="body1"
        component="p"
        sx={{
          color: theme.palette.primary.contrastText,
          fontWeight: 'normal',
          mb: 4,
        }}
      >
        ¡Te damos la bienvenida a nuestro menú!
      </Typography>

      {/* Botón de ingresar */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleEnter}
        sx={{
          backgroundColor: theme.palette.background.default,
          color: `${darkColor}`,
          fontWeight: 'bold',
          px: 4,
          py: 1,
          borderRadius: '20px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            backgroundColor: `${darkColor}`,
            color: theme.palette.typographyColor?.white || '#ffffff',
          },
        }}
      >
        INGRESAR
      </Button>
    </Box>
  )
}

export default WelcomeScreen
