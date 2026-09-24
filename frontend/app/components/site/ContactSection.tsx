import Image from 'next/image'
import {stegaClean} from '@sanity/client/stega'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'
import {telHref} from './shared'

/** Contact block shared by every page: info card on the left, map on the right, equal height. */
export default async function ContactSection() {
  const {data: s} = await sanityFetch({query: settingsQuery})
  if (!s) return null

  const tel = telHref(s.phone)
  const rows = [
    {label: '地址', value: s.address},
    {label: '電話', value: s.phone, href: tel},
    {label: 'LINE', value: s.lineId, href: s.lineUrl ?? undefined},
    {label: '營業時間', value: s.hours},
  ].filter((r) => r.value)

  // Draft mode embeds invisible stega markers in strings; strip them before building a URL.
  const mapQuery = stegaClean(s.mapQuery || s.address)
  // Large places (airports, campuses) centre on their area, not the pin; `ll` pins the centre explicitly.
  const center = stegaClean(s.mapCenter)?.replace(/\s/g, '')
  const embedUrl = mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}${center ? `&ll=${center}` : ''}&z=16&hl=zh-TW&output=embed`
    : null
  const imageUrl = s.mapImage?.asset
    ? urlForImage(s.mapImage)?.width(1200).height(800).fit('crop').auto('format').url()
    : null

  const map = (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-lg bg-gray-200 shadow-sm">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title="校區位置地圖"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : imageUrl ? (
        <Image src={imageUrl} alt={s.mapImage?.alt ?? '校區位置地圖'} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">地圖</span>
      )}
    </div>
  )

  return (
    <section id="contact" className="border-t border-blue-900/10 bg-gradient-to-b from-[#e9effc] to-[#eff3fd]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-700 uppercase">Contact</span>
        <h2 className="mt-1.5 mb-6 text-2xl font-semibold text-gray-900 sm:text-3xl">聯絡資訊</h2>
        {/* Heading sits above the grid so the card and the map share the same top and bottom edge. */}
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm">
            {rows.map((r) => (
              <div key={r.label} className="flex items-baseline gap-4 border-b border-gray-100 pb-4">
                <span className="w-[72px] flex-none text-[13px] text-gray-500">{r.label}</span>
                {r.href ? (
                  <a href={r.href} className="text-[15px] leading-relaxed text-gray-900 hover:text-blue-700">
                    {r.value}
                  </a>
                ) : (
                  <span className="text-[15px] leading-relaxed text-gray-900">{r.value}</span>
                )}
              </div>
            ))}
            {tel || s.mapUrl ? (
              <div className="mt-auto grid gap-3 sm:auto-cols-fr sm:grid-flow-col">
                {tel ? (
                  <a
                    href={tel}
                    className="inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-800"
                  >
                    撥打電話諮詢
                  </a>
                ) : null}
                {s.mapUrl ? (
                  <a
                    href={s.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-blue-700 px-5 py-3 text-[15px] font-semibold text-blue-700 transition-colors hover:bg-blue-50"
                  >
                    Google 地圖導航
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
          {map}
        </div>
      </div>
    </section>
  )
}
