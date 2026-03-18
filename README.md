# Portfolio — Valentin

Portfolio personnel de développeur Full Stack, conçu pour décrocher une alternance Java Angular à Toulouse en septembre 2026.

## Stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** — animations et transitions
- **tsParticles** — effet particules interactif (Hero)

## Structure

```
src/
├── components/
│   ├── AmbientGlow.tsx    # Orbes violet flottants en background
│   ├── Nav.tsx            # Navigation fixe avec glassmorphism au scroll
│   └── SectionDivider.tsx # Séparateurs lumineux entre sections
├── hooks/
│   ├── useParallax.ts     # Hook scroll position (rAF optimisé)
│   └── useReveal.ts       # Hook IntersectionObserver pour les animations
└── sections/
    ├── Hero.tsx           # Landing plein écran avec particules
    ├── Projects.tsx       # Grille bento + modales + lightbox
    ├── Skills.tsx         # Grille 2×2 de compétences
    ├── Formation.tsx      # Timeline parcours OpenClassrooms
    ├── About.tsx          # Section personnelle avec tilt 3D
    └── Contact.tsx        # Coordonnées + footer
```

## Lancer le projet

```bash
npm install --legacy-peer-deps
npm run dev
```

## Build

```bash
npm run build
```

## Déploiement

Le projet est déployé sur **Vercel** avec build automatique à chaque push sur `main`.
