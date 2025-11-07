'use client'

import { usePathname } from 'next/navigation'
import AppLayout from './AppLayout'

interface LayoutWrapperProps {
  children: React.ReactNode
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname()
  
  // No aplicar el layout en la página de bienvenida
  const isWelcomePage = pathname === '/' || pathname === ''

  if (isWelcomePage) {
    return <>{children}</>
  }

  return <AppLayout>{children}</AppLayout>
}

export default LayoutWrapper

