import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { CtaBand, SectionHead, Seo } from '../components/ui'
import { services } from '../data/site'
import type { IconName } from '../components/Icon'

// Every service on this page: the four business services plus EdTech
const cards: {
  id: string
  icon: IconName
  title: string
  tagline: string
  intro: string
  items: string[]
  to: string
}[] = [
  ...services.map((s) => ({
    id: s.id,
    icon: s.icon,
    title: s.title,
    tagline: s.tagline,
    intro: s.intro,
    items: s.items,
    to: `/services/${s.id}`,
  })),
  {
    id: 'edtech',
    icon: 'grad',
    title: 'EdTech Academy',
    tagline: 'Real skills. Real projects. Real careers.',
    intro:
      'Job-ready programs in web development, data and AI, with live classes, recorded courses, real projects, mentorship and placement support.',
    items: ['Live and recorded classes', 'Real portfolio projects', 'Mentorship and feedback', 'Internship and placement support'],
    to: '/edtech',
  },
]

const TONES = ['blue', 'coral', 'teal', 'green'] as const

const approach = [
  {
    icon: 'chat' as const,
    title: 'Understand the problem',
    text: 'We start with your business requirement, not with a technology we want to use.',
  },
  {
    icon: 'puzzle' as const,
    title: 'Build the right solution',
    text: 'We design and deliver what suits that requirement, rather than following trends blindly.',
  },
  {
    icon: 'chart' as const,
    title: 'Deliver measurable results',
    text: 'We judge the work by what it changes for your business.',
  },
]

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Digital marketing, software development, automation and custom technology services from Triple Dot AI Technologies, built around your business requirement."
      />

      {/* Hero */}
      <section className="sv-hero">
        <div className="sd-hero-bg" aria-hidden="true" />
        <div className="container sv-hero-grid">
          <div>
            <p className="eyebrow">Business services</p>
            <h1>Technology and marketing that solve the actual problem</h1>
            <p className="sd-lead">
              Alongside our Academy, we provide technology and digital services to businesses,
              from building your software to growing your brand and automating your operations.
            </p>
            <div className="actions">
              <Link className="btn btn-primary" to="/contact?topic=services">
                Discuss your project <Icon name="arrow" size={18} />
              </Link>
              <a className="btn btn-outline" href="#all-services">
                Explore services
              </a>
            </div>
          </div>
          <ul className="sv-jump" aria-label="Jump to a service">
            {cards.map((s, i) => (
              <li key={s.id} className={`tone-${TONES[i % TONES.length]}`}>
                <Link to={s.to}>
                  <span className="icon-tile">
                    <Icon name={s.icon} size={18} />
                  </span>
                  <span>{s.title}</span>
                  <Icon name="arrow" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* All services */}
      <section className="section" id="all-services">
        <div className="container">
          <SectionHead eyebrow="What we offer" title={`${cards.length} services, one team`}>
            Pick a service to see what is included, how we work and who it is for.
          </SectionHead>
          <ul className="sv-grid">
            {cards.map((s, i) => (
              <li
                key={s.id}
                className={`sv-card tone-${TONES[i % TONES.length]}`}
                onPointerMove={(e) => {
                  // Feed the cursor position to the spotlight (CSS vars, no re-render)
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                }}
              >
                <span className="sv-card-mark" aria-hidden="true">
                  <Icon name={s.icon} size={140} />
                </span>

                <div className="sv-card-top">
                  <span className="icon-tile">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <span className="sv-card-meta">
                    <span className="sv-card-num">Service {String(i + 1).padStart(2, '0')}</span>
                    <span className="sv-card-kind">{s.id === 'edtech' ? 'Academy' : 'For businesses'}</span>
                  </span>
                </div>

                <div className="sv-card-head">
                  <h3>{s.title}</h3>
                  <p className="sv-card-tagline">{s.tagline}</p>
                </div>

                <p className="sv-card-text">{s.intro}</p>

                <div className="sv-card-included">
                  <p className="sv-card-label">What&rsquo;s included</p>
                  <ul className="sv-card-items">
                    {s.items.slice(0, 4).map((item) => (
                      <li key={item}>
                        <span className="sv-check" aria-hidden="true">
                          <Icon name="check" size={11} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link className="sv-card-link" to={s.to}>
                  <span className="sv-card-link-text">
                    Explore service
                    <span className="sr-only">: {s.title}</span>
                  </span>
                  <span className="offer-arrow">
                    <Icon name="arrow" size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section className="section tint">
        <div className="container">
          <SectionHead eyebrow="Our approach" title="How we take on a project" center />
          <ol className="sv-approach">
            {approach.map((a, i) => (
              <li key={a.title} className={`tone-${TONES[i % TONES.length]}`}>
                <div className="sv-approach-top">
                  <span className="icon-tile">
                    <Icon name={a.icon} size={22} />
                  </span>
                  <span className="sv-approach-step">Step 0{i + 1}</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                {i < approach.length - 1 && (
                  <span className="sv-approach-next" aria-hidden="true">
                    <Icon name="arrow" size={14} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Have a problem worth solving?"
        text="Tell us about your requirement and we will work out the appropriate solution with you."
        primary={{ to: '/contact?topic=services', label: 'Talk to us' }}
      />
    </>
  )
}
