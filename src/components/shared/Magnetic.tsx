import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ButtonHTMLAttributes } from 'react'

/** Button that leans toward a mouse pointer. Touch devices just get a spring press. */
export function MagneticButton({ className = '', children, ...rest }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 16 }), sy = useSpring(y, { stiffness: 200, damping: 16 })
  return (
    <motion.button
      {...rest}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
      className={`btn ${className}`}
    >
      {children}
    </motion.button>
  )
}
