'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { BLUR } from '@/lib/blur'
import { motion } from 'motion/react'
import { LogoMark } from '@/components/ui/LogoMark'
import styles from './Hero.module.css'

const WA_URL = 'https://wa.me/5511973046448'

export function Hero() {
  const t = useTranslations('home.hero')
  const tCta = useTranslations('common.cta')

  return (
    <section className={styles.hero} aria-label="Hero">
      <h1 className="sr-only">Carmesim Esquadrias</h1>

      <div className={styles.bg}>
        <Image
          src="/assets/obras/celso-e-marisa/fotos/depois/celso-e-marisa_depois_fachada-traseira_001.jpeg"
          placeholder="blur"
          blurDataURL={BLUR.hero}
          alt="Casa Celso e Marisa — esquadrias de alumínio preto com piscina"
          fill
          priority
          quality={85}
          sizes="100vw"
          className={styles.bgImg}
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('eyebrow')}
        </motion.p>

        <motion.div
          className={styles.logoWrap}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          aria-hidden="true"
        >
          <LogoMark size={72} />
        </motion.div>

        <motion.div
          className={styles.wordmark}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          aria-hidden="true"
        >
          <span className={styles.wordmarkMain}>CARMESIM</span>
          <span className={styles.wordmarkSub}>{t('wordmarkSub')}</span>
        </motion.div>

        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          aria-hidden="true"
        />

        <motion.h2
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {t('tagline')}
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
        >
          {t('sub')}
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.86 }}
        >
          <a href="#obras" className={styles.btnPrimary}>
            {t('cta')}
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            {tCta('whatsapp')}
          </a>
        </motion.div>
      </div>

      <div className={styles.scroll} aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
