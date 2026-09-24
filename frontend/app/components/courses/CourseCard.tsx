import Image from 'next/image'
import {levelLabel, subjectLabel, type CourseView} from './types'

export default function CourseCard({item, onOpen}: {item: CourseView; onOpen: () => void}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col overflow-hidden rounded-lg bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-[100px] w-full bg-gray-100 sm:h-[140px]">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.imageAlt} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
            {levelLabel(item.level)}
          </span>
          <span className="text-xs font-semibold text-blue-700">{subjectLabel(item.subject)}</span>
        </div>
        <h3 className="text-[15px] leading-snug font-semibold text-gray-900 sm:text-[17px]">{item.name}</h3>
        {item.summary ? (
          <p className="hidden text-sm leading-relaxed text-gray-600 sm:block">{item.summary}</p>
        ) : null}
        <div className="mt-auto flex flex-wrap justify-between gap-x-2 gap-y-0.5 border-t border-gray-200 pt-2 text-xs text-gray-600 sm:text-[13px]">
          {item.schedule ? <span>{item.schedule}</span> : null}
          {item.classSize ? <span>{item.classSize}</span> : null}
        </div>
      </div>
    </button>
  )
}
