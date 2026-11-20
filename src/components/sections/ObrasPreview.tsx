'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { obras as todasObras } from '@/lib/obras'
import { BeforeAfterSlider } from '@/components/obras/BeforeAfterSlider'
import styles from './ObrasPreview.module.css'

export function ObrasPreview() {
  const t = useTranslations('home.obras')
  const tObras = useTranslations('obras')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })
  const [activeTab, setActiveTab] = useState(0)

  const obras = todasObras.filter((o) => o.mostrarNaHome)

  return (
    <section ref={ref} className={styles.section} id="obras">
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

        {/* 3 equal cards */}
        <div className={styles.grid}>
          {obras.map((obra, i) => (
            <motion.div
              key={obra.slug}
              className={styles.card}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <div className={styles.imgWrap}>
                <Image
                  src={obra.cover.src}
                  alt={obra.cover.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={80}
                  className={styles.img}
                />
                <div className={styles.imgOverlay} />
                <div className={styles.imgBadges}>
                  <span className={styles.badgeConcluida}>{t('concluida')}</span>
                  <span className={styles.badgeFotos}>
                    {obra.galeria.length} {t('fotos')}
                  </span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardTipo}>{tObras(`${obra.slug}.tipo`)}</span>
                <h3 className={styles.cardTitulo}>{tObras(`${obra.slug}.titulo`)}</h3>
                <div className={styles.cardActions}>
                  <Link href={`/obras/${obra.slug}`} className={styles.actionPrimary}>
                    {t('verGaleria')}
                  </Link>
                  <Link href={`/obras/${obra.slug}`} className={styles.actionSecondary}>
                    →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Before/After section */}
        <motion.div
          className={styles.antesDepoisWrap}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className={styles.antesDepoisTitulo}>{t('antesDepois')}</h3>

          <div className={styles.tabs} role="tablist">
            {obras.map((obra, i) => (
              <button
                key={obra.slug}
                role="tab"
                aria-selected={activeTab === i}
                className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {tObras(`${obra.slug}.titulo`)}
              </button>
            ))}
          </div>

          {obras[activeTab].antesDepois?.[0] && (
            <div className={styles.sliderWrap}>
              <BeforeAfterSlider
                antes={obras[activeTab].antesDepois![0].antes}
                depois={obras[activeTab].antesDepois![0].depois}
              />
              <p className={styles.arrasteHint}>{t('arraste')}</p>
            </div>
          )}
        </motion.div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="#galeria" className={styles.verTodas}>
            {t('verTodas')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
