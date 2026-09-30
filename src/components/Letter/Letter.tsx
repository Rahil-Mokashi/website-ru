import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { config, letter } from '../../data/messages'
import { sfx } from '../../lib/sfx'
import { MagneticButton } from '../shared/Magnetic'
import { Reveal } from '../shared/Reveal'

const fill = (t: string) => t.replace('{name}', config.herName).replace('{me}', config.myName)

/** Screen 10 – closed envelope → opens → paper reading environment, paragraph by paragraph. */
export function Letter({ onRead }: { onRead: () => void }) {
  const [stage, setStage] = useState<'closed' | 'opening' | 'open'>('closed')

  const open = () => {
    sfx('paper')
    setStage('opening')
    setTimeout(() => { setStage('open'); onRead() }, 1700)
  }

  return (
    <section id="letter" className="px-5 py-32">
      <AnimatePresence mode="wait">
        {stage !== 'open' ? (
          <motion.div key="env" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }} className="mx-auto flex max-w-sm flex-col items-center text-center">
            <Reveal as="h2" className="text-3xl italic sm:text-4xl">I wrote this while you were sleeping.</Reveal>

            <Reveal delay={0.4} className="mt-14 [perspective:900px]">
              <div className={`relative h-44 w-72 rounded-md bg-gradient-to-b from-beige to-[#cdbb98] shadow-2xl ${stage === 'closed' ? 'float' : ''}`}>
                {/* the letter peeking out */}
                <motion.div className="paper absolute inset-x-4 top-2 h-36 rounded-sm" animate={stage === 'opening' ? { y: -70 } : { y: 0 }} transition={{ duration: 1, delay: 0.5 }} />
                {/* front pocket */}
                <div className="absolute inset-0 rounded-md" style={{ background: 'linear-gradient(135deg, transparent 49.5%, rgba(0,0,0,.08) 50%) , linear-gradient(225deg, transparent 49.5%, rgba(0,0,0,.08) 50%)', backgroundColor: '#e2d2b0' }} />
                <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-md bg-[#dccaa4]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
                {/* flap */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-24 origin-top bg-[#d3bf96]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }}
                  animate={{ rotateX: stage === 'opening' ? 180 : 0 }}
                  transition={{ duration: 0.8 }}
                />
                {stage === 'closed' && <span className="absolute left-1/2 top-[70px] h-7 w-7 -translate-x-1/2 rounded-full bg-rose/80 shadow" aria-hidden />}
              </div>
            </Reveal>

            <Reveal delay={0.8} className="mt-14">
              <MagneticButton onClick={open} disabled={stage !== 'closed'} className="breathe">Open</MagneticButton>
            </Reveal>
          </motion.div>
        ) : (
          <motion.article
            key="letter"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}
            className="paper mx-auto max-w-xl rounded-md px-7 py-14 sm:px-14 sm:py-20"
            aria-label="Letter"
          >
            {letter.map((p, i) => {
              const last = i >= letter.length - 3
              const sign = i === letter.length - 1
              return (
                <Reveal key={i} className={`serif whitespace-pre-line text-[1.3rem] leading-[1.75] sm:text-2xl ${i === 0 ? 'italic' : ''} ${last ? 'font-medium' : ''} ${sign ? '!font-hand !text-4xl text-[#5a3d2b]' : ''} mb-7`}>
                  {fill(p)}
                </Reveal>
              )
            })}
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  )
}
