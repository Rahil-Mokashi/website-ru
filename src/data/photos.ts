// ✏️ The photo wall. `tilt` is degrees of rotation, `size` is s | m | l.
export interface Photo {
  image: string
  date: string
  caption: string
  note?: string // tiny handwritten annotation on the polaroid
  tilt: number
  size: 's' | 'm' | 'l'
}

export const photos: Photo[] = [
  { image: '/assets/photos/24.jpg', date: '2026', caption: `I remember this.`, note: 'favourite', tilt: -3, size: 'l' },
  { image: '/assets/photos/13.jpg', date: '2026', caption: `You looked so happy here.`, tilt: 2.5, size: 'm' },
  { image: '/assets/photos/16.jpg', date: '2026', caption: `That face. Every time.`, note: 'this one', tilt: -2, size: 's' },
  { image: '/assets/photos/27.jpg', date: '2026', caption: `This day deserved a permanent place somewhere.`, tilt: 3, size: 'l' },
  { image: '/assets/photos/14.jpg', date: 'Apr 2026', caption: `Nothing special. Everything special.`, tilt: -2.5, size: 'm' },
  { image: '/assets/photos/20.jpg', date: '2026', caption: `Cold, clumsy, perfect.`, note: 'you on ice', tilt: 2, size: 's' },
  { image: '/assets/photos/28.jpg', date: 'May 2026', caption: `One of my favourites.`, tilt: -3.5, size: 'l' },
  { image: '/assets/photos/09.jpg', date: 'Mar 2026', caption: `Quiet day.`, tilt: 2, size: 'm' },
  { image: '/assets/photos/30.jpg', date: 'May 2026', caption: `We were being ridiculous.`, note: 'peace ✌️', tilt: -2, size: 's' },
  { image: '/assets/photos/17.jpg', date: 'Apr 2026', caption: `I keep this one.`, tilt: 3, size: 'm' },
]
