import Image from 'next/image'
import type {NewsView} from './types'

export default function NewsCard({item, onOpen}: {item: NewsView; onOpen: () => void}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-lg bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-[108px] w-full sm:h-[170px]">
        <Image src={item.imageUrl} alt={item.imageAlt} fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4 sm:pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">{item.tag}</span>
          <time dateTime={item.date} className="text-xs text-gray-500">
            {formatDate(item.date)}
          </time>
        </div>
        <h3 className="text-[15px] leading-snug font-semibold text-gray-900 sm:text-lg">{item.title}</h3>
        {item.excerpt ? (
          <p className="hidden text-sm leading-relaxed text-gray-600 sm:block">{item.excerpt}</p>
        ) : null}
        <span className="mt-auto pt-1 text-[13px] font-semibold text-blue-700">閱讀全文 →</span>
      </div>
    </button>
  )
}

export function formatDate(iso: string) {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`
}
