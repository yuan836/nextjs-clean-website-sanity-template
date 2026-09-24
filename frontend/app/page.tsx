import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery} from '@/sanity/lib/queries.home'
import {urlForImage} from '@/sanity/lib/utils'
import HeroSection from '@/app/components/hero/HeroSection'
import NewsSection from '@/app/components/news/NewsSection'
import FeaturedCourses from '@/app/components/courses/FeaturedCourses'
import AlbumPeek from '@/app/components/album/AlbumPeek'
import ResultsSection from '@/app/components/home/ResultsSection'
import AboutTeaser from '@/app/components/home/AboutTeaser'

/**
 * Homepage. Section order follows the approved design:
 * Hero → 公告 → 熱門課程 → 上榜名校 → 理念摘要 → 相簿預覽.
 * 聯絡資訊、頁尾、諮詢條 come from layout.tsx.
 * Every section returns null when it has no content, so an empty dataset renders a clean page.
 */
export default async function Page() {
  const {data: home} = await sanityFetch({query: homePageQuery})

  const teaserImageUrl = home?.teaserImage?.asset
    ? urlForImage(home.teaserImage)?.width(1200).height(800).fit('crop').auto('format').url()
    : null

  const newsLimit = home?.newsLimit ?? 3
  const coursesLimit = home?.coursesLimit ?? 4
  const albumLimit = home?.albumLimit ?? 4

  return (
    <>
      <HeroSection />
      {newsLimit > 0 ? <NewsSection limit={newsLimit} /> : null}
      {coursesLimit > 0 ? <FeaturedCourses limit={coursesLimit} /> : null}
      {home?.showResults !== false ? (
        <ResultsSection
          title={home?.resultsTitle}
          note={home?.resultsNote}
          caption={home?.resultsCaption}
          schools={(home?.schools ?? []).filter((s) => s.name)}
        />
      ) : null}
      <AboutTeaser
        heading={home?.teaserHeading}
        body={home?.teaserBody}
        imageUrl={teaserImageUrl}
        imageAlt={home?.teaserImage?.alt ?? undefined}
        button={home?.teaserButton}
      />
      {albumLimit > 0 ? <AlbumPeek limit={albumLimit} /> : null}
    </>
  )
}
