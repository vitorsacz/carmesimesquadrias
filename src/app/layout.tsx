import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Carmesim Esquadrias',
  description: 'Fabricante de esquadrias de alumínio de alto padrão em Atibaia, SP.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
