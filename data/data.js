/* =========================================================================
   AI agent trends 2026 · composite · data.js

   A single long page assembled from an ordered list of typed section blocks.
   app.js owns a SECTION-TYPE REGISTRY (one renderer per `type`) and paints
   each entry of SITE_SECTIONS in order into <main>.

   Source: Google Cloud, "AI agent trends 2026 — Five shifts that will redefine
   roles, workflows, and business value in 2026" (interactive report).
   This is an UNOFFICIAL, fan-made bilingual summary for study/sharing.
   Stats verified against Google Cloud, "The ROI of AI 2025" (n=3,466).

   Every localized string is an {en, zh} object (or a plain string).
   ========================================================================= */

window.SITE_META = {
  title:    { en: "AI agent trends 2026", zh: "AI 代理趨勢 2026" },
  subtitle: { en: "Five shifts that will redefine roles, workflows, and business value.",
              zh: "重新定義角色、工作流程與商業價值的五大轉變。" }
};

window.SITE_SECTIONS = [

  /* ===================================================================
     1 · HERO — headline + animated counters
     =================================================================== */
  {
    type: "hero",
    id: "overview",
    eyebrow: { en: "Google Cloud · Interactive report", zh: "Google Cloud · 互動報告" },
    title:    { en: "AI agent trends 2026", zh: "AI 代理趨勢 2026" },
    subtitle: { en: "Agentic AI moves beyond answering questions to understanding a goal, making a plan, and taking action across applications — with human guidance and oversight. These are the five shifts reshaping business in 2026.",
                zh: "Agentic AI(代理式 AI)不再只是回答問題,而是理解目標、制定計畫,並跨應用程式採取行動 —— 全程在人類引導與監督之下。以下是 2026 年重塑商業的五大轉變。" },
    stats: [
      { value: 5,    suffix: "",  label: { en: "Key shifts", zh: "關鍵轉變" } },
      { value: 52,   suffix: "%", label: { en: "of execs have AI agents in production", zh: "高管組織已在生產環境部署 AI 代理" } },
      { value: 88,   suffix: "%", label: { en: "of agentic AI early adopters see positive ROI", zh: "agentic AI 早期採用者已見正向 ROI" } },
      { value: 3466, suffix: "",  label: { en: "enterprise leaders surveyed · ROI of AI 2025", zh: "受訪企業決策者 · ROI of AI 2025" } }
    ]
  },

  /* ===================================================================
     2 · PROSE — what agentic AI is + methodology
     =================================================================== */
  {
    type: "prose",
    id: "about",
    title:    { en: "The ceiling for human achievement has been lifted",
                zh: "人類成就的天花板,被抬高了" },
    subtitle: { en: "The decisive shift for business isn't AGI — it's agentic AI, and it's happening right now.",
                zh: "對企業而言,決定性的轉變不是 AGI,而是正在發生的 agentic AI。" },
    blocks: [
      { type: "p",
        text: { en: "Agentic AI augments human capacity with better recall, faster data processing, and enhanced reasoning across the back office, front office, and corner office. Unlocking its value requires more than adopting new tools — it demands that leaders question old assumptions and drive the cultural change to thrive in this new era.",
                zh: "Agentic AI 以更強的記憶力、更快的資料處理與更強的推理能力,擴增人類在後勤、前線到高層決策的能力。要釋放它的價值,光採用新工具不夠 —— 領導者必須質疑舊有假設,並推動文化變革,才能在這個新時代勝出。" } },
      { type: "callout",
        text: { en: "Agents are systems that combine the intelligence of advanced AI models with access to tools so they can take actions on your behalf, under your control.",
                zh: "代理是一種系統,結合先進 AI 模型的智慧與工具的存取能力,讓它們能在你的掌控下、代你採取行動。" },
        cite: { en: "Sundar Pichai, CEO, Google — Google I/O, May 2025",
                zh: "Sundar Pichai,Google 執行長 —— Google I/O,2025 年 5 月" } },
      { type: "h3",
        text: { en: "How these trends were identified", zh: "這些趨勢如何彙整而來" } },
      { type: "p",
        text: { en: "These trends blend qualitative and quantitative data: internal Google Cloud and Google DeepMind interviews with AI leaders, customer case studies, and insights from The ROI of AI 2025 — a global survey of 3,466 enterprise decision-makers, analyzed with NotebookLM and Google AI Studio.",
                zh: "這些趨勢結合質性與量化資料:Google Cloud 與 Google DeepMind 內部對 AI 領導者的訪談、客戶案例,以及《The ROI of AI 2025》—— 一份涵蓋 3,466 位企業決策者的全球調查,並以 NotebookLM 與 Google AI Studio 進行分析。" } }
    ]
  },

  /* ===================================================================
     3 · CARDS (trends) — the five shifts; click opens a detail dialog
     =================================================================== */
  {
    type: "cards",
    id: "trends",
    title:    { en: "Five shifts shaping 2026", zh: "形塑 2026 的五大轉變" },
    subtitle: { en: "Tap a trend to explore the new model, real examples, and what it means for your teams.",
                zh: "點一張趨勢卡,深入了解新模式、真實案例,以及對你團隊的意義。" },
    items: [
      {
        slug: "agents-for-every-employee",
        num: 1, accent: "t1", icon: "groups",
        title:    { en: "Agents for every employee", zh: "為每位員工而生的代理" },
        summary:  { en: "Every employee becomes a human supervisor of agents — shifting from doing every task to orchestrating a team of specialized AI agents grounded in enterprise context.",
                    zh: "每位員工都成為「代理的人類主管」—— 從親自完成每件事,轉為協調一群紮根於企業情境的專業 AI 代理。" },
        tags: ["Gemini Enterprise", "Intent-based computing"],
        stat: { value: "52%", label: { en: "of execs already have agents in production", zh: "高管組織已部署生產級代理" } },
        detail: [
          { type: "p",
            text: { en: "The most significant business shift of 2026 isn't just about efficiency; it's a fundamental, employee-centric transformation. The human-computer interface is moving from instruction-based computing (analyze a spreadsheet, write code) to intent-based computing: employees state a desired outcome, and LLMs and agents determine how to deliver it.",
                    zh: "2026 年最重要的商業轉變不只是效率,而是一場以員工為中心的根本變革。人機介面正從「指令式運算」(分析試算表、寫程式)走向「意圖式運算」:員工說出想要的結果,由 LLM 與代理決定如何達成。" } },
          { type: "h3", text: { en: "The new integrated working model", zh: "全新的整合工作模式" } },
          { type: "ul",
            items: { en: ["Delegate mundane or repetitive tasks to the right agent",
                          "Set goals — clearly define the desired outcome",
                          "Outline strategy, using human judgment for nuanced calls",
                          "Verify quality, accuracy, and tone as the final checkpoint"],
                     zh: ["把瑣碎、重複的任務委派給合適的代理",
                          "設定目標 —— 清楚定義想要的結果",
                          "擬定策略,並以人類判斷做出需要拿捏的決定",
                          "把關品質、正確性與語氣,作為最後一道防線"] } },
          { type: "h3", text: { en: "Example: the 10x marketing manager", zh: "範例:10 倍效率的行銷經理" } },
          { type: "p",
            text: { en: "Instead of personally drafting posts and pulling data, the manager orchestrates five specialized agents — Data, Analyst, Content, Creative, and Reporting — and focuses on high-impact brand storytelling and strategy.",
                    zh: "行銷經理不再親自撰文、拉資料,而是協調五個專業代理 —— 資料、分析、內容、創意與報表 —— 把心力放在高影響力的品牌敘事與策略上。" } }
        ]
      },
      {
        slug: "agents-for-every-workflow",
        num: 2, accent: "t2", icon: "account_tree",
        title:    { en: "Agents for every workflow", zh: "為每個工作流程而生的代理" },
        summary:  { en: "An agentic system is a digital assembly line — a human-guided, multi-step workflow that orchestrates multiple agents to run a business process end to end.",
                    zh: "代理系統是一條數位生產線 —— 由人類引導、多步驟的工作流程,協調多個代理,把商業流程從頭到尾跑完。" },
        tags: ["A2A protocol", "MCP", "AP2"],
        stat: { value: "88%", label: { en: "of early adopters see ROI on ≥1 gen AI use case", zh: "早期採用者在至少一個 gen AI 用例見到 ROI" } },
        detail: [
          { type: "p",
            text: { en: "The digital assembly line is made possible by the Agent2Agent (A2A) protocol — an open standard enabling seamless orchestration between agents even if they are from different developers, frameworks, or organizations.",
                    zh: "這條數位生產線之所以可行,靠的是 Agent2Agent(A2A)協定 —— 一套開放標準,讓即使來自不同開發者、框架或組織的代理,也能無縫協作與編排。" } },
          { type: "p",
            text: { en: "While LLMs are the \"brains,\" their knowledge is frozen at training time and they can't act on the world. The Model Context Protocol (MCP) solves this with a standardized two-way connection to data sources and tools — managed databases (Cloud SQL, Spanner) and data platforms (BigQuery).",
                    zh: "LLM 是代理的「大腦」,但知識停在訓練當下、也無法對外界採取行動。Model Context Protocol(MCP)以標準化的雙向連線解決此問題,讓模型能連到資料來源與工具 —— 託管資料庫(Cloud SQL、Spanner)與資料平台(BigQuery)。" } },
          { type: "h3", text: { en: "Agentic ecommerce", zh: "代理式電商" } },
          { type: "p",
            text: { en: "Today's payment systems assume a human is initiating the purchase. Google's Agent Payments Protocol (AP2) lets an agent transact with human pre-approval — e.g. \"Purchase this jacket when it's available in black. Don't purchase it if the price is more than $100\" — capturing a high-intent sale that would otherwise be lost.",
                    zh: "現今的支付系統假設是「人類」在發起購買。Google 的 Agent Payments Protocol(AP2)讓代理能在人類事先授權下交易 —— 例如「等這件外套有黑色再買;若價格超過 $100 就不要買」—— 把原本會流失的高意圖訂單抓回來。" } }
        ]
      },
      {
        slug: "agents-for-your-customers",
        num: 3, accent: "t3", icon: "support_agent",
        title:    { en: "Agents for your customers", zh: "為你的客戶而生的代理" },
        summary:  { en: "Scripted chatbots give way to agentic concierges that remember preferences and past conversations, grounded in your enterprise data, to offer truly one-to-one service.",
                    zh: "腳本式聊天機器人讓位給「代理管家」:記得偏好與過往對話,紮根於你的企業資料,提供真正一對一的服務。" },
        tags: ["Customer Engagement Suite", "Personalization at scale"],
        stat: { value: "49%", label: { en: "of orgs with agents in production use them for customer service", zh: "已部署代理的組織用於客戶服務" } },
        detail: [
          { type: "p",
            text: { en: "For a decade, customer service automation meant pre-programmed chatbots: \"Please enter your 12-digit order number.\" The agentic concierge instead opens with context: \"Hi, Elizaveta. I see you're calling about the blue sweater you bought last week. Our system shows it was just delivered. Are you starting a return or an exchange?\"",
                    zh: "過去十年,客服自動化等於預設腳本的聊天機器人:「請輸入您的 12 碼訂單編號。」代理管家則帶著情境開場:「Elizaveta 您好,看到您是為上週購買的藍色毛衣來電,系統顯示已送達。請問是要退貨還是換貨呢?」" } },
          { type: "h3", text: { en: "Proactive, not reactive", zh: "主動,而非被動" } },
          { type: "p",
            text: { en: "When a delivery is flagged as failed, the concierge checks the backend, reschedules to the next slot, applies a service credit, and texts the customer — executing a smart handoff to human staff for complex or emotionally charged cases.",
                    zh: "當一筆配送被標記為失敗,管家會檢查後端、改約到下一個時段、補上服務折抵金,並簡訊通知客戶 —— 遇到複雜或情緒性的案件,再「聰明地」交棒給真人。" } },
          { type: "h3", text: { en: "The stack behind it", zh: "背後的技術堆疊" } },
          { type: "ul",
            items: { en: ["Agent Studio — personalized, always-on multimodal engagement agents",
                          "Agent Assist — in-the-moment coaching for faster resolution",
                          "Insights — improve service operations performance and efficiency",
                          "Omnichannel gateway — scalable, secure orchestration"],
                     zh: ["Agent Studio —— 個人化、全天候的多模態互動代理",
                          "Agent Assist —— 即時教練,加速問題解決",
                          "Insights —— 提升客服營運的效能與效率",
                          "Omnichannel gateway —— 可擴展、安全的全通路編排"] } }
        ]
      },
      {
        slug: "agents-for-security",
        num: 4, accent: "t4", icon: "security",
        title:    { en: "Agents for security", zh: "為資安而生的代理" },
        summary:  { en: "AI agents take on the draining, reactive work of alert-watching, elevating human analysts from tactical responders to strategic defenders.",
                    zh: "AI 代理接手耗神、被動的「盯警報」工作,把人類分析師從戰術型應變者,提升為戰略型防禦者。" },
        tags: ["Agentic SOC", "SAIF 2.0", "CodeMender"],
        stat: { value: "82%", label: { en: "of analysts fear missing real threats amid alert overload", zh: "分析師擔心因警報過量而漏掉真實威脅" } },
        detail: [
          { type: "p",
            text: { en: "In a modern security operations center (SOC), alert fatigue is the attacker's greatest advantage: they only need to be right once, while defenders must be right every time. An agentic SOC orchestrates task-based agents — triage and investigation, threat research and hunt, malware analysis, detection engineering, and response — under human oversight, sharing context through A2A and MCP.",
                    zh: "在現代資安營運中心(SOC),警報疲勞是攻擊者最大的優勢:攻擊者只要對一次,防禦者卻必須次次都對。代理式 SOC 在人類監督下,編排一群任務型代理 —— 分流調查、威脅研究與獵捕、惡意程式分析、偵測工程與回應 —— 並透過 A2A 與 MCP 共享情境。" } },
          { type: "h3", text: { en: "The elevated analyst", zh: "被提升的分析師" } },
          { type: "ul",
            items: { en: ["Threat hunting — using intuition and experience to guide the agents",
                          "Supervising agents — tuning their \"rules of engagement\"",
                          "Defending — architecting better, next-generation defenses"],
                     zh: ["威脅獵捕 —— 以直覺與經驗引導代理",
                          "監督代理 —— 微調它們的「交戰規則」",
                          "防禦 —— 設計更好的下一代防禦架構"] } },
          { type: "p",
            text: { en: "The expanded Secure AI Framework (SAIF) 2.0 addresses risks from autonomous agents, and DeepMind's CodeMender — an AI agent that improves code security automatically — has already found new zero-day vulnerabilities in well-tested software.",
                    zh: "升級版的 Secure AI Framework(SAIF)2.0 處理自主代理帶來的風險;而 DeepMind 的 CodeMender —— 一個能自動提升程式碼安全的 AI 代理 —— 已在經過充分測試的軟體中找出新的零時差漏洞。" } }
        ]
      },
      {
        slug: "agents-for-scale",
        num: 5, accent: "t5", icon: "school",
        title:    { en: "Agents for scale", zh: "為規模而生的代理" },
        summary:  { en: "It's tempting to focus on models and platforms, but the most critical element is people. The half-life of a professional skill is now four years — and in tech, as short as two.",
                    zh: "我們很容易只盯著模型與平台,但最關鍵的要素是「人」。一項專業技能的半衰期如今只剩四年 —— 在科技業甚至短至兩年。" },
        tags: ["AI-ready workforce", "5 pillars", "Google Skills"],
        stat: { value: "84%", label: { en: "of employees want a greater organizational focus on AI", zh: "員工希望組織更聚焦於 AI" } },
        detail: [
          { type: "p",
            text: { en: "To thrive, organizations must move beyond simply buying technology and focus on building an AI-ready workforce — a holistic strategy built on five pillars (explored below). Upskilling will be the ultimate driver of business value.",
                    zh: "要勝出,組織必須超越「只是買技術」,聚焦於打造 AI-ready 的人才 —— 一套由五大支柱構成的整體策略(見下方)。提升技能,將是商業價值的最終驅動力。" } },
          { type: "h3", text: { en: "A brand-new skills gap", zh: "全新的技能落差" } },
          { type: "p",
            text: { en: "As employee scope expands to include agent management and orchestration, a skills gap opens: the expertise to be an \"agent orchestrator\" or \"Chief of Staff for AI\" simply doesn't exist in the market yet — making continuous, hands-on learning a strategic imperative.",
                    zh: "當員工的職責範圍擴大到「管理與協調代理」,技能落差隨之出現:成為「代理協調者」或「AI 幕僚長」的專業,市場上根本還不存在 —— 這讓持續、動手做的學習成為戰略要務。" } }
        ]
      }
    ]
  },

  /* ===================================================================
     4 · BARS — top use cases (inline SVG chart)
     =================================================================== */
  {
    type: "bars",
    id: "usecases",
    title:    { en: "Where agents are deployed", zh: "代理被部署在哪裡" },
    subtitle: { en: "Top use cases among executives whose organizations are leveraging agentic AI (% of organizations).",
                zh: "已運用 agentic AI 的高管組織中,最常見的用例(組織占比 %)。" },
    series: [
      { label: { en: "Customer service", zh: "客戶服務" },   value: 49 },
      { label: { en: "Marketing",        zh: "行銷" },        value: 46 },
      { label: { en: "Security ops",     zh: "安全營運" },     value: 46 },
      { label: { en: "Tech support",     zh: "技術支援" },     value: 45 },
      { label: { en: "Product innov.",   zh: "產品創新" },     value: 43 }
    ],
    source: { en: "Source: Google Cloud, The ROI of AI, 2025 (n=1,814 executives leveraging agentic AI).",
              zh: "來源:Google Cloud,The ROI of AI,2025(n=1,814 位運用 agentic AI 的高管)。" }
  },

  /* ===================================================================
     5 · QUOTES — voices from Google Cloud, DeepMind, and partners
     =================================================================== */
  {
    type: "quotes",
    id: "voices",
    title:    { en: "What the leaders say", zh: "領導者怎麼說" },
    subtitle: { en: "Voices from Google Cloud, Google DeepMind, and customers.",
                zh: "來自 Google Cloud、Google DeepMind 與客戶的聲音。" },
    quotes: [
      { text: { en: "AI agents are the leap from an 'add-on' approach to an 'AI-first' process. It's a fundamental change in workflow that will require a profound shift in mindset and corporate culture.",
                zh: "AI 代理是從「附加功能」躍進到「AI 優先」流程的跳躍。這是工作流程的根本改變,需要心態與企業文化的深刻轉變。" },
        by: "Oliver Parker", role: { en: "VP, Global GTM for Generative AI, Google Cloud", zh: "副總裁,生成式 AI 全球市場推進,Google Cloud" } },
      { text: { en: "By 2026, agents will manage complex, multi-step workflows across systems. A key responsibility of employees will be to set the strategy and oversee the system of agents responsible for tasks.",
                zh: "到 2026 年,代理將跨系統管理複雜的多步驟工作流程。員工的關鍵職責,將是設定策略並監督負責這些任務的代理系統。" },
        by: "Saurabh Tiwary", role: { en: "VP, General Manager, Cloud AI, Google Cloud", zh: "副總裁暨總經理,Cloud AI,Google Cloud" } },
      { text: { en: "At TELUS, over 57,000 team members regularly use AI and save 40 minutes per AI interaction — a fundamental mindset shift to recognizing it as a 24/7 productivity instrument.",
                zh: "在 TELUS,超過 57,000 名團隊成員固定使用 AI,每次 AI 互動省下 40 分鐘 —— 這是把 AI 視為全天候生產力工具的根本心態轉變。" },
        by: "Jaime Tatis", role: { en: "Chief AI Officer, TELUS", zh: "AI 長,TELUS" } },
      { text: { en: "AI is driving a generational refactoring of the enterprise — the core workflows and the entire technology stack — shifting human roles to focus on high-value, strategic orchestration.",
                zh: "AI 正在驅動企業的世代級重構 —— 核心工作流程與整個技術堆疊 —— 把人類角色轉向高價值的策略性協調。" },
        by: "Francis deSouza", role: { en: "COO and President, Security Products, Google Cloud", zh: "營運長暨資安產品總裁,Google Cloud" } },
      { text: { en: "Agents allow for quicker, more natural interaction by letting customers speak and provide context. This return to verbal communication will be a reality in the next 1–3 years.",
                zh: "代理讓客戶能直接說話、提供情境,帶來更快、更自然的互動。這種回歸口語溝通的趨勢,將在未來 1–3 年成真。" },
        by: "Paul Tepfenhart", role: { en: "Director, Retail & Consumer, Global Strategic Industries, Google Cloud", zh: "總監,零售與消費,全球策略產業,Google Cloud" } },
      { text: { en: "The greatest promise of agentic AI in 2026 is moving healthcare from a reactionary system into a predictive learning health system — delivering proactive insights directly into the clinician's workflow.",
                zh: "agentic AI 在 2026 年最大的承諾,是把醫療從被動反應的系統,推向能預測的學習型健康系統 —— 把主動洞察直接送進臨床醫師的工作流程。" },
        by: "Aashima Gupta", role: { en: "Director, Healthcare, Global Strategic Industries, Google Cloud", zh: "總監,醫療,全球策略產業,Google Cloud" } },
      { text: { en: "Agents detect and respond faster to enterprise risks. More importantly, they elevate our SOC analysts from tactical responders to strategic defenders.",
                zh: "代理能更快偵測並回應企業風險。更重要的是,它們把我們的 SOC 分析師從戰術型應變者,提升為戰略型防禦者。" },
        by: "Jon Ramsey", role: { en: "VP & General Manager, Security, Google Cloud", zh: "副總裁暨總經理,資安,Google Cloud" } },
      { text: { en: "AI is already being used to find zero-days, identify malicious code, and uplift the work of defenders. As threat actors adopt the technology, it will be our best tool to meet this new challenge.",
                zh: "AI 已被用來找出零時差漏洞、辨識惡意程式碼、並提升防禦者的工作。當威脅行為者也採用這項技術,它將是我們迎戰新挑戰的最佳工具。" },
        by: "Sandra Joyce", role: { en: "VP of Threat Intelligence, Google Cloud", zh: "威脅情報副總裁,Google Cloud" } },
      { text: { en: "In 2026, the shift of employee scope to include agent management will create a skills gap. The expertise to be an 'agent orchestrator' or 'Chief of Staff for AI' simply doesn't exist in the market yet.",
                zh: "2026 年,員工職責擴大到管理代理,將造就一道技能落差。成為「代理協調者」或「AI 幕僚長」的專業,市場上根本還不存在。" },
        by: "Shweta Maniar", role: { en: "Director, Life Sciences, Global Strategic Industries, Google Cloud", zh: "總監,生命科學,全球策略產業,Google Cloud" } },
      { text: { en: "Access to agentic AI capabilities will democratize insights, innovation, creativity, and business growth — but comes with tremendous responsibility to ensure secure, ethical, and fair outcomes for all.",
                zh: "取得 agentic AI 能力,將讓洞察、創新、創意與商業成長普及化 —— 但也伴隨巨大責任,必須確保對所有人都安全、合乎倫理且公平的結果。" },
        by: "Anil Jain", role: { en: "Global Managing Director, Global Strategic Industries, Google Cloud", zh: "全球董事總經理,全球策略產業,Google Cloud" } }
    ]
  },

  /* ===================================================================
     6 · CASES — enterprises already shipping agents; click for the story
     =================================================================== */
  {
    type: "cases",
    id: "proof",
    title:    { en: "Proof in production", zh: "生產環境中的實證" },
    subtitle: { en: "How enterprises are already turning agents into measurable outcomes. Tap a card for the full story.",
                zh: "企業已如何把代理轉化為可量化的成果。點一張卡片看完整故事。" },
    items: [
      {
        slug: "case-telus", company: "TELUS", accent: "t1",
        trend: { en: "Employee · Scale", zh: "員工 · 規模" },
        metric: { value: "57,000+", label: { en: "team members using AI, saving 40 min per interaction", zh: "員工使用 AI,每次互動省 40 分鐘" } },
        summary: { en: "A productivity instrument available 24/7 — plus an upskilling program that doubled in impact.",
                   zh: "全天候可用的生產力工具 —— 再加上一個影響力翻倍的技能提升計畫。" },
        tags: ["Telecom", "Gemini", "Google Skills"],
        detail: [
          { type: "p",
            text: { en: "Over 57,000 TELUS team members regularly use AI and save 40 minutes per AI interaction, reflecting a fundamental mindset shift to recognizing AI as a 24/7 productivity instrument.",
                    zh: "超過 57,000 名 TELUS 團隊成員固定使用 AI,每次互動省下 40 分鐘,反映出把 AI 視為全天候生產力工具的根本心態轉變。" } },
          { type: "p",
            text: { en: "On upskilling, 96% of team members reported increased confidence using AI tools and 96% committed to applying them at work — and the Google Skills training program doubled in impact from February to September 2025.",
                    zh: "在技能提升方面,96% 的團隊成員表示使用 AI 工具的信心提升、96% 承諾將其應用於工作 —— 而 Google Skills 訓練計畫的影響力,從 2025 年 2 月到 9 月翻了一倍。" } }
        ]
      },
      {
        slug: "case-suzano", company: "Suzano", accent: "t1",
        trend: { en: "Every employee", zh: "每位員工" },
        metric: { value: "95%", label: { en: "reduction in query time for 50,000 employees", zh: "5 萬名員工的查詢時間縮短" } },
        summary: { en: "An AI agent built with Gemini Pro turns natural-language questions into SQL over SAP Materials data.",
                   zh: "以 Gemini Pro 打造的 AI 代理,把自然語言問題轉成 SQL,查詢 SAP 物料資料。" },
        tags: ["Manufacturing", "Gemini Pro", "BigQuery"],
        detail: [
          { type: "p",
            text: { en: "Suzano, the world's largest pulp manufacturer, worked with Google Cloud and Sauter to build an AI agent with Gemini Pro that translates natural-language questions into SQL to query SAP Materials data on BigQuery — a 95% reduction in the time required for queries among the 50,000 employees using the data.",
                    zh: "全球最大的紙漿製造商 Suzano,與 Google Cloud 及 Sauter 合作,以 Gemini Pro 打造 AI 代理,把自然語言問題轉成 SQL,於 BigQuery 上查詢 SAP 物料資料 —— 讓 5 萬名使用該資料的員工,查詢所需時間縮短了 95%。" } }
        ]
      },
      {
        slug: "case-salesforce", company: "Salesforce", accent: "t2",
        trend: { en: "Every workflow", zh: "每個工作流程" },
        metric: { value: "A2A", label: { en: "cross-platform agents via the open Agent2Agent protocol", zh: "以開放 Agent2Agent 協定跨平台協作的代理" } },
        summary: { en: "Building agents that work across both platforms — an open, interoperable foundation for agentic enterprises.",
                   zh: "打造可跨兩個平台運作的代理 —— 為代理式企業奠定開放、可互通的基礎。" },
        tags: ["SaaS", "A2A protocol", "Interoperability"],
        detail: [
          { type: "p",
            text: { en: "Salesforce is working with Google Cloud to create AI agents that work across both platforms using the newly launched Agent2Agent (A2A) open protocol — a leap forward in building an open, interoperable foundation for agentic enterprises.",
                    zh: "Salesforce 正與 Google Cloud 合作,使用新推出的 Agent2Agent(A2A)開放協定,打造可跨兩個平台運作的 AI 代理 —— 這是為代理式企業建立開放、可互通基礎的一大躍進。" } }
        ]
      },
      {
        slug: "case-elanco", company: "Elanco", accent: "t2",
        trend: { en: "Every workflow", zh: "每個工作流程" },
        metric: { value: "$1.3M", label: { en: "productivity impact avoided per large site", zh: "每個大型廠區避免的生產力損失" } },
        summary: { en: "Gemini models sort and extract insights from 2,500+ unstructured policy documents per site.",
                   zh: "Gemini 模型自動分類、萃取每個廠區 2,500 多份非結構化政策文件的洞察。" },
        tags: ["Animal health", "Gemini", "Document AI"],
        detail: [
          { type: "p",
            text: { en: "Elanco, a global leader in animal health, uses Gemini models within its Elanco.ai platform to automatically sort, extract, compare, and restructure information from over 2,500 unstructured policy and procedure documents per manufacturing site — improving accuracy and consistency, and reducing the risk of outdated or conflicting information that could cost up to $1.3 million in productivity impact at large sites.",
                    zh: "動物保健的全球領導者 Elanco,在其 Elanco.ai 平台中以 Gemini 模型,自動分類、萃取、比較並重組每個製造廠區 2,500 多份非結構化政策與流程文件 —— 提升正確性與一致性,降低資訊過時或衝突的風險;在大型廠區,這類風險可能造成高達 130 萬美元的生產力損失。" } }
        ]
      },
      {
        slug: "case-homedepot", company: "The Home Depot", accent: "t3",
        trend: { en: "Your customers", zh: "你的客戶" },
        metric: { value: "24/7", label: { en: "expert guidance via the Magic Apron AI agent", zh: "由 Magic Apron AI 代理提供的全天候專家指引" } },
        summary: { en: "Magic Apron offers detailed how-to instructions, product recommendations, and review summaries.",
                   zh: "Magic Apron 提供詳細的操作指南、產品推薦與評論摘要。" },
        tags: ["Retail", "Magic Apron", "Concierge"],
        detail: [
          { type: "p",
            text: { en: "Home Depot built Magic Apron, an AI agent that offers expert guidance 24/7 — providing detailed how-to instructions, product recommendations, and review summaries to make home improvement easier.",
                    zh: "Home Depot 打造了 Magic Apron,一個全天候提供專家指引的 AI 代理 —— 提供詳細的操作步驟、產品推薦與評論摘要,讓居家修繕更輕鬆。" } }
        ]
      },
      {
        slug: "case-danfoss", company: "Danfoss", accent: "t3",
        trend: { en: "Your customers", zh: "你的客戶" },
        metric: { value: "42 hrs → real-time", label: { en: "average response time; 80% of transactional decisions automated", zh: "平均回應時間;80% 的交易決策自動化" } },
        summary: { en: "AI agents from Go Autonomous automate email-based order processing and consolidate five systems into one.",
                   zh: "Go Autonomous 的 AI 代理自動化電子郵件訂單處理,並把五套系統整合為一。" },
        tags: ["Manufacturing", "Go Autonomous", "Order ops"],
        detail: [
          { type: "p",
            text: { en: "Danfoss, a global manufacturer operating in over 100 countries, uses AI agents from Go Autonomous on Google Cloud to automate email-based order processing. The solution automated 80% of transactional decisions, reduced average customer response time from 42 hours to near real-time, and consolidated five systems into a single interface.",
                    zh: "在 100 多個國家營運的全球製造商 Danfoss,在 Google Cloud 上使用 Go Autonomous 的 AI 代理,自動化以電子郵件為基礎的訂單處理。此方案自動化了 80% 的交易決策、把平均客戶回應時間從 42 小時縮短到近乎即時,並把五套系統整合進單一介面。" } }
        ]
      },
      {
        slug: "case-specular", company: "Specular", accent: "t4",
        trend: { en: "Security", zh: "資安" },
        metric: { value: "Gemini 2.5 Pro", label: { en: "powering automated attack-surface management & pentesting", zh: "驅動自動化攻擊面管理與滲透測試" } },
        summary: { en: "An offensive security platform that identifies, assesses, and remediates threats automatically.",
                   zh: "一個攻擊型資安平台,自動辨識、評估並修補威脅。" },
        tags: ["Cybersecurity", "Gemini 2.5 Pro", "Pentesting"],
        detail: [
          { type: "p",
            text: { en: "Specular, an offensive cybersecurity platform, builds AI agents using the Gemini 2.5 Pro model to automate attack surface management and penetration testing — automating traditional workflows to identify, assess, and remediate cybersecurity, helping enterprises quickly prioritize and respond to threats.",
                    zh: "攻擊型資安平台 Specular,以 Gemini 2.5 Pro 模型打造 AI 代理,自動化攻擊面管理與滲透測試 —— 把傳統流程自動化,辨識、評估並修補資安問題,協助企業快速排序並回應威脅。" } }
        ]
      },
      {
        slug: "case-torq", company: "Torq", accent: "t4",
        trend: { en: "Security", zh: "資安" },
        metric: { value: "90% · 10×", label: { en: "of tier-1 tasks auto-remediated; 10× faster response", zh: "第一線任務自動修補;回應快 10 倍" } },
        summary: { en: "Socrates, an AI SOC analyst, automates the entire security operations lifecycle.",
                   zh: "Socrates,一個 AI SOC 分析師,自動化整個資安營運生命週期。" },
        tags: ["Cybersecurity", "Socrates", "Agentic SOC"],
        detail: [
          { type: "p",
            text: { en: "Torq uses agentic AI to automate the entire security operations lifecycle through Socrates, an AI SOC analyst that coordinates specialized agents. Running on Google Cloud's infrastructure, teams achieve 90% automation of tier-1 analyst tasks auto-remediated without human involvement, a 95% decrease in manual tasks, and 10x faster response times.",
                    zh: "Torq 透過 Socrates —— 一個協調多個專業代理的 AI SOC 分析師 —— 以代理式 AI 自動化整個資安營運生命週期。在 Google Cloud 基礎設施上運行,團隊達成 90% 的第一線分析任務自動修補(無需人工介入)、手動工作減少 95%,以及快 10 倍的回應時間。" } }
        ]
      }
    ]
  },

  /* ===================================================================
     7 · ACCORDION — the 5 pillars of AI learning
     =================================================================== */
  {
    type: "accordion",
    id: "pillars",
    title:    { en: "The 5 pillars of AI learning", zh: "AI 學習的五大支柱" },
    subtitle: { en: "A holistic strategy to build an AI-ready workforce — the ultimate driver of business value.",
                zh: "打造 AI-ready 人才的整體策略 —— 商業價值的最終驅動力。" },
    qa: [
      { q: { en: "01 · Establish goals", zh: "01 · 確立目標" },
        a: { en: "Figure out what is most important and what you can actually measure. For example, a goal of 100% AI tool adoption — every team member using a Gemini Enterprise agent at some point in their workflow. Make sure the specific goal aligns to the bigger picture and is measurable.",
             zh: "想清楚什麼最重要、什麼是你真的量得到的。例如「100% AI 工具採用率」—— 每位團隊成員都在工作流程中的某個環節使用 Gemini Enterprise 代理。確保具體目標對齊大方向,而且可衡量。" } },
      { q: { en: "02 · Secure sponsorship", zh: "02 · 取得贊助與支持" },
        a: { en: "Assemble three primary stakeholders: an executive sponsor (funding, high-level backing, consistent messaging), a groundswell lead (the \"AI megaphone\" running grassroots campaigns and collecting ideas), and an AI accelerator (the technical expert turning prioritized ideas into functional solutions).",
             zh: "組成三位核心利害關係人:行政贊助者(提供經費、高層支持與一致的訊息)、草根推手(「AI 大聲公」,負責推動草根活動並蒐集點子),以及 AI 加速者(把優先點子變成可用方案的技術專家)。" } },
      { q: { en: "03 · Sustain momentum and reward innovation", zh: "03 · 維持動能、獎勵創新" },
        a: { en: "Run the program as a \"digital hub\" featuring a gamified idea exchange with a leaderboard to continuously collect and reward AI use cases. Maintain momentum with regular, multichannel communication and a quarterly awards program to recognize top innovators.",
             zh: "把計畫經營成一個「數位樞紐」:用排行榜與遊戲化的點子交流,持續蒐集並獎勵 AI 用例。以規律、多通路的溝通維持動能,並設立季度獎項,表揚頂尖創新者。" } },
      { q: { en: "04 · Integrate AI into daily workflows", zh: "04 · 把 AI 融入日常工作流程" },
        a: { en: "Keep the education going with internal hackathons where small teams develop and pitch innovative AI solutions, and challenge-based \"Field Days\" — in-person and virtual — where teams practice using the new custom AI tools in a collaborative setting.",
             zh: "持續推動學習:舉辦內部黑客松,讓小團隊開發並提案創新的 AI 方案;也舉辦挑戰型的「Field Days」(實體與線上皆可),讓團隊在協作情境中實際演練使用新打造的 AI 工具。" } },
      { q: { en: "05 · Prepare for increasing risks with trusted frameworks", zh: "05 · 以可信框架為日益升高的風險做準備" },
        a: { en: "As agent-accelerated cyber risks grow more sophisticated, security becomes everyone's responsibility. Train employees on what data can (and cannot) be used in AI tools, and how to recognize sophisticated threats like AI-driven social engineering.",
             zh: "當代理加速的資安風險愈來愈精密,資安就成了每個人的責任。訓練員工了解哪些資料可以(與不可以)用於 AI 工具,以及如何辨識像 AI 驅動的社交工程這類精密威脅。" } }
    ]
  },

  /* ===================================================================
     8 · CTA — the 2026 opportunity
     =================================================================== */
  {
    type: "cta",
    id: "opportunity",
    eyebrow: { en: "Conclusion", zh: "結語" },
    title:   { en: "The 2026 opportunity: a path to business growth", zh: "2026 的機會:通往業務成長的路徑" },
    text:    { en: "The 2026 opportunity can seem technical, but it is fundamentally human. It's about freeing your teams from the repetitive, low-value work that drains their energy — so they can focus on the creative, strategic, and empathetic work that only they can do.",
               zh: "2026 的機會看似技術性,本質卻是關於「人」。它是把你的團隊從消耗精力、低價值的重複工作中解放出來 —— 讓他們專注於只有人類能做的創意、策略與同理工作。" },
    note:    { en: "\"Access to agentic AI capabilities will democratize insights, innovation, creativity, and business growth.\" — Anil Jain, Global Managing Director, Global Strategic Industries, Google Cloud",
               zh: "「取得 agentic AI 能力,將讓洞察、創新、創意與商業成長普及化。」—— Anil Jain,全球董事總經理,全球策略產業,Google Cloud" },
    link:    { label: { en: "Read the official Google Cloud report", zh: "閱讀 Google Cloud 官方報告" },
               url: "https://cloud.google.com/resources/content/ai-agent-trends-2026" }
  }
];
