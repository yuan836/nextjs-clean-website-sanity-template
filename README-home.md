# 第七批：首頁組裝

分支建議：`feat/home`

## 檔案

| 動作 | 路徑 |
|---|---|
| 新增 | `studio/src/schemaTypes/singletons/homePage.ts` |
| 修改 | `studio/src/schemaTypes/index.ts`（加入 `homePage`；這份是**全部七批**的完整版） |
| 修改 | `studio/src/structure/index.ts`（後台最上方放 Home Page、About Page） |
| 新增 | `frontend/sanity/lib/queries.home.ts`（`homePageQuery`，import 時要寫 `@/sanity/lib/queries.home`） |
| 新增 | `frontend/app/components/home/CountUp.tsx`（數字滾動） |
| 新增 | `frontend/app/components/home/ResultsSection.tsx`（上榜名校） |
| 新增 | `frontend/app/components/home/AboutTeaser.tsx`（理念摘要） |
| 取代 | `frontend/app/page.tsx` |

## 這批依賴前面所有批次

`page.tsx` 會 import：

- `Hero`（第一批）
- `NewsSection`（第二批）
- `FeaturedCourses`（第三批）
- `AlbumPeek`（第五批）

`index.ts` 引用 `teacher`、`aboutPage`（第四批）與 `album`（第五批）。你的 repo 目前只有到第三批，**第四、五、六批要先合併**，不然 Studio 和首頁都會因為找不到檔案而報錯。

## 模板原本的首頁

新的 `page.tsx` 會蓋掉模板的示範首頁。想保留的話，覆蓋前先搬走：

```bash
mkdir -p frontend/app/demo
git mv frontend/app/page.tsx frontend/app/demo/page.tsx
```

之後 `/demo` 還看得到原本的示範頁。

## 首頁區塊順序

1. Hero 輪播（heroSlide）
2. 最新公告（news，預設 3 則）
3. 熱門課程（勾了「首頁熱門課程」的 course，預設 4 張）
4. 上榜名校（Home Page）
5. 理念摘要（Home Page）
6. 相簿預覽（album，預設 4 張）
7. 聯絡資訊、頁尾、諮詢條（layout.tsx 自動帶）

每個區塊沒資料時會整塊不顯示，所以一開始資料還沒填也不會出現空框。

## 後台：Home Page

左側最上方點「Home Page」，分三個分頁：

- **上榜名校**：標題、說明、學校與人數（可拖動排序，建議 3 或 6 所）、數字下方小字
- **理念摘要**：標題、內文、圖片、按鈕文字（按鈕固定連到 `/about`）
- **區塊開關**：公告／熱門課程／相簿預覽各顯示幾筆（填 0 就隱藏），上榜名校開關

## 數字滾動

- 捲到該區塊（露出 40%）才開始，1.1 秒從 0 跑到目標值，只跑一次
- 使用者開啟「減少動態效果」時直接顯示結果
- 用 `tabular-nums`，數字跳動時寬度不會抖

## 可選：Presentation 預覽

`studio/sanity.config.ts` 裡 Presentation tool 的首頁目前對應 `settings`。想在後台預覽首頁時直接編輯 Home Page，可以把：

```ts
{
  route: '/',
  filter: `_type == "settings" && _id == "siteSettings"`,
},
```

改成：

```ts
{
  route: '/',
  filter: `_type == "homePage" && _id == "homePage"`,
},
```

## 型別

```bash
cd studio && npx sanity@latest schema extract && npx sanity@latest typegen generate
```

## 全部完成後

七批都合併後，前端路由是：`/` 首頁、`/about` 品牌簡介、`/courses` 課程班別、`/album` 相簿。之後如果要做公告／課程的獨立網址（intercepting route），資料結構已經有 `slug`，不用搬資料。
