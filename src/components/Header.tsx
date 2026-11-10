import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { company, services } from '../data/site'
import { Icon } from './Icon'
import type { IconName } from './Icon'
import { ThemeToggle } from './ThemeToggle'
import { Logo } from './ui'

const before = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
]
const after = [
  { to: '/learning-portal', label: 'Learning Portal' },
  { to: '/careers', label: 'Careers' },
]

// Everything under the Services menu: the business services plus the EdTech Academy
const serviceLinks: { id: string; title: string; icon: IconName; to: string }[] = [
  ...services.map((s) => ({ id: s.id, title: s.title, icon: s.icon, to: `/services/${s.id}` })),
  { id: 'edtech', title: 'EdTech Academy', icon: 'grad', to: '/edtech' },
]

const navClass =({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link is-active' : 'nav-link'

function ServicesDropdown() {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const { pathname, hash, key } = useLocation()

  useEffect(() => setOpen(false), [pathname, hash, key])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const hoverOpen = () => {
    window.clearTimeout(closeTimer.current)
    setOpen(true)
  }
  // A short delay forgives a mouse that briefly leaves on its way to the panel.
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 160)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-menu-item]') ?? [])
    const index = items.indexOf(document.activeElement as HTMLElement)
    if (e.key === 'Escape' && open) {
      setOpen(false)
      button.current?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      requestAnimationFrame(() => {
        const next = root.current?.querySelectorAll<HTMLElement>('[data-menu-item]')
        next?.[(index + 1) % next.length]?.focus()
      })
    } else if (e.key === 'ArrowUp' && open) {
      e.preventDefault()
      items[(index - 1 + items.length) % items.length]?.focus()
    }
  }

  return (
    <div
      className="dropdown"
      ref={root}
      onPointerEnter={(e) => e.pointerType === 'mouse' && hoverOpen()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && hoverClose()}
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (e.relatedTarget && !root.current?.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        ref={button}
        type="button"
        className={`nav-link dropdown-toggle${pathname.startsWith('/services') || pathname.startsWith('/edtech') ? ' is-active' : ''}`}
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => setOpen((v) => !v)}
      >
        Services
        <span className={`chev${open ? ' is-open' : ''}`}>
          <Icon name="chevron" size={16} />
        </span>
      </button>

      <div id="services-menu" className="dropdown-panel" hidden={!open}>
        <ul className="dropdown-list">
          {serviceLinks.map((s, i) => (
            <li key={s.id} style={{ '--i': i } as CSSProperties}>
              <Link data-menu-item className="dropdown-item" to={s.to}>
                <span>{s.title}</span>
                <span className="dropdown-item-arrow" aria-hidden="true">
                  <Icon name="arrow" size={14} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    setMobileServices(false)
  }, [pathname, hash, key])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-row">
        <Link to="/" className="logo-link" aria-label={`${company.name} home`}>
          <Logo />
        </Link>

        <nav className="desktop-nav" aria-label="Main">
          {before.map((n) => (
            <NavLink key={n.to} to={n.to} end className={navClass}>
              {n.label}
            </NavLink>
          ))}
          <ServicesDropdown />
          {after.map((n) => (
            <NavLink key={n.to} to={n.to} className={navClass}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />

          <Link to="/contact" className="btn btn-primary header-cta">
            Contact us
          </Link>

          <button
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
          {before.map((n) => (
            <NavLink key={n.to} to={n.to} end className={navClass}>
              {n.label}
            </NavLink>
          ))}
          <button
            type="button"
            className="nav-link mobile-toggle"
            aria-expanded={mobileServices}
            onClick={() => setMobileServices((v) => !v)}
          >
            Services
            <span className={`chev${mobileServices ? ' is-open' : ''}`}>
              <Icon name="chevron" size={18} />
            </span>
          </button>
          {mobileServices && (
            <div className="mobile-sub">
              {serviceLinks.map((s) => (
                <Link key={s.id} to={s.to}>
                  <Icon name={s.icon} size={18} /> {s.title}
                </Link>
              ))}
            </div>
          )}
          {after.map((n) => (
            <NavLink key={n.to} to={n.to} className={navClass}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary">
            Contact us
          </Link>
        </nav>
      )}
    </header>
  )
}
