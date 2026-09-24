import {defineQuery} from 'next-sanity'

export const homePageQuery = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    resultsTitle,
    resultsNote,
    resultsCaption,
    "schools": schools[] { _key, name, count },
    teaserHeading,
    teaserBody,
    teaserImage,
    teaserButton,
    newsLimit,
    coursesLimit,
    albumLimit,
    showResults
  }
`)
