import {defineQuery} from 'next-sanity'

export const albumsQuery = defineQuery(`
  *[_type == "album" && count(photos) > 0] | order(date desc) {
    _id,
    title,
    date,
    "photos": photos[defined(asset)] { _key, asset, hotspot, crop, alt, caption }
  }
`)

export const homeAlbumPeekQuery = defineQuery(`
  *[_type == "album" && showOnHome != false && count(photos) > 0] | order(coalesce(pinned, false) desc, pinOrder asc, date desc) [0...3] {
    _id,
    title,
    "photos": photos[defined(asset)] { _key, asset, hotspot, crop, alt, caption }
  }
`)
