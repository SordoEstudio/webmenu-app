'use client'

import React from 'react'
import { Box, IconButton } from '@mui/material'
import IconRender from '@/components/IconRender'

interface Contact {
  name: string
  link: string
  label: string
  social?: boolean
  media?: boolean
}

interface SocialProps {
  contact: Contact[]
  sx?: object
}

const Social = ({ contact, sx }: SocialProps) => {
  // Filtrar contactos que tengan social: true o media: true (para compatibilidad)
  const socialContacts = contact?.filter((item) => item.social === true ) || []

  if (!socialContacts || socialContacts.length === 0) {
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
      {socialContacts.map((item, i) => (
        <IconButton
          key={`${item.name}-${i}`}
          component="a"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label || item.name}
          sx={{ color: 'socialMedia.main' }}
        >
          <IconRender icon={item.name} />
        </IconButton>
      ))}
    </Box>
  )
}

export default Social

