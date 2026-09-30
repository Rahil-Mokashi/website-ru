import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { config, firstMessage } from '../../data/messages'
import { Lines } from '../shared/Reveal'

/** Screen 2 – "Good morning" and the little joke about him building things. */
export function FirstMessage() {
  const [done, setDone] = useState(false)
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 2, delay: 1.6 }}
        className="text-4xl italic sm:text-6xl"
      >
        Good morning, {config.herName}.
      </motion.h1>

      <div className="mt-10 max-w-md">
        <Lines
          lines={[...firstMessage.map((l, i) => (i === 0 ? { ...l, pause: 3 } : l))]}
          gap={1.9}
          lineClass="text-base text-cream/75 sm:text-lg mb-3"
          onDone={() => setDone(true)}
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4 }}
          className="serif mt-10 text-2xl text-gold sm:text-3xl"
        >
          So… stay for a few minutes.
        </motion.p>
      </div>

      <motion.a
        href="#months"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1.4 }}
        className="absolute bottom-8 text-gold/70"
      >
        <ChevronDown className="bounce-soft" />
      </motion.a>
    </section>
  )
}
