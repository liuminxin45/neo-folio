/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/view-transitions'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export default function usePrefersReducedMotion() {
  const [prefersReducedMotionState, setPrefersReducedMotionState] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const media = window.matchMedia(reducedMotionQuery)
    const updatePreference = () => setPrefersReducedMotionState(prefersReducedMotion())

    updatePreference()
    media.addEventListener('change', updatePreference)

    return () => media.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotionState
}
