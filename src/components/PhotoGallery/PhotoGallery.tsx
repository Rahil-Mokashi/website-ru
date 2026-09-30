import { motion } from 'framer-motion'
import { useState } from 'react'
import { photos } from '../../data/photos'
import { sfx } from '../../lib/sfx'
import { useEgg } from '../EasterEggs/EasterEggs'
import { Photo } from '../shared/Photo'
import { Reveal } from '../shared/Reveal'
import { Lightbox } from './Lightbox'

const width = { s: 'w-[46%] sm:w-44', m: 'w-[52%] sm:w-56', l: 'w-[62%] sm:w-64' }

/** Screen 6 – overlapping polaroids instead of a grid. Tap one for the lightbox. */
export function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null)
  const egg = useEgg()

  return (
    <section id="photos" className="px-4 py-28">
      <Reveal className="mb-16 text-center">
        <p className="eyebrow mb-4">A wall of us</p>
        <h2 className="text-4xl sm:text-6xl">THINGS I NEVER<br />WANT TO FORGET</h2>
      </Reveal>

      <div className="mx-auto flex max-w-3xl flex-wrap items-start justify-center gap-y-0 px-2">
        {photos.map((p, i) => (
          <motion.button
            key={p.image}
            onClick={() => { sfx('paper'); setActive(i) }}
            aria-label={`Open photo: ${p.caption}`}
            className={`polaroid relative ${width[p.size]} ${i % 2 ? 'mt-10' : '-mb-2'} -mx-1.5 sm:-mx-2 shrink-0 text-left`}
            style={{ zIndex: (i * 7) % 5 }}
            initial={{ opacity: 0, y: 60, rotate: p.tilt * 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: p.tilt }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
            whileTap={{ scale: 0.96 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ type: 'spring', stiffness: 110, damping: 15 }}
          >
            <Photo src={p.image} alt={p.caption} className="aspect-[4/5] w-full" />
            <span className="absolute inset-x-0 bottom-1.5 text-center font-hand text-base leading-none text-[#3b3327]">{p.date}</span>
            {p.note && <span className="absolute -right-1 -top-4 rotate-6 font-hand text-lg text-rose drop-shadow">{p.note}</span>}
          </motion.button>
        ))}
      </div>

      <p className="mt-16 text-center text-xs text-cream/40">
        that's only some of them
        {/* Easter egg: a tiny heart */}
        <button onClick={() => egg(['You found this.', 'I knew you would.'])} aria-label="a tiny heart" className="ml-2 inline-block p-2 align-middle text-[10px] text-rose/40 hover:text-rose">♥</button>
      </p>

      <Lightbox index={active} onClose={() => setActive(null)} onChange={setActive} />
    </section>
  )
}
