import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EnquiryForm } from '../components/EnquiryForm'
import { Icon } from '../components/Icon'
import { Seo, SxHead } from '../components/ui'
import { company, hubs } from '../data/site'

const topics = [
  { value: 'academy', label: 'Academy programs' },
  { value: 'services', label: 'Business services' },
  { value: 'college', label: 'School or college partnership' },
  { value: 'portal', label: 'Learning Portal' },
  { value: 'careers', label: 'Job application' },
  { value: 'other', label: 'Something else' },
]

const mapSrc = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
const directionsHref = (query: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`

function HubMap() {
  const [active, setActive] = useState(0)
  const hub = hubs[active]
  // Hovering a hub for a moment shows it on the map (a short pause so the map
  // does not reload while the mouse just passes over the tabs)
  const hoverTimer = useRef<number | undefined>(undefined)
  const previewHub = (i: number) => {
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setActive(i), 300)
  }
  const cancelPreview = () => window.clearTimeout(hoverTimer.current)
  useEffect(() => cancelPreview, [])
  const query = hub.mapQuery ?? `${hub.city}, ${hub.state}`

  return (
    <div className="ct-map is-side">
      <div className="ct-hubs" role="tablist" aria-label="Choose a hub">
        {hubs.map((h, i) => (
          <button
            key={h.city}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls="ct-map-frame"
            className={`ct-hub${active === i ? ' is-active' : ''}`}
            onClick={() => {
              cancelPreview()
              setActive(i)
            }}
            onMouseEnter={() => previewHub(i)}
            onMouseLeave={cancelPreview}
          >
            <span className="ct-hub-icon">
              <Icon name="pin" size={18} />
            </span>
            <span className="ct-hub-text">
              <small>Hub {String(i + 1).padStart(2, '0')}</small>
              <strong>{h.city}</strong>
              <span>{h.state}</span>
            </span>
          </button>
        ))}

        <a className="ct-directions" href={directionsHref(query)} target="_blank" rel="noreferrer">
          <Icon name="arrow" size={16} />
          Get directions to {hub.city}
        </a>
      </div>

      <div className="ct-map-frame" id="ct-map-frame" role="tabpanel">
        <iframe
          key={query}
          title={`Map showing the Triple Dot ${hub.city} hub`}
          src={mapSrc(query)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="ct-map-card">
          <span className="ct-hub-icon">
            <Icon name="pin" size={16} />
          </span>
          <div>
            <strong>Triple Dot, {hub.city}</strong>
            <small>{hub.address ?? hub.state}</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const [params] = useSearchParams()
  const requested = params.get('topic') ?? ''
  const defaultTopic = topics.some((t) => t.value === requested) ? requested : ''
  // Coming from an Apply button on the Careers page
  const role = defaultTopic === 'careers' ? (params.get('role') ?? '').slice(0, 120) : ''
  const defaultMessage = role
    ? `I would like to apply for the ${role} role.\n\nA little about me and my experience:\n`
    : ''

  return (
    <div className="sd sx tone-blue">
      <Seo
        title="Contact us"
        description="Contact Triple Dot AI Technologies about Academy programs, college partnerships, business services or careers. Hubs in Coimbatore, Hyderabad, Chennai and the United Kingdom."
      />

      {/* Hero */}
      <section className="sx-hero">
        <div className="sx-hero-bg" aria-hidden="true">
          <span className="sx-hero-grid-lines" />
          <span className="sx-hero-glow is-a" />
          <span className="sx-hero-glow is-b" />
          <span className="sx-hero-mark">
            <Icon name="chat" size={420} />
          </span>
        </div>

        <div className="container sx-hero-inner ct-hero-inner">
          <div className="sx-hero-copy">
            <h1>Contact us</h1>
            <p className="sx-tagline">Let&rsquo;s talk about what you need.</p>
            <p className="sx-lead">
              Questions about a program, a college partnership, a business project or a role on our
              team are all welcome. Call us, message us, or visit one of our hubs.
            </p>
            <div className="sx-actions">
              <a className="sx-btn is-light" href="#message">
                Send a message <Icon name="arrow" size={18} />
              </a>
              <a className="sx-btn is-ghost" href={company.phoneHref}>
                <Icon name="phone" size={18} /> {company.phoneDisplay}
              </a>
            </div>
            <ul className="sx-trust" aria-label="Our hubs">
              {hubs.map((h) => (
                <li key={h.city}>
                  <Icon name="pin" size={14} />
                  {h.city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Message */}
      <section className="section" id="message">
        <div className="container ct-split">
          <div className="ct-side" id="find-us">
            <SxHead eyebrow="Find us" title="Visit one of our hubs">
              Our hubs across India and the UK. Choose a hub to see it on the map.
            </SxHead>
            <HubMap />
          </div>

          <div className="ct-form">
            <div className="ct-form-head">
              <span className="sx-glance-icon">
                <Icon name={role ? 'briefcase' : 'chat'} size={20} />
              </span>
              <div>
                <h2>{role ? `Apply: ${role}` : 'Send us a message'}</h2>
                <p>Share your details and we will get back to you.</p>
              </div>
            </div>
            <EnquiryForm
              key={defaultMessage}
              topics={topics}
              defaultTopic={defaultTopic}
              defaultMessage={defaultMessage}
              submitLabel={role ? 'Send application' : undefined}
              role={role}
            />
          </div>
        </div>
      </section>

    </div>
  )
}
