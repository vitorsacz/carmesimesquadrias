'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import Image from 'next/image'
import { FOTOS_FUNDADOR } from '@/lib/obras'
import styles from './Historia.module.css'

// Confirmar com o cliente: nome "Luiz Marques" e ano "2025"

export function Historia() {
  const t = useTranslations('home.historia')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })


  return (
    <section ref={ref} className={styles.section} id="historia">
      <div className="container">
        <div className={styles.layout}>
          {/* Left: photo */}
          <motion.div
            className={styles.fotoWrap}
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.fotoFrame}>
              <Image
                src={FOTOS_FUNDADOR.principal.src}
                alt={t('fotoAlt')}
                fill
                sizes="(max-width: 900px) 80vw, 34vw"
                quality={85}
                className={styles.fotoImg}
              />
            </div>
            <motion.div
              className={styles.fotoInset}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <Image
                src={FOTOS_FUNDADOR.secundaria.src}
                alt={t('fotoAlt2')}
                fill
                sizes="(max-width: 900px) 40vw, 18vw"
                quality={85}
                className={styles.fotoImg}
              />
            </motion.div>
            <div className={styles.fotoAccent} aria-hidden="true" />
          </motion.div>

          {/* Right: text */}
          <motion.div
            className={styles.textSide}
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="section-label">{t('label')}</span>

            <h2 className={styles.titulo}>{t('titulo')}</h2>

            <p className={styles.texto}>{t('texto')}</p>

            <blockquote className={styles.quote}>
              <div className={styles.quoteBar} aria-hidden="true" />
              <div>
                <p className={styles.quoteText}>&ldquo;{t('quote')}&rdquo;</p>
                <footer className={styles.quoteAutor}>— {t('autor')}</footer>
              </div>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
