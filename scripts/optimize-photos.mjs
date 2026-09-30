// Usage: node scripts/optimize-photos.mjs "<source folder>"
// Resizes every jpg/webp to 1200px wide and saves as public/assets/photos/NN.jpg (chronological by file date/name).
import sharp from 'sharp'
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const src = process.argv[2]
const out = 'public/assets/photos'
mkdirSync(out, { recursive: true })
const files = readdirSync(src).filter((f) => /\.(jpe?g|webp)$/i.test(f) && !/^Screenshot/i.test(f)).sort()
const map = []
let i = 0
for (const f of files) {
  const name = String(++i).padStart(2, '0') + '.jpg'
  await sharp(join(src, f), { failOn: 'none' }).rotate().resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 76, mozjpeg: true }).toFile(join(out, name))
  map.push(`${name} <- ${f}`)
}
writeFileSync(join(out, '_source-map.txt'), map.join('\n'))
console.log(i, 'photos written')
