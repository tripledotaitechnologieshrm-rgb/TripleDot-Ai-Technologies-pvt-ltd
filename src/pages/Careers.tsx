import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import type { IconName } from '../components/Icon'
import { CtaBand, Seo, SxHead } from '../components/ui'
import { hubs, jobs } from '../data/site'
import type { Job } from '../data/site'

const TEAMS = ['All', 'Business', 'Support'] as const
type Team = (typeof TEAMS)[number]

const teamIcon: Record<Job['team'], IconName> = {
  Business: 'target',
  Support: 'chat',
}

const perks: { icon: IconName; title: string; text: string }[] = [
  { icon: 'rocket', title: 'Real impact', text: 'Your work reaches learners and businesses directly, not a slide deck.' },
  { icon: 'book', title: 'Keep learning', text: 'Work alongside our Academy and keep your own skills sharp.' },
  { icon: 'users', title: 'Small, supportive team', text: 'Work closely with people who review, mentor and help each other.' },
  { icon: 'pin', title: 'Four hubs', text: `Roles across ${hubs.map((h) => h.city).join(', ')}.` },
]

const steps = [
  { title: 'Apply', text: 'Send your details, the role and a link to your work.' },
  { title: 'Intro call', text: 'A short conversation about you, the role and the team.' },
  { title: 'Skills round', text: 'A practical task or discussion based on real work.' },
  { title: 'Offer', text: 'We share the decision and next steps with you quickly.' },
]

const applyLink = (role: string) =>
  `/contact?topic=careers&role=${encodeURIComponent(role)}`

function JobItem({ job, open, onToggle }: { job: Job; open: boolean; onToggle: () => void }) {
  const panelId = `job-panel-${job.id}`
  const btnId = `job-btn-${job.id}`
  return (
    <li className={`cr-job${open ? ' is-open' : ''}`}>
      <h3 className="cr-job-h">
        <button
          id={btnId}
          type="button"
          className="cr-job-btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="cr-job-icon">
            <Icon name={teamIcon[job.team]} size={20} />
          </span>
          <span className="cr-job-main">
            <span className="cr-job-title">{job.title}</span>
            <span className="cr-job-meta">
              <span>
                <Icon name="briefcase" size={13} />
                {job.team}
              </span>
              <span>
                <Icon name="pin" size={13} />
                {job.location}
              </span>
              <span>
                <Icon name="spark" size={13} />
                {job.experience}
              </span>
            </span>
          </span>
          <span className={`cr-job-type${job.type === 'Internship' ? ' is-intern' : ''}`}>
            {job.type}
          </span>
          <span className="cr-job-toggle" aria-hidden="true">
            <Icon name="chevron" size={18} />
          </span>
        </button>
      </h3>

      <div id={panelId} role="region" aria-labelledby={btnId} className="cr-job-panel" inert={!open}>
        <div className="cr-job-inner">
          <div className="cr-job-body">
            <p className="cr-job-summary">{job.summary}</p>
            <div className="cr-job-cols">
              <div>
                <h4>What you will do</h4>
                <ul>
                  {job.responsibilities.map((r) => (
                    <li key={r}>
                      <span className="sx-tick">
                        <Icon name="check" size={10} />
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>What we are looking for</h4>
                <ul>
                  {job.requirements.map((r) => (
                    <li key={r}>
                      <span className="sx-tick">
                        <Icon name="check" size={10} />
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="cr-job-foot">
              <p>
                <Icon name="chat" size={16} />
                Include a link to your portfolio, GitHub or LinkedIn.
              </p>
              <Link className="sx-btn is-solid cr-apply" to={applyLink(job.title)}>
                Apply now <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Careers() {
  const [team, setTeam] = useState<Team>('All')
  const [openId, setOpenId] = useState<string | null>(jobs[0]?.id ?? null)

  const list = team === 'All' ? jobs : jobs.filter((j) => j.team === team)
  const countFor = (t: Team) => (t === 'All' ? jobs.length : jobs.filter((j) => j.team === t).length)

  return (
    <div className="sd sx tone-blue">
      <Seo
        title="Careers"
        description="Join Triple Dot AI Technologies. Open roles in business development, client acquisition and support across Coimbatore, Hyderabad, Chennai and the United Kingdom."
      />

      {/* Hero */}
      <section className="sx-hero">
        <div className="sx-hero-bg" aria-hidden="true">
          <span className="sx-hero-grid-lines" />
          <span className="sx-hero-glow is-a" />
          <span className="sx-hero-glow is-b" />
          <span className="sx-hero-mark">
            <Icon name="briefcase" size={420} />
          </span>
        </div>

        <div className="container sx-hero-inner">
          <div className="sx-hero-copy">
            <h1>Careers at Triple Dot</h1>
            <p className="sx-tagline">Help us grow, connect and support.</p>
            <p className="sx-lead">
              We combine practical technical education with technology and digital services. If you
              enjoy building relationships and helping people succeed, there is a place for you here.
            </p>
            <div className="sx-actions">
              <a className="sx-btn is-light" href="#openings">
                View open roles <Icon name="arrow" size={18} />
              </a>
              <Link className="sx-btn is-ghost" to="/contact?topic=careers">
                General application
              </Link>
            </div>
            <ul className="sx-trust" aria-label="Teams">
              {TEAMS.slice(1).map((t) => (
                <li key={t}>
                  <Icon name="check" size={14} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <aside className="sx-glance cr-glance" aria-label="Hiring at a glance">
            <div className="sx-glance-head">
              <span className="sx-glance-icon">
                <Icon name="briefcase" size={22} />
              </span>
              <div>
                <p className="sx-glance-title">We are hiring</p>
                <strong>
                  {jobs.length} open role{jobs.length === 1 ? '' : 's'}
                </strong>
              </div>
            </div>
            <ul className="cr-glance-teams">
              {TEAMS.slice(1).map((t) => (
                <li key={t}>
                  <span className="cr-glance-icon">
                    <Icon name={teamIcon[t as Job['team']]} size={16} />
                  </span>
                  {t}
                  <b>{countFor(t)}</b>
                </li>
              ))}
            </ul>
            <div className="sx-objective">
              <span className="sx-objective-icon">
                <Icon name="pin" size={18} />
              </span>
              <div>
                <small>Locations</small>
                <p>{hubs.map((h) => h.city).join(' · ')}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Why join */}
      <section className="section">
        <div className="container">
          <SxHead eyebrow="Why join us" title="Work that matters, with people who care" center>
            A small team where your ideas are heard and your work is seen.
          </SxHead>
          <div className="sx-benefits is-four">
            {perks.map((p, i) => (
              <article key={p.title} className="sx-benefit">
                <span className="sx-benefit-num" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="sx-benefit-icon">
                  <Icon name={p.icon} size={24} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="section tint" id="openings">
        <div className="container">
          <div className="sx-head-row">
            <SxHead eyebrow="Open roles" title="Find your role">
              Select a role to see the details, then apply in a couple of minutes.
            </SxHead>
            <span className="cr-count">
              {list.length} role{list.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="cr-filters" role="group" aria-label="Filter by team">
            {TEAMS.map((t) => (
              <button
                key={t}
                type="button"
                className={`cr-filter${team === t ? ' is-active' : ''}`}
                aria-pressed={team === t}
                onClick={() => setTeam(t)}
              >
                {t}
                <span>{countFor(t)}</span>
              </button>
            ))}
          </div>

          {list.length > 0 ? (
            <ul className="cr-jobs">
              {list.map((job) => (
                <JobItem
                  key={job.id}
                  job={job}
                  open={openId === job.id}
                  onToggle={() => setOpenId(openId === job.id ? null : job.id)}
                />
              ))}
            </ul>
          ) : (
            <p className="cr-empty">No open roles in this team right now.</p>
          )}

          <div className="cr-general">
            <span className="cr-general-icon">
              <Icon name="spark" size={22} />
            </span>
            <div>
              <h3>Don&rsquo;t see the right role?</h3>
              <p>Tell us about yourself and what you have built. We are always happy to hear from good people.</p>
            </div>
            <Link className="sx-text-link" to="/contact?topic=careers">
              Send a general application <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <section className="section">
        <div className="container">
          <SxHead eyebrow="Hiring process" title="Simple, clear and quick" center>
            {steps.length} steps from application to offer.
          </SxHead>
          <ol className="sx-process" style={{ '--steps': steps.length } as CSSProperties}>
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="sx-step">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </span>
                <div className="sx-step-card">
                  <small>Step {i + 1}</small>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Starting your career instead?"
        text="Our Academy helps learners build real projects and prepares them for internships and placements."
        primary={{ to: '/edtech', label: 'Explore EdTech' }}
        secondary={{ to: '/contact?topic=careers', label: 'Contact us' }}
      />
    </div>
  )
}
