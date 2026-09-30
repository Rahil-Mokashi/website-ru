import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { sfx } from '../../lib/sfx'

const Ctx = createContext<(lines: string[]) => void>(() => {})
/** Call `useEgg()(["line one", "line two"])` anywhere to show a small hidden message. */
export const useEgg = () => useContext(Ctx)

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<string[] | null>(null)

  const show = useCallback((l: string[]) => { sfx('chime'); setLines(l) }, [])

  // Egg: press "R"
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r' && !e.metaKey && !e.ctrlKey && !e.altKey && !(e.target instanceof HTMLInputElement))
        show(['R = Rahil was thinking about you again.'])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show])

  useEffect(() => {
    if (!lines) return
    const id = setTimeout(() => setLines(null), 4800)
    return () => clearTimeout(id)
  }, [lines])

  return (
    <Ctx.Provider value={show}>
      {children}
      <AnimatePresence>
        {lines && (
          <motion.div
            role="status"
            aria-live="polite"
            onClick={() => setLines(null)}
            className="fixed inset-x-4 bottom-24 z-[70] mx-auto max-w-sm cursor-pointer rounded-2xl border border-gold/30 bg-night/85 px-6 py-5 text-center backdrop-blur-md sm:bottom-10"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          >
            {lines.map((l, i) => <p key={i} className={i === 0 ? 'serif text-xl text-cream' : 'mt-1 text-sm text-cream/70'}>{l}</p>)}
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}
