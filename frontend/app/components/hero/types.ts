export type HeroAction = {label?: string | null; href?: string | null}

export type HeroSlideView = {
  _id: string
  title: string
  subtitle?: string | null
  eyebrow?: string | null
  desktopUrl: string
  mobileUrl: string
  alt: string
  primaryAction?: HeroAction | null
  secondaryAction?: HeroAction | null
}
