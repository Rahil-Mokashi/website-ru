import { useEffect, useState } from 'react'
import { Ambient } from './components/Navigation/Ambient'
import { Controls } from './components/Navigation/Controls'
import { FirstMessage } from './components/Intro/FirstMessage'
import { TenMonths } from './components/Intro/TenMonths'
import { MemoryTimeline } from './components/MemoryTimeline/MemoryTimeline'
import { Reasons } from './components/Reasons/Reasons'
import { PhotoGallery } from './components/PhotoGallery/PhotoGallery'
import { MusicPlayer } from './components/MusicPlayer/MusicPlayer'
import { EmotionalTurn, WhatIWantToDo } from './components/Emotional/Emotional'
import { Letter } from './components/Letter/Letter'
import { Secret } from './components/Secret/Secret'
import { Question } from './components/Question/Question'
import { FinalScene } from './components/FinalScene/FinalScene'

/** Everything after "Open it". Lazy-loaded so the first screen stays tiny. */
export default function Experience({ onRestart }: { onRestart: () => void }) {
  const [letterRead, setLetterRead] = useState(false)
  const [answered, setAnswered] = useState(false)

  // After the question resolves, gently reveal the sunrise below.
  useEffect(() => {
    if (!answered) return
    const id = setTimeout(() => document.getElementById('sunrise')?.scrollIntoView({ behavior: 'smooth' }), 2500)
    return () => clearTimeout(id)
  }, [answered])

  return (
    <main>
      <Ambient />
      <Controls />
      <FirstMessage />
      <TenMonths />
      <MemoryTimeline />
      <Reasons />
      <PhotoGallery />
      <MusicPlayer />
      <EmotionalTurn />
      <WhatIWantToDo />
      <Letter onRead={() => setLetterRead(true)} />
      {letterRead && <Secret />}
      {letterRead && <Question onAnswered={() => setAnswered(true)} />}
      {answered && <FinalScene onRestart={onRestart} />}
    </main>
  )
}
