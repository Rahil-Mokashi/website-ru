import { motion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

/** Fade-up + de-blur when scrolled into view (once). */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: {
  children: ReactNode; delay?: number; className?: string; as?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'span'
}) {
  const M = motion[as] as typeof motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.3, delay, ease }}
    >
      {children}
    </M>
  )
}

export interface Line { text: string; pause?: number; strong?: boolean; className?: string }

/**
 * Timed sequence: once the block is on screen, lines fade in one after another
 * (each line's `pause` adds seconds before it). `onDone` fires after the last line.
 */
export function Lines({ lines, gap = 1.6, className = '', lineClass = '', onDone }: {
  lines: Line[]; gap?: number; className?: string; lineClass?: string; onDone?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  let t = 0.3
  const delays = lines.map((l) => (t += gap + (l.pause ?? 0)))
  useEffect(() => {
    if (!seen || !onDone) return
    const id = setTimeout(onDone, (delays[delays.length - 1] + 1.4) * 1000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen])

  return (
    <div ref={ref} className={className}>
      {lines.map((l, i) => (
        <motion.p
          key={i}
          className={`${lineClass} ${l.className ?? ''} ${l.strong ? 'serif text-[1.9rem] sm:text-4xl text-cream' : ''}`}
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={seen ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.4, delay: delays[i] - gap, ease }}
        >
          {l.text}
        </motion.p>
      ))}
    </div>
  )
}
