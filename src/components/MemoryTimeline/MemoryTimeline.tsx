import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { memories, type Memory } from '../../data/memories'
import { Photo } from '../shared/Photo'
import { Reveal } from '../shared/Reveal'

/** Screen 4 – vertical timeline; photos are "placed" into the scrapbook as they scroll in. */
export function MemoryTimeline() {
  return (
    <section id="timeline" className="relative px-5 py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-20 text-center">
          <p className="eyebrow mb-4">Our timeline</p>
          <h2 className="text-4xl sm:text-6xl">HOW WE GOT HERE</h2>
        </Reveal>

        <ol className="relative">
          {/* the thread */}
          <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent md:left-1/2" aria-hidden />
          {memories.map((m, i) => <Entry key={m.month} m={m} i={i} />)}
        </ol>
      </div>
    </section>
  )
}

function Entry({ m, i }: { m: Memory; i: number }) {
  const right = i % 2 === 1
  const tilt = right ? 2.2 : -2.2
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], [24, -24]) // gentle parallax on the words
  return (
    <li ref={ref} className={`relative mb-24 pl-10 md:grid md:grid-cols-2 md:gap-16 md:pl-0 ${right ? '' : ''}`}>
      <span className="absolute left-3 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_16px_2px_var(--color-gold)] md:left-1/2" aria-hidden />

      {/* photo */}
      <motion.figure
        className={`${right ? 'md:order-2' : ''} mx-auto w-full max-w-[19rem] md:max-w-sm`}
        initial={{ opacity: 0, y: -60, scale: 1.18, rotate: tilt * 4 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: tilt }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ type: 'spring', stiffness: 90, damping: 14, mass: 1.1 }}
      >
        <div className="polaroid relative">
          <span className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-4deg] bg-beige/60 shadow-sm" aria-hidden />
          <Photo src={m.image} alt={`${m.title} — ${m.caption}`} className="aspect-[4/5] w-full" />
          <figcaption className="absolute inset-x-0 bottom-2 text-center font-hand text-lg text-[#3b3327]">{m.caption}</figcaption>
        </div>
      </motion.figure>

      {/* words */}
      <motion.div style={{ y: drift }}><Reveal className={`mt-8 md:mt-2 ${right ? 'md:order-1 md:text-right' : ''}`}>
        <p className="eyebrow">Month {m.month}</p>
        <p className="mt-1 text-xs tracking-widest text-cream/40 uppercase">{m.date}</p>
        <h3 className="mt-3 text-3xl italic sm:text-4xl">{m.title}</h3>
        <p className="mt-3 max-w-sm text-cream/75 md:inline-block">{m.story}</p>
        {m.insideJoke && <p className="mt-3 font-hand text-xl text-rose">“{m.insideJoke}”</p>}
      </Reveal></motion.div>
    </li>
  )
}
