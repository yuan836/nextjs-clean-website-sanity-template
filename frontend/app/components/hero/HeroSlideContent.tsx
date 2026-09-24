import HeroActionLink from './HeroActionLink'
import type {HeroSlideView} from './types'

/** Text overlay for the active slide: eyebrow, title, subtitle and CTAs. */
export default function HeroSlideContent({slide}: {slide: HeroSlideView}) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-xl text-white">
          {slide.eyebrow ? (
            <span className="inline-block rounded border border-white/45 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-white/80">
              {slide.eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 text-3xl font-bold leading-tight text-balance sm:text-5xl">{slide.title}</h1>
          {slide.subtitle ? (
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">{slide.subtitle}</p>
          ) : null}
          <div className="pointer-events-auto mt-6 flex flex-wrap gap-3">
            <HeroActionLink action={slide.primaryAction} variant="primary" />
            <HeroActionLink action={slide.secondaryAction} variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  )
}
