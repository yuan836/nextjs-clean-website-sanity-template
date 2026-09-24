import type {HomeAlbumPeekQueryResult} from '@/sanity.types'

export type PhotoView = {
  key: string
  /** Large image for the lightbox (long edge ~2000px, original ratio). */
  full: string
  /** Thumbnail keeping the original ratio (masonry). */
  thumb: string
  /** Thumbnail cropped to 4:3 (grids / strips). */
  crop: string
  width: number
  height: number
  alt: string
  caption?: string | null
}

export type AlbumSetView = {
  _id: string
  title: string
  date: string
  /** Index of this set's first photo in the flattened list (for the lightbox). */
  offset: number
  photos: PhotoView[]
}

export type AlbumLayout = 'masonry' | 'sets' | 'strip'

// albumsQuery and homeAlbumPeekQuery share this shape; only albumsQuery also selects `date`.
export type AlbumRow = HomeAlbumPeekQueryResult[number] & {date?: string}
export type PhotoRow = NonNullable<AlbumRow['photos']>[number]
