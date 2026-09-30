import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { playlist } from '../data/messages'
import { setSfxMuted } from './sfx'
import { asset } from './asset'

interface Ctl {
  playing: boolean
  muted: boolean
  track: number
  selectTrack: (i: number) => void
  available: boolean // false if the current mp3 fails to load
  hasMusic: boolean // false if none of the playlist files exist, so the UI can hide itself
  time: number
  duration: number
  toggle: () => void
  stop: () => void
  toggleMute: () => void
  seek: (t: number) => void
}

const Ctx = createContext<Ctl | null>(null)
export const useMusic = () => useContext(Ctx)!

/** Owns the single <audio> element so the section player and the floating button stay in sync. Never autoplays. */
export function MusicProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [available, setAvailable] = useState(true)
  const [hasMusic, setHasMusic] = useState(true)
  const [track, setTrack] = useState(0)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Probe once: a dev server answers missing files with index.html, so check the content type too.
  useEffect(() => {
    Promise.all(playlist.map((t) => fetch(asset(t.src), { method: 'HEAD' }).then((r) => r.ok && !!r.headers.get('content-type')?.startsWith('audio')).catch(() => false)))
      .then((r) => setHasMusic(r.some(Boolean)))
  }, [])

  useEffect(() => { document.documentElement.dataset.music = playing ? 'on' : 'off' }, [playing])

  const toggle = useCallback(() => {
    const a = ref.current
    if (!a) return
    if (a.paused) a.play().catch(() => setAvailable(false))
    else a.pause()
  }, [])
  const stop = useCallback(() => { const a = ref.current; if (a) { a.pause(); a.currentTime = 0 } }, [])
  const toggleMute = useCallback(() => setMuted((m) => { setSfxMuted(!m); return !m }), [])
  const selectTrack = useCallback((i: number) => {
    setTrack(i); setAvailable(true)
    // src changes on next render; play then
    setTimeout(() => ref.current?.play().catch(() => setAvailable(false)), 50)
  }, [])
  const seek = useCallback((t: number) => { if (ref.current) ref.current.currentTime = t }, [])

  return (
    <Ctx.Provider value={{ playing, muted, track, selectTrack, available, hasMusic, time, duration, toggle, stop, toggleMute, seek }}>
      <audio
        ref={ref}
        src={asset(playlist[track].src)}
        preload="none"
        muted={muted}
        onEnded={() => selectTrack((track + 1) % playlist.length)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onError={() => setAvailable(false)}
      />
      {children}
    </Ctx.Provider>
  )
}
