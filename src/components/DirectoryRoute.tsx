/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { Suspense, type ComponentType, type ReactNode } from 'react'
import RouteLoading, { RouteErrorBoundary } from './RouteLoading'
import { RoutePhase } from './RouteTransition'

type Directory = { path: string; title: string; className: string; titleId: string; Component: ComponentType }

// The header belongs to the destination, never to a temporary loading screen.
export default function DirectoryRoute({ page, pathname = page.path, children }: { page: Directory; pathname?: string; children?: ReactNode }) {
  const Page = page.Component
  return <main className={page.className} lang={page.path === '/experience' || page.path === '/works' ? 'en' : undefined} aria-labelledby={page.titleId}>
    <div className="section-shell">
      <h1 id={page.titleId} className="directory-title heading-mark">{page.title}</h1>
      <div className="directory-body">
        <RouteErrorBoundary inline>
          <Suspense fallback={<><RouteLoading inline /><RoutePhase pathname={pathname} phase="loading" /></>}>
            <div className="route-content"><Page />{children}<RoutePhase pathname={pathname} phase="ready" /></div>
          </Suspense>
        </RouteErrorBoundary>
      </div>
    </div>
  </main>
}
