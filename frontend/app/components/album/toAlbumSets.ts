import {getImageDimensions} from '@sanity/asset-utils'
import {urlForImage} from '@/sanity/lib/utils'
import type {AlbumRow, AlbumSetView, PhotoRow, PhotoView} from './types'

function toPhoto(p: PhotoRow, fallbackAlt: string): PhotoView {
  let width = 4
  let height = 3
  try {
    const dims = getImageDimensions(p.asset)
    width = dims.width
    height = dims.height
  } catch {
    // asset without dimension metadata — fall back to 4:3
  }
  const img = urlForImage(p)
  return {
    key: p._key,
    full: img?.width(2000).fit('max').auto('format').url() ?? '',
    thumb: img?.width(700).fit('max').auto('format').url() ?? '',
    crop: img?.width(700).height(525).fit('crop').auto('format').url() ?? '',
    width,
    height,
    alt: p.alt ?? fallbackAlt,
    caption: p.caption,
  }
}

/** Maps raw album query results into sets with lightbox offsets, plus the flattened photo list. */
export function toAlbumSets(raw: AlbumRow[]): {sets: AlbumSetView[]; photos: PhotoView[]} {
  const photos: PhotoView[] = []
  const sets = (raw ?? []).map((a) => {
    const offset = photos.length
    const list = (a.photos ?? []).map((p) => toPhoto(p, a.title))
    photos.push(...list)
    return {_id: a._id, title: a.title, date: a.date ?? '', offset, photos: list}
  })
  return {sets, photos}
}
