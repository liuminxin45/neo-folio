/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
type EmptyStateProps = {
  className?: string
  rows?: number
}

export default function EmptyState({ className = '', rows = 3 }: EmptyStateProps) {
  return (
    <div className={['empty-state', className].filter(Boolean).join(' ')} aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  )
}
