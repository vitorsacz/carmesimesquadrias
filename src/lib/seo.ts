import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'

/** URL pública do site. Defina NEXT_PUBLIC_SITE_URL na Vercel quando houver domínio definitivo. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://carmesim.vitorsantos.dev.br').replace(/\/$/, '')
export const SITE_NAME = 'Carmesim Esquadrias'
export const OG_IMAGE = '/og/carmesim-og.jpg'

type AppLocale = (typeof routing.locales)[number]

/** Código de idioma usado em <html lang> e nos links hreflang. */
export const HTML_LANG: Record<AppLocale, string> = { pt: 'pt-BR', en: 'en', es: 'es' }
const OG_LOCALE: Record<AppLocale, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }

function asLocale(locale: string): AppLocale {
  return (routing.locales as readonly string[]).includes(locale) ? (locale as AppLocale) : routing.defaultLocale
}

/** Links canônico e alternativos por idioma para um caminho (ex.: '', '/obras', '/obras/bioplugs'). */
export function localeAlternates(locale: string, path = ''): Metadata['alternates'] {
  const languages: Record<string, string> = {}
  for (const l of routing.locales) languages[HTML_LANG[l]] = `/${l}${path}`
  languages['x-default'] = `/${routing.defaultLocale}${path}`
  return { canonical: `/${asLocale(locale)}${path}`, languages }
}

interface PageSeo {
  locale: string
  path?: string
  title: string
  description: string
  /** Título completo, sem o sufixo "— Carmesim Esquadrias". */
  absoluteTitle?: boolean
  image?: { url: string; width?: number; height?: number; alt?: string }
}

/** Metadados completos de uma página (o Open Graph do Next não herda do layout, então cada página monta o seu). */
export function pageMetadata({ locale, path = '', title, description, absoluteTitle, image }: PageSeo): Metadata {
  const l = asLocale(locale)
  const img = image ?? { url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }
  const fullTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: localeAlternates(l, path),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALE[l],
      alternateLocale: routing.locales.filter((x) => x !== l).map((x) => OG_LOCALE[x]),
      url: `/${l}${path}`,
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [img.url],
    },
  }
}
