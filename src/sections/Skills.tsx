import { useState, type CSSProperties } from 'react'
import { useReveal } from '../hooks/useReveal'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILL_GROUPS = [
  {
    id: 'skills-group-backend',
    label: 'Backend',
    items: ['Java', 'Spring Boot', 'Spring Security', 'Hibernate / JPA', 'Maven', 'REST API'],
    style: {
      background: 'rgba(123, 47, 255, 0.08)',
      border: '1px solid rgba(123, 47, 255, 0.3)',
      borderHover: 'rgba(123, 47, 255, 0.5)',
    },
    itemColor: '#E9D5FF',
    delay: 0.1,
  },
  {
    id: 'skills-group-frontend',
    label: 'Frontend',
    items: ['Angular', 'React', 'TypeScript', 'HTML / CSS', 'Tailwind CSS', 'Vite'],
    style: {
      background: 'rgba(123, 47, 255, 0.05)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      borderHover: 'rgba(139, 92, 246, 0.4)',
    },
    itemColor: '#E9D5FF',
    delay: 0.2,
  },
  {
    id: 'skills-group-desktop',
    label: 'Desktop & Temps Réel',
    items: ['Electron', 'Node.js', 'Express', 'Socket.io', 'WebSocket'],
    style: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderHover: 'rgba(255, 255, 255, 0.12)',
    },
    itemColor: 'rgba(240, 238, 255, 0.65)',
    delay: 0.3,
  },
  {
    id: 'skills-group-tools',
    label: 'Outils & Méthodes',
    items: ['Git / GitHub', 'Agile / Scrum', 'Postman', 'IntelliJ IDEA', 'VS Code'],
    style: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderHover: 'rgba(255, 255, 255, 0.12)',
    },
    itemColor: 'rgba(240, 238, 255, 0.65)',
    delay: 0.4,
  },
]

// ─── Skill Card ───────────────────────────────────────────────────────────────

function SkillCard({
  id,
  label,
  items,
  style,
  itemColor,
  delay,
  visible,
}: {
  id: string
  label: string
  items: string[]
  style: { background: string; border: string; borderHover: string }
  itemColor: string
  delay: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const glowStyle: CSSProperties = hovered ? {
    position: 'absolute',
    inset: 0,
    borderRadius: '12px',
    pointerEvents: 'none',
    background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(123, 47, 255, 0.1), transparent 60%)`,
    zIndex: 0,
  } : {}

  return (
    <article
      id={id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        background: style.background,
        border: hovered ? `1px solid ${style.borderHover}` : style.border,
        borderRadius: '12px',
        padding: '24px',
        boxShadow: hovered ? '0 4px 24px rgba(123, 47, 255, 0.15)' : 'none',
        transition: `border-color 0.2s ease, box-shadow 0.3s ease, opacity 0.6s ease ${delay}s, translate 0.6s ease ${delay}s`,
        opacity: visible ? 1 : 0,
        translate: visible ? '0 0' : '0 20px',
      }}
    >
      {hovered && <div style={glowStyle} />}
      <span
        style={{
          display: 'block',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#8B5CF6',
          marginBottom: '16px',
        }}
      >
        {label}
      </span>

      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {items.map((item) => (
          <li
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '15px',
              color: itemColor,
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#7B2FFF',
                flexShrink: 0,
                opacity: 0.7,
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Skills() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="competences"
      ref={ref as React.RefObject<HTMLElement>}
      className="skills-section"
      style={{
        padding: '60px 40px 60px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '56px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2
          id="skills-section-title"
          className="section-title"
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#F0EEFF',
            margin: 0,
          }}
        >
          Compétences
        </h2>
        <p
          id="skills-section-subtitle"
          style={{
            fontSize: '16px',
            color: 'rgba(240, 238, 255, 0.5)',
            marginTop: '12px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
          }}
        >
          Les outils avec lesquels je construis
        </p>
      </div>

      {/* 2×2 Grid */}
      <div
        className="skills-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {SKILL_GROUPS.map((group) => (
          <SkillCard
            key={group.id}
            id={group.id}
            label={group.label}
            items={group.items}
            style={group.style}
            itemColor={group.itemColor}
            delay={group.delay}
            visible={visible}
          />
        ))}
      </div>

      {/* Learning note */}
      <p
        id="skills-learning-note"
        style={{
          textAlign: 'center',
          marginTop: '40px',
          fontSize: '14px',
          color: 'rgba(240, 238, 255, 0.35)',
          fontStyle: 'italic',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.5s',
        }}
      >
        En apprentissage constant — certaines technos ci-dessus sont découvertes pendant les formations, d'autres maîtrisées en production.
      </p>
    </section>
  )
}
