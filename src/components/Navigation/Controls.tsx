import { motion, useScroll, useSpring } from 'framer-motion'
import { Music2, Pause, Volume2, VolumeX } from 'lucide-react'
import { useMusic } from '../../lib/audioContext'

/** Thin progress line + small floating music / mute buttons (thumb-reachable, bottom right). */
export function Controls() {
  const m = useMusic()
  const { scrollYProgress } = useScroll()
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const b = 'grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-night/70 text-cream backdrop-blur-md'
  return (
    <>
      <motion.div className="fixed left-0 top-0 z-40 h-[2px] w-full origin-left bg-gold/60" style={{ scaleX: w }} aria-hidden />
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 pb-[env(safe-area-inset-bottom)]">
        {m.hasMusic && <button onClick={m.toggle} aria-label={m.playing ? 'Pause music' : 'Play music'} className={b}>{m.playing ? <Pause size={18} /> : <Music2 size={18} />}</button>}
        <button onClick={m.toggleMute} aria-label={m.muted ? 'Unmute' : 'Mute'} aria-pressed={m.muted} className={b}>{m.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
      </div>
    </>
  )
}
