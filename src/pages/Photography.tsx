/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { lazy, Suspense, useState } from 'react'
import type { Photo } from '@/data/photos'
const Lightbox = lazy(() => import('@/components/ImageLightbox'))
export default function Photography() {
 const [items,setItems] = useState<readonly Photo[]>([])
 const [image,setImage] = useState<Photo | null>(null)
 // Read the manifest only when this page mounts, never during route warming.
 const [error,setError] = useState(false)
 usePhotoData(setItems,setError)
 return <><p className="template-muted">Original geometric fixtures. Replace these with images you own.</p>{error && <p role="alert">Could not load the gallery. Refresh to retry.</p>}<div className="template-gallery">{items.map(photo => <button key={photo.src} type="button" onClick={() => setImage(photo)} aria-label={'Preview: '+photo.alt}><img {...photo} loading="lazy" decoding="async" /></button>)}</div>{image && <Suspense fallback={<p role="status">Loading preview…</p>}><Lightbox image={image} onClose={() => setImage(null)} /></Suspense>}</>
}
import { useEffect } from 'react'
function usePhotoData(set: (items: readonly Photo[]) => void, fail: (error: boolean) => void) { useEffect(() => { let active=true; void import('@/data/photos').then(m => { if(active) set(m.photos) }, () => { if(active) fail(true) }); return () => {active=false} },[set,fail]) }
