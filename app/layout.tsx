import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Your Name — Full Stack Developer',
  description: 'Self-taught full-stack developer based in Nairobi, Kenya.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`
        ${cormorant.variable}
        ${outfit.variable}
        ${mono.variable}
        dark
      `}
    >
      <body className="antialiased bg-[#0F0E0D] text-[#F0EBE1]">
        {children}
      </body>
    </html>
  )
}