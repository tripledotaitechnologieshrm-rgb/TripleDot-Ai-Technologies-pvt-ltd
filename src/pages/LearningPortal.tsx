import { useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import type { IconName } from '../components/Icon'
import {
  CoursesMock,
  EditorMock,
  LeaderboardMock,
  LoginMock,
  PlacementsMock,
  PortalDashboard,
  PortalWindow,
  SupportMock,
} from '../components/PortalMock'
import { CtaBand, Seo, SxHead } from '../components/ui'
import { portalFeatures } from '../data/site'

const roles: { title: string; icon: IconName }[] = [
  { title: 'Students', icon: 'grad' },
  { title: 'Faculty', icon: 'users' },
  { title: 'Colleges', icon: 'building' },
]

// The same six areas shown on the portal's home-page cube
const showcase: {
  id: string
  label: string
  icon: IconName
  eyebrow: string
  title: string
  text: string
  points: string[]
  screen: ReactNode
}[] = [
  {
    id: 'courses',
    label: 'Courses',
    icon: 'book',
    eyebrow: 'Learning domains',
    title: 'My Courses',
    text: 'Structured learning tracks organised into domains, with progress you can see at a glance.',
    points: ['Courses grouped by learning domain', 'Progress tracked for every course', 'Tasks and assignments in one place'],
    screen: <CoursesMock />,
  },
  {
    id: 'assignments',
    label: 'Assignments',
    icon: 'code',
    eyebrow: 'Code editor',
    title: 'Solve Assignments',
    text: 'Write and run code in the built-in editor. Every solution is checked against test cases.',
    points: ['Built-in coding editor', 'Results checked against test cases', 'Points for every solved task'],
    screen: <EditorMock />,
  },
  {
    id: 'leaderboard',
    label: 'Leaderboard',
    icon: 'trophy',
    eyebrow: 'Rankings',
    title: 'Leaderboard',
    text: 'Successfully solved tasks earn points on the leaderboard, which encourages consistency and participation.',
    points: ['Points for solved tasks', 'See where you stand', 'Rewards showing up consistently'],
    screen: <LeaderboardMock />,
  },
  {
    id: 'placements',
    label: 'Placements',
    icon: 'briefcase',
    eyebrow: 'Career',
    title: 'Placements',
    text: 'A clear pathway toward employment, from skill assessments to placement preparation.',
    points: ['Skill assessments', 'Mock interviews', 'Placement preparation'],
    screen: <PlacementsMock />,
  },
  {
    id: 'support',
    label: 'Support',
    icon: 'chat',
    eyebrow: 'Help & support',
    title: 'Help & Support',
    text: 'Raise a support ticket and get assistance from the support team, with the conversation kept in one place.',
    points: ['Support tickets', 'Answered by the support team', 'Status visible as it progresses'],
    screen: <SupportMock />,
  },
  {
    id: 'login',
    label: 'Login help',
    icon: 'key',
    eyebrow: 'Account',
    title: 'Login Help',
    text: 'College-linked accounts and quick password reset assistance, so students are never locked out for long.',
    points: ['College-linked accounts', 'Clear sign-in messages', 'Quick password reset assistance'],
    screen: <LoginMock />,
  },
]

function Showcase() {
  const [active, setActive] = useState(0)

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (active + keys[e.key] + showcase.length) % showcase.length
    setActive(next)
    document.getElementById(`lp-tab-${showcase[next].id}`)?.focus()
  }

  return (
    <div className="lp-show">
      <div className="lp-tabs" role="tablist" aria-label="Portal features" aria-orientation="vertical" onKeyDown={onKeyDown}>
        {showcase.map((s, i) => (
          <button
            key={s.id}
            id={`lp-tab-${s.id}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls={`lp-panel-${s.id}`}
            tabIndex={active === i ? 0 : -1}
            className={`lp-tab${active === i ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
          >
            <span className="lp-tab-icon">
              <Icon name={s.icon} size={18} />
            </span>
            <span className="lp-tab-text">
              <strong>{s.label}</strong>
              <small>{s.eyebrow}</small>
            </span>
            <Icon name="arrow" size={16} />
          </button>
        ))}
      </div>

      {/* All panels share one grid cell, so the box keeps the tallest panel's size
          and never jumps when switching tabs */}
      <div className="lp-panels">
        {showcase.map((s, i) => (
          <div
            key={s.id}
            id={`lp-panel-${s.id}`}
            className={`lp-panel${active === i ? ' is-active' : ''}`}
            role="tabpanel"
            aria-labelledby={`lp-tab-${s.id}`}
            aria-hidden={active !== i}
            inert={active !== i}
          >
            <div className="lp-panel-copy">
              <p className="sx-eyebrow">{s.eyebrow}</p>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>
                    <span className="sx-tick">
                      <Icon name="check" size={10} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <PortalWindow title={s.title} icon={s.icon}>
              {s.screen}
            </PortalWindow>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LearningPortal() {
  return (
    <div className="sd sx tone-blue">
      <Seo
        title="Learning Portal"
        description="The Triple Dot Learning Portal connects students, faculty and colleges with courses, assignments, a coding editor, leaderboards, placement preparation and support."
      />

      {/* Hero */}
      <section className="sx-hero">
        <div className="sx-hero-bg" aria-hidden="true">
          <span className="sx-hero-grid-lines" />
          <span className="sx-hero-glow is-a" />
          <span className="sx-hero-glow is-b" />
        </div>

        <div className="container sx-hero-inner">
          <div className="sx-hero-copy">
            <h1>Learning Portal</h1>
            <p className="sx-tagline">One place to learn, practise and prepare for placement.</p>
            <p className="sx-lead">
              More than a website of video courses. Our own educational platform supports students
              throughout their learning journey, from the first lesson to placement preparation.
            </p>

            <div className="sx-actions">
              <Link className="sx-btn is-light" to="/contact?topic=college">
                Bring it to your college <Icon name="arrow" size={18} />
              </Link>
              <a className="sx-btn is-ghost" href="#closer-look">
                Explore features
              </a>
            </div>

            <ul className="sx-trust" aria-label="Key features">
              {['Courses', 'Coding editor', 'Leaderboard', 'Placements'].map((t) => (
                <li key={t}>
                  <Icon name="check" size={14} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <PortalDashboard />
        </div>
      </section>

      {/* Who it connects */}
      <section className="lp-roles-band">
        <div className="container lp-roles">
          <p>The portal connects</p>
          <ul>
            {roles.map((r) => (
              <li key={r.title}>
                <span>
                  <Icon name={r.icon} size={20} />
                </span>
                {r.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* All features */}
      <section className="section">
        <div className="container">
          <SxHead eyebrow="Inside the portal" title="Everything in one learning environment" center>
            {portalFeatures.length} tools that take a student from first lesson to placement.
          </SxHead>
          <ul className="sx-portal is-four">
            {portalFeatures.map((f) => (
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

      {/* Closer look: the six cube faces */}
      <section className="section tint" id="closer-look">
        <div className="container">
          <SxHead eyebrow="Take a closer look" title="See the portal in action" center>
            Pick an area to see what students, faculty and colleges work with every day.
          </SxHead>
          <Showcase />
        </div>
      </section>

      <CtaBand
        title="Interested in the portal for your institution?"
        text="Talk to us about connecting your students and faculty."
        primary={{ to: '/contact?topic=college', label: 'Contact us' }}
        secondary={{ to: '/edtech', label: 'Explore EdTech' }}
      />
    </div>
  )
}
