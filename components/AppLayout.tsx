'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import HeaderAppBar from './HeaderAppBar'
import Footer from './Footer'
/* import CartFab from './CartFab'
 */
interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <HeaderAppBar setOpen={setOpen} />
      <main style={{ paddingTop: '65px', paddingBottom: '80px' }}>
        {children}
      </main>
{/*       <CartFab />
 */}      <Footer />
    </Box>
  )
}

export default AppLayout

