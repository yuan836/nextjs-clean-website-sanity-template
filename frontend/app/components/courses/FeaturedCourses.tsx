import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {featuredCoursesQuery} from '@/sanity/lib/queries'
import CourseGrid from './CourseGrid'
import {toCourseView} from './toCourseView'

/** Homepage block: featured courses without filters, links to /courses. */
export default async function FeaturedCourses({limit = 4}: {limit?: number}) {
  const {data} = await sanityFetch({query: featuredCoursesQuery, params: {limit}})
  if (!data?.length) return null

  return (
    <section className="border-y border-blue-900/10 bg-gradient-to-b from-[#e9effc] to-[#eff3fd]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-700 uppercase">Courses</span>
            <h2 className="mt-1.5 text-2xl font-semibold text-gray-900 sm:text-3xl">熱門課程推播</h2>
          </div>
          <Link href="/courses" className="text-sm text-gray-600 hover:text-blue-700">
            查看全部班別 →
          </Link>
        </div>
        <CourseGrid items={data.map(toCourseView)} />
      </div>
    </section>
  )
}
