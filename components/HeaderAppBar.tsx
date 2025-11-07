'use client'

import React from 'react'
import { Box, Toolbar, IconButton, AppBar, useTheme } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
/* import { usePlan } from '@/context/ConfigContext'
 */
interface HeaderAppBarProps {
  setOpen: (open: boolean) => void
  onBack?: () => void
}

const HeaderAppBar = ({ setOpen, onBack }: HeaderAppBarProps) => {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  // Condición para ocultar el botón
  const isHome = pathname === '/menu' || pathname === '/'
/*   const { carrito } = usePlan()
 */
  // Función para retroceder
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const logoHeader = theme.extras?.logoHeader || '/logo.png'

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          height: '64px',
          '@media (max-width: 600px)': {
            height: '75px',
          },
          '@media (min-width: 960px)': {
            height: '80px',
          },
          transition: 'height 0.3s ease',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            height: '100%',
          }}
        >
          {/* Botón para retroceder */}
          {!isHome ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleBack}
              aria-label="Volver"
              sx={{
                fontSize: '1.5rem',
                '@media (max-width: 600px)': {
                  fontSize: '2rem',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <Box sx={{ width: '24px', mx: '12px', p: '12px' }} />
          )}

          {/* Logo de la empresa */}
          <Box
            sx={{
              position: 'relative',
              height: '40px',
              width: '150px',
              maxWidth: '150px',
              '@media (max-width: 600px)': {
                height: '50px',
              },
              '@media (min-width: 960px)': {
                height: '48px',
              },
            }}
          >
            <Image
              src={logoHeader}
              alt="Logo de la empresa"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>

          {/* Botón de menú */}
{/*           {carrito ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(true)}
              sx={{
                fontSize: '1.5rem',
                '@media (max-width: 600px)': {
                  fontSize: '2rem',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ width: '24px', mx: '12px', p: '12px' }} />
          )} */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default HeaderAppBar

