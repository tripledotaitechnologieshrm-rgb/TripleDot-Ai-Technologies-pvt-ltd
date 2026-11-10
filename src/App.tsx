import { useEffect } from 'react'
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { CustomCursor } from './components/CustomCursor'
import { Header } from './components/Header'
import { Footer, Seo } from './components/ui'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import EdTech from './pages/EdTech'
import LearningPortal from './pages/LearningPortal'
import Careers from './pages/Careers'
import Contact from './pages/Contact'

function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, key])
  return null
}

function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <CustomCursor />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <section className="page-hero">
      <Seo title="Page not found" description="This page could not be found." />
      <div className="container">
        <p className="eyebrow">Page not found</p>
        <h1>This page does not exist.</h1>
        <div className="actions">
          <Link className="btn btn-primary" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/edtech" element={<EdTech />} />
        <Route path="/learning-portal" element={<LearningPortal />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
