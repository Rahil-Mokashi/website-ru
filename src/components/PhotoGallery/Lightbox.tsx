import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { photos } from '../../data/photos'
import { sfx } from '../../lib/sfx'
import { asset } from '../../lib/asset'
import { Photo } from '../shared/Photo'

/** Fullscreen viewer: blur backdrop, swipe / arrow keys / buttons, Esc to close. */
export function Lightbox({ index, onClose, onChange }: { index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = index !== null

  const go = (d: number) => { if (index === null) return; sfx('paper'); onChange((index + d + photos.length) % photos.length) }

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    // warm the cache so swiping to a neighbour is instant
    if (index !== null) [1, -1].forEach((d) => { new Image().src = asset(photos[(index + d + photos.length) % photos.length].image) })
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index])

  const p = index !== null ? photos[index] : null
  return (
    <AnimatePresence>
      {p && (
        <motion.div
          role="dialog" aria-modal="true" aria-label="Photo viewer"
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-night/80 px-4 backdrop-blur-xl"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-cream/10"><X /></button>
          <button onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous photo" className="absolute left-2 top-1/2 hidden h-12 w-12 place-items-center rounded-full bg-cream/10 sm:grid"><ChevronLeft /></button>
          <button onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next photo" className="absolute right-2 top-1/2 hidden h-12 w-12 place-items-center rounded-full bg-cream/10 sm:grid"><ChevronRight /></button>

          <motion.figure
            key={index}
            drag="x" dragSnapToOrigin dragElastic={0.5}
            onDragEnd={(_, i) => { if (i.offset.x < -70) go(1); else if (i.offset.x > 70) go(-1) }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md touch-pan-y"
            initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            <Photo src={p.image} alt={p.caption} className="max-h-[68svh] w-full rounded-md shadow-2xl" eager />
            <figcaption className="mt-5 text-center">
              <p className="font-hand text-2xl text-cream">{p.caption}</p>
              <p className="mt-1 text-xs tracking-[0.3em] text-gold uppercase">{p.date}</p>
              <p className="mt-3 text-xs text-cream/40">{(index ?? 0) + 1} / {photos.length}</p>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
