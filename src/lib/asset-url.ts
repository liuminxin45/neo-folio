/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
/** Resolve a local public asset under the same base path as the application. */
export function assetUrl(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}
