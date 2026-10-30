/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { Component, createContext, createRef, useContext, useLayoutEffect, useRef, type ReactNode } from 'react'
import { prefersReducedMotion } from '@/lib/view-transitions'

const primaryPages = ['/blogs', '/photography', '/works', '/experience']
const PhaseContext = createContext<(path: string, phase: 'loading' | 'ready', element: HTMLElement) => void>(() => {})

export function RoutePhase({ pathname, phase }: { pathname: string; phase: 'loading' | 'ready' }) {
  const commit = useContext(PhaseContext)
  const marker = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => { if (marker.current?.parentElement) commit(pathname, phase, marker.current.parentElement) }, [pathname, phase, commit])
  return <span hidden ref={marker} />
}

// Capture the outgoing DOM before React replaces it. Loading and loaded content
// share one destination panel, so a slow import never delays the horizontal move.
export default class RouteTransition extends Component<{ pathname: string; children: ReactNode }> {
  panel = createRef<HTMLDivElement>()
  snapshot = createRef<HTMLDivElement>()
  animations: Animation[] = []
  loadingPath: string | null = null
  cancelMotion = () => { this.animations.forEach(animation => animation.cancel()); this.animations = []; this.snapshot.current?.replaceChildren() }
  canAnimate = () => !prefersReducedMotion() && !document.documentElement.dataset.themeTransition
  commitPhase = (pathname: string, phase: 'loading' | 'ready', element: HTMLElement) => {
    if (pathname !== this.props.pathname) return
    if (phase === 'loading') { this.loadingPath = pathname; return }
    if (this.loadingPath !== pathname) return
    this.loadingPath = null
    if (this.canAnimate() && element.animate) this.animations.push(element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'cubic-bezier(.22,1,.36,1)' }))
  }
  getSnapshotBeforeUpdate(previous: Readonly<{ pathname: string; children: ReactNode }>) {
    if (previous.pathname === this.props.pathname) return null
    this.loadingPath = null
    this.cancelMotion()
    if (!this.canAnimate() || !primaryPages.includes(previous.pathname) || !primaryPages.includes(this.props.pathname)) return null
    const clone = this.panel.current?.cloneNode(true) as HTMLElement | undefined
    if (!clone) return null
    clone.inert = true; clone.setAttribute('aria-hidden', 'true'); clone.removeAttribute('id')
    clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'))
    return clone
  }
  enter(previous?: string, clone?: HTMLElement | null) {
    const element = this.panel.current
    if (!element?.animate || !this.canAnimate()) return
    const from = primaryPages.indexOf(previous || ''), to = primaryPages.indexOf(this.props.pathname)
    const direction = from >= 0 && to >= 0 ? Math.sign(to - from) : 0
    const offset = direction * 24
    const options = { duration: direction ? 240 : 180, easing: 'cubic-bezier(.22,1,.36,1)' }
    this.animations.push(element.animate([{ opacity: 0, transform: `translateX(${offset}px)` }, { opacity: 1, transform: 'translateX(0)' }], options))
    if (clone && this.snapshot.current) {
      this.snapshot.current.replaceChildren(clone)
      const outgoing = clone.animate([{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: `translateX(${-offset}px)` }], options)
      this.animations.push(outgoing)
      void outgoing.finished.then(() => clone.remove(), () => clone.remove())
    }
  }
  componentDidMount() { window.addEventListener('site:theme-change', this.cancelMotion); this.enter() }
  componentDidUpdate(previous: Readonly<{ pathname: string; children: ReactNode }>, _state: unknown, clone: HTMLElement | null) {
    if (previous.pathname !== this.props.pathname) this.enter(previous.pathname, clone)
  }
  componentWillUnmount() { window.removeEventListener('site:theme-change', this.cancelMotion); this.cancelMotion() }
  render() {
    return <PhaseContext.Provider value={this.commitPhase}><div id="main-content" className={'route-shell'}>
      <div className="route-snapshot" ref={this.snapshot} aria-hidden="true" />
      <div className="route-panel" ref={this.panel}>{this.props.children}</div>
    </div></PhaseContext.Provider>
  }
}
