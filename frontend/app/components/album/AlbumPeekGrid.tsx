'use client'

import {useState} from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'
import type {PhotoView} from './types'

/** Homepage peek: a row of cropped thumbnails that open the same lightbox. */
export default function AlbumPeekGrid({photos}: {photos: PhotoView[]}) {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {photos.map((p, i) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={p.alt ? `放大檢視：${p.alt}` : '放大檢視'}
            className="relative h-[108px] cursor-zoom-in overflow-hidden rounded-lg bg-gray-100 transition-opacity hover:opacity-90 sm:h-[150px]"
          >
            <Image src={p.crop} alt={p.alt} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
          </button>
        ))}
      </div>
      <Lightbox photos={photos} index={index} onChange={setIndex} />
    </>
  )
}
