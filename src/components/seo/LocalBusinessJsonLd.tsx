import { getTranslations } from 'next-intl/server'
import { HTML_LANG, OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo'
import type { Locale } from '@/types'

/**
 * Dados estruturados do site e da empresa (schema.org) para o Google mostrar nome, cidade, telefone e redes.
 * TODO (cliente): incluir endereço completo (streetAddress, postalCode), horário (openingHoursSpecification)
 * e cidades atendidas (areaServed) quando forem confirmados.
 */
export async function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'common.seo' })

  // Nome do site nos resultados do Google: o bloco WebSite é o sinal principal.
  // O domínio em minúsculas entra como nome alternativo (recomendação do próprio Google).
  const site = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#site`,
    name: SITE_NAME,
    alternateName: ['Carmesim', new URL(SITE_URL).hostname],
    url: `${SITE_URL}/`,
    inLanguage: HTML_LANG[locale],
    publisher: { '@id': `${SITE_URL}/#empresa` },
  }

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

  const json = (obj: object) => ({ __html: JSON.stringify(obj).replace(/</g, '\\u003c') })

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={json(site)} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={json(data)} />
    </>
  )
}
