import {defineQuery} from 'next-sanity'

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    title,
    heroImage,
    philosophy,
    features[] { _key, title, body },
    facilities[] { _key, title, body, image }
  }
`)

export const teachersQuery = defineQuery(`
  *[_type == "teacher"] | order(order asc, name asc) {
    _id,
    name,
    subject,
    photo,
    credential,
    years,
    philosophy,
    "classes": classes[]->name,
    experience
  }
`)
