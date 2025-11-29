'use client'

import { IconType } from 'react-icons'
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaSlack,
  FaTelegramPlane,
  FaMobileAlt,
  FaGlobe,
  FaTiktok,
  FaSnapchat,
  FaPinterest,
  FaTumblr,
  FaFlickr,
  FaStore,
  FaShopify,
  FaShoppingBag,
  FaShoppingCart,
  FaDiscord,
  FaLink,
  FaQrcode,
  FaCalendarAlt,
  FaRss,
  FaPaypal,
  FaSpotify,
  FaSoundcloud,
  FaApple,
  FaBandcamp,
  FaVimeoV,
  FaTwitch,
  FaBehance,
  FaDribbble,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

// Mapeo de nombres de contacto a iconos
const iconMap: Record<string, IconType> = {
  // Iconos de fa
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaSlack,
  FaTelegramPlane,
  FaMobileAlt,
  FaGlobe,
  FaTiktok,
  FaSnapchat,
  FaPinterest,
  FaTumblr,
  FaFlickr,
  FaStore,
  FaShopify,
  FaShoppingBag,
  FaShoppingCart,
  FaDiscord,
  FaLink,
  FaQrcode,
  FaCalendarAlt,
  FaRss,
  FaPaypal,
  FaSpotify,
  FaSoundcloud,
  FaApple,
  FaBandcamp,
  FaVimeoV,
  FaTwitch,
  FaBehance,
  FaDribbble,
  // Iconos de fa6
  FaXTwitter,
  // Mapeo de nombres comunes a nombres de iconos
  phone: FaPhone,
  mobile: FaMobileAlt,
  email: FaEnvelope,
  whatsapp: FaWhatsapp,
  telegram: FaTelegramPlane,
  website: FaGlobe,
  instagram: FaInstagram,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  x: FaXTwitter,
  slack: FaSlack,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  snapchat: FaSnapchat,
  pinterest: FaPinterest,
  tumblr: FaTumblr,
  flickr: FaFlickr,
  shop: FaStore,
  shopify: FaShopify,
  mercadolibre: FaShoppingBag,
  whatsapp_order: FaShoppingCart,
  discord: FaDiscord,
  link: FaLink,
  qr: FaQrcode,
  calendar: FaCalendarAlt,
  blog: FaRss,
  paypal: FaPaypal,
  spotify: FaSpotify,
  soundcloud: FaSoundcloud,
  apple_music: FaApple,
  bandcamp: FaBandcamp,
  vimeo: FaVimeoV,
  twitch: FaTwitch,
  behance: FaBehance,
  dribbble: FaDribbble,
}

interface IconRenderProps {
  icon: string
  size?: number | string
  className?: string
  style?: React.CSSProperties
}

const IconRender = ({ icon, size, className, style }: IconRenderProps) => {
  // Primero intentar con el nombre exacto del icono (ej: "FaPhone")
  let IconComponent = iconMap[icon] as IconType | undefined
  
  // Si no se encuentra, intentar con el nombre en minúsculas (ej: "phone" -> "FaPhone")
  if (!IconComponent) {
    const normalizedIcon = icon.charAt(0).toUpperCase() + icon.slice(1).toLowerCase()
    const iconName = `Fa${normalizedIcon}`
    IconComponent = iconMap[iconName] as IconType | undefined
  }
  
  // Si aún no se encuentra, intentar directamente con el nombre en minúsculas
  if (!IconComponent) {
    IconComponent = iconMap[icon.toLowerCase()] as IconType | undefined
  }
  
  if (!IconComponent) {
    return null
  }

  return <IconComponent size={size} className={className} style={style} />
}

export default IconRender

