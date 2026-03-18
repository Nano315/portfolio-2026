import { useState, useEffect } from 'react'

const links = [
  { href: '#projets', label: 'Projets' },
  { href: '#competences', label: 'Compétences' },
  { href: '#formation', label: 'Formation' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          height: '64px',
          background: scrolled ? 'rgba(13, 11, 20, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        }}
      >
        <a
          href="#"
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#7B2FFF',
            letterSpacing: '-0.02em',
            textDecoration: 'none',
          }}
        >
          V.
        </a>

        {/* Desktop links */}
        <ul
          id="nav-links"
          style={{
            display: 'flex',
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  fontSize: '14px',
                  color: 'rgba(240, 238, 255, 0.65)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'color 0.15s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#8B5CF6'
                  e.currentTarget.style.textDecoration = 'underline'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(240, 238, 255, 0.65)'
                  e.currentTarget.style.textDecoration = 'none'
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{
            display: 'block',
            width: '22px',
            height: '2px',
            background: '#F0EEFF',
            borderRadius: '1px',
            transition: 'transform 0.2s, opacity 0.2s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{
            display: 'block',
            width: '22px',
            height: '2px',
            background: '#F0EEFF',
            borderRadius: '1px',
            transition: 'opacity 0.2s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block',
            width: '22px',
            height: '2px',
            background: '#F0EEFF',
            borderRadius: '1px',
            transition: 'transform 0.2s, opacity 0.2s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            background: 'rgba(13, 11, 20, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={handleLinkClick}
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#F0EEFF',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8B5CF6'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#F0EEFF'
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
