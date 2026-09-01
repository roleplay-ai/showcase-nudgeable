#!/usr/bin/env python3
"""Inject or refresh favicon and Open Graph meta tags on AI Academy static HTML pages."""

import html
import re
from pathlib import Path

OG_IMAGE = '/ai-academy/assets/og-share.png'
ACADEMY_ROOT = Path(__file__).resolve().parents[1] / 'public' / 'ai-academy'
MARKER = 'academy-head-meta'
META_BLOCK_RE = re.compile(
    r'(?:<link rel="canonical"[^>]*>\s*)?'
    r'<link rel="icon" href="/icon.png"[^>]*>\s*'
    r'<link rel="apple-touch-icon" href="/icon.png">\s*'
    r'<meta property="og:site_name"[^>]*>\s*'
    r'(?:<meta property="og:locale"[^>]*>\s*)?'
    r'<meta property="og:type"[^>]*>\s*'
    r'<meta property="og:title"[^>]*>\s*'
    r'<meta property="og:description"[^>]*>\s*'
    r'<meta property="og:url"[^>]*>\s*'
    r'<meta property="og:image"[^>]*>\s*'
    r'(?:<meta property="og:image:secure_url"[^>]*>\s*)?'
    r'(?:<meta property="og:image:type"[^>]*>\s*)?'
    r'<meta property="og:image:width"[^>]*>\s*'
    r'<meta property="og:image:height"[^>]*>\s*'
    r'<meta property="og:image:alt"[^>]*>\s*'
    r'<meta name="twitter:card"[^>]*>\s*'
    r'<meta name="twitter:title"[^>]*>\s*'
    r'<meta name="twitter:description"[^>]*>\s*'
    r'<meta name="twitter:image"[^>]*>\s*'
    r'<meta name="theme-color"[^>]*>\s*'
    r'<!-- academy-head-meta -->\s*',
    re.I,
)


def parse_title(content: str) -> str:
    match = re.search(r'<title[^>]*>(.*?)</title>', content, re.I | re.S)
    return html.unescape(re.sub(r'\s+', ' ', match.group(1)).strip()) if match else 'Nudgeable AI Academy'


def parse_description(content: str) -> str:
    match = re.search(
        r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']',
        content,
        re.I | re.S,
    )
    if not match:
        match = re.search(
            r'<meta[^>]+content=["\'](.*?)["\'][^>]+name=["\']description["\']',
            content,
            re.I | re.S,
        )
    return html.unescape(match.group(1).strip()) if match else 'Practical guides to the AI assistants people use at work.'


def page_path(file_path: Path) -> str:
    rel = file_path.relative_to(ACADEMY_ROOT).as_posix()
    return f'/ai-academy/{rel}'


def build_block(title: str, description: str, path: str) -> str:
    t = html.escape(title, quote=True)
    d = html.escape(description, quote=True)
    p = html.escape(path, quote=True)
    img = html.escape(OG_IMAGE, quote=True)
    return f'''<link rel="canonical" href="{p}">
<link rel="icon" href="/icon.png" type="image/png" sizes="256x256">
<link rel="apple-touch-icon" href="/icon.png">
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
<meta property="og:image:alt" content="Nudgeable AI Academy">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{t}">
<meta name="twitter:description" content="{d}">
<meta name="twitter:image" content="{img}">
<meta name="theme-color" content="#FEFCFA">
<!-- {MARKER} -->'''


def inject(content: str, block: str) -> str:
    if MARKER in content:
        return META_BLOCK_RE.sub(block + '\n', content, count=1)

    content = re.sub(r'<link rel="icon" href="/icon.png"[^>]*>\s*', '', content, flags=re.I)

    viewport = re.search(r'<meta[^>]+name=["\']viewport["\'][^>]*>', content, re.I)
    if viewport:
        return content[: viewport.end()] + '\n' + block + content[viewport.end() :]

    charset = re.search(r'<meta[^>]+charset[^>]*>', content, re.I)
    if charset:
        return content[: charset.end()] + '\n' + block + content[charset.end() :]

    head = re.search(r'<head[^>]*>', content, re.I)
    if not head:
        return content
    return content[: head.end()] + '\n' + block + content[head.end() :]


def main() -> None:
    updated = 0
    for file_path in sorted(ACADEMY_ROOT.rglob('*.html')):
        original = file_path.read_text(encoding='utf-8')
        block = build_block(parse_title(original), parse_description(original), page_path(file_path))
        new_content = inject(original, block)
        if new_content != original:
            file_path.write_text(new_content, encoding='utf-8')
            updated += 1
            print(f'updated {file_path.relative_to(ACADEMY_ROOT)}')
    print(f'done: {updated} files updated')


if __name__ == '__main__':
    main()
