'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  useTheme,
  Avatar,
  Divider,
  Link,
  IconButton,
  Paper,
  Card,
  CardHeader,
} from '@mui/material'
import ImageModal from '@/components/ImageModal'
import IconRender from '@/components/IconRender'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaComment, FaArrowRight, FaArrowLeft } from 'react-icons/fa'

interface AboutData {
  title: string
  subtitle?: string
  description?: string
  images?: Array<{
    id: string
    image: string
    alt: string
    principal?: boolean
  }>
  contact?: {
    phone?: string
    email?: string
    whatsapp?: string
  }
  location?: {
    address?: string
    city?: string
    province?: string
    postalCode?: string
    mapUrl?: string
  }
  hours?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  socialMedia?: Array<{
    name: string
    url: string
    icon: string
    title?: string
  }>
}

interface AboutComponentProps {
  data: AboutData
}

const AboutComponent = ({ data }: AboutComponentProps) => {
  const theme = useTheme()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Validar URL de imagen
  const isValidImageUrl = (url: string) => {
    return url && (url.startsWith('http') || url.startsWith('/'))
  }

  // Manejar múltiples imágenes
  const images =
    data.images && data.images.length > 0
      ? data.images.map((img) => img.image).filter(Boolean)
      : []

  const currentImage = images[currentImageIndex] || theme.extras?.defaultImage

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const daysOfWeek = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Carrusel de imágenes */}
      {images.length > 0 && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 300, sm: 400, md: 500 },
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: 'grey.100',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isValidImageUrl(currentImage) ? (
            <img
              src={currentImage}
              alt={data.images?.[currentImageIndex]?.alt || data.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                cursor: 'pointer',
              }}
              onClick={handleOpenModal}
            />
          ) : (
            <Avatar
              alt={data.title}
              src={currentImage}
              variant="square"
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 2,
                cursor: 'pointer',
              }}
              onClick={handleOpenModal}
            />
          )}

          {/* Navegación de imágenes si hay múltiples */}
          {images.length > 1 && (
            <>
              <Box
                onClick={handlePrevImage}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <FaArrowLeft />
              </Box>
              <Box
                onClick={handleNextImage}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <FaArrowRight />
              </Box>
              {/* Indicador de imágenes */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1,
                  zIndex: 1,
                }}
              >
                {images.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor:
                        index === currentImageIndex
                          ? 'white'
                          : 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      )}

      {/* Título y descripción */}
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }} color="primary.main">
          {data.title}
        </Typography>

        {data.description && (
          <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
            {data.description}
          </Typography>
        )}
      </Box>



      {/* Ubicación */}
      {data.location && (
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
  {/*         <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <FaMapMarkerAlt
              style={{
                marginRight: 12,
                color: theme.palette.primary.main,
                fontSize: 24,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Ubicación
            </Typography>
          </Box> */}
        {data.location && (<Box
            sx={{
              display: 'flex'
            }}
          >
          <FaMapMarkerAlt
                            style={{
                                marginRight: 12,
                                color: theme.palette.primary.main,
                                fontSize: 24,
                            }}
                            />
                                        <Link
                                        href={data.location.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            
                                            textDecoration: 'none',
                              color:theme.palette.text.primary,
                                            fontWeight: 'medium',
                                        }}
                                        >
                                          <Typography variant="body1">{data.location.address} - {data.location.city} - {data.location.province} 
                                          </Typography>
                            
                            </Link>

            </Box>)}

        </Paper>
      )}

      {/* Horarios */}
      {data.hours && (
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <FaClock
              style={{
                marginRight: 12,
                color: theme.palette.primary.main,
                fontSize: 24,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Horarios de Atención
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {daysOfWeek.map((day) => {
              const hours = data.hours?.[day.key as keyof typeof data.hours]
              if (!hours) return null
              return (
                <Box
                  key={day.key}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 0.5,
                  }}
                >
                  <Typography variant="body1">{day.label}</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: hours === 'Cerrado' ? 'normal' : 'medium',
                      color:
                        hours === 'Cerrado'
                          ? 'text.secondary'
                          : 'text.primary',
                    }}
                  >
                    {hours}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        </Paper>
      )}
      {/* Información de contacto */}
      {data.contact && (
        <Card
          elevation={2}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
            

                      <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
            }}
            >
            <FaComment
              style={{
                marginRight: 12,
                color: theme.palette.primary.main,
                fontSize: 24,
              }}
              />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Contacto
            </Typography>
          </Box>
        
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
{data.contact.map((contact, i) => (
  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }} color="primary.main">
    <IconRender icon={contact.icon} />
    <Link href={contact.link} target="_blank" rel="noopener noreferrer" color="text.primary" sx={{textDecoration: 'none'}}>
      {contact.label}
    </Link>
  </Box>
))}
         
          </Box>
        </Card>
      )}
      {/* Redes sociales */}
{/*       {data.socialMedia && data.socialMedia.length > 0 && (
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Síguenos en nuestras redes
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {data.socialMedia.map((social, index) => (
              <IconButton
                key={`${social.name}-${index}`}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                sx={{
                  color: 'primary.main',
                  border: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <IconRender icon={social.icon} color="white"/>
              </IconButton>
            ))}
          </Box>
        </Paper>
      )} */}

      {/* Modal de imagen */}
      <ImageModal
        open={isModalOpen}
        onClose={handleCloseModal}
        image={currentImage}
        description={data.images?.[currentImageIndex]?.alt || data.title}
      />
    </Box>
  )
}

export default AboutComponent

