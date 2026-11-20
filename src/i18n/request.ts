import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'pt' | 'en' | 'es')) {
    locale = routing.defaultLocale
  }

  const [common, home, obras] = await Promise.all([
    import(`./messages/${locale}/common.json`),
    import(`./messages/${locale}/home.json`),
    import(`./messages/${locale}/obras.json`),
  ])

  return {
    locale,
    messages: {
      common: common.default,
      home: home.default,
      obras: obras.default,
    },
  }
})
