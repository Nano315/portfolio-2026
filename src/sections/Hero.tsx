import { useCallback, useEffect, useState } from 'react'
import { loadSlim } from '@tsparticles/slim'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import type { Container } from '@tsparticles/engine'

const STACK_BADGES = [
  'Java · Spring Boot',
  'Angular',
  'React',
  'Node.js',
]

export default function Hero() {
  const [particlesReady, setParticlesReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setParticlesReady(true))
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollIndicatorVisible(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    // Particles loaded and ready
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Particles canvas — behind everything */}
      {particlesReady && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.5s ease',
          }}
        >
          <Particles
            id="hero-particles-canvas"
            particlesLoaded={particlesLoaded}
            options={{
              fullScreen: false,
              background: { color: 'transparent' },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onHover: { enable: true, mode: 'grab' },
                },
                modes: {
                  grab: { distance: 160, links: { opacity: 0.35 } },
                },
              },
              particles: {
                color: { value: ['#7B2FFF', '#7B2FFF', '#7B2FFF', '#7B2FFF', '#7B2FFF', '#7B2FFF', '#7B2FFF', '#ffffff', '#ffffff', '#ffffff'] },
                links: {
                  color: '#7B2FFF',
                  distance: 130,
                  enable: true,
                  opacity: 0.12,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 0.6,
                  direction: 'none',
                  outModes: { default: 'bounce' },
                },
                number: {
                  value: 90,
                  density: { enable: true, width: 800, height: 800 },
                },
                opacity: { value: { min: 0.4, max: 0.9 } },
                shape: { type: 'circle' },
                size: { value: { min: 1, max: 3 } },
              },
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )}

      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(123, 47, 255, 0.12) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 32px',
          pointerEvents: 'auto',
        }}
      >
        {/* Pre-headline */}
        <p
          id="hero-pre-headline"
          style={{
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#8B5CF6',
            marginBottom: '20px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
        >
          Développeur Full Stack
        </p>

        {/* Name headline */}
        <h1
          id="hero-headline"
          style={{
            fontSize: 'clamp(64px, 10vw, 96px)',
            fontWeight: 700,
            color: '#F0EEFF',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '32px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
          }}
        >
          Valentin
        </h1>

        {/* Stack badges */}
        <div
          id="hero-stack-badges"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          {STACK_BADGES.map((badge, i) => (
            <span
              key={badge}
              style={{
                padding: '4px 12px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#C4B5FD',
                background: 'rgba(123, 47, 255, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '999px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.5s ease ${0.7 + i * 0.1}s, transform 0.5s ease ${0.7 + i * 0.1}s`,
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          id="hero-description"
          style={{
            fontSize: '18px',
            color: 'rgba(240, 238, 255, 0.65)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 40px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s',
          }}
        >
          Je cherche une alternance Full Stack Java Angular à Toulouse pour
          septembre 2026.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s',
          }}
        >
          <a
            id="hero-cta-primary"
            href="#projets"
            style={{
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#ffffff',
              background: '#7B2FFF',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.15s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#8B5CF6'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#7B2FFF'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Explorer mes projets
          </a>

          <a
            id="hero-cta-secondary"
            href="#contact"
            style={{
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#C4B5FD',
              background: 'transparent',
              borderRadius: '8px',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s, transform 0.15s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(139, 92, 246, 0.8)'
              el.style.color = '#F0EEFF'
              el.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(139, 92, 246, 0.4)'
              el.style.color = '#C4B5FD'
              el.style.transform = 'translateY(0)'
            }}
          >
            Travaillons ensemble
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        id="hero-scroll-indicator"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(139, 92, 246, 0.6)',
          opacity: visible && scrollIndicatorVisible ? 0.6 : 0,
          transition: visible ? 'opacity 0.4s ease' : 'opacity 0.6s ease 1.2s',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '48px',
            background:
              'linear-gradient(to bottom, rgba(139, 92, 246, 0), rgba(139, 92, 246, 0.8))',
            animation: 'scrollPulse 1.5s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(8px); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
