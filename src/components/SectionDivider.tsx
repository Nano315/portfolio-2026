import { useReveal } from '../hooks/useReveal'

export default function SectionDivider() {
  const { ref, visible } = useReveal(0.5)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        position: 'relative',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Horizontal light line */}
      <div
        style={{
          width: visible ? '200px' : '0px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(123, 47, 255, 0.6), transparent)',
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Center dot */}
      <div
        style={{
          position: 'absolute',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#7B2FFF',
          boxShadow: visible ? '0 0 20px rgba(123, 47, 255, 0.8), 0 0 40px rgba(123, 47, 255, 0.4)' : 'none',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0)',
          transition: 'opacity 0.6s ease 0.3s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, box-shadow 0.6s ease 0.3s',
        }}
      />
    </div>
  )
}
