import { Link, Navigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { CtaBand, Seo, SxHead as Head } from '../components/ui'
import { services } from '../data/site'
import type { CSSProperties } from 'react'

// Every service page uses the brand purple (the 'blue' token), like Digital Marketing
const TONE = 'blue'

export default function ServiceDetail() {
  const { id } = useParams()
  const index = services.findIndex((s) => s.id === id)
  if (index === -1) return <Navigate to="/services" replace />

  const s = services[index]
  const others = services.filter((o) => o.id !== s.id)
  const prev = services[(index - 1 + services.length) % services.length]
  const next = services[(index + 1) % services.length]

  return (
    <div className={`sd sx tone-${TONE}`}>
      <Seo title={s.title} description={`${s.short} ${s.intro}`} />

      {/* Hero */}
      <section className="sx-hero">
        <div className="sx-hero-bg" aria-hidden="true">
          <span className="sx-hero-grid-lines" />
          <span className="sx-hero-glow is-a" />
          <span className="sx-hero-glow is-b" />
          <span className="sx-hero-mark">
            <Icon name={s.icon} size={420} />
          </span>
        </div>

        <div className="container sx-hero-inner">
          <div className="sx-hero-copy">
            <h1>{s.title}</h1>
            <p className="sx-tagline">{s.tagline}</p>
            <p className="sx-lead">{s.intro}</p>

            <div className="sx-actions">
              <Link className="sx-btn is-light" to="/contact?topic=services">
                Discuss your project <Icon name="arrow" size={18} />
              </Link>
              <Link className="sx-btn is-ghost" to="/services">
                All services
              </Link>
            </div>

            <ul className="sx-trust" aria-label="Key benefits">
              {s.benefits.map((b) => (
                <li key={b.title}>
                  <Icon name="check" size={14} />
                  {b.title}
                </li>
              ))}
            </ul>
          </div>

          <aside className="sx-glance" aria-label="At a glance">
            <div className="sx-glance-head">
              <span className="sx-glance-icon">
                <Icon name={s.icon} size={22} />
              </span>
              <div>
                <p className="sx-glance-title">At a glance</p>
                <strong>{s.items.length} core services</strong>
              </div>
            </div>
            <ul className="sx-glance-list">
              {s.items.map((item) => (
                <li key={item}>
                  <span className="sx-tick">
                    <Icon name="check" size={11} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="sx-objective">
              <span className="sx-objective-icon">
                <Icon name="target" size={18} />
              </span>
              <div>
                <small>Objective</small>
                <p>{s.objective}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* What's included */}
      <section className="section">
        <div className="container">
          <div className="sx-head-row">
            <Head eyebrow="What's included" title={`What our ${s.title.toLowerCase()} covers`}>
              Everything you need, delivered by one team and shaped around your goals.
            </Head>
            <Link className="sx-text-link" to="/contact?topic=services">
              Get a custom plan <Icon name="arrow" size={16} />
            </Link>
          </div>
          <ul className="sx-includes">
            {s.items.map((item, i) => (
              <li key={item} className="sx-include">
                <span className="sx-include-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="sx-include-icon">
                  <Icon name="check" size={16} />
                </span>
                <h3>{item}</h3>
                <span className="sx-include-bar" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="section tint">
        <div className="container">
          <Head eyebrow="Why it matters" title="What it does for your business" center />
          <div className="sx-benefits">
            {s.benefits.map((b, i) => (
              <article key={b.title} className="sx-benefit">
                <span className="sx-benefit-num" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="sx-benefit-icon">
                  <Icon name={b.icon} size={24} />
                </span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <Head eyebrow="How we work" title="A clear process, start to finish" center>
            {s.process.length} steps, with you in the loop at every stage.
          </Head>
          <ol className="sx-process" style={{ '--steps': s.process.length } as CSSProperties}>
            {s.process.map((p, i) => (
              <li key={p.title}>
                <span className="sx-step">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </span>
                <div className="sx-step-card">
                  <small>Step {i + 1}</small>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ideal for */}
      <section className="section tint">
        <div className="container sx-ideal">
          <div className="sx-ideal-copy">
            <Head eyebrow="Who it's for" title="A good fit if you are">
              Not sure it fits? Tell us your requirement and we will tell you honestly.
            </Head>
            <Link className="sx-btn is-solid" to="/contact?topic=services">
              Ask us <Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className="sx-ideal-list">
            {s.idealFor.map((who) => (
              <li key={who}>
                <span className="sx-ideal-icon">
                  <Icon name="users" size={18} />
                </span>
                <span>{who}</span>
                <Icon name="check" size={16} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other services */}
      <section className="section">
        <div className="container">
          <div className="sx-head-row">
            <Head eyebrow="Explore more" title="Other services" />
            <Link className="sx-text-link" to="/services">
              View all services <Icon name="arrow" size={16} />
            </Link>
          </div>
          <ul className="sx-others">
            {others.map((o) => (
              <li key={o.id}>
                <Link to={`/services/${o.id}`}>
                  <span className="sx-others-icon">
                    <Icon name={o.icon} size={22} />
                  </span>
                  <strong>{o.title}</strong>
                  <small>{o.short}</small>
                  <span className="sx-others-go">
                    Explore <Icon name="arrow" size={15} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <nav className="sx-pager" aria-label="Service navigation">
            <Link to={`/services/${prev.id}`} className="is-prev">
              <span className="sx-pager-arrow">
                <Icon name="arrow" size={18} />
              </span>
              <span>
                <small>Previous service</small>
                <strong>{prev.title}</strong>
              </span>
            </Link>
            <Link to={`/services/${next.id}`} className="is-next">
              <span>
                <small>Next service</small>
                <strong>{next.title}</strong>
              </span>
              <span className="sx-pager-arrow">
                <Icon name="arrow" size={18} />
              </span>
            </Link>
          </nav>
        </div>
      </section>

      <CtaBand
        title={`Ready to talk about ${s.title.toLowerCase()}?`}
        text="Tell us about your requirement and we will work out the appropriate solution with you."
        primary={{ to: '/contact?topic=services', label: 'Talk to us' }}
        secondary={{ to: '/services', label: 'All services' }}
      />
    </div>
  )
}
