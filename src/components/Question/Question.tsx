import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { unfortunatelyReplies } from '../../data/messages'
import { sfx } from '../../lib/sfx'
import { MagneticButton } from '../shared/Magnetic'
import { Reveal } from '../shared/Reveal'

/** Screen 12 – a playful question. Either answer is "correct". */
export function Question({ onAnswered }: { onAnswered: () => void }) {
  const [answered, setAnswered] = useState(false)
  const [step, setStep] = useState(0) // 0 correct, 1 good, 2 because, 3 done
  const [annoyed, setAnnoyed] = useState(0)

  useEffect(() => {
    if (!answered) return
    const t = [setTimeout(() => setStep(1), 1800), setTimeout(() => setStep(2), 3400), setTimeout(() => { setStep(3); onAnswered() }, 6200)]
    return () => t.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered])

  const answer = () => { sfx('chime'); setAnswered(true) }
  const shake = annoyed > 0 ? { x: [0, -6, 6, -4, 4, 0] } : {}

  return (
    <section id="question" className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center">
      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div key="q" exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }} transition={{ duration: 0.7 }} className="flex flex-col items-center">
            <Reveal as="p" className="eyebrow">One very important question.</Reveal>
            <Reveal as="h2" delay={1.4} className="mt-8 max-w-md text-3xl italic leading-snug sm:text-5xl">Are you ready for another 10 months of me being annoying?</Reveal>
            <Reveal delay={2.4} className="mt-12 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
              <MagneticButton onClick={answer}>Yes ❤️</MagneticButton>
              <motion.div animate={shake} key={annoyed}>
                <MagneticButton onClick={() => { if (annoyed > 0) sfx('tick'); setAnnoyed((n) => n + 1); answer() }} className="w-full">Unfortunately, yes.</MagneticButton>
              </motion.div>
            </Reveal>
          </motion.div>
        ) : (
          <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex min-h-[40svh] flex-col items-center justify-center gap-6">
            <motion.p className="serif text-5xl italic sm:text-6xl" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>Correct answer.</motion.p>
            {step >= 1 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="serif text-3xl text-gold">Good.</motion.p>}
            {step >= 2 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="max-w-xs text-lg text-cream/80">Because I'm not done making memories with you.</motion.p>}
            {step >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="mt-6 flex flex-col items-center gap-6">
                <MagneticButton
                  onClick={() => { sfx('tick'); setAnnoyed((n) => n + 1) }}
                  className="!min-h-10 !px-4 !text-xs opacity-60"
                >
                  Unfortunately, yes.
                </MagneticButton>
                <p className="h-6 text-sm text-rose" aria-live="polite">{annoyed > 1 ? unfortunatelyReplies[Math.min(annoyed - 2, unfortunatelyReplies.length - 1)] : ''}</p>
                <p className="bounce-soft text-xs tracking-widest text-gold/70 uppercase">keep going</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
