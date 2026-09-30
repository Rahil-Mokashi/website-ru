import { AnimatePresence, MotionConfig } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Opening } from './components/Intro/Opening'
import { EasterEggProvider } from './components/EasterEggs/EasterEggs'
import { MusicProvider, useMusic } from './lib/audioContext'

const loadExperience = () => import('./Experience')
const Experience = lazy(loadExperience)

function Shell() {
  const [opened, setOpened] = useState(false)
  const music = useMusic()

  // Fetch the rest of the site while she watches the opening lines.
  useEffect(() => { const id = setTimeout(loadExperience, 800); return () => clearTimeout(id) }, [])

  // Lock scroll until she opens it.
  useEffect(() => { document.body.style.overflow = opened ? '' : 'hidden' }, [opened])

  const restart = () => {
    music.stop()
    window.scrollTo({ top: 0, behavior: 'instant' })
    setOpened(false)
  }

  return (
    <>
      <AnimatePresence>{!opened && <Opening onOpen={() => setOpened(true)} />}</AnimatePresence>
      {opened && (
        <Suspense fallback={null}>
          <Experience onRestart={restart} />
        </Suspense>
      )}
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <MusicProvider>
        <EasterEggProvider>
          <Shell />
        </EasterEggProvider>
      </MusicProvider>
    </MotionConfig>
  )
}
