'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import Image from 'next/image'
import styles from './Servicos.module.css'

// minimalista goes first (featured card)
const SERVICOS_KEYS = [
  'minimalista', 'janelas', 'portas', 'coberturas',
  'sacada', 'guardacorpo', 'fachada',
] as const

const ICONS: Record<string, React.ReactNode> = {
  janelas: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="18" rx="1"/>
      <line x1="12" y1="3" x2="12" y2="21"/><line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
  ),
  minimalista: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
    </svg>
  ),
  portas: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="1"/>
      <circle cx="16" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
  coberturas: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
    </svg>
  ),
  sacada: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="20" height="14" rx="1"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
      <line x1="8" y1="10" x2="8" y2="20"/><line x1="14" y1="10" x2="14" y2="20"/>
    </svg>
  ),
  guardacorpo: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="2" y1="8" x2="22" y2="8"/>
      <line x1="6" y1="8" x2="6" y2="20"/><line x1="12" y1="8" x2="12" y2="20"/><line x1="18" y1="8" x2="18" y2="20"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  fachada: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
    </svg>
  ),
}

export function Servicos() {
  const t = useTranslations('home.servicos')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <section ref={ref} className={styles.section} id="servicos">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{t('label')}</span>
          <h2 className={styles.titulo}>{t('titulo')}</h2>
          <p className={styles.sub}>{t('sub')}</p>
        </motion.div>

        <div className={styles.grid}>
          {/* Featured card — minimalista, col 1, rows 1-2 */}
          <motion.div
            className={`${styles.card} ${styles.cardFeatured}`}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Image
              src="/assets/obras/celso-e-marisa/fotos/depois/celso-e-marisa_depois_varanda_001.jpeg"
              alt="Linha Minimalista Carmesim — varanda com esquadrias ultrafinas"
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              quality={75}
              className={styles.featuredImg}
            />
            <div className={styles.featuredOverlay} />
            <div className={styles.featuredContent}>
              <span className={styles.badge}>{t('items.minimalista.badge')}</span>
              <div className={styles.iconWrap}>{ICONS.minimalista}</div>
              <div className={styles.cardTitle}>{t('items.minimalista.nome')}</div>
              <p className={styles.cardDesc}>{t('items.minimalista.desc')}</p>
            </div>
          </motion.div>

          {/* Regular cards */}
          {SERVICOS_KEYS.slice(1).map((key, i) => (
            <motion.div
              key={key}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
            >
              <div className={styles.iconWrapReg}>{ICONS[key]}</div>
              <div className={styles.cardTitle}>{t(`items.${key}.nome`)}</div>
              <p className={styles.cardDesc}>{t(`items.${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
