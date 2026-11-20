import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ThemeProvider } from 'next-themes'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/types'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const descriptions: Record<string, string> = {
    pt: 'Fabricante de esquadrias de alumínio de alto padrão em Atibaia, SP. Janelas, portas, coberturas e fachadas.',
    en: 'High-end aluminum window and door manufacturer in Atibaia, SP, Brazil.',
    es: 'Fabricante de carpintería de aluminio de alto estándar en Atibaia, SP, Brasil.',
  }

  return {
    title: {
      default: 'Carmesim Esquadrias',
      template: '%s — Carmesim Esquadrias',
    },
    description: descriptions[locale] ?? descriptions.pt,
    openGraph: {
      type: 'website',
      locale,
      siteName: 'Carmesim Esquadrias',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
