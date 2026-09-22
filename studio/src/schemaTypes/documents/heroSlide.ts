import {ImagesIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import type {HeroSlide} from '../../../sanity.types'

/**
 * Hero slide schema. One document per slide in the homepage hero carousel.
 * Slides are ordered by `order` (ascending) and only rendered when `enabled` is true.
 */

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  icon: ImagesIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '主標題',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: '副標題',
      type: 'text',
      rows: 3,
      description: '可留空。',
    }),
    defineField({
      name: 'eyebrow',
      title: '小標籤',
      type: 'string',
      description: '標題上方的小字，例如「國小一年級 — 高中三年級」。可留空。',
    }),
    defineField({
      name: 'image',
      title: '桌機圖片',
      type: 'image',
      description: '建議 16:9，最短邊 1600px 以上。',
      options: {
        hotspot: true,
        aiAssist: {imageDescriptionField: 'alt'},
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '替代文字',
          description: '對 SEO 與無障礙很重要。',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const document = context.document as HeroSlide
              if (document?.image?.asset?._ref && !alt) return 'Required'
              return true
            }),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: '手機圖片',
      type: 'image',
      description: '建議 3:4。留空則手機也使用桌機圖片。',
      options: {hotspot: true},
    }),
    defineField({
      name: 'primaryAction',
      title: '主按鈕',
      type: 'object',
      description: '例如「電話諮詢」。',
      fields: [
        defineField({name: 'label', title: '按鈕文字', type: 'string'}),
        defineField({
          name: 'href',
          title: '連結',
          type: 'string',
          description: '站內路徑（/courses）、電話（tel:0400000000）或完整網址。',
        }),
      ],
    }),
    defineField({
      name: 'secondaryAction',
      title: '次按鈕',
      type: 'object',
      description: '可留空。',
      fields: [
        defineField({name: 'label', title: '按鈕文字', type: 'string'}),
        defineField({name: 'href', title: '連結', type: 'string'}),
      ],
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      description: '數字小的排前面。',
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'enabled',
      title: '啟用',
      type: 'boolean',
      description: '關閉後不會顯示在首頁。',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: '排序',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', order: 'order', enabled: 'enabled', media: 'image'},
    prepare({title, order, enabled, media}) {
      const subtitle = [`#${order ?? '-'}`, enabled === false ? '停用中' : '啟用'].join(' ・ ')
      return {title, subtitle, media}
    },
  },
})
