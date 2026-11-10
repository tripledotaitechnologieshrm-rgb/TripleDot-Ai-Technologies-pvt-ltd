import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

/** Anything that navigates: links and button-styled links/actions */
const NAVIGATES = 'a[href], .btn, [role="link"]'
const TEXT_FIELDS = 'input, textarea, select, [contenteditable="true"]'
const SHARDS = [0, 1, 2, 3, 4]

/**
 * Diamond cursor.
 * - A faceted, cut-diamond cursor follows the mouse.
 * - When it moves onto a link/button, the diamond splits into 5 small gems that
 *   circle around the pointer, then merge back into the diamond.
 * Only on mouse/trackpad devices, and never for visitors who prefer reduced motion.
 */
export function CustomCursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const cursor = cursorRef.current!
    let frame = 0
    let x = -100
    let y = -100
    let current: Element | null = null // the link/button we are over

    const render = () => {
      frame = 0
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    const split = () => {
      // Restart the split-orbit-merge animation
      cursor.classList.remove('is-split')
      void cursor.offsetWidth
      cursor.classList.add('is-split')
    }
    const onAnimEnd = (e: AnimationEvent) => {
      if (e.animationName === 'gem-orbit-spin') cursor.classList.remove('is-split')
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      if (!frame) frame = requestAnimationFrame(render)

      const target = e.target as Element | null
      cursor.classList.add('is-visible')
      cursor.classList.toggle('is-text', !!target?.closest(TEXT_FIELDS))

      const nav = target?.closest(NAVIGATES) ?? null
      cursor.classList.toggle('is-hover', !!nav)
      if (nav !== current) {
        current = nav
        if (nav) split()
      }
    }
    const onDown = () => cursor.classList.add('is-down')
    const onUp = () => cursor.classList.remove('is-down')
    const onLeave = () => {
      cursor.classList.remove('is-visible')
      current = null
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    root.addEventListener('pointerleave', onLeave)
    cursor.addEventListener('animationend', onAnimEnd)

    return () => {
      cancelAnimationFrame(frame)
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointerleave', onLeave)
      cursor.removeEventListener('animationend', onAnimEnd)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={cursorRef} className="gem-cursor" aria-hidden="true">
      {/* The cut diamond */}
      <span className="gem-cursor-body">
        <svg viewBox="0 0 24 22" width="22" height="20">
          <defs>
            <linearGradient id="gem-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8f7fe6" />
              <stop offset="1" stopColor="#5a47c4" />
            </linearGradient>
            <linearGradient id="gem-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5a47c4" />
              <stop offset="1" stopColor="#261a6e" />
            </linearGradient>
          </defs>
          {/* Crown */}
          <polygon points="1,7 6,1 8,7" fill="#6a58d0" />
          <polygon points="6,1 12,1 8,7" fill="url(#gem-a)" />
          <polygon points="12,1 16,7 8,7" fill="#8f7fe6" />
          <polygon points="12,1 18,1 16,7" fill="#5a47c4" />
          <polygon points="18,1 23,7 16,7" fill="#4f3dbd" />
          {/* Pavilion */}
          <polygon points="1,7 8,7 12,21" fill="#4332b0" />
          <polygon points="8,7 16,7 12,21" fill="url(#gem-b)" />
          <polygon points="16,7 23,7 12,21" fill="#33258c" />
          {/* Outline + girdle */}
          <path
            d="M6 1h12l5 6-11 14L1 7z M1 7h22 M8 7l4 14 4-14"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
        </svg>
        <i className="gem-cursor-glint" />
      </span>

      {/* Twinkle */}
      <i className="gem-cursor-spark" />

      {/* 5 shards that circle the pointer when the diamond splits */}
      <span className="gem-orbit">
        {SHARDS.map((k) => (
          <i key={k} className="gem-shard" style={{ '--k': k } as CSSProperties} />
        ))}
      </span>
    </div>
  )
}
