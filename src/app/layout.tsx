import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/default/Toaster'

import './globals.css'

const inter = Inter({
  subsets: ['cyrillic'],
})

export const metadata: Metadata = {}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`${inter.className} min-h-screen overflow-x-hidden`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
