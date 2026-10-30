/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

type Props = { label: string; className?: string } & (
  | { to: string; href?: never; onClick?: never }
  | { href: string; to?: never; onClick?: never }
  | { onClick: () => void; to?: never; href?: never }
)

export default function BackButton({ label, className = '', ...action }: Props) {
  const props = { className: `site-icon-action back-button ${className}`.trim(), 'aria-label': label }
  const icon = <ArrowLeft size={18} aria-hidden="true" />
  if (action.to !== undefined) return <Link {...props} to={action.to}>{icon}</Link>
  if (action.href !== undefined) return <a {...props} href={action.href}>{icon}</a>
  return <button {...props} type="button" onClick={action.onClick}>{icon}</button>
}
