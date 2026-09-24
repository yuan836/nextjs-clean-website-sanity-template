import type {HomePageQueryResult} from '@/sanity.types'

/** One school card in 上榜名校 (ResultsSection). */
export type School = NonNullable<NonNullable<HomePageQueryResult>['schools']>[number]
