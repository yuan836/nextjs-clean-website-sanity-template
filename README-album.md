# 第五批：相簿頁 `/album`（三種版型 + 燈箱）

分支建議：`feat/album`

## 檔案

| 動作 | 路徑 |
|---|---|
| 新增 | `studio/src/schemaTypes/documents/album.ts` |
| 修改 | `studio/src/schemaTypes/index.ts`（加入 `album`，已含前四批） |
| 新增 | `frontend/sanity/lib/queries.album.ts`（`albumsQuery`、`homeAlbumPeekQuery`，import 時要寫 `@/sanity/lib/queries.album`） |
| 新增 | `frontend/app/components/album/types.ts` |
| 新增 | `frontend/app/components/album/toAlbumSets.ts` |
| 新增 | `frontend/app/components/album/Lightbox.tsx`（照片燈箱） |
| 新增 | `frontend/app/components/album/AlbumGallery.tsx`（client，三種版型＋切換） |
| 新增 | `frontend/app/components/album/AlbumPeekGrid.tsx`（client，首頁縮圖） |
| 新增 | `frontend/app/components/album/AlbumPeek.tsx`（server，首頁區塊） |
| 新增 | `frontend/app/album/page.tsx`（`/album` 子頁） |

這批不依賴 `Modal.tsx`，燈箱是獨立元件（全螢幕深色、照片原比例），但關閉鈕位置與 Modal 一致。

## 需要的套件

`toAlbumSets.ts` 用 `@sanity/asset-utils` 讀照片原始寬高（磚牆版型要用原比例）。模板通常已經裝了；沒有的話在 `frontend/` 下：

```bash
npm install @sanity/asset-utils
```

## 後台怎麼用

- 一個活動建一本相簿：名稱、日期、照片
- 照片欄位可以一次拖曳多張上傳，網格裡拖動可以調整順序
- 每張照片可填替代文字與圖說（圖說會顯示在燈箱下方）
- 「首頁相簿預覽」預設勾選；取消勾選的相簿不會出現在首頁

## 三種版型

`/album` 頁上方有切換鈕，讓客戶現場比較：

- **磚牆網格**：全部照片混在一起，保留原比例，手機 2 欄、桌機 3 欄
- **相簿分集**：依相簿分段，每段有標題、月份、張數，照片裁成 4:3
- **橫向捲動**：每本相簿一條，可左右滑動，會吸附對齊

選定後在 `app/album/page.tsx` 改成：

```tsx
<AlbumGallery sets={sets} photos={photos} defaultLayout="sets" switchable={false} />
```

切換鈕就會消失，其他兩種版型的程式碼可以之後再刪。

## 燈箱

- 左右兩側是跟照片同高的長條，平常隱形，滑鼠移上去才顯示
- 鍵盤：← → 切換、ESC 關閉
- 手機：左右滑動切換
- 下方顯示圖說與張數（3 / 9）
- 不論哪種版型，燈箱都能跨相簿一路往下看

## 首頁（之後組裝時）

```tsx
import AlbumPeek from '@/app/components/album/AlbumPeek'

<AlbumPeek limit={4} />
```

## 注意：路由衝突

Sanity 的 page 不要建 slug 為 `album` 的頁面。

## 型別

```bash
cd studio && npx sanity@latest schema extract && npx sanity@latest typegen generate
```

## 下一批

框架：導覽列（深藍科技感、手機漢堡選單）、頁尾、底部固定諮詢條、回到頂端鈕、聯絡資訊區（寫進 `settings`）。
