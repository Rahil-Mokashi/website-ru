import { motion } from 'framer-motion'
import { Coffee, Heart, MessageCircle, Moon, Music, Camera, Smile, Sparkles, Star, Sun, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { reasons } from '../../data/reasons'
import { sfx } from '../../lib/sfx'
import { Reveal } from '../shared/Reveal'

const icons: Record<string, LucideIcon> = { sparkles: Sparkles, smile: Smile, message: MessageCircle, heart: Heart, sun: Sun, moon: Moon, coffee: Coffee, music: Music, camera: Camera, star: Star }

// deterministic "random" tilt so it doesn't jump between renders
const tiltOf = (i: number) => [-3.2, 2.4, -1.8, 3.1, -2.6, 1.9][i % 6]

/** Screen 5 – floating memory cards. Tap one: it straightens, grows and says a little more. */
export function Reasons() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="little" className="px-5 py-28">
      <Reveal className="mb-16 text-center">
        <p className="eyebrow mb-4">Things I notice</p>
        <h2 className="text-4xl italic sm:text-6xl">It's the little things.</h2>
        <p className="mt-4 text-sm text-cream/50">(tap a card)</p>
      </Reveal>

      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
        {reasons.map((r, i) => {
          const Icon = icons[r.icon] ?? Sparkles
          const isOpen = open === i
          return (
            <motion.button
              key={r.title}
              aria-expanded={isOpen}
              onClick={() => { sfx('tick'); setOpen(isOpen ? null : i) }}
              className={`float rounded-2xl border border-gold/20 bg-gradient-to-b from-indigo-deep/70 to-midnight/80 p-6 text-left backdrop-blur-sm ${i % 2 ? 'sm:mt-10' : ''} ${isOpen ? 'z-10 border-gold/60' : ''}`}
              style={{ animationDelay: `${i * -1.3}s` }}
              initial={{ opacity: 0, y: 40, rotate: tiltOf(i) * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: isOpen ? 0 : tiltOf(i) }}
              animate={{ rotate: isOpen ? 0 : tiltOf(i), scale: isOpen ? 1.04 : 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: isOpen ? 0 : (i % 2) * 0.12 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon size={20} strokeWidth={1.3} className="text-gold" aria-hidden />
              <p className="serif mt-4 text-2xl leading-snug">{r.text}</p>
              <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden">
                <p className="pt-4 text-sm text-rose">{r.more}</p>
              </motion.div>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
