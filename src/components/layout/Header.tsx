'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useEffect, useState } from 'react'
import { LogoMark } from '@/components/ui/LogoMark'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LocaleSwitch } from '@/components/ui/LocaleSwitch'
import styles from './Header.module.css'

const WA_URL = 'https://wa.me/5511973046448'

export function Header() {
  const t = useTranslations('common')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: '#servicos', label: t('nav.servicos') },
    { href: '#obras', label: t('nav.obras') },
    { href: '#galeria', label: t('nav.galeria') },
    { href: '#processo', label: t('nav.processo') },
    { href: '#historia', label: t('nav.historia') },
    { href: '#contato', label: t('nav.contato') },
  ]

  const overHero = !scrolled && !menuOpen

  return (
    <header
      className={[
        styles.header,
        scrolled ? styles.scrolled : '',
        overHero ? styles.overHero : '',
        menuOpen ? styles.menuOpen : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Carmesim Esquadrias">
          <LogoMark size={34} />
          <span className={styles.logoText}>CARMESIM</span>
        </Link>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="Navegação principal"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
            onClick={() => setMenuOpen(false)}
          >
            {t('cta.orcamento')}
          </a>
        </nav>

        <div className={styles.actions}>
          <LocaleSwitch />
          <ThemeToggle />
          <button
            className={styles.burger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
