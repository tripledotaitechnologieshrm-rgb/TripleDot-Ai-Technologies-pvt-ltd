import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { company, hiringCompanies, hubs, partners, services } from '../data/site'
import { Icon } from './Icon'

export function Dots() {
  return (
    <span className="dots" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  )
}

/** Brand mark: three overlapping circles (pink, red, indigo) */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      viewBox="0 0 72 32"
      width={size * 2.25}
      height={size}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" fill="#ec74b0" />
      <circle cx="36" cy="16" r="15" fill="#d42f4d" fillOpacity="0.92" />
      <circle cx="56" cy="16" r="15" fill="#4332b0" fillOpacity="0.92" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="logo">
      <LogoMark size={26} />
      <span className="logo-text">
        <strong>Triple Dot</strong>
        <small>AI Technologies</small>
      </span>
    </span>
  )
}

export function Seo({ title, description }: { title: string; description: string }) {
  return (
    <>
      <title>{`${title} | ${company.name}`}</title>
      <meta name="description" content={description} />
    </>
  )
}

export function SectionHead({
  eyebrow,
  title,
  children,
  center,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
  center?: boolean
}) {
  return (
    <div className={`section-head${center ? ' is-center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="lead">{children}</p>}
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  children,
  actions,
}: {
  eyebrow: string
  title: string
  children: ReactNode
  actions?: ReactNode
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{children}</p>
        {actions && <div className="actions">{actions}</div>}
      </div>
    </section>
  )
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" size={17} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string
  text: string
  primary: { to: string; label: string }
  secondary?: { to: string; label: string }
}) {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-band">
          <div>
            <Dots />
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="actions">
            <Link className="btn btn-primary" to={primary.to}>
              {primary.label} <Icon name="arrow" size={18} />
            </Link>
            {secondary && (
              <Link className="btn btn-outline" to={secondary.to}>
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function PartnerList() {
  return (
    <ul className="partner-list">
      {partners.map((p) => (
        <li key={p}>
          <Icon name="building" size={20} />
          {p}
        </li>
      ))}
    </ul>
  )
}

export function HiringNetwork() {
  return (
    <>
      <ul className="name-cloud">
        {hiringCompanies.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="fineprint">
        These names show where our hiring contacts work. They do not imply formal partnerships with
        these companies, and all company names belong to their respective owners.
      </p>
    </>
  )
}

export function HubCards() {
  return (
    <ul className="hub-grid">
      {hubs.map((h) => (
        <li key={h.city} className="hub-card">
          <Icon name="pin" />
          <strong>{h.city}</strong>
          <span>{h.state}</span>
        </li>
      ))}
    </ul>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{company.tagline}</p>
          <p className="footer-sub">
            Practical technical education and technology services, from Coimbatore, Hyderabad,
            Chennai and the United Kingdom.
          </p>
        </div>
        <div>
          <h3>Company</h3>
          <Link to="/about">About</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/learning-portal">Learning Portal</Link>
          <Link to="/contact">Contact us</Link>
        </div>
        <div>
          <h3>Services</h3>
          {services.map((s) => (
            <Link key={s.id} to={`/services/${s.id}`}>
              {s.title}
            </Link>
          ))}
          <Link to="/edtech">EdTech Academy</Link>
        </div>
        <div>
          <h3>Reach us</h3>
          <a href={company.phoneHref}>{company.phoneDisplay}</a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
            target="_blank"
            rel="noreferrer"
          >
            {company.address}
          </a>
          <div className="footer-social">
            <a
              className="social-logo is-linkedin"
              href={company.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Triple Dot on LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 13.4c0-3.1-1.66-4.54-3.87-4.54a3.34 3.34 0 0 0-3.02 1.66V8.5h-3.37c.04.95 0 11.5 0 11.5h3.37v-6.42c0-.34.03-.69.13-.93.27-.69.9-1.4 1.95-1.4 1.37 0 1.92 1.05 1.92 2.58V20h3.38v-6.6Z" />
              </svg>
            </a>
            <a
              className="social-logo is-instagram"
              href={company.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Triple Dot on Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.2" cy="6.8" r="1.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-base">
        <span>
          © {new Date().getFullYear()} {company.name}
        </span>
      </div>
    </footer>
  )
}

// Section heading used on the service and EdTech pages
export function SxHead({
  eyebrow,
  title,
  children,
  center,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
  center?: boolean
}) {
  return (
    <div className={`sx-head${center ? ' is-center' : ''}`}>
      <p className="sx-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="sx-head-lead">{children}</p>}
    </div>
  )
}
