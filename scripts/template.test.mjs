/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
const read = p => fs.readFileSync(new URL('../'+p,import.meta.url),'utf8')
test('home contains only the recent blog section with a five-item cap',()=>{ const home=read('src/pages/Home.tsx');assert.match(home,/slice\(0,5\)/);assert.match(home,/to="\/blogs"/);assert.doesNotMatch(home,/works|photos|experience/i) })
test('warming begins after a paint opportunity and isolates failed imports',async()=>{
 let code=read('src/lib/preloadable-page.ts').split('export function schedulePagePreload')[1]
 code='function schedulePagePreload'+code.replace('loaders: Array<() => Promise<unknown>>, host: Window = window','loaders, host').replace(/: number \| undefined/g,'')
 const context=vm.createContext({Promise});vm.runInContext(code,context)
 const frames=[],tasks=[],started=[]
 const host={requestAnimationFrame:fn=>(frames.push(fn),frames.length),setTimeout:fn=>(tasks.push(fn),tasks.length),cancelAnimationFrame(){},clearTimeout(){}}
 context.schedulePagePreload([()=>{started.push('failed');throw Error('fixture')},()=>started.push('ready')],host)
 assert.equal(started.length,0);frames.shift()();assert.equal(started.length,0);frames.shift()();tasks.shift()();await new Promise(resolve=>setImmediate(resolve));assert.deepEqual(started,['failed','ready'])
})
test('directory warming does not eagerly import article bodies or photo manifests',()=>{for(const file of ['Records','Works','Experience','Photography']){const text=read('src/pages/'+file+'.tsx');assert.doesNotMatch(text,/^import .*from ['"]@\/content/gm)}assert.match(read('src/pages/Photography.tsx'),/void import\('@/)
})
test('each post has a corresponding article fixture',()=>{const metadata=read('src/data/posts.ts');const bodies=read('src/content/articles.tsx');for(const [,slug] of metadata.matchAll(/slug: '([^']+)'/g))assert.ok(bodies.includes("'"+slug+"':"))})


test('privacy guard rejects forbidden files and credentials without echoing secrets',async()=>{
 const os=await import('node:os'), path=await import('node:path'), cp=await import('node:child_process')
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'editorial-template-check-'))
 try {
  fs.mkdirSync(path.join(temp,'scripts'))
  fs.writeFileSync(path.join(temp,'scripts/check-privacy.mjs'),read('scripts/check-privacy.mjs'))
  fs.writeFileSync(path.join(temp,'.env'),'EXAMPLE_SETTING=fixture')
  const token=['gh','p_', 'a'.repeat(36)].join('')
  fs.writeFileSync(path.join(temp,'example.txt'),token)
  const result=cp.spawnSync(process.execPath,[path.join(temp,'scripts/check-privacy.mjs')],{encoding:'utf8'})
  assert.equal(result.status,1)
  assert.match(result.stderr,/forbidden-file/)
  assert.match(result.stderr,/credential/)
  assert.ok(!result.stderr.includes(token))
 } finally { fs.rmSync(temp,{recursive:true,force:true}) }
})


test('static route output includes direct article entries and distribution notices',async()=>{
 const os=await import('node:os'), path=await import('node:path'), cp=await import('node:child_process')
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'neo-folio-build-'))
 try {
  for(const dir of ['scripts','src/data','dist'])fs.mkdirSync(path.join(temp,dir),{recursive:true})
  fs.writeFileSync(path.join(temp,'scripts/finalize-build.mjs'),read('scripts/finalize-build.mjs'))
  fs.writeFileSync(path.join(temp,'src/data/posts.ts'),"[{ slug: 'example-article' }]")
  fs.writeFileSync(path.join(temp,'dist/index.html'),'<html>fixture</html>')
  fs.writeFileSync(path.join(temp,'package.json'),'{"dependencies":{}}')
  for(const name of ['LICENSE','NOTICE','THIRD_PARTY_NOTICES.md'])fs.writeFileSync(path.join(temp,name),name)
  const result=cp.spawnSync(process.execPath,[path.join(temp,'scripts/finalize-build.mjs')],{encoding:'utf8'})
  assert.equal(result.status,0,result.stderr)
  for(const route of ['blogs','works','photography','experience','blogs/example-article'])assert.equal(fs.readFileSync(path.join(temp,'dist',route,'index.html'),'utf8'),'<html>fixture</html>')
  assert.equal(fs.readFileSync(path.join(temp,'dist/LICENSE'),'utf8'),'LICENSE')
  assert.ok(fs.existsSync(path.join(temp,'dist/THIRD_PARTY_LICENSES.txt')))
 } finally {fs.rmSync(temp,{recursive:true,force:true})}
})
