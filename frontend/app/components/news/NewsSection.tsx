import type {PortableTextBlock} from 'next-sanity'
import {sanityFetch} from '@/sanity/lib/live'
import {latestNewsQuery} from '@/sanity/lib/queries.news'
import {urlForImage} from '@/sanity/lib/utils'
import NewsGrid from './NewsGrid'
import type {NewsView} from './types'

/** Server component: fetches the latest news and renders the section header + interactive grid. */
export default async function NewsSection({limit = 3}: {limit?: number}) {
  const {data} = await sanityFetch({query: latestNewsQuery, params: {limit}})
  if (!data?.length) return null

  const items: NewsView[] = data.map((n) => ({
    _id: n._id,
    slug: n.slug,
    title: n.title,
    tag: n.tag,
    date: n.date,
    imageUrl: urlForImage(n.coverImage)?.width(1200).height(675).fit('crop').auto('format').url() ?? '',
    imageAlt: n.coverImage?.alt ?? n.title ?? '',
    excerpt: n.excerpt,
    body: n.body as PortableTextBlock[] | null,
    ctaLabel: n.ctaLabel,
    ctaHref: n.ctaHref,
  }))

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-700 uppercase">News</span>
          <h2 className="mt-1.5 text-2xl font-semibold text-gray-900 sm:text-3xl">最新公告與活動</h2>
        </div>
      </div>
      <NewsGrid items={items} />
    </section>
  )
}
