import type {HeroSlideView} from './types'

/** Pagination dots under the carousel. Hidden when there is only one slide. */
export default function HeroDots({
  slides,
  active,
  onSelect,
}: {
  slides: HeroSlideView[]
  active: number
  onSelect: (i: number) => void
}) {
  if (slides.length < 2) return null

  return (
    <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
      {slides.map((slide, i) => (
        <button
          key={slide._id}
          type="button"
          aria-label={`前往第 ${i + 1} 張`}
          aria-current={active === i}
          onClick={() => onSelect(i)}
          className={`h-1 w-7 rounded-full transition-colors ${active === i ? 'bg-white' : 'bg-white/40'}`}
        />
      ))}
    </div>
  )
}
