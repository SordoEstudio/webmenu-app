'use client'

import { AppBar, Box, Link, Typography } from '@mui/material'
import Social from '@/components/Social'
/* import { useClient } from '@/context/ClientContext'
 */
import socialLinks from '@/data/social.json'
const Footer = () => {
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
        <Social sx={{ marginY: 'auto' }} socialLinks={socialLinks} />
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

