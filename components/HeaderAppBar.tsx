'use client'

import React, { memo, useCallback } from 'react'
import { Box, Toolbar, IconButton, AppBar, useTheme } from '@mui/material'
import { useRouter, usePathname, useParams } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
/* import { usePlan } from '@/context/ConfigContext'
 */
interface HeaderAppBarProps {
  setOpen: (open: boolean) => void
  onBack?: () => void
}

const HeaderAppBar = memo(({ setOpen, onBack }: HeaderAppBarProps) => {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  // Determinar si estamos en la página principal del menú
  // Rutas principales: /, /menu
  const isHome = pathname === '/' || pathname === '/menu'

/*   const { carrito } = usePlan()
 */
  // Función para retroceder - memoizada para evitar recreaciones
  const handleBack = useCallback(() => {
    if (onBack) {
      // Si hay un callback personalizado, usarlo
      onBack()
      return
    }

    // Lógica de navegación basada en la ruta actual
    if (!pathname) {
      // Si no hay pathname, ir a la página de bienvenida
      router.push('/')
      return
    }

    // Si estamos en una subpágina del menú (ej: /menu/categoryId), volver al menú principal
    if (pathname.startsWith('/menu/') && pathname !== '/menu') {
      router.push('/menu')
      return
    }

    // Si estamos en /menu, ir a la página de bienvenida
    if (pathname === '/menu') {
      router.push('/')
      return
    }

    // Para cualquier otra ruta, intentar usar router.back()
    // Si no hay historial, ir a la página de bienvenida como fallback
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }, [onBack, router, pathname])

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
            position: 'relative',
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
                zIndex: 1,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <Box sx={{ width: '24px', mx: '12px', p: '12px' }} />
          )}

          {/* Logo de la empresa - Centrado de forma absoluta */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              height: '40px',
              width: '150px',
              maxWidth: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '@media (max-width: 600px)': {
                height: '50px',
              },
              '@media (min-width: 960px)': {
                height: '48px',
              },
              zIndex: 0,
            }}
          >
            <Image
              src={logoHeader}
              alt="Logo de la empresa"
              fill
              sizes="150px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>

          {/* Botón de menú - Espaciador para mantener el balance */}
          <Box sx={{ width: '24px', mx: '12px', p: '12px' }} />
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
                zIndex: 1,
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
})

HeaderAppBar.displayName = 'HeaderAppBar'

export default HeaderAppBar

