# 第二批：公告區（卡片 + 共用 Modal）

分支建議：`feat/news-section`（從 `feat/hero-carousel` 或 main 開都可以，兩批互不相依，只有 `schemaTypes/index.ts` 會衝突）

## 檔案

| 動作 | 路徑 |
|---|---|
| 新增 | `studio/src/schemaTypes/documents/news.ts` |
| 修改 | `studio/src/schemaTypes/index.ts`（加入 `news`，已含上一批的 `heroSlide`） |
| 新增 | `frontend/sanity/lib/queries.news.ts`（`latestNewsQuery`，import 時要寫 `@/sanity/lib/queries.news`） |
| 新增 | `frontend/app/components/Modal.tsx`（共用外框，之後師資／課程也用） |
| 新增 | `frontend/app/components/news/types.ts` |
| 新增 | `frontend/app/components/news/NewsCard.tsx` |
| 新增 | `frontend/app/components/news/NewsDetail.tsx`（Modal 內容） |
| 新增 | `frontend/app/components/news/NewsGrid.tsx`（client，管開關狀態） |
| 新增 | `frontend/app/components/news/NewsSection.tsx`（server，抓資料＋標題） |

若只合併這批、沒合併 Hero，`index.ts` 裡把 `heroSlide` 那兩行拿掉。

## 共用 Modal 的分工

`Modal.tsx` 只負責：遮罩、對話框容器（最寬 620px、高 88vh、內部捲動）、右上關閉鈕（`top: 12px`、`right: calc(0.5vw + 10px)`）、ESC 關閉、開啟時鎖住背景捲動、關閉鈕自動 focus。

內容完全由呼叫端帶入：

```tsx
<Modal open={open} onClose={close} label="標題">
  <NewsDetail item={item} onClose={close} />
</Modal>
```

之後師資用 `<TeacherDetail />`、課程用 `<CourseDetail />`，外框不動。

## Schema 欄位

- `title` 標題、`slug` 網址代稱（先留著，之後做獨立頁不用搬資料）
- `tag` 分類：招生／衝刺／公告／活動
- `date` 發布日期（排序依據）
- `coverImage` 封面 16:9 含 alt
- `excerpt` 摘要（卡片用，最多 120 字，手機隱藏）
- `body` 內文（用模板既有的 `blockContent`，後台可以加粗、清單、連結）
- `ctaLabel` / `ctaHref` 彈窗底部按鈕，連結留空就不顯示

## 使用

```tsx
import NewsSection from '@/app/components/news/NewsSection'

<NewsSection limit={3} />
```

你說先不要加進首頁，所以這批沒有動 `page.tsx`。要預覽的話可以暫時放在一個測試頁。

## RWD

- 手機：兩欄、圖高 108px、標題 15px、摘要隱藏
- `sm`（640px）以上：`auto-fit minmax(260px, 1fr)`，桌機三欄、圖高 170px

## 型別

schema 改完照舊跑：

```bash
cd studio && npx sanity@latest schema extract && npx sanity@latest typegen generate
```

`News` 型別產生後，`news.ts` 裡的 import 才不會報錯；`NewsSection.tsx` 的 `any` 也可以換成產生的查詢型別。

## 下一批

課程區：`course` schema、學齡＋科目雙層篩選、課程卡片、`CourseDetail`（套同一個 Modal）。
