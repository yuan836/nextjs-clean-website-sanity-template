import {ImagesIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Photo album schema. One document per event / set (e.g. 段考衝刺班 2026.05).
 * The /album page shows every album; the homepage peek shows photos from the latest ones.
 */

export const album = defineType({
  name: 'album',
  title: 'Album',
  icon: ImagesIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '相簿名稱',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: '活動日期',
      type: 'date',
      options: {dateFormat: 'YYYY.MM.DD'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pinned',
      title: '置頂',
      type: 'boolean',
      description: '勾選後排在最前面（相簿頁與首頁預覽都適用）；多本置頂時依「置頂順序」排。',
      initialValue: false,
    }),
    defineField({
      name: 'pinOrder',
      title: '置頂順序',
      type: 'number',
      description: '數字小的在前，只有勾選置頂時才需要填。',
      hidden: ({document}) => !document?.pinned,
    }),
    defineField({
      name: 'photos',
      title: '照片',
      type: 'array',
      description: '可一次拖曳多張上傳，拖動調整順序。',
      options: {layout: 'grid'},
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: '替代文字'},
            {name: 'caption', type: 'string', title: '圖說（燈箱顯示，可留空）'},
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'showOnHome',
      title: '首頁相簿預覽',
      type: 'boolean',
      description: '勾選後照片可出現在首頁的相簿預覽。',
      initialValue: true,
    }),
  ],
  orderings: [{title: '活動日期（新到舊）', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', date: 'date', photos: 'photos', media: 'photos.0'},
    prepare({title, date, photos, media}) {
      const count = Array.isArray(photos) ? photos.length : 0
      const d = date ? format(parseISO(date), 'yyyy.MM') : null
      return {title, media, subtitle: [d, `${count} 張`].filter(Boolean).join(' ・ ')}
    },
  },
})
