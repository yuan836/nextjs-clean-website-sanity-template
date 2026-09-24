import Image from 'next/image'
import Link from 'next/link'
import PortableText from '@/app/components/PortableText'
import {formatDate} from './NewsCard'
import type {NewsView} from './types'

/** Content that sits inside the shared <Modal>. Layout is news-specific. */
export default function NewsDetail({item, onClose}: {item: NewsView; onClose: () => void}) {
  const external = item.ctaHref ? /^(https?:|tel:|mailto:)/.test(item.ctaHref) : false
  const ctaClass =
    'inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-800'

  return (
    <article>
      <div className="relative h-60 w-full">
        <Image src={item.imageUrl} alt={item.imageAlt} fill sizes="620px" className="object-cover" />
      </div>
      <div className="px-6 pt-6 pb-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">{item.tag}</span>
          <time dateTime={item.date} className="text-xs text-gray-500">
            {formatDate(item.date)}
          </time>
        </div>
        <h2 className="mb-4 text-xl leading-snug font-semibold text-balance text-gray-900 sm:text-2xl">{item.title}</h2>
        {item.body?.length ? (
          <PortableText className="prose-sm max-w-none text-gray-600 prose-p:leading-[1.9]" value={item.body} />
        ) : item.excerpt ? (
          <p className="text-[15px] leading-[1.9] text-gray-600">{item.excerpt}</p>
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
