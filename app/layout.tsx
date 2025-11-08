import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import LayoutWrapper from '@/components/LayoutWrapper'
import { MenuProvider } from '@/context/MenuContext'
import { ClientProvider } from '@/context/ClientContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WebMenu App',
  description: 'Aplicación web con Next.js, Material-UI y Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          <MenuProvider>
            <ClientProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </ClientProvider>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

/* import HeaderAppBar from "./HeaderAppBar";
import Footer from "./Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import CartFab from "../components/CartFab";
const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <HeaderAppBar setOpen={setOpen} />
      <main style={{ paddingTop: "65px", paddingBottom: "80px" }}>
        <Outlet />
      </main>
   <CartFab />
      <Footer />
    </Box>
  );
};

export default Layout;
 */
