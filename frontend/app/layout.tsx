import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Container from '../components/Container/Container'
import { FiltersProvider } from '../context/FiltersContext'
import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Food Delivery',
  description: 'Order food online any time',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
})

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
    <body className={nunito.className}>
    <Toaster
      toastOptions={{
        style: {
          width: '400px',
          height: '60px',
          fontSize: '17px',
        },
        duration: 2000,
      }}
    />
    <FiltersProvider>
      <Container>
        <Header />
        <main>{children}</main>
        <Footer />
      </Container>
    </FiltersProvider>
    </body>
    </html>
  )
}
