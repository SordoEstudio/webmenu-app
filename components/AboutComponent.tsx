'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  useTheme,
  Avatar,
  Link,
  Paper,
  Card,
} from '@mui/material'
import ImageModal from '@/components/ImageModal'
import IconRender from '@/components/IconRender'
import { FaMapMarkerAlt, FaClock, FaComment, FaChevronRight,FaChevronLeft } from 'react-icons/fa'
import { formatDaysLabel } from '@/utils/dayFormatter'

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
  contact?: Array<{
    name: string
    link: string
    label: string
    media?: boolean
  }>
  location?: {
    address?: string
    mapUrl?: string
  }
  hours?: Array<{
    id: string
    isClosed: boolean
    days: number[]
    timeSlots: Array<{
      open: string
      close: string
    }>
  }>
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
  const isValidImageUrl = (url: string | undefined) => {
    return url && (url.startsWith('http') || url.startsWith('/'))
  }
// Fallback de Location Rul
const fallbackLocationUrl = (data.location?.mapUrl) ? data.location?.mapUrl : `https://maps.app.goo.gl/${data.location?.address?.replace(/ /g, '+') || ''}`
  // Manejar múltiples imágenes
  const images =
    data.images && data.images.length > 0
      ? data.images.map((img) => img.image).filter(Boolean)
      : []

  const currentImage: string = images[currentImageIndex] || theme.extras?.defaultImage || ''

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

  // Función para formatear los horarios agrupados
  const formatHoursGroup = (group: {
    isClosed: boolean
    days: number[]
    timeSlots: Array<{ open: string; close: string }>
  }) => {
    if (group.isClosed) {
      return 'Cerrado'
    }

    if (group.timeSlots.length === 0) {
      return 'Cerrado'
    }

    // Formatear cada timeSlot
    const formattedSlots = group.timeSlots.map((slot) => {
      return `${slot.open} a ${slot.close}`
    })

    return formattedSlots.map((slot, idx) => (
      <span key={idx} style={{ display: 'block' }}>{slot}</span>
    ))
  }


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
                <FaChevronLeft />
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
                <FaChevronRight />
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
                                        href={fallbackLocationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            
                                            textDecoration: 'none',
                              color:theme.palette.text.primary,
                                            fontWeight: 'medium',
                                        }}
                                        >
                                          <Typography variant="body1">{data.location.address}
                                          </Typography>
                            
                            </Link>

            </Box>)}

        </Paper>
      )}

      {/* Horarios */}
      {data.hours && Array.isArray(data.hours) && data.hours.length > 0 && (
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
            {data.hours.map((group) => {
              const daysLabel = formatDaysLabel(group.days)
              const hoursText = formatHoursGroup(group)
              
              return (
                <Box
                  key={group.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 0.5,
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {daysLabel}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: group.isClosed ? 'normal' : 'medium',
                      color: group.isClosed ? 'text.secondary' : 'text.primary',
                      textAlign: 'right',
                    }}
                  >
                    {hoursText}
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
                <IconRender 
                  icon={contact.name}
                  style={{ 
                    color: theme.palette.primary.main,
                    fontSize: 20 
                  }} 
                />
                <Link 
                  href={contact.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  color="text.primary" 
                  sx={{ textDecoration: 'none' }}
                >
                  {contact.label}
                </Link>
              </Box>
            ))}
          </Box>
        </Card>
      )}

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

