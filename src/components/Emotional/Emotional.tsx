import { changes, emotionalTurn } from '../../data/messages'
import { Reveal } from '../shared/Reveal'

/** Screen 8 – slow, dark, restrained. One beat per scroll, lots of air. No graphics. */
export function EmotionalTurn() {
  return (
    <section id="turn" className="relative bg-gradient-to-b from-transparent via-night/90 to-transparent px-6 py-40">
      <div className="mx-auto flex max-w-lg flex-col gap-[34svh] text-center">
        {emotionalTurn.map((t, i) => (
          <Reveal key={i} as="p" className={`serif leading-snug ${i < 2 ? 'text-3xl italic text-cream' : 'text-2xl text-cream/85 sm:text-3xl'}`}>{t}</Reveal>
        ))}
      </div>
    </section>
  )
}

/** Screen 9 – four things to work on. Not promises of perfection. */
export function WhatIWantToDo() {
  return (
    <section id="differently" className="px-5 py-28">
      <Reveal className="mb-14 text-center">
        <p className="eyebrow mb-4">What I want to do differently</p>
        <h2 className="text-4xl italic sm:text-5xl">So here's what I want to work on.</h2>
      </Reveal>

      <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
        {changes.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.15} className="rounded-2xl border border-gold/20 bg-midnight/60 p-7 backdrop-blur-sm">
            <p className="serif text-5xl text-gold/40">0{i + 1}</p>
            <h3 className="mt-3 text-3xl">{c.title}</h3>
            <p className="mt-3 text-cream/70">{c.text}</p>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-24 flex max-w-md flex-col gap-6 text-center">
        <Reveal as="p" className="text-lg text-cream/70">I'm not promising perfection.</Reveal>
        <Reveal as="p" delay={0.3} className="serif text-3xl italic">I'm promising awareness.</Reveal>
        <Reveal as="p" delay={0.6} className="serif text-3xl italic text-gold">And effort.</Reveal>
      </div>
    </section>
  )
}
