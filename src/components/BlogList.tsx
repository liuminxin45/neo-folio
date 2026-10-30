/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { Link } from 'react-router'
import type { Post } from '@/data/posts'
import { formatBlogDate } from '@/lib/blog-date'

type BlogEntry = Pick<Post, 'slug' | 'title' | 'date'>

export default function BlogList({ entries, headingLevel = 2 }: { entries: readonly BlogEntry[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return <div className="blog-list">
    {entries.map(record => <Link className="blog-row" key={record.slug} to={`/blogs/${record.slug}`}>
      <Heading><span className="link-label">{record.title}</span></Heading>
      {record.date && <time dateTime={record.date}>{formatBlogDate(record.date)}</time>}
    </Link>)}
  </div>
}
