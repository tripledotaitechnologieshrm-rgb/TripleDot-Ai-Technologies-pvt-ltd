import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { CtaBand, HiringNetwork, PartnerList, SectionHead, Seo, SxHead } from '../components/ui'
import { audiences, company, journey, portalFeatures, programs, stats } from '../data/site'

const tracks = ['Web Development', 'Data and AI'] as const

const modes = [
  { icon: 'video' as const, title: 'Live classes', text: 'Instructor-led sessions where you can ask questions.' },
  { icon: 'play' as const, title: 'Recorded courses', text: 'Self-paced lessons to revisit alongside college or work.' },
  { icon: 'code' as const, title: 'Real projects', text: 'Portfolio projects reviewed by mentors.' },
  { icon: 'users' as const, title: 'Mentorship', text: 'Feedback and career guidance as you build.' },
]

const why = [
  {
    icon: 'target' as const,
    title: 'Project-first, not certificate-first',
    text: 'You develop real projects that can be demonstrated to employers.',
  },
  {
    icon: 'wallet' as const,
    title: 'Priced for Indian students',
    text: 'Programs are designed so mentor-guided, practical education stays affordable.',
  },
  {
    icon: 'users' as const,
    title: 'Mentorship throughout',
    text: 'Mentor reviews, feedback and career guidance support you as you build.',
  },
]

export default function EdTech() {
  return (
    <div className="sd sx tone-blue">
      <Seo
        title="EdTech"
        description="Triple Dot EdTech: job-ready web development, data and AI programs with live classes, recorded courses, real projects, mentorship and placement support."
      />

      {/* Hero (same design as the service pages) */}
      <section className="sx-hero">
        <div className="sx-hero-bg" aria-hidden="true">
          <span className="sx-hero-grid-lines" />
          <span className="sx-hero-glow is-a" />
          <span className="sx-hero-glow is-b" />
          <span className="sx-hero-mark">
            <Icon name="grad" size={420} />
          </span>
        </div>

        <div className="container sx-hero-inner">
          <div className="sx-hero-copy">
            <h1>EdTech Academy</h1>
            <p className="sx-tagline">Real skills. Real projects. Real careers.</p>
            <p className="sx-lead">
              Industry-relevant learning for students and professionals across web development, data
              and AI. Live classes, recorded courses, real projects and mentorship, with support all
              the way to your first job.
            </p>

            <div className="sx-actions">
              <Link className="sx-btn is-light" to="/contact?topic=academy">
                Enquire about programs <Icon name="arrow" size={18} />
              </Link>
              <Link className="sx-btn is-ghost" to="/learning-portal">
                Learning Portal
              </Link>
            </div>

            <ul className="sx-trust" aria-label="How you learn">
              {modes.map((m) => (
                <li key={m.title}>
                  <Icon name="check" size={14} />
                  {m.title}
                </li>
              ))}
            </ul>
          </div>

          <aside className="sx-glance" aria-label="At a glance">
            <div className="sx-glance-head">
              <span className="sx-glance-icon">
                <Icon name="grad" size={22} />
              </span>
              <div>
                <p className="sx-glance-title">At a glance</p>
                <strong>{programs.length} job-ready programs</strong>
              </div>
            </div>
            <dl className="sx-glance-stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd>{s.value}</dd>
                  <dt>{s.label}</dt>
                </div>
              ))}
            </dl>
            <ul className="sx-glance-list">
              {modes.map((m) => (
                <li key={m.title}>
                  <span className="sx-tick">
                    <Icon name="check" size={11} />
                  </span>
                  {m.title}
                </li>
              ))}
            </ul>
            <div className="sx-objective">
              <span className="sx-objective-icon">
                <Icon name="target" size={18} />
              </span>
              <div>
                <small>Outcome</small>
                <p>A portfolio of real projects and support all the way to your first job.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Programs */}
      <section className="section" id="programs">
        <div className="container">
          <div className="sx-head-row">
            <SxHead eyebrow="Programs" title={`${programs.length} programs across web, data and AI`}>
              Pick a track. Every program is project-based and mentor-guided.
            </SxHead>
            <Link className="sx-text-link" to="/contact?topic=academy">
              Help me choose <Icon name="arrow" size={16} />
            </Link>
          </div>
          {tracks.map((track) => {
            const list = programs.filter((p) => p.track === track)
            return (
              <div key={track} className="sx-track">
                <div className="sx-track-head">
                  <span className="sx-track-icon">
                    <Icon name={track === 'Web Development' ? 'layers' : 'nodes'} size={18} />
                  </span>
                  <h3>{track}</h3>
                  <span className="sx-track-count">
                    {list.length} program{list.length === 1 ? '' : 's'}
                  </span>
                </div>
                <ul className="sx-progs">
                  {list.map((p) => (
                    <li key={p.id} id={p.id} className="sx-prog">
                      <div className="sx-prog-top">
                        <span className="sx-prog-icon">
                          <Icon name={p.icon} size={22} />
                        </span>
                        <h4>{p.title}</h4>
                      </div>
                      <p>{p.focus}</p>
                      {p.points && (
                        <ul className="sx-prog-points">
                          {p.points.slice(0, 4).map((pt) => (
                            <li key={pt}>
                              <span className="sx-tick">
                                <Icon name="check" size={10} />
                              </span>
                              {pt}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link className="sx-prog-link" to="/contact?topic=academy">
                        <span>
                          Enquire<span className="sr-only"> about {p.title}</span>
                        </span>
                        <span className="sx-prog-arrow">
                          <Icon name="arrow" size={15} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* How you learn */}
      <section className="section tint">
        <div className="container">
          <SxHead eyebrow="How you learn" title="Four ways we teach" center>
            Mix live teaching with self-paced study, then put it to work on real projects.
          </SxHead>
          <div className="sx-benefits is-four">
            {modes.map((m, i) => (
              <article key={m.title} className="sx-benefit">
                <span className="sx-benefit-num" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="sx-benefit-icon">
                  <Icon name={m.icon} size={24} />
                </span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Your journey" title="Three dots, one journey">
            Every program follows the same path, from understanding a concept to showing an employer
            what you built with it.
          </SectionHead>
          <ol className="dj">
            {journey.map((j, i) => (
              <li key={j.step} className={`dj-step tone-${j.tone}`}>
                <div className="dj-marker" aria-hidden="true">
                  <span className="dj-dot">
                    <Icon name={(['video', 'code', 'briefcase'] as const)[i % 3]} size={26} />
                  </span>
                </div>
                <div className="dj-card">
                  <p className="dj-kicker">
                    <span className="dj-num">{String(i + 1).padStart(2, '0')}</span>
                    {j.step}
                  </p>
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why */}
      <section className="section tint">
        <div className="container sx-why">
          <div className="sx-why-copy">
            <SxHead
              eyebrow="Why learn with us"
              title="A portfolio opens the door, not a stack of certificates"
            >
              We focus on what employers actually look at: work you have built and can explain.
            </SxHead>
            <Link className="sx-btn is-solid" to="/contact?topic=academy">
              Enquire about programs <Icon name="arrow" size={18} />
            </Link>
          </div>
          <ol className="sx-why-list">
            {why.map((w, i) => (
              <li key={w.title}>
                <span className="sx-why-icon">
                  <Icon name={w.icon} size={22} />
                </span>
                <div>
                  <small>Reason {String(i + 1).padStart(2, '0')}</small>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section">
        <div className="container">
          <SxHead eyebrow="Who it's for" title="Wherever you are starting from" center>
            Programs that meet you where you are, whatever stage you are at.
          </SxHead>
          <ul className="sx-aud">
            {audiences.map((a) => (
              <li key={a.title} className="sx-aud-card">
                <span className="sx-aud-icon">
                  <Icon name={a.icon} size={22} />
                </span>
                <h3>{a.title}</h3>
                <ul>
                  {a.points.map((p) => (
                    <li key={p}>
                      <span className="sx-tick">
                        <Icon name="check" size={10} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Learning portal */}
      <section className="section tint">
        <div className="container">
          <div className="sx-head-row">
            <SxHead eyebrow="Learning Portal" title="Our own platform to learn and practise">
              Courses, assignments and progress tracking in one place.
            </SxHead>
            <Link className="sx-text-link" to="/learning-portal">
              Explore the portal <Icon name="arrow" size={16} />
            </Link>
          </div>
          <ul className="sx-portal">
            {portalFeatures.slice(0, 6).map((f) => (
              <li key={f.title}>
                <span className="sx-portal-icon">
                  <Icon name={f.icon} size={20} />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partners + hiring */}
      <section className="section">
        <div className="container sx-network">
          <div className="sx-panel">
            <span className="sx-panel-icon">
              <Icon name="building" size={22} />
            </span>
            <SxHead eyebrow="Educational partners" title="Institutions with signed MoUs">
              Institutional collaborations that support industry-ready training for students.
            </SxHead>
            <PartnerList />
          </div>
          <div className="sx-panel">
            <span className="sx-panel-icon">
              <Icon name="briefcase" size={22} />
            </span>
            <SxHead eyebrow="Hiring network" title="Your work, in front of people who hire">
              Our team is connected with HR professionals and hiring managers working at companies
              including:
            </SxHead>
            <HiringNetwork />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to start learning?"
        text={`Talk to us about a program or a college partnership. Call ${company.phoneDisplay} or send us a message.`}
        primary={{ to: '/contact?topic=academy', label: 'Enquire now' }}
        secondary={{ to: '/learning-portal', label: 'Learning Portal' }}
      />
    </div>
  )
}
