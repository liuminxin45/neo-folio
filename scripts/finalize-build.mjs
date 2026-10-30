/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const root = new URL('../', import.meta.url)
const output = new URL('dist/', root)
const shell = fs.readFileSync(new URL('index.html', output), 'utf8')
// Physical route shells make direct navigation work on static GitHub Pages.
// Add a matching shell whenever a new static route or article slug is added.
const metadata = fs.readFileSync(new URL('src/data/posts.ts', root), 'utf8')
const slugs = [...metadata.matchAll(/slug:\s*'([^']+)'/g)].map(match => match[1])
for (const slug of slugs) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('Unsafe article slug')
}
const routes = ['blogs', 'works', 'photography', 'experience', ...slugs.map(slug => 'blogs/' + slug)]
for (const route of routes) {
  const dir = new URL(route + '/', output)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(new URL('index.html', dir), shell)
}
fs.writeFileSync(new URL('404.html', output), shell)
fs.writeFileSync(new URL('.nojekyll', output), '')
for (const name of ['LICENSE', 'NOTICE', 'THIRD_PARTY_NOTICES.md']) {
  fs.copyFileSync(new URL(name, root), new URL(name, output))
}
// Include complete licenses for runtime dependencies and their transitive packages.
const visited = new Set()
const notices = []
function collect(name, parent) {
  const require = createRequire(parent)
  let entry
  try { entry = require.resolve(name + '/package.json') }
  catch { entry = require.resolve(name) }
  let dir = path.dirname(entry)
  while (!fs.existsSync(path.join(dir, 'package.json')) || JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).name !== name) {
    const next = path.dirname(dir)
    if (next === dir) throw new Error('Cannot locate dependency: ' + name)
    dir = next
  }
  const manifest = path.join(dir, 'package.json')
  if (visited.has(manifest)) return
  visited.add(manifest)
  const pkg = JSON.parse(fs.readFileSync(manifest, 'utf8'))
  const licenseFiles = fs.readdirSync(dir).filter(file => /^(?:licen[cs]e|copying|notice)(?:$|[.-])/i.test(file) && fs.statSync(path.join(dir, file)).isFile())
  if (!licenseFiles.length) throw new Error('Missing license for ' + name)
  notices.push(name + '@' + pkg.version + '\n' + licenseFiles.map(file => fs.readFileSync(path.join(dir, file), 'utf8')).join('\n'))
  for (const child of Object.keys(pkg.dependencies ?? {})) collect(child, manifest)
}
const pkg = JSON.parse(fs.readFileSync(new URL('package.json', root), 'utf8'))
for (const name of Object.keys(pkg.dependencies)) collect(name, new URL('package.json', root))
fs.writeFileSync(new URL('THIRD_PARTY_LICENSES.txt', output), notices.join('\n\n--------------------\n\n'))
console.log('Static route shells and license notices generated.')
