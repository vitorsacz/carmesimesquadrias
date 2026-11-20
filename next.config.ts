import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Teto de 2560 px: telas retina largas pediam 3840 px nas fotos de fundo (~500 KB cada) sem ganho visível.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    // As fotos não mudam de conteúdo com o mesmo nome; cache longo na Vercel.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

export default withNextIntl(nextConfig)
