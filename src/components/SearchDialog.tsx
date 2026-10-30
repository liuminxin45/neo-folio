/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { X } from 'lucide-react'
import { posts } from '@/data/posts'
import { works } from '@/data/works'
export default function SearchDialog({onClose}: {onClose: () => void}) {
 const dialog=useRef<HTMLDialogElement>(null)
 const [query,setQuery]=useState('')
 useEffect(() => { const previous=document.activeElement as HTMLElement | null; dialog.current?.showModal(); return () => {previous?.focus()} },[])
 const term=query.trim().toLocaleLowerCase()
 const results = [...posts.map(p=>({title:p.title,text:p.summary,href:'/blogs/'+p.slug})),...works.map(w=>({title:w.title,text:w.summary,href:w.href}))].filter(p=>term && (p.title+' '+p.text).toLocaleLowerCase().includes(term))
 return <dialog className="template-search" ref={dialog} onCancel={onClose} aria-label="Search site"><div className="template-search-heading"><label htmlFor="site-search">Search public titles and summaries</label><button className="site-icon-action" type="button" aria-label="Close search" onClick={onClose}><X size={20}/></button></div><input id="site-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try component or gallery"/><div aria-live="polite">{term && <p>{results.length} results</p>}</div><ul>{results.map(result=><li key={result.href}>{result.href.startsWith('/')?<Link to={result.href} onClick={onClose}>{result.title}</Link>:<a href={result.href} rel="noreferrer">{result.title}</a>}<p>{result.text}</p></li>)}</ul></dialog>
}
