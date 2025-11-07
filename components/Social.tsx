'use client'

import React from 'react'
import { Box, IconButton } from '@mui/material'
import IconRenderer from '@/components/IconRender'

interface SocialLink {
  name: string
  url: string
  icon: string
  title?: string
}

interface SocialProps {
  socialLinks: SocialLink[]
  sx?: object
}

const Social = ({ socialLinks, sx }: SocialProps) => {
  if (!socialLinks || socialLinks.length === 0) {
    return null
  }

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        pb: 0,
        ...sx,
      }}
    >
      {socialLinks.map((link, i) => (
        <IconButton
          key={`${link.name}-${i}`}
          component="a"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          sx={{ color: 'socialMedia.main' }}
        >
          <IconRenderer icon={link.icon} />
        </IconButton>
      ))}
    </Box>
  )
}

export default Social

