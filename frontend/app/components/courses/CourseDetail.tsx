import Image from 'next/image'
import Link from 'next/link'
import {levelLabel, subjectLabel, type CourseView} from './types'

/** Content that sits inside the shared <Modal>. Layout is course-specific. */
export default function CourseDetail({item, onClose}: {item: CourseView; onClose: () => void}) {
  const facts = [
    {label: '上課時段', value: item.schedule},
    {label: '班級人數', value: item.classSize},
    {label: '每堂時間', value: item.duration},
    {label: '開課期別', value: item.term},
  ].filter((f) => f.value)

  const external = item.ctaHref ? /^(https?:|tel:|mailto:)/.test(item.ctaHref) : false
  const ctaClass =
    'inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-800'

  return (
    <article>
      {item.imageUrl ? (
        <div className="relative h-[200px] w-full">
          <Image src={item.imageUrl} alt={item.imageAlt} fill sizes="620px" className="object-cover" />
        </div>
      ) : null}
      <div className="px-6 pt-6 pb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
            {levelLabel(item.level)}
          </span>
          <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
            {subjectLabel(item.subject)}
          </span>
        </div>
        <h2 className="mb-4 text-xl leading-snug font-semibold text-balance text-gray-900 sm:text-2xl">{item.name}</h2>
        {item.summary ? <p className="mb-6 text-[15px] leading-[1.9] text-gray-600">{item.summary}</p> : null}

        {facts.length ? (
          <dl className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-px overflow-hidden rounded-md border border-gray-200 bg-gray-200">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5 bg-white px-3.5 py-3">
                <dt className="text-[11px] text-gray-500">{f.label}</dt>
                <dd className="text-[15px] font-semibold text-gray-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {item.outline?.length ? (
          <>
            <h3 className="mb-2 text-[13px] font-semibold tracking-[0.1em] text-gray-500">課程規劃</h3>
            <ul className="list-disc pl-5 text-[15px] leading-[1.9] text-gray-600">
              {item.outline.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2 border-t border-gray-100 pt-6">
          {item.ctaHref && item.ctaLabel ? (
            external ? (
              <a href={item.ctaHref} className={ctaClass}>
                {item.ctaLabel}
              </a>
            ) : (
              <Link href={item.ctaHref} className={ctaClass}>
                {item.ctaLabel}
              </Link>
            )
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-5 py-3 text-[15px] font-medium text-gray-600 hover:bg-gray-50"
          >
            關閉
          </button>
        </div>
      </div>
    </article>
  )
}
