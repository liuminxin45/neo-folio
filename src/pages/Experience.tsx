/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { experience } from '@/data/experience'
export default function Experience() { return <div className="template-entries">{experience.map(item => <article key={item.period}><p className="template-muted">{item.period}</p><h2>{item.role} · {item.organization}</h2><p>{item.description}</p></article>)}</div> }
