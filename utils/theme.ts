import { createTheme, darken, lighten } from '@mui/material/styles'

interface ThemeConfig {
  baseColor?: string
  primary?: {
    contrastText?: string
    light?: number
    ultraLight?: number
    dark?: number
  }
  secondary?: {
    main?: string
  }
  background?: {
    default?: string
    dark?: string
  }
  socialMedia?: {
    main?: string
  }
  typographyColor?: {
    white?: string
    black?: string
  }
  typography?: {
    fontFamily?: string
  }
  logo?: string
  logoHeader?: string
  defaultImage?: string
}

/**
 * Calcula la luminosidad relativa de un color (0-1)
 * Retorna true si el color es claro (necesita texto oscuro)
 */
const getLuminance = (color: string): number => {
  // Convertir hex a RGB
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  // Aplicar gamma correction
  const [rLin, gLin, bLin] = [r, g, b].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })

  // Calcular luminosidad relativa
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin
}

/**
 * Determina el color de contraste apropiado (blanco o negro)
 * basado en la luminosidad del color de fondo
 */
const getContrastText = (backgroundColor: string): string => {
  const luminance = getLuminance(backgroundColor)
  // Si el color es claro (luminosidad > 0.5), usar texto negro, sino blanco
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff'
}

export const createAppTheme = (themeConfig?: ThemeConfig) => {
  // Si no hay themeConfig, NO usar valores por defecto hardcodeados
  if (!themeConfig) {
    return createTheme({})
  }

  const baseColor = themeConfig.baseColor || '#f5bb06'
  const secondaryColor = themeConfig.secondary?.main || '#350156'

  // Valores por defecto para colores que no cambian entre clientes
  const defaultBackground = '#f5f5f5'
  const defaultBackgroundDark = '#121212'
  const defaultSocialMedia = '#ffffff'
  const defaultTypographyWhite = '#fafafa'
  const defaultTypographyBlack = '#1a1a1a'

  // Factores por defecto para variaciones de color
  const defaultLightFactor = 0.2
  const defaultUltraLightFactor = 0.3
  const defaultDarkFactor = 0.2

  // Generar colores primarios automáticamente
  const primaryLightFactor = themeConfig.primary?.light ?? defaultLightFactor
  const primaryUltraLightFactor = themeConfig.primary?.ultraLight ?? defaultUltraLightFactor
  const primaryDarkFactor = themeConfig.primary?.dark ?? defaultDarkFactor

  // Calcular contrastText automáticamente si no se proporciona
  const contrastText = themeConfig.primary?.contrastText || getContrastText(baseColor)

  return createTheme({
    palette: {
      primary: {
        contrastText,
        main: baseColor,
        light: lighten(baseColor, primaryLightFactor),
        ultraLight: lighten(baseColor, primaryUltraLightFactor),
        dark: darken(baseColor, primaryDarkFactor),
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: themeConfig.background?.default || defaultBackground,
        dark: themeConfig.background?.dark || defaultBackgroundDark,
      },
      socialMedia: {
        main: themeConfig.socialMedia?.main || defaultSocialMedia,
      },
      typographyColor: {
        white: themeConfig.typographyColor?.white || defaultTypographyWhite,
        black: themeConfig.typographyColor?.black || defaultTypographyBlack,
      },
    },
    typography: {
      fontFamily: themeConfig.typography?.fontFamily || 'Roboto, Arial, sans-serif',
    },
    extras: {
      logo: themeConfig.logo,
      logoHeader: themeConfig.logoHeader,
      defaultImage: themeConfig.defaultImage,
    },
  })
}
