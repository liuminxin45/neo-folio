/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
export type Post = { slug: string; title: string; date: string; summary: string }
// Metadata only. Article bodies are loaded separately on demand.
export const posts: readonly Post[] = [
  { slug: 'getting-started', title: 'Make this space your own', date: '2026-01-03', summary: 'Where to change the site identity and replace the sample data.' },
  { slug: 'component-guide', title: 'A small set of reusable components', date: '2026-01-02', summary: 'Navigation, themes, reading tools, and image previews.' },
  { slug: 'content-boundaries', title: 'Keep content separate from code', date: '2026-01-01', summary: 'A practical boundary for a reusable website.' },
]
export const newestPosts = () => [...posts].sort((a,b) => b.date.localeCompare(a.date))
