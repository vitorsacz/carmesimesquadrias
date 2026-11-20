'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import styles from './LocaleSwitch.module.css'

export function LocaleSwitch() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('common.locale')

  return (
    <div className={styles.wrap}>
      {routing.locales.map((l) => (
        <button
          key={l}
          className={`${styles.btn} ${l === locale ? styles.active : ''}`}
          onClick={() => router.replace(pathname, { locale: l })}
          aria-label={t(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
