import type {PortableTextBlock} from 'next-sanity'

export type NewsView = {
  _id: string
  slug: string
  title: string
  tag: string
  date: string
  imageUrl: string
  imageAlt: string
  excerpt?: string | null
  body?: PortableTextBlock[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
}
