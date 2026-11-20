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

export default function HomePage() {
  return (
    <>
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
