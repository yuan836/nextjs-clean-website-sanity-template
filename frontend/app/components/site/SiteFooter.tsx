import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'
import {NAV_ITEMS} from './shared'

export default async function SiteFooter() {
  const {data: s} = await sanityFetch({query: settingsQuery})
  const logoUrl = s?.logo?.asset ? urlForImage(s.logo)?.width(80).height(80).fit('max').url() : null
  const title = s?.title ?? '○○學院'

  return (
    <footer className="bg-gray-900 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-8">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded bg-blue-700 text-[11px] font-semibold text-white">
            {logoUrl ? <Image src={logoUrl} alt={s?.logo?.alt ?? title} fill sizes="30px" className="object-contain p-0.5" /> : 'LOGO'}
          </span>
          <span className="text-sm text-white">
            {title}
            {s?.footerTagline ? `　${s.footerTagline}` : ''}
          </span>
        </div>
        <nav aria-label="頁尾選單">
          <ul className="flex flex-wrap gap-5 text-[13px]">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <span className="w-full text-xs text-white/50 sm:w-auto">
          © {new Date().getFullYear()} {title}
        </span>
      </div>
    </footer>
  )
}
