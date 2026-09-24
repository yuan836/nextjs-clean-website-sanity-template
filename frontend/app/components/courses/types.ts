export const LEVELS = [
  {label: '國小', value: 'elementary'},
  {label: '國中', value: 'junior'},
  {label: '高中', value: 'senior'},
] as const

export const SUBJECTS = [
  {label: '國文', value: 'chinese'},
  {label: '英文', value: 'english'},
  {label: '數學', value: 'math'},
  {label: '自然/理化生', value: 'science'},
  {label: '社會/歷地公', value: 'social'},
] as const

export const levelLabel = (v: string) => LEVELS.find((x) => x.value === v)?.label ?? v
export const subjectLabel = (v: string) => SUBJECTS.find((x) => x.value === v)?.label ?? v

export type CourseView = {
  _id: string
  slug: string
  name: string
  level: string
  subject: string
  imageUrl: string | null
  imageAlt: string
  summary?: string | null
  schedule?: string | null
  classSize?: string | null
  duration?: string | null
  term?: string | null
  outline?: string[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
}
