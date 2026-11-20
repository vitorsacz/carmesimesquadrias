import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LogoMark } from '@/components/ui/LogoMark'
import styles from './not-found.module.css'

export default function NotFound() {
  const t = useTranslations('common.seo')

  return (
    <>
      <Header />
      <main id="conteudo" className={styles.main}>
        <div className={`container ${styles.inner}`}>
          <LogoMark size={56} />
          <span className={styles.code}>404</span>
          <h1 className={styles.titulo}>{t('notFoundTitle')}</h1>
          <p className={styles.texto}>{t('notFoundText')}</p>
          <div className={styles.actions}>
            <Link href="/" className={styles.primary}>
              {t('notFoundCta')}
            </Link>
            <Link href="/obras" className={styles.secondary}>
              {t('notFoundObras')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
