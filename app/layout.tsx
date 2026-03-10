import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import NetworkBackground from '@/components/NetworkBackground'
import Preloader from '@/components/Preloader'
import MatrixRain from '@/components/MatrixRain'
import QuantumDataStream from '@/components/QuantumDataStream'
import BlackHoleCursor from '@/components/BlackHoleCursor'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Utkarsh Kumar Gupta - Full Stack Developer',
  description: 'Full-stack developer proficient in React, Next.js, TypeScript, MongoDB, Docker, and finance. Experience with real-world projects like FilmFinder and PDF Analysis.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'MongoDB', 'Docker', 'Finance'],
  authors: [{ name: 'Utkarsh Kumar Gupta' }],
  creator: 'Utkarsh Kumar Gupta',
  openGraph: {
    title: 'Utkarsh Kumar Gupta - Full Stack Developer',
    description: 'Full-stack developer proficient in React, Next.js, TypeScript, MongoDB, Docker, and finance.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Utkarsh Kumar Gupta - Full Stack Developer',
    description: 'Full-stack developer proficient in React, Next.js, TypeScript, MongoDB, Docker, and finance.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${inter.variable} antialiased font-body`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <NetworkBackground />
          <Preloader />
          <MatrixRain />
          <QuantumDataStream />
          <BlackHoleCursor />
          <CustomCursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
} 