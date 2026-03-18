import { useReveal } from '../hooks/useReveal'

// ─── Contact Row ──────────────────────────────────────────────────────────────

function ContactRow({
  id,
  label,
  children,
  delay,
  visible,
}: {
  id: string
  label: string
  children: React.ReactNode
  delay: number
  visible: boolean
}) {
  return (
    <div
      id={id}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        opacity: visible ? 1 : 0,
        translate: visible ? '0 0' : '0 8px',
        transition: `opacity 0.5s ease ${delay}s, translate 0.5s ease ${delay}s`,
      }}
    >
      <span
        style={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#8B5CF6',
          width: '80px',
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

function Divider({ id }: { id: string }) {
  return (
    <hr
      id={id}
      style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '20px 0' }}
    />
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Contact() {
  const { ref, visible } = useReveal()

  const linkStyle = {
    fontSize: '16px',
    color: '#E9D5FF',
    textDecoration: 'none',
    transition: 'color 0.15s',
  }

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: '60px 40px 0', maxWidth: '1280px', margin: '0 auto' }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '48px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2
          id="contact-section-title"
          style={{ fontSize: '48px', fontWeight: 700, color: '#F0EEFF', margin: 0 }}
        >
          Travaillons ensemble
        </h2>
        <p
          id="contact-section-subtitle"
          style={{
            fontSize: '18px',
            color: 'rgba(240, 238, 255, 0.6)',
            marginTop: '12px',
            lineHeight: 1.6,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
          }}
        >
          Je suis disponible pour une alternance Full Stack Java Angular à Toulouse à partir de septembre 2026.
        </p>
      </div>

      {/* Contact card */}
      <div
        id="contact-card"
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          background: 'rgba(13, 11, 20, 0.6)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '16px',
          padding: '40px 48px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.1s',
        }}
      >
        <ContactRow id="contact-email" label="Email" delay={0.2} visible={visible}>
          <a
            id="contact-email-value"
            href="mailto:valentin3135@gmail.com"
            style={linkStyle}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.color = '#ffffff'
              el.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.color = '#E9D5FF'
              el.style.textDecoration = 'none'
            }}
          >
            valentin3135@gmail.com
          </a>
        </ContactRow>

        <Divider id="contact-divider-1" />

        <ContactRow id="contact-linkedin" label="LinkedIn" delay={0.3} visible={visible}>
          <a
            id="contact-linkedin-value"
            href="https://www.linkedin.com/in/val-dms/"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.color = '#ffffff'
              el.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.color = '#E9D5FF'
              el.style.textDecoration = 'none'
            }}
          >
            linkedin.com/in/val-dms
          </a>
        </ContactRow>

        <Divider id="contact-divider-2" />

        <ContactRow id="contact-location" label="Ville" delay={0.4} visible={visible}>
          <span
            id="contact-location-value"
            style={{ fontSize: '16px', color: 'rgba(240, 238, 255, 0.65)' }}
          >
            Toulouse, France
          </span>
        </ContactRow>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a
            id="contact-cta"
            href="mailto:valentin3135@gmail.com?subject=Alternance%20Full%20Stack%20%E2%80%94%20"
            style={{
              display: 'inline-block',
              background: '#7B2FFF',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '14px 32px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'background 0.2s',
              opacity: visible ? 1 : 0,
              transitionDelay: '0.5s',
            }}
            onMouseEnter={(e) => { (e.currentTarget).style.background = '#8B5CF6' }}
            onMouseLeave={(e) => { (e.currentTarget).style.background = '#7B2FFF' }}
          >
            Envoyer un email
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        marginTop: '80px',
        paddingBottom: '40px',
      }}>
        <p
          id="footer-copyright"
          style={{
            fontSize: '13px',
            color: 'rgba(240, 238, 255, 0.2)',
          }}
        >
          © 2026 Valentin · Fait avec passion à Toulouse
        </p>
        <a
          id="footer-github-link"
          href="https://github.com/Nano315/portfolio-2026"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '8px',
            fontSize: '13px',
            color: 'rgba(139, 92, 246, 0.5)',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => { (e.currentTarget).style.color = '#7B2FFF' }}
          onMouseLeave={(e) => { (e.currentTarget).style.color = 'rgba(139, 92, 246, 0.5)' }}
        >
          Code source de ce portfolio → GitHub
        </a>
      </footer>
    </section>
  )
}
