'use client'

import {useEffect, useRef, useState} from 'react'

const DURATION = 1100

/**
 * Number that counts up from 0 once it scrolls into view (ease-out cubic).
 * Renders the final value immediately for reduced-motion users and before hydration.
 */
export default function CountUp({value}: {value: number}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    setDisplay(0)

    let raf = 0
    const run = () => {
      const t0 = performance.now()
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / DURATION)
        setDisplay(Math.round(value * (1 - Math.pow(1 - k, 3))))
        if (k < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started.current) {
          started.current = true
          run()
          io.disconnect()
        }
      },
      {threshold: 0.4},
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}
