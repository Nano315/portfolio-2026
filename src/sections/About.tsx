import { useState, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

// ─── Floating Icons ──────────────────────────────────────────────────────────

const FLOATING_ICONS = [
  { emoji: '🏀', size: 28, top: '8%', left: '5%', duration: 6, delay: 0 },
  { emoji: '⌨️', size: 24, top: '15%', left: '88%', duration: 7, delay: 1.5 },
  { emoji: '🎮', size: 26, top: '75%', left: '92%', duration: 8, delay: 0.8 },
  { emoji: '💪', size: 22, top: '85%', left: '3%', duration: 6.5, delay: 2 },
  { emoji: '🧱', size: 20, top: '5%', left: '50%', duration: 7.5, delay: 3 },
  { emoji: '🚀', size: 22, top: '45%', left: '95%', duration: 9, delay: 1 },
  { emoji: '💡', size: 20, top: '50%', left: '0%', duration: 8.5, delay: 2.5 },
  { emoji: '🏃', size: 22, top: '90%', left: '55%', duration: 7, delay: 0.5 },
]

function FloatingIcons({ visible }: { visible: boolean }) {
  return (
    <>
      {FLOATING_ICONS.map((icon, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: icon.top,
            left: icon.left,
            fontSize: `${icon.size}px`,
            opacity: visible ? 0.4 : 0,
            transition: `opacity 1s ease ${0.5 + i * 0.15}s`,
            animation: visible ? `aboutFloat${i % 3} ${icon.duration}s ease-in-out ${icon.delay}s infinite` : 'none',
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'grayscale(0.3)',
          }}
        >
          {icon.emoji}
        </span>
      ))}
    </>
  )
}

// ─── 3D Tilt Card ────────────────────────────────────────────────────────────

function TiltCard({ children, visible }: { children: React.ReactNode; visible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'rgba(13, 11, 20, 0.6)',
        border: `1px solid ${isHovered ? 'rgba(139, 92, 246, 0.4)' : 'rgba(139, 92, 246, 0.2)'}`,
        borderRadius: '16px',
        padding: '40px 44px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        opacity: visible ? 1 : 0,
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: isHovered
          ? 'border-color 0.3s ease, opacity 0.6s ease 0.2s'
          : 'border-color 0.3s ease, opacity 0.6s ease 0.2s, transform 0.5s ease',
        boxShadow: isHovered
          ? `0 8px 32px rgba(123, 47, 255, 0.15), 0 0 60px rgba(123, 47, 255, 0.05)`
          : 'none',
        position: 'relative',
        zIndex: 1,
        willChange: 'transform',
      }}
    >
      {/* Shine effect */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background: `linear-gradient(${105 + tilt.rotateY * 5}deg, transparent 40%, rgba(139, 92, 246, 0.06) 50%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </div>
  )
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function About() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: '60px 40px',
        maxWidth: '720px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Floating icons */}
      <FloatingIcons visible={visible} />

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#F0EEFF',
            margin: '0 0 40px',
            textAlign: 'center',
          }}
        >
          Un peu plus sur moi
        </h2>

        <TiltCard visible={visible}>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(240, 238, 255, 0.75)',
              lineHeight: 1.8,
              margin: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Ma passion pour le développement a commencé de manière assez inattendue — sur Minecraft, avec les command blocks. De fil en aiguille, j'ai découvert le développement web, les jeux vidéo, l'algorithmie… et je ne me suis jamais arrêté. Chaque nouveau projet était une excuse pour apprendre quelque chose, et j'en ai toujours eu plusieurs en parallèle.
          </p>

          <p
            style={{
              fontSize: '16px',
              color: 'rgba(240, 238, 255, 0.75)',
              lineHeight: 1.8,
              margin: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            En dehors du code, je suis quelqu'un qui aime bouger et découvrir. Musculation, course, basket — le sport de mon enfance — ça fait partie de mon quotidien. J'aime aussi sortir, rencontrer de nouvelles personnes et tester de nouvelles activités. La curiosité, c'est un peu mon moteur, que ce soit devant un écran ou en dehors.
          </p>
        </TiltCard>
      </div>

      <style>{`
        @keyframes aboutFloat0 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(5deg); }
          66% { transform: translateY(6px) rotate(-3deg); }
        }
        @keyframes aboutFloat1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(8px) rotate(-4deg); }
          75% { transform: translateY(-10px) rotate(6deg); }
        }
        @keyframes aboutFloat2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-5deg); }
        }
      `}</style>
    </section>
  )
}
