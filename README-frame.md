# 第六批：整站框架（導覽列、聯絡資訊、頁尾、底部諮詢條、回到頂端）

分支建議：`feat/site-frame`

## 檔案

| 動作 | 路徑 |
|---|---|
| 修改 | `studio/src/schemaTypes/singletons/settings.tsx`（加品牌、聯絡、諮詢條欄位，原有欄位保留） |
| 修改 | `frontend/app/globals.css`（貼上 `globals.additions.css` 的內容到最後面） |
| 修改 | `frontend/app/layout.tsx`（改用新框架元件） |
| 新增 | `frontend/app/components/site/shared.tsx`（選單項目、電話連結、電話圖示） |
| 新增 | `frontend/app/components/site/SiteHeaderClient.tsx`（client，導覽列互動） |
| 新增 | `frontend/app/components/site/SiteHeader.tsx`（server，讀 settings） |
| 新增 | `frontend/app/components/site/ContactSection.tsx` |
| 新增 | `frontend/app/components/site/SiteFooter.tsx` |
| 新增 | `frontend/app/components/site/CallBar.tsx` |
| 新增 | `frontend/app/components/site/BackToTop.tsx` |

不需要新的 query：模板原本的 `settingsQuery` 是 `*[_type == "settings"][0]`，會回傳整份 settings，新欄位自動帶出來。

## 原本的 Header / Footer

`app/components/Header.tsx`、`Footer.tsx` 沒刪，只是 `layout.tsx` 不再引用。確認新框架沒問題再刪即可。

## layout.tsx 改了什麼

- `Header` → `SiteHeader`，`Footer` → `SiteFooter`
- 拿掉 `pt-24`：舊 header 是 `fixed` 高 96px 要讓位；新 header 是 `sticky`，不用讓位
- 加 `pb-[76px]`：讓最後的內容不被底部諮詢條蓋住
- 每頁底部自動加 `ContactSection`，所以各子頁不用自己放聯絡資訊
- `CallBar`、`BackToTop` 放在 `<section>` 外面（固定定位）
- `lang="zh-Hant"`、底色改成設計稿的淡藍 `#f6f8fd`

## 後台（Site Settings）

settings 現在分四個分頁：

- **品牌**：網站名稱、英文副標（導覽列校名下方小字）、Logo、頁尾標語
- **聯絡資訊**：電話、地址、LINE ID、LINE 連結、營業時間、地圖圖片、Google 地圖連結
- **底部諮詢條**：標題、副標（留空就顯示營業時間）
- **SEO**：模板原有的 Description、Open Graph Image

電話填顯示用格式（`04-0000-0000`），撥號連結會自動轉成 `tel:0400000000`。**電話沒填的話，導覽列的電話鈕、聯絡區撥號鈕、底部諮詢條都不會出現。**

## 導覽列

- 深藍漸層＋細網格＋緩慢橫掃光帶（7 秒），底部青藍漸層細線
- 選單：首頁、品牌簡介、課程班別、相簿（在 `shared.tsx` 的 `NAV_ITEMS` 改）
- 目前所在頁面自動亮起（`/courses/xxx` 也算課程班別）
- 768px 以下收成漢堡選單，換頁自動關閉
- `prefers-reduced-motion` 時光帶與指示燈不動

## 其他

- **回到頂端**：捲動超過 320px 淡入，在諮詢條上方
- **聯絡區**：左資訊卡、右地圖，兩欄等高；地圖有填 Google 連結的話點下去開導航

## 型別

```bash
cd studio && npx sanity@latest schema extract && npx sanity@latest typegen generate
```

型別沒重新產生前，`s?.phone`、`s?.logo` 這些新欄位在編輯器裡會標紅，但不影響執行。

## 下一批

首頁組裝：`app/page.tsx` 換成 Hero → 公告 → 熱門課程 → 上榜名校（新 schema，含數字滾動）→ 理念摘要 → 相簿預覽。
