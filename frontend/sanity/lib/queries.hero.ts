// 把下面這段貼到 frontend/sanity/lib/queries.ts 的最後面即可（同檔已有 defineQuery import）。

import {defineQuery} from 'next-sanity'

export const heroSlidesQuery = defineQuery(`
  *[_type == "heroSlide" && enabled != false && defined(image.asset)] | order(order asc, _createdAt asc) {
    _id,
    title,
    subtitle,
    eyebrow,
    image,
    mobileImage,
    primaryAction,
    secondaryAction
  }
`)
