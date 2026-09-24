import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {allCoursesQuery} from '@/sanity/lib/queries.course'
import CourseGrid from '@/app/components/courses/CourseGrid'
import {toCourseView} from '@/app/components/courses/toCourseView'

export const metadata: Metadata = {
  title: '課程與班別',
}

export default async function CoursesPage() {
  const {data} = await sanityFetch({query: allCoursesQuery})
  const items = (data ?? []).map(toCourseView)

  return (
    <>
      <section className="border-b border-blue-900/10 bg-gradient-to-b from-[#e9effc] to-[#eff3fd]">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-4">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-700 uppercase">Courses</span>
          <h1 className="mt-1.5 text-3xl font-bold text-gray-900 sm:text-4xl">課程與班別</h1>
          <p className="mt-2.5 text-[15px] text-gray-600">先選學齡，再選科目。</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-20">
        <CourseGrid items={items} filterable />
      </section>
    </>
  )
}
