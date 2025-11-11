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

  const baseColor = themeConfig.baseColor

  return createTheme({
    palette: {
      primary: {
        contrastText: themeConfig.primary?.contrastText,
        main: baseColor,
        light:
          baseColor && themeConfig.primary?.light != null
            ? lighten(baseColor, themeConfig.primary.light)
            : undefined,
        ultraLight:
          baseColor && themeConfig.primary?.ultraLight != null
            ? lighten(baseColor, themeConfig.primary.ultraLight)
            : undefined,
        dark:
          baseColor && themeConfig.primary?.dark != null
            ? darken(baseColor, themeConfig.primary.dark)
            : undefined,
      },
      secondary: {
        main: themeConfig.secondary?.main,
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
