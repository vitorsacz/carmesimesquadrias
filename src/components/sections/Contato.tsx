'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import Image from 'next/image'
import { BLUR } from '@/lib/blur'
import styles from './Contato.module.css'

const WA_URL = 'https://wa.me/5511973046448'
const IG_URL = 'https://instagram.com/carmesim_esquadrias'

export function Contato() {
  const t = useTranslations('home.contato')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const info = t.raw('info') as Array<{ t: string; d: string }>

  const infoIcons = [
    // fábrica
    <svg key="fab" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21V9l7-6 7 6v12H3z"/><line x1="9" y1="21" x2="9" y2="12"/><line x1="15" y1="21" x2="15" y2="12"/><rect x="9" y="12" width="6" height="9"/>
    </svg>,
    // garantia
    <svg key="gar" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>,
    // sob medida
    <svg key="med" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20h20M6 20V4l6 4 6-4v16"/>
    </svg>,
  ]

  return (
    <section ref={ref} className={styles.section} id="contato">
      <div className={styles.bg}>
        <Image
          src="/assets/obras/andrea-e-thiago/fotos/depois/andrea-e-thiago_depois_fachada-traseira_003.jpeg"
          placeholder="blur"
          blurDataURL={BLUR.contato}
          alt="Casa Andrea e Thiago — fachada traseira com jardim e montanhas"
          fill
          quality={80}
          sizes="100vw"
          className={styles.bgImg}
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.textBlock}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">{t('label')}</span>
          <h2 className={styles.titulo}>{t('titulo')}</h2>
          <p className={styles.sub}>{t('sub')}</p>

          <div className={styles.btns}>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaWa}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={styles.waIcon}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              {t('cta')}
            </a>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaIg}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              {t('ctaSec')}
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.infoRow}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {info.map((item, i) => (
            <div key={i} className={styles.infoCard}>
              <div className={styles.infoIcon}>{infoIcons[i]}</div>
              <div>
                <div className={styles.infoT}>{item.t}</div>
                <div className={styles.infoD}>{item.d}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
