import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { ServiceDeck } from '../components/ServiceDeck'
import type { IconName } from '../components/Icon'
import { CtaBand, SectionHead, Seo } from '../components/ui'
import { company, hubs, journey, programs, services, stats } from '../data/site'

const process: { title: string; text: string; icon: IconName; tone: string }[] = [
  { icon: 'chat', tone: 'teal', title: 'Understand', text: 'We start with your requirement and the result you need, not with a technology.' },
  { icon: 'puzzle', tone: 'coral', title: 'Plan', text: 'We agree the scope, approach and timeline before any work begins.' },
  { icon: 'code', tone: 'blue', title: 'Build', text: 'We deliver in stages, so you see progress and can give feedback early.' },
  { icon: 'chart', tone: 'green', title: 'Grow', text: 'We measure the outcome and keep improving with you after launch.' },
]

const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: 'target', title: 'Requirement first', text: 'We solve the actual business problem instead of following technology trends.' },
  { icon: 'layers', title: 'End-to-end under one roof', text: 'Software, marketing, automation and training from a single team.' },
  { icon: 'chart', title: 'Measurable results', text: 'We judge our work by what it changes for your business or your career.' },
  { icon: 'users', title: 'Talent we train ourselves', text: 'Our EdTech academy builds the skills the industry, and our own team, depend on.' },
]

const clients: { icon: IconName; title: string; text: string; to: string }[] = [
  { icon: 'briefcase', title: 'Businesses and startups', text: 'Websites, apps, marketing and automation.', to: '/services' },
  { icon: 'building', title: 'Colleges and institutions', text: 'Industry training, MoUs and our Learning Portal.', to: '/edtech' },
  { icon: 'grad', title: 'Students and professionals', text: 'Project-based programs and placement support.', to: '/edtech' },
]

export default function Home() {
  return (
    <>
      <Seo
        title="Technology that moves business forward"
        description="Triple Dot AI Technologies delivers software development, digital marketing, automation and custom technology services, and trains job-ready talent through its EdTech academy."
      />

      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-blob is-blue" />
          <span className="hero-blob is-coral" />
          <span className="hero-blob is-teal" />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-badge">{company.name}</p>
            <h1 className="hero-title">
              <span>Technology that</span>
              <span className="hero-outline">moves business</span>
              <span className="hero-accent">forward.</span>
            </h1>
            <p className="hero-lead">
              We are a technology company that designs, builds and grows digital solutions. From
              software development and digital marketing to workflow automation and custom
              technology, we turn business requirements into measurable results, and through our
              EdTech academy we train the talent the industry needs next.
            </p>
            <ul className="hero-points" aria-label="What we do">
              {services.map((s) => (
                <li key={s.id}>
                  <Icon name={s.icon} size={16} /> {s.title}
                </li>
              ))}
              <li>
                <Icon name="grad" size={16} /> EdTech
              </li>
            </ul>
            <p className="hero-hubs">
              <Icon name="pin" size={16} />
              <span>
                Hubs in{' '}
                {hubs.map((h, i) => (
                  <span key={h.city}>
                    <strong>{h.city}</strong>
                    {i < hubs.length - 2 ? ', ' : i === hubs.length - 2 ? ' and ' : ''}
                  </span>
                ))}
              </span>
            </p>
          </div>
          <ServiceDeck />
        </div>
        <div className="container">
          <dl className="hero-stats">
            {stats.map((s, i) => (
              <div key={s.label} className="hero-stat tone-blue">
                <span className="icon-tile" aria-hidden="true">
                  <Icon name={(['users', 'grad', 'pin'] as const)[i % 3]} size={22} />
                </span>
                <div className="hero-stat-text">
                  <dd>{s.value}</dd>
                  <dt>{s.label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What we do" title="Everything we offer, under one roof">
            Business services that help organizations grow, and EdTech programs that train the
            talent the industry needs next.
          </SectionHead>
          <ul className="offer-grid">
            {[
              ...services.map((s) => ({
                key: s.id,
                icon: s.icon,
                label: 'Business service',
                title: s.title,
                text: s.short,
                points: s.items.slice(0, 2),
                to: `/services/${s.id}`,
                cta: 'Learn more',
              })),
              {
                key: 'academy',
                icon: 'grad' as const,
                label: 'EdTech',
                title: 'EdTech Academy',
                text: 'Live classes, recorded courses, real projects and mentorship across web, data and AI.',
                points: programs.slice(0, 2).map((p) => p.title),
                to: '/edtech',
                cta: 'Explore EdTech',
              },
            ].map((o, i) => (
              <li key={o.key} className="offer-card tone-blue">
                <div className="offer-top">
                  <span className="icon-tile">
                    <Icon name={o.icon} size={22} />
                  </span>
                  <span className="offer-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="offer-head">
                  <span className="offer-label">{o.label}</span>
                  <h3>{o.title}</h3>
                </div>
                <p>{o.text}</p>
                <ul className="offer-points">
                  {o.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={12} />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link className="offer-link" to={o.to}>
                  <span>{o.cta}</span>
                  <span className="offer-arrow">
                    <Icon name="arrow" size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work: applies to every engagement */}
      <section className="section tint">
        <div className="container">
          <SectionHead eyebrow="How we work" title="One clear process for every project" center>
            Whether it is a website, a campaign, an automation or a training program, we follow the
            same path from requirement to result.
          </SectionHead>
          <ol className="hw">
            {process.map((p, i) => (
              <li key={p.title} className={`hw-step tone-${p.tone}`}>
                <span className="hw-icon">
                  <Icon name={p.icon} size={22} />
                </span>
                <span className="hw-num">Step {String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Triple Dot: company-wide */}
      <section className="section">
        <div className="container wy">
          <div className="wy-intro">
            <span className="wy-mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <SectionHead eyebrow="Why Triple Dot" title="One partner for technology, growth and talent">
              We combine a delivery team and a training academy under one roof, so we understand
              both the work and the people who do it.
            </SectionHead>
            <Link className="btn btn-outline" to="/about">
              Read our story <Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className="wy-grid">
            {reasons.map((r, i) => (
              <li key={r.title} className={`wy-card tone-${['teal', 'coral', 'blue', 'green'][i % 4]}`}>
                <div className="wy-card-top">
                  <span className="wy-icon">
                    <Icon name={r.icon} size={22} />
                  </span>
                  <span className="wy-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who we work with */}
      <section className="section tint sd tone-blue">
        <div className="container">
          <SectionHead eyebrow="Who we work with" title="Built for businesses, institutions and learners" />
          <ul className="sd-others">
            {clients.map((c) => (
              <li key={c.title}>
                <Link to={c.to}>
                  <span className="icon-tile">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <span className="sd-others-text">
                    <strong>{c.title}</strong>
                    <small>{c.text}</small>
                  </span>
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EdTech spotlight */}
      <section className="section">
        <div className="container">
          <div className="ed-spot">
            <div className="ed-spot-copy">
              <p className="eyebrow">Triple Dot EdTech</p>
              <h2>Training the talent the industry needs next</h2>
              <p>
                {programs.length} project-based programs across web development, data and AI, with
                live classes, mentorship and placement support.
              </p>
              <div className="actions">
                <Link className="btn btn-primary" to="/edtech">
                  Explore EdTech <Icon name="arrow" size={18} />
                </Link>
                <Link className="btn btn-outline" to="/learning-portal">
                  Learning Portal
                </Link>
              </div>
            </div>
            <ol className="ed-spot-steps">
              {journey.map((j, i) => (
                <li key={j.step} className={`tone-${j.tone}`}>
                  <span className="ed-spot-dot">{i + 1}</span>
                  <div>
                    <strong>{j.step}</strong>
                    <small>{j.title}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let us build something together"
        text={`Talk to us about a business project, a training program or a college partnership. Call ${company.phoneDisplay} or send us a message.`}
        primary={{ to: '/contact', label: 'Contact us' }}
        secondary={{ to: '/services', label: 'Our services' }}
      />
    </>
  )
}
