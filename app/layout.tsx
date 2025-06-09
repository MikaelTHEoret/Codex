import './globals.css'
import { Inter } from 'next/font/google'
import { AppNavigation } from '@/components/app-navigation'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Codex - Enhanced Mastermind OS',
  description: 'Nexus Core Intelligence Protocol - Synthwave Enhanced Reality Interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
