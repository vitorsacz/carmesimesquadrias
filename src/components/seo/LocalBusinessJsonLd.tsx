import { getTranslations } from 'next-intl/server'
import { HTML_LANG, OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo'
import type { Locale } from '@/types'

/**
 * Dados estruturados da empresa (schema.org) para o Google mostrar nome, cidade, telefone e redes.
 * TODO (cliente): incluir endereço completo (streetAddress, postalCode), horário (openingHoursSpecification)
 * e cidades atendidas (areaServed) quando forem confirmados.
 */
export async function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'common.seo' })

  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#empresa`,
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/apple-icon.png`,
    image: `${SITE_URL}${OG_IMAGE}`,
    description: t('homeDesc'),
    telephone: '+55 11 97304-6448',
    inLanguage: HTML_LANG[locale],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Atibaia',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    sameAs: ['https://www.instagram.com/carmesim_esquadrias/'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55 11 97304-6448',
      contactType: 'sales',
      availableLanguage: ['Portuguese', 'English', 'Spanish'],
    },
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
