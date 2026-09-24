import {Avatar} from './TeacherCard'
import type {TeacherView} from './types'

const sectionTitle = 'mb-2 text-[13px] font-semibold tracking-[0.1em] text-gray-500'

/** Content that sits inside the shared <Modal>. Dark header with portrait, then details. */
export default function TeacherDetail({
  item,
  onClose,
  ctaHref = 'tel:0400000000',
}: {
  item: TeacherView
  onClose: () => void
  ctaHref?: string
}) {
  const meta = [item.credential, item.years].filter(Boolean).join('　')

  return (
    <article>
      <header className="flex items-center gap-4 bg-gradient-to-br from-[#030852] to-[#10239e] p-6 pr-16">
        <Avatar src={item.photoUrl} alt={item.photoAlt} size="detail" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="text-[22px] font-semibold text-white">{item.name}</h2>
            <span className="rounded-full border border-white/30 bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white">
              {item.subject}
            </span>
          </div>
          {meta ? <p className="mt-1.5 text-sm leading-relaxed text-white/85">{meta}</p> : null}
        </div>
      </header>

      <div className="px-6 pt-6 pb-8">
        {item.philosophy ? (
          <>
            <h3 className={sectionTitle}>教學理念</h3>
            <p className="mb-6 text-[15px] leading-[1.9] text-gray-600">{item.philosophy}</p>
          </>
        ) : null}

        {item.classes?.length ? (
          <>
            <h3 className={sectionTitle}>任教班別</h3>
            <div className="mb-6 flex flex-wrap gap-2">
              {item.classes.map((c) => (
                <span key={c} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[13px] text-gray-600">
                  {c}
                </span>
              ))}
            </div>
          </>
        ) : null}

        {item.experience?.length ? (
          <>
            <h3 className={sectionTitle}>經歷</h3>
            <ul className="list-disc pl-5 text-[15px] leading-[1.9] text-gray-600">
              {item.experience.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2 border-t border-gray-100 pt-6">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-800"
          >
            預約學習診斷
          </a>
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
