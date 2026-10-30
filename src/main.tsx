/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { createRoot } from 'react-dom/client'
import './index.css'
import './redesign.css'
import './template.css'
import App from './App'
import { hasViewTransitionApi, syncMotionPreferenceFromUrl } from './lib/view-transitions'
syncMotionPreferenceFromUrl()
document.documentElement.classList.toggle('has-view-transition-api', hasViewTransitionApi())
document.documentElement.classList.toggle('no-view-transition-api', !hasViewTransitionApi())
createRoot(document.getElementById('root')!).render(<App />)
