'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { ObraFoto } from '@/types'
import { Lightbox } from './Lightbox'
import styles from './ObraGallery.module.css'

interface Props {
  fotos: ObraFoto[]
  titulo: string
}

/**
 * Returns largest count ≤ total that fills the grid cleanly.
 * 4-col grid with featured (2×2): clean counts = 1, 5, 9, 13...
 * For total < 5: use all photos in a uniform grid (no featured).
 */
function cleanCount(total: number): number {
  if (total < 5) return total
  const extra = Math.floor((total - 5) / 4) * 4
  return 5 + extra
}

export function ObraGallery({ fotos, titulo }: Props) {
  const t = useTranslations('obras.ui')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const displayCount = cleanCount(fotos.length)
  const visible = fotos.slice(0, displayCount)
  const hiddenCount = fotos.length - displayCount
  const useFeatured = fotos.length >= 5

  const open = (i: number) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))
  const next = () =>
    setLightboxIndex((i) => (i !== null && i < fotos.length - 1 ? i + 1 : i))

  return (
    <>
      <div
        className={useFeatured ? styles.grid : styles.gridUniform}
        role="list"
        aria-label={`${t('galeriaAria')} — ${titulo}`}
      >
        {visible.map((foto, i) => {
          const isMoreCell = hiddenCount > 0 && i === displayCount - 1
          return (
            <button
              key={foto.src}
              className={`${styles.item} ${useFeatured && i === 0 ? styles.itemFeatured : ''}`}
              onClick={() => open(isMoreCell ? displayCount : i)}
              aria-label={isMoreCell ? `Ver mais ${hiddenCount} foto${hiddenCount > 1 ? 's' : ''}` : foto.alt}
              role="listitem"
            >
              <div className={styles.imgWrap}>
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  quality={75}
                  className={`${styles.img} ${isMoreCell ? styles.imgDimmed : ''}`}
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
                {isMoreCell ? (
                  <div className={styles.moreOverlay}>
                    <span className={styles.moreNum}>+{hiddenCount}</span>
                    <span className={styles.moreLabel}>{t('fotos')}</span>
                  </div>
                ) : (
                  <div className={styles.hoverOverlay} aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          fotos={fotos}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  )
}
