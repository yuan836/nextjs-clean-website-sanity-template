'use client'

import {useCallback, useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import HeroDots from './HeroDots'
import HeroSlideContent from './HeroSlideContent'
import type {HeroSlideView} from './types'

const AUTOPLAY_MS = 5200
const TRANSITION_MS = 600
const SWIPE_THRESHOLD = 60

/** Client component: infinite-loop carousel (autoplay, swipe, keyboard). Content and dots are split out. */
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

  const jumpTo = (target: number) => {
    setAnimate(!reducedMotion)
    setDragDx(0)
    setIndex(target)
  }

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

      <HeroSlideContent slide={slides[activeDot]} />

      <HeroDots slides={slides} active={activeDot} onSelect={(i) => jumpTo(i + 1)} />
    </section>
  )
}
