'use client'

import React from 'react'
import { Fab, Badge, Box } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
/* import { useCart } from '@/context/CartContext'
 */import { usePathname, useRouter } from 'next/navigation'

const CartFab = () => {
/*   const { cart } = useCart()
 */  const router = useRouter()
  const pathname = usePathname()

  const isCart =
    pathname === '/app/cart' ||
    pathname === '/app/revision' ||
    pathname === '/app/orders'

  const goToCart = () => {
    router.push('/app/cart')
  }

  // Calcular la cantidad total de productos en el carrito
  const totalItems = cart.reduce((total, item) => total + item.count, 0)

  return totalItems !== 0 && !isCart ? (
    <Box
      sx={{
        position: 'fixed',
        bottom: 40,
        right: 16,
        zIndex: 1200,
      }}
    >
      <Badge
        badgeContent={totalItems}
        color="error"
        overlap="circular"
        sx={{
          zIndex: 1400,
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      />
      <Fab
        color="inherit"
        aria-label="cart"
        sx={{ zIndex: 1300 }}
        onClick={goToCart}
      >
        <ShoppingCartIcon />
      </Fab>
    </Box>
  ) : null
}

export default CartFab

