import { useReveal } from '../hooks/useReveal'

// ─── Timeline Steps (plus récent en premier) ─────────────────────────────────

const STEPS = [
  {
    id: 'formation-step-3',
    date: "Septembre 2026 · Recherche d'alternance",
    title: 'Développeur Full Stack Java Angular',
    titleUrl: 'https://openclassrooms.com/fr/paths/2460-developpeur-full-stack-java-et-angular',
    level: 'Niveau 7 · Bac +5',
    school: 'OpenClassrooms · 1 an',
    description:
      "Prochaine étape de mon parcours — formation en alternance d'1 an pour maîtriser le Full Stack Java Angular en contexte professionnel. Je suis disponible à partir de septembre 2026 à Toulouse.",
    badge: { label: 'Objectif', color: '#7B2FFF', textColor: '#ffffff', borderColor: '#7B2FFF' },
    nodeSize: 20,
    nodeStyle: {
      background: '#7B2FFF',
      border: '3px solid #7B2FFF',
      boxShadow: '0 0 16px rgba(123, 47, 255, 0.5)',
    },
    titleSize: '24px',
    titleColor: '#F0EEFF',
    pulse: true,
    delay: 0.1,
  },
  {
    id: 'formation-step-2',
    date: '2024 – 2026 · Complété · Alternance 2 ans',
    title: "Développeur d'Application Java",
    titleUrl: 'https://openclassrooms.com/fr/paths/883-developpeur-d-application-java',
    level: 'Niveau 6 · Bac +3/4',
    school: 'OpenClassrooms',
    company: 'Alternance chez iMSA',
    description:
      '2 ans de développement Java en contexte professionnel réel — projet Néo, équipe pluridisciplinaire, méthode Agile. Backend Spring Boot, gestion de données, API REST.',
    badge: { label: 'En entreprise', color: 'rgba(123,47,255,0.3)', textColor: '#C4B5FD', borderColor: 'rgba(123,47,255,0.5)' },
    nodeSize: 16,
    nodeStyle: {
      background: 'rgba(123, 47, 255, 0.6)',
      border: '2px solid #7B2FFF',
      boxShadow: 'none',
    },
    titleSize: '22px',
    titleColor: '#F0EEFF',
    pulse: false,
    delay: 0.2,
  },
  {
    id: 'formation-step-1',
    date: '2023 – 2024 · Complété',
    title: 'Développeur Web',
    titleUrl: 'https://openclassrooms.com/fr/paths/899-developpeur-web',
    level: 'Niveau 5 · Bac +2',
    school: 'OpenClassrooms',
    description:
      'Fondamentaux du développement web — HTML, CSS, JavaScript, intégration et bases du backend.',
    badge: null,
    nodeSize: 12,
    nodeStyle: {
      background: 'rgba(139, 92, 246, 0.4)',
      border: '2px solid rgba(139, 92, 246, 0.5)',
      boxShadow: 'none',
    },
    titleSize: '20px',
    titleColor: 'rgba(240, 238, 255, 0.75)',
    pulse: false,
    delay: 0.3,
  },
]

// ─── Timeline Item ────────────────────────────────────────────────────────────

function TimelineStep({
  step,
  visible,
  isLast,
}: {
  step: typeof STEPS[number]
  visible: boolean
  isLast: boolean
}) {
  return (
    <article
      id={step.id}
      style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr',
        gap: '0 24px',
        opacity: visible ? 1 : 0,
        translate: visible ? '0 0' : '-16px 0',
        transition: `opacity 0.6s ease ${step.delay}s, translate 0.6s ease ${step.delay}s`,
        position: 'relative',
      }}
    >
      {/* Node + line column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          id={`${step.id}-node`}
          style={{
            width: `${step.nodeSize}px`,
            height: `${step.nodeSize}px`,
            borderRadius: '50%',
            flexShrink: 0,
            ...step.nodeStyle,
            animation: step.pulse ? 'nodePulse 2.5s ease-in-out infinite' : 'none',
            marginTop: '4px',
          }}
        />
        {!isLast && (
          <div style={{
            flex: 1,
            width: '1px',
            background: 'linear-gradient(to bottom, rgba(123,47,255,0.4), rgba(123,47,255,0.1))',
            marginTop: '8px',
            marginBottom: '8px',
            minHeight: '48px',
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : '48px' }}>
        <span
          id={`${step.id}-date`}
          style={{
            display: 'block',
            fontSize: '12px',
            color: 'rgba(240, 238, 255, 0.35)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '8px',
          }}
        >
          {step.date}
        </span>

        {step.badge && (
          <span
            id={`${step.id}-badge`}
            style={{
              display: 'inline-block',
              background: step.badge.color,
              color: step.badge.textColor,
              border: `1px solid ${step.badge.borderColor}`,
              borderRadius: '4px',
              padding: '2px 10px',
              fontSize: '11px',
              marginBottom: '8px',
            }}
          >
            {step.badge.label}
          </span>
        )}

        {/* Title — cliquable vers OpenClassrooms */}
        <h3
          id={`${step.id}-title`}
          style={{ margin: '0 0 4px' }}
        >
          <a
            href={step.titleUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: step.titleSize,
              fontWeight: 700,
              color: step.titleColor,
              textDecoration: 'none',
              transition: 'color 0.15s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#8B5CF6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = step.titleColor
            }}
          >
            {step.title}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.5, flexShrink: 0 }}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </h3>

        {/* Niveau */}
        <p style={{
          fontSize: '12px',
          color: 'rgba(139, 92, 246, 0.6)',
          margin: '0 0 4px',
          letterSpacing: '0.02em',
        }}>
          {step.level}
        </p>

        <p
          id={`${step.id}-school`}
          style={{
            fontSize: '14px',
            color: 'rgba(240, 238, 255, 0.4)',
            margin: '0 0 4px',
          }}
        >
          {step.school}
        </p>

        {'company' in step && step.company && (
          <p
            id={`${step.id}-company`}
            style={{
              fontSize: '14px',
              color: 'rgba(139, 92, 246, 0.8)',
              margin: '0 0 8px',
            }}
          >
            {step.company}
          </p>
        )}

        <p
          id={`${step.id}-description`}
          style={{
            fontSize: '14px',
            color: 'rgba(240, 238, 255, 0.5)',
            lineHeight: 1.6,
            maxWidth: '500px',
            margin: '8px 0 0',
          }}
        >
          {step.description}
        </p>
      </div>
    </article>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Formation() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="formation"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: '60px 40px 60px', maxWidth: '1280px', margin: '0 auto' }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '64px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2
          id="formation-section-title"
          style={{ fontSize: '48px', fontWeight: 700, color: '#F0EEFF', margin: 0 }}
        >
          Parcours
        </h2>
        <p
          id="formation-section-subtitle"
          style={{
            fontSize: '16px', color: 'rgba(240,238,255,0.5)', marginTop: '12px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
          }}
        >
          Une progression construite, étape par étape
        </p>
      </div>

      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {STEPS.map((step, i) => (
          <TimelineStep
            key={step.id}
            step={step}
            visible={visible}
            isLast={i === STEPS.length - 1}
          />
        ))}
      </div>

      <div
        id="formation-personal-note"
        style={{
          maxWidth: '600px',
          margin: '64px auto 0',
          background: 'rgba(123, 47, 255, 0.05)',
          borderLeft: '3px solid #7B2FFF',
          borderRadius: '0 8px 8px 0',
          padding: '20px 24px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.5s',
        }}
      >
        <p
          id="formation-personal-note-text"
          style={{
            fontSize: '16px',
            color: 'rgba(240, 238, 255, 0.7)',
            lineHeight: 1.7,
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          Toutes mes formations avec OpenClassrooms — une école en ligne qui m'a permis d'apprendre en pratiquant, avec de vrais projets et de vraies alternances.
        </p>
      </div>

      <style>{`
        @keyframes nodePulse {
          0%, 100% { box-shadow: 0 0 8px rgba(123, 47, 255, 0.3); }
          50% { box-shadow: 0 0 20px rgba(123, 47, 255, 0.7), 0 0 40px rgba(123, 47, 255, 0.3); }
        }
      `}</style>
    </section>
  )
}
