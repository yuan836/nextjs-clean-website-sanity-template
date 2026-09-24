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
