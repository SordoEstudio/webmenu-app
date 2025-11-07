'use client'

import * as icons from 'react-icons/fa'
import { IconType } from 'react-icons'

interface IconRenderProps {
  icon: string
  size?: number | string
  className?: string
}

const IconRender = ({ icon, size, className }: IconRenderProps) => {
  const IconComponent = icons[icon as keyof typeof icons] as IconType | undefined
  
  if (!IconComponent) {
    return null
  }

  return <IconComponent size={size} className={className} />
}

export default IconRender

