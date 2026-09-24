import {sanityFetch} from '@/sanity/lib/live'
import {urlForImage} from '@/sanity/lib/utils'
import {heroSlidesQuery} from '@/sanity/lib/queries.hero'
import HeroCarousel, {type HeroSlideView} from './HeroCarousel'

/**
 * Server component: fetches the enabled hero slides and hands plain URLs to the
 * client carousel so the interactive part stays free of Sanity imports.
 */
export default async function Hero() {
  const {data: slides} = await sanityFetch({query: heroSlidesQuery})
  if (!slides?.length) return null

  const views: HeroSlideView[] = slides.map((slide: any) => {
    const desktopUrl =
      urlForImage(slide.image)?.width(1920).height(1080).fit('crop').auto('format').url() ?? ''
    const mobileUrl =
      urlForImage(slide.mobileImage ?? slide.image)
        ?.width(900)
        .height(1200)
        .fit('crop')
        .auto('format')
        .url() ?? desktopUrl

    return {
      _id: slide._id,
      title: slide.title,
      subtitle: slide.subtitle,
      eyebrow: slide.eyebrow,
      desktopUrl,
      mobileUrl,
      alt: slide.image?.alt ?? slide.title ?? '',
      primaryAction: slide.primaryAction,
      secondaryAction: slide.secondaryAction,
    }
  })

  return <HeroCarousel slides={views} />
}
