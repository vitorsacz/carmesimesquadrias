import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB'
import { obras } from '@/lib/obras'
import { pageMetadata } from '@/lib/seo'
import styles from './obras.module.css'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.obras' })
  const tSeo = await getTranslations({ locale, namespace: 'common.seo' })
  return pageMetadata({ locale, path: '/obras', title: t('titulo'), description: tSeo('obrasDesc') })
}

export default function ObrasPage() {
  const t = useTranslations('home.obras')
  const tObras = useTranslations('obras')

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className="container">
            <span className="section-label">{t('label')}</span>
            <h1 className={styles.titulo}>{t('titulo')}</h1>
          </div>
        </div>

        <div className="container">
          <div className={styles.grid}>
            {obras.map((obra) => (
              <Link key={obra.slug} href={`/obras/${obra.slug}`} className={styles.card}>
                <div className={styles.imgWrap}>
                  <Image
                    src={obra.cover.src}
                    alt={obra.cover.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={80}
                    className={styles.img}
                  />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.tipo}>{tObras(`${obra.slug}.tipo`)}</span>
                  <h2 className={styles.cardTitulo}>{tObras(`${obra.slug}.titulo`)}</h2>
                  <p className={styles.cardDesc}>{tObras(`${obra.slug}.descricao`)}</p>
                  <span className={styles.cta}>{tObras('ui.verGaleria')} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
