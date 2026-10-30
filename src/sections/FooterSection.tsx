/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { site, templateAttribution } from '@/config/site'

export default function FooterSection() {
  return <footer className="footer-section">
    <div className="site-container footer-bar">
      <small>© {new Date().getFullYear()} {site.author}</small>
      <nav className="template-credits" aria-label="Attribution and source">
        <a href={templateAttribution.repository} rel="noreferrer">{templateAttribution.phrase}</a>
        <small>{templateAttribution.copyright}</small>
        <a href={site.sourceUrl} rel="noreferrer">Source code</a>
      </nav>
    </div>
  </footer>
}
