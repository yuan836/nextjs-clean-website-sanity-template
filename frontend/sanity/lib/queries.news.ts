import {defineQuery} from 'next-sanity'

export const latestNewsQuery = defineQuery(`
  *[_type == "news" && defined(slug.current) && defined(coverImage.asset)] | order(coalesce(pinned, false) desc, pinOrder asc, date desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    tag,
    date,
    coverImage,
    excerpt,
    body,
    ctaLabel,
    ctaHref
  }
`)
