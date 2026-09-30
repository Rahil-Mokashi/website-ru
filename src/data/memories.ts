// ✏️ The timeline. Replace image/date/story freely. `insideJoke` is the small handwritten love note under each memory (optional).
export interface Memory {
  month: string
  date: string
  title: string
  image: string
  caption: string
  story: string
  insideJoke?: string
}

export const memories: Memory[] = [
  { month: '01', date: 'Dec 2025', title: 'The beginning.', image: '/assets/photos/01.jpg', caption: 'Look how it started.', story: `I'd come all the way from Ambegaon just to see you. Café Delight, Tim Hortons, walking around with no plan. That was December.`, insideJoke: `Worth every ride.` },
  { month: '02', date: 'Dec 2025', title: 'Already ridiculous.', image: '/assets/photos/02.jpg', caption: 'Batman mask. Obviously.', story: `Somewhere in December I realised I'd stopped pretending to be cool around you.`, insideJoke: `You made me feel like myself.` },
  { month: '03', date: 'Dec 2025', title: 'Your everyday person.', image: '/assets/photos/41.jpg', caption: 'Crowns, because why not.', story: `Somewhere along the way, you became part of my everyday life.`, insideJoke: `Home is a person, apparently.` },
  { month: '04', date: 'Mar 2026', title: 'Colours everywhere.', image: '/assets/photos/04.jpg', caption: 'Holi, and I have no regrets.', story: `Chaos, colour and you in the middle of it. March was also my birthday, and you made it one I still think about: the T-shirt, the rosary, Shalimar.`, insideJoke: `Every colour looks better next to you.` },
  { month: '05', date: '2026', title: 'The duck.', image: '/assets/photos/11.jpg', caption: 'You and a very important duck.', story: `A very normal day that I still think about for no reason.`, insideJoke: `I'd pick you again on an ordinary day.` },
  { month: '06', date: '2026', title: 'Halfway to ten.', image: '/assets/photos/19.jpg', caption: 'Freezing. Smiling anyway.', story: `Cold hands, warm everything else. May was our adventurous month, and you made every bit of it easy.`, insideJoke: `You make cold days feel warm.` },
  { month: '07', date: '2026', title: 'Cards on the table.', image: '/assets/photos/23.jpg', caption: 'King and queen of nothing.', story: `We made something together and it's somehow one of my favourite things.`, insideJoke: `Us, in every kind of light.` },
  { month: '08', date: 'May 2026', title: 'Painted skies.', image: '/assets/photos/25.jpg', caption: 'Inside a painting.', story: `Even inside a painting, you were the best thing in the frame.`, insideJoke: `You're my favourite view.` },
  { month: '09', date: '2026', title: 'On the water.', image: '/assets/photos/43.jpg', caption: 'Kayak day.', story: `Quiet water, no plans, you. I could have stayed there all day.`, insideJoke: `Peace looks a lot like you.` },
  { month: '10', date: 'Now', title: 'And here we are.', image: '/assets/photos/45.jpg', caption: 'Still choosing this.', story: `Ten months. The good ones, the loud ones, all of it. I'd do every one again.`, insideJoke: `Still you. Still us.` },
]
