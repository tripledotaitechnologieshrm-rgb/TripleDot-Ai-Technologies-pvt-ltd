const paths = {
  megaphone: 'M3 10v4a1 1 0 0 0 1 1h3l10 5V4L7 9H4a1 1 0 0 0-1 1Zm4 5 1.5 5H11l-1.3-4M20 9.5a3.5 3.5 0 0 1 0 5',
  code: 'm8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  flow: 'M4 4h6v6H4zM14 14h6v6h-6zM7 10v4a3 3 0 0 0 3 3h4',
  puzzle: 'M9 4h6v4h5v5h-3a2 2 0 1 0 0 4h3v3H4v-5h3a2 2 0 1 0 0-4H4V8h5V4Z',
  layers: 'm12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5',
  server: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
  chart: 'M4 4v16h16M8 16v-4M12 16V8M16 16v-6',
  nodes: 'M6 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM18 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM12 16a2.5 2.500 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM7 8l4 8M17 8l-4 8M8.500 5.500h7',
  spark: 'M12 3l2 6.5L20.5 12 14 14.5 12 21l-2-6.5L3.5 12 10 9.5 12 3Z',
  grad: 'M12 5 2 10l10 5 10-5-10-5ZM6 12.5V17c0 1 3 3 6 3s6-2 6-3v-4.5',
  rocket: 'M14 4c3-1.5 6-1 6-1s.5 3-1 6l-6 6-4-1-1-4 6-6ZM9 15l-4 4M8 10H4l2-3h4M14 16v4l3-2v-4',
  briefcase: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  building: 'M5 21V4h10v17M15 10h4v11M3 21h18M8.5 8h3M8.5 12h3M8.5 16h3',
  book: 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Zm0 13a3 3 0 0 1 3-3h11',
  check: 'M4 12.5 9.5 18 20 6.5',
  trophy: 'M8 4h8v6a4 4 0 0 1-8 0V4ZM8 6H4c0 3 1.5 5 4 5M16 6h4c0 3-1.5 5-4 5M12 14v4M8 20h8',
  chat: 'M4 5h16v11H9l-5 4V5Z',
  key: 'M15 3a6 6 0 1 1-2 11.7L11 17H9v2H7v2H3v-4l6.300-6.300A6 6 0 0 1 15 3ZM16.500 7.500h.01',
  phone: 'M5 3h4l2 5-2.500 1.500a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2C10.700 21 3 13.300 3 5a2 2 0 0 1 2-2Z',
  pin: 'M12 21s7-6.200 7-11.500a7 7 0 1 0-14 0C5 14.800 12 21 12 21ZM12 12a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5Z',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c3 3 3.500 15 0 18M12 3c-3 3-3.500 15 0 18',
  linkedin: 'M4 4h16v16H4zM8 11v5M8 8v.01M12 16v-5M12 13c0-1 1-2 2-2s2 1 2 2.500V16',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  chevron: 'm6 9 6 6 6-6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 12h.01',
  users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21c0-4 3-6 7-6s7 2 7 6M16 3.500a4 4 0 0 1 0 7M18 15c2.500.5 4 2.500 4 6',
  video: 'M3 6h13v12H3zM16 10l5-3v10l-5-3',
  play: 'M4 4h16v16H4zM10 9l5 3-5 3V9Z',
  wallet: 'M4 6h15v3M4 6v13h16V9H4M16 14h.01',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41',
  moon: 'M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z',
} as const

export type IconName = keyof typeof paths

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
