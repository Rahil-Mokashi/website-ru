import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Mic, Pause } from 'lucide-react'
import { config, secrets } from '../../data/messages'
import { sfx } from '../../lib/sfx'
import { MagneticButton } from '../shared/Magnetic'
import { useMusic } from '../../lib/audioContext'
import { Reveal } from '../shared/Reveal'
import { asset } from '../../lib/asset'

/** Optional voice note: only renders if the mp3 exists. Pauses the music while it plays. */
function VoiceNote() {
  const music = useMusic()
  const a = useRef<HTMLAudioElement | null>(null)
  const [ok, setOk] = useState(false)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = new Audio()
    el.preload = 'metadata'
    el.onloadedmetadata = () => setOk(true)
    el.onplay = () => setOn(true)
    el.onpause = el.onended = () => setOn(false)
    el.src = asset(config.voiceNote)
    a.current = el
    return () => { el.pause(); el.src = '' }
  }, [])

  if (!ok) return null
  return (
    <div className="mx-auto mb-10 flex flex-col items-center gap-3">
      <p className="text-sm text-cream/60">I also left you a voice note.</p>
      <button
        className="btn breathe"
        onClick={() => { if (on) a.current?.pause(); else { if (music.playing) music.toggle(); void a.current?.play() } }}
      >
        {on ? <Pause size={18} /> : <Mic size={18} />} {on ? 'Pause' : 'Play it'}
      </button>
    </div>
  )
}

/** Screen 11 – "Wait." then a hidden set of cards behind a button. */
export function Secret() {
  const [shown, setShown] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { if (shown) setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250) }, [shown])

  return (
    <section id="secret" className="px-5 py-32 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center gap-6">
        <Reveal as="p" className="serif text-3xl italic">Wait.</Reveal>
        <Reveal as="p" delay={0.8} className="text-cream/70">There's one more thing.</Reveal>
        {!shown && (
          <Reveal delay={1.6} className="mt-6">
            <MagneticButton onClick={() => { sfx('chime'); setShown(true) }}>I wasn't going to show you this.</MagneticButton>
          </Reveal>
        )}
      </div>

      {shown && (
        <div ref={ref} className="mx-auto mt-32 max-w-3xl scroll-mt-10">
          <motion.h2 initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 1.6 }} className="mb-14 text-3xl sm:text-5xl">
            THE THINGS YOU<br />PROBABLY DON'T KNOW
          </motion.h2>
          <VoiceNote />
          <div className="grid gap-4 text-left sm:grid-cols-2">
            {secrets.map((t, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.9, delay: (i % 2) * 0.15 }}
                className="serif rounded-2xl border border-rose/25 bg-gradient-to-br from-indigo-deep/60 to-midnight/70 p-6 text-xl leading-snug"
              >
                {t}
              </motion.p>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
