/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { lazy, Suspense, useEffect, useState } from 'react'
import { Search } from 'lucide-react'
const SearchDialog = lazy(() => import('./SearchDialog'))
export default function SearchLauncher() {
 const [open,setOpen] = useState(false)
 useEffect(() => { const key=(event: KeyboardEvent) => { if((event.ctrlKey||event.metaKey)&&event.key==='k'){event.preventDefault();setOpen(value=>!value)} }; window.addEventListener('keydown',key); return () => window.removeEventListener('keydown',key) },[])
 return <><button className="site-icon-action" type="button" aria-label="Search site" onClick={() => setOpen(true)}><Search size={20}/></button>{open && <Suspense fallback={<span role="status">Loading search…</span>}><SearchDialog onClose={() => setOpen(false)}/></Suspense>}</>
}
