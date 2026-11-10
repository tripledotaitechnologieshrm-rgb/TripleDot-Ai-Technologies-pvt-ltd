import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CustomCursor } from '../components/CustomCursor'
import { Icon } from '../components/Icon'
import { Logo, Seo } from '../components/ui'

// Standalone 404 page: rendered outside the main layout, so no header or footer.
export default function NotFound() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  // Only offer "Go back" when there is an earlier page inside this site to return to
  const canGoBack = (window.history.state?.idx ?? 0) > 0

  return (
    <main className="nf" id="main">
      <Seo title="Page not found" description="This page could not be found." />
      <CustomCursor />

      <div className="nf-bg" aria-hidden="true">
        <span className="nf-glow is-a" />
        <span className="nf-glow is-b" />
        <span className="nf-glow is-c" />
        <span className="nf-grid" />
      </div>

      <Link to="/" className="nf-logo" aria-label="Triple Dot AI Technologies home">
        <Logo />
      </Link>

      <div className="nf-card">
        <p className="nf-code" aria-hidden="true">
          <span>4</span>
          <span className="nf-dots">
            <i className="is-pink" />
            <i className="is-red" />
            <i className="is-indigo" />
          </span>
          <span>4</span>
        </p>

        <p className="nf-eyebrow">Error 404</p>
        <h1>Page not found</h1>
        <p className="nf-text">
          The page you are looking for doesn't exist or has been moved. Please check the address,
          or return to the home page.
        </p>
        <p className="nf-path">
          <span>Requested URL</span>
          <code>{pathname}</code>
        </p>

        <div className="nf-actions">
          <Link className="btn btn-primary nf-home" to="/">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M3 11.5 12 4l9 7.5M5.5 9.5V20h5v-5.5h3V20h5V9.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Go to home
          </Link>
          {canGoBack ? (
            <button type="button" className="btn btn-outline nf-back" onClick={() => navigate(-1)}>
              <Icon name="arrow" size={18} />
              Go back
            </button>
          ) : (
            <Link className="btn btn-outline" to="/contact">
              Contact us
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
