import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB'
import { Hero } from '@/components/sections/Hero'
import { BrandStatement } from '@/components/sections/BrandStatement'
import { Servicos } from '@/components/sections/Servicos'
import { ObrasPreview } from '@/components/sections/ObrasPreview'
import { Galeria } from '@/components/sections/Galeria'
import { Historia } from '@/components/sections/Historia'
import { Processo } from '@/components/sections/Processo'
import { Contato } from '@/components/sections/Contato'
import { LocalBusinessJsonLd } from '@/components/seo/LocalBusinessJsonLd'
import type { Locale } from '@/types'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <>
      <LocalBusinessJsonLd locale={locale as Locale} />
      <Header />
      <main>
        <Hero />
        <BrandStatement />
        <Servicos />
        <ObrasPreview />
        <Galeria />
        <Historia />
        <Processo />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
