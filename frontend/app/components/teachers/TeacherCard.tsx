import Image from 'next/image'
import type {TeacherView} from './types'

function Avatar({src, alt, size}: {src: string | null; alt: string; size: 'card' | 'detail'}) {
  const cls =
    size === 'card'
      ? 'relative h-11 w-11 flex-none overflow-hidden rounded-full bg-gray-200 sm:h-16 sm:w-16'
      : 'relative h-[84px] w-[84px] flex-none overflow-hidden rounded-full border-2 border-white/45 bg-white/10'
  return (
    <span className={cls}>
      {src ? <Image src={src} alt={alt} fill sizes="84px" className="object-cover" /> : null}
    </span>
  )
}

export {Avatar}

export default function TeacherCard({item, onOpen}: {item: TeacherView; onOpen: () => void}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex items-center gap-3 rounded-lg bg-white p-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4"
    >
      <Avatar src={item.photoUrl} alt={item.photoAlt} size="card" />
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-1.5">
          <strong className="text-[15px] font-semibold text-gray-900 sm:text-base">{item.name}</strong>
          <span className="text-xs font-semibold text-blue-700">{item.subject}</span>
        </span>
        {item.credential ? (
          <span className="mt-1 hidden text-[13px] leading-relaxed text-gray-600 sm:block">{item.credential}</span>
        ) : null}
        {item.years ? <span className="mt-0.5 block text-[13px] text-gray-500">{item.years}</span> : null}
      </span>
    </button>
  )
}
