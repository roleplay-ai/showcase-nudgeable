/* ==========================================================================
   Nudgeable AI Academy — "Watch videos" tab for assistant feature pages
   Mirrors the third page the Claude guide already has.

   Include once per feature page, before </body>:
     <script src="../assets/video-tab.js"></script>

   It works out which product it is on, reuses that page's own tab classes so
   the button looks native, and adds a video panel with three empty slots.
   Pages that had no tabs get a two-tab bar. Nothing per-page to maintain.

   TO ADD A REAL VIDEO: open the feature page, find the .nv-card you want and
   replace <div class="nv-stage">…</div> with your 16:9 embed, then change the
   <h3> to the video title.
   ========================================================================== */
(function () {

  var PRODUCTS = {
    '/chatgpt/': { name:'ChatGPT', accent:'#10A37F',
      bar:'page-switch',  btn:'page-btn',  btnAttr:'data-page',
      panel:'topic-page', panelAttr:'data-topic-page' },
    '/gemini/': { name:'Gemini', accent:'#0B57D0',
      bar:'level-tabs',   btn:'level-tab', btnAttr:'data-target',
      panel:'level-panel',panelAttr:'data-level' },
    '/copilot/': { name:'Microsoft Copilot', accent:'#5B5FC7',
      bar:'level-switch', btn:'level-btn', btnAttr:'data-level',
      panel:'topic-page', panelAttr:'data-page' }
  };

  var CSS = [
    '.nv-panel{--nv:var(--nv-accent,#DF6426)}',
    '.nv-panel .nv-head{margin-bottom:26px}',
    '.nv-eyebrow{font-size:11.5px;font-weight:850;letter-spacing:.15em;text-transform:uppercase;',
      'color:var(--nv);margin-bottom:10px}',
    '.nv-panel h1{margin:0 0 12px}',
    '.nv-lead{font-size:18px;line-height:1.6;color:#4C5561;margin:0;max-width:620px}',

    '.nv-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}',
    '.nv-card{border:1px dashed rgba(34,29,35,.26);border-radius:16px;overflow:hidden;background:#fff}',
    '.nv-stage{aspect-ratio:16/9;display:grid;place-items:center;position:relative;',
      'background:linear-gradient(160deg,color-mix(in srgb,var(--nv) 13%,#fff),#fff)}',
    '.nv-stage iframe,.nv-stage video{width:100%;height:100%;border:0;display:block}',
    '.nv-play{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;',
      'background:var(--nv);color:#fff;font-size:17px;padding-left:3px;',
      'box-shadow:0 6px 18px color-mix(in srgb,var(--nv) 34%,transparent)}',
    '.nv-slot{position:absolute;bottom:12px;left:0;right:0;text-align:center;',
      'font-size:11.5px;font-weight:750;letter-spacing:.06em;text-transform:uppercase;',
      'color:color-mix(in srgb,var(--nv) 72%,#555)}',
    '.nv-body{border-top:1px dashed rgba(34,29,35,.22);padding:15px 17px 17px;background:#fff}',
    '.nv-body h3{margin:0 0 5px;font-size:17px;font-weight:750;line-height:1.3}',
    '.nv-body p{margin:0;font-size:13.5px;line-height:1.5;color:#6B6B6B}',

    '.nv-note{margin-top:20px;padding:14px 17px;border-radius:12px;font-size:13.5px;',
      'background:color-mix(in srgb,var(--nv) 8%,#fff);',
      'border:1px solid color-mix(in srgb,var(--nv) 22%,transparent);color:#4C5561}',
    '.nv-note b{color:var(--nv)}',
    '@media (max-width:980px){.nv-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    '@media (max-width:620px){.nv-grid{grid-template-columns:1fr}}'
  ].join('');

  function featureName(cfg) {
    var a = document.querySelector('.nav-item.active span:last-child, .side-link.active');
    if (a && a.textContent.trim()) return a.textContent.trim();
    var e = document.querySelector('.hero .eyebrow, .eyebrow');
    if (e) return e.textContent.split('·')[0].trim();
    return (document.title || cfg.name).split('·')[0].trim();
  }

  function build() {
    var key = null;
    for (var k in PRODUCTS) if (location.pathname.indexOf(k) !== -1) key = k;
    if (!key) return;

    var cfg     = PRODUCTS[key];
    var content = document.querySelector('main .content') || document.querySelector('main');
    if (!content || content.querySelector('.nv-panel')) return;

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var feature = featureName(cfg);
    var panels  = [].slice.call(content.querySelectorAll('.' + cfg.panel));
    var bar     = content.querySelector('.' + cfg.bar);
    /* only useful as an anchor when it is a direct child of .content;
       on some pages it lives inside a panel instead */
    var pageNav = content.querySelector('.page-nav');
    if (pageNav && pageNav.parentElement !== content) pageNav = null;

    /* A page with no tabs: wrap what is there so it becomes the first tab. */
    if (!panels.length) {
      var wrap = document.createElement('div');
      wrap.className = cfg.panel;
      wrap.setAttribute(cfg.panelAttr, 'main');
      while (content.firstChild) {
        if (pageNav && content.firstChild === pageNav) break;
        wrap.appendChild(content.firstChild);
      }
      content.insertBefore(wrap, content.firstChild);
      panels = [wrap];
    }

    if (!bar) {
      bar = document.createElement('div');
      bar.className = cfg.bar;
      bar.setAttribute('role', 'tablist');
      var first = document.createElement('button');
      first.type = 'button';
      first.className = cfg.btn + ' active';
      first.setAttribute(cfg.btnAttr, panels[0].getAttribute(cfg.panelAttr) || 'main');
      first.textContent = 'Understand';
      bar.appendChild(first);
      content.insertBefore(bar, content.firstChild);
    }

    /* the tab bar always leads the page, never sits under the headline */
    if (bar.parentElement !== content || content.firstChild !== bar) {
      content.insertBefore(bar, content.firstChild);
    }

    /* the tab */
    var vBtn = document.createElement('button');
    vBtn.type = 'button';
    vBtn.className = cfg.btn;
    vBtn.setAttribute(cfg.btnAttr, 'video');
    vBtn.setAttribute('role', 'tab');
    vBtn.textContent = 'Watch';
    bar.appendChild(vBtn);

    /* the panel */
    var panel = document.createElement('section');
    panel.className = cfg.panel + ' nv-panel';
    panel.setAttribute(cfg.panelAttr, 'video');
    panel.style.setProperty('--nv-accent', cfg.accent);
    panel.hidden = true;

    var slots = ['1', '2', '3'].map(function (n) {
      return '<div class="nv-card">' +
               '<div class="nv-stage"><span class="nv-play">&#9654;</span>' +
                 '<span class="nv-slot">Video ' + n + '</span></div>' +
               '<div class="nv-body"><h3>Video title ' + n + '</h3>' +
                 '<p>One line on the workflow it shows.</p></div>' +
             '</div>';
    }).join('');

    panel.innerHTML =
      '<div class="nv-head">' +
        '<div class="nv-eyebrow">Watch</div>' +
        '<h1>' + feature + ' workflows in action</h1>' +
        '<p class="nv-lead">Short recordings of real work, start to finish.</p>' +
      '</div>' +
      '<div class="nv-grid">' + slots + '</div>' +
      '<p class="nv-note"><b>Adding a video:</b> replace a slot with a 16:9 embed and change the title above it.</p>';

    if (pageNav) content.insertBefore(panel, pageNav);
    else content.appendChild(panel);

    /* one handler for the whole bar; harmless alongside the page's own */
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.' + cfg.btn);
      if (!b) return;
      var want = b.getAttribute(cfg.btnAttr);
      [].forEach.call(bar.querySelectorAll('.' + cfg.btn), function (x) {
        var on = x === b;
        x.classList.toggle('active', on);
        x.setAttribute('aria-selected', String(on));
      });
      [].forEach.call(content.querySelectorAll('.' + cfg.panel), function (p) {
        p.hidden = p.getAttribute(cfg.panelAttr) !== want;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else { build(); }
})();
