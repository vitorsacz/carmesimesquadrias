'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import styles from './Processo.module.css'

export function Processo() {
  const t = useTranslations('home.processo')
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

  const etapas = t.raw('etapas') as Array<{ titulo: string; desc: string }>

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 50%'],
  })

  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={sectionRef} className={styles.section} id="processo">
      <div className="container">
        <div className={styles.top}>
          <motion.div
            className={styles.titleBlock}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">{t('label')}</span>
            <h2 className={styles.titulo}>{t('titulo')}</h2>
            <p className={styles.sub}>{t('sub')}</p>
          </motion.div>

          <motion.div
            className={styles.statCard}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.statNum}>{t('garantia.numero')}</span>
            <div className={styles.statText}>
              <span className={styles.statUnit}>{t('garantia.unidade')}</span>
              <span className={styles.statDesc}>{t('garantia.desc')}</span>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {/* Track */}
          <div className={styles.track} aria-hidden="true">
            <motion.div
              className={styles.trackFill}
              style={{ width: lineWidth }}
            />
          </div>

          {/* Steps */}
          <div className={styles.steps}>
            {etapas.map((e, i) => (
              <motion.div
                key={i}
                className={styles.step}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <div className={styles.node} aria-hidden="true">
                  <span className={styles.nodeNum}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className={styles.stepTitulo}>{e.titulo}</h3>
                <p className={styles.stepDesc}>{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
