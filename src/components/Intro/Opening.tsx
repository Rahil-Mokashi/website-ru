import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { sfx } from '../../lib/sfx'

/** Screen 1 – dark and almost empty. Two lines, a pause, then a breathing button. */
export function Opening({ onOpen }: { onOpen: () => void }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = [setTimeout(() => setStep(1), 1200), setTimeout(() => setStep(2), 4200), setTimeout(() => setStep(3), 6600)]
    return () => t.forEach(clearTimeout)
  }, [])

  const fade = (on: boolean) => ({ initial: { opacity: 0, filter: 'blur(6px)' }, animate: on ? { opacity: 1, filter: 'blur(0px)' } : {}, transition: { duration: 1.6 } })

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 bg-night px-6 text-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8, ease: 'easeInOut' }}
    >
      <motion.p {...fade(step >= 1)} className="serif text-xl tracking-wide text-cream/80 sm:text-2xl">Before you start your day…</motion.p>
      <motion.p {...fade(step >= 2)} className="serif text-2xl text-cream sm:text-3xl">I made you something.</motion.p>
      <motion.div {...fade(step >= 3)} className="mt-6">
        <button
          disabled={step < 3}
          onClick={() => { sfx('chime'); onOpen() }}
          className="btn breathe px-10 text-base"
          aria-label="Open it"
        >
          Open it
        </button>
      </motion.div>
    </motion.div>
  )
}
