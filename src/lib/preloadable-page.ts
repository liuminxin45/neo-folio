/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { createElement, lazy, type ComponentType } from 'react'

// Share the import with React and bypass Suspense once preloading completes.
export function preloadablePage(load: () => Promise<{ default: ComponentType }>) {
  let ready: ComponentType | undefined
  let pending: Promise<{ default: ComponentType }> | undefined
  const preload = () => pending ??= load().then(module => {
    ready = module.default
    return module
  }).catch(error => {
    pending = undefined
    throw error
  })
  const LazyPage = lazy(preload)
  function Page() { return createElement(ready ?? LazyPage) }
  return { Component: Page, preload }
}

// Give Home a paint opportunity before starting directory downloads/evaluation.
// Never wait for window.load, idle time, or another page's slow request.
export function schedulePagePreload(loaders: Array<() => Promise<unknown>>, host: Window = window) {
  let cancelled = false
  let frame: number | undefined
  let timer: number | undefined
  const start = () => {
    if (cancelled) return
    for (const load of loaders) {
      // Isolate failures, including synchronous ones, without blocking other tabs.
      void Promise.resolve().then(load).catch(() => { /* Navigation can retry a failed warmup. */ })
    }
  }
  if (typeof host.requestAnimationFrame === 'function') {
    // A timer alone can run before the first paint. The second frame guarantees
    // a rendering opportunity; a new task keeps imports out of that paint.
    frame = host.requestAnimationFrame(() => {
      frame = host.requestAnimationFrame(() => { timer = host.setTimeout(start, 0) })
    })
  } else timer = host.setTimeout(start, 0)
  return () => {
    cancelled = true
    if (frame !== undefined) host.cancelAnimationFrame(frame)
    host.clearTimeout(timer)
  }
}
