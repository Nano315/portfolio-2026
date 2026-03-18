import { useParallax } from '../hooks/useParallax'

const ORBS = [
  { top: '15vh', left: '10%', size: 400, speed: 0.03, opacity: 0.07, delay: 0 },
  { top: '45vh', left: '75%', size: 350, speed: -0.02, opacity: 0.05, delay: 2 },
  { top: '85vh', left: '20%', size: 300, speed: 0.04, opacity: 0.06, delay: 4 },
  { top: '130vh', left: '65%', size: 450, speed: -0.03, opacity: 0.08, delay: 1 },
  { top: '180vh', left: '5%', size: 350, speed: 0.025, opacity: 0.05, delay: 3 },
  { top: '240vh', left: '80%', size: 400, speed: -0.035, opacity: 0.07, delay: 5 },
  { top: '310vh', left: '30%', size: 300, speed: 0.02, opacity: 0.06, delay: 2 },
  { top: '380vh', left: '70%', size: 350, speed: -0.025, opacity: 0.05, delay: 4 },
]

export default function AmbientGlow() {
  const scrollY = useParallax()

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {ORBS.map((orb, i) => {
        const yOffset = scrollY * orb.speed
        const floatY = Math.sin((scrollY * 0.002) + orb.delay) * 20

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: orb.top,
              left: orb.left,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(123, 47, 255, ${orb.opacity}) 0%, transparent 70%)`,
              transform: `translate(-50%, -50%) translateY(${yOffset + floatY}px)`,
              filter: 'blur(60px)',
              willChange: 'transform',
            }}
          />
        )
      })}
    </div>
  )
}
