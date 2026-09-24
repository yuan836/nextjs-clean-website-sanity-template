import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {PhoneIcon, telHref} from './shared'

/** Fixed bottom bar with the phone CTA. The layout adds matching bottom padding so content isn't covered. */
export default async function CallBar() {
  const {data: s} = await sanityFetch({query: settingsQuery})
  const tel = telHref(s?.phone)
  if (!tel) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-gray-200 bg-white/95 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900">{s?.callBarTitle ?? '免費學習診斷諮詢'}</div>
          {s?.callBarNote || s?.hours ? (
            <div className="truncate text-xs text-gray-500">{s?.callBarNote ?? s?.hours}</div>
          ) : null}
        </div>
        <a
          href={tel}
          className="inline-flex flex-none items-center gap-2 rounded-md bg-blue-700 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-800"
        >
          <PhoneIcon size={15} />
          {s?.phone}
        </a>
      </div>
    </div>
  )
}
