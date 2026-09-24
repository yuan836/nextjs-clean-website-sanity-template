import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {homeAlbumPeekQuery} from '@/sanity/lib/queries.album'
import AlbumPeekGrid from './AlbumPeekGrid'
import {toAlbumSets} from './toAlbumSets'

/** Homepage block: first N photos from the latest albums, links to /album. */
export default async function AlbumPeek({limit = 4}: {limit?: number}) {
  const {data} = await sanityFetch({query: homeAlbumPeekQuery})
  const {photos} = toAlbumSets(data ?? [])
  if (!photos.length) return null

  return (
    <section className="border-t border-blue-900/10 bg-gradient-to-b from-[#e9effc] to-[#eff3fd]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-700 uppercase">Album</span>
            <h2 className="mt-1.5 text-2xl font-semibold text-gray-900 sm:text-3xl">相簿側拍</h2>
          </div>
          <Link href="/album" className="text-sm text-gray-600 hover:text-blue-700">
            前往完整相簿 →
          </Link>
        </div>
        <AlbumPeekGrid photos={photos.slice(0, limit)} />
      </div>
    </section>
  )
}
