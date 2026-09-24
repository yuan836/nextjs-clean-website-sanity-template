import type {Metadata} from 'next'
import Image from 'next/image'
import type {PortableTextBlock} from 'next-sanity'
import {sanityFetch} from '@/sanity/lib/live'
import {aboutPageQuery, teachersQuery} from '@/sanity/lib/queries.about'
import {urlForImage} from '@/sanity/lib/utils'
import PortableText from '@/app/components/PortableText'
import TeacherGrid from '@/app/components/teachers/TeacherGrid'
import type {TeacherView} from '@/app/components/teachers/types'

export const metadata: Metadata = {
  title: '品牌簡介',
}

const eyebrow = 'text-[11px] font-semibold tracking-[0.2em] uppercase'
const h2 = 'mb-6 text-xl font-semibold text-gray-900 sm:text-[26px]'

export default async function AboutPage() {
  const [{data: about}, {data: teachersRaw}] = await Promise.all([
    sanityFetch({query: aboutPageQuery}),
    sanityFetch({query: teachersQuery}),
  ])

  const heroUrl = about?.heroImage?.asset
    ? urlForImage(about.heroImage)?.width(1920).height(600).fit('crop').auto('format').url()
    : null

  const teachers: TeacherView[] = (teachersRaw ?? []).map((t) => ({
    _id: t._id,
    name: t.name,
    subject: t.subject,
    photoUrl: t.photo?.asset
      ? (urlForImage(t.photo)?.width(240).height(240).fit('crop').auto('format').url() ?? null)
      : null,
    photoAlt: t.photo?.alt ?? t.name ?? '',
    credential: t.credential,
    years: t.years,
    philosophy: t.philosophy,
    classes: (t.classes ?? []).filter(Boolean),
    experience: t.experience,
  }))

  return (
    <>
      <section className="relative h-[300px] overflow-hidden bg-gray-900">
        {heroUrl ? (
          <Image src={heroUrl} alt={about?.heroImage?.alt ?? ''} fill priority sizes="100vw" className="object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,8,82,0.35)] to-[rgba(3,8,82,0.8)]" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 text-white">
            <span className={`${eyebrow} text-white/75`}>Brand</span>
            <h1 className="mt-1.5 text-3xl font-bold text-white sm:text-4xl">{about?.title ?? '品牌簡介'}</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 md:grid-cols-2 sm:py-20">
        <div>
          <h2 className={h2}>教育理念</h2>
          {about?.philosophy?.length ? (
            <PortableText className="max-w-none text-gray-600 prose-p:leading-[1.85]" value={about.philosophy as PortableTextBlock[]} />
          ) : null}
        </div>
        {about?.features?.length ? (
          <div className="grid gap-4">
            {about.features.map((f, i) => (
              <div key={f._key} className="flex gap-4 rounded-lg border border-gray-200 bg-white px-6 py-4">
                <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded bg-blue-50 text-[13px] font-bold text-blue-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-gray-900">{f.title}</h3>
                  {f.body ? <p className="text-sm leading-relaxed text-gray-600">{f.body}</p> : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {teachers.length ? (
        <section className="border-t border-blue-900/10 bg-gradient-to-b from-[#e9effc] to-[#eff3fd]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <h2 className={h2}>師資陣容</h2>
            <TeacherGrid items={teachers} />
          </div>
        </section>
      ) : null}

      {about?.facilities?.length ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className={h2}>環境與設施</h2>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-4">
            {about.facilities.map((f) => {
              const src = f.image?.asset
                ? urlForImage(f.image)?.width(800).height(560).fit('crop').auto('format').url()
                : null
              return (
                <figure key={f._key} className="overflow-hidden rounded-lg bg-white shadow-sm">
                  <div className="relative h-[110px] bg-gray-100 sm:h-[190px]">
                    {src ? (
                      <Image src={src} alt={f.image?.alt ?? f.title} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
                    ) : null}
                  </div>
                  <figcaption className="p-3 text-sm leading-relaxed text-gray-600 sm:p-4">
                    <strong className="mb-0.5 block text-[15px] text-gray-900 sm:text-[17px]">{f.title}</strong>
                    {f.body ? <span className="hidden sm:block">{f.body}</span> : null}
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </section>
      ) : null}
    </>
  )
}
