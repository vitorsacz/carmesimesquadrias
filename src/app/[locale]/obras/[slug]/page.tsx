import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB'
import { ObraGallery } from '@/components/obras/ObraGallery'
import { BeforeAfterSlider } from '@/components/obras/BeforeAfterSlider'
import { VideoPlayer } from '@/components/obras/VideoPlayer'
import { getObraBySlug, obras } from '@/lib/obras'
import { routing } from '@/i18n/routing'
import { pageMetadata } from '@/lib/seo'
import styles from './obra.module.css'

type Params = { locale: string; slug: string }

export async function generateStaticParams() {
  const paths: Params[] = []
  for (const locale of routing.locales) {
    for (const obra of obras) {
      paths.push({ locale, slug: obra.slug })
    }
  }
  return paths
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const obra = getObraBySlug(slug)
  if (!obra) return {}
  const t = await getTranslations({ locale, namespace: 'obras' })
  const tSeo = await getTranslations({ locale, namespace: 'common.seo' })
  const titulo = t(`${slug}.titulo`)
  const tipo = t(`${slug}.tipo`)
  const descricao = t(`${slug}.descricao`) || tSeo('obraDesc', { titulo, tipo })
  return pageMetadata({
    locale,
    path: `/obras/${slug}`,
    title: titulo,
    description: descricao,
    image: { url: obra.cover.src, width: obra.cover.width, height: obra.cover.height, alt: obra.cover.alt },
  })
}

export default async function ObraPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { locale, slug } = await params
  const obra = getObraBySlug(slug)
  if (!obra) notFound()

  const t = await getTranslations({ locale, namespace: 'obras' })
  const tUI = await getTranslations({ locale, namespace: 'obras.ui' })

  const titulo = t(`${slug}.titulo`)
  const tipo = t(`${slug}.tipo`)
  const descricao = t(`${slug}.descricao`)
  const produtos = t.raw(`${slug}.produtos`) as string[]

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroImg}>
            <Image
              src={obra.cover.src}
              alt={obra.cover.alt}
              fill
              priority
              quality={85}
              sizes="100vw"
              className={styles.heroImgEl}
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={`container ${styles.heroContent}`}>
            <span className="section-label">{tipo}</span>
            <h1 className={styles.heroTitulo}>{titulo}</h1>
          </div>
        </div>

        <div className="container">
          <div className={styles.layout}>
            {/* Main content */}
            <div className={styles.content}>
              <p className={styles.descricao}>{descricao}</p>

              {/* Gallery */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitulo}>{tUI('fotosDe')} {titulo}</h2>
                <ObraGallery fotos={obra.galeria} titulo={titulo} />
              </section>

              {/* Before/After */}
              {(obra.antesDepois?.length ?? 0) > 0 && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitulo}>{tUI('antesDepois')}</h2>
                  <div className={styles.sliders}>
                    {obra.antesDepois!.map((par, i) => (
                      <BeforeAfterSlider
                        key={i}
                        antes={par.antes}
                        depois={par.depois}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Video */}
              {obra.video && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitulo}>{tUI('video')}</h2>
                  <VideoPlayer
                    src={obra.video}
                    poster={obra.video.replace(/\.mp4$/, '-poster.jpg')}
                    label={tUI('tour', { titulo })}
                  />
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className={styles.aside}>
              <div className={styles.asideCard}>
                <h3 className={styles.asideTitle}>{tUI('produtos')}</h3>
                <ul className={styles.produtos}>
                  {produtos.map((p) => (
                    <li key={p} className={styles.produto}>
                      <span className={styles.dot} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://wa.me/5511973046448"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waCta}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                {tUI('pedirOrcamento')}
              </a>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
