'use client'

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode } from 'react'
import { createAppTheme } from '@/utils/theme'
import brandConfig from '@/data/brandConfig.json'

interface ThemeProviderProps {
  children: ReactNode
  themeConfig?: Parameters<typeof createAppTheme>[0]
}

export function ThemeProvider({ children, themeConfig }: ThemeProviderProps) {
  // Usar la configuración del JSON si no se proporciona themeConfig
  const config = themeConfig || brandConfig.BrandConfig
  const theme = createAppTheme(config)

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}

