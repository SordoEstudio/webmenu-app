import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    extras?: {
      logo?: string
      logoHeader?: string
      defaultImage?: string
    }
  }
  interface ThemeOptions {
    extras?: {
      logo?: string
      logoHeader?: string
      defaultImage?: string
    }
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    typographyColor?: {
      white?: string
      black?: string
    }
    socialMedia?: {
      main?: string
    }
  }
  interface PaletteOptions {
    typographyColor?: {
      white?: string
      black?: string
    }
    socialMedia?: {
      main?: string
    }
  }
}

declare module '@mui/material/styles' {
  interface PaletteColor {
    ultraLight?: string
  }
  interface SimplePaletteColorOptions {
    ultraLight?: string
  }
}
