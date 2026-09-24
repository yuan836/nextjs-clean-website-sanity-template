'use client'

import {useCallback, useState} from 'react'
import Modal from '@/app/components/Modal'
import TeacherCard from './TeacherCard'
import TeacherDetail from './TeacherDetail'
import type {TeacherView} from './types'

export default function TeacherGrid({items}: {items: TeacherView[]}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const close = useCallback(() => setOpenId(null), [])
  const active = items.find((t) => t._id === openId) ?? null

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:gap-4">
        {items.map((t) => (
          <TeacherCard key={t._id} item={t} onOpen={() => setOpenId(t._id)} />
        ))}
      </div>
      <Modal open={!!active} onClose={close} label={active?.name ?? ''} maxWidth={560}>
        {active ? <TeacherDetail item={active} onClose={close} /> : null}
      </Modal>
    </>
  )
}
