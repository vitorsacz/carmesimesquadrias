'use client'

import { useTranslations } from 'next-intl'
import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import type { ObraFoto } from '@/types'
import styles from './BeforeAfterSlider.module.css'

interface Props {
  antes: ObraFoto
  depois: ObraFoto
}

export function BeforeAfterSlider({ antes, depois }: Props) {
  const t = useTranslations('home.obras')
  const [pos, setPos] = useState(50) // percent
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(97, Math.max(3, pct)))
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    updatePos(e.clientX)
    const onMove = (ev: MouseEvent) => { if (dragging.current) updatePos(ev.clientX) }
    const onUp = () => { dragging.current = false; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    const onMove = (ev: TouchEvent) => updatePos(ev.touches[0].clientX)
    const onEnd = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd) }
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd)
    updatePos(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className={styles.wrap}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{ '--pos': `${pos}%` } as React.CSSProperties}
      role="img"
      aria-label={`Comparação antes e depois: ${antes.alt} / ${depois.alt}`}
    >
      <div className={styles.imgBefore}>
        <Image src={antes.src} alt={antes.alt} fill sizes="(max-width: 768px) 100vw, 60vw" quality={80} className={styles.img} />
        <span className={styles.label}>{t('antes')}</span>
      </div>

      <div className={styles.imgAfter} style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image src={depois.src} alt={depois.alt} fill sizes="(max-width: 768px) 100vw, 60vw" quality={80} className={styles.img} />
        <span className={styles.labelAfter}>{t('depois')}</span>
      </div>

      <div className={styles.handle} style={{ left: `${pos}%` }}>
        <div className={styles.handleLine} />
        <div className={styles.handleCircle} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
