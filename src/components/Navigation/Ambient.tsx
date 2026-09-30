import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useEgg } from '../EasterEggs/EasterEggs'
import { config } from '../../data/messages'

/** Fixed backdrop: midnight gradient that drifts deeper as you scroll, twinkling stars, a clickable moon, cursor glow. */
export function Ambient() {
  const { scrollYProgress, scrollY } = useScroll()
  const bg = useTransform(scrollYProgress, [0, 0.35, 0.7, 0.9], ['#070b1a', '#0d1533', '#0a0f26', '#070b1a'])
  const moonOpacity = useTransform(scrollY, [0, 700], [0.9, 0])
  const [moonOn, setMoonOn] = useState(true)
  useMotionValueEvent(moonOpacity, 'change', (v) => setMoonOn(v > 0.15))
  const egg = useEgg()
  const clicks = useRef(0)
  const glow = useRef<HTMLDivElement>(null)

  const stars = useMemo(
    () => Array.from({ length: 46 }, (_, i) => ({ x: (i * 37.3) % 100, y: (i * 61.7) % 100, s: 1 + (i % 3) * 0.6, d: (i % 9) * -0.7 })),
    [],
  )

  // Cursor glow – desktop only, updates a CSS transform on pointer move (no continuous loop).
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = (e: PointerEvent) => { if (glow.current) glow.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)` }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <>
      <motion.div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundColor: bg }} aria-hidden>
        {stars.map((s, i) => (
          <span key={i} className="twinkle absolute rounded-full bg-cream" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
        ))}
        {[[12, 18, 3], [55, 8, 9], [30, 40, 15]].map(([x, y, d]) => <span key={d} className="shoot" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }} />)}
        <div ref={glow} className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full opacity-0 [@media(hover:hover)]:opacity-100" style={{ background: 'radial-gradient(circle, rgba(216,182,117,.10), transparent 65%)' }} />
      </motion.div>

      {/* Easter egg: click the moon 7 times */}
      <motion.button
        aria-label="The moon"
        tabIndex={moonOn ? 0 : -1}
        style={{ opacity: moonOpacity, pointerEvents: moonOn ? 'auto' : 'none' }}
        onClick={() => { if (++clicks.current >= 7) { clicks.current = 0; egg(['Okay why are you clicking the moon?']) } }}
        className="fixed right-5 top-6 z-30 h-10 w-10 rounded-full bg-cream/90 shadow-[0_0_40px_6px_rgba(245,236,221,.25)] [box-shadow:inset_-8px_-2px_0_0_#c9bfae,0_0_40px_6px_rgba(245,236,221,.25)]"
      />
      <span className="sr-only">Made for {config.herName}</span>
    </>
  )
}
