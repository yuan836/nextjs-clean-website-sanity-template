import Image from 'next/image'
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

  const mapUrl = s.mapImage?.asset
    ? urlForImage(s.mapImage)?.width(1200).height(800).fit('crop').auto('format').url()
    : null

  const map = (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-lg bg-gray-200 shadow-sm">
      {mapUrl ? (
        <Image src={mapUrl} alt={s.mapImage?.alt ?? '校區位置地圖'} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">地圖</span>
      )}
    </div>
  )

  return (
    <section id="contact" className="border-t border-blue-900/10 bg-gradient-to-b from-[#e9effc] to-[#eff3fd]">
      <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-4 py-16 md:grid-cols-2 sm:py-20">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-700 uppercase">Contact</span>
          <h2 className="mt-1.5 mb-6 text-2xl font-semibold text-gray-900 sm:text-3xl">聯絡資訊</h2>
          <div className="flex flex-1 flex-col gap-4 rounded-lg bg-white p-6 shadow-sm">
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
            {tel ? (
              <a
                href={tel}
                className="mt-auto inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-800"
              >
                撥打電話諮詢
              </a>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col">
          {s.mapUrl ? (
            <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="flex-1" aria-label="在 Google 地圖開啟">
              {map}
            </a>
          ) : (
            <div className="flex-1">{map}</div>
          )}
        </div>
      </div>
    </section>
  )
}
