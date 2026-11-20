import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { obras } from '@/lib/obras'
import { HTML_LANG, SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1, changeFrequency: 'monthly' },
    { path: '/obras', priority: 0.8, changeFrequency: 'monthly' },
    ...obras.map((o) => ({ path: `/obras/${o.slug}`, priority: 0.7, changeFrequency: 'yearly' as const })),
  ]
  const lastModified = new Date()

  return paths.flatMap(({ path, priority, changeFrequency }) => {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [HTML_LANG[l], `${SITE_URL}/${l}${path}`]),
    )
    return routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority: locale === routing.defaultLocale ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: { languages },
    }))
  })
}
