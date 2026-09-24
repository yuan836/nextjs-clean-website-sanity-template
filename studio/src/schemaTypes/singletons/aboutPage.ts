import {InfoOutlineIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * About page singleton (id: "aboutPage"). Holds the brand intro content for /about:
 * header image, philosophy, teaching features and facilities. Teachers are separate documents.
 */

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  icon: InfoOutlineIcon,
  type: 'document',
  groups: [
    {name: 'intro', title: '頁首與理念', default: true},
    {name: 'features', title: '教學特色'},
    {name: 'facilities', title: '環境設施'},
  ],
  fields: [
    defineField({
      name: 'heroImage',
      title: '頁首圖片',
      type: 'image',
      group: 'intro',
      description: '建議 16:9，會裁成約 300px 高的橫幅。',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: '替代文字'}],
    }),
    defineField({
      name: 'title',
      title: '頁面標題',
      type: 'string',
      group: 'intro',
      initialValue: '品牌簡介',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'philosophy',
      title: '教育理念',
      type: 'blockContent',
      group: 'intro',
    }),
    defineField({
      name: 'features',
      title: '教學特色',
      type: 'array',
      group: 'features',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({name: 'title', title: '標題', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'body', title: '說明', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        }),
      ],
    }),
    defineField({
      name: 'facilities',
      title: '環境設施',
      type: 'array',
      group: 'facilities',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'facility',
          fields: [
            defineField({
              name: 'image',
              title: '圖片',
              type: 'image',
              options: {hotspot: true},
              fields: [{name: 'alt', type: 'string', title: '替代文字'}],
            }),
            defineField({name: 'title', title: '名稱', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'body', title: '說明', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'title', subtitle: 'body', media: 'image'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'About Page'}),
  },
})
