'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import Image from 'next/image'
import { BLUR } from '@/lib/blur'
import styles from './BrandStatement.module.css'

export function BrandStatement() {
  const t = useTranslations('home.brand')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.bg}>
        <Image
          src="/assets/obras/celso-e-marisa/fotos/depois/celso-e-marisa_depois_corredor-superior_001.jpeg"
          placeholder="blur"
          blurDataURL={BLUR.brand}
          alt="Corredor superior com guarda-corpo de vidro e esquadrias Carmesim"
          fill
          quality={65}
          sizes="100vw"
          className={styles.bgImg}
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>
        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t('headline')}
        </motion.h2>
        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t('sub')}
        </motion.p>
      </div>
    </section>
  )
}
