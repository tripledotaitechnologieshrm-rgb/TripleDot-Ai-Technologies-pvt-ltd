import type { ReactNode } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'

/**
 * Illustrative screens of the Learning Portal. They mirror the six faces of the
 * portal's home-page cube: courses, assignments, leaderboard, placements,
 * support and login help.
 */

export function PortalWindow({
  title,
  icon,
  children,
}: {
  title: string
  icon: IconName
  children: ReactNode
}) {
  return (
    <figure className="pm-window" aria-label={`Illustration of the ${title} screen`}>
      <div className="pm-bar">
        <span className="pm-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="pm-bar-title">
          <Icon name={icon} size={14} />
          {title}
        </span>
        <span className="pm-tag">Illustrative</span>
      </div>
      <div className="pm-body">{children}</div>
    </figure>
  )
}

const courses = [
  { name: 'Full Stack Development', pct: 82 },
  { name: 'AI & Machine Learning', pct: 56 },
  { name: 'Data Science', pct: 34 },
]

export function CoursesMock() {
  return (
    <div className="pm-courses">
      {courses.map((c) => (
        <div key={c.name} className="pm-course">
          <div className="pm-row">
            <span>{c.name}</span>
            <b>{c.pct}%</b>
          </div>
          <span className="pm-prog">
            <i style={{ width: `${c.pct}%` }} />
          </span>
        </div>
      ))}
      <div className="pm-tags">
        <span className="pm-chip">12 tasks</span>
        <span className="pm-chip">8 assignments</span>
      </div>
    </div>
  )
}

export function EditorMock() {
  return (
    <div className="pm-editor">
      <div className="pm-file">
        <Icon name="code" size={13} />
        two_sum.py
      </div>
      <pre className="pm-code">
        <code>
          <span className="ln">1</span>
          <span className="kw">def</span> <span className="fn">two_sum</span>(nums, target):{'\n'}
          <span className="ln">2</span>
          {'    '}seen = {'{}'}
          {'\n'}
          <span className="ln">3</span>
          {'    '}
          <span className="kw">for</span> i, n <span className="kw">in</span>{' '}
          <span className="fn">enumerate</span>(nums):{'\n'}
          <span className="ln">4</span>
          {'        '}
          <span className="kw">if</span> target - n <span className="kw">in</span> seen:{'\n'}
          <span className="ln">5</span>
          {'            '}
          <span className="kw">return</span> [seen[target - n], i]{'\n'}
          <span className="ln">6</span>
          {'        '}seen[n] = i<span className="pm-caret" />
        </code>
      </pre>
      <div className="pm-tests">
        <span className="pm-ok">
          <Icon name="check" size={14} />5 / 5 tests passed
        </span>
        <span className="pm-chip is-accent">+20 pts</span>
      </div>
    </div>
  )
}

export function LeaderboardMock() {
  const rows = [
    { r: 4, n: 'Learner D', w: 78, s: 742 },
    { r: 5, n: 'You', w: 71, s: 690, me: true },
    { r: 6, n: 'Learner F', w: 64, s: 655 },
  ]
  return (
    <div className="pm-board">
      <div className="pm-podium">
        <div className="pm-pod is-2">
          <span className="pm-av">B</span>
          <div className="pm-pillar">2</div>
        </div>
        <div className="pm-pod is-1">
          <span className="pm-av">A</span>
          <div className="pm-pillar">1</div>
        </div>
        <div className="pm-pod is-3">
          <span className="pm-av">C</span>
          <div className="pm-pillar">3</div>
        </div>
      </div>
      <ul className="pm-ranks">
        {rows.map((x) => (
          <li key={x.r} className={x.me ? 'is-me' : undefined}>
            <span className="pm-rank">{x.r}</span>
            <span className="pm-name">{x.n}</span>
            <span className="pm-score">
              <i style={{ width: `${x.w}%` }} />
            </span>
            <b>{x.s}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PlacementsMock() {
  const steps = ['Skill assessment', 'Mock interviews', 'Placement drive', 'Offer received']
  return (
    <div className="pm-place">
      <ol className="pm-steps">
        {steps.map((s, i) => (
          <li key={s} className={i < 3 ? 'is-done' : 'is-now'}>
            <span className="pm-step-dot">{i < 3 && <Icon name="check" size={11} />}</span>
            {s}
          </li>
        ))}
      </ol>
      <div className="pm-offer">
        <span className="pm-offer-icon">
          <Icon name="briefcase" size={18} />
        </span>
        <div>
          <strong>Software Engineer</strong>
          <small>Offer letter issued</small>
        </div>
      </div>
    </div>
  )
}

export function SupportMock() {
  return (
    <div className="pm-support">
      <div className="pm-ticket">
        <div className="pm-ticket-main">
          <div className="pm-row">
            <span className="pm-mono">#TKT-1042</span>
            <span className="pm-chip is-amber">In progress</span>
          </div>
          <p>Unable to submit Week 3 assignment</p>
          <div className="pm-row is-start">
            <span className="pm-chip">Assignment</span>
            <span className="pm-muted">2h ago</span>
          </div>
        </div>
        <div className="pm-ticket-stub">
          <small>Priority</small>
          <strong>High</strong>
        </div>
      </div>
      <div className="pm-chat">
        <div className="pm-bubble is-me">Upload keeps failing at 90%.</div>
        <div className="pm-bubble">
          <b>Support team</b>
          Fixed on our side, please retry now.
        </div>
      </div>
    </div>
  )
}

export function LoginMock() {
  return (
    <div className="pm-login">
      <div className="pm-field">
        <small>College</small>
        <div className="pm-input">
          Select college <Icon name="chevron" size={14} />
        </div>
      </div>
      <div className="pm-field">
        <small>Email</small>
        <div className="pm-input">student@college.edu</div>
      </div>
      <div className="pm-field">
        <small>Password</small>
        <div className="pm-input is-error">••••••••</div>
      </div>
      <div className="pm-row">
        <span className="pm-err">Incorrect password</span>
        <span className="pm-link">Forgot password?</span>
      </div>
      <div className="pm-notice">
        <Icon name="check" size={14} />
        Reset link sent to your email
      </div>
    </div>
  )
}

/** Hero illustration: a small portal dashboard with floating highlights. */
export function PortalDashboard() {
  const nav: IconName[] = ['book', 'code', 'trophy', 'briefcase', 'chat']
  return (
    <div className="pm-dash-wrap">
      <figure className="pm-dash" aria-label="Illustration of the Learning Portal dashboard">
        <aside className="pm-dash-nav" aria-hidden="true">
          <span className="pm-dash-logo">
            <i />
            <i />
            <i />
          </span>
          {nav.map((n, i) => (
            <span key={n} className={i === 0 ? 'is-on' : undefined}>
              <Icon name={n} size={16} />
            </span>
          ))}
        </aside>
        <div className="pm-dash-main">
          <div className="pm-dash-head">
            <div>
              <small>Welcome back</small>
              <strong>Your learning</strong>
            </div>
            <span className="pm-av is-me">Y</span>
          </div>
          <div className="pm-dash-stats">
            <div>
              <b>3</b>
              <small>Courses</small>
            </div>
            <div>
              <b>12</b>
              <small>Tasks</small>
            </div>
            <div>
              <b>690</b>
              <small>Points</small>
            </div>
          </div>
          <CoursesMock />
        </div>
      </figure>

      <div className="pm-float is-a" aria-hidden="true">
        <span className="pm-float-icon">
          <Icon name="check" size={14} />
        </span>
        <div>
          <strong>5 / 5 tests passed</strong>
          <small>+20 pts earned</small>
        </div>
      </div>
      <div className="pm-float is-b" aria-hidden="true">
        <span className="pm-float-icon is-gold">
          <Icon name="trophy" size={14} />
        </span>
        <div>
          <strong>Rank #5</strong>
          <small>Leaderboard</small>
        </div>
      </div>
    </div>
  )
}
