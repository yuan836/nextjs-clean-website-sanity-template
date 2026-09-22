'use client'

import {useCallback, useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'

export type HeroSlideView = {
  _id: string
  title: string
  subtitle?: string | null
  eyebrow?: string | null
  desktopUrl: string
  mobileUrl: string
  alt: string
  primaryAction?: {label?: string | null; href?: string | null} | null
  secondaryAction?: {label?: string | null; href?: string | null} | null
}

const AUTOPLAY_MS = 5200
const TRANSITION_MS = 600
const SWIPE_THRESHOLD = 60

function isExternal(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href)
}

function ActionLink({
  href,
  label,
  variant,
}: {
  href: string
  label: string
  variant: 'primary' | 'secondary'
}) {
  const className =
    variant === 'primary'
      ? 'inline-flex items-center rounded-md bg-white px-5 py-3 text-base font-semibold text-blue-700 transition-colors hover:bg-blue-50'
      : 'inline-flex items-center rounded-md border border-white/60 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-white/10'

  if (isExternal(href)) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}

export default function HeroCarousel({slides}: {slides: HeroSlideView[]}) {
  const count = slides.length
  // index runs over the cloned track: 0 = clone of last, 1..count = real slides, count+1 = clone of first
  const [index, setIndex] = useState(1)
  const [dragDx, setDragDx] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const dragging = useRef(false)
  const dragStartX = useRef(0)
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const go = useCallback(
    (dir: number) => {
      if (count < 2) return
      setAnimate(!reducedMotion)
      setDragDx(0)
      setIndex((i) => i + dir)
    },
    [count, reducedMotion],
  )

  // autoplay
  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return
    const id = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [count, paused, reducedMotion, go])

  // snap back from the clones once the transition has finished
  useEffect(() => {
    if (count < 2) return
    if (index !== 0 && index !== count + 1) return
    const id = window.setTimeout(
      () => {
        setAnimate(false)
        setIndex(index === 0 ? count : 1)
      },
      reducedMotion ? 0 : TRANSITION_MS + 20,
    )
    return () => window.clearTimeout(id)
  }, [index, count, reducedMotion])

  // re-enable the transition on the frame after a silent jump
  useEffect(() => {
    if (animate) return
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(raf)
  }, [animate])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (count < 2) return
    dragging.current = true
    dragStartX.current = e.clientX
    setDragDx(0)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    setDragDx(e.clientX - dragStartX.current)
  }

  const onPointerUp = () => {
    if (!dragging.current) return
    dragging.current = false
    if (Math.abs(dragDx) > SWIPE_THRESHOLD) go(dragDx < 0 ? 1 : -1)
    else setDragDx(0)
  }

  if (count === 0) return null

  const track = [slides[count - 1], ...slides, slides[0]]
  const activeDot = ((index - 1) % count + count) % count
  const transform = `translateX(calc(${-index * 100}% + ${dragDx}px))`
  const transition = dragDx !== 0 || !animate ? 'none' : `transform ${TRANSITION_MS}ms cubic-bezier(0.645,0.045,0.355,1)`

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="首頁主視覺"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative aspect-[3/4] w-full cursor-grab touch-pan-y select-none overflow-hidden bg-gray-900 outline-none sm:aspect-[16/9] sm:max-h-[580px]"
    >
      <div className="absolute inset-0 flex" style={{transform, transition}}>
        {track.map((slide, i) => (
          <div key={`${slide._id}-${i}`} className="relative h-full w-full flex-none">
            <Image
              src={slide.mobileUrl}
              alt={slide.alt}
              fill
              priority={i === 1}
              sizes="100vw"
              draggable={false}
              className="object-cover sm:hidden"
            />
            <Image
              src={slide.desktopUrl}
              alt={slide.alt}
              fill
              priority={i === 1}
              sizes="100vw"
              draggable={false}
              className="hidden object-cover sm:block"
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-950/55 to-blue-950/10" />

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-xl text-white">
            {slides[activeDot].eyebrow ? (
              <span className="inline-block rounded border border-white/45 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-white/80">
                {slides[activeDot].eyebrow}
              </span>
            ) : null}
            <h1 className="mt-4 text-3xl font-bold leading-tight text-balance sm:text-5xl">
              {slides[activeDot].title}
            </h1>
            {slides[activeDot].subtitle ? (
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">
                {slides[activeDot].subtitle}
              </p>
            ) : null}
            <div className="pointer-events-auto mt-6 flex flex-wrap gap-3">
              {slides[activeDot].primaryAction?.label && slides[activeDot].primaryAction?.href ? (
                <ActionLink
                  href={slides[activeDot].primaryAction!.href!}
                  label={slides[activeDot].primaryAction!.label!}
                  variant="primary"
                />
              ) : null}
              {slides[activeDot].secondaryAction?.label &&
              slides[activeDot].secondaryAction?.href ? (
                <ActionLink
                  href={slides[activeDot].secondaryAction!.href!}
                  label={slides[activeDot].secondaryAction!.label!}
                  variant="secondary"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {count > 1 ? (
        <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide._id}
              type="button"
              aria-label={`前往第 ${i + 1} 張`}
              aria-current={activeDot === i}
              onClick={() => {
                setAnimate(!reducedMotion)
                setDragDx(0)
                setIndex(i + 1)
              }}
              className={`h-1 w-7 rounded-full transition-colors ${
                activeDot === i ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
