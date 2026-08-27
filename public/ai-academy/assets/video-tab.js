/* ==========================================================================
   Nudgeable AI Academy — "Watch videos" tab for assistant feature pages
   Mirrors the third page the Claude guide already has.

   Include once per feature page, before </body>:
     <script src="../assets/video-tab.js"></script>

   It works out which product it is on, reuses that page's own tab classes so
   the button looks native, and adds a video panel with one card per matched
   video for that page (from VIDEO_DATA below, sourced from
   AI_WorkStudio_Matched_Video_Mapping.xlsx). A page with no entry in
   VIDEO_DATA gets no "Watch" tab at all — it is hidden until a video is
   added, not shown with empty placeholders. Nothing per-page to maintain.

   TO ADD A VIDEO (this brings the "Watch" tab back for that page): add its
   entry to VIDEO_DATA below, keyed by "<product-folder>/<page-file>.html" —
   e.g. "chatgpt/codex.html".
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

  var STORAGE = 'https://rgpkgbkcypajxrralnnk.supabase.co/storage/v1/object/public/academy-videos/';

  var VIDEO_DATA = {
    'chatgpt/codex.html': [
      { title:'Compare AI Coding Tools', video:STORAGE+'chatgpt-codex-compare-ai-coding-tools.mp4', poster:STORAGE+'chatgpt-codex-compare-ai-coding-tools.png' },
      { title:'Streamline Work with Codex', video:STORAGE+'chatgpt-codex-streamline-work-with-codex.mp4', poster:STORAGE+'chatgpt-codex-streamline-work-with-codex.png' }
    ],
    'chatgpt/custom-gpts.html': [
      { title:'Build a Personal Email Writing GPT', video:STORAGE+'chatgpt-custom-gpts-build-a-personal-email-writing-gpt.mp4', poster:STORAGE+'chatgpt-custom-gpts-build-a-personal-email-writing-gpt.png' }
    ],
    'chatgpt/images.html': [
      { title:'Create Better Images with the PICTURE Framework', video:STORAGE+'chatgpt-images-create-better-images-with-the-picture-framework.mp4', poster:STORAGE+'chatgpt-images-create-better-images-with-the-picture-framework.png' }
    ],
    'chatgpt/personalization.html': [
      { title:'Import AI Memories', video:STORAGE+'chatgpt-personalization-import-ai-memories.mp4', poster:STORAGE+'chatgpt-personalization-import-ai-memories.png' },
      { title:'Manage AI Memory and Data Security', video:STORAGE+'chatgpt-personalization-manage-ai-memory-and-data-security.mp4', poster:STORAGE+'chatgpt-personalization-manage-ai-memory-and-data-security.png' },
      { title:'Set Custom Instructions', video:STORAGE+'chatgpt-personalization-set-custom-instructions.mp4', poster:STORAGE+'chatgpt-personalization-set-custom-instructions.png' }
    ],
    'chatgpt/plugins-and-apps.html': [
      { title:'Connect ChatGPT to Apps', video:STORAGE+'chatgpt-plugins-and-apps-connect-chatgpt-to-apps.mp4', poster:STORAGE+'chatgpt-plugins-and-apps-connect-chatgpt-to-apps.png' }
    ],
    'chatgpt/projects.html': [
      { title:'Build a Vendor Evaluation Hub', video:STORAGE+'chatgpt-projects-build-a-vendor-evaluation-hub.mp4', poster:STORAGE+'chatgpt-projects-build-a-vendor-evaluation-hub.png' },
      { title:'Organize Work with AI Projects', video:STORAGE+'chatgpt-projects-organize-work-with-ai-projects.mp4', poster:STORAGE+'chatgpt-projects-organize-work-with-ai-projects.png' }
    ],
    'chatgpt/scheduled-tasks.html': [
      { title:'Automate Work with Scheduled Actions', video:STORAGE+'chatgpt-scheduled-tasks-automate-work-with-scheduled-actions.mp4', poster:STORAGE+'chatgpt-scheduled-tasks-automate-work-with-scheduled-actions.png' },
      { title:'Schedule Tasks Automatically', video:STORAGE+'chatgpt-scheduled-tasks-schedule-tasks-automatically.mp4', poster:STORAGE+'chatgpt-scheduled-tasks-schedule-tasks-automatically.png' }
    ],
    'chatgpt/work.html': [
      { title:'Analyze Data with ChatGPT', video:STORAGE+'chatgpt-work-analyze-data-with-chatgpt.mp4', poster:STORAGE+'chatgpt-work-analyze-data-with-chatgpt.png' },
      { title:'Build Presentations with ChatGPT', video:STORAGE+'chatgpt-work-build-presentations-with-chatgpt.mp4', poster:STORAGE+'chatgpt-work-build-presentations-with-chatgpt.png' },
      { title:'Overview of ChatGPT Work Features', video:STORAGE+'chatgpt-work-overview-of-chatgpt-work-features.mp4', poster:STORAGE+'chatgpt-work-overview-of-chatgpt-work-features.png' },
      { title:'Use ChatGPT Work Mode', video:STORAGE+'chatgpt-work-use-chatgpt-work-mode.mp4', poster:null }
    ],
    'gemini/ai-search-deep-research.html': [
      { title:'Compare Deep Research Across Assistants', video:STORAGE+'gemini-ai-search-and-deep-research-compare-deep-research-across-assistants.mp4', poster:STORAGE+'gemini-ai-search-and-deep-research-compare-deep-research-across-assistants.png' }
    ],
    'gemini/ai-video-creation.html': [
      { title:'Convert Google Slides to Video with Google Vids', video:STORAGE+'gemini-ai-video-creation-convert-google-slides-to-video-with-google-vids.mp4', poster:STORAGE+'gemini-ai-video-creation-convert-google-slides-to-video-with-google-vids.png' },
      { title:'Create Videos with Google Flow', video:STORAGE+'gemini-ai-video-creation-create-videos-with-google-flow.mp4', poster:STORAGE+'gemini-ai-video-creation-create-videos-with-google-flow.png' },
      { title:'Generate Videos with Gemini', video:STORAGE+'gemini-ai-video-creation-generate-videos-with-gemini.mp4', poster:STORAGE+'gemini-ai-video-creation-generate-videos-with-gemini.png' }
    ],
    'gemini/gemini-notebook.html': [
      { title:'Analyze Data with Gemini', video:STORAGE+'gemini-gemini-notebook-analyze-data-with-gemini.mp4', poster:STORAGE+'gemini-gemini-notebook-analyze-data-with-gemini.png' },
      { title:'Build a Factual Knowledge Base', video:STORAGE+'gemini-gemini-notebook-build-a-factual-knowledge-base.mp4', poster:STORAGE+'gemini-gemini-notebook-build-a-factual-knowledge-base.png' },
      { title:'Build Presentations with NotebookLM', video:STORAGE+'gemini-gemini-notebook-build-presentations-with-notebooklm.mp4', poster:STORAGE+'gemini-gemini-notebook-build-presentations-with-notebooklm.png' },
      { title:'Generate Video Overviews with NotebookLM', video:STORAGE+'gemini-gemini-notebook-generate-video-overviews-with-notebooklm.mp4', poster:STORAGE+'gemini-gemini-notebook-generate-video-overviews-with-notebooklm.png' }
    ],
    'gemini/gemini-spark.html': [
      { title:'Edit Content in Gemini Canvas', video:STORAGE+'gemini-gemini-spark-edit-content-in-gemini-canvas.mp4', poster:STORAGE+'gemini-gemini-spark-edit-content-in-gemini-canvas.png' }
    ],
    'gemini/gems.html': [
      { title:'Build and Use Gemini Gems', video:STORAGE+'gemini-gems-build-and-use-gemini-gems.mp4', poster:null }
    ],
    'gemini/google-ai-studio.html': [
      { title:'Build a Live Sales Dashboard', video:STORAGE+'gemini-google-ai-studio-build-a-live-sales-dashboard.mp4', poster:STORAGE+'gemini-google-ai-studio-build-a-live-sales-dashboard.png' }
    ],
    'gemini/image-generation-editing.html': [
      { title:'Build Presentations with Gemini', video:STORAGE+'gemini-image-generation-and-editing-build-presentations-with-gemini.mp4', poster:STORAGE+'gemini-image-generation-and-editing-build-presentations-with-gemini.png' }
    ],
    'gemini/workspace-studio.html': [
      { title:'Automate Customer Escalation Alerts', video:STORAGE+'gemini-workspace-studio-automate-customer-escalation-alerts.mp4', poster:STORAGE+'gemini-workspace-studio-automate-customer-escalation-alerts.png' }
    ],
    'copilot/copilot-notebooks.html': [
      { title:'Build a New Hire Onboarding Hub', video:STORAGE+'microsoft-copilot-copilot-notebooks-build-a-new-hire-onboarding-hub.mp4', poster:STORAGE+'microsoft-copilot-copilot-notebooks-build-a-new-hire-onboarding-hub.png' }
    ],
    'copilot/cowork.html': [
      { title:'Access Cowork on Mobile', video:STORAGE+'microsoft-copilot-cowork-access-cowork-on-mobile.mp4', poster:STORAGE+'microsoft-copilot-cowork-access-cowork-on-mobile.png' },
      { title:'Customize Copilot Cowork', video:STORAGE+'microsoft-copilot-cowork-customize-copilot-cowork.mp4', poster:null },
      { title:'Use Cowork in Microsoft 365', video:STORAGE+'microsoft-copilot-cowork-use-cowork-in-microsoft-365.mp4', poster:null }
    ]
  };

  var CSS = [
    '.nv-panel{--nv:var(--nv-accent,#DF6426)}',
    '.nv-panel .nv-head{margin-bottom:26px}',
    '.nv-eyebrow{font-size:11.5px;font-weight:850;letter-spacing:.15em;text-transform:uppercase;',
      'color:var(--nv);margin-bottom:10px}',
    '.nv-panel h1{margin:0 0 12px}',
    '.nv-lead{font-size:18px;line-height:1.6;color:#4C5561;margin:0;max-width:620px}',

    '.nv-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}',
    '.nv-card{border:1px solid rgba(34,29,35,.16);border-radius:16px;overflow:hidden;background:#fff}',
    '.nv-stage{aspect-ratio:16/9;display:grid;place-items:center;position:relative;',
      'background:linear-gradient(160deg,color-mix(in srgb,var(--nv) 13%,#fff),#fff);cursor:pointer}',
    '.nv-stage iframe,.nv-stage video{width:100%;height:100%;border:0;display:block}',
    '.nv-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
    '.nv-play{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;',
      'background:var(--nv);color:#fff;font-size:17px;padding-left:3px;position:relative;z-index:1;',
      'box-shadow:0 6px 18px color-mix(in srgb,var(--nv) 34%,transparent)}',
    '.nv-body{border-top:1px solid rgba(34,29,35,.14);padding:15px 17px 17px;background:#fff}',
    '.nv-body h3{margin:0 0 5px;font-size:17px;font-weight:750;line-height:1.3}',
    '.nv-body p{margin:0;font-size:13.5px;line-height:1.5;color:#6B6B6B}',

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

  function pageKey() {
    var parts = location.pathname.split('/').filter(Boolean);
    return parts.slice(-2).join('/');
  }

  function cardHTML(video) {
    var posterImg = video.poster ? '<img class="nv-poster" src="' + video.poster + '" alt="" loading="lazy">' : '';
    return '<div class="nv-card">' +
             '<div class="nv-stage" data-video="' + video.video + '">' +
               posterImg +
               '<span class="nv-play">&#9654;</span>' +
             '</div>' +
             '<div class="nv-body"><h3>' + video.title + '</h3>' +
               '<p>A short recording of this workflow, start to finish.</p></div>' +
           '</div>';
  }

  function bindPlay(panel) {
    panel.addEventListener('click', function (e) {
      var stage = e.target.closest('.nv-stage[data-video]');
      if (!stage || stage.querySelector('video')) return;
      var src = stage.getAttribute('data-video');
      var poster = stage.querySelector('.nv-poster');
      var posterSrc = poster ? poster.getAttribute('src') : '';
      stage.innerHTML = '<video controls autoplay playsinline' +
        (posterSrc ? ' poster="' + posterSrc + '"' : '') +
        ' src="' + src + '"></video>';
    });
  }

  function build() {
    var key = null;
    for (var k in PRODUCTS) if (location.pathname.indexOf(k) !== -1) key = k;
    if (!key) return;

    // No matched recording for this page yet — hide the "Watch" tab entirely
    // rather than show empty placeholders. Add an entry to VIDEO_DATA above
    // to bring it back.
    var videos = VIDEO_DATA[pageKey()] || [];
    if (!videos.length) return;

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

    var slots = videos.map(cardHTML).join('');

    panel.innerHTML =
      '<div class="nv-head">' +
        '<div class="nv-eyebrow">Watch</div>' +
        '<h1>' + feature + ' workflows in action</h1>' +
        '<p class="nv-lead">Short recordings of real work, start to finish.</p>' +
      '</div>' +
      '<div class="nv-grid">' + slots + '</div>';

    if (pageNav) content.insertBefore(panel, pageNav);
    else content.appendChild(panel);

    bindPlay(panel);

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
