/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { Component, useEffect, useState, type ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import './route-loading.css'

export default function RouteLoading({ error, onRetry, inline = false }: { error?: boolean; onRetry?: () => void; inline?: boolean }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const timer = setTimeout(() => setVisible(true), 180); return () => clearTimeout(timer) }, [])
  return <div className={`route-loading${inline ? ' route-loading--inline' : ''}`} role={error ? 'alert' : 'status'} aria-live="polite" aria-label={error ? undefined : 'Loading page content'} aria-busy={!error}>
    {(visible || error) && <div className="route-loading-copy">{error ? <><span>This page could not be loaded.</span><button type="button" onClick={onRetry}>Try again</button></> : <><LoaderCircle size={16} aria-hidden="true" /><span>Loading…</span></>}</div>}
  </div>
}

export class RouteErrorBoundary extends Component<{ children: ReactNode; inline?: boolean }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <RouteLoading inline={this.props.inline} error onRetry={() => window.location.reload()} /> : this.props.children }
}
