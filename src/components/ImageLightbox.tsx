/* SPDX-License-Identifier: CPAL-1.0
 * Copyright (c) 2026 Neo (liuminxin45). See LICENSE and NOTICE.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export type LightboxImage = { src: string; alt: string; width?: number; height?: number }
type ImageLightboxProps = {
  image: LightboxImage
  onClose: () => void
}

const closeDurationMs = 220

export default function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const closeTimerRef = useRef<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const requestClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      return
    }

    setIsClosing(true)
    closeTimerRef.current = window.setTimeout(onClose, closeDurationMs)
  }, [onClose])

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    dialogRef.current?.showModal()
    const originalOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        requestClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      previousFocus?.focus()
      window.removeEventListener('keydown', handleKeyDown)

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [requestClose])

  const lightbox = (
    <dialog
      ref={dialogRef}
      className={`image-lightbox ${isClosing ? 'is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || '图片预览'}
      aria-busy={status === 'loading'}
      onCancel={event => { event.preventDefault(); requestClose() }}
      onPointerDown={requestClose}
      onClick={requestClose}
    >
      <button
        className="image-lightbox-close"
        type="button"
        aria-label="关闭图片预览"
        onPointerDown={event => {
          event.stopPropagation()
          requestClose()
        }}
        onClick={event => event.stopPropagation()}
      >
        <X size={22} />
      </button>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        decoding="async"
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('error')}
        onPointerDown={event => event.stopPropagation()}
        onClick={event => event.stopPropagation()}
      />
      {status !== 'ready' && <p className="image-lightbox-status" role={status === 'error' ? 'alert' : 'status'}>
        {status === 'error' ? '图片暂时无法加载，请关闭后重试。' : '正在加载大图…'}
      </p>}
    </dialog>
  )

  return createPortal(lightbox, document.body)
}
