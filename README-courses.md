# 第三批：課程區（雙層篩選 + 共用 Modal）

分支建議：`feat/courses`

## 檔案

| 動作 | 路徑 |
|---|---|
| 新增 | `studio/src/schemaTypes/documents/course.ts` |
| 修改 | `studio/src/schemaTypes/index.ts`（加入 `course`，已含 `heroSlide`、`news`） |
| 修改 | `frontend/sanity/lib/queries.ts`（貼上 `queries.course.ts` 的 `courseFields`、`allCoursesQuery`、`featuredCoursesQuery`） |
| 新增 | `frontend/app/components/courses/types.ts`（學齡／科目選項與型別） |
| 新增 | `frontend/app/components/courses/toCourseView.ts` |
| 新增 | `frontend/app/components/courses/CourseCard.tsx` |
| 新增 | `frontend/app/components/courses/CourseDetail.tsx`（Modal 內容） |
| 新增 | `frontend/app/components/courses/CourseGrid.tsx`（client，篩選＋開關） |
| 新增 | `frontend/app/components/courses/FeaturedCourses.tsx`（首頁區塊） |
| 新增 | `frontend/app/courses/page.tsx`（`/courses` 子頁） |

依賴上一批的 `Modal.tsx`，沒合併公告那批的話要一起帶進來。

## 注意：路由衝突

模板有 `app/[slug]/page.tsx` 給 page builder 用。`app/courses/page.tsx` 是靜態路由，Next.js 會優先匹配它，所以 Sanity 裡**不要**再建 slug 為 `courses` 的 page，否則那頁永遠不會顯示。

## Schema 欄位

- `name` 班別名稱、`slug`
- `level` 學齡：國小／國中／高中（存 `elementary`／`junior`／`senior`）
- `subject` 科目：國文／英文／數學／自然/理化生／社會/歷地公
- `image` 封面 16:9（選填，沒圖卡片顯示灰底）
- `summary` 簡介（最多 140 字）
- `schedule` 時段、`classSize` 人數、`duration` 每堂時間、`term` 期別 — 彈窗四格資訊，空的格子自動隱藏
- `outline` 課程規劃（字串陣列，一行一點）
- `featured` 勾選就上首頁熱門課程
- `order` 排序、`ctaLabel`／`ctaHref` 彈窗按鈕

學齡／科目選項在 studio 的 `course.ts` 和前端 `courses/types.ts` 各有一份，改選項時兩邊都要改。

## 使用

首頁（之後組裝時）：

```tsx
import FeaturedCourses from '@/app/components/courses/FeaturedCourses'

<FeaturedCourses limit={4} />
```

`/courses` 頁已經可以直接開。

## RWD

- 手機：兩欄、圖高 100px、摘要隱藏
- `sm` 以上：`auto-fill minmax(260px, 1fr)`，圖高 140px
- 篩選 pill 自動換行

## 型別

```bash
cd studio && npx sanity@latest schema extract && npx sanity@latest typegen generate
```

## 下一批

品牌簡介頁 `/about`：`teacher` schema（含彈窗詳解）、教育理念與教學特色、環境設施。
