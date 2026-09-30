import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { config } from '../../data/messages'
import { Lines } from '../shared/Reveal'
import { useEgg } from '../EasterEggs/EasterEggs'

/** Screen 13 – the palette warms from midnight to sunrise as this section scrolls in. */
export function FinalScene({ onRestart }: { onRestart: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 20%'] })
  const sky = useTransform(scrollYProgress, [0, 1], [0, 1])
  const sunY = useTransform(scrollYProgress, [0, 1], ['45%', '0%'])
  const ink = useTransform(scrollYProgress, [0.5, 1], ['#f5ecdd', '#3a2a24'])
  const [done, setDone] = useState(false)
  const [showRestart, setShowRestart] = useState(false)
  const egg = useEgg()

  useEffect(() => { if (!done) return; const id = setTimeout(() => setShowRestart(true), 2000); return () => clearTimeout(id) }, [done])

  return (
    <motion.section id="sunrise" ref={ref} className="relative isolate overflow-hidden px-6 py-40 text-center" style={{ color: ink }}>
      {/* sunrise layers */}
      <motion.div className="absolute inset-0 -z-10" style={{ opacity: sky, background: 'linear-gradient(180deg, #3b3a6b 0%, #c98f8f 45%, #f3c98f 75%, #fbeacb 100%)' }} aria-hidden />
      <motion.div className="absolute inset-x-0 bottom-0 -z-10 mx-auto h-[70%] max-w-3xl rounded-full blur-3xl" style={{ opacity: sky, y: sunY, background: 'radial-gradient(circle at 50% 100%, rgba(255,214,140,.95), rgba(255,180,120,.35) 45%, transparent 70%)' }} aria-hidden />
      <motion.div style={{ opacity: sky }} className="absolute inset-0 -z-10" aria-hidden>
        <div className="cloud absolute left-[8%] top-[22%] h-10 w-64 rounded-full bg-white/30 blur-2xl" />
        <div className="cloud absolute right-[4%] top-[38%] h-12 w-80 rounded-full bg-white/25 blur-2xl [animation-direction:alternate-reverse]" />
        <div className="cloud absolute left-[20%] top-[60%] h-8 w-56 rounded-full bg-white/25 blur-2xl" />
      </motion.div>

      <motion.div style={{ opacity: sky }} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {Array.from({ length: 14 }, (_, i) => <span key={i} className="firefly" style={{ left: `${(i * 53) % 100}%`, animationDelay: `${(i % 7) * -1.7}s`, animationDuration: `${10 + (i % 4) * 2}s` }} />)}
      </motion.div>

      <div className="mx-auto flex min-h-[60svh] max-w-lg flex-col items-center justify-center gap-10">
        <h2 className="text-4xl leading-tight sm:text-6xl">GOOD MORNING, {config.herName.toUpperCase()}.</h2>

        <Lines
          gap={1.8}
          className="flex flex-col gap-4 text-lg leading-relaxed opacity-90 sm:text-xl"
          onDone={() => setDone(true)}
          lines={[
            { text: 'I hope this made you smile.' },
            { text: 'Even just a little.', pause: 0.5 },
            { text: 'Whatever today brings…', pause: 1 },
            { text: 'I hope you remember that somewhere in this very big world…', pause: 0.6 },
            { text: `there's a boy who is very, very grateful that he got to meet you.`, pause: 0.6 },
            { text: 'Happy 10 months.', strong: true, pause: 1.5, className: '!text-current mt-6' },
            { text: 'Still us.', className: 'serif italic text-2xl' },
            { text: 'Now go have a beautiful day.', pause: 1.5 },
            { text: 'P.S. I expect a hug when I see you.', className: 'text-sm opacity-70', pause: 0.5 },
          ]}
        />

        <div className="flex min-h-20 flex-col items-center gap-4">
          {showRestart && (
            <>
            {config.whatsappNumber && (
              <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.replyText)}`} target="_blank" rel="noreferrer" className="rounded-full border border-current/60 bg-white/20 px-6 py-3 text-sm backdrop-blur-sm">
                Tell him you're smiling 🙂
              </motion.a>
            )}
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} onClick={onRestart} className="rounded-full border border-current/40 px-5 py-2 text-xs tracking-[0.25em] uppercase opacity-70 hover:opacity-100">
              Start again?
            </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Easter egg: the tiny star */}
      <button onClick={() => egg(['One more thing…', `You're my favourite notification.`])} aria-label="a tiny star" className="absolute right-[14%] top-[14%] p-3 text-sm opacity-60 hover:opacity-100">✦</button>

      <p className="mt-24 text-[0.7rem] tracking-wide opacity-50">made with too much love &amp; probably too much code.</p>
    </motion.section>
  )
}
