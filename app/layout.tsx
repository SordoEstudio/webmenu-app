import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import LayoutWrapper from '@/components/LayoutWrapper'
import { TenantProvider } from '@/context/TenantContext'
import { MenuProvider } from '@/context/MenuContext'
import { SearchProvider } from '@/context/SearchContext'
import { getTenantId, loadTenantConfig } from '@/utils/tenant'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

// Cargar metadata del tenant en el servidor
export async function generateMetadata(): Promise<Metadata> {
  const tenantId = getTenantId()
  const config = await loadTenantConfig(tenantId)
  
  return {
    title: config.metadata.title,
    description: config.metadata.description,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Cargar configuración del tenant en el servidor para el lang
  const tenantId = getTenantId()
  const config = await loadTenantConfig(tenantId)

  return (
    <html lang={config.metadata.language}>
      <body className={inter.className}>
        <GoogleAnalytics />
        <TenantProvider>
          <ThemeProvider>
            <SearchProvider>
              <MenuProvider>
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
              </MenuProvider>
            </SearchProvider>
          </ThemeProvider>
        </TenantProvider>
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
