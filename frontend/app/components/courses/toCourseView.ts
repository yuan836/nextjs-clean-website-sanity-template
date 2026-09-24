import {urlForImage} from '@/sanity/lib/utils'
import type {CourseView} from './types'

/** Maps a raw course query result to the plain shape client components use. */
export function toCourseView(c: any): CourseView {
  return {
    _id: c._id,
    slug: c.slug,
    name: c.name,
    level: c.level,
    subject: c.subject,
    imageUrl: c.image?.asset
      ? (urlForImage(c.image)?.width(900).height(506).fit('crop').auto('format').url() ?? null)
      : null,
    imageAlt: c.image?.alt ?? c.name ?? '',
    summary: c.summary,
    schedule: c.schedule,
    classSize: c.classSize,
    duration: c.duration,
    term: c.term,
    outline: c.outline,
    ctaLabel: c.ctaLabel,
    ctaHref: c.ctaHref,
  }
}
