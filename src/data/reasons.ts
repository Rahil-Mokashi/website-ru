// ✏️ "It's the little things." Icons: sparkles, smile, message, heart, sun, moon, coffee, music, camera, star
export interface Reason {
  title: string
  text: string
  icon: string
  more?: string // shown when she taps the card
}

export const reasons: Reason[] = [
  { title: 'The topic changes', text: 'The way you randomly change the topic mid-conversation.', icon: 'message', more: `And somehow I always follow. I've never once been bored.` },
  { title: 'Tiny excitement', text: 'The way you get excited about tiny things.', icon: 'sparkles', more: `It makes tiny things feel like they matter. Because around you, they do.` },
  { title: 'That face', text: `The expressions you make when you're annoyed.`, icon: 'smile', more: `I shouldn't enjoy them this much. I do.` },
  { title: 'My name', text: 'The way you say my name.', icon: 'heart', more: `Nobody else says it like that.` },
  { title: 'Unaware', text: `The moments when you don't realize how cute you are.`, icon: 'sun', more: `Those are my favourite moments. Please never notice.` },
  { title: 'Small comforts', text: 'How being around you feels like a normal day, but better.', icon: 'coffee', more: `That's the whole thing, really.` },
]
