'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'
import {NAV_ITEMS, PhoneIcon} from './shared'

export type SiteHeaderProps = {
  title: string
  subtitle?: string | null
  logoUrl?: string | null
  logoAlt?: string
  phoneHref?: string
}

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

/** Dark "tech" header: grid texture, slow light sweep, pill nav, glowing CTA. Burger menu below md. */
export default function SiteHeaderClient({title, subtitle, logoUrl, logoAlt, phoneHref}: SiteHeaderProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 overflow-hidden bg-gradient-to-b from-[rgba(2,6,40,0.96)] to-[rgba(4,12,64,0.92)] shadow-[0_8px_28px_rgba(2,6,40,0.3)] backdrop-blur-md">
      {/* grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(96,140,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(96,140,255,0.07)_1px,transparent_1px)] bg-[size:34px_34px]"
      />
      {/* light sweep */}
      <div
        aria-hidden="true"
        className="motion-safe-scan pointer-events-none absolute inset-y-0 w-[22%] animate-[hdr-scan_7s_linear_infinite] bg-gradient-to-r from-transparent via-[rgba(96,140,255,0.22)] to-transparent"
      />

      <div className="relative mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="relative flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[10px] border border-[rgba(140,175,255,0.55)] bg-gradient-to-br from-[#597ef7] to-[#1d39c4] text-xs font-bold tracking-tight shadow-[0_0_18px_rgba(47,84,235,0.6),inset_0_1px_0_rgba(255,255,255,0.25)]">
            {logoUrl ? <Image src={logoUrl} alt={logoAlt ?? title} fill sizes="38px" className="object-contain p-1" /> : 'LOGO'}
          </span>
          <span className="flex flex-col leading-tight">
            <strong className="text-lg font-semibold tracking-[0.06em] [text-shadow:0_0_16px_rgba(120,160,255,0.5)]">
              {title}
            </strong>
            {subtitle ? (
              <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.26em] text-[rgba(160,190,255,0.75)] uppercase">
                <span className="motion-safe-pulse h-[5px] w-[5px] animate-[hdr-pulse_2.4s_ease-in-out_infinite] rounded-full bg-[#5cdbd3] shadow-[0_0_7px_#5cdbd3]" />
                {subtitle}
              </span>
            ) : null}
          </span>
        </Link>

        <nav aria-label="主選單" className="hidden items-center gap-6 md:flex">
          <ul className="flex gap-0.5 rounded-full border border-[rgba(120,160,255,0.22)] bg-[rgba(10,20,80,0.55)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-full px-[18px] py-2 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? 'bg-gradient-to-br from-[rgba(76,123,255,0.95)] to-[rgba(47,84,235,0.95)] text-white'
                        : 'text-[rgba(190,210,255,0.8)] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          {phoneHref ? (
            <a
              href={phoneHref}
              className="inline-flex items-center gap-[7px] rounded-full border border-[rgba(160,190,255,0.5)] bg-gradient-to-br from-[#4c7bff] to-[#2f54eb] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_18px_rgba(76,123,255,0.5)] transition-shadow duration-200 hover:shadow-[0_0_26px_rgba(76,123,255,0.8)]"
            >
              <PhoneIcon />
              電話諮詢
            </a>
          ) : null}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="選單"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-[rgba(120,160,255,0.28)] bg-[rgba(10,20,80,0.55)] text-white md:hidden"
        >
          <svg viewBox="64 64 896 896" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" />
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <nav id="mobile-menu" aria-label="主選單" className="relative border-t border-[rgba(120,160,255,0.2)] px-4 pb-4 md:hidden">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`mt-1.5 block rounded-[10px] border border-[rgba(120,160,255,0.2)] px-4 py-3.5 text-[15px] font-medium ${
                      active
                        ? 'bg-gradient-to-br from-[rgba(76,123,255,0.95)] to-[rgba(47,84,235,0.95)] text-white'
                        : 'text-[rgba(190,210,255,0.8)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      ) : null}

      <div
        aria-hidden="true"
        className="relative h-0.5 bg-[linear-gradient(90deg,#2f54eb,#5cdbd3_38%,#4c7bff_62%,rgba(47,84,235,0)_100%)] shadow-[0_0_12px_rgba(92,219,211,0.45)]"
      />
    </header>
  )
}
