import { Pause, Play } from 'lucide-react'
import { playlist, musicCover } from '../../data/messages'
import { useMusic } from '../../lib/audioContext'
import { Photo } from '../shared/Photo'
import { Reveal } from '../shared/Reveal'

const fmt = (s: number) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00')
const heights = [40, 70, 55, 90, 45, 80, 60, 100, 50, 75, 35, 85, 65, 95, 45, 70, 55, 80, 40, 60, 90, 50, 75, 45]

/** Screen 7 – custom player. Waveform is CSS-only (cheap); it moves only while the song plays. */
export function MusicPlayer() {
  const m = useMusic()
  if (!m.hasMusic) return null
  return (
    <section id="music" className="px-5 py-28 text-center">
      <Reveal as="p" className="serif mx-auto max-w-sm text-2xl italic text-cream/80">Every relationship eventually collects a soundtrack.</Reveal>
      <Reveal as="h2" delay={0.3} className="mt-10 text-4xl sm:text-5xl">OUR LITTLE SOUNDTRACK</Reveal>

      <Reveal delay={0.5} className="mx-auto mt-12 max-w-sm rounded-3xl border border-gold/20 bg-gradient-to-b from-indigo-deep/60 to-midnight/70 p-6 backdrop-blur-sm">
        <div className={`mx-auto aspect-square w-44 overflow-hidden rounded-2xl shadow-2xl ${m.playing ? 'float' : ''}`}>
          <Photo src={musicCover} alt="Album artwork" className="h-full w-full" />
        </div>
        <h3 className="mt-6 text-2xl">{playlist[m.track].title}</h3>
        <p className="text-sm text-cream/50">{playlist[m.track].artist}</p>

        <div className="mx-auto mt-6 flex h-12 items-end justify-center gap-[3px]" aria-hidden>
          {heights.map((h, i) => (
            <span key={i} className={`w-[3px] rounded-full bg-gold/70 ${m.playing ? 'bar' : ''}`} style={{ height: `${m.playing ? h : h * 0.3}%`, animationDelay: `${(i % 7) * -0.17}s` }} />
          ))}
        </div>

        <input
          type="range" min={0} max={m.duration || 1} step={0.1} value={m.time}
          onChange={(e) => m.seek(+e.target.value)}
          aria-label="Song progress"
          className="mt-4 h-1 w-full cursor-pointer accent-[var(--color-gold)]"
        />
        <div className="mt-1 flex justify-between text-xs text-cream/50 tabular-nums"><span>{fmt(m.time)}</span><span>{fmt(m.duration)}</span></div>

        <button onClick={m.toggle} aria-label={m.playing ? 'Pause' : 'Play'} className="btn breathe mx-auto mt-5 h-16 w-16 !p-0">
          {m.playing ? <Pause /> : <Play className="translate-x-0.5" />}
        </button>
        <ul className="mt-6 space-y-1 text-left text-sm">
          {playlist.map((t, i) => (
            <li key={t.src}>
              <button onClick={() => m.selectTrack(i)} aria-current={i === m.track} className={`w-full rounded-lg px-3 py-2 text-left ${i === m.track ? 'bg-gold/15 text-cream' : 'text-cream/55 hover:text-cream'}`}>
                {t.title} <span className="text-cream/35">· {t.artist}</span>
              </button>
            </li>
          ))}
        </ul>
        {!m.available && <p className="mt-4 text-xs text-rose">This one won't play right now. Try another song.</p>}
      </Reveal>
    </section>
  )
}
