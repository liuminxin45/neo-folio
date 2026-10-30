/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import Navigation from '@/sections/Navigation'
import FooterSection from '@/sections/FooterSection'
import Home from '@/pages/Home'
import RouteTransition, { RoutePhase } from '@/components/RouteTransition'
import RouteLoading, { RouteErrorBoundary } from '@/components/RouteLoading'
import DirectoryRoute from '@/components/DirectoryRoute'
import ReadingProgress from '@/components/ReadingProgress'
import BackButton from '@/components/BackButton'
import { navigationPages, preloadNavigationPages } from '@/lib/navigation-pages'
import { site } from '@/config/site'
const Article = lazy(() => import('@/pages/RecordArticle'))
function ScrollToContent() {
 const location=useLocation()
 useEffect(() => { const frame=requestAnimationFrame(() => { const id=location.hash.slice(1); let decoded=id; try{decoded=decodeURIComponent(id)}catch{/* Preserve malformed fragments safely. */} const target=id?document.getElementById(decoded):null; if(target)target.scrollIntoView({behavior:'instant'}); else window.scrollTo({top:0,behavior:'instant'}) }); return ()=>cancelAnimationFrame(frame) },[location.pathname,location.hash])
 return null
}
function Layout() {
 const location=useLocation()
 const directory=navigationPages.find(page=>page.path===location.pathname.replace(/\/+$/,''))
 useEffect(()=>{preloadNavigationPages()},[])
 useEffect(()=>{document.title=(directory ? directory.title+' · ' : '')+site.name},[directory])
 return <div className="site-shell"><a className="skip-link" href="#main-content">Skip to content</a><Navigation/>{location.pathname.startsWith('/blogs/')&&<ReadingProgress/>}<RouteTransition pathname={location.pathname}>{directory?<DirectoryRoute key={location.pathname} page={directory}><ScrollToContent/></DirectoryRoute>:<RouteErrorBoundary key={location.pathname}><Suspense fallback={<><RouteLoading/><RoutePhase pathname={location.pathname} phase="loading"/></>}><div className="route-content"><Routes><Route path="/" element={<Home/>}/><Route path="/blogs/:slug" element={<Article/>}/><Route path="*" element={<main className="section-shell"><h1>Page not found</h1><BackButton to="/" label="Back home"/></main>}/></Routes><ScrollToContent/><RoutePhase pathname={location.pathname} phase="ready"/></div></Suspense></RouteErrorBoundary>}</RouteTransition><FooterSection/></div>
}
export default function App(){return <BrowserRouter basename={import.meta.env.BASE_URL}><Layout/></BrowserRouter>}
