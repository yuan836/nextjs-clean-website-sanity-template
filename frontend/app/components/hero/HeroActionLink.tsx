import Link from 'next/link'
import type {HeroAction} from './types'

function isExternal(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href)
}

const variantClass = {
  primary:
    'inline-flex items-center rounded-md bg-white px-5 py-3 text-base font-semibold text-blue-700 transition-colors hover:bg-blue-50',
  secondary:
    'inline-flex items-center rounded-md border border-white/60 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-white/10',
}

/** Hero CTA button. Renders nothing unless both label and href are set. */
export default function HeroActionLink({
  action,
  variant,
}: {
  action?: HeroAction | null
  variant: keyof typeof variantClass
}) {
  const {label, href} = action ?? {}
  if (!label || !href) return null

  const className = variantClass[variant]
  if (isExternal(href)) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}
