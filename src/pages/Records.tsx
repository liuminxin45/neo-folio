/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import BlogList from '@/components/BlogList'
import { newestPosts } from '@/data/posts'
export default function Records() { return <BlogList entries={newestPosts()} /> }
