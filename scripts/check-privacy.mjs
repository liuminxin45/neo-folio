/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('../', import.meta.url))
const skip = new Set(['node_modules', '.git', 'artifacts'])
const rules = [
 ['private-network', /https?:\/\/(?:10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+)/i],
 ['personal-email', /[A-Z0-9._%+-]+@(?!example\.com)[A-Z0-9.-]+\.[A-Z]{2,}/i],
 ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
 ['credential', /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|sk-[A-Za-z0-9_-]{24,}|AKIA[A-Z0-9]{16})/],
 ['machine-path', /[A-Z]:[\\/](?:Users|Documents and Settings)[\\/]/i],
]
const forbidden = /^(?:\.env(?:\..+)?|\.dev\.vars|\.assistant.*|\.edgeone.*|edgeone\.json|vercel\.json|wrangler\.(?:toml|jsonc?)|CNAME|.*\.local|.*\.log)$/i
const failures=[]
function scan(dir) { for(const item of fs.readdirSync(dir,{withFileTypes:true})) { if(dir === root && skip.has(item.name))continue; const full=path.join(dir,item.name),relative=path.relative(root,full); if(item.isSymbolicLink()){failures.push(relative+': symlink');continue} if(item.isDirectory()){ scan(full);continue } if(relative.replaceAll('\\','/').startsWith('.github/workflows/') && relative.replaceAll('\\','/') !== '.github/workflows/pages.yml') failures.push(relative+': unexpected-workflow'); if(forbidden.test(item.name))failures.push(relative+': forbidden-file'); if(relative.replaceAll('\\','/') === 'dist/THIRD_PARTY_LICENSES.txt') continue; const text=fs.readFileSync(full,'utf8');for(const [name,pattern] of rules)if(pattern.test(text))failures.push(relative+': '+name) } }
scan(root)
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log('Privacy scan passed: source and available build output.')
