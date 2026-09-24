'use client'

import {useCallback, useMemo, useState} from 'react'
import Modal from '@/app/components/Modal'
import CourseCard from './CourseCard'
import CourseDetail from './CourseDetail'
import {LEVELS, SUBJECTS, type CourseView} from './types'

const ALL = 'all'

function Pill({active, onClick, children, size = 'md'}: {active: boolean; onClick: () => void; children: React.ReactNode; size?: 'md' | 'sm'}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border transition-colors duration-200 ${
        size === 'md' ? 'px-4 py-2 text-sm font-medium' : 'px-3.5 py-1.5 text-[13px]'
      } ${
        active
          ? 'border-blue-700 bg-blue-700 text-white'
          : 'border-gray-300 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-700'
      }`}
    >
      {children}
    </button>
  )
}

/**
 * Course grid. `filterable` shows the 學齡 + 科目 two-level filter (courses page);
 * without it the grid is a plain list (homepage featured courses).
 */
export default function CourseGrid({items, filterable = false}: {items: CourseView[]; filterable?: boolean}) {
  const [level, setLevel] = useState<string>(ALL)
  const [subject, setSubject] = useState<string>(ALL)
  const [openId, setOpenId] = useState<string | null>(null)
  const close = useCallback(() => setOpenId(null), [])

  const visible = useMemo(
    () =>
      items.filter(
        (c) => (level === ALL || c.level === level) && (subject === ALL || c.subject === subject),
      ),
    [items, level, subject],
  )
  const active = items.find((c) => c._id === openId) ?? null

  return (
    <>
      {filterable ? (
        <div className="mb-6 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="min-w-10 text-xs text-gray-500">學齡</span>
            <Pill active={level === ALL} onClick={() => setLevel(ALL)}>全部</Pill>
            {LEVELS.map((l) => (
              <Pill key={l.value} active={level === l.value} onClick={() => setLevel(l.value)}>
                {l.label}
              </Pill>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="min-w-10 text-xs text-gray-500">科目</span>
            <Pill size="sm" active={subject === ALL} onClick={() => setSubject(ALL)}>全部</Pill>
            {SUBJECTS.map((s) => (
              <Pill key={s.value} size="sm" active={subject === s.value} onClick={() => setSubject(s.value)}>
                {s.label}
              </Pill>
            ))}
          </div>
          <p className="mt-2 text-[13px] text-gray-500">共 {visible.length} 個班別</p>
        </div>
      ) : null}

      {visible.length ? (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-4">
          {visible.map((c) => (
            <CourseCard key={c._id} item={c} onOpen={() => setOpenId(c._id)} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white py-10 text-center text-sm text-gray-500">
          目前沒有符合條件的班別
        </p>
      )}

      <Modal open={!!active} onClose={close} label={active?.name ?? ''}>
        {active ? <CourseDetail item={active} onClose={close} /> : null}
      </Modal>
    </>
  )
}
