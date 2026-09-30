// ✏️ All the words on the site live in here. Edit freely.

export const config = {
  // Used in "Good morning, ___." and "Happy 10 months, ___."
  // Put her name (or a nickname) here.
  herName: 'ruble',
  myName: 'Rahil',
  // First day together (YYYY-MM-DD). Drives the "days" counter.
  startDate: '2025-12-14',
  // ✏️ Your WhatsApp number with country code, digits only (e.g. '919876543210'). Leave '' to hide the reply button.
  whatsappNumber: '918197652106',
  replyText: `Good morning. I saw it. I'm smiling 🙂`,
  // ✏️ Optional: record a short voice note and save it here. The button only shows up if the file exists.
  voiceNote: '/assets/audio/voice-note.mp3',
}

// Screen 2 – lines appear one after another. `pause` = extra seconds before the line.
export const firstMessage = [
  { text: `You probably weren't expecting a website from me.` },
  { text: `But you also know me…`, pause: 1 },
  { text: `When I don't know how to say something properly…`, pause: 1 },
  { text: `I build something.`, pause: 1.2, strong: true },
]

export const tenMonths = {
  afterCounter: ['A lot of conversations.', 'A lot of laughs.', 'A lot of random nonsense.', 'A lot of memories.'],
}

export const changes = [
  { title: 'Listen first.', text: 'Not every uncomfortable feeling needs an argument.' },
  { title: 'Trust more.', text: `I don't want my insecurity to make you prove your love to me repeatedly.` },
  { title: 'Pause.', text: 'Sometimes I need to breathe before I react.' },
  { title: 'Protect the softness.', text: `I don't want us to become so used to fighting that we forget how good we are together.` },
]

// The emotional turn. Each entry is its own beat on scroll.
export const emotionalTurn = [
  'Okay.',
  'Now the part I actually wanted to say.',
  `For the last two or three months we've been arguing about things.`,
  `And lately we finally talked about what's actually causing it.`,
  `I know we'll get through this and be in a better phase.`,
  `I know I've changed a little lately.`,
  `I've let my insecurity turn small things into big things.`,
  `I've argued when I should have listened.`,
  `Sometimes I've reacted to things because of what I was afraid of, instead of what was actually happening.`,
  `And I know that can be exhausting.`,
  `I'm not putting this here so you feel bad for me.`,
  `I'm putting it here because I finally understand that loving someone also means taking responsibility for how your fears affect them.`,
]

// ✏️ The letter. One string per paragraph; use a line break (\n) inside a string to keep lines together.
export const letter: string[] = [
  `Hey love,`,
  `If you're reading this in the morning, there's a good chance I'm somewhere hoping this makes you smile.`,
  `We've almost made it to ten months.`,
  `Ten months sounds like a number, but when I think about us, I don't really think in numbers anymore.`,
  `I think about moments.`,
  `December, when I'd come all the way from Ambegaon just to meet you, and we'd end up at Café Delight or Tim Hortons, walking around with nowhere to be.`,
  `January, when everything felt so easy. Pavna, the rooftop café, FC Road, and the late night calls I'd still take any day.`,
  `Your shy face, and mine pretending not to be shy.`,
  `My birthday in March, and the T-shirt and the rosary you got me. April. May, our most adventurous month. June, when we were at home in different places, watching movies and talking for hours.`,
  `The random conversations.\nThe stupid jokes.\nThe days we didn't want to leave each other.\nThe little things you probably don't even remember.\nThe times we laughed until something wasn't funny anymore.\nThe ordinary days that somehow became my favourite days.`,
  `And lately, I know things haven't always felt like that.`,
  `I've been insecure.\nI've overthought things.\nI've argued about things that probably didn't deserve an argument.`,
  `And I'm sorry for the times when my fear became your problem.`,
  `I'm learning that loving someone isn't just about how strongly you feel about them.`,
  `It's also about how safely they feel loved by you.`,
  `And that's something I want to get better at.`,
  `I don't want to love you loudly and make you feel tired.`,
  `I want to love you in a way that feels safe.`,
  `I want more conversations where we understand each other instead of trying to win.`,
  `More laughing.\nMore stupid pictures.\nMore random plans.\nMore peaceful mornings.\nMore versions of us that we haven't met yet.`,
  `No matter what happens, my love for you doesn't get shaken. It only grows.`,
  `When we fight, we're both sad. When we're happy, we're both happy. It goes both ways, and that's how I know we're okay.`,
  `I want you beside me. To take care of you, laugh with you, make more memories, and see the world with you. I want to marry you.`,
  `You coming into my life felt like it had a purpose. I've felt more fulfilled since you walked in.`,
  `I can't promise that I'll never get insecure again.`,
  `But I can promise that I'm learning to handle my insecurity without making you carry it.`,
  `Because you're not someone I want to fight against.`,
  `You're someone I want beside me.`,
  `And after everything we've already lived through in these ten months...`,
  `I'm still really happy that it was you.`,
  `Happy 10 months, {name}.`, // {name} becomes herName
  `Now go drink some water, stop being cute for five minutes, and have a good day.`,
  `I love you, jaan.`,
  `— {me}`, // {me} becomes myName
]

// Screen 11 – the hidden cards
export const secrets = [
  `I still remember the December version of us, the rides from Ambegaon, Café Delight, Tim Hortons.`,
  `I was shy too. I just wasn't going to show it.`,
  'Sometimes I randomly look at our old photos.',
  `There are moments during my day where something happens and you're the first person I want to tell.`,
  'I remember more little things about you than I probably admit.',
  'Sometimes I smile at my phone because of you.',
  'You became part of my routine without me even noticing.',
  `I've read our old chats more than once. Don't judge me.`,
  `I'm trying my best to become a better person, for you.`,
]

// Screen 12 – the repeated "Unfortunately, yes" clicks
export const unfortunatelyReplies = ['Very convincing.', 'Okay I believe you.', 'Stop clicking it 😂', 'Seriously. Stop. 😂']

// ✏️ Playlist. Put your own mp3 files in public/assets/audio/ with these exact names (or rename them here).
// A track whose file is missing just shows a small note, nothing breaks.
export const playlist = [
  { src: '/assets/audio/tera-naam-doon.mp3', title: 'Tera Naam Doon', artist: 'Atif Aslam' },
  { src: '/assets/audio/tera-hone-laga-hoon.mp3', title: 'Tera Hone Laga Hoon', artist: 'Atif Aslam' },
  { src: '/assets/audio/pehli-nazar-mein.mp3', title: 'Pehli Nazar Mein', artist: 'Atif Aslam' },
  { src: '/assets/audio/dil-diyan-gallan.mp3', title: 'Dil Diyan Gallan', artist: 'Atif Aslam' },
]
export const musicCover = '/assets/photos/27.jpg' // album image
