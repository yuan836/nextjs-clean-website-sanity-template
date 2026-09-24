import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Teacher schema. Listed on /about and opened in the shared modal for details.
 * `classes` references course documents so class names stay in sync with the courses page.
 */

export const teacher = defineType({
  name: 'teacher',
  title: 'Teacher',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subject',
      title: '科目',
      type: 'string',
      description: '卡片與彈窗上的科目標籤，例如「數學」「理化」。',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: '頭照',
      type: 'image',
      description: '正方形，至少 400×400。',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: '替代文字'}],
    }),
    defineField({
      name: 'credential',
      title: '學歷',
      type: 'string',
      description: '例如「國立大學數學系」。',
    }),
    defineField({
      name: 'years',
      title: '年資',
      type: 'string',
      description: '例如「教學 12 年」。',
    }),
    defineField({
      name: 'philosophy',
      title: '教學理念',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'classes',
      title: '任教班別',
      type: 'array',
      description: '從已建立的課程中選擇。',
      of: [defineArrayMember({type: 'reference', to: [{type: 'course'}]})],
    }),
    defineField({
      name: 'experience',
      title: '經歷',
      type: 'array',
      description: '每一行一項。',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [{title: '排序', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', subject: 'subject', years: 'years', media: 'photo'},
    prepare({title, subject, years, media}) {
      return {title, subtitle: [subject, years].filter(Boolean).join(' ・ '), media}
    },
  },
})
