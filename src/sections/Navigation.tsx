/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { Link, NavLink } from 'react-router'
import ThemeToggle from '@/components/ThemeToggle'
import SearchLauncher from '@/components/SearchLauncher'
import { navigationPages } from '@/lib/navigation-pages'
import { site } from '@/config/site'
const warm = (load: () => Promise<unknown>) => { void load().catch(() => {}) }
export default function Navigation() { return <header className="site-nav"><div className="site-container nav-inner"><Link className="brand-link" to="/">{site.name}</Link><nav className="nav-links" aria-label="Main navigation">{navigationPages.map(item => <NavLink key={item.path} to={item.path} onPointerEnter={()=>warm(item.preload)} onFocus={()=>warm(item.preload)} onPointerDown={()=>warm(item.preload)}>{item.title}</NavLink>)}</nav><div className="nav-actions"><SearchLauncher/><ThemeToggle/></div></div></header> }
