/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { useEffect, useState } from 'react'

const noHeadings: readonly { id: string }[] = []

export default function useActiveHeading(headings: readonly { id: string }[] = noHeadings, contentKey = '') {
  const [active, setActive] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    const currentElements = () => headings.map(heading => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element))
    if (!currentElements().length) return
    let frame: number | undefined
    const update = () => {
      // HTML article nodes may be replaced; never keep detached heading references.
      const elements = currentElements()
      if (!elements.length) return
      const readingLine = Math.min(112, window.innerHeight * 0.25)
      const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      let current = elements[0].id
      for (const element of elements) {
        if (element.getBoundingClientRect().top > readingLine + 1) break
        current = element.id
      }
      setActive(atEnd ? elements[elements.length - 1].id : current)
    }
    const schedule = () => {
      if (frame !== undefined) return
      frame = window.requestAnimationFrame(() => { frame = undefined; update() })
    }
    // Read positions rather than waiting for a heading to cross an observer band:
    // fast scrolling, long sections and anchor jumps can all skip that band.
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule)
    observer?.observe(document.body)
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    window.addEventListener('popstate', schedule)
    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
      window.removeEventListener('popstate', schedule)
      if (frame !== undefined) window.cancelAnimationFrame(frame)
    }
  }, [headings, contentKey])

  return headings.some(heading => heading.id === active) ? active : headings[0]?.id ?? ''
}
