import {BookIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Course / class schema. Filtered on the site by `level` (學齡) and `subject` (科目),
 * shown as cards and opened in the shared modal.
 */

export const COURSE_LEVELS = [
  {title: '國小', value: 'elementary'},
  {title: '國中', value: 'junior'},
  {title: '高中', value: 'senior'},
]

export const COURSE_SUBJECTS = [
  {title: '國文', value: 'chinese'},
  {title: '英文', value: 'english'},
  {title: '數學', value: 'math'},
  {title: '自然/理化生', value: 'science'},
  {title: '社會/歷地公', value: 'social'},
]

export const course = defineType({
  name: 'course',
  title: 'Course',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '班別名稱',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '網址代稱',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      title: '學齡',
      type: 'string',
      options: {list: COURSE_LEVELS, layout: 'radio', direction: 'horizontal'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subject',
      title: '科目',
      type: 'string',
      options: {list: COURSE_SUBJECTS, layout: 'radio', direction: 'horizontal'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: '封面圖',
      type: 'image',
      description: '建議 16:9。',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: '替代文字'}],
    }),
    defineField({
      name: 'summary',
      title: '簡介',
      type: 'text',
      rows: 3,
      description: '卡片與彈窗都會顯示；手機卡片隱藏。',
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: 'schedule',
      title: '上課時段',
      type: 'string',
      description: '例如「週一・四 19:30」。',
    }),
    defineField({
      name: 'classSize',
      title: '班級人數',
      type: 'string',
      description: '例如「20 人班」。',
    }),
    defineField({
      name: 'duration',
      title: '每堂時間',
      type: 'string',
      initialValue: '110 分鐘',
    }),
    defineField({
      name: 'term',
      title: '開課期別',
      type: 'string',
      initialValue: '學期班／暑期班',
    }),
    defineField({
      name: 'outline',
      title: '課程規劃',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: '每一行一個重點。',
    }),
    defineField({
      name: 'featured',
      title: '首頁熱門課程',
      type: 'boolean',
      description: '勾選後出現在首頁「熱門課程推播」。',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      description: '數字小的排前面。',
      initialValue: 100,
    }),
    defineField({
      name: 'ctaLabel',
      title: '彈窗按鈕文字',
      type: 'string',
      initialValue: '電話報名此班別',
    }),
    defineField({
      name: 'ctaHref',
      title: '彈窗按鈕連結',
      type: 'string',
      initialValue: 'tel:0400000000',
    }),
  ],
  orderings: [{title: '排序', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', level: 'level', subject: 'subject', featured: 'featured', media: 'image'},
    prepare({title, level, subject, featured, media}) {
      const l = COURSE_LEVELS.find((x) => x.value === level)?.title
      const s = COURSE_SUBJECTS.find((x) => x.value === subject)?.title
      const subtitle = [l, s, featured ? '熱門' : null].filter(Boolean).join(' ・ ')
      return {title, subtitle, media}
    },
  },
})
