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

   A single render() repaints EVERY section + sticky nav + chrome + <title> in
   the active language, so the zh/en toggle never leaves anything stuck. Hero
   stat counters animate (count-up) when scrolled into view.
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
      readMore: "Read more", trend: "Trend", source: "Source"
    },
    zh: {
      footer: "非官方、由個人整理的雙語摘要 —— 供學習與分享之用，與 Google 無關。",
      footerSub: "資料來源：Google Cloud《AI agent trends 2026》與《The ROI of AI 2025》。所有商標為其各自所有者所有。",
      menu: "本頁導覽", close: "關閉", skip: "跳到主要內容",
      sourceTitle: "開啟 Google Cloud 官方報告", sourceTxt: "官方報告",
      readMore: "看更多", trend: "趨勢", source: "來源"
    }
  };

  /* ---------- safe localStorage (sandbox / file:// may throw) ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  /* ---------- global state ---------- */
  var state = {
    lang:  lsGet("lang")  || "en",       // default language: en (source is English)
    theme: lsGet("theme") || "light"
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
        return '<aside class="callout"><span class="material-symbols-rounded callout__icon" aria-hidden="true">smart_toy</span>' +
          '<p>' + escapeHtml(t(b.text)) + "</p>" + cite + "</aside>";
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

  /* =======================================================================
     SECTION-TYPE REGISTRY
     ===================================================================== */
  var RENDERERS = {

    /* ---- hero: eyebrow + headline + animated stat counters ---- */
    hero: function (sec) {
      var eyebrow = t(sec.eyebrow)
        ? '<p class="hero__eyebrow"><span class="hero__dot" aria-hidden="true"></span>' +
          escapeHtml(t(sec.eyebrow)) + "</p>" : "";
      var head = '<header class="section-head hero__head">' + eyebrow +
        '<h1 id="' + escapeHtml(sec.id) + '-heading" class="hero__title">' +
          escapeHtml(t(sec.title)) + "</h1>" +
        (t(sec.subtitle) ? '<p class="hero__lede">' + escapeHtml(t(sec.subtitle)) + "</p>" : "") +
        "</header>";
      var stats = (sec.stats || []).map(function (s) {
        return '<div class="hero__stat" data-item>' +
          '<b class="hero__stat-value" data-count="' + escapeHtml(String(s.value)) +
            '" data-suffix="' + escapeHtml(s.suffix || "") + '">0</b>' +
          '<span class="hero__stat-label">' + escapeHtml(t(s.label)) + "</span>" +
        "</div>";
      }).join("");
      return head + (stats ? '<div class="hero__stats">' + stats + "</div>" : "");
    },

    /* ---- prose: ordered rich-text blocks ---- */
    prose: function (sec) {
      return sectionHead(sec) + '<div class="prose" data-item>' + richBlocks(sec.blocks) + "</div>";
    },

    /* ---- cards: numbered, accented trend cards; click -> detail dialog ---- */
    cards: function (sec) {
      var cards = (sec.items || []).map(function (item) {
        var num = item.num != null
          ? '<span class="card__num">' + escapeHtml(String(item.num)) + "</span>" : "";
        var icon = item.icon
          ? '<span class="material-symbols-rounded card__icon" aria-hidden="true">' +
            escapeHtml(item.icon) + "</span>" : "";
        var stat = item.stat
          ? '<div class="card__stat"><b>' + escapeHtml(t(item.stat.value)) + "</b>" +
            '<span>' + escapeHtml(t(item.stat.label)) + "</span></div>" : "";
        return '<article class="card card--accent ' + (item.accent ? "is-" + escapeHtml(item.accent) : "") +
            '" tabindex="0" role="button" data-item ' +
            'data-slug="' + escapeHtml(item.slug) + '" ' +
            'aria-label="' + escapeHtml(t(item.title)) + '">' +
          '<div class="card__topline">' + num + icon + "</div>" +
          '<h3 class="card__title">' + escapeHtml(t(item.title)) + "</h3>" +
          '<p class="card__summary">' + escapeHtml(t(item.summary)) + "</p>" +
          stat +
          tagRow(item.tags) +
          '<span class="card__more" aria-hidden="true">' + escapeHtml(ui("readMore")) +
            ' <span class="material-symbols-rounded">arrow_forward</span></span>' +
        "</article>";
      }).join("");
      return sectionHead(sec) + '<div class="grid grid--trends">' + cards + "</div>";
    },

    /* ---- cases: metric-forward customer story cards; click -> dialog ---- */
    cases: function (sec) {
      var cards = (sec.items || []).map(function (item) {
        return '<article class="case card--accent ' + (item.accent ? "is-" + escapeHtml(item.accent) : "") +
            '" tabindex="0" role="button" data-item ' +
            'data-slug="' + escapeHtml(item.slug) + '" ' +
            'aria-label="' + escapeHtml(item.company) + '">' +
          '<div class="case__head">' +
            '<span class="case__company">' + escapeHtml(item.company) + "</span>" +
            '<span class="case__trend">' + escapeHtml(t(item.trend)) + "</span>" +
          "</div>" +
          '<div class="case__metric"><b>' + escapeHtml(t(item.metric.value)) + "</b>" +
            '<span>' + escapeHtml(t(item.metric.label)) + "</span></div>" +
          '<p class="case__summary">' + escapeHtml(t(item.summary)) + "</p>" +
          tagRow(item.tags) +
        "</article>";
      }).join("");
      return sectionHead(sec) + '<div class="grid grid--cases">' + cards + "</div>";
    },

    /* ---- bars: inline-SVG bar chart (no chart library) + source ---- */
    bars: function (sec) {
      var series = sec.series || [];
      var W = 560, H = 260, padL = 16, padR = 16, padT = 22, padB = 46;
      var plotW = W - padL - padR, plotH = H - padT - padB;
      var max = Math.max.apply(null, series.map(function (d) { return d.value; }).concat([1]));
      var n = series.length || 1, gap = 18;
      var bw = (plotW - gap * (n - 1)) / n;
      var baseY = padT + plotH;
      var title = escapeHtml(t(sec.title));

      var bars = series.map(function (d, i) {
        var x = padL + i * (bw + gap);
        var h = (d.value / max) * plotH;
        var y = baseY - h;
        var label = escapeHtml(t(d.label));
        var val = escapeHtml(String(d.value));
        return (
          '<rect class="bar-rect" x="' + r(x) + '" y="' + r(y) + '" width="' + r(bw) +
            '" height="' + r(h) + '" rx="6"><title>' + label + ": " + val + "%</title></rect>" +
          '<text class="bar-value" x="' + r(x + bw / 2) + '" y="' + r(y - 8) +
            '" text-anchor="middle">' + val + "%</text>" +
          '<text class="bar-label" x="' + r(x + bw / 2) + '" y="' + r(baseY + 22) +
            '" text-anchor="middle">' + label + "</text>"
        );
      }).join("");

      var svg =
        '<svg viewBox="0 0 ' + W + " " + H + '" role="img" ' +
          'preserveAspectRatio="xMidYMid meet" aria-label="' + title + '">' +
          "<title>" + title + "</title>" +
          '<line class="axis-line" x1="' + padL + '" y1="' + r(baseY) +
            '" x2="' + r(W - padR) + '" y2="' + r(baseY) + '" />' +
          bars +
        "</svg>";
      var src = t(sec.source)
        ? '<figcaption class="chart-source">' + escapeHtml(t(sec.source)) + "</figcaption>" : "";
      return sectionHead(sec) +
        '<figure class="chart-card" data-item><div class="chart-wrap">' + svg + "</div>" + src + "</figure>";
    },

    /* ---- accordion: native <details> Q&A ---- */
    accordion: function (sec) {
      var items = (sec.qa || []).map(function (row) {
        return '<details class="acc-item" data-item>' +
          '<summary class="acc-q">' +
            "<span>" + escapeHtml(t(row.q)) + "</span>" +
            '<span class="material-symbols-rounded acc-chevron" aria-hidden="true">expand_more</span>' +
          "</summary>" +
          '<div class="acc-a">' + escapeHtml(t(row.a)) + "</div>" +
        "</details>";
      }).join("");
      return sectionHead(sec) + '<div class="accordion">' + items + "</div>";
    },

    /* ---- quotes: pull-quote cards with name + role ---- */
    quotes: function (sec) {
      var items = (sec.quotes || []).map(function (q) {
        var cap = "";
        if (q.by || q.role) {
          cap = '<figcaption class="quote-by">' +
            (q.by ? '<span class="quote-name">' + escapeHtml(q.by) + "</span>" : "") +
            (t(q.role) ? '<span class="quote-role">' + escapeHtml(t(q.role)) + "</span>" : "") +
          "</figcaption>";
        }
        return '<figure class="quote-card" data-item>' +
          '<span class="material-symbols-rounded quote-mark" aria-hidden="true">format_quote</span>' +
          "<blockquote>" + escapeHtml(t(q.text)) + "</blockquote>" +
          cap +
        "</figure>";
      }).join("");
      return sectionHead(sec) + '<div class="quotes-grid">' + items + "</div>";
    },

    /* ---- cta: closing call-to-action + note ---- */
    cta: function (sec) {
      var eyebrow = t(sec.eyebrow)
        ? '<p class="cta-eyebrow">' + escapeHtml(t(sec.eyebrow)) + "</p>" : "";
      var link = "";
      if (sec.link && sec.link.url) {
        link = '<a class="cta-btn" href="' + escapeHtml(sec.link.url) + '" ' +
          'target="_blank" rel="noopener">' +
          escapeHtml(t(sec.link.label)) +
          '<span class="material-symbols-rounded" aria-hidden="true">arrow_outward</span></a>';
      }
      var note = t(sec.note)
        ? '<p class="cta-note">' + escapeHtml(t(sec.note)) + "</p>" : "";
      return '<div class="cta-card" data-item>' +
        eyebrow +
        "<h2>" + escapeHtml(t(sec.title)) + "</h2>" +
        (t(sec.text) ? "<p>" + escapeHtml(t(sec.text)) + "</p>" : "") +
        link + note +
      "</div>";
    }
  };

  /* icon shown in the section nav pill, keyed by type */
  var NAV_ICONS = {
    hero: "rocket_launch", prose: "auto_awesome", cards: "trending_up",
    cases: "workspace_premium", bars: "bar_chart", quotes: "format_quote",
    accordion: "school", cta: "flag"
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
  }

  function paintNav() {
    navInner.innerHTML = "";
    SECTIONS.forEach(function (sec) {
      var a = document.createElement("a");
      a.className = "navpill";
      a.href = "#" + sec.id;
      a.dataset.target = sec.id;
      a.innerHTML =
        '<span class="material-symbols-rounded" aria-hidden="true">' +
          (NAV_ICONS[sec.type] || "label") + "</span>" +
        "<span>" + escapeHtml(t(sec.title)) + "</span>";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.getElementById(sec.id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#" + sec.id);
      });
      navInner.appendChild(a);
    });
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
    animateCounters();
  }

  /* =======================================================================
     HERO COUNT-UP — animate when each counter scrolls into view
     ===================================================================== */
  function fmtInt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function animateCounters() {
    var els = [].slice.call(document.querySelectorAll(".hero__stat-value[data-count]"));
    if (!els.length) return;

    function run(el) {
      if (el.dataset.done === "1") return;
      el.dataset.done = "1";
      var target = parseFloat(el.dataset.count) || 0;
      var suffix = el.dataset.suffix || "";
      var dur = 1100, start = null;
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

    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* =======================================================================
     SCROLLSPY — highlight the active section's nav pill
     ===================================================================== */
  var spyObserver = null;
  function setupScrollSpy() {
    if (spyObserver) { spyObserver.disconnect(); spyObserver = null; }
    if (!("IntersectionObserver" in window)) return;
    var pills = {};
    [].forEach.call(navInner.children, function (a) { pills[a.dataset.target] = a; });

    spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var pill = pills[en.target.id];
        if (!pill) return;
        if (en.isIntersecting) {
          [].forEach.call(navInner.children, function (p) {
            p.classList.remove("navpill--active");
            p.removeAttribute("aria-current");
          });
          pill.classList.add("navpill--active");
          pill.setAttribute("aria-current", "true");
          if (pill.scrollIntoView) {
            pill.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
          }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    SECTIONS.forEach(function (sec) {
      var el = document.getElementById(sec.id);
      if (el) spyObserver.observe(el);
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
    var icon = $("themeIcon");
    if (icon) icon.textContent = state.theme === "dark" ? "light_mode" : "dark_mode";
    lsSet("theme", state.theme);
  }
  function applyLangChrome() {
    var label = $("langLabel");
    if (label) label.textContent = state.lang === "en" ? "EN" : "中";
    lsSet("lang", state.lang);
  }

  /* =======================================================================
     WIRING
     ===================================================================== */
  function wire() {
    $("themeToggle").addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
    });

    $("langToggle").addEventListener("click", function () {
      state.lang = state.lang === "en" ? "zh" : "en";
      applyLangChrome();
      var openSlug = isSlugHash() ? location.hash.slice(1) : null;
      render();                       // repaint EVERYTHING in the new language
      if (dialog.open && openSlug) openDialog(openSlug);  // repaint open dialog too
    });

    $("dialogClose").addEventListener("click", closeDialog);
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeDialog(); });
    dialog.addEventListener("close", function () {
      if (isSlugHash()) history.replaceState(null, "", location.pathname + location.search);
    });
    // Esc handled natively by <dialog>

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
