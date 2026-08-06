import { Contact } from './components/Contact'
import { Featured } from './components/Featured'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <div id="top">
      <Hero />
      <main>
        <Featured />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}
