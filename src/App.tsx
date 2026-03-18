import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Formation from './sections/Formation'
import About from './sections/About'
import Contact from './sections/Contact'
import Nav from './components/Nav'
import AmbientGlow from './components/AmbientGlow'
import SectionDivider from './components/SectionDivider'

function App() {
  return (
    <>
      <AmbientGlow />
      <Nav />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Formation />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Contact />
      </main>
    </>
  )
}

export default App
