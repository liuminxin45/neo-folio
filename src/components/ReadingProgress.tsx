/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './reading-progress.css'

export default function ReadingProgress() {
  const bar = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let frame: number | undefined
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`
    }
    const schedule = () => {
      if (frame !== undefined) return
      frame = window.requestAnimationFrame(() => { frame = undefined; update() })
    }
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule)
    observer?.observe(document.body)
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== undefined) window.cancelAnimationFrame(frame)
    }
  }, [])

  // A body portal keeps route transforms and clipping from moving the fixed bar.
  return typeof document === 'undefined' ? null : createPortal(
    <div className="reading-progress" aria-hidden="true"><span ref={bar} /></div>,
    document.body,
  )
}
