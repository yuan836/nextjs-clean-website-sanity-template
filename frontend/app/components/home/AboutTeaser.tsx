import Image from 'next/image'
import Link from 'next/link'

/** Brand teaser: short philosophy copy + image, button to /about. */
export default function AboutTeaser({
  heading,
  body,
  imageUrl,
  imageAlt,
  button,
}: {
  heading?: string | null
  body?: string | null
  imageUrl?: string | null
  imageAlt?: string
  button?: string | null
}) {
  if (!heading && !body) return null

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 sm:py-20">
      <div>
        <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-700 uppercase">About</span>
        {heading ? (
          <h2 className="mt-1.5 mb-4 text-2xl leading-snug font-semibold text-balance text-gray-900 sm:text-3xl">
            {heading}
          </h2>
        ) : null}
        {body ? <p className="mb-6 text-base leading-[1.85] text-gray-600">{body}</p> : null}
        <Link
          href="/about"
          className="inline-flex items-center rounded-md bg-blue-700 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-800"
        >
          {button ?? '品牌簡介與師資'}
        </Link>
      </div>
      {imageUrl ? (
        <div className="relative h-[240px] overflow-hidden rounded-lg shadow-sm sm:h-[340px]">
          <Image src={imageUrl} alt={imageAlt ?? ''} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      ) : null}
    </section>
  )
}
