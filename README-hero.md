# 第一批：首屏輪播 Hero

分支建議：`feat/hero-carousel`

## 檔案

| 動作 | 路徑 |
|---|---|
| 新增 | `studio/src/schemaTypes/documents/heroSlide.ts` |
| 修改 | `studio/src/schemaTypes/index.ts`（加入 `heroSlide`） |
| 新增 | `frontend/sanity/lib/queries.hero.ts`（`heroSlidesQuery`） |
| 新增 | `frontend/app/components/hero/HeroSection.tsx`（server，抓資料） |
| 新增 | `frontend/app/components/hero/HeroCarousel.tsx`（client，輪播邏輯） |
| 新增 | `frontend/app/components/hero/HeroSlideContent.tsx`（文字與按鈕） |
| 新增 | `frontend/app/components/hero/HeroActionLink.tsx`（CTA 按鈕） |
| 新增 | `frontend/app/components/hero/HeroDots.tsx`（分頁點） |
| 新增 | `frontend/app/components/hero/types.ts`（`HeroSlideView`） |

## 使用

在 `frontend/app/page.tsx` 最上方放：

```tsx
import HeroSection from './components/hero/HeroSection'

// ...
<HeroSection />
```

## Schema 欄位

- `title` 主標題（必填）
- `subtitle` 副標題（可留空）
- `eyebrow` 小標籤（可留空，例如「國小一年級 — 高中三年級」）
- `image` 桌機圖，16:9，必填，含 alt
- `mobileImage` 手機圖，3:4，留空則用桌機圖
- `primaryAction` / `secondaryAction`：`label` + `href`（次按鈕可留空）
- `order` 排序（小的在前）、`enabled` 啟用開關

查詢會過濾 `enabled != false` 並依 `order` 排序。

## 輪播行為

- 自動播放 5.2 秒，滑鼠懸停或鍵盤聚焦時暫停
- 左右拖曳（滑鼠與觸控），超過 60px 換張，不足回彈
- 無限循環：軌道前後各放一張複製圖，動畫結束瞬間無痕跳回
- 圓點指示器可點擊跳張
- 鍵盤左右方向鍵切換（section 有 `tabIndex={0}`）
- `prefers-reduced-motion: reduce` 時停用自動播放與位移動畫

## 產生型別

Studio 改完 schema 後跑一次，`HeroSlide` 型別才會存在：

```bash
cd studio && npx sanity@latest schema extract
npx sanity@latest typegen generate
```

前端同樣需要重新產生 `frontend/sanity.types.ts`，`heroSlidesQuery` 的回傳型別才會正確（目前 `Hero.tsx` 先用 `any` 對應未產生型別的情況，型別產完可以拿掉）。

## 下一批

確認這批後，下一個區塊做「公告區（卡片 + Modal）」：`news` schema、查詢、卡片、共用 Modal 外框。
