import BootstrapClient from '@/components/BootstrapClient.js';
import Providers from "@/components/Providers";

import { Montserrat } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './global.css'

const montserrat = Montserrat({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Panel de control',
  description: 'Panel del control de Molinos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <Providers>
          {children}
        </Providers>
      </body>
      <BootstrapClient />
    </html>
  )
}
