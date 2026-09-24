/** Shared helpers for the site frame (header, footer, contact, call bar). */

export const NAV_ITEMS = [
  {label: '首頁', href: '/'},
  {label: '品牌簡介', href: '/about'},
  {label: '課程班別', href: '/courses'},
  {label: '相簿', href: '/album'},
] as const

/** "04-0000-0000" → "tel:0400000000" */
export function telHref(phone?: string | null) {
  if (!phone) return undefined
  const digits = phone.replace(/[^\d+]/g, '')
  return digits ? `tel:${digits}` : undefined
}

export function PhoneIcon({size = 14}: {size?: number}) {
  return (
    <svg viewBox="64 64 896 896" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M877.1 238.7L770.6 132.3c-13-13-30.2-20.3-48.5-20.3s-35.6 7.2-48.5 20.2L558.3 246.8c-13 13-20.3 30.2-20.3 48.5s7.2 35.6 20.2 48.5l89.1 89.2a405.92 405.92 0 01-86.5 127.3c-36.6 36.6-79.4 66.8-127.1 86.6l-89.2-89.2c-13-13-30.2-20.2-48.5-20.2a67.9 67.9 0 00-48.5 20.1L132.3 692.2C119.3 705.2 112 722.5 112 740.8s7.3 35.6 20.3 48.6l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 624.6 888.4 493.3 910.4 361c10.1-60.3-9.8-122.4-33.3-122.3z" />
    </svg>
  )
}
