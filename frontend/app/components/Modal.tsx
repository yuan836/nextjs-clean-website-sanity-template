'use client'

import {useEffect, useRef, type ReactNode} from 'react'
import {createPortal} from 'react-dom'

type ModalProps = {
  open: boolean
  onClose: () => void
  /** Accessible name for the dialog. */
  label: string
  /** Max width in px. Defaults to 620 (the news layout). */
  maxWidth?: number
  children: ReactNode
}

/**
 * Shared modal shell: backdrop, dialog container, scroll area and the floating close button.
 * Content is fully up to the caller — news, teacher and course details each bring their own layout.
 */
export default function Modal({open, onClose, label, maxWidth = 620, children}: ModalProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-[85] flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(2,6,40,0.6)] backdrop-blur-[3px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="relative max-h-[88vh] w-full overflow-hidden rounded-lg bg-white shadow-xl"
        style={{maxWidth}}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="關閉"
          className="absolute top-3 right-[calc(0.5vw+10px)] z-[3] flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-[rgba(2,6,40,0.28)] text-white backdrop-blur-md transition-colors hover:bg-[rgba(2,6,40,0.6)]"
        >
          <svg viewBox="64 64 896 896" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
          </svg>
        </button>
        <div className="max-h-[88vh] overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
