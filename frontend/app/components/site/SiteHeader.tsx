import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'
import SiteHeaderClient from './SiteHeaderClient'
import {telHref} from './shared'

export default async function SiteHeader() {
  const {data: s} = await sanityFetch({query: settingsQuery})
  const logoUrl = s?.logo?.asset ? urlForImage(s.logo)?.width(96).height(96).fit('max').url() : null

  return (
    <SiteHeaderClient
      title={s?.title ?? '○○學院'}
      subtitle={s?.subtitle ?? 'Academy'}
      logoUrl={logoUrl}
      logoAlt={s?.logo?.alt ?? undefined}
      phoneHref={telHref(s?.phone)}
    />
  )
}
