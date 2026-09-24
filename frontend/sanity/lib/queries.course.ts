// 把下面這兩段貼到 frontend/sanity/lib/queries.ts 的最後面即可（同檔已有 defineQuery import）。

import {defineQuery} from 'next-sanity'

const courseFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  level,
  subject,
  image,
  summary,
  schedule,
  classSize,
  duration,
  term,
  outline,
  ctaLabel,
  ctaHref
`

export const allCoursesQuery = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(order asc, name asc) {
    ${courseFields}
  }
`)

export const featuredCoursesQuery = defineQuery(`
  *[_type == "course" && featured == true && defined(slug.current)] | order(order asc) [0...$limit] {
    ${courseFields}
  }
`)
