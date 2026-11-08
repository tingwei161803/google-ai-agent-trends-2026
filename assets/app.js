/* =========================================================================
   AI agent trends 2026 · composite · app.js  (vanilla, no build, no chart lib)

   A single long page assembled from an ordered list of typed section blocks.
   The whole page is config-driven:

     window.SITE_META     -> { title:{en,zh}, subtitle:{en,zh} }
     window.SITE_SECTIONS -> [ { type, id, ... }, ... ]   (rendered in order)

   ARCHITECTURE
   ------------
   RENDERERS is the SECTION-TYPE REGISTRY: one function per `type` returning the
   inner HTML for that section. Add a type -> add one entry here (+ a nav icon).

   A single render() paints EVERY section + sticky nav + chrome + <title> in the
   page's language, which is read from <html lang> — Chinese at /, English under
   /en/. Hero stat counters animate (count-up) when scrolled into view.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- data ---------- */
  var META = window.SITE_META || { title: {}, subtitle: {} };
  var SECTIONS = Array.isArray(window.SITE_SECTIONS) ? window.SITE_SECTIONS : [];

  /* ---------- i18n strings (UI chrome only) ---------- */
  var I18N = {
    en: {
      footer: "Unofficial, fan-made bilingual summary — for study and sharing. Not affiliated with Google.",
      footerSub: "Source: Google Cloud, “AI agent trends 2026” & “The ROI of AI 2025.” All trademarks belong to their owners.",
      menu: "On this page", close: "Close", skip: "Skip to content",
      sourceTitle: "Open the official Google Cloud report", sourceTxt: "Official report",
      readMore: "Read more", trend: "Trend", source: "Source",
      prev: "Previous quote", next: "Next quote", theme: "Toggle dark mode"
    },
    zh: {
      footer: "非官方、由個人整理的雙語摘要 —— 供學習與分享之用，與 Google 無關。",
      footerSub: "資料來源：Google Cloud《AI agent trends 2026》與《The ROI of AI 2025》。所有商標為其各自所有者所有。",
      menu: "本頁導覽", close: "關閉", skip: "跳到主要內容",
      sourceTitle: "開啟 Google Cloud 官方報告", sourceTxt: "官方報告",
      readMore: "看更多", trend: "趨勢", source: "來源",
      prev: "上一則引言", next: "下一則引言", theme: "切換深色模式"
    }
  };

  /* ---------- safe localStorage (sandbox / file:// may throw) ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  /* ---------- language: decided by the URL, never by stored preference ------
     Each language has its own page and declares itself in <html lang>. A stored
     preference must not override it, or /en/ would repaint itself in Chinese
     for a returning visitor — and a crawler, which has no storage at all, would
     always land on whichever language happened to be the fallback.            */
  var TWIN_DIR = "/en/";                 // the secondary-language directory

  function docLang() {
    var l = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
    return l.indexOf("zh") === 0 ? "zh" : "en";
  }
  /* this page's counterpart in the other language */
  function altHref() {
    var p = location.pathname;
    return p.indexOf(TWIN_DIR) === 0
      ? p.slice(TWIN_DIR.length - 1)
      : TWIN_DIR.slice(0, -1) + p;
  }

  /* ---------- global state ---------- */
  var state = {
    lang:  docLang(),
    /* a saved choice wins; otherwise follow the OS setting */
    theme: lsGet("theme") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  };

  /* ---------- dom refs ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var sectionsEl = $("sections");
  var navInner   = $("sectionNavInner");
  var dialog     = $("dialog");
  var dialogBody = $("dialogBody");

  /* ---------- helpers ---------- */
  function t(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] || obj.en || obj.zh || "";
  }
  function ui(key) { return (I18N[state.lang] || I18N.en)[key]; }
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  function r(n) { return Math.round(n * 100) / 100; }

  /* shared <header class="section-head"> (h2 by default) */
  function sectionHead(sec) {
    var sub = t(sec.subtitle)
      ? '<p class="section-head__sub">' + escapeHtml(t(sec.subtitle)) + "</p>"
      : "";
    return '<header class="section-head">' +
      '<h2 id="' + escapeHtml(sec.id) + '-heading">' + escapeHtml(t(sec.title)) + "</h2>" +
      sub + "</header>";
  }

  /* ordered rich-text blocks shared by prose + detail dialogs (p / h3 / ul / callout) */
  function richBlocks(blocks) {
    return (blocks || []).map(function (b) {
      if (b.type === "h3") return "<h3>" + escapeHtml(t(b.text)) + "</h3>";
      if (b.type === "callout") {
        var cite = t(b.cite)
          ? '<cite class="callout__cite">' + escapeHtml(t(b.cite)) + "</cite>" : "";
        return '<blockquote class="callout"><p>' + escapeHtml(t(b.text)) + "</p>" + cite + "</blockquote>";
      }
      if (b.type === "ul") {
        var arr = (b.items && (b.items[state.lang] || b.items.en || b.items.zh)) || [];
        return "<ul>" + arr.map(function (li) {
          return "<li>" + escapeHtml(li) + "</li>";
        }).join("") + "</ul>";
      }
      return "<p>" + escapeHtml(t(b.text)) + "</p>";
    }).join("");
  }

  function tagRow(tags) {
    if (!tags || !tags.length) return "";
    return '<div class="card__tags">' + tags.map(function (tg) {
      return '<span class="tag">' + escapeHtml(tg) + "</span>";
    }).join("") + "</div>";
  }

  /* inline SVG icons (no icon font) */
  var ICONS = {
    arrow: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    out:   '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus:  '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    prev:  '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next:  '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function fmtInt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  /* trend items (num, short title, slug, accent) from the "cards" section */
  function trendItems() {
    for (var i = 0; i < SECTIONS.length; i++) {
      if (SECTIONS[i].type === "cards") return SECTIONS[i].items || [];
    }
    return [];
  }
  function accentCls(a) { return a ? " is-" + escapeHtml(a) : ""; }

  /* =======================================================================
     SECTION-TYPE REGISTRY
     ===================================================================== */
  var RENDERERS = {

    /* ---- hero: headline, lede, ONE big number + companions, five-shift strip ---- */
    hero: function (sec) {
      var stats = sec.stats || [];
      function counter(s, cls) {
        return '<b class="' + cls + '" data-count="' + escapeHtml(String(s.value)) +
          '" data-suffix="' + escapeHtml(s.suffix || "") + '">' +
          escapeHtml(fmtInt(s.value) + (s.suffix || "")) + "</b>";
      }
      var feature = stats.filter(function (s) { return s.role === "feature"; })[0];
      var shifts  = stats.filter(function (s) { return s.role === "shifts"; })[0];
      var others  = stats.filter(function (s) { return s !== feature && s !== shifts; });

      var eyebrow = t(sec.eyebrow)
        ? '<p class="hero__eyebrow"><span class="spectrum" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>' +
          escapeHtml(t(sec.eyebrow)) + "</p>" : "";
      var head = '<header class="hero__head">' + eyebrow +
        '<h1 id="' + escapeHtml(sec.id) + '-heading" class="hero__title">' +
          escapeHtml(t(sec.title)) + "</h1></header>";

      var lede = t(sec.subtitle) ? '<p class="hero__lede">' + escapeHtml(t(sec.subtitle)) + "</p>" : "";
      var featureHtml = feature
        ? '<div class="hero__feature">' + counter(feature, "hero__num") +
            '<span class="hero__num-label">' + escapeHtml(t(feature.label)) + "</span></div>" : "";
      var companions = others.length
        ? '<dl class="hero__companions">' + others.map(function (s) {
            return '<div class="hero__companion"><dt>' + counter(s, "hero__num-sm") + "</dt>" +
              "<dd>" + escapeHtml(t(s.label)) + "</dd></div>";
          }).join("") + "</dl>" : "";

      var strip = "";
      if (shifts) {
        strip = '<nav class="shifts" aria-label="' + escapeHtml(String(shifts.value) + " " + t(shifts.label)) + '">' +
          '<p class="shifts__label"><b>' + escapeHtml(String(shifts.value)) + "</b>" + escapeHtml(t(shifts.label)) + "</p>" +
          '<ol class="shifts__list">' + trendItems().map(function (it) {
            return '<li class="shift' + accentCls(it.accent) + '"><a href="#' + escapeHtml(it.slug) + '">' +
              '<span class="shift__num">' + escapeHtml(String(it.num)) + "</span>" +
              '<span class="shift__name">' + escapeHtml(t(it.short || it.title)) + "</span></a></li>";
          }).join("") + "</ol></nav>";
      }
      return head +
        '<div class="hero__grid"><div class="hero__copy">' + lede + "</div>" +
          '<div class="hero__figures">' + featureHtml + companions + "</div></div>" +
        strip;
    },

    /* ---- prose: ordered rich-text blocks ---- */
    prose: function (sec) {
      return sectionHead(sec) + '<div class="prose">' + richBlocks(sec.blocks) + "</div>";
    },

    /* ---- cards: the five shifts as a numbered vertical story; click -> dialog ---- */
    cards: function (sec) {
      var rows = (sec.items || []).map(function (item) {
        var stat = item.stat
          ? '<div class="trend__stat"><b>' + escapeHtml(t(item.stat.value)) + "</b>" +
            '<span>' + escapeHtml(t(item.stat.label)) + "</span></div>" : "";
        return '<article class="trend' + accentCls(item.accent) + '" id="' + escapeHtml(item.slug) + '" ' +
            'tabindex="0" role="button" data-slug="' + escapeHtml(item.slug) + '" ' +
            'aria-label="' + escapeHtml(ui("trend") + " " + item.num + ": " + t(item.title)) + '">' +
          (item.num != null ? '<span class="trend__num" aria-hidden="true">' + escapeHtml(String(item.num)) + "</span>" : "") +
          '<div class="trend__body">' +
            '<h3 class="trend__title">' + escapeHtml(t(item.title)) + "</h3>" +
            '<p class="trend__summary">' + escapeHtml(t(item.summary)) + "</p>" +
            tagRow(item.tags) +
          "</div>" +
          '<div class="trend__side">' + stat +
            '<span class="more" aria-hidden="true">' + escapeHtml(ui("readMore")) + ICONS.arrow + "</span>" +
          "</div>" +
        "</article>";
      }).join("");
      return sectionHead(sec) + '<div class="trends">' + rows + "</div>";
    },

    /* ---- cases: metric-first rows; click -> dialog ---- */
    cases: function (sec) {
      var rows = (sec.items || []).map(function (item) {
        return '<article class="case' + accentCls(item.accent) + '" ' +
            'tabindex="0" role="button" data-slug="' + escapeHtml(item.slug) + '" ' +
            'aria-label="' + escapeHtml(item.company) + '">' +
          '<div class="case__who">' +
            '<span class="case__company">' + escapeHtml(item.company) + "</span>" +
            '<span class="case__trend">' + escapeHtml(t(item.trend)) + "</span>" +
          "</div>" +
          '<div class="case__metric"><b>' + escapeHtml(t(item.metric.value)) + "</b>" +
            '<span>' + escapeHtml(t(item.metric.label)) + "</span></div>" +
          '<div class="case__body"><p class="case__summary">' + escapeHtml(t(item.summary)) + "</p>" +
            tagRow(item.tags) + "</div>" +
          '<span class="case__go" aria-hidden="true">' + ICONS.arrow + "</span>" +
        "</article>";
      }).join("");
      return sectionHead(sec) + '<div class="cases">' + rows + "</div>";
    },

    /* ---- bars: horizontal bars on a 0–100% scale (no chart library) ---- */
    bars: function (sec) {
      var rows = (sec.series || []).map(function (d) {
        var v = Math.max(0, Math.min(100, Number(d.value) || 0));
        var trendNo = d.accent ? d.accent.replace(/\D/g, "") : "";
        var tag = trendNo
          ? ' <span class="hbar__trend">' + escapeHtml(ui("trend") + " " + trendNo) + "</span>" : "";
        return '<li class="hbar' + accentCls(d.accent) + '">' +
          '<span class="hbar__label">' + escapeHtml(t(d.label)) + tag + "</span>" +
          '<span class="hbar__track" aria-hidden="true"><span class="hbar__fill" style="width:' + v + '%"></span></span>' +
          '<b class="hbar__val">' + escapeHtml(String(d.value)) + "%</b>" +
        "</li>";
      }).join("");
      var src = t(sec.source)
        ? '<figcaption class="chart-source">' + escapeHtml(t(sec.source)) + "</figcaption>" : "";
      return sectionHead(sec) +
        '<figure class="chart"><ol class="hbars" aria-label="' + escapeHtml(t(sec.title)) + '">' + rows + "</ol>" +
        '<div class="hbars__scale" aria-hidden="true"><span>0</span><span>50%</span><span>100%</span></div>' + src + "</figure>";
    },

    /* ---- accordion: native <details>; a leading "01 ·" becomes its own numeral ---- */
    accordion: function (sec) {
      var items = (sec.qa || []).map(function (row) {
        var q = t(row.q), m = /^(\d+)\s*·\s*(.+)$/.exec(q);
        var label = m
          ? '<span class="acc-num">' + escapeHtml(m[1]) + '</span><span class="acc-txt">' + escapeHtml(m[2]) + "</span>"
          : '<span class="acc-txt">' + escapeHtml(q) + "</span>";
        return '<details class="acc-item">' +
          '<summary class="acc-q">' + label +
            '<span class="acc-icon" aria-hidden="true">' + ICONS.plus + "</span>" +
          "</summary>" +
          '<div class="acc-a">' + escapeHtml(t(row.a)) + "</div>" +
        "</details>";
      }).join("");
      return sectionHead(sec) + '<div class="accordion">' + items + "</div>";
    },

    /* ---- quotes: all quotes in the markup (readable without JS); with JS one is
           featured at a time and the speaker list switches between them ---- */
    quotes: function (sec) {
      var list = sec.quotes || [];
      var figs = list.map(function (q, i) {
        var cap = "";
        if (q.by || q.role) {
          cap = '<figcaption class="quote-by">' +
            (q.by ? '<span class="quote-name">' + escapeHtml(q.by) + "</span>" : "") +
            (t(q.role) ? '<span class="quote-role">' + escapeHtml(t(q.role)) + "</span>" : "") +
          "</figcaption>";
        }
        return '<figure class="quote" id="' + escapeHtml(sec.id) + "-q" + (i + 1) + '">' +
          "<blockquote><p>" + escapeHtml(t(q.text)) + "</p></blockquote>" + cap +
        "</figure>";
      }).join("");
      var names = list.map(function (q, i) {
        return '<li><button type="button" class="voice-name" data-q="' + i + '" aria-pressed="false" ' +
          'aria-controls="' + escapeHtml(sec.id) + "-q" + (i + 1) + '">' + escapeHtml(q.by || String(i + 1)) + "</button></li>";
      }).join("");
      return sectionHead(sec) +
        '<div class="voices">' +
          '<div class="voices__stage" aria-live="polite">' + figs + "</div>" +
          '<div class="voices__nav">' +
            '<button type="button" class="voices__step" data-step="-1" aria-label="' + escapeHtml(ui("prev")) + '">' + ICONS.prev + "</button>" +
            '<span class="voices__count"><b class="voices__cur">1</b> / ' + list.length + "</span>" +
            '<button type="button" class="voices__step" data-step="1" aria-label="' + escapeHtml(ui("next")) + '">' + ICONS.next + "</button>" +
            '<ol class="voices__names">' + names + "</ol>" +
          "</div>" +
        "</div>";
    },

    /* ---- cta: closing call-to-action + note ---- */
    cta: function (sec) {
      var eyebrow = t(sec.eyebrow)
        ? '<p class="cta-eyebrow">' + escapeHtml(t(sec.eyebrow)) + "</p>" : "";
      var link = "";
      if (sec.link && sec.link.url) {
        link = '<a class="cta-btn" href="' + escapeHtml(sec.link.url) + '" ' +
          'target="_blank" rel="noopener">' +
          escapeHtml(t(sec.link.label)) + ICONS.out + "</a>";
      }
      var note = t(sec.note)
        ? '<p class="cta-note">' + escapeHtml(t(sec.note)) + "</p>" : "";
      return '<div class="cta-card">' +
        eyebrow +
        "<h2>" + escapeHtml(t(sec.title)) + "</h2>" +
        (t(sec.text) ? '<p class="cta-text">' + escapeHtml(t(sec.text)) + "</p>" : "") +
        link + note +
      "</div>";
    }
  };

  /* =======================================================================
     RENDER: paint nav + every section in the active language
     ===================================================================== */
  function paintSections() {
    sectionsEl.innerHTML = "";
    SECTIONS.forEach(function (sec) {
      var fn = RENDERERS[sec.type];
      if (!fn) return;                       // unknown type: skip gracefully
      var el = document.createElement("section");
      el.className = "section section--" + sec.type;
      el.id = sec.id;
      if (sec.type !== "cta") el.setAttribute("aria-labelledby", sec.id + "-heading");
      el.innerHTML = fn(sec, state.lang);
      sectionsEl.appendChild(el);
    });
    wireOpeners();
    setupVoices();
  }

  function paintNav() {
    navInner.innerHTML = "";
    SECTIONS.forEach(function (sec) {
      var a = document.createElement("a");
      a.className = "navlink";
      a.href = "#" + sec.id;
      a.dataset.target = sec.id;
      a.textContent = t(sec.nav) || t(sec.title);
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.getElementById(sec.id);
        if (target) target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", "#" + sec.id);
      });
      navInner.appendChild(a);
    });
    updateNavFade();
  }

  /* edge fades on the section nav only where there is more to scroll */
  function updateNavFade() {
    var nav = $("sectionNav");
    if (!nav || !navInner) return;
    var max = navInner.scrollWidth - navInner.clientWidth;
    nav.classList.toggle("fade-l", navInner.scrollLeft > 4);
    nav.classList.toggle("fade-r", max - navInner.scrollLeft > 4);
  }

  function paintChrome() {
    document.documentElement.setAttribute("lang", state.lang === "zh" ? "zh-Hant" : "en");
    var titleStr = t(META.title);
    var subStr = t(META.subtitle);
    document.title = subStr ? titleStr + " · " + subStr : titleStr;
    var brand = $("brandName");
    if (brand) brand.textContent = titleStr;

    /* generic data-i18n chrome (text or attribute) */
    [].forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      var v = (I18N[state.lang] || I18N.en)[el.dataset.i18n];
      if (v == null) return;
      var attr = el.dataset.i18nAttr;
      if (attr) el.setAttribute(attr, v); else el.textContent = v;
    });

    var nav = $("sectionNav");
    if (nav) nav.setAttribute("aria-label", ui("menu"));
    var dc = $("dialogClose");
    if (dc) dc.setAttribute("aria-label", ui("close"));
  }

  /* full-page repaint — used on load AND on every language switch */
  function render() {
    paintChrome();
    paintNav();
    paintSections();
    setupScrollSpy();
    setupRail();
    animateCounters();
  }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* =======================================================================
     HERO COUNT-UP — the one orchestrated motion on the page. The markup
     already holds the final numbers, so no-JS and reduced motion keep them.
     ===================================================================== */
  function animateCounters() {
    if (reducedMotion()) return;
    var els = [].slice.call(document.querySelectorAll(".section--hero [data-count]"));
    if (!els.length || !("IntersectionObserver" in window)) return;

    function run(el) {
      if (el.dataset.done === "1") return;
      el.dataset.done = "1";
      var target = parseFloat(el.dataset.count) || 0;
      var suffix = el.dataset.suffix || "";
      var dur = 1200, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);              // easeOutCubic
        el.textContent = fmtInt(Math.round(target * eased)) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = fmtInt(target) + suffix;
      }
      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* =======================================================================
     SCROLLSPY — highlight the active section's nav link
     ===================================================================== */
  var spyObserver = null;
  function setupScrollSpy() {
    if (spyObserver) { spyObserver.disconnect(); spyObserver = null; }
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    [].forEach.call(navInner.children, function (a) { links[a.dataset.target] = a; });

    spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = links[en.target.id];
        if (!link || !en.isIntersecting) return;
        [].forEach.call(navInner.children, function (p) {
          p.classList.remove("is-active");
          p.removeAttribute("aria-current");
        });
        link.classList.add("is-active");
        link.setAttribute("aria-current", "true");
        /* keep the active link visible without moving the page itself */
        var left = link.offsetLeft - (navInner.clientWidth - link.offsetWidth) / 2;
        navInner.scrollTo({ left: Math.max(0, left), behavior: reducedMotion() ? "auto" : "smooth" });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    SECTIONS.forEach(function (sec) {
      var el = document.getElementById(sec.id);
      if (el) spyObserver.observe(el);
    });
  }

  /* =======================================================================
     FIVE-COLOUR RAIL — a thin bar on the left edge that fills while you
     read through the five shifts (decorative; created only when JS runs)
     ===================================================================== */
  var rail = null;
  function setupRail() {
    var trends = document.querySelector(".section--cards");
    if (!trends) return;
    if (!rail) {
      rail = document.createElement("div");
      rail.className = "rail";
      rail.setAttribute("aria-hidden", "true");
      rail.innerHTML = "<i></i><i></i><i></i><i></i><i></i>";
      document.body.appendChild(rail);
      var tick = false;
      var update = function () {
        tick = false;
        var sec = document.querySelector(".section--cards");
        if (!sec) return;
        var r = sec.getBoundingClientRect(), vh = window.innerHeight;
        var p = (vh * 0.5 - r.top) / Math.max(1, r.height);
        rail.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(4));
        rail.classList.toggle("is-on", r.top < vh * 0.6 && r.bottom > vh * 0.3);
      };
      window.addEventListener("scroll", function () {
        if (!tick) { tick = true; requestAnimationFrame(update); }
      }, { passive: true });
      window.addEventListener("resize", update);
      update();
    }
  }

  /* =======================================================================
     VOICES — one featured quote at a time, switched by the speaker list
     ===================================================================== */
  function setupVoices() {
    [].forEach.call(document.querySelectorAll(".voices"), function (box) {
      var figs = box.querySelectorAll(".quote");
      var names = box.querySelectorAll(".voice-name");
      var cur = box.querySelector(".voices__cur");
      if (!figs.length) return;
      box.classList.add("is-live");
      function show(i) {
        i = (i + figs.length) % figs.length;
        [].forEach.call(figs, function (f, j) { f.classList.toggle("is-active", j === i); });
        [].forEach.call(names, function (b, j) { b.setAttribute("aria-pressed", j === i ? "true" : "false"); });
        if (cur) cur.textContent = String(i + 1);
        box.dataset.cur = String(i);
      }
      [].forEach.call(names, function (b) {
        b.addEventListener("click", function () { show(parseInt(b.dataset.q, 10) || 0); });
      });
      [].forEach.call(box.querySelectorAll(".voices__step"), function (b) {
        b.addEventListener("click", function () {
          show((parseInt(box.dataset.cur, 10) || 0) + parseInt(b.dataset.step, 10));
        });
      });
      show(0);
    });
  }

  /* =======================================================================
     DIALOG — card + case detail with #slug deep links + Esc
     ===================================================================== */
  function findItem(slug) {
    for (var i = 0; i < SECTIONS.length; i++) {
      var sec = SECTIONS[i];
      if ((sec.type !== "cards" && sec.type !== "cases") || !sec.items) continue;
      for (var j = 0; j < sec.items.length; j++) {
        if (sec.items[j].slug === slug) return { item: sec.items[j], kind: sec.type };
      }
    }
    return null;
  }

  function statBox(value, label) {
    return '<div class="dialog__stat"><b>' + escapeHtml(t(value)) + "</b>" +
      '<span>' + escapeHtml(t(label)) + "</span></div>";
  }

  function openDialog(slug) {
    var found = findItem(slug);
    if (!found) return;
    var item = found.item, html;

    if (found.kind === "cases") {
      html =
        '<p class="dialog__kicker">' + escapeHtml(t(item.trend)) + "</p>" +
        '<h2 id="dialogTitle">' + escapeHtml(item.company) + "</h2>" +
        (item.metric ? statBox(item.metric.value, item.metric.label) : "") +
        tagRow(item.tags) +
        '<div class="dialog__detail">' + richBlocks(item.detail) + "</div>";
    } else {
      var kicker = item.num != null
        ? '<p class="dialog__kicker">' + escapeHtml(ui("trend")) + " " + escapeHtml(String(item.num)) + "</p>"
        : "";
      html =
        kicker +
        '<h2 id="dialogTitle">' + escapeHtml(t(item.title)) + "</h2>" +
        tagRow(item.tags) +
        (item.stat ? statBox(item.stat.value, item.stat.label) : "") +
        '<div class="dialog__detail">' + richBlocks(item.detail) + "</div>";
    }

    dialog.className = "dialog" + (item.accent ? " is-" + item.accent : "");
    dialogBody.innerHTML = html;
    dialogBody.scrollTop = 0;
    if (!dialog.open) dialog.showModal();
    if (location.hash.slice(1) !== slug) history.replaceState(null, "", "#" + slug);
  }
  function closeDialog() {
    if (dialog.open) dialog.close();
    if (isSlugHash()) history.replaceState(null, "", location.pathname + location.search);
  }
  function isSlugHash() {
    var h = location.hash.slice(1);
    return !!h && !!findItem(h);
  }

  function wireOpeners() {
    [].forEach.call(document.querySelectorAll("[data-slug]"), function (card) {
      var slug = card.dataset.slug;
      card.addEventListener("click", function () { openDialog(slug); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDialog(slug); }
      });
    });
  }

  /* =======================================================================
     THEME + LANG
     ===================================================================== */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var btn = $("themeToggle");
    if (btn) btn.setAttribute("aria-pressed", state.theme === "dark" ? "true" : "false");
  }
  /* The switch is a link, so it only has to point at the right place. The href
     is recomputed from the current path rather than trusted from the markup —
     the two pages are copies of each other and would otherwise both carry the
     same hardcoded target. */
  function applyLangChrome() {
    var toggle = $("langToggle");
    if (!toggle) return;
    var alt = state.lang === "zh" ? "en" : "zh";
    var name = alt === "zh" ? "中文版" : "English version";
    toggle.setAttribute("href", altHref());
    toggle.setAttribute("hreflang", alt === "zh" ? "zh-Hant" : "en");
    toggle.setAttribute("title", name);
    toggle.setAttribute("aria-label", name);
    var label = $("langLabel");
    if (label) label.textContent = alt === "zh" ? "中" : "EN";
  }

  /* =======================================================================
     WIRING
     ===================================================================== */
  function wire() {
    $("themeToggle").addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      lsSet("theme", state.theme);         // only an explicit choice is remembered
      applyTheme();
    });
    /* no saved choice: keep following the OS setting */
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function (e) {
        if (lsGet("theme")) return;
        state.theme = e.matches ? "dark" : "light";
        applyTheme();
      };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }

    /* no langToggle handler: it is a link now, and following it loads the page
       that is already written in the other language */

    $("dialogClose").addEventListener("click", closeDialog);
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeDialog(); });
    dialog.addEventListener("close", function () {
      if (isSlugHash()) history.replaceState(null, "", location.pathname + location.search);
    });
    // Esc handled natively by <dialog>

    navInner.addEventListener("scroll", updateNavFade, { passive: true });
    window.addEventListener("resize", updateNavFade);
    window.addEventListener("hashchange", syncFromHash);
  }

  /* deep link: open dialog matching #slug on load / hashchange */
  function syncFromHash() {
    var slug = location.hash.slice(1);
    if (slug && findItem(slug)) openDialog(slug);
    else if (!slug && dialog.open) dialog.close();
  }

  /* =======================================================================
     INIT
     ===================================================================== */
  function init() {
    applyTheme();
    applyLangChrome();
    render();
    wire();
    syncFromHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
