'use client'

import {useCallback, useEffect, useRef} from 'react'
import {createPortal} from 'react-dom'
import type {PhotoView} from './types'

type LightboxProps = {
  photos: PhotoView[]
  /** Index of the open photo, or null when closed. */
  index: number | null
  onChange: (index: number | null) => void
}

const SWIPE_THRESHOLD = 50

/**
 * Full-screen photo viewer. Prev/next are edge strips on the image (hidden until hovered),
 * close button uses the same position as the shared Modal. Supports ESC, ← → keys and touch swipe.
 */
export default function Lightbox({photos, index, onChange}: LightboxProps) {
  const open = index !== null
  const count = photos.length
  const startX = useRef<number | null>(null)

  const close = useCallback(() => onChange(null), [onChange])
  const prev = useCallback(() => {
    if (index === null) return
    onChange((index - 1 + count) % count)
  }, [index, count, onChange])
  const next = useCallback(() => {
    if (index === null) return
    onChange((index + 1) % count)
  }, [index, count, onChange])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, prev, next])

  if (!open || typeof document === 'undefined' || !photos[index!]) return null
  const photo = photos[index!]

  const edge =
    'absolute top-0 bottom-0 z-[2] flex w-[72px] items-center text-white opacity-0 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100'

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="照片檢視"
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (startX.current === null) return
        const dx = e.changedTouches[0].clientX - startX.current
        startX.current = null
        if (Math.abs(dx) > SWIPE_THRESHOLD) (dx < 0 ? next : prev)()
      }}
    >
      <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-[rgba(2,6,40,0.88)] backdrop-blur-sm" />

      <button
        type="button"
        onClick={close}
        aria-label="關閉"
        className="absolute top-3 right-[calc(0.5vw+10px)] z-[3] flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-[rgba(2,6,40,0.28)] text-white backdrop-blur-md transition-colors hover:bg-[rgba(2,6,40,0.6)]"
      >
        <svg viewBox="64 64 896 896" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
        </svg>
      </button>

      <figure className="relative m-0 flex max-w-[min(1100px,88vw)] flex-col items-center gap-3">
        <div className="relative flex max-w-full">
          {/* eslint-disable-next-line @next/next/no-img-element -- original ratio, sized by the viewport */}
          <img
            src={photo.full}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="max-h-[78vh] max-w-full rounded-lg object-contain shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          />
          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="上一張"
                className={`${edge} left-0 justify-start rounded-l-lg bg-gradient-to-r from-[rgba(2,6,40,0.62)] to-transparent pl-3.5`}
              >
                <svg viewBox="64 64 896 896" width="26" height="26" fill="currentColor" aria-hidden="true">
                  <path d="M689 165.1L308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="下一張"
                className={`${edge} right-0 justify-end rounded-r-lg bg-gradient-to-l from-[rgba(2,6,40,0.62)] to-transparent pr-3.5`}
              >
                <svg viewBox="64 64 896 896" width="26" height="26" fill="currentColor" aria-hidden="true">
                  <path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c4.4-3.7 4.4-10.3 0-14z" />
                </svg>
              </button>
            </>
          ) : null}
        </div>
        <figcaption className="flex flex-col items-center gap-1 text-center">
          {photo.caption ? <span className="text-sm text-white/85">{photo.caption}</span> : null}
          <span className="font-mono text-[13px] text-white/70">
            {index! + 1} / {count}
          </span>
        </figcaption>
      </figure>
    </div>,
    document.body,
  )
}
