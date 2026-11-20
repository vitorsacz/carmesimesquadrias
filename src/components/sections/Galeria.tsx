'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Lightbox } from '@/components/obras/Lightbox'
import { galeriaHome, todasAsFotos } from '@/lib/obras'
import styles from './Galeria.module.css'

export function Galeria() {
  const t = useTranslations('home.galeria')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openInAll = (galeiaIdx: number) => {
    // Map galeriaHome index → todasAsFotos index
    const fotoSrc = galeriaHome[galeiaIdx].src
    const idx = todasAsFotos.findIndex((f) => f.src === fotoSrc)
    setLightboxIndex(idx >= 0 ? idx : 0)
  }

  return (
    <section ref={ref} className={styles.section} id="galeria">
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

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          role="list"
          aria-label={t('titulo')}
        >
          {galeriaHome.map((foto, i) => (
            <button
              key={foto.src}
              className={`${styles.item} ${i === 0 ? styles.itemFeatured : ''}`}
              onClick={() => openInAll(i)}
              aria-label={foto.alt}
              role="listitem"
            >
              <div className={styles.imgWrap}>
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes={
                    i === 0
                      ? '(max-width: 600px) 50vw, (max-width: 1200px) 50vw, 600px'
                      : '(max-width: 600px) 50vw, (max-width: 1200px) 25vw, 300px'
                  }
                  quality={70}
                  className={styles.img}
                  loading={i < 5 ? 'eager' : 'lazy'}
                />
                <div className={styles.hoverOverlay} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </motion.div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            className={styles.verTodas}
            onClick={() => setLightboxIndex(0)}
          >
            {t('verTodas')}
          </button>
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          fotos={todasAsFotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() =>
            setLightboxIndex((i) =>
              i !== null && i < todasAsFotos.length - 1 ? i + 1 : i,
            )
          }
        />
      )}
    </section>
  )
}
