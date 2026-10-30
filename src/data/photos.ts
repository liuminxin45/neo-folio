/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { assetUrl } from '@/lib/asset-url'
export type Photo = { src: string; alt: string; width: number; height: number }
// Original geometric fixtures; no photography, EXIF, or real locations.
export const photos: readonly Photo[] = [
 { src: assetUrl('/images/example-shapes.svg'), alt: 'Geometric study in lavender and cream', width: 1200, height: 800 },
 { src: assetUrl('/images/example-lines.svg'), alt: 'Geometric study with lines and a circle', width: 1200, height: 800 },
]
