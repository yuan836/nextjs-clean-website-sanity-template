import type {Metadata} from 'next'

import NewsSection from '@/app/components/news/NewsSection'

// Temporary preview page for the news section; remove once it is placed on the homepage.
export const metadata: Metadata = {
  title: 'News preview',
  robots: {index: false, follow: false},
}

export default function NewsPreviewPage() {
  return <NewsSection limit={6} />
}
