'use client'

import { AppBar, Box, Link, Typography } from '@mui/material'
import Social from '@/components/Social'
import { useTenant } from '@/context/TenantContext'

const Footer = () => {
  const { config } = useTenant()
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {config?.about?.contact && (
          <Social sx={{ marginY: 'auto' }} contact={config.about.contact} />
        )}
        <Typography
          align="center"
          sx={{ alignContent: 'center' }}
          color="typographyColor.white"
          variant="caption"
          fontSize="0.8rem"
          mb={1}
        >
          Desarrollado por{' '}
          <Link
            underline="none"
            color="typographyColor.white"
            href="http://www.harvestech.dev"
          >
            Harvestech
          </Link>
        </Typography>
      </AppBar>
    </Box>
  )
}

export default Footer

