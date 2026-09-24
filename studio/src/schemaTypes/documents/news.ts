import {BellIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'
import type {News} from '../../../sanity.types'

/**
 * News / announcement schema. Shown as cards on the homepage and opened in a modal.
 * `slug` is kept so a standalone /news/[slug] page can be added later without migrating data.
 */

export const news = defineType({
  name: 'news',
  title: 'News',
  icon: BellIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '標題',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '網址代稱',
      type: 'slug',
      description: '之後做獨立公告頁時使用，點 Generate 自動產生。',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: '分類',
      type: 'string',
      options: {
        list: [
          {title: '招生', value: '招生'},
          {title: '衝刺', value: '衝刺'},
          {title: '公告', value: '公告'},
          {title: '活動', value: '活動'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: '公告',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: '發布日期',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: '封面圖',
      type: 'image',
      description: '建議 16:9。',
      options: {hotspot: true, aiAssist: {imageDescriptionField: 'alt'}},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '替代文字',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const document = context.document as News
              if (document?.coverImage?.asset?._ref && !alt) return 'Required'
              return true
            }),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3,
      description: '卡片上顯示的一兩句話；手機版會隱藏。',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'body',
      title: '內文',
      type: 'blockContent',
    }),
    defineField({
      name: 'ctaLabel',
      title: '彈窗按鈕文字',
      type: 'string',
      description: '需搭配下方「彈窗按鈕連結」，兩個都填才會顯示按鈕。',
      initialValue: '電話報名／諮詢',
    }),
    defineField({
      name: 'ctaHref',
      title: '彈窗按鈕連結',
      type: 'string',
      description: '例如 tel:0400000000 或 /courses。留空則不顯示按鈕。',
      validation: (rule) =>
        rule.custom((href, context) => {
          const label = (context.document as News | undefined)?.ctaLabel
          if (label && !href) return '已填按鈕文字但沒有連結，彈窗不會顯示按鈕。'
          return true
        }).warning(),
    }),
  ],
  orderings: [
    {title: '發布日期（新到舊）', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', tag: 'tag', date: 'date', media: 'coverImage'},
    prepare({title, tag, date, media}) {
      const subtitles = [tag, date && format(parseISO(date), 'yyyy.MM.dd')].filter(Boolean)
      return {title, media, subtitle: subtitles.join(' ・ ')}
    },
  },
})
