// Tiny synthesized sounds (no files to load). Only ever fire from a user gesture, and respect the mute button.
let ctx: AudioContext | null = null
let muted = false

export const setSfxMuted = (m: boolean) => { muted = m }

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** 'tick' = soft click, 'paper' = filtered noise swish, 'chime' = warm two-note bell */
export function sfx(kind: 'tick' | 'paper' | 'chime') {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(kind === 'chime' ? [12, 60, 12] : 8)
  if (muted) return
  const c = audio()
  if (!c) return
  const t = c.currentTime
  const out = c.createGain()
  out.connect(c.destination)

  if (kind === 'paper') {
    const len = c.sampleRate * 0.28
    const buf = c.createBuffer(1, len, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len)
    const src = c.createBufferSource()
    src.buffer = buf
    const f = c.createBiquadFilter()
    f.type = 'bandpass'; f.frequency.value = 2400; f.Q.value = 0.6
    src.connect(f); f.connect(out)
    out.gain.setValueAtTime(0.05, t)
    src.start(t)
    return
  }

  const notes = kind === 'chime' ? [523.25, 783.99] : [660]
  notes.forEach((freq, i) => {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'; o.frequency.value = freq
    const s = t + i * 0.16
    g.gain.setValueAtTime(0, s)
    g.gain.linearRampToValueAtTime(kind === 'chime' ? 0.05 : 0.035, s + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, s + (kind === 'chime' ? 1.4 : 0.14))
    o.connect(g); g.connect(out)
    o.start(s); o.stop(s + 1.5)
  })
}
