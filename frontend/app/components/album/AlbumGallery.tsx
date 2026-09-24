'use client'

import {useState} from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'
import type {AlbumLayout, AlbumSetView, PhotoView} from './types'

const LAYOUTS: {value: AlbumLayout; label: string}[] = [
  {value: 'masonry', label: '磚牆網格'},
  {value: 'sets', label: '相簿分集'},
  {value: 'strip', label: '橫向捲動'},
]

function formatMonth(date: string) {
  if (!date) return ''
  const [y, m] = date.split('-')
  return `${y}.${m}`
}

function Thumb({
  photo,
  onOpen,
  className,
  sizes,
  cropped = true,
}: {
  photo: PhotoView
  onOpen: () => void
  className: string
  sizes: string
  cropped?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={photo.alt ? `放大檢視：${photo.alt}` : '放大檢視'}
      className={`relative block cursor-zoom-in overflow-hidden rounded-lg bg-gray-100 transition-opacity hover:opacity-90 ${className}`}
    >
      {cropped ? (
        <Image src={photo.crop} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <Image src={photo.thumb} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} className="h-auto w-full" />
      )}
    </button>
  )
}

/**
 * Album page body. `switchable` shows the three-layout switcher so the client can compare;
 * once a layout is chosen, pass `switchable={false}` and `defaultLayout` to lock it.
 */
export default function AlbumGallery({
  sets,
  photos,
  defaultLayout = 'masonry',
  switchable = true,
}: {
  sets: AlbumSetView[]
  photos: PhotoView[]
  defaultLayout?: AlbumLayout
  switchable?: boolean
}) {
  const [layout, setLayout] = useState<AlbumLayout>(defaultLayout)
  const [index, setIndex] = useState<number | null>(null)

  return (
    <>
      {switchable ? (
        <div className="mb-8 inline-flex gap-1 rounded-md border border-gray-300 bg-white p-[3px]">
          {LAYOUTS.map((l) => (
            <button
              key={l.value}
              type="button"
              aria-pressed={layout === l.value}
              onClick={() => setLayout(l.value)}
              className={`rounded px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                layout === l.value ? 'bg-blue-700 text-white' : 'text-gray-600 hover:text-blue-700'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      ) : null}

      {layout === 'masonry' ? (
        <div className="columns-2 gap-3 sm:columns-3">
          {photos.map((p, i) => (
            <div key={p.key} className="mb-3 break-inside-avoid">
              <Thumb
                photo={p}
                cropped={false}
                onOpen={() => setIndex(i)}
                className="w-full"
                sizes="(min-width: 640px) 33vw, 50vw"
              />
            </div>
          ))}
        </div>
      ) : null}

      {layout === 'sets' ? (
        <div className="flex flex-col gap-12">
          {sets.map((s) => (
            <div key={s._id}>
              <div className="mb-4 flex items-baseline gap-2 border-b border-gray-200 pb-2">
                <h2 className="text-xl font-semibold text-gray-900">{s.title}</h2>
                <span className="text-[13px] text-gray-500">
                  {formatMonth(s.date)} ・ {s.photos.length} 張
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {s.photos.map((p, i) => (
                  <Thumb
                    key={p.key}
                    photo={p}
                    onOpen={() => setIndex(s.offset + i)}
                    className="h-[120px] sm:h-[170px]"
                    sizes="(min-width: 640px) 25vw, 50vw"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {layout === 'strip' ? (
        <div className="flex flex-col gap-8">
          {sets.map((s) => (
            <div key={s._id}>
              <div className="mb-2 flex items-baseline gap-2">
                <h2 className="text-lg font-semibold text-gray-900">{s.title}</h2>
                <span className="text-[13px] text-gray-500">
                  {formatMonth(s.date)} ・ {s.photos.length} 張
                </span>
              </div>
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
                {s.photos.map((p, i) => (
                  <Thumb
                    key={p.key}
                    photo={p}
                    onOpen={() => setIndex(s.offset + i)}
                    className="h-[150px] w-[220px] flex-none snap-start sm:h-[220px] sm:w-[320px]"
                    sizes="320px"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <Lightbox photos={photos} index={index} onChange={setIndex} />
    </>
  )
}
