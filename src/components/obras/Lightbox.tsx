'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { ObraFoto } from '@/types'
import styles from './Lightbox.module.css'

interface Props {
  fotos: ObraFoto[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ fotos, index, onClose, onPrev, onNext }: Props) {
  const t = useTranslations('obras.ui')
  const foto = fotos[index]

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!foto) return null

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <button className={styles.close} onClick={onClose} aria-label={t('fechar')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <button
        className={`${styles.nav} ${styles.navPrev}`}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        disabled={index === 0}
        aria-label={t('anterior')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <div className={styles.imgWrap} onClick={(e) => e.stopPropagation()}>
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          quality={90}
          sizes="100vw"
          className={styles.img}
          priority
        />
      </div>

      <button
        className={`${styles.nav} ${styles.navNext}`}
        onClick={(e) => { e.stopPropagation(); onNext() }}
        disabled={index === fotos.length - 1}
        aria-label={t('proximo')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      <div className={styles.counter} aria-live="polite">
        {index + 1} / {fotos.length}
      </div>

      {foto.alt && (
        <p className={styles.caption}>{foto.alt}</p>
      )}
    </div>
  )
}
