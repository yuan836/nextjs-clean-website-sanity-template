import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {albumsQuery} from '@/sanity/lib/queries.album'
import AlbumGallery from '@/app/components/album/AlbumGallery'
import {toAlbumSets} from '@/app/components/album/toAlbumSets'

export const metadata: Metadata = {
  title: '相簿',
}

export default async function AlbumPage() {
  const {data} = await sanityFetch({query: albumsQuery})
  const {sets, photos} = toAlbumSets(data ?? [])

  return (
    <>
      <section className="border-b border-blue-900/10 bg-gradient-to-b from-[#e9effc] to-[#eff3fd]">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-6">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-700 uppercase">Album</span>
          <h1 className="mt-1.5 text-3xl font-bold text-gray-900 sm:text-4xl">相簿</h1>
          <p className="mt-2.5 text-[15px] text-gray-600">活動與上課側拍，點照片可放大瀏覽。</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-20">
        {photos.length ? (
          <AlbumGallery sets={sets} photos={photos} />
        ) : (
          <p className="rounded-lg border border-dashed border-gray-300 bg-white py-10 text-center text-sm text-gray-500">
            目前還沒有相簿
          </p>
        )}
      </section>
    </>
  )
}
