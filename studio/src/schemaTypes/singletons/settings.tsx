import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import type {Link, Settings} from '../../../sanity.types'

import * as demo from '../../lib/initialValues'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 *
 * Academy additions: brand (logo / name), contact info, map and the sticky call bar copy.
 * These live in their own groups so the original template fields stay untouched.
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'brand', title: '品牌', default: true},
    {name: 'contact', title: '聯絡資訊'},
    {name: 'callBar', title: '底部諮詢條'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      description: '網站名稱，也會出現在導覽列與瀏覽器分頁標題。',
      title: 'Title',
      type: 'string',
      group: 'brand',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: '英文副標',
      type: 'string',
      group: 'brand',
      description: '導覽列校名下方的小字，例如「Academy」。',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'brand',
      description: '正方形，建議 SVG 或透明背景 PNG。留空則顯示「LOGO」佔位。',
      fields: [{name: 'alt', type: 'string', title: '替代文字'}],
    }),
    defineField({
      name: 'footerTagline',
      title: '頁尾標語',
      type: 'string',
      group: 'brand',
      description: '例如「國小・國中・高中全科輔導」。',
    }),
    defineField({
      name: 'description',
      description: 'Used on the Homepage',
      title: 'Description',
      type: 'array',
      group: 'seo',
      initialValue: demo.description,
      of: [
        // Define a minified block content field for the description. https://www.sanity.io/docs/block-content
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'linkType',
                    title: 'Link Type',
                    type: 'string',
                    initialValue: 'href',
                    options: {
                      list: [
                        {title: 'URL', value: 'href'},
                        {title: 'Page', value: 'page'},
                        {title: 'Post', value: 'post'},
                      ],
                      layout: 'radio',
                    },
                  }),
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    hidden: ({parent}) => parent?.linkType !== 'href' && parent?.linkType != null,
                    validation: (Rule) =>
                      Rule.custom((value, context) => {
                        const parent = context.parent as Link
                        if (parent?.linkType === 'href' && !value) {
                          return 'URL is required when Link Type is URL'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'page',
                    title: 'Page',
                    type: 'reference',
                    to: [{type: 'page'}],
                    hidden: ({parent}) => parent?.linkType !== 'page',
                    validation: (Rule) =>
                      Rule.custom((value, context) => {
                        const parent = context.parent as Link
                        if (parent?.linkType === 'page' && !value) {
                          return 'Page reference is required when Link Type is Page'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'post',
                    title: 'Post',
                    type: 'reference',
                    to: [{type: 'post'}],
                    hidden: ({parent}) => parent?.linkType !== 'post',
                    validation: (Rule) =>
                      Rule.custom((value, context) => {
                        const parent = context.parent as Link
                        if (parent?.linkType === 'post' && !value) {
                          return 'Post reference is required when Link Type is Post'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'openInNewTab',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              const document = context.document as Settings
              if (document?.ogImage?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),

    // ---- 聯絡資訊 ----
    defineField({
      name: 'phone',
      title: '電話',
      type: 'string',
      group: 'contact',
      description: '顯示用格式，例如「04-0000-0000」。撥號連結會自動去掉符號。',
    }),
    defineField({
      name: 'address',
      title: '地址',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'lineId',
      title: 'LINE ID',
      type: 'string',
      group: 'contact',
      description: '例如「@academy」。',
    }),
    defineField({
      name: 'lineUrl',
      title: 'LINE 加好友連結',
      type: 'url',
      group: 'contact',
      description: '可留空；有填的話 LINE ID 會變成可點的連結。',
    }),
    defineField({
      name: 'hours',
      title: '營業時間',
      type: 'string',
      group: 'contact',
      description: '例如「週一至週六 13:00–21:30／週日休」。',
    }),
    defineField({
      name: 'mapQuery',
      title: '地圖定位',
      type: 'string',
      group: 'contact',
      description: '嵌入 Google 地圖要搜尋的地點，例如店家名稱或完整地址。留空會用上面的「地址」。',
    }),
    defineField({
      name: 'mapImage',
      title: '地圖圖片',
      type: 'image',
      group: 'contact',
      description: '備用：沒有地址也沒有地圖定位時才會顯示這張圖。',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: '替代文字'}],
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google 地圖連結',
      type: 'url',
      group: 'contact',
      description: '有填的話地圖下方會出現「在 Google 地圖開啟」按鈕。',
    }),

    // ---- 底部諮詢條 ----
    defineField({
      name: 'callBarTitle',
      title: '諮詢條標題',
      type: 'string',
      group: 'callBar',
      initialValue: '免費學習診斷諮詢',
    }),
    defineField({
      name: 'callBarNote',
      title: '諮詢條副標',
      type: 'string',
      group: 'callBar',
      description: '留空則顯示營業時間。',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
