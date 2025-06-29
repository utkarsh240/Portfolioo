import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
} 