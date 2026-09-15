#!/usr/bin/env python3
"""Inject SEO/OG meta tags and a 'Back to Nudgeable' link into the AI for Work static pages."""

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'ai-for-work'
OG_IMAGE = '/assets/og-default.png'

PAGES = {
    'index.html': (
        'AI for Work',
        'Plain guides to the ideas behind AI at work, written for people who use these tools rather than build them. No jargon, no assumptions.',
    ),
    'what-are-ai-projects.html': (
        'What Is an AI Project?',
        'A folder that holds your files and your standing instructions, so every chat inside it already knows the background. Set it up once and work from it all year.',
    ),
    'what-are-ai-skills.html': (
        'What Is an AI Skill?',
        'A small folder holding the method for one job, along with the examples and templates it needs. Write it once, then call it by name instead of retyping the brief.',
    ),
    'what-is-a-work-agent.html': (
        'What Is a Work Agent?',
        'It takes the whole task rather than one question. Point it at a folder, describe the outcome, and come back to finished work instead of managing every step.',
    ),
    'what-is-a-coding-agent.html': (
        'What Is a Coding Agent?',
        'Two assistants with almost the same name and almost nothing in common. Which one you open decides how good the answer is, and most people open the wrong one.',
    ),
    'models-and-thinking-effort.html': (
        'Models and Thinking Effort',
        'Two dials, and most people only ever touch one. Which model sets how good an answer can be, and how long it reasons is a separate setting with its own cost.',
    ),
    'what-is-vibe-coding.html': (
        'What Is Vibe Coding?',
        'You describe a tool in plain English and the AI builds it. Excellent for proving an idea in ten minutes, and worth knowing exactly where it stops.',
    ),
}

BACK_HOME_CSS = '''
/* ============ Back to Nudgeable homepage ============ */
.back-home{
  position:fixed;top:18px;right:22px;z-index:950;
  display:inline-flex;align-items:center;gap:7px;
  background:#fff;border:3px solid var(--ink);border-radius:999px;
  padding:8px 16px;font-size:13px;font-weight:800;color:var(--ink);
  text-decoration:none;box-shadow:var(--pop-sm);transition:.12s;
}
.back-home:hover{background:var(--yellow)}
.back-home:active{transform:translate(2px,2px);box-shadow:none}
@media (max-width:780px){.back-home{top:12px;right:12px;padding:7px 13px;font-size:12.5px}}
'''

BACK_HOME_LINK = '<a class="back-home" href="/">&larr; Back to Nudgeable</a>\n'


def build_meta_block(title: str, description: str, path: str) -> str:
    t = html.escape(title, quote=True)
    d = html.escape(description, quote=True)
    p = html.escape(path, quote=True)
    img = html.escape(OG_IMAGE, quote=True)
    return f'''<link rel="canonical" href="{p}">
<link rel="icon" href="/icon.png" type="image/png" sizes="256x256">
<link rel="apple-touch-icon" href="/icon.png">
<meta name="description" content="{d}">
<meta property="og:site_name" content="Nudgeable">
<meta property="og:locale" content="en_US">
<meta property="og:type" content="website">
<meta property="og:title" content="{t}">
<meta property="og:description" content="{d}">
<meta property="og:url" content="{p}">
<meta property="og:image" content="{img}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Nudgeable">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{t}">
<meta name="twitter:description" content="{d}">
<meta name="twitter:image" content="{img}">
<meta name="theme-color" content="#FDF8EC">
'''


def process(file_path: Path, title: str, description: str):
    content = file_path.read_text(encoding='utf-8')
    path = f'/ai-for-work/{file_path.name}'

    # 1) title tag
    content = re.sub(r'<title>.*?</title>', f'<title>{html.escape(title)}</title>', content, count=1, flags=re.S)

    # 2) meta block, inserted right after the viewport meta tag
    meta_block = build_meta_block(title, description, path)
    viewport_re = re.compile(r'(<meta name="viewport"[^>]*>\s*)')
    if viewport_re.search(content):
        content = viewport_re.sub(lambda m: m.group(1) + meta_block, content, count=1)
    else:
        content = content.replace('</head>', meta_block + '</head>', 1)

    # 3) back-home CSS, injected right before </style> (first style block)
    if '.back-home{' not in content:
        content = content.replace('</style>', BACK_HOME_CSS + '</style>', 1)

    # 4) back-home link, injected right after <body>
    if 'class="back-home"' not in content:
        content = re.sub(r'(<body>\s*)', lambda m: m.group(1) + BACK_HOME_LINK, content, count=1)

    file_path.write_text(content, encoding='utf-8')
    print(f'updated {file_path.name}')


def main():
    for name, (title, description) in PAGES.items():
        fp = ROOT / name
        if not fp.exists():
            print(f'MISSING: {name}')
            continue
        process(fp, title, description)


if __name__ == '__main__':
    main()
