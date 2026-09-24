import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {heroSlide} from './documents/heroSlide'
import {news} from './documents/news'
import {course} from './documents/course'
import {teacher} from './documents/teacher'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {aboutPage} from './singletons/aboutPage'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  aboutPage,
  // Documents
  page,
  post,
  person,
  heroSlide,
  news,
  course,
  teacher,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
]
