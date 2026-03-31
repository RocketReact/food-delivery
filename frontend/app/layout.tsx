import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Container from '../components/Container/Container'
import Filters from '../components/Filters/Filters'
import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Food delivery shop',
  description: 'Order food online any time',
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
    <html lang="en">
    <body className={nunito.className}>
    <Container>
      <Toaster />
      <Header shopFilters={<Filters variant="mobile" />} />
      <main>{children}</main>
      <Footer />
    </Container>
    </body>
    </html>
  )
}
