# AI agent trends 2026 · 五大轉變互動整理

> 把 Google Cloud 的《AI agent trends 2026》報告,整理成一頁可互動、可搜尋、**中英雙語**的純靜態網站。

這個網站把一份 49 頁的 Google Cloud 互動報告，濃縮成一頁式的敘事體驗：五大趨勢、20+ 位高管引言、8 個企業實證案例、關鍵數據與「AI 學習五大支柱」，全部做成可點擊、可深連結、可一鍵切換中／英文的形式。資料整理自官方報告，數據另與《The ROI of AI 2025》交叉查核。

---

## 🔗 線上版 / Live

| | |
|---|---|
| 🌐 網站 | <https://tingwei161803.github.io/google-ai-agent-trends-2026/> |

> 直接點進去就能用，無需安裝。網址支援 `#<slug>` 深連結，例如直接打開某個趨勢或案例：
> - 趨勢一（為每位員工而生的代理）：<https://tingwei161803.github.io/google-ai-agent-trends-2026/#agents-for-every-employee>
> - 案例（Home Depot · Magic Apron）：<https://tingwei161803.github.io/google-ai-agent-trends-2026/#case-homedepot>

---

## ✨ 功能特色

- 🌏 **全頁雙語切換** — 中文 / English 一鍵切換，整頁文案（卡片、對話框、導覽、頁尾、`<title>`）無殘留
- 🌗 **深色 / 淺色模式** — 一鍵切換，並以 `localStorage` 記住偏好
- 🧭 **黏性區段導航 + scrollspy** — 八個區段的膠囊導覽，自動高亮目前位置
- 🃏 **趨勢／案例卡片 + 詳情對話框** — 點卡片開啟結構化詳情（重點數據、條列、案例故事）
- 🔢 **數字 count-up 動畫** — 52% / 88% / 3,466… 進入視窗時動畫遞增
- 📊 **inline SVG 長條圖** — 純手刻、無圖表函式庫的用例分布圖
- 🔗 **深連結** — 每個趨勢與案例都有專屬 `#<slug>`，可直接分享
- 📱 **響應式設計** — 手機、平板、桌機皆適配（375px 起跳，無水平溢出）
- ⚡ **純靜態、零 build** — 無後端、無打包工具，載入快、可離線瀏覽
- ♿ **基本無障礙** — 可鍵盤操作的卡片、`aria` 標籤、skip-link、尊重 `prefers-reduced-motion`

---

## 📂 內容結構 / 資料來源

本站內容整理自 **Google Cloud《AI agent trends 2026 — Five shifts that will redefine roles, workflows, and business value》互動報告**，數據另與 **Google Cloud《The ROI of AI 2025》**（全球 3,466 位企業決策者調查）交叉查核。

```
google-ai-agent-trends-2026/
├── index.html          # 入口頁（含 SEO / OG / JSON-LD meta）
├── data/
│   └── data.js         # 資料層：window.SITE_META + window.SITE_SECTIONS（雙語）
├── assets/
│   ├── styles.css      # Material Design 3 設計 token（light/dark）+ 全部元件樣式
│   ├── app.js          # 區段渲染器註冊表、i18n 全頁重繪、對話框、scrollspy
│   └── og-image.png    # 社群分享預覽圖
└── .nojekyll           # 讓 GitHub Pages 跳過 Jekyll 處理
```

### 已查核的官方來源

- Google Cloud — AI agent trends 2026（官方報告頁）：<https://cloud.google.com/resources/content/ai-agent-trends-2026>
- Google Cloud Blog — Business Trends Report 2026：<https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/ai-business-trends-report-2026/>
- Google Cloud — The ROI of AI 2025：<https://cloud.google.com/resources/content/roi-of-ai-2025>
- Announcing the Agent Payments Protocol (AP2)：<https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol>
- Announcing the Agent2Agent Protocol (A2A)：<https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/>
- The Home Depot × Google Cloud — Magic Apron agentic AI：<https://corporate.homedepot.com/news/partnerships/home-depot-and-google-cloud-launch-agentic-ai-tools-help-customers-and-associates>

> ⚠️ **非官方**：本網站為個人整理之非官方資源，與 Google 無關。內容整理自上述官方來源，如有錯誤或出入，請以官方來源為準。所有商標（Google Cloud、TELUS、Home Depot 等）為其各自所有者所有。

---

## 🛠 本機使用

```bash
# 1. clone 專案
git clone git@github.com:tingwei161803/google-ai-agent-trends-2026.git
cd google-ai-agent-trends-2026

# 2a. 最簡單：直接開啟 index.html
open index.html

# 2b. 或啟動本機伺服器（建議，深連結才正常）
uv run python -m http.server 4173
# 然後瀏覽 http://localhost:4173
```

> 本專案為純靜態網站，不需安裝任何依賴。若要跑本機伺服器或下方的測試，一律使用 `uv`。

### 測試使用者體驗（選配）

```bash
# 首次：下載 Playwright 驅動的 Chromium
uv run --no-project --with playwright playwright install chromium

# 跑 UX 驗收（會自起本機 server，檢查渲染、語言/主題切換、對話框、深連結、375px 響應式、a11y）
uv run --no-project --with playwright python /path/to/lazy-data2web/scripts/verify.py --dir .
```

---

## 📝 聲明 / License

- 本站為非官方整理，內容著作權歸原始來源 Google Cloud 所有。
- 程式碼以 **MIT** 授權釋出。
- 如為權利人且希望調整或移除內容，請開 issue 聯絡。
