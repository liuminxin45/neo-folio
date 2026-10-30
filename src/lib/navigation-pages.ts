/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { preloadablePage, schedulePagePreload } from './preloadable-page'

export const navigationPages = [
  { path: '/blogs', title: 'Blogs', className: 'records-page', titleId: 'blogs-title', ...preloadablePage(() => import('../pages/Records')) },
  { path: '/photography', title: 'Photos', className: 'photography-page', titleId: 'photos-title', ...preloadablePage(() => import('../pages/Photography')) },
  { path: '/works', title: 'Projects', className: 'works-page', titleId: 'projects-title', ...preloadablePage(() => import('../pages/Works')) },
  { path: '/experience', title: 'Experience', className: 'experience-page', titleId: 'experience-title', ...preloadablePage(() => import('../pages/Experience')) },
]

export const preloadNavigationPages = () => schedulePagePreload(navigationPages.map(page => page.preload))
