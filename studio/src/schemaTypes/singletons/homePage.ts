import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Homepage singleton (id: "homePage"). Holds homepage-only copy that doesn't belong to
 * another document type: the 上榜名校 results block and the brand teaser.
 * Hero, news, courses and album photos come from their own documents.
 */

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  icon: HomeIcon,
  type: 'document',
  groups: [
    {name: 'results', title: '上榜名校', default: true},
    {name: 'teaser', title: '理念摘要'},
    {name: 'sections', title: '區塊開關'},
  ],
  fields: [
    // ---- 上榜名校 ----
    defineField({
      name: 'resultsTitle',
      title: '標題',
      type: 'string',
      group: 'results',
      initialValue: '上榜名校清單',
    }),
    defineField({
      name: 'resultsNote',
      title: '說明',
      type: 'string',
      group: 'results',
      initialValue: '近三年會考與學測錄取統計。',
    }),
    defineField({
      name: 'schools',
      title: '學校與人數',
      type: 'array',
      group: 'results',
      description: '拖動調整順序。建議 3 或 6 所，排版最整齊。',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'schoolResult',
          fields: [
            defineField({name: 'name', title: '學校', type: 'string', validation: (r) => r.required()}),
            defineField({
              name: 'count',
              title: '錄取人數',
              type: 'number',
              validation: (r) => r.required().integer().min(0),
            }),
          ],
          preview: {
            select: {title: 'name', count: 'count'},
            prepare: ({title, count}) => ({title, subtitle: `${count ?? 0} 人`}),
          },
        }),
      ],
    }),
    defineField({
      name: 'resultsCaption',
      title: '數字下方小字',
      type: 'string',
      group: 'results',
      initialValue: '錄取人數',
    }),

    // ---- 理念摘要 ----
    defineField({
      name: 'teaserHeading',
      title: '標題',
      type: 'string',
      group: 'teaser',
      initialValue: '學科成績是結果，讀書方法才是能帶走的能力',
    }),
    defineField({
      name: 'teaserBody',
      title: '內文',
      type: 'text',
      rows: 4,
      group: 'teaser',
    }),
    defineField({
      name: 'teaserImage',
      title: '圖片',
      type: 'image',
      group: 'teaser',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: '替代文字'}],
    }),
    defineField({
      name: 'teaserButton',
      title: '按鈕文字',
      type: 'string',
      group: 'teaser',
      initialValue: '品牌簡介與師資',
      description: '按鈕固定連到 /about。',
    }),

    // ---- 區塊開關 ----
    defineField({
      name: 'newsLimit',
      title: '公告顯示幾則',
      type: 'number',
      group: 'sections',
      initialValue: 3,
      validation: (r) => r.integer().min(0).max(9),
    }),
    defineField({
      name: 'coursesLimit',
      title: '熱門課程顯示幾張',
      type: 'number',
      group: 'sections',
      initialValue: 4,
      validation: (r) => r.integer().min(0).max(12),
    }),
    defineField({
      name: 'albumLimit',
      title: '相簿預覽顯示幾張',
      type: 'number',
      group: 'sections',
      initialValue: 4,
      validation: (r) => r.integer().min(0).max(12),
    }),
    defineField({
      name: 'showResults',
      title: '顯示上榜名校',
      type: 'boolean',
      group: 'sections',
      initialValue: true,
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home Page'}),
  },
})
