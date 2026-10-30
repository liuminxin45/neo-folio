/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.SITE_BASE || '/',
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
