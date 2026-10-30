/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { newestWorks } from '@/data/works'
export default function Works() { return <div className="template-entries">{newestWorks().map(work => <article key={work.id}><h2><a href={work.href} target={work.external ? '_blank' : undefined} rel={work.external ? 'noreferrer' : undefined}>{work.title}</a></h2><p>{work.summary}</p></article>)}</div> }
