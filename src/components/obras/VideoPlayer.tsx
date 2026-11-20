'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import styles from './VideoPlayer.module.css'

interface Props {
  src: string
  poster?: string
  label?: string
}

export function VideoPlayer({ src, poster, label }: Props) {
  const t = useTranslations('obras.ui')
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggle = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className={styles.wrap}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={styles.video}
        playsInline
        preload="none"
        onEnded={() => setPlaying(false)}
        onClick={toggle}
        aria-label={label}
      />
      {!playing && (
        <button
          className={styles.playBtn}
          onClick={toggle}
          aria-label={label ? `${t('reproduzir')}: ${label}` : t('reproduzir')}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </button>
      )}
    </div>
  )
}
