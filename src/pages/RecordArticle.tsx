/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { useParams } from 'react-router'
import { posts } from '@/data/posts'
import { articles } from '@/content/articles'
import BackButton from '@/components/BackButton'
import useActiveHeading from '@/hooks/use-active-heading'
export default function RecordArticle() {
 const { slug = '' } = useParams()
 const post = posts.find(item => item.slug === slug)
 const sections = articles[slug] ?? []
 const active = useActiveHeading(sections,slug)
 if (!post) return <main className="section-shell"><h1>Article not found</h1><BackButton to="/blogs" label="Back to blogs" /></main>
 return <main className="section-shell template-article"><BackButton to="/blogs" label="Back to blogs" /><header><time dateTime={post.date}>{post.date}</time><h1>{post.title}</h1><p>{post.summary}</p></header><div className="template-reading"><article>{sections.map(section => <section key={section.id}><h2 id={section.id}>{section.title}</h2>{section.body}</section>)}</article><nav aria-label="On this page">{sections.map(section => <a key={section.id} href={'#'+section.id} aria-current={active===section.id ? 'location' : undefined}>{section.title}</a>)}</nav></div></main>
}
