import CountUp from './CountUp'
import type {School} from './types'

/** 上榜名校：dark block with a card per school; numbers count up on scroll. */
export default function ResultsSection({
  title,
  note,
  caption,
  schools,
}: {
  title?: string | null
  note?: string | null
  caption?: string | null
  schools: School[]
}) {
  if (!schools.length) return null

  return (
    <section className="bg-[#030852] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#85a5ff] uppercase">Results</span>
          <h2 className="mt-1.5 text-2xl font-semibold text-white sm:text-3xl">{title ?? '上榜名校清單'}</h2>
          {note ? <p className="mt-2.5 text-[15px] leading-relaxed text-white/75">{note}</p> : null}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] sm:gap-4">
          {schools.map((s) => (
            <div
              key={s._key}
              className="flex flex-col gap-1 rounded-lg border border-white/15 bg-white/[0.06] p-3.5 sm:p-6"
            >
              <span className="text-xs font-semibold text-white sm:text-[15px]">{s.name}</span>
              <span className="text-[26px] leading-tight font-bold text-[#adc6ff] sm:text-[34px]">
                <CountUp value={s.count} />
              </span>
              <span className="text-xs text-white/55">{caption ?? '錄取人數'}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
