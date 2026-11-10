import { useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/site'
import type { IconName } from './Icon'
import { Icon } from './Icon'

const TONES = ['tone-blue', 'tone-coral', 'tone-teal', 'tone-green']

// The business services plus the EdTech Academy, as one pack of cards
const CARDS: { id: string; title: string; short: string; icon: IconName; to: string; cta: string }[] = [
  ...services.map((s) => ({
    id: s.id,
    title: s.title,
    short: s.short,
    icon: s.icon,
    to: `/services/${s.id}`,
    cta: 'Explore service',
  })),
  {
    id: 'academy',
    title: 'EdTech Academy',
    short: 'Live classes, real projects and mentorship across web, data and AI.',
    icon: 'grad',
    to: '/edtech',
    cta: 'Explore EdTech',
  },
]

/**
 * A 3D pack of service cards seen from the side.
 * - Closed: cards lie stacked like a pack of playing cards.
 * - Pack hovered: cards spread apart (still side-on) and each shows a title tag.
 * - Card hovered: that card lifts and turns flat to face the viewer, showing its full face.
 */
export function ServiceDeck() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const count = CARDS.length

  // Click 1 (touch only): spread the pack. Click on a card: turn it face-up.
  // Click on the face-up card: follow its link.
  const onClick = (e: MouseEvent, i: number) => {
    if (!open) {
      e.preventDefault()
      setOpen(true)
    } else if (active !== i) {
      e.preventDefault()
      setActive(i)
    }
  }

  return (
    <div
      className={`deck${open ? ' is-open' : ''}${active !== null ? ' has-active' : ''}`}
      style={{ '--count': count } as CSSProperties}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setActive(null)
      }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') {
          setOpen(false)
          setActive(null)
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false)
          setActive(null)
        }
      }}
      onPointerMove={(e) => {
        // Feed the cursor position to the spotlight (CSS vars, no re-render)
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    >
      <div className="deck-aura" aria-hidden="true">
        <span className="deck-spotlight" />
        <span className="deck-glow" />
        <span className="deck-orbit is-outer">
          <span className="deck-orbit-dot" />
        </span>
        <span className="deck-orbit is-inner">
          <span className="deck-orbit-dot" />
        </span>
        {Array.from({ length: 8 }, (_, n) => (
          <span key={n} className="deck-spark" style={{ '--n': n } as CSSProperties} />
        ))}
      </div>

      <ul className="deck-cards" aria-label="Our services">
        {CARDS.map((s, i) => (
          <li
            key={s.id}
            className={`deck-slot ${TONES[i % TONES.length]}${active === i ? ' is-active' : ''}`}
            style={
              {
                '--i': i,
                '--from-center': i - (count - 1) / 2,
                '--z': count - i,
              } as CSSProperties
            }
          >
            <Link
              to={s.to}
              className="deck-hit"
              aria-label={`${s.title}: ${s.short}`}
              onClick={(e) => onClick(e, i)}
              onFocus={() => setOpen(true)}
            >
              <span className="deck-card" aria-hidden="true">
                <span className="deck-card-index">0{i + 1}</span>
                <span className="deck-card-top">
                  <span className="icon-tile">
                    <Icon name={s.icon} size={18} />
                  </span>
                  <span className="deck-card-pip" />
                </span>
                <span className="deck-card-body">
                  <strong>{s.title}</strong>
                  <small>{s.short}</small>
                </span>
                <span className="deck-card-foot">
                  {s.cta} <Icon name="arrow" size={14} />
                </span>
              </span>

              <span className="deck-tag" aria-hidden="true">
                <span className="deck-tag-line" />
                <span className="deck-tag-pill">
                  <span className="deck-tag-num">0{i + 1}</span>
                  {s.title}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="deck-hint" aria-hidden="true">
        <span className="deck-hint-dot" />
        {!open ? (
          <>
            <span className="on-hover">Hover the pack to explore our services</span>
            <span className="on-touch">Tap the pack to explore our services</span>
          </>
        ) : active === null ? (
          <>
            <span className="on-hover">Click a card to turn it over</span>
            <span className="on-touch">Tap a card to turn it over</span>
          </>
        ) : (
          <>
            <span className="on-hover">Click the card again to view the service</span>
            <span className="on-touch">Tap the card again to view the service</span>
          </>
        )}
      </p>
    </div>
  )
}
