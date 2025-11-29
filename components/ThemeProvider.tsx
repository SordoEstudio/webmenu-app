'use client'

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode } from 'react'
import { createAppTheme } from '@/utils/theme'
import { useTenant } from '@/context/TenantContext'

interface ThemeProviderProps {
  children: ReactNode
  themeConfig?: Parameters<typeof createAppTheme>[0]
}

export function ThemeProvider({ children, themeConfig }: ThemeProviderProps) {
  const { config } = useTenant()
  
  // Usar la configuración del tenant si no se proporciona themeConfig
  const brandingConfig = themeConfig || config?.branding
  
  if (!brandingConfig) {
    // Fallback mientras carga el tenant
    return <>{children}</>
  }
  
  const theme = createAppTheme(brandingConfig)

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}

