'use client'

import {useCallback, useState} from 'react'
import Modal from '@/app/components/Modal'
import NewsCard from './NewsCard'
import NewsDetail from './NewsDetail'
import type {NewsView} from './types'

export default function NewsGrid({items}: {items: NewsView[]}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const close = useCallback(() => setOpenId(null), [])
  const active = items.find((n) => n._id === openId) ?? null

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] sm:gap-6">
        {items.map((item) => (
          <NewsCard key={item._id} item={item} onOpen={() => setOpenId(item._id)} />
        ))}
      </div>
      <Modal open={!!active} onClose={close} label={active?.title ?? ''}>
        {active ? <NewsDetail item={active} onClose={close} /> : null}
      </Modal>
    </>
  )
}
