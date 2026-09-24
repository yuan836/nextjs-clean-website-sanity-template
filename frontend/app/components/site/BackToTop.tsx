'use client'

import {useEffect, useState} from 'react'

/** Appears after scrolling 320px; sits just above the call bar. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({top: 0, behavior: reduce ? 'auto' : 'smooth'})
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="回到頂端"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-5 bottom-24 z-[61] flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[rgba(160,190,255,0.5)] bg-gradient-to-br from-[#4c7bff] to-[#2f54eb] text-white shadow-[0_0_18px_rgba(76,123,255,0.45)] transition-all duration-200 hover:shadow-[0_0_26px_rgba(76,123,255,0.8)] ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2.5 opacity-0'
      }`}
    >
      <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" />
      </svg>
    </button>
  )
}
