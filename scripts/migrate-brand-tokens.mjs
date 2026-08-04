#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const ROOT = path.join(process.cwd(), 'src')

const REPLACEMENTS = [
  [/bg-\[#c9a84c\]/g, 'bg-gold-500'],
  [/text-\[#c9a84c\]/g, 'text-gold-500'],
  [/border-\[#c9a84c\]/g, 'border-gold-500'],
  [/hover:bg-\[#b8973d\]/g, 'hover:bg-gold-600'],
  [/hover:bg-\[#b8943a\]/g, 'hover:bg-gold-600'],
  [/from-\[#c9a84c\]/g, 'from-gold-500'],
  [/to-\[#c9a84c\]/g, 'to-gold-500'],
  [/bg-\[#c9962a\]/g, 'bg-gold-500'],
  [/text-\[#c9962a\]/g, 'text-gold-500'],
  [/border-\[#c9962a\]/g, 'border-gold-500'],
  [/hover:bg-\[#a87a20\]/g, 'hover:bg-gold-600'],
  [/hover:text-\[#a87a20\]/g, 'hover:text-gold-700'],
  [/text-\[#a87a20\]/g, 'text-gold-700'],
  [/text-\[#f4c94a\]/g, 'text-gold-300'],
  [/bg-\[#fef9e8\]/g, 'bg-cream-100'],
  [/border-\[#f4c94a\]/g, 'border-gold-300'],
  [/hover:border-\[#f4c94a\]/g, 'hover:border-gold-300'],
  [/from-\[#1a2f1c\]/g, 'from-forest-800'],
  [/to-\[#0d1a0f\]/g, 'to-forest-900'],
  [/bg-\[#0d1a0f\]/g, 'bg-forest-900'],
  [/bg-\[#1a2f1c\]/g, 'bg-forest-800'],
  [/from-\[#1a0d00\]/g, 'from-forest-950'],
  [/to-\[#1a0d00\]/g, 'to-forest-950'],
  [/bg-\[#1a0d00\]/g, 'bg-forest-950'],
  [/bg-\[#7a5c1e\]/g, 'bg-gold-700'],
  [/from-\[#7a5c1e\]/g, 'from-gold-700'],
  [/to-\[#c9962a\]/g, 'to-gold-500'],
  [/border-\[#e8d48a\]/g, 'border-gold-300'],
  [/bg-\[#fdf8ee\]/g, 'bg-cream-100'],
  [/text-\[#7a5c1e\]/g, 'text-gold-700'],
  [/border-\[#e8b52a\]/g, 'border-gold-400'],
  [/emerald-600/g, 'gold-600'],
  [/emerald-700/g, 'gold-700'],
  [/emerald-800/g, 'gold-800'],
  [/emerald-900/g, 'forest-900'],
  [/emerald-400/g, 'gold-400'],
  [/emerald-100/g, 'cream-100'],
  [/emerald-200/g, 'gold-200'],
  [/emerald-300/g, 'gold-300'],
  [/emerald-50/g, 'cream-100'],
  [/text-emerald-100/g, 'text-cream-100'],
  [/from-\[#3d2a05\]/g, 'from-forest-950'],
  [/via-\[#7a5c1e\]/g, 'via-gold-700'],
  [/to-\[#3d2a05\]/g, 'to-forest-950'],
  [/from-green-50/g, 'from-cream-50'],
  [/to-emerald-50/g, 'to-cream-100'],
]

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, files)
    else if (/\.(tsx|ts|css)$/.test(ent.name)) files.push(p)
  }
  return files
}

let changed = 0
for (const file of walk(ROOT)) {
  let content = fs.readFileSync(file, 'utf8')
  const orig = content
  for (const [re, rep] of REPLACEMENTS) content = content.replace(re, rep)
  if (content !== orig) {
    fs.writeFileSync(file, content)
    changed++
  }
}
console.log(`Updated ${changed} files`)
