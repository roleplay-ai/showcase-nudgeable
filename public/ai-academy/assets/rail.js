/* ==========================================================================
   Nudgeable AI Academy — persistent left panel
   Collapsed to 64px, expands to 250px on hover, and can be pinned open.
   Include once per page, adjusting the path for folder depth:
     <script src="assets/rail.js"></script>       (root)
     <script src="../assets/rail.js"></script>    (one level down)
   Edit the ITEMS array below and every page updates.
   ========================================================================== */
(function () {
  var tag  = document.currentScript || document.querySelector('script[src$="rail.js"]');
  var base = tag ? tag.src.replace(/assets\/rail\.js.*$/, '') : '';

  var GROUPS = [
    {
      label: 'Assistants',
      items: [
        { id:'chatgpt', name:'ChatGPT',   note:'Updated 25 Aug 2026',
          href:'chatgpt/index.html',     match:'/chatgpt/',     tint:'#3DD9A4', img:'logos/chatgpt.png' },
        { id:'claude',  name:'Claude',    note:'Updated 25 Aug 2026',
          href:'claude/index.html',      match:'/claude/',      tint:'#F58A55', img:'logos/claude.png' },
        { id:'gemini',  name:'Gemini',    note:'Updated 25 Aug 2026',
          href:'gemini/index.html',      match:'/gemini/',      tint:'#7FB0FF', img:'logos/gemini.svg' },
        { id:'copilot', name:'Copilot',   note:'Updated 25 Aug 2026',
          href:'copilot/index.html',     match:'/copilot/',     tint:'#A9ACF0', img:'logos/copilot.png' }
      ]
    },
    {
      label: 'Learn',
      items: [
        { id:'foundations', name:'AI Foundations', note:'How AI actually works',
          href:'foundations/index.html', match:'/foundations/', tint:'#FFCE00',
          svg:'<path d="M4 5.5A2 2 0 0 1 6 3.5h5.4v16H6a2 2 0 0 0-2 2z"/><path d="M20 5.5a2 2 0 0 0-2-2h-5.4v16H18a2 2 0 0 1 2 2z"/>' },
        { id:'tips', name:'AI Best Practices', note:'Get more out of any assistant',
          href:'tips/index.html', match:'/tips/', tint:'#FF8A94',
          svg:'<path d="M9.4 17.6h5.2M10.2 20.6h3.6"/><path d="M12 3.4a6 6 0 0 1 3.6 10.8c-.5.4-.8 1-.8 1.6H9.2c0-.7-.3-1.2-.8-1.6A6 6 0 0 1 12 3.4z"/>' },
        { id:'news', name:"What's New", note:'Updates worth knowing',
          href:'news/index.html', match:'/news/', tint:'#8FC7FF',
          svg:'<path d="M3.5 9.2h4l7-3.9v13.4l-7-3.9h-4z"/><path d="M18 9.2a4 4 0 0 1 0 5.6"/><path d="M7.5 14.8v4.4h2.6"/>' },
        { id:'tools', name:'AI Tools', note:'Beyond the four assistants',
          href:'tools/index.html', match:'/tools/', tint:'#9B85F5',
          svg:'<circle cx="5.5" cy="6.5" r="2.6"/><circle cx="18.5" cy="6.5" r="2.6"/><circle cx="12" cy="18" r="2.6"/><path d="M7.7 8.2l2.9 7.4M16.3 8.2l-2.9 7.4M8.1 6.5h7.8"/>' }
      ]
    }
  ];

  var CSS = [
    ':root{--nlab-w:64px;--nlab-open:250px}',

    '.nlab{position:fixed;left:0;top:0;bottom:0;width:var(--nlab-w);z-index:900;',
      'background:#221D23;color:#B7B0B7;display:flex;flex-direction:column;',
      'padding:10px 11px 14px;overflow:hidden;',
      'transition:width .19s cubic-bezier(.4,0,.2,1);',
      'font-family:Roboto,ui-sans-serif,system-ui,-apple-system,sans-serif}',
    '.nlab:hover,.nlab.nlab-pinned{width:var(--nlab-open);overflow-y:auto;box-shadow:14px 0 34px rgba(0,0,0,.22)}',
    '.nlab::-webkit-scrollbar{width:0}',

    /* brand */
    '.nlab-brand{display:flex;align-items:center;gap:11px;padding:6px 5px 4px;margin-bottom:6px;',
      'text-decoration:none;color:#fff;flex:0 0 auto}',
    '.nlab-brand i{width:30px;height:30px;flex:0 0 auto;display:grid;place-items:center;color:#FFCE00}',
    '.nlab-brand i svg{width:21px;height:21px}',
    '.nlab-brand u{font-style:normal;text-decoration:none;white-space:nowrap;opacity:0;',
      'transition:opacity .14s ease;font-size:14.5px;font-weight:850;letter-spacing:-.02em;line-height:1.15}',
    '.nlab-brand u small{display:block;font-size:11px;font-weight:600;color:#8E8791;letter-spacing:0}',

    /* group label */
    '.nlab-label{margin:14px 0 5px 8px;font-size:10px;font-weight:850;letter-spacing:.14em;',
      'text-transform:uppercase;color:#6E6672;white-space:nowrap;opacity:0;transition:opacity .14s ease;height:14px}',
    '.nlab-rule{height:1px;background:rgba(255,255,255,.12);margin:11px 6px;flex:0 0 auto;transition:opacity .14s}',

    /* items */
    '.nlab-item{display:flex;align-items:center;gap:11px;padding:7px 5px;border-radius:11px;',
      'text-decoration:none;color:inherit;margin:1px 0;position:relative;flex:0 0 auto;',
      'transition:background .14s ease}',
    '.nlab-item i{width:32px;height:32px;flex:0 0 auto;display:grid;place-items:center;',
      'border-radius:10px;background:rgba(255,255,255,.09);overflow:hidden}',
    '.nlab-item i img{width:21px;height:21px;object-fit:contain;display:block}',
    '.nlab-item i svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.8;',
      'stroke-linecap:round;stroke-linejoin:round}',
    '.nlab-item u{font-style:normal;text-decoration:none;min-width:0;opacity:0;',
      'transition:opacity .14s ease;white-space:nowrap}',
    '.nlab-item u b{display:block;font-size:13.5px;font-weight:700;color:#EDE9EE;line-height:1.25}',
    '.nlab-item u small{display:block;font-size:11px;color:#8E8791;line-height:1.3;margin-top:1px}',
    '.nlab-item:hover{background:rgba(255,255,255,.09)}',
    '.nlab-item.is-active{background:rgba(255,255,255,.13)}',
    '.nlab-item.is-active::before{content:"";position:absolute;left:-11px;top:8px;bottom:8px;width:3px;',
      'border-radius:0 3px 3px 0;background:var(--t,#FFCE00)}',
    '.nlab-item.is-active u b{color:var(--t,#FFCE00)}',
    '.nlab-item.is-soon{cursor:default;opacity:.62}',
    '.nlab-item.is-soon:hover{background:transparent}',

    /* reveal on open */
    '.nlab:hover .nlab-brand u,.nlab.nlab-pinned .nlab-brand u,',
    '.nlab:hover .nlab-label,.nlab.nlab-pinned .nlab-label,',
    '.nlab:hover .nlab-item u,.nlab.nlab-pinned .nlab-item u{opacity:1}',

    /* tooltip when collapsed */
    '.nlab:not(:hover):not(.nlab-pinned) .nlab-item::after{content:attr(data-tip);position:absolute;',
      'left:52px;top:50%;transform:translateY(-50%);background:#221D23;color:#fff;',
      'font:600 12.5px/1 Roboto,system-ui,sans-serif;padding:7px 10px;border-radius:8px;',
      'white-space:nowrap;opacity:0;pointer-events:none;box-shadow:0 4px 14px rgba(0,0,0,.3)}',
    '.nlab:not(:hover):not(.nlab-pinned) .nlab-item:hover::after{opacity:1}',

    /* pin */
    '.nlab-pin{margin-top:auto;display:flex;align-items:center;gap:11px;padding:7px 5px;',
      'border:0;background:transparent;color:#7E7782;border-radius:11px;cursor:pointer;',
      'font:700 12.5px/1.2 Roboto,system-ui,sans-serif;text-align:left;flex:0 0 auto}',
    '.nlab-pin:hover{background:rgba(255,255,255,.08);color:#fff}',
    '.nlab-pin i{width:32px;height:32px;flex:0 0 auto;display:grid;place-items:center}',
    '.nlab-pin i svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}',
    '.nlab-pin u{font-style:normal;text-decoration:none;white-space:nowrap;opacity:0;transition:opacity .14s ease}',
    '.nlab:hover .nlab-pin u,.nlab.nlab-pinned .nlab-pin u{opacity:1}',

    /* page offset */
    'body{padding-left:64px !important;transition:padding-left .19s cubic-bezier(.4,0,.2,1)}',
    'body.nlab-push{padding-left:250px !important}',

    '@media (max-width:820px){',
      '.nlab{top:auto;right:0;bottom:0;width:100% !important;height:58px;flex-direction:row;',
        'align-items:center;gap:2px;padding:0 8px;overflow-x:auto;box-shadow:0 -2px 18px rgba(0,0,0,.2)}',
      '.nlab-brand,.nlab-label,.nlab-rule,.nlab-pin{display:none}',
      '.nlab-item u{display:none}',
      '.nlab-item{flex:1 0 auto;justify-content:center;padding:6px}',
      '.nlab-item.is-active::before{left:10px;right:10px;top:auto;bottom:-1px;width:auto;height:3px;border-radius:3px 3px 0 0}',
      'body,body.nlab-push{padding-left:0 !important;padding-bottom:58px !important}',
    '}'
  ].join('');

  var STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5l2.6 6.4L21 10.5l-6.4 2.6L12 19.5l-2.6-6.4L3 10.5l6.4-2.6z"/></svg>';
  var PIN  = '<svg viewBox="0 0 24 24"><path d="M8.5 4.5h7l-1 5 3 3.2v2H6.5v-2l3-3.2z"/><path d="M12 14.7V20"/></svg>';


  /* ---- steady sidebar across page loads -------------------------------- */
  function keepAside() {
    var aside = document.querySelector('.layout > aside, main + aside, aside');
    if (!aside) return;
    var key = 'nlab-aside:' + location.pathname.replace(/[^/]*$/, '');
    try {
      var saved = sessionStorage.getItem(key);
      if (saved) aside.scrollTop = parseInt(saved, 10) || 0;
    } catch (e) {}
    var save = function () {
      try { sessionStorage.setItem(key, String(aside.scrollTop)); } catch (e) {}
    };
    aside.addEventListener('scroll', save, { passive: true });
    window.addEventListener('pagehide', save);
    document.addEventListener('click', function (e) {
      if (e.target.closest('aside a')) save();
    }, true);
  }

  function build() {
    if (document.querySelector('.nlab')) return;

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var path = location.pathname;
    var nav  = document.createElement('nav');
    nav.className = 'nlab';
    nav.setAttribute('aria-label', 'Nudgeable AI Academy sections');

    var html = '<a class="nlab-brand" href="' + base + 'index.html">' +
                 '<i>' + STAR + '</i>' +
                 '<u>Nudgeable<small>AI Academy</small></u>' +
               '</a><div class="nlab-rule"></div>';

    GROUPS.forEach(function (g, gi) {
      if (gi) html += '<div class="nlab-rule"></div>';
      html += '<div class="nlab-label">' + g.label + '</div>';
      g.items.forEach(function (it) {
        var active = it.match && path.indexOf(it.match) !== -1;
        var glyph  = it.img
          ? '<img src="' + base + 'assets/' + it.img + '" alt="" loading="lazy">'
          : '<svg viewBox="0 0 24 24">' + it.svg + '</svg>';
        var tagName = it.href ? 'a' : 'span';
        html += '<' + tagName + ' class="nlab-item' + (active ? ' is-active' : '') +
                  (it.href ? '' : ' is-soon') + '"' +
                (it.href ? ' href="' + base + it.href + '"' : '') +
                ' data-tip="' + it.name + (it.href ? '' : ' — coming soon') + '"' +
                ' style="--t:' + it.tint + ';color:' + it.tint + '">' +
                  '<i>' + glyph + '</i>' +
                  '<u><b>' + it.name + '</b><small>' + it.note + '</small></u>' +
                '</' + tagName + '>';
      });
    });

    html += '<button class="nlab-pin" type="button"><i>' + PIN + '</i><u>Keep panel open</u></button>';
    nav.innerHTML = html;
    document.body.insertBefore(nav, document.body.firstChild);

    var pin = nav.querySelector('.nlab-pin');
    function apply(on) {
      nav.classList.toggle('nlab-pinned', on);
      document.body.classList.toggle('nlab-push', on);
      pin.querySelector('u').textContent = on ? 'Collapse panel' : 'Keep panel open';
    }
    var saved = false;
    try { saved = localStorage.getItem('nlab-pinned') === '1'; } catch (e) {}
    if (saved) apply(true);
    pin.addEventListener('click', function () {
      var on = !nav.classList.contains('nlab-pinned');
      apply(on);
      try { localStorage.setItem('nlab-pinned', on ? '1' : '0'); } catch (e) {}
    });
  }


  /* ---- shared footer -------------------------------------------------- */
  var LINKS = {
    website  : '/',
    linkedin : 'https://www.linkedin.com/in/gauravpatel25',
    youtube  : 'https://www.youtube.com/@Gaurav-NudgeableAI',
    instagram: 'https://www.instagram.com/gaurav.patel_gp',
    x        : 'https://x.com/gauravxlri',
    email    : 'egauravpatel@gmail.com'
  };

  var ICONS = {
    website : '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"/><path d="M3.6 9h16.8M3.6 15h16.8"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>',
    email   : '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.7 7.2 12 13l8.3-5.8"/>',
    linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5v6M8 7.4v.1"/><path d="M12 16.5v-6M12 13c0-1.4 1-2.5 2.4-2.5S16.8 11.6 16.8 13v3.5"/>',
    youtube : '<rect x="2.8" y="5.6" width="18.4" height="12.8" rx="4.2"/><path d="M10.4 9.6 15 12l-4.6 2.4z"/>',
    instagram:'<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5"/><circle cx="12" cy="12" r="3.9"/><path d="M17.1 6.9v.1"/>',
    x        :'<path d="M4 4l7.1 8.9L4.4 20"/><path d="M20 20l-7.1-8.9L19.6 4"/>'
  };
  var LABELS = { website:'nudgeable.ai', linkedin:'LinkedIn', youtube:'YouTube',
               instagram:'Instagram', x:'X', email:'Email' };

  var FOOT_CSS = [
    '.nlab-foot{border-top:1px solid rgba(34,29,35,.12);margin-top:0;padding:26px 34px 30px;',
      'display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;',
      'font-family:Roboto,ui-sans-serif,system-ui,sans-serif;background:transparent}',
    '.nlab-foot .nf-name{font-size:14px;font-weight:750;color:#221D23}',
    '.nlab-foot .nf-name small{display:block;font-weight:500;color:#6B6B6B;font-size:12.5px;margin-top:2px}',
    '.nlab-foot .nf-links{display:flex;align-items:center;gap:8px;flex-wrap:wrap}',
    '.nlab-foot .nf-links a{display:inline-flex;align-items:center;gap:7px;padding:8px 13px;',
      'border:1px solid rgba(34,29,35,.14);border-radius:999px;background:#fff;color:#221D23;',
      'text-decoration:none;font-size:13px;font-weight:700;transition:.15s ease}',
    '.nlab-foot .nf-links a:hover{background:#FFCE00;border-color:#221D23}',
    '.nlab-foot .nf-links svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.7;',
      'stroke-linecap:round;stroke-linejoin:round}',
    '@media (max-width:640px){.nlab-foot{padding:22px 20px 30px}}'
  ].join('');

  function footer() {
    if (document.querySelector('.nlab-foot')) return;
    var st = document.createElement('style'); st.textContent = FOOT_CSS;
    document.head.appendChild(st);

    var out = '';
    ['website','linkedin','youtube','instagram','x','email'].forEach(function (k) {
      var v = LINKS[k];
      if (!v) return;
      var href = k === 'email' ? 'mailto:' + v : v;
      out += '<a href="' + href + '"' + (k === 'email' ? '' : ' target="_blank" rel="noopener"') + '>' +
               '<svg viewBox="0 0 24 24">' + ICONS[k] + '</svg>' + LABELS[k] + '</a>';
    });

    var f = document.createElement('footer');
    f.className = 'nlab-foot';
    f.innerHTML = '<div class="nf-name">Nudgeable AI Academy<small>Enterprise capability building using AI and Science</small></div>' +
                  '<div class="nf-links">' + out + '</div>';
    document.body.appendChild(f);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ build(); footer(); keepAside(); });
  } else { build(); footer(); keepAside(); }
})();
