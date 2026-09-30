import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { config, tenMonths } from '../../data/messages'
import { Reveal } from '../shared/Reveal'

/** Screen 3 – "10 MONTHS." with a slow 01 → 10 counter, then the honest bit about arguments. */
export function TenMonths() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(1)
  const days = Math.max(0, Math.floor((Date.now() - new Date(config.startDate).getTime()) / 864e5))

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setN((v) => (v >= 10 ? (clearInterval(id), 10) : v + 1)), 420)
    return () => clearInterval(id)
  }, [inView])

  return (
    <section id="months" className="relative px-6 py-32 text-center">
      <div ref={ref} className="mx-auto flex min-h-[70svh] max-w-xl flex-col items-center justify-center">
        <Reveal as="h2" className="text-6xl tracking-[0.06em] sm:text-8xl">10 MONTHS.</Reveal>
        <Reveal delay={0.4} className="mt-4 text-lg text-cream/70">That's a lot of days.</Reveal>
        {days > 0 && <Reveal delay={0.8} className="mt-1 text-sm text-gold/70">{days} of them, actually.</Reveal>}
        <div className="serif mt-6 text-5xl tabular-nums text-gold" aria-label="ten" aria-live="off">
          {String(n).padStart(2, '0')}
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-xl flex-col gap-10">
        <div className="flex flex-col gap-3 text-lg text-cream/80 sm:text-xl">
          {tenMonths.afterCounter.map((t) => <Reveal key={t} as="p">{t}</Reveal>)}
        </div>
        <Reveal className="mt-12 text-cream/70">And yes…</Reveal>
        <Reveal delay={0.4} className="-mt-6 text-cream/70">A few arguments too.</Reveal>
        <Reveal as="h3" className="mt-10 text-3xl italic leading-snug text-cream sm:text-4xl">Because real relationships aren't made of perfect days.</Reveal>
        <Reveal className="text-cream/70 sm:text-lg">They're made of ordinary days that somehow become memories.</Reveal>
        <motion.div className="mx-auto h-16 w-px bg-gradient-to-b from-gold/60 to-transparent" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 1.6 }} style={{ originY: 0 }} />
      </div>
    </section>
  )
}
