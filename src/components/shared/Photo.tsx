import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { asset } from '../../lib/asset'

/** Lazy image with an elegant fallback when the file is missing, so layouts never break. */
export function Photo({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (failed)
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center bg-gradient-to-br from-indigo-deep to-midnight text-gold/60 ${className}`}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center text-[0.65rem] tracking-[0.25em] uppercase">
          <ImageIcon size={20} strokeWidth={1.2} /> your photo here
        </div>
      </div>
    )
  return <img src={asset(src)} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
