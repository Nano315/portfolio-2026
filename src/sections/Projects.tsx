import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalType = 'skinpicker' | 'neo' | null

// ─── Data ─────────────────────────────────────────────────────────────────────

const SP_HIGHLIGHTS = [
  'Rooms multiplayer via Socket.io — synchronisation temps réel',
  'Intégration LCU API — accès au client League of Legends',
  'Architecture Electron : main process + renderer séparés',
  'UI React + Vite + TypeScript — composants modulaires',
  'Serveur Node.js / Express — gestion des rooms et des états',
]

const NEO_HIGHLIGHTS = [
  '2 ans au sein de l\'équipe Innovation chez iMSA',
  'Initialisation complète du backend Spring Boot — entités, services, architecture',
  'Conception du modèle de données (méthode Merise / MPD)',
  'Implémentation des fonctionnalités frontend en Angular (Signals, services métiers)',
  'Mise en place de l\'environnement Docker local (persistance BDD, scripts d\'init)',
  'Acteur principal des démos mensuelles — présentations aux RH, admins et référents innovation',
  'Proposition d\'outils de gestion de projet adoptés par l\'équipe',
  'Gestion de tickets et user stories en méthodologie Agile',
]

const NEO_STACK = [
  { cat: 'Frontend', items: 'Angular (Signals) · Tailwind CSS' },
  { cat: 'Backend', items: 'Java · Spring Boot' },
  { cat: 'Base de données', items: 'PostgreSQL · Merise (MPD)' },
  { cat: 'DevOps', items: 'Docker · GitLab CI/CD' },
]

const SP_STACK = [
  { cat: 'Frontend', items: 'Electron · React · Vite · TypeScript' },
  { cat: 'Backend', items: 'Node.js · Express · Socket.io' },
  { cat: 'Intégration', items: 'LCU API (League Client)' },
  { cat: 'Design', items: 'CSS Modules · DPM.lol inspired' },
]

// ─── Modal Shell ──────────────────────────────────────────────────────────────

function ModalShell({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(13, 11, 20, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '20px',
          padding: '48px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(123,47,255,0.4) transparent',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// ─── Reusable label ───────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'block',
      fontSize: '11px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#8B5CF6',
      marginBottom: '12px',
    }}>
      {children}
    </span>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  index,
  onClose,
}: {
  images: { src: string; alt: string }[]
  index: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(index)

  const goNext = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length])
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, goNext, goPrev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(0, 0, 0, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'zoom-out',
      }}
    >
      <motion.img
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={images[current].src}
        alt={images[current].alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          objectFit: 'contain',
          borderRadius: '8px',
          cursor: 'default',
        }}
      />

      {/* Nav arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Image précédente"
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F0EEFF',
              fontSize: '20px',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Image suivante"
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F0EEFF',
              fontSize: '20px',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          >
            ›
          </button>
        </>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <span style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '13px',
          color: 'rgba(240, 238, 255, 0.5)',
        }}>
          {current + 1} / {images.length}
        </span>
      )}
    </motion.div>
  )
}

// ─── Galerie horizontale ──────────────────────────────────────────────────────

function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        marginTop: '32px',
        paddingBottom: '8px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(123,47,255,0.3) transparent',
      }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
            style={{
              flexShrink: 0,
              height: '280px',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.15)',
              objectFit: 'cover',
              scrollSnapAlign: 'start',
              cursor: 'zoom-in',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Skin Picker Modal ────────────────────────────────────────────────────────

function ModalSkinPicker({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      {/* Close */}
      <button
        id="modal-sp-close"
        onClick={onClose}
        style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(240,238,255,0.5)', fontSize: '22px', lineHeight: 1,
          transition: 'color 0.2s, transform 0.2s',
          padding: '4px',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.color = '#F0EEFF'
          el.style.transform = 'rotate(90deg)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.color = 'rgba(240,238,255,0.5)'
          el.style.transform = 'rotate(0deg)'
        }}
        aria-label="Fermer"
      >
        ✕
      </button>

      {/* Header */}
      <div>
        <span id="modal-sp-badge" style={{
          display: 'inline-block',
          background: 'rgba(123,47,255,0.8)',
          color: '#fff',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderRadius: '4px',
          padding: '4px 10px',
        }}>
          Projet Personnel
        </span>
        <h2 id="modal-sp-title" style={{
          fontSize: '42px', fontWeight: 700,
          color: '#F0EEFF', letterSpacing: '-0.01em',
          marginTop: '12px', marginBottom: '8px',
        }}>
          Skin Picker
        </h2>
        <p id="modal-sp-meta" style={{
          fontSize: '14px', color: 'rgba(240,238,255,0.45)',
        }}>
          Application Desktop · Electron · 6 mois · En cours
        </p>
      </div>

      {/* Gallery */}
      <Gallery images={[
        { src: '/images/skinpicker/sp-1.png', alt: 'Skin Picker — vue principale' },
        { src: '/images/skinpicker/sp-2.png', alt: 'Skin Picker — sélection' },
        { src: '/images/skinpicker/sp-3.png', alt: 'Skin Picker — détail' },
        { src: '/images/skinpicker/sp-4.png', alt: 'Skin Picker — lobby' },
        { src: '/images/skinpicker/sp-5.png', alt: 'Skin Picker — choix skin' },
        { src: '/images/skinpicker/sp-6.png', alt: 'Skin Picker — résultat' },
        { src: '/images/skinpicker/sp-7.png', alt: 'Skin Picker — interface' },
      ]} />

      {/* 2-col description */}
      <div className="modal-content-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        marginTop: '40px',
      }}>
        {/* Left col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div id="modal-sp-context">
            <Label>Le Contexte</Label>
            <p id="modal-sp-context-text" style={{
              fontSize: '15px', color: 'rgba(240,238,255,0.75)', lineHeight: 1.7,
            }}>
              Avec des amis, choisir ses skins en équipe avant une partie prend du temps et manque de cohérence. J'ai voulu créer l'outil qu'on n'avait pas — une application desktop où toute l'équipe peut voir et choisir ses skins en temps réel.
            </p>
          </div>

          <div>
            <Label>Ce que j'ai construit</Label>
            <p id="modal-sp-solution-text" style={{
              fontSize: '15px', color: 'rgba(240,238,255,0.75)', lineHeight: 1.7,
            }}>
              Application Electron full-stack avec rooms multijoueur en temps réel via WebSocket. Intégration de la LCU API (League Client Update) pour récupérer les skins directement depuis le client LoL. Interface inspirée de DPM.lol — dark, immersive, gaming.
            </p>
          </div>

          <div>
            <Label>Points Techniques Clés</Label>
            <ul id="modal-sp-highlights" style={{
              listStyle: 'none', margin: 0, padding: 0,
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
              {SP_HIGHLIGHTS.map((item) => (
                <li key={item} style={{
                  fontSize: '14px',
                  color: 'rgba(240,238,255,0.7)',
                  lineHeight: 2.0,
                  paddingLeft: '16px',
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute', left: 0,
                    color: '#7B2FFF',
                  }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <Label>Stack Technique</Label>
            <div id="modal-sp-stack-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SP_STACK.map(({ cat, items }) => (
                <div key={cat} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                  <span style={{
                    fontSize: '11px',
                    color: 'rgba(139,92,246,0.7)',
                    minWidth: '80px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    flexShrink: 0,
                  }}>
                    {cat}
                  </span>
                  <span style={{ fontSize: '14px', color: 'rgba(240,238,255,0.75)' }}>
                    {items}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div id="modal-sp-links" style={{ marginTop: 'auto' }}>
            <a
              id="modal-sp-cta-github"
              href="https://github.com/Nano315/lol-skin-picker"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#7B2FFF', color: '#fff',
                borderRadius: '8px', padding: '12px 24px',
                fontWeight: 600, fontSize: '14px',
                transition: 'background 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { (e.currentTarget).style.background = '#8B5CF6' }}
              onMouseLeave={(e) => { (e.currentTarget).style.background = '#7B2FFF' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Voir le code sur GitHub →
            </a>
            <p id="modal-sp-github-note" style={{
              fontSize: '12px', color: 'rgba(240,238,255,0.35)', marginTop: '6px',
            }}>
              Repository public — code accessible
            </p>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}

// ─── Néo Modal ────────────────────────────────────────────────────────────────

function ModalNeo({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      {/* Close */}
      <button
        id="modal-neo-close"
        onClick={onClose}
        style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(240,238,255,0.5)', fontSize: '22px', lineHeight: 1,
          transition: 'color 0.2s, transform 0.2s',
          padding: '4px',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.color = '#F0EEFF'
          el.style.transform = 'rotate(90deg)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.color = 'rgba(240,238,255,0.5)'
          el.style.transform = 'rotate(0deg)'
        }}
        aria-label="Fermer"
      >
        ✕
      </button>

      {/* Header */}
      <div>
        <span id="modal-neo-badge" style={{
          display: 'inline-block',
          background: 'rgba(99,102,241,0.8)',
          color: '#fff',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderRadius: '4px',
          padding: '4px 10px',
        }}>
          Alternance Professionnelle
        </span>
        <h2 id="modal-neo-title" style={{
          fontSize: '42px', fontWeight: 700,
          color: '#F0EEFF', letterSpacing: '-0.01em',
          marginTop: '12px', marginBottom: '8px',
        }}>
          Néo
        </h2>
        <p id="modal-neo-meta" style={{
          fontSize: '14px', color: 'rgba(240,238,255,0.45)',
        }}>
          Application Web · iMSA · 2 ans · Alternance OpenClassrooms
        </p>
      </div>

      {/* Gallery */}
      <Gallery images={[
        { src: '/images/neo/parcours-decouverte.png', alt: 'Néo — Parcours découverte gamifié' },
        { src: '/images/neo/etape-contenu.png', alt: 'Néo — Contenu d\'une étape' },
        { src: '/images/neo/quiz-edition.png', alt: 'Néo — Éditeur de quiz' },
        { src: '/images/neo/gestion-droits.png', alt: 'Néo — Gestion des droits admin' },
        { src: '/images/neo/centre-aide.png', alt: 'Néo — Centre d\'aide' },
      ]} />

      {/* 2-col description */}
      <div className="modal-content-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        marginTop: '40px',
      }}>
        {/* Left col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <Label>Le Contexte</Label>
            <p id="modal-neo-context-text" style={{
              fontSize: '15px', color: 'rgba(240,238,255,0.75)', lineHeight: 1.7,
            }}>
              Néo est une plateforme d'onboarding développée au sein de l'équipe Innovation chez iMSA, déployée sur l'intranet à l'échelle nationale (iMSA, MSA, CCMSA). Elle permet aux RH de créer et gérer de manière autonome des parcours d'intégration pour les nouveaux arrivants — avec des contenus variés (vidéo, texte, liens), des quiz de validation, un organigramme, des plans de sites, un lexique, et bien plus.
            </p>
          </div>

          <div>
            <Label>Ma Contribution</Label>
            <p id="modal-neo-contribution-text" style={{
              fontSize: '15px', color: 'rgba(240,238,255,0.75)', lineHeight: 1.7,
            }}>
              J'ai initialisé l'intégralité du backend Spring Boot en début de projet — modèle de données (Merise), entités, services, architecture — posant les fondations sur lesquelles l'équipe a ensuite construit. Après ces premiers mois, j'ai basculé sur le frontend Angular où j'ai implémenté la majorité des fonctionnalités (Signals, services métiers), tout en maintenant le backend à jour quand nécessaire. Au-delà du code, j'ai été l'acteur principal de nos démos mensuelles face aux RH, futurs admins et référents innovation, et j'ai proposé des outils de gestion de projet adoptés par l'équipe.
            </p>
          </div>

          <div>
            <Label>Points Clés</Label>
            <ul id="modal-neo-highlights" style={{
              listStyle: 'none', margin: 0, padding: 0,
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
              {NEO_HIGHLIGHTS.map((item) => (
                <li key={item} style={{
                  fontSize: '14px',
                  color: 'rgba(240,238,255,0.7)',
                  lineHeight: 2.0,
                  paddingLeft: '16px',
                  position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: '#6366F1' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <Label>Stack Technique</Label>
            <div id="modal-neo-stack-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NEO_STACK.map(({ cat, items }) => (
                <div key={cat} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                  <span style={{
                    fontSize: '11px',
                    color: 'rgba(139,92,246,0.7)',
                    minWidth: '100px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    flexShrink: 0,
                  }}>
                    {cat}
                  </span>
                  <span style={{ fontSize: '14px', color: 'rgba(240,238,255,0.75)' }}>
                    {items}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Code propriétaire */}
          <div id="modal-neo-code-note" style={{
            marginTop: 'auto',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            gap: '10px',
          }}>
            <span id="modal-neo-code-note-icon" style={{ fontSize: '16px', flexShrink: 0 }}>🔒</span>
            <p id="modal-neo-code-note-text" style={{
              fontSize: '13px', color: 'rgba(240,238,255,0.45)', lineHeight: 1.6, margin: 0,
            }}>
              Code propriétaire — non disponible publiquement. Les captures d'écran ci-dessus illustrent l'interface et les fonctionnalités développées.
            </p>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  id,
  name,
  duration,
  description,
  badge,
  badgeColor,
  stack,
  delay,
  featured,
  image,
  onClick,
  visible,
}: {
  id: string
  name: string
  duration: string
  description: string
  badge: string
  badgeColor: string
  stack: string[]
  delay: number
  featured?: boolean
  image?: string
  onClick: () => void
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <article
      id={id}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '420px',
        background: 'rgba(13, 11, 20, 0.7)',
        border: `1px solid ${hovered ? '#7B2FFF' : 'rgba(139, 92, 246, 0.25)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 8px 32px rgba(123, 47, 255, 0.25), 0 0 64px rgba(123, 47, 255, 0.1)'
          : 'none',
        transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease, opacity 0.6s ease, translate 0.6s ease',
        opacity: visible ? 1 : 0,
        translate: visible ? '0 0' : '0 24px',
        transitionDelay: `${delay}s`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Mouse-tracking glow */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 1,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(123, 47, 255, 0.12), transparent 60%)`,
          }}
        />
      )}
      {/* Visual */}
      <div style={{
        height: '220px',
        flexShrink: 0,
        background: featured
          ? 'linear-gradient(135deg, rgba(123,47,255,0.15) 0%, rgba(13,11,20,0.8) 100%)'
          : 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(13,11,20,0.8) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(240,238,255,0.15)',
        fontSize: '13px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {image ? (
          <img
            src={image}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top left',
            }}
          />
        ) : (
          'Screenshot à ajouter'
        )}

        {/* Gradient overlay bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          background: 'linear-gradient(to bottom, transparent, rgba(13,11,20,0.9))',
        }} />

        {/* Badge */}
        <span style={{
          position: 'absolute', top: '16px', left: '16px',
          background: badgeColor,
          color: '#fff',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderRadius: '4px',
          padding: '4px 10px',
          zIndex: 1,
        }}>
          {badge}
        </span>
      </div>

      {/* Hover CTA overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(123, 47, 255, 0.15)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.2s ease',
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        <span style={{
          fontSize: '16px', fontWeight: 700, color: '#F0EEFF',
          background: 'rgba(13,11,20,0.6)',
          padding: '10px 24px',
          borderRadius: '8px',
          border: '1px solid rgba(139,92,246,0.3)',
        }}>
          Voir le projet →
        </span>
      </div>

      {/* Text zone */}
      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <h3 style={{
          fontSize: featured ? '28px' : '24px',
          fontWeight: 700, color: '#F0EEFF', margin: 0,
        }}>
          {name}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(240,238,255,0.45)', margin: 0 }}>
          {duration}
        </p>
        <p style={{
          fontSize: '15px', color: 'rgba(240,238,255,0.7)',
          lineHeight: 1.5, margin: '4px 0 0',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {description}
        </p>

        {stack.length > 0 && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px',
          }}>
            {stack.map((tech) => (
              <span key={tech} style={{
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.2)',
                color: '#A78BFA',
                fontSize: '11px',
                borderRadius: '4px',
                padding: '3px 8px',
              }}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const { ref, visible } = useReveal()

  return (
    <>
      <section
        id="projets"
        ref={ref as React.RefObject<HTMLElement>}
        style={{ padding: '60px 40px 60px', maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '56px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <h2 id="projects-section-title" style={{
            fontSize: '48px', fontWeight: 700,
            color: '#F0EEFF', letterSpacing: '-0.01em', margin: 0,
          }}>
            Mes Projets
          </h2>
          <p id="projects-section-subtitle" style={{
            fontSize: '16px', color: 'rgba(240,238,255,0.5)', marginTop: '12px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
          }}>
            Ce que j'ai construit — code disponible sur GitHub
          </p>
        </div>

        {/* Bento grid */}
        <div className="projects-grid" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
        }}>
          <ProjectCard
            id="projects-card-skinpicker"
            name="Skin Picker"
            duration="6 mois · En cours"
            description="Application desktop multiplayer pour choisir ses skins League of Legends en équipe — inspiré de DPM.lol."
            badge="Projet Personnel"
            badgeColor="rgba(123,47,255,0.8)"
            stack={['Electron', 'React', 'Node.js', 'Socket.io', 'TypeScript']}
            featured
            image="/images/skinpicker/sp-1.png"
            delay={0.1}
            visible={visible}
            onClick={() => setActiveModal('skinpicker')}
          />
          <ProjectCard
            id="projects-card-neo"
            name="Néo"
            duration="2 ans · Alternance"
            description="Application web d'onboarding pour l'intranet iMSA — développée sur 2 ans en alternance, déployée à l'échelle nationale."
            badge="Alternance Pro"
            badgeColor="rgba(99,102,241,0.8)"
            stack={['Angular', 'Tailwind', 'Java Spring Boot', 'PostgreSQL', 'Docker']}
            image="/images/neo/parcours-decouverte.png"
            delay={0.2}
            visible={visible}
            onClick={() => setActiveModal('neo')}
          />
        </div>

        {/* GitHub link */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            id="projects-more-link"
            href="https://github.com/Nano315"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '14px',
              color: 'rgba(139,92,246,0.7)',
              textDecoration: 'underline',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget).style.color = '#7B2FFF' }}
            onMouseLeave={(e) => { (e.currentTarget).style.color = 'rgba(139,92,246,0.7)' }}
          >
            Voir tous mes projets sur GitHub →
          </a>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'skinpicker' && (
          <ModalSkinPicker onClose={() => setActiveModal(null)} />
        )}
        {activeModal === 'neo' && (
          <ModalNeo onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
