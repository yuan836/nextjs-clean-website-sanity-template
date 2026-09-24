# 第四批：品牌簡介頁 `/about`（理念、特色、師資 + 彈窗、環境設施）

分支建議：`feat/about`

## 檔案

| 動作 | 路徑 |
|---|---|
| 新增 | `studio/src/schemaTypes/documents/teacher.ts` |
| 新增 | `studio/src/schemaTypes/singletons/aboutPage.ts` |
| 修改 | `studio/src/schemaTypes/index.ts`（加入 `teacher`、`aboutPage`，已含前三批） |
| 修改 | `studio/src/structure/index.ts`（後台左側加「About Page」單一文件入口） |
| 新增 | `frontend/sanity/lib/queries.about.ts`（`aboutPageQuery`、`teachersQuery`，import 時要寫 `@/sanity/lib/queries.about`） |
| 新增 | `frontend/app/components/teachers/types.ts` |
| 新增 | `frontend/app/components/teachers/TeacherCard.tsx` |
| 新增 | `frontend/app/components/teachers/TeacherDetail.tsx`（Modal 內容） |
| 新增 | `frontend/app/components/teachers/TeacherGrid.tsx`（client，開關） |
| 新增 | `frontend/app/about/page.tsx`（`/about` 子頁） |

依賴：第二批的 `Modal.tsx`；`teacher` 的任教班別會引用第三批的 `course`。

`index.ts` 是整份檔案。前面批次還沒合併的話，把對應的 import 與陣列項目刪掉；但 `course` 一定要有，因為 `teacher` 引用它。

## 資料怎麼分

**About Page（單一文件）**：整個網站只有一份，後台左側點「About Page」直接進編輯，不會出現「新增」按鈕。分三個分頁：
- 頁首與理念：頁首圖、標題、教育理念（可排版的內文）
- 教學特色：可新增多筆，每筆有標題與說明，前台自動編號 01、02…
- 環境設施：可新增多筆，每筆有圖片、名稱、說明

**Teachers（多筆文件）**：每位老師一筆。
- 姓名、科目、頭照、學歷、年資、教學理念、經歷（一行一項）、排序
- 任教班別：從已建立的課程裡挑，不是手打。課程改名時老師那邊會自動跟著變。

## 共用 Modal

師資彈窗用同一個 `Modal` 外框（遮罩、關閉鈕、ESC、鎖捲動），寬度傳 `maxWidth={560}`；內容 `TeacherDetail` 保留設計稿的深藍頭部＋圓形頭照版型，跟公告、課程長得不一樣。

## 注意：路由衝突

跟 `/courses` 一樣，`app/about/` 會優先於 `app/[slug]/`。Sanity 的 page 不要建 slug 為 `about` 的頁面。

## 型別

```bash
cd studio && npx sanity@latest schema extract && npx sanity@latest typegen generate
```

## 下一批

相簿頁 `/album`：`album` schema（分集）、三種版型（磚牆／分集／橫向捲動）切換、照片燈箱。
