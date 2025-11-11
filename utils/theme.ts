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

export const createAppTheme = (themeConfig?: ThemeConfig) => {
  // Si no hay themeConfig, NO usar valores por defecto hardcodeados
  if (!themeConfig) {
    return createTheme({})
  }

  const baseColor = themeConfig.baseColor || '#f5bb06'

  return createTheme({
    palette: {
      primary: {
        contrastText: themeConfig.primary?.contrastText || '#ffffff',
        main: baseColor,
        light:
          baseColor && themeConfig.primary?.light != null
            ? lighten(baseColor, themeConfig.primary.light)
            : lighten(baseColor, 0.2),
        ultraLight:
          baseColor && themeConfig.primary?.ultraLight != null
            ? lighten(baseColor, themeConfig.primary.ultraLight)
            : lighten(baseColor, 0.3),
        dark:
          baseColor && themeConfig.primary?.dark != null
            ? darken(baseColor, themeConfig.primary.dark)
            : darken(baseColor, 0.2),
      },
      secondary: {
        main: themeConfig.secondary?.main || '#350156',
      },
      background: {
        default: themeConfig.background?.default,
        dark: themeConfig.background?.dark,
      },
      socialMedia: {
        main: themeConfig.socialMedia?.main,
      },
      typographyColor: {
        white: themeConfig.typographyColor?.white,
        black: themeConfig.typographyColor?.black,
      },
    },
    typography: {
      fontFamily: themeConfig.typography?.fontFamily,
    },
    extras: {
      logo: themeConfig.logo,
      logoHeader: themeConfig.logoHeader,
      defaultImage: themeConfig.defaultImage,
    },
  })
}
