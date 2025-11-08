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
  // Si no hay themeConfig, usar valores por defecto
  if (!themeConfig) {
    return createTheme({
      palette: {
        primary: {
          main: '#f5bb06', // Amarillo
          light: lighten('#f5bb06', 0.2),
          dark: darken('#f5bb06', 0.2),
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#350156', // Lila
          light: lighten('#350156', 0.2),
          dark: darken('#350156', 0.2),
          contrastText: '#ffffff',
        },
        success: {
          main: '#27AE60', // Verde lima para confirmaciones
          light: lighten('#27AE60', 0.2),
          dark: darken('#27AE60', 0.2),
        },
        background: {
          default: '#F8F8F8', // Blanco hueso
          paper: '#ffffff',
          dark: '#333333', // Negro suave
        },
        text: {
          primary: '#333333', // Negro suave para texto principal
          secondary: '#666666', // Versión más clara para texto secundario
        },
        socialMedia: {
          main: '#004B5A', // Usando el color primario para consistencia
        },
        typographyColor: {
          white: '#F8F8F8',
          black: '#333333',
        },
      },
      typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
          color: '#004B5A',
        },
        h2: {
          color: '#004B5A',
        },
        h3: {
          color: '#004B5A',
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              scrollBehavior: 'smooth',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              backgroundColor: '#f5bb06',
            },
            containedSecondary: {
              backgroundColor: '#350156',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            },
          },
        },
      },
      extras: {
        logo: '/logo.png',
        logoHeader: '/logo.png',
        defaultImage: '/logo-rojo.webp',
      },
    })
  }

  const baseColor = themeConfig.baseColor || '#f5bb06'

  return createTheme({
    palette: {
      primary: {
        contrastText: themeConfig.primary?.contrastText || '#ffffff',
        main: baseColor,
        light: lighten(
          baseColor,
          themeConfig.primary?.light || 0.2
        ),
        ultraLight: lighten(
          baseColor,
          themeConfig.primary?.ultraLight || 0.3
        ),
        dark: darken(baseColor, themeConfig.primary?.dark || 0.2),
      },
      secondary: {
        main: themeConfig.secondary?.main || '#350156',
      },
      background: {
        default: themeConfig.background?.default || '#F8F8F8',
        dark: themeConfig.background?.dark || '#333333',
      },
      socialMedia: {
        main: themeConfig.socialMedia?.main || '#004B5A',
      },
      typographyColor: {
        white: themeConfig.typographyColor?.white || '#F8F8F8',
        black: themeConfig.typographyColor?.black || '#333333',
      },
    },
    typography: {
      fontFamily: themeConfig.typography?.fontFamily || 'Roboto, Arial, sans-serif',
    },
    extras: {
      logo: themeConfig.logo || '/logo.png',
      logoHeader: themeConfig.logoHeader || '/logo.png',
      defaultImage: themeConfig.defaultImage || '/RojoLlogo-fondoogo.webp',
    },
  })
}

