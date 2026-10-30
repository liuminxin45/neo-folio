/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import type { ReactNode } from 'react'
export type ArticleSection = { id: string; title: string; body: ReactNode }
export const articles: Record<string, readonly ArticleSection[]> = {
 'getting-started': [
  { id: 'identity', title: 'Set your site identity', body: <><p>Edit the name, author, and description in <code>src/config/site.ts</code>. These are fictional defaults.</p><p>Then update the document title and description in <code>index.html</code>. The template has no production domain or analytics integration.</p></> },
  { id: 'examples', title: 'Replace the examples', body: <><p>Post metadata lives in <code>src/data/posts.ts</code>. Article sections live in <code>src/content/articles.tsx</code>, loaded only when a reader opens an article.</p><p>Project entries use their first inclusion date. Adding a new build should not move a project to the top.</p></> },
  { id: 'verify', title: 'Check before sharing', body: <><p>Run the privacy check, tests, lint, and production build after replacing the examples.</p><p>Review the generated files as well as the source. A string scanner can find known markers; it cannot decide whether every sentence is appropriate to publish.</p></> },
 ],
 'component-guide': [
  { id: 'navigation', title: 'Navigation and loading', body: <><p>The directory shell owns its title. Lazy content can load while the destination is already visible.</p><p>After the first paint opportunity, public directory code warms concurrently. Hover and keyboard focus also warm a destination.</p></> },
  { id: 'reading', title: 'Reading tools', body: <><p>The progress indicator uses a body portal so route transforms do not move it away from the viewport top.</p><p>The table of contents follows the reading position on scroll, resize, hash changes, and history navigation.</p></> },
 ],
 'content-boundaries': [
  { id: 'separation', title: 'Separate data from presentation', body: <><p>Keep your public data in one directory and your reusable UI in another. This makes it easier to replace examples without editing the layout.</p><p>Do not add credentials, private documents, or deployment account identifiers to the browser bundle.</p></> },
  { id: 'services', title: 'Connect services deliberately', body: <><p>This starter runs without an account or API. Add a server-side adapter if you need an authenticated editor, analytics, or an assistant.</p><p>Document the service boundary before connecting it. Public search indexes should contain only content you have chosen to publish.</p></> },
 ],
}
