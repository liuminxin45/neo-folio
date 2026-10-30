/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
export type Work = { id: string; title: string; summary: string; href: string; listedAt: string; external?: boolean }
// Use the first date a project enters your catalog, never its build date.
export const works: readonly Work[] = [
  { id: 'example-notebook', title: 'Example Notebook', summary: 'A fictional writing application demonstrating a project entry.', href: 'https://example.com/notebook', listedAt: '2026-01-01T00:00:00Z', external: true },
  { id: 'example-gallery', title: 'Example Gallery', summary: 'A fictional image collection demonstrating another entry.', href: 'https://example.com/gallery', listedAt: '2026-01-02T00:00:00Z', external: true },
]
export function newestWorks(items: readonly Work[] = works): Work[] { return [...items].sort((a,b) => Date.parse(b.listedAt)-Date.parse(a.listedAt) || a.id.localeCompare(b.id)) }
