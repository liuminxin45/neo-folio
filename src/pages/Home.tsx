/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { Link } from 'react-router'
import BlogList from '@/components/BlogList'
import { newestPosts } from '@/data/posts'
export default function Home() { return <main className="home-page"><section className="site-container template-home"><h1 className="directory-title heading-mark">Recent Blogs</h1><BlogList entries={newestPosts().slice(0,5)} /><Link className="more-link" to="/blogs">More →</Link></section></main> }
