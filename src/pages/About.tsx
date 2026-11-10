import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { CtaBand, PartnerList, SectionHead, Seo } from '../components/ui'
import { hubs, stats, values } from '../data/site'
import type { IconName } from '../components/Icon'

const TONES = ['blue', 'coral', 'teal', 'green'] as const

const questions = [
  'What should I learn?',
  'Which technical skills are valuable?',
  'Will this effort lead to a job?',
]

const divisions: { title: string; icon: IconName; tone: string; text: string; to: string }[] = [
  {
    title: 'Academy',
    icon: 'grad',
    tone: 'blue',
    text: 'Educates students and professionals through industry-relevant learning, projects and mentorship.',
    to: '/edtech',
  },
  {
    title: 'Technology and business services',
    icon: 'briefcase',
    tone: 'coral',
    text: 'Delivers digital and technology solutions to businesses, from software to marketing and automation.',
    to: '/services',
  },
  {
    title: 'Learning technology',
    icon: 'layers',
    tone: 'teal',
    text: 'Supports and manages the educational experience through our own Learning Portal.',
    to: '/learning-portal',
  },
]

// One icon and one supporting line per value, in the same order as `values`
const valueIcons: IconName[] = ['book', 'code', 'target', 'wallet', 'users', 'spark', 'chart']
const valueNotes = [
  'Learning by doing, with hands-on work in every class.',
  'Building real projects that become a portfolio you can show.',
  'Teaching the skills the industry actually hires for.',
  'Keeping quality education within reach for students.',
  'Guidance from mentors, from first lesson to first job.',
  'Approaching every challenge with curiosity and fresh thinking.',
  'Judging our work by the results it creates.',
]

function ValuesCarousel() {
  const track = useRef<HTMLUListElement>(null)
  const [pos, setPos] = useState({ progress: 0, atStart: true, atEnd: false })

  const update = () => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setPos({
      progress: max > 0 ? el.scrollLeft / max : 1,
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
    })
  }

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="ab-vc">
      <div className="ab-vc-head">
        <div>
          <p className="eyebrow">What we value</p>
          <h2>The principles behind the work</h2>
          <p className="ab-vc-lead">
            {values.length} commitments that shape how we teach, build and deliver.
          </p>
        </div>
        <div className="ab-vc-nav">
          <button
            type="button"
            className="ab-vc-btn is-prev"
            onClick={() => scrollByCard(-1)}
            disabled={pos.atStart}
            aria-label="Previous principles"
          >
            <Icon name="arrow" size={18} />
          </button>
          <button
            type="button"
            className="ab-vc-btn"
            onClick={() => scrollByCard(1)}
            disabled={pos.atEnd}
            aria-label="Next principles"
          >
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>

      <div className={`ab-vc-viewport${pos.atStart ? ' at-start' : ''}${pos.atEnd ? ' at-end' : ''}`}>
        <ul
          ref={track}
          className="ab-vc-track"
          onScroll={update}
          tabIndex={0}
          aria-label="Our principles, scroll sideways to see all"
        >
          {values.map((v, i) => (
            <li key={v} className="ab-vc-card">
              <span className="ab-vc-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="ab-vc-icon">
                <Icon name={valueIcons[i] ?? 'check'} size={22} />
              </span>
              <h3>{v}</h3>
              <p>{valueNotes[i]}</p>
              <span className="ab-vc-foot" aria-hidden="true">
                Principle {i + 1} of {values.length}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ab-vc-progress" aria-hidden="true">
        <span style={{ width: `${Math.max(12, pos.progress * 100)}%` }} />
      </div>
    </div>
  )
}

const leaders = [
  { initials: 'FT', name: 'Fahmid T.', role: 'Founder', tone: 'blue' },
  { initials: 'AS', name: 'Aswath Satish', role: 'Co-founder', tone: 'coral' },
]

export default function About() {
  const [flipped, setFlipped] = useState(false)

  return (
    <>
      <Seo
        title="About us"
        description="Triple Dot AI Technologies was started to give students a practical learning experience that goes beyond courses and certificates. Learn about our story, mission, values and team."
      />

      {/* Hero */}
      <section className="sx sx-hero ab-hero">
        <div className="sx-hero-bg" aria-hidden="true">
          <span className="sx-hero-grid-lines" />
          <span className="sx-hero-glow is-a" />
          <span className="sx-hero-glow is-b" />
        </div>
        <div className="container sx-hero-inner">
          <div className="sx-hero-copy">
            <h1>Built around what actually gets people hired</h1>
            <p className="sx-tagline">Practical education. Real technology. One team.</p>
            <p className="sx-lead">
              We are a technology company combining practical technical education with technology
              and digital services, working from Coimbatore, Hyderabad, Chennai and the United Kingdom.
            </p>
            <div className="sx-actions">
              <Link className="sx-btn is-light" to="/contact">
                Get in touch <Icon name="arrow" size={18} />
              </Link>
              <a className="sx-btn is-ghost" href="#our-story">
                Read our story
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

          <div
            className={`ab-flip${flipped ? ' is-flipped' : ''}`}
            onClick={(e) => {
              // Tap to flip on touch screens; let links on the back work normally
              if (!(e.target as HTMLElement).closest('a')) setFlipped((f) => !f)
            }}
          >
            <div className="ab-flip-inner">
              {/* Front: at a glance */}
              <aside className="ab-glance ab-flip-face" aria-label="Triple Dot at a glance">
                <div className="ab-glance-head">
                  <p className="ab-glance-title">At a glance</p>
                  <span className="ab-flip-hint" aria-hidden="true">
                    <span className="on-hover">Hover to flip</span>
                    <span className="on-touch">Tap to flip</span>
                    <Icon name="arrow" size={13} />
                  </span>
                </div>
                <dl className="ab-glance-stats">
                  {stats.map((s, i) => (
                    <div key={s.label} className={`tone-${TONES[i % TONES.length]}`}>
                      <dd>{s.value}</dd>
                      <dt>{s.label}</dt>
                    </div>
                  ))}
                </dl>
                <ul className="ab-glance-hubs">
                  {hubs.map((h) => (
                    <li key={h.city}>
                      <Icon name="pin" size={15} />
                      {h.city}
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Back: who we are */}
              <aside className="ab-flip-face ab-flip-back" aria-label="Who we are">
                <span className="ab-flip-glow" aria-hidden="true" />
                <p className="ab-flip-eyebrow">Who we are</p>
                <h2 className="ab-flip-title">Education and technology, under one roof</h2>
                <ul className="ab-flip-list">
                  {divisions.map((d) => (
                    <li key={d.title}>
                      <span className="ab-flip-icon">
                        <Icon name={d.icon} size={16} />
                      </span>
                      <strong>{d.title}</strong>
                    </li>
                  ))}
                </ul>
                <div className="ab-flip-foot">
                  <span>
                    Founded by <strong>Fahmid T.</strong>
                  </span>
                  <Link to="/contact" className="ab-flip-cta">
                    Talk to us <Icon name="arrow" size={14} />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section" id="our-story">
        <div className="container ab-story">
          <div>
            <SectionHead eyebrow="Our story" title="It started with three hard questions" />
            <div className="prose ab-prose">
              <p>
                Every student eventually asks the same things. Our founder, Fahmid T., started
                Triple Dot to address the challenges students face in answering them.
              </p>
              <p>
                The objective was a practical learning experience that goes beyond traditional
                courses and certificates, one that helps students develop demonstrable skills and
                project portfolios to support their career opportunities.
              </p>
            </div>
          </div>

          <div className="ab-story-side">
            <ol className="ab-questions">
              {questions.map((q, i) => (
                <li key={q} className={`tone-${TONES[i]}`}>
                  <span className="ab-q-num">Q{i + 1}</span>
                  <span className="ab-q-text">{q}</span>
                </li>
              ))}
            </ol>

            <figure className="ab-quote">
              <span className="ab-quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>
                <p>
                  I wanted to create the kind of learning experience I wish I had when I was
                  figuring things out.
                </p>
              </blockquote>
              <figcaption>
                <span className="ab-avatar tone-blue" aria-hidden="true">
                  FT
                </span>
                <span>
                  <strong>Fahmid T.</strong>
                  <small>Founder, Triple Dot</small>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="section tint">
        <div className="container">
          <SectionHead eyebrow="Purpose" title="Why we exist, and where we are going" center />
          <div className="ab-mv">
            <article className="ab-mv-card tone-blue">
              <div className="ab-mv-head">
                <span className="icon-tile">
                  <Icon name="target" size={24} />
                </span>
                <p className="ab-label">Our mission</p>
              </div>
              <p className="ab-mv-text">
                Make every learner job-ready by teaching the skills the industry actually hires
                for, through real projects and mentorship, at a price Indian students can afford.
              </p>
            </article>
            <article className="ab-mv-card tone-coral">
              <div className="ab-mv-head">
                <span className="icon-tile">
                  <Icon name="rocket" size={24} />
                </span>
                <p className="ab-label">Our vision</p>
              </div>
              <p className="ab-mv-text">
                A future where a student&rsquo;s portfolio, not a stack of certificates, opens the
                door to their first job.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How we are structured" title="Three parts of one company">
            Education, services and our own learning technology, each feeding the others.
          </SectionHead>
          <ul className="ab-divs">
            {divisions.map((d, i) => (
              <li key={d.title} className={`ab-div tone-${d.tone}`}>
                <div className="ab-div-top">
                  <span className="icon-tile">
                    <Icon name={d.icon} size={24} />
                  </span>
                  <span className="ab-div-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
                <Link className="ab-div-link" to={d.to}>
                  Learn more
                  <span className="sr-only">: {d.title}</span>
                  <Icon name="arrow" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="section tint">
        <div className="container">
          <ValuesCarousel />
        </div>
      </section>

      {/* Impact band */}
      <section className="ab-impact" aria-labelledby="impact-title">
        <div className="container ab-impact-inner">
          <div>
            <p className="eyebrow">Our impact</p>
            <h2 id="impact-title">Where we are today</h2>
          </div>
          <dl className="ab-impact-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dd>{s.value}</dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Leadership + partners */}
      <section className="section">
        <div className="container ab-team">
          <div>
            <SectionHead eyebrow="Leadership" title="The people leading Triple Dot" />
            <ul className="ab-people">
              {leaders.map((p) => (
                <li key={p.name} className={`tone-${p.tone}`}>
                  <span className="ab-avatar is-large" aria-hidden="true">
                    {p.initials}
                  </span>
                  <span>
                    <strong>{p.name}</strong>
                    <small>{p.role}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ab-partners">
            <SectionHead eyebrow="Educational partners" title="Institutions with signed MoUs" />
            <PartnerList />
          </div>
        </div>
      </section>

      {/* Hubs */}
      <section className="section tint">
        <div className="container">
          <SectionHead eyebrow="Our hubs" title="Four hubs across India and the UK" />
          <ul className="ab-hubs">
            {hubs.map((h, i) => (
              <li key={h.city} className={`ab-hub tone-${TONES[i % TONES.length]}`}>
                <span className="icon-tile">
                  <Icon name="pin" size={22} />
                </span>
                <span>
                  <small>Hub {String(i + 1).padStart(2, '0')}</small>
                  <strong>{h.city}</strong>
                  <span>{h.state}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Work with us, or learn with us"
        text="Whether you are a student, a college or a business, we would like to hear from you."
        primary={{ to: '/contact', label: 'Contact us' }}
        secondary={{ to: '/careers', label: 'Careers' }}
      />
    </>
  )
}
